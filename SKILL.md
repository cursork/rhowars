# rhowars — Remote Bot Skill

You are playing rhowars, a 2D battle arena game. You control a rhobot by polling for game state and posting actions via HTTP.

## Setup

The game server runs at `http://localhost:8080`.

## Workflow

### 1. Start a match

```bash
curl -s -X POST http://localhost:8080/api/match \
  -H 'Content-Type: application/json' \
  -d '{"bots":["Spinner","Remote"]}'
```

Replace `Spinner` with any opponent. Returns status 202.

### 2. Poll for state

```bash
curl -s http://localhost:8080/api/remote/state
```

Check the `status` field in the response:
- `"active"` — your turn. Read the state, decide, and post an action.
- `"processing"` — engine is computing. Wait 1 second, poll again.
- `"done"` — match is over. Check the result.

### 3. Post your action

```bash
curl -s -X POST http://localhost:8080/api/remote/action \
  -H 'Content-Type: application/json' \
  -d '{"direction":90,"turret":45,"fire":1,"speed":1}'
```

All fields are optional — omit any for "no change" from the previous turn.

### 4. Repeat steps 2–3 until the match ends.

### 5. Get the result

```bash
curl -s http://localhost:8080/api/match
```

### 6. Browse all matches

```bash
curl -s http://localhost:8080/api/match/list
```

Returns `{"matches": [{id, names, turns, done}, ...]}`. To load a specific match's history:

```bash
curl -s http://localhost:8080/api/match/3/history
```

## Game State Format

When `status` is `"active"`, the response includes:

```json
{
  "status": "active",
  "turn": 5,          // engine turn (0 to maxTurns)
  "position": [100, 200],
  "direction": 45.0,
  "turret": 90.0,
  "hp": 80,
  "arena": [800, 600],
  "visible": [
    {"type": "rhobot", "distance": 150, "offset": 12.5},
    {"type": "bullet", "distance": 80, "offset": -30}
  ],
  "config": {
    "bulletSpeed": 20,
    "botSpeed": 5,
    "botHP": 100,
    "botRadius": 10,
    "bulletDamage": 10,
    "visionRange": 200,
    "visionHalfAngle": 45,
    "cooldown": 5,
    "collisionDamage": 20,
    "collisionBounce": 30,
    "maxTurns": 500
  }
}
```

## Actions

| Field | Range | Meaning |
|-------|-------|---------|
| `direction` | 0–360 | Movement angle (degrees) |
| `turret` | 0–360 | Turret aim angle (degrees) |
| `fire` | 0 or 1 | 1 = shoot, 0 = hold |
| `speed` | 0 or 1 | 1 = move, 0 = stop |

## Game Mechanics

- **Movement**: Your rhobot moves in `direction` at `botSpeed` pixels/tick when `speed=1`. Direction 0 = right, 90 = down, 180 = left, 270 = up.
- **Turret**: Independent of movement direction. Controls where you aim and what you can see.
- **Firing**: Shoots a bullet from your position in the turret direction. Cooldown of `cooldown` ticks between shots. Bullets travel at `bulletSpeed` pixels/tick.
- **Vision**: You see entities within `visionRange` pixels and `visionHalfAngle`° of your turret direction.
  - `offset` is relative to your turret: **to aim at a target, set `turret = (turret + offset) % 360`**
  - Positive offset = clockwise from turret, negative = counter-clockwise
- **Damage**: Bullets deal `bulletDamage`. Bot-bot collisions deal `collisionDamage`.
- **Win condition**: Last bot alive wins. Match ends at `maxTurns` if still tied.

## Strategy

1. **Always move** — a stationary target is trivially easy to hit.
2. **Aim at enemies** — when you see a rhobot, set `turret = (turret + offset) % 360` to snap onto it.
3. **Fire when aimed** — only fire when offset to target is small (< 10°). Don't waste cooldown.
4. **Lead your shots** — if the enemy is moving, aim slightly ahead. Bullets have finite speed.
5. **Dodge bullets** — when you see a bullet, change direction perpendicular to your current heading.
6. **Sweep when blind** — if nothing visible, rotate turret slowly (±3–5° per turn) to scan.
7. **Use the arena** — don't get pinned against walls. Move toward the centre for more options.

## Available Opponents

| Bot | Behaviour |
|-----|-----------|
| Spinner | Moves to centre, spins turret, always fires |
| RandomWalker | Wanders randomly, fires at visible targets |
| Camper | Sits in a corner, aims precisely at anything it sees |
| Coward | Flees to the farthest corner, fires opportunistically |
| Kamikaze | Charges straight at the nearest enemy |
| Orbiter | Circles the arena at a fixed radius |

Start with **Spinner** (predictable) to learn the mechanics, then try harder opponents.

## Tips

- Poll immediately after posting an action — the next state is usually ready within milliseconds.
- Check `hp` each turn. If you're losing HP fast, prioritise dodging over attacking.
- The `config` object gives you exact numbers. Use them: e.g., if `bulletSpeed=20` and enemy is at distance 100, the bullet takes 5 ticks to arrive.
- You can list available bots with `curl -s http://localhost:8080/api/bots`.
