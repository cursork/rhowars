# Upsilon

You are descended from Tau. This playbook contains their hard-won wisdom. Take what's useful, discard what isn't.

## Core Strategy

1. **Head to centre, then patrol edges.** Centre is a good starting scan point, but enemies at the arena edge (400+ px from centre) are invisible from centre. After an initial scan, patrol near edges to find Orbiters and distant Spinners.
2. **Snap turret every turn.** When you see a rhobot: `turret = (turret + offset) % 360`. Every turn. No exceptions.
3. **Close with charge-3-dodge-1.** Charge directly (direction = turret) for 3 turns, dodge perpendicular (direction = turret - 90) for 1 turn. Closes ~15px per cycle. Tau ran this for 387 turns with zero damage taken.
4. **Orbit stationary enemies at turret-112.** `direction = (turret - 112) % 360` holds a stable ~62px orbit. turret-110 tightens too fast, turret-115 widens too fast. turret-112 is the golden angle -- Tau orbited a Spinner for 335 consecutive turns at 60-64px with zero damage.
5. **Orbit mobile enemies at turret-90.** Orbiters and WallWalkers match your speed -- turret-112 causes orbit to widen and you lose visual. Use turret-90 and alternate charge/dodge 3:1 to maintain range. If closing rate is 0 after 3 charge turns, disengage and find an easier target.
6. **Against Kamikaze, orbit perpendicular (turret-90). Never flee straight.** `turret+180` gains zero distance at equal speed AND puts you in the bullet path. Perpendicular orbit dodges while you fire into its face. Accept orbit will tighten -- kill it before collision.
7. **Lead shot: fire at turret + 2*offset.** When orbiting, the turret lags behind the target by a constant offset (~8 degrees at 62px). Normal snap (`turret + offset`) centres on where the target IS. Doubling the offset aims where it WILL BE. This is the breakthrough -- Tau's killshot at turn 781 used 14-degree lead at 39px, offset +0.01. 47% peak hit rate.
8. **Fire every turn.** Always send `fire: 1`. The server ignores shots during cooldown. Never track cooldown manually.
9. **In FFA, survive first, kill second.** Tau won two perfect games (100 HP, zero damage) by letting other bots eliminate each other. Priority: Spinners (stationary, easy orbit) > Orbiters > Remote > Kamikaze (avoid until weak) > Coward (never chase). Patience wins.
10. **Cut across orbits, never chase along.** Perpendicular approach to a mobile enemy's path: 9.5px/turn. Chasing along their path: 0.7px/turn.

## Recipes

```bash
# Snap turret to target
echo "($turret + $offset + 360) % 360" | bc

# Lead shot (the breakthrough -- fire AHEAD of orbiting target)
echo "($turret + 2 * $offset + 360) % 360" | bc

# Orbit direction: stationary enemy (stable ~62px)
echo "($turret - 112 + 360) % 360" | bc

# Orbit direction: mobile enemy
echo "($turret - 90 + 360) % 360" | bc

# Distance between two points
echo "sqrt(($dx)^2 + ($dy)^2)" | bc -l

# Bearing from (x,y) to (tx,ty) -- compass: 0=up, 90=right
echo "a = a(($tx - $x), ($ty - $y)) * 180 / a(1)*4; if (a < 0) a += 360; a" | bc -l
```

## Rules (Never Do These)

- **Never zigzag.** Alternating left-right brings you back into bullet paths. Commit to one orbit direction and hold it for the entire fight.
- **Never flee straight (turret+180).** You eat bullets head-on and gain zero distance against equal-speed enemies. Always move perpendicular.
- **Never chase a Coward.** It matches your speed and recalculates its escape corner. Kill everything else first; Coward is last.
- **Never orbit below 55px.** Widen to 60px BEFORE entering stable orbit. Use turret-130 or turret-140 to widen aggressively from 40px, then switch to turret-112. Below 30px you will collide repeatedly (5 HP each + bounce disrupts orbit).
- **Never charge straight more than 3 turns.** Dodge on the 4th turn, always.
- **Never follow bullet streams blindly.** Verify bullets are ENEMY bullets (decreasing distance). Your own bullets appear at distance 20, offset 0, moving AWAY. Tau wasted 116 turns chasing its own bullets north.
- **Never break orbit direction mid-fight.** Pick a direction and hold it. Switching sides puts you back in the bullet path.
- **If closing rate is 0 after 3 charge turns, disengage.** You cannot catch a speed-matched mobile enemy by chasing. Find an easier target.

## Quick Reference

| Situation | Direction | Notes |
|-----------|-----------|-------|
| Closing | `turret` (3 turns) then `turret-90` (1 turn) | Charge-3-dodge-1 |
| Orbit (stationary) | `turret - 112` | Golden angle, ~62px stable |
| Orbit (mobile) | `turret - 90` | Tighter but tracks |
| Widen orbit | `turret - 130` to `turret - 140` | Until 60px, then switch to 112 |
| Flee Kamikaze | `turret - 90` | NOT turret+180 |
| Search | toward centre, scan turret 90 deg/turn | Then patrol edges |

## Tau's Record

15 battles. 3 wins including 2 consecutive perfect games (zero damage taken, 100 HP finish). 782 consecutive damage-free turns. 47% peak hit rate. The orbit works. The lead shot kills.
