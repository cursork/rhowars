# rhowars

**THIS IS A TOY PROJECT.**

**IT IS ALSO A CLAUDE PROJECT**

**YOU ALSO CAN'T RUN IT, BECAUSE IT RELIES ON A PRIVATE DEPENDENCY**

The code is public purely for ease of sharing.

----

A RoboWar-inspired game where bots ("rhobots") are programmed in Dyalog APL and
battle in a free-for-all arena.

[A small video of the proof of concept](demo.mp4) shows two rhobots battling it
out. They are intentionally dumb. I want players to be cleverer in the code they
write.

### Included Rhobots

1. [Spinner](APLSource/Rhobots/Spinner) — spin and fire indiscriminately, move to the centre
2. [RandomWalker](APLSource/Rhobots/RandomWalker) — random path, fire at anything in sight
3. [Coward](APLSource/Rhobots/Coward) — hide in a corner, sweep inward, fire and flee on sight
4. [Kamikaze](APLSource/Rhobots/Kamikaze) — spiral patrol (tight or wide), charge on sight
5. [Camper](APLSource/Rhobots/Camper) — stay still, aim at centre, fire every tick
6. [Orbiter](APLSource/Rhobots/Orbiter) — strafe around targets, orbit centre when idle
7. [Remote](APLSource/Rhobots/Remote.apln) — externally controlled via REST API; multiple Remotes per match, each with a unique slot and token

## Quick Start

```apl
⍝ Link
]link.create rw /path/to/rhowars/APLSource
⍝ NOTA BENE - not yet released!
]link.create stark /path/to/Stark/APLSource

⍝ Run tests
rw.Tests.RunAll

⍝ Run a match (headless)
m←rw.Engine.Run rw.Rhobots.Spinner rw.Rhobots.RandomWalker
m.bots[;6 8]   ⍝ HP and alive status
⍝ Bot matrix columns: id x y direction turret hp cooldown alive

⍝ Start the API
app←⎕NEW rw.Web.App (stark.Stark rw)
app.Start 8080
```

The web frontend is in `static/`. Use Caddy (or similar) to serve it alongside
the API:

```
caddy run
```

Then open http://localhost:8000. **NOTA BENE** this is 8000 and _not_ the 8080
that the APL API is running on.

## Writing Rhobots

A rhobot is a namespace containing Init and Tick:

### `Init.aplf`

Called once at match start. Returns a namespace that will be passed back to you
each turn as persistent state.

```apl
 state←Init
 state←()
 state.mood←'aggressive'
 state.turnsSinceHit←0
```

### `Tick.aplf`

Called every turn. Takes an input namespace, returns an actions namespace.

```apl
 actions←Tick input
 ⎕IO←0
 actions←(
   direction: 90              ⍝ movement heading in degrees
   turret: input.turret       ⍝ turret angle in degrees
   fire: 1                    ⍝ 0 or 1 (engine enforces cooldown)
   state: input.state         ⍝ updated persistent state
 )
```

#### Input fields

| Field     | Type      | Description |
|-----------|-----------|-------------|
| `loc`     | 2-vector  | Your (x, y) position |
| `direction` | scalar  | Current movement heading in degrees |
| `turret`  | scalar    | Current turret angle in degrees |
| `visible` | K×3 matrix | Visible objects: (distance, angle_offset, type). Type: 0=rhobot, 1=bullet. Empty `0 3⍴0` if nothing visible |
| `hp`      | scalar    | Current hit points |
| `arena`   | 2-vector  | Arena dimensions (width, height) |
| `state`   | namespace | Your persistent state from previous turn |
| `cfg`     | namespace | Game config (see below) |

The `visible` matrix contains everything in your vision cone. `angle_offset` is
relative to your turret — positive means the object is clockwise from where
you're pointing. To aim at the nearest visible rhobot:

```apl
rhobots←(vis[;2]=0)⌿vis            ⍝ filter to rhobots only
nearest←rhobots[⊃⍒rhobots[;0];]   ⍝ closest one
actions.turret←360|input.turret+nearest[1]  ⍝ turn toward it
```

### Output fields

| Field       | Type      | Description |
|-------------|-----------|-------------|
| `direction` | scalar    | Desired movement heading in degrees |
| `turret`    | scalar    | Desired turret angle in degrees |
| `fire`      | 0 or 1    | Request to fire (blocked if on cooldown) |
| `state`     | namespace | Your updated persistent state |
| `speed`     | 0 or 1    | Optional. 0 = stay still, 1 = move (default 1) |
| `thought`   | string    | Optional narration shown in replay viewer |

Any field set to `⍬` or omitted means "no change" — the engine keeps the
current value. Return `()` (or `⎕NS⍬` in namespace scripts) to do nothing.

### Angles

Clockwise from 0° being up/north.

### Tips

- Your `Tick` has a time limit. If it times out, you do nothing that turn.
- You can store anything in `state` — observation history, target tracking,
  planned paths.
- Bullets travel at 20 units/turn. You move at 5. You cannot outrun a bullet.
- Your vision cone is 45° to each side of your turret, range 300.
- Cooldown is 5 turns between shots. Every shot counts.
- The arena has walls. Bots are clamped to the boundary.
- Bullet damage is 20. You start with 100 HP. Five hits and you're dead.
- Bots that collide bounce apart and take damage. Don't get cornered together.

## Game Parameters

All parameters live in [Cfg.apln](APLSource/Cfg.apln) and can be tweaked from
the web UI config panel. Changes persist until the server is restarted.

| Parameter        | Default |
|------------------|---------|
| Arena            | 1000 × 1000 |
| Bot speed        | 5 units/turn |
| Bot HP           | 100 |
| Bot radius       | 10 |
| Bullet speed     | 20 units/turn |
| Bullet damage    | 20 |
| Vision cone      | 45° half-angle, 300 range |
| Shot cooldown    | 5 turns |
| Collision damage | 5 |
| Collision bounce | 1.5× |
| Max turns        | 2000 |
| Thought persist  | 50 turns |
