# rhowars

**THIS IS A TOY PROJECT.**

**IT IS ALSO A CLAUDE PROJECT**

**YOU ALSO CAN'T RUN IT, BECAUSE IT RELIES ON A PRIVATE DEPENDENCY**

The code is public purely for ease of sharing. Current time spent is ~90 mins
to get a proof of concept, which is all this is, as it stands.

----

A RoboWar-inspired game where bots ("rhobots") are programmed in Dyalog APL and
battle in a free-for-all arena.

[A small video of the proof of concept](demo.mp4) shows two rhobots battling it
out. They are intentionally dumb. I want players to be cleverer in the code they
write.

1. [Spinner](APLSource/Rhobots/Spinner) - spin and fire indiscriminately, whilst
   moving to the centre
2. [RandomWalker](APLSource/Rhobots/RandomWalker) - just choose a random path
   and if you get another rhobot in your sights, start firing

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

A rhobot is a directory under `APLSource/Rhobots/` containing two functions:

### `Init.aplf`

Called once at match start. Returns a namespace that will be passed back to you
each turn as persistent state.

```apl
 state←Init
 state←⎕NS ''
 state.mood←'aggressive'
 state.turnsSinceHit←0
```

### `Tick.aplf`

Called every turn. Takes an input namespace, returns an actions namespace.

```apl
 actions←Tick input
 ⎕IO←0
 actions←⎕NS ''
 actions.direction←90        ⍝ movement heading in degrees
 actions.turret←input.turret ⍝ turret angle in degrees
 actions.fire←1              ⍝ 0 or 1 (engine enforces cooldown)
 actions.state←input.state   ⍝ updated persistent state
```

#### Input fields

| Field     | Type      | Description |
|-----------|-----------|-------------|
| `loc`     | 2-vector  | Your (x, y) position |
| `turret`  | scalar    | Current turret angle in degrees |
| `visible` | K×3 matrix | Visible objects: (distance, angle_offset, type). Type: 0=rhobot, 1=bullet. Empty `0 3⍴0` if nothing visible |
| `hp`      | scalar    | Current hit points |
| `arena`   | 2-vector  | Arena dimensions (width, height) |
| `state`   | namespace | Your persistent state from previous turn |

The `visible` matrix contains everything in your vision cone. `angle_offset` is
relative to your turret — positive means the object is clockwise from where
you're pointing. To aim at the nearest visible rhobot:

```apl
rhobots←(vis[;2]=0)⌿vis            ⍝ filter to rhobots only
nearest←rhobots[⊃⍒rhobots[;0];]   ⍝ closest one
actions.turret←360|input.turret+nearest[1]  ⍝ turn toward it
```

#### Output fields

| Field       | Type      | Description |
|-------------|-----------|-------------|
| `direction` | scalar    | Desired movement heading in degrees |
| `turret`    | scalar    | Desired turret angle in degrees |
| `fire`      | 0 or 1    | Request to fire (blocked if on cooldown) |
| `state`     | namespace | Your updated persistent state |
| `speed`     | 0 or 1    | Optional. 0 = stay still, 1 = move (default 1) |

#### Angles

Clockwise from 0° being up/north

### Example: Minimal Bot

```apl
⍝ MyBot/Init.aplf
 state←Init
 state←⎕NS ''

⍝ MyBot/Tick.aplf
 actions←Tick input
 ⎕IO←0
 actions←⎕NS ''
 actions.direction←?360
 actions.turret←360|input.turret+5
 actions.fire←1
 actions.state←input.state
```

### Tips

- Your `Tick` has a time limit. If it times out, you do nothing that turn.
- You can store anything in `state` — observation history, target tracking,
  planned paths.
- Bullets travel at 20 units/turn. You move at 5. You cannot outrun a bullet.
- Your vision cone is 45° to each side of your turret, range 300.
- Cooldown is 5 turns between shots. Every shot counts.
- The arena has walls. Bots are clamped to the boundary.
- Bullet damage is 20. You start with 100 HP. Five hits and you're dead.

## Game Parameters

| Parameter    | Value |
|--------------|-------|
| Arena        | 1000 x 1000 |
| Bot speed    | 5 units/turn |
| Bot HP       | 100 |
| Bot radius   | 10 |
| Bullet speed | 20 units/turn |
| Bullet damage| 20 |
| Vision cone  | 45° half-angle, 300 range |
| Shot cooldown| 5 turns |
| Max turns    | 2000 |
