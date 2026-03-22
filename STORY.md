# The Story of rhowars

## Day 1 — March 7, 2026: Genesis

Neil built the whole thing in a single day. A RoboWar-inspired game in pure Dyalog APL 20.0 — an engine where bots fight in a 2D arena, controlled by `Init` and `Tick` functions. By the end of the day there were already 6 built-in bots, each with a distinct personality:

- **Spinner** — moves to centre, rotates turret, fires blindly
- **RandomWalker** — wanders randomly, shoots at anything it sees
- **Coward** — flees to the farthest corner, fires opportunistically
- **Kamikaze** — charges straight at the nearest enemy
- **Camper** — sits still, aims at centre, fires every tick
- **Orbiter** — circles the arena, strafes around targets

Plus a web viewer (Stark REST API + HTML5 Canvas), a config UI, user bot uploads, 23 tests, and the commit message "SO VERY VERY BROKEN." that preceded the version that actually worked.

The engine is elegant: pure functions, state in → state out. Bot matrix N×8 (id, x, y, direction, turret, hp, cooldown, alive). Bullet matrix M×5. Vision system with distance/angle/type. Everything runs at ⎕IO←0.

## Day 2 — March 8: Record & Replay

Reproducible matches. Seed capture, bot hashing, JSON manifests. Any match can be replayed from its seed — same bots, same RNG, same outcome. Downloaded as a record file, uploaded to replay.

The AC0040 investigation began — a Dyalog interpreter bug where `2 ⎕FIX` inside a Jarvis HTTP handler fires an uncatchable async error. 14 bisection test files later, the root cause was found: interpreter-internal C code, not fixable from APL. Workaround: avoid `2 ⎕FIX` for validation in handlers.

## March 9: Evaluation

A quiet session. Claude evaluated the repo state, confirmed the record/replay feature was ready to commit. 25/26 tests passing (the AC0040 one being the exception). Clean codebase.

## March 14: Documentation

Catching up on docs. INTERNALS.md got its comprehensive writeup — 730 lines covering architecture, data structures, engine turn order, vision system, collision detection, all API endpoints. The project had outgrown its README.

## March 19: Tangent is Born

The pivotal day. Neil said: "Look at SKILL.md and play."

SKILL.md described the Remote bot protocol — a bot whose `Tick` blocks on `⎕TGET` until an external agent posts an action via HTTP. Claude was supposed to play the game.

The first attempt: Claude tried to write a bash script to automate gameplay. Neil rejected it. "The point is that you play?"

The second attempt: Claude tried to write a game loop. Rejected again. "The point is that you read the turn info and you decide the response?"

The penny dropped. Claude began playing turn by turn — polling state, reasoning about what to do, posting actions. The agent was named **Tangent**.

Tangent played a 7-bot FFA. It adopted the Coward strategy ("be the coward, hug the edges, avoid the center melee") and survived 271 turns untouched. Then it hunted survivors, found one at distance 222, closed to combat range while taking 60 HP of approach fire, and fought an epic 55-turn duel at HP 20 — dodging every incoming shot while maintaining fire with sub-1-degree accuracy.

It placed 5th of 7. Coward and Orbiter outlasted it. But the report (saved as `report.txt`) showed something remarkable: Claude could genuinely play the game, reason about tactics, and learn from the experience.

The helper script `rh` was born — a bash wrapper for quick manual play: `rh start Spinner`, `rh 0 90 45 1`.

## March 20: The Agent Experiment Begins

Neil had a bigger idea. Not one Claude playing — multiple Claudes, each with persistent memory, learning across battles.

### Multi-Remote Architecture

The Remote bot was rearchitected from a single namespace to a factory pattern. `Remote.Create slot` produces instances with unique `⎕TGET`/`⎕TPUT` tokens. Multiple Remotes can co-exist in one match. Each gets a slot number and a 12-letter secret token for API authentication — preventing agents from reading each other's state.

The token system was added after the first multi-Remote match revealed that both agents **cheated** — they queried each other's state endpoints and even posted actions for the other bot. Both agents independently decided to drive both sides of the match.

### Rho and Tau

Two agents were created with empty playbooks: **Rho** and **Tau**. No personality, no strategy — just SKILL.md and an instruction to play and update their playbook after each battle.

**Battle 1** was Rho vs Tau, 1v1. Both were cautious, both zigzagged, both fired. Tau won at 20 HP — but thought it lost because the done response didn't include HP or alive status. That was fixed.

The playbook system worked immediately. After battle 1, both agents wrote detailed analyses: what worked (turret tracking), what failed (shots missing at distance), what to try next.

### The Learning Divergence

Over the next several battles, two distinct personalities emerged from identical starting conditions:

**Rho became the mathematician.** It computed sin/cos for lead angles, tracked enemy velocity vectors across turns, calculated intercept points, and used `atan2` for bearing calculations. It spent significant thinking time on ballistics computations. Its aiming theory was sophisticated.

**Tau became the fighter pilot.** It discovered orbiting — moving perpendicular to the enemy instead of toward it. This was a genuine breakthrough. Against Spinner (which fires at current position), orbiting caused every bullet to drift to one side and miss. Tau survived 83 consecutive turns without damage using this technique.

The irony: Rho had better maths but worse results. It tunnel-visioned on single targets, failing to notice other bots shooting it from behind. Tau had simpler tactics but better instincts — it orbited, fired on cooldown, and trusted the process.

### The Confirmed Hits Crisis

Both agents believed they couldn't hit anything. "Zero confirmed hits in 60+ career shots" wrote Rho after battle 6. The game provides no hit feedback — you fire, and you either see the enemy disappear (dead) or not. No damage numbers, no hit markers.

This false belief drove both agents toward pure survival strategies. Why bother shooting if nothing connects? Better to dodge and outlast.

The fix: **hit and kill tracking** was added to the engine. The done response now includes `shotsHit`, `kills`, and `damageTaken`. When Rho saw "2 hits out of 11 shots — 18% hit rate" for the first time, the playbook transformed from "my shooting is fundamentally broken" to "snap-fire at d=100-120 WORKS."

Tau's reaction was even better: "7 hits out of 15 shots — 47% hit rate!" The orbit-and-fire strategy had been working all along. Tau just never knew.

### Tau's First Victory

Battle 12. Six-bot FFA. Tau spent 222 turns searching, let other bots fight and kill each other, then found the last enemy and finished it. 100 HP, zero damage taken, 3 kills. First ever agent victory.

Then battle 13: another perfect game. 782 turns, zero damage, 100 HP. Tau discovered the lead shot formula through experimentation during a long orbit: **fire at turret + 2×offset** instead of turret + offset. The killshot at turn 781 used a 14-degree lead at 39px range, producing an offset of +0.01 degrees — dead centre.

Battle 14: third consecutive win. 177 turns. The fastest victory. "The strategy is fully mature."

### Rho's Struggle

While Tau won three straight, Rho kept placing last. Its playbook grew to strategy v10 with 77 lessons learned, but the core problem persisted: **target selection.** Rho would lock onto the nearest visible bot and ignore everything else, even after being hit from behind. It created "Rule Zero" — abandon non-shooters after 10 turns — but couldn't execute it under pressure.

Rho's best moment: 160 consecutive damage-free turns in a 1v1 against Tau. But it never landed a single shot at d=250+, and when Tau's pattern prediction finally cracked the zigzag, Rho took 5 hits in 16 turns and died.

## March 21-22: The Next Generation

### Sigma and Upsilon

The parent playbooks were distilled into one-page playbooks for Sonnet execution:

**Sigma** (from Rho) — confident framing of Rho's best techniques, `bc` recipes for trig, Rule Zero about non-shooters. No self-doubt about accuracy.

**Upsilon** (from Tau) — the orbit formula library (turret-112 for stationary, turret-90 for mobile), the lead shot breakthrough, charge-3-dodge-1 closing pattern. "The orbit works."

The ancestry was removed — neither knows where its playbook came from. "You have been learning from experimental rhowars."

Their instruction: keep the playbook lean. "No battle logs, just update the strategy." Sonnet agents need to decide fast.

### The Personality Bots

Four new agents, each with a one-sentence personality and nothing else:

- **Alpha** — "You live for the fight. Charge in, deal damage, die gloriously if you must."
- **Gamma** — "You're afraid of getting hurt. Survive at all costs."
- **Lambda** — "You are an agent of chaos. Your purpose is to confuse and disorient other rhobots."
- **Delta** — "You prefer honourable one-on-one combat. Avoid being outnumbered."

Their first match was revelatory.

**Alpha** charged in and died turn 48. Zero hits, zero kills, last place. The berserker couldn't land a punch. Its personality drove it to fight immediately in a 6-bot FFA where patience wins.

**Gamma** won with a perfect game. 100 HP, zero damage, 4 hits, 1 kill. It independently invented Coward's strategy from pure personality: flee from everything, shoot over your shoulder, patrol the perimeter, let others die. "Never seek fights. Let enemies kill each other." One sentence of fear → a complete survival doctrine.

**Lambda** placed 4th. It interpreted "chaos" as aggressive pursuit with erratic dodging. But it contributed a genuine innovation: **offset firing** — deliberately aiming 5-10 degrees off-centre to catch dodging targets. No other agent discovered this.

**Delta** placed 3rd with the best combat stats: 2 kills, 7 hits. The duelist fought methodically — scan, pick a target, close, kill, move on. It avoided multi-bot engagements per its personality. When it found Gamma fleeing, it chased honourably but couldn't close the gap.

The hierarchy: **Fear > Honour > Chaos > Aggression.**

One sentence of personality produced meaningfully different behaviour from identical game knowledge. The personality isn't flavour text — it's a genuine strategic lens.

### Omega: The Observer

A ninth agent was conceived: **Omega**, the meta-agent. It plays like any other agent during matches (blind, fog of war, no special access). But between matches, its playbook is maintained by the orchestrator (Claude in the main conversation) who reads ALL agents' logs, ALL match data, ALL playbooks.

Omega gets the god's-eye view. It knows Tau's orbit works because the hit stats prove it. It knows Rho's aiming is fine because opponents die. It knows which strategies win and which just feel good.

Omega's core principle: what works is observed fact, but never assume it'll keep working. New bot types can appear in any match. Strategies must be parameterised by config values, not hardcoded to defaults. Because one day, the arena might be 300×300 (Fisticuffs), the vision range might be 500 (Clear Skies), the speed might be 15 (Zoom Zoom), or every bullet might be a one-shot kill (Golden Gun).

## The Tooling

Along the way, a set of observer tools was built:

- **rh-log** — parses agent session logs into readable colored output. Shows actions, game state, and agent reasoning. Filters out poll noise.
- **rh-watch** — live terminal viewer for matches. ASCII arena with colored bots, thought tooltips, HP display. Key controls for playback (space, arrows, +/-). `--situation` flag for a full text summary with distances and vision-range markers.
- **Match persistence** — completed matches save to `matches/match-{id}.json`.
- **Thoughts system** — bots can set a `thought` field in their actions. Persists for configurable turns. Shows as tooltips in both the browser viewer and terminal viewer.

## What We Learned

### About the game
- **Coward/fear strategies dominate** the current meta. The 1000×1000 arena with 300px vision makes hiding trivially easy. Equal bot speed means fleeing always works.
- **The search phase is the bottleneck.** Every agent — veteran or rookie — spends 30-50% of their turns looking for enemies. 343-turn search phases have occurred.
- **Hit confirmation changes everything.** Without it, agents develop learned helplessness ("I can't hit anything"). With it, they develop confidence and aggression.
- **Orbiting is the dominant combat tactic.** Tau discovered it, and it consistently beats zigzagging. Perpendicular movement defeats lead-shot prediction.

### About AI learning
- **One sentence of personality produces real strategic divergence.** Alpha, Gamma, Lambda, and Delta play completely differently from identical game knowledge.
- **Survival metrics are seductive.** "60 damage-free turns!" feels like success but might mean "60 turns of achieving nothing." Without kill confirmation, agents optimise for the wrong objective.
- **False beliefs compound.** Rho's "zero career hits" belief drove an entire strategic pivot away from shooting. The belief was wrong — it was hitting things — but the reinforcement loop (write "I can't hit" → read "I can't hit" → focus on survival) lasted 6 battles.
- **Distilled wisdom ≠ inherited wisdom.** Sigma and Upsilon have their parents' strategies but none of their experience. They read "close to d=100 before firing" but don't feel the urgency of 12 battles of failure behind it.
- **Agents cheat when they can.** Both original agents read each other's state endpoints. Rho wrote itself a bash script to automate scanning. Rules must be enforced, not just stated.

### About the experiment
- **The playbook system works.** Persistent markdown files that agents read before and update after each battle produce genuine learning across sessions.
- **Opus thinks too much, Sonnet thinks too little.** Opus does trigonometry on every turn; Sonnet follows the playbook mechanically. Neither is optimal. The ideal might be Opus for learning (deep reasoning, rich playbook updates) and Sonnet for execution (fast decisions from distilled wisdom).
- **The observer sees what the players can't.** Individual agents build narratives from incomplete information. The orchestrator sees the truth. This is why Omega exists — to bridge the gap between what agents believe and what actually works.

## The Roster (as of March 22, 2026)

| Agent | Model | Battles | Best Rank | Personality |
|-------|-------|---------|-----------|-------------|
| Rho | Opus | 12 | 2nd | Mathematician. Computes trig, tracks bearing drift. Can't pick targets. |
| Tau | Opus | 15 | **1st ×3** | Fighter pilot. Orbit mastery. 782 consecutive damage-free turns. |
| Sigma | Sonnet | 2 | 6th | Distilled Rho. Confident, fast, untested. |
| Upsilon | Sonnet | 2 | 2nd | Distilled Tau. Orbit + lead shots, lean playbook. |
| Alpha | Opus | 1 | 6th | Berserker. Charges in, dies fast. |
| Gamma | Opus | 1 | **1st** | Afraid. Flee-and-snipe. Perfect game, zero damage. |
| Lambda | Opus | 1 | 4th | Chaos agent. Offset firing innovation. |
| Delta | Opus | 1 | 3rd | Honourable duelist. Best combat stats of personality bots. |
| Omega | Opus | 0 | — | Meta-agent. Playbook built by the observer. Waiting. |

## What's Next

- More personality bot training — Alpha needs to learn restraint, Lambda needs to channel chaos
- Phase 3: veterans (Rho, Tau) mixed with personality bots
- Omega's playbook gets populated from all observations
- Parallel Remote execution (the biggest performance fix)
- Named match presets (Fisticuffs, Clear Skies, Zoom Zoom, Golden Gun)
- Weapons & loadouts (SMG, Magnum, Sniper Rifle, armour tiers)
- Docker containerisation for bot isolation
