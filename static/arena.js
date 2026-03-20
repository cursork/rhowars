const canvas = document.getElementById('arena');
const ctx = canvas.getContext('2d');

let data = null;      // match history
let frame = 0;
let playing = false;
let playTimer = null;
let matchLineup = []; // array of bot identifiers for the match
let deathTurns = [];  // per-bot death turn (-1 = alive)
let currentMatchId = null;

const BOT_COLORS = ['#4af', '#f44', '#4f4', '#ff4', '#f4f', '#4ff'];
const BULLET_COLOR = '#fa0';

function shortName(full) {
  const parts = full.split('.');
  // User bots: ...UserBots.author.Name → author/Name
  const ub = parts.indexOf('UserBots');
  if (ub !== -1 && parts.length > ub + 2) return parts[ub + 1] + '/' + parts[ub + 2];
  // Built-in: last segment
  return parts.pop();
}

const API = '';

// === Bot Management ===

async function loadBots() {
  const el = document.getElementById('builtin-bots');
  try {
    const resp = await fetch(`${API}/api/bots`);
    if (!resp.ok) throw new Error(resp.statusText);
    const bots = await resp.json();

    renderAvailableBots('builtin-bots', bots.builtin.map(b => ({
      id: b.name, name: b.name, builtin: true
    })));

    renderAvailableBots('user-bots', bots.user.map(b => ({
      id: `${b.author}/${b.name}`, name: b.name, author: b.author,
      avatar: b.avatar, builtin: false
    })));
  } catch (e) {
    el.innerHTML = '<li class="bot-empty">Failed to load — is the server running?</li>';
    document.getElementById('user-bots').innerHTML = '';
    console.error('Failed to load bots:', e);
  }
}

function renderAvailableBots(elId, bots) {
  const ul = document.getElementById(elId);
  ul.innerHTML = '';
  if (bots.length === 0) {
    ul.innerHTML = '<li class="bot-empty">None</li>';
    return;
  }
  for (const bot of bots) {
    const li = document.createElement('li');

    let html = '';
    if (!bot.builtin) {
      const hasAvatar = bot.avatar && bot.avatar.length > 0;
      html += hasAvatar
        ? `<img class="bot-avatar" src="${bot.avatar}">`
        : `<div class="bot-avatar"></div>`;
    }
    html += `<span class="bot-name">${bot.builtin ? bot.name : bot.id}</span>`;
    html += `<button class="bot-add" title="Add to rhowar">+</button>`;
    if (!bot.builtin) {
      html += `<button class="bot-delete" data-author="${bot.author}" data-name="${bot.name}" title="Delete bot">&times;</button>`;
    }
    li.innerHTML = html;

    li.querySelector('.bot-add').addEventListener('click', () => addToLineup(bot.id));

    const delBtn = li.querySelector('.bot-delete');
    if (delBtn) {
      delBtn.addEventListener('click', () => deleteBot(delBtn.dataset.author, delBtn.dataset.name));
    }

    ul.appendChild(li);
  }
}

function addToLineup(id) {
  matchLineup.push(id);
  renderLineup();
}

function removeFromLineup(index) {
  matchLineup.splice(index, 1);
  renderLineup();
}

function clearLineup() {
  matchLineup = [];
  renderLineup();
}

function renderLineup() {
  const ul = document.getElementById('lineup-list');
  ul.innerHTML = '';
  if (matchLineup.length === 0) {
    ul.innerHTML = '<li class="bot-empty">Click + to add rhobots to the rhowar</li>';
  } else {
    matchLineup.forEach((id, i) => {
      const li = document.createElement('li');
      const color = BOT_COLORS[i % BOT_COLORS.length];
      li.innerHTML = `<span class="lineup-color" style="background:${color}"></span>` +
        `<span class="bot-name">${id}</span>` +
        `<button class="bot-delete" title="Remove">&times;</button>`;
      li.querySelector('.bot-delete').addEventListener('click', () => removeFromLineup(i));
      ul.appendChild(li);
    });
  }
  const btn = document.getElementById('btnStartMatch');
  btn.disabled = matchLineup.length < 2;
}

// === Match ===

document.getElementById('btnStartMatch').onclick = async () => {
  if (matchLineup.length < 2) return;
  document.getElementById('status').textContent = 'Running rhowar...';
  document.getElementById('controls').style.display = 'none';
  document.getElementById('timeline-row').style.display = 'none';
  document.getElementById('loading-overlay').classList.remove('show');
  document.getElementById('ready-overlay').classList.remove('show');
  document.getElementById('results').classList.remove('show');
  document.getElementById('loading-overlay').classList.add('show');
  try {
    const matchResp = await fetch(`${API}/api/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bots: matchLineup, config: getConfig() })
    });
    if (!matchResp.ok) {
      const err = await matchResp.json();
      document.getElementById('status').textContent = 'Error: ' + (err.error || matchResp.statusText);
      return;
    }
    const matchResult = await matchResp.json();
    currentMatchId = matchResult.id;
    const resp = await fetch(`${API}/api/match/${currentMatchId}/history`);
    loadHistory(await resp.json());
    document.getElementById('loading-overlay').classList.remove('show');
    document.getElementById('ready-overlay').classList.add('show');
  } catch (e) {
    document.getElementById('loading-overlay').classList.remove('show');
    document.getElementById('status').textContent = 'Error: ' + e.message;
  }
};

// === Matches Panel ===

document.getElementById('matches-toggle').onclick = () => {
  document.getElementById('upload-panel').classList.remove('open');
  document.getElementById('config-panel').classList.remove('open');
  document.getElementById('record-panel').classList.remove('open');
  const panel = document.getElementById('matches-panel');
  panel.classList.toggle('open');
  if (panel.classList.contains('open')) loadMatches();
};

async function loadMatches() {
  const el = document.getElementById('matches-list');
  try {
    const resp = await fetch(`${API}/api/match/list`);
    const body = await resp.json();
    const list = body.matches || [];
    el.innerHTML = '';
    if (list.length === 0) {
      el.innerHTML = '<li class="bot-empty">No matches yet</li>';
      return;
    }
    for (let i = list.length - 1; i >= 0; i--) {
      const m = list[i];
      const li = document.createElement('li');
      const names = m.names.join(' vs ');
      const status = m.done ? `${m.turns} turns` : 'running...';
      li.innerHTML = `<span class="bot-name" style="font-size:11px">#${m.id} ${names}</span>` +
        `<span class="result-detail">${status}</span>`;
      if (m.done) {
        li.style.cursor = 'pointer';
        li.onclick = () => watchMatch(m.id);
      } else {
        li.style.opacity = '0.5';
      }
      el.appendChild(li);
    }
  } catch (e) {
    el.innerHTML = '<li class="bot-empty">Failed to load matches</li>';
  }
}

async function watchMatch(id) {
  try {
    const resp = await fetch(`${API}/api/match/${id}/history`);
    if (!resp.ok) {
      document.getElementById('status').textContent = 'Failed to load match';
      return;
    }
    currentMatchId = id;
    loadHistory(await resp.json());
    document.getElementById('ready-overlay').classList.add('show');
  } catch (e) {
    document.getElementById('status').textContent = 'Error: ' + e.message;
  }
}

document.getElementById('btnWatch').onclick = () => {
  document.getElementById('ready-overlay').classList.remove('show');
  document.getElementById('controls').style.display = 'flex';
  document.getElementById('timeline-row').style.display = 'block';
  frame = 0;
  playing = true;
  document.getElementById('btnPlay').textContent = 'Pause';
  startPlayback();
};

function loadHistory(histData) {
  data = histData;
  resizeArena(data.arena);
  frame = 0;
  playing = false;
  clearInterval(playTimer);
  timeline.max = data.frames.length - 1;
  timeline.value = 0;
  deathTurns = new Array(data.names.length).fill(-1);
  for (let t = 1; t < data.frames.length; t++) {
    const prev = data.frames[t - 1].bots;
    const curr = data.frames[t].bots;
    for (let i = 0; i < data.names.length; i++) {
      if (deathTurns[i] === -1 && prev[i][7] === 1 && curr[i][7] === 0) {
        deathTurns[i] = t;
      }
    }
  }
  document.getElementById('status').textContent =
    `Rhowar loaded: ${data.turns} turns, ${data.names.length} rhobots`;
  document.getElementById('btnDownloadRecord').disabled = false;
  render();
}

// === Playback ===

document.getElementById('btnPlay').onclick = () => {
  if (!data) return;
  playing = !playing;
  document.getElementById('btnPlay').textContent = playing ? 'Pause' : 'Play';
  if (playing) startPlayback();
  else clearInterval(playTimer);
};

function startPlayback() {
  clearInterval(playTimer);
  const ms = Math.max(1, 110 - document.getElementById('speed').value);
  playTimer = setInterval(() => {
    if (frame < data.frames.length - 1) {
      frame++;
      render();
    } else {
      playing = false;
      clearInterval(playTimer);
      document.getElementById('btnPlay').textContent = 'Play';
    }
  }, ms);
}

document.getElementById('speed').oninput = () => {
  if (playing) startPlayback();
};

const timeline = document.getElementById('timeline');
timeline.oninput = () => {
  if (!data) return;
  frame = parseInt(timeline.value);
  render();
};
// Pause playback while scrubbing
timeline.onmousedown = timeline.ontouchstart = () => {
  if (playing) {
    playing = false;
    clearInterval(playTimer);
    document.getElementById('btnPlay').textContent = 'Play';
  }
};

// === Upload ===

document.getElementById('upload-toggle').onclick = () => {
  document.getElementById('config-panel').classList.remove('open');
  document.getElementById('record-panel').classList.remove('open');
  document.getElementById('matches-panel').classList.remove('open');
  document.getElementById('upload-panel').classList.toggle('open');
};

document.getElementById('config-toggle').onclick = () => {
  document.getElementById('upload-panel').classList.remove('open');
  document.getElementById('record-panel').classList.remove('open');
  document.getElementById('matches-panel').classList.remove('open');
  document.getElementById('config-panel').classList.toggle('open');
};

document.getElementById('btnUpload').onclick = async () => {
  const author = document.getElementById('upload-author').value.trim();
  const source = document.getElementById('upload-source').value;
  const statusEl = document.getElementById('upload-status');

  // Extract name from :Namespace declaration
  const nsMatch = source.trim().match(/^:Namespace\s+(\S+)/m);
  if (!nsMatch) {
    statusEl.textContent = 'Source must start with :Namespace YourBotName';
    statusEl.style.color = '#f44';
    return;
  }
  const name = nsMatch[1];

  if (!author || !source) {
    statusEl.textContent = 'Fill in author and source.';
    statusEl.style.color = '#f44';
    return;
  }

  const payload = { author, name, source };

  const fileInput = document.getElementById('upload-avatar');
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const dataUri = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
    payload.avatar = dataUri;
  }

  try {
    const resp = await fetch(`${API}/api/bots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await resp.json();
    if (resp.ok) {
      statusEl.style.color = '#4f4';
      statusEl.textContent = result.overwritten
        ? `Updated ${result.author}/${result.name}`
        : `Uploaded ${result.author}/${result.name}`;
      loadBots();
    } else {
      statusEl.style.color = '#f44';
      statusEl.textContent = result.error || 'Upload failed';
    }
  } catch (e) {
    statusEl.style.color = '#f44';
    statusEl.textContent = 'Error: ' + e.message;
  }
};

async function deleteBot(author, name) {
  if (!confirm(`Delete ${author}/${name}?`)) return;
  try {
    const resp = await fetch(`${API}/api/bots/${author}/${name}`, { method: 'DELETE' });
    if (resp.ok) {
      matchLineup = matchLineup.filter(id => id !== `${author}/${name}`);
      renderLineup();
      loadBots();
    } else {
      const result = await resp.json();
      alert(result.error || 'Delete failed');
    }
  } catch (e) {
    alert('Error: ' + e.message);
  }
}

// === Render ===

const MAX_CANVAS = 600;

function resizeArena(arena) {
  const [aw, ah] = arena;
  const scale = MAX_CANVAS / Math.max(aw, ah);
  const cw = Math.round(aw * scale);
  const ch = Math.round(ah * scale);
  canvas.width = cw;
  canvas.height = ch;
  document.getElementById('arena-col').style.setProperty('--arena-px', cw + 'px');
}

function render() {
  if (!data || !data.frames[frame]) return;

  const f = data.frames[frame];
  const bots = f.bots;
  const bullets = f.bullets;
  const W = canvas.width;
  const H = canvas.height;
  const arenaW = data.arena[0];
  const scale = W / arenaW;
  const r = data.botRadius * scale;

  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = '#333';
  ctx.strokeRect(0, 0, W, H);

  for (let i = 0; i < bullets.length; i++) {
    const b = bullets[i];
    const bx = b[0] * scale;
    const by = H - b[1] * scale;
    ctx.fillStyle = BULLET_COLOR;
    ctx.beginPath();
    ctx.arc(bx, by, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < bots.length; i++) {
    const b = bots[i];
    const alive = b[7];
    if (!alive) continue;

    const bx = b[1] * scale;
    const by = H - b[2] * scale;
    const turret = b[4];
    const hp = b[5];
    const color = BOT_COLORS[i % BOT_COLORS.length];

    ctx.fillStyle = color;
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.arc(bx, by, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(bx, by, r, 0, Math.PI * 2);
    ctx.stroke();

    const tRad = (-turret + 90) * Math.PI / 180;
    const tLen = r * 2;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(bx + Math.cos(tRad) * tLen, by - Math.sin(tRad) * tLen);
    ctx.stroke();

    const vRange = data.visionRange * scale;
    const halfAngle = data.visionHalfAngle * Math.PI / 180;
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.05;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.arc(bx, by, vRange, -(tRad + halfAngle), -(tRad - halfAngle));
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;

    const barW = r * 2;
    const barH = 3;
    const barY = by + r + 5;
    ctx.fillStyle = '#333';
    ctx.fillRect(bx - barW / 2, barY, barW, barH);
    const maxHP = data.botHP;
    ctx.fillStyle = hp > maxHP/2 ? '#4f4' : hp > maxHP/4 ? '#ff4' : '#f44';
    ctx.fillRect(bx - barW / 2, barY, barW * (hp / maxHP), barH);

    ctx.fillStyle = '#888';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(shortName(data.names[i]), bx, by - r - 5);
  }

  document.getElementById('turnLabel').textContent = `Turn: ${f.turn}`;
  timeline.value = frame;

  // Show results on last frame
  if (frame === data.frames.length - 1) {
    showResults();
  } else {
    document.getElementById('results').classList.remove('show');
  }
  let info = '';
  for (let i = 0; i < bots.length; i++) {
    const b = bots[i];
    const name = shortName(data.names[i]);
    const color = BOT_COLORS[i % BOT_COLORS.length];
    const dead = !b[7];
    const detail = dead ? `died turn ${deathTurns[i]}` : `HP:${b[5]}`;
    info += `<span style="color:${dead ? '#555' : color}">${name} ${detail}</span>`;
  }
  document.getElementById('info').innerHTML = info;
}

// === Results ===

function showResults() {
  if (!data) return;

  const lastFrame = data.frames[data.frames.length - 1];
  const entries = data.names.map((name, i) => ({
    name: shortName(name), i,
    alive: lastFrame.bots[i][7],
    hp: lastFrame.bots[i][5],
    deathTurn: deathTurns[i],
    color: BOT_COLORS[i % BOT_COLORS.length]
  }));

  entries.sort((a, b) => {
    if (a.alive !== b.alive) return b.alive - a.alive; // alive first
    if (a.alive) return b.hp - a.hp; // among alive: higher HP first
    return b.deathTurn - a.deathTurn; // among dead: died later = better
  });

  const survivors = entries.filter(e => e.alive);
  const titleEl = document.getElementById('results-title');

  if (survivors.length === 0) {
    titleEl.textContent = 'DRAW';
    titleEl.className = 'draw';
  } else if (survivors.length === 1) {
    titleEl.textContent = 'WINNER';
    titleEl.className = 'winner';
  } else {
    titleEl.textContent = 'DRAW';
    titleEl.className = 'draw';
  }

  const list = document.getElementById('results-list');
  list.innerHTML = '';
  entries.forEach((e, rank) => {
    const li = document.createElement('li');
    const detail = e.alive
      ? `HP ${e.hp}`
      : `killed turn ${e.deathTurn}`;
    li.innerHTML =
      `<span class="result-rank">#${rank + 1}</span>` +
      `<span class="lineup-color" style="background:${e.color}"></span>` +
      `<span class="result-name">${e.name}</span>` +
      `<span class="result-detail">${detail}</span>`;
    list.appendChild(li);
  });

  document.getElementById('results').classList.add('show');
}

// === Keyboard ===

document.addEventListener('keydown', (e) => {
  const tag = document.activeElement.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;
  if (e.code === 'Space') {
    e.preventDefault();
    document.getElementById('btnPlay').click();
  }
  if (e.code === 'ArrowRight' && data && frame < data.frames.length - 1) {
    frame++;
    render();
  }
  if (e.code === 'ArrowLeft' && data && frame > 0) {
    frame--;
    render();
  }
});

// === Record ===

document.getElementById('record-toggle').onclick = () => {
  document.getElementById('upload-panel').classList.remove('open');
  document.getElementById('config-panel').classList.remove('open');
  document.getElementById('matches-panel').classList.remove('open');
  document.getElementById('record-panel').classList.toggle('open');
};

document.getElementById('btnDownloadRecord').onclick = async () => {
  try {
    if (!currentMatchId) throw new Error('No match selected');
    const resp = await fetch(`${API}/api/match/${currentMatchId}/record`);
    if (!resp.ok) throw new Error('No match to download');
    const manifest = await resp.json();
    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rhowars-match-${currentMatchId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (e) {
    document.getElementById('record-status').textContent = 'Error: ' + e.message;
    document.getElementById('record-status').style.color = '#f44';
  }
};

document.getElementById('record-file').onchange = () => {
  document.getElementById('btnReplayRecord').disabled =
    document.getElementById('record-file').files.length === 0;
};

document.getElementById('btnReplayRecord').onclick = async () => {
  const fileInput = document.getElementById('record-file');
  const statusEl = document.getElementById('record-status');
  if (fileInput.files.length === 0) return;

  const text = await fileInput.files[0].text();
  statusEl.textContent = 'Replaying...';
  statusEl.style.color = '#888';

  document.getElementById('controls').style.display = 'none';
  document.getElementById('timeline-row').style.display = 'none';
  document.getElementById('results').classList.remove('show');
  document.getElementById('ready-overlay').classList.remove('show');
  document.getElementById('loading-overlay').classList.add('show');

  try {
    const resp = await fetch(`${API}/api/match/replay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: text
    });
    if (!resp.ok) {
      const err = await resp.json();
      throw new Error(err.error || resp.statusText);
    }
    const result = await resp.json();

    // Show warnings if any
    if (result.warnings && result.warnings.length > 0) {
      statusEl.style.color = '#ff4';
      statusEl.textContent = result.warnings.join('; ');
    } else {
      statusEl.style.color = '#4f4';
      statusEl.textContent = 'Replay complete';
    }

    // Load history and show
    currentMatchId = result.id || currentMatchId;
    const histResp = currentMatchId
      ? await fetch(`${API}/api/match/${currentMatchId}/history`)
      : await fetch(`${API}/api/match/history`);
    loadHistory(await histResp.json());
    document.getElementById('loading-overlay').classList.remove('show');
    document.getElementById('ready-overlay').classList.add('show');
    document.getElementById('status').textContent =
      `Replay loaded: ${data.turns} turns, ${data.names.length} rhobots`;
  } catch (e) {
    document.getElementById('loading-overlay').classList.remove('show');
    statusEl.style.color = '#f44';
    statusEl.textContent = 'Error: ' + e.message;
  }
};

// === Config ===

async function loadConfig() {
  try {
    const resp = await fetch(`${API}/api/config`);
    if (!resp.ok) return;
    const cfg = await resp.json();
    document.getElementById('cfg-arenaW').value = cfg.arena[0];
    document.getElementById('cfg-arenaH').value = cfg.arena[1];
    document.getElementById('cfg-botSpeed').value = cfg.botSpeed;
    document.getElementById('cfg-botHP').value = cfg.botHP;
    document.getElementById('cfg-botRadius').value = cfg.botRadius;
    document.getElementById('cfg-bulletSpeed').value = cfg.bulletSpeed;
    document.getElementById('cfg-bulletDamage').value = cfg.bulletDamage;
    document.getElementById('cfg-visionRange').value = cfg.visionRange;
    document.getElementById('cfg-visionHalfAngle').value = cfg.visionHalfAngle;
    document.getElementById('cfg-cooldown').value = cfg.cooldown;
    document.getElementById('cfg-collisionDamage').value = cfg.collisionDamage;
    document.getElementById('cfg-collisionBounce').value = cfg.collisionBounce;
    document.getElementById('cfg-maxTurns').value = cfg.maxTurns;
  } catch (e) {
    console.error('Failed to load config:', e);
  }
}

function getConfig() {
  const v = id => parseInt(document.getElementById(id).value) || 0;
  return {
    arena: [v('cfg-arenaW'), v('cfg-arenaH')],
    botSpeed: v('cfg-botSpeed'),
    botHP: v('cfg-botHP'),
    botRadius: v('cfg-botRadius'),
    bulletSpeed: v('cfg-bulletSpeed'),
    bulletDamage: v('cfg-bulletDamage'),
    visionRange: v('cfg-visionRange'),
    visionHalfAngle: v('cfg-visionHalfAngle'),
    cooldown: v('cfg-cooldown'),
    collisionDamage: v('cfg-collisionDamage'),
    collisionBounce: parseFloat(document.getElementById('cfg-collisionBounce').value) || 0,
    maxTurns: v('cfg-maxTurns')
  };
}

async function resetConfig() {
  try {
    await fetch(`${API}/api/config/reset`, { method: 'POST' });
    await loadConfig();
  } catch (e) {
    console.error('Failed to reset config:', e);
  }
}

// === Init ===

loadBots();
loadConfig();
renderLineup();
