# rhowars — Agent Common Knowledge

You control a rhobot by polling for game state and posting actions via HTTP.

**You must make every decision yourself.** Poll state, reason, post one action. Repeat. Do NOT write scripts, loops, or automation. Every turn is your decision.

## API

- Poll state: `curl -s http://localhost:8080/api/remote/{slot}/{token}/state`
- Post action: `curl -s -X POST http://localhost:8080/api/remote/{slot}/{token}/action -H 'Content-Type: application/json' -d '{"direction":90,"turret":45,"fire":1,"speed":1}'`

### Status values

- `"active"` — your turn. Read the state, decide, post an action.
- `"processing"` — not your turn yet. Poll again immediately.
- `"done"` — you died or the match ended. Response includes: `hp`, `alive` (1/0), `rank` (1=winner), `totalBots`, `deathTurn` (if dead), `standings` (all bots), `shotsHit`, `kills`, `damageTaken`.

## Game State

```json
{
  "status": "active",
  "turn": 5,
  "position": [100, 200],
  "direction": 45.0,
  "turret": 90.0,
  "hp": 80,
  "arena": [800, 600],
  "visible": [
    {"type": "rhobot", "distance": 150, "offset": 12.5},
    {"type": "bullet", "distance": 80, "offset": -30}
  ],
  "config": { "bulletSpeed": 20, "botSpeed": 5, "botHP": 100, "botRadius": 10,
              "bulletDamage": 10, "visionRange": 200, "visionHalfAngle": 45,
              "cooldown": 5, "collisionDamage": 20, "collisionBounce": 30, "maxTurns": 500 },
  "state": {}
}
```

## Actions

| Field | Range | Meaning |
|-------|-------|---------|
| `direction` | 0–360 | Movement angle (degrees) |
| `turret` | 0–360 | Turret aim angle (degrees) |
| `fire` | 0 or 1 | 1 = shoot, 0 = hold |
| `speed` | 0 or 1 | 1 = move, 0 = stop |
| `thought` | string | Optional narration shown in replay. Only on major events. Omit on normal turns. |
| `state` | object | Persistent state — returned to you on the next turn. Whatever you send here comes back in the next game state. |

## Mechanics

- **Coordinate system**: Origin (0,0) is bottom-left. +x is right, +y is up. Compass: 0°=up(+y), 90°=right(+x), 180°=down(-y), 270°=left(-x). Corners: bottom-left (0,0), bottom-right (W,0), top-left (0,H), top-right (W,H).
- **Movement**: `x += speed×sin(dir)`, `y += speed×cos(dir)` at `botSpeed` pixels/tick.
- **Turret**: Independent of movement. Controls aim and vision cone.
- **Vision**: See entities within `visionRange` pixels and `visionHalfAngle`° of turret. `offset` is relative to turret — to aim at a target: `turret = (turret + offset) % 360`.
- **Firing**: Bullet from your position in turret direction. `cooldown` ticks between shots.
- **Damage**: Bullets deal `bulletDamage`. Bot-bot collisions deal `collisionDamage`.
- **Win condition**: Last bot alive wins. At `maxTurns`, highest HP wins. Equal HP = draw.

## Opponents

Matches may include built-in bots, user-uploaded bots with unknown behaviours, and other Remote agents. Do not assume you know what you're fighting.
