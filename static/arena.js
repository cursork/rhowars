const canvas = document.getElementById('arena');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;

let data = null;      // match history
let frame = 0;
let playing = false;
let playTimer = null;

const BOT_COLORS = ['#4af', '#f44', '#4f4', '#ff4', '#f4f', '#4ff'];
const BULLET_COLOR = '#fa0';

// Bot matrix columns: id=0 x=1 y=2 dir=3 turret=4 hp=5 cooldown=6 alive=7
// Bullet matrix columns: x=0 y=1 dx=2 dy=3 owner=4

const API = '';

document.getElementById('btnStart').onclick = async () => {
  document.getElementById('status').textContent = 'Running match...';
  try {
    await fetch(`${API}/api/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bots: ['Spinner', 'RandomWalker'] })
    });
    const resp = await fetch(`${API}/api/match/history`);
    data = await resp.json();
    frame = 0;
    playing = false;
    clearInterval(playTimer);
    document.getElementById('status').textContent =
      `Match loaded: ${data.turns} turns, ${data.names.length} bots`;
    render();
  } catch (e) {
    document.getElementById('status').textContent = 'Error: ' + e.message;
  }
};

document.getElementById('btnPlay').onclick = () => {
  if (!data) return;
  playing = !playing;
  document.getElementById('btnPlay').textContent = playing ? 'Pause' : 'Play';
  if (playing) startPlayback();
  else clearInterval(playTimer);
};

document.getElementById('btnStep').onclick = () => {
  if (!data) return;
  playing = false;
  clearInterval(playTimer);
  document.getElementById('btnPlay').textContent = 'Play';
  if (frame < data.frames.length - 1) {
    frame++;
    render();
  }
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

function render() {
  if (!data || !data.frames[frame]) return;

  const f = data.frames[frame];
  const bots = f.bots;
  const bullets = f.bullets;
  const arenaW = data.arena[0];
  const arenaH = data.arena[1];
  const scale = W / arenaW;
  const r = data.botRadius * scale;

  // Clear
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, W, H);

  // Arena border
  ctx.strokeStyle = '#333';
  ctx.strokeRect(0, 0, W, H);

  // Draw bullets
  for (let i = 0; i < bullets.length; i++) {
    const b = bullets[i];
    const bx = b[0] * scale;
    const by = H - b[1] * scale; // flip y so 0 is bottom
    ctx.fillStyle = BULLET_COLOR;
    ctx.beginPath();
    ctx.arc(bx, by, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw bots
  for (let i = 0; i < bots.length; i++) {
    const b = bots[i];
    const alive = b[7];
    if (!alive) continue;

    const bx = b[1] * scale;
    const by = H - b[2] * scale;
    const dir = b[3];
    const turret = b[4];
    const hp = b[5];
    const color = BOT_COLORS[i % BOT_COLORS.length];

    // Bot body
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

    // Turret line
    const tRad = (-turret + 90) * Math.PI / 180; // convert to canvas coords
    const tLen = r * 2;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(bx + Math.cos(tRad) * tLen, by - Math.sin(tRad) * tLen);
    ctx.stroke();

    // Vision cone (faint)
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

    // HP bar
    const barW = r * 2;
    const barH = 3;
    const barY = by + r + 5;
    ctx.fillStyle = '#333';
    ctx.fillRect(bx - barW / 2, barY, barW, barH);
    ctx.fillStyle = hp > 50 ? '#4f4' : hp > 25 ? '#ff4' : '#f44';
    ctx.fillRect(bx - barW / 2, barY, barW * (hp / 100), barH);

    // Name
    ctx.fillStyle = '#888';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(data.names[i], bx, by - r - 5);
  }

  // HUD
  document.getElementById('turnLabel').textContent = `Turn: ${f.turn}`;
  let info = '';
  for (let i = 0; i < bots.length; i++) {
    const b = bots[i];
    const name = data.names[i];
    const color = BOT_COLORS[i % BOT_COLORS.length];
    info += `<span style="color:${color}">${name}</span> HP:${b[5]} `;
  }
  info += ` | Bullets: ${bullets.length}`;
  document.getElementById('info').innerHTML = info;
}

// Handle keyboard
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    document.getElementById('btnPlay').click();
  }
  if (e.code === 'ArrowRight') {
    document.getElementById('btnStep').click();
  }
  if (e.code === 'ArrowLeft' && data && frame > 0) {
    frame--;
    render();
  }
});
