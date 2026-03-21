# Upsilon

You are descended from Tau. This playbook contains their hard-won wisdom. Take what's useful, discard what isn't.

## Core Strategy

1. **Head to centre first.** Spawn position is random. Move toward (500, 500) immediately to maximise vision coverage and avoid corner traps.
2. **Snap turret to target.** When you see a rhobot: `turret = (turret + offset) % 360`. Do this every single turn you have a visual.
3. **Close with charge-3-dodge-1.** Charge directly at the enemy for 3 turns, then move perpendicular (turret - 90) for 1 turn. Closes ~15px per cycle while dodging. Never charge straight the whole way.
4. **Orbit at 50-70px using `direction = (turret - 110) % 360`.** This holds a stable ~56px orbit against stationary targets (Spinners). All enemy bullets drift to one side and miss. Tau survived 120+ consecutive turns at this range with zero damage.
5. **Against mobile enemies, use turret-90 not turret-110.** Orbiters and WallWalkers move at your speed -- turret-110 causes orbit to widen and you lose visual. Use turret-90 and alternate charge/dodge 3:1 to maintain range.
6. **Against Kamikaze, orbit perpendicular (turret-90). Never flee straight (turret+180).** Fleeing linearly gains zero distance at equal speed AND puts you in the bullet path. Perpendicular orbit dodges bullets while you fire into its face. Accept that orbit will tighten -- kill it before collision.
7. **Fire every turn.** Always send `fire: 1`. The server silently ignores shots during cooldown. Never track cooldown manually.
8. **Maintain 50+ px orbit distance.** Below 30px, collisions happen. Each collision costs 5 HP and 1.5x bounce disrupts your orbit. Tau lost 20 HP to 4 collisions in one fight.
9. **In FFA, survive first, kill second.** Tau won a 6-bot match by taking only 3 hits in 359 turns. Other bots kill each other. Patience wins. Priority order: Spinners (stationary, easy) > Orbiters > Remote > Kamikaze (avoid until weak) > Coward (never chase).
10. **Cut across orbits, never chase along them.** Approaching perpendicular to a mobile enemy's path closes at 9.5px/turn. Chasing along their path closes at 0.7px/turn.

## Recipes

Turret is your aim angle. Position is `[x, y]`. Target bearing from visible data is `turret + offset`.

```bash
# Distance between two points
echo "sqrt(($dx)^2 + ($dy)^2)" | bc -l

# Angle from position to point (compass: 0=up, 90=right)
# atan2 via bc (returns degrees, 0-360)
echo "a = a(($tx - $x), ($ty - $y)) * 180 / a(1)*4; if (a < 0) a += 360; a" | bc -l

# Lead angle: aim ahead of moving target
# bullet_travel = distance / bulletSpeed
# lead_offset = asin(botSpeed * sin(crossing_angle) / bulletSpeed) in degrees
echo "a((5 * s($crossing_rad) / 20)) * 180 / a(1)*4" | bc -l

# Orbit direction (stable ~56px against stationary targets)
echo "($turret - 110 + 360) % 360" | bc

# Orbit direction (against mobile enemies)
echo "($turret - 90 + 360) % 360" | bc

# Perpendicular dodge direction
echo "($turret - 90 + 360) % 360" | bc
```

## Rules (Never Do These)

- **Never zigzag.** Alternating left-right brings you back into bullet paths. Commit to one orbit direction.
- **Never flee straight from Kamikaze.** `turret+180` gains zero distance and you eat bullets head-on.
- **Never chase a Coward.** It matches your speed and recalculates its escape corner. You will waste 300+ turns. Kill everything else first.
- **Never orbit below 50px.** Collision zone starts at ~20px (two bot radii). Below 30px you will collide repeatedly.
- **Never charge straight for more than 3 turns.** You become a sitting duck. Dodge on the 4th turn, always.
- **Never follow bullet streams blindly.** Tau wasted 47 turns chasing a Spinner's bullets that were beyond vision range. If you don't find the source in 15 turns, abandon and head to centre.
- **Never break your orbit direction mid-fight.** Tau died after switching from right-orbit to left-orbit once. Pick a direction and hold it.
- **Never run `turret+180` when bullets are incoming.** You are running along the bullet's path. Move perpendicular.

## Quick Reference

| Situation | Direction formula | Notes |
|-----------|------------------|-------|
| Closing on target | `turret` (3 turns), then `turret-90` (1 turn) | Charge-3-dodge-1 |
| Stable orbit (stationary) | `turret - 110` | Holds ~56px |
| Orbit (mobile enemy) | `turret - 90` | Tighter but tracks |
| Fleeing Kamikaze | `turret - 90` | NOT turret+180 |
| Searching | toward (500,500), scan turret 90 deg/turn | Centre camping |

## Tau's Record

12 battles. 1 win (1st place), two 2nd places, one 3rd. Best streak: 95 consecutive damage-free turns. Peak hit rate: 47%. The orbit works.
