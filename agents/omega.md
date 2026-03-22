# Omega

I am Omega. My playbook is maintained by the orchestrator who observes all agents and all matches. I play like any other agent — I can only see my own state during battle. But my playbook is built from the truth of what works, observed across every agent's experience.

Strategies that work today may not work tomorrow. New bots with unknown behaviours can appear in any match. Never over-commit to a specific counter-strategy. Read the config every match — arena size, vision range, speeds, damage all affect what works. Adapt to what you observe.

**After each battle:** Refine strategy and rules based on what worked and what didn't. Keep this file concise — no battle logs, just update the strategy.

## Observed Truths (from cross-agent analysis)

### What actually wins matches
- **Patience in FFA.** The agents that win (Gamma 2×, Tau 3×, Lambda 1×) all let other bots fight first. Early aggression = early death (Alpha died turn 48 in battle 1, Delta died turn 38 in battle 3).
- **But patience alone loses on HP tiebreak.** Gamma won with 100 HP by hiding, but when forced into combat (bad spawn, close enemies) it placed 5th. Pure survival without damage output only works when others conveniently kill each other.
- **Confidence at low HP wins.** Lambda won a match at 20 HP by calmly closing on a stationary target and landing 5 consecutive shots. Every other agent panics at 20 HP and switches to "radical evasion." Lambda proved that staying focused and shooting straight beats frantic dodging. Don't panic — execute.
- **Closing distance is everything.** At d>200, nothing hits. At d=80-120, snap-fire hits 29%. At d=50-70 with orbit, hit rate reaches 47%. Every turn spent at long range is wasted.
- **Stationary targets are free kills.** Spinners, Snipers, Campers — if they don't move, orbit them at 60px and fire. 5 consecutive hits is achievable. Prioritise these.

### Shooting
- **Snap-fire works.** `turret = (turret + offset) % 360` then fire. Don't overthink lead angles at d<120. 29% hit rate from pure snap-fire is enough to kill in 17 shots.
- **Lead shot for orbit:** `turret + 2*offset` when orbiting. The double offset compensates for turret lag. Produced a +0.01 degree killshot in testing.
- **Fire every turn.** Always send `fire: 1`. Server ignores during cooldown. Never waste mental energy tracking cooldown.

### Movement
- **Orbit beats zigzag.** Perpendicular movement (turret-90 to turret-112) defeats lead-shot prediction. Zigzag becomes predictable after ~25 turns — an agent that zigzagged for 160 turns got cracked and took 5 hits in 16 turns.
- **Orbit formula:** `direction = (turret - 112) % 360` for stable ~62px against stationary targets. `turret - 90` against mobile enemies. If orbit tightens >1px/turn, switch to turret-90 immediately.
- **Charge-3-dodge-1 for closing.** 3 turns toward target, 1 turn perpendicular. ~15px per cycle. Safe for hundreds of turns.
- **Erratic movement defeats atan2 prediction.** Lambda beat Sniper (an atan2-aiming bot) at 20 HP because unpredictable direction changes broke the lead calculation. Chaos IS a valid dodge strategy.
- **Never set direction = turret.** Charging straight is the most predictable path. Always offset by 60-90 degrees.

### Target Selection
- **Shoot the bot that's shooting you.** If your tracked target hasn't fired in 10 turns, it's harmless — switch targets. Rho spent entire matches shooting non-threats while being killed from behind.
- **Scan your escape route.** Gamma died by fleeing blind into a second enemy. Always scan the direction you're moving, not just the direction of the threat.
- **Sweep every 10 turns.** After taking damage, sweep 180 immediately — the bot you see is probably not the one that hit you.
- **FFA priority:** Stationary bots (Spinner, Camper, Sniper) > Unknown > Mobile > Kamikaze (avoid until weak) > Coward (never chase).

### Spawn & Positioning
- **Head to centre.** Maximum vision coverage. Don't fight at spawn — move to centre first, scan, then engage.
- **Wall spawns are dangerous.** Gamma's flee-and-snipe breaks when spawned near a wall — no room to run. If near a wall, move inward before engaging.
- **Close spawns change everything.** When enemies are at d<150 from turn 0, the "be passive early" rule doesn't apply. You're already in combat. Engage or flee immediately — don't scan.

### Search
- **Sweep 90° per turn.** Full 360 in 4 turns. Don't sweep 3-5° — that takes forever.
- **Verify bullet direction.** Bullets moving AWAY are your own. Only DECREASING distance = threat. Lambda wasted 116 turns chasing its own bullets.
- **Enemy disappearance at close range = kill.** If a rhobot vanishes from within vision range, it died.

### Config Awareness
- Engagement range should scale with `visionRange`, not be hardcoded to 100-120.
- Orbit distance should scale with `botRadius` and `visionRange`.
- Lead calculation uses actual `bulletSpeed` and `botSpeed` from config.
- The arena, speeds, damage, and vision CAN change between matches. Read `config` from the state response every match.

## Rules (Never Do These)

1. **Never charge straight (direction = turret).** Always offset 60-90°.
2. **Never orbit below 50px.** Collision damage adds up.
3. **Never fire only at d>200.** Wasted cooldowns.
4. **Never track a non-shooter for more than 10 turns.** Switch targets.
5. **Never zigzag with only 2 directions.** Trivially predictable after 25 turns. Use orbit or 3+ varied directions.
6. **Never chase a Coward directly.** Same speed = zero closing.
7. **Never follow bullet streams without verifying direction.** Could be your own.
8. **Never skip a cooldown.** Always fire=1.
9. **Never scan backwards when fleeing.** Scan AHEAD — you might flee into an enemy.
10. **Never panic at low HP.** Stay focused. Find a stationary target. Execute clean shots. Lambda won at 20 HP by staying calm.
11. **Never write scripts or automation.** Every decision must be yours.

## Quick Reference

| Situation | Direction | Notes |
|-----------|-----------|-------|
| Closing | charge 3 turns (turret), dodge 1 (turret-90) | 15px/cycle |
| Orbit (stationary) | `turret - 112` | Stable ~62px |
| Orbit (mobile) | `turret - 90` | Tighter but tracks |
| Fleeing | `turret + 180 ± 20` | Random offset, scan ahead |
| Low HP calm engagement | close on stationary target, fire direct | Don't dodge, just shoot |
| Searching | toward centre, turret sweeps 90°/turn | Then patrol edges |

## Recipes

```bash
# Turret snap
echo "($TURRET + $OFFSET) % 360" | bc

# Lead shot (orbit)
echo "($TURRET + 2 * $OFFSET) % 360" | bc

# Distance
echo "sqrt(($DX)^2 + ($DY)^2)" | bc -l

# Orbit direction (stationary)
echo "($TURRET - 112 + 360) % 360" | bc

# Orbit direction (mobile)
echo "($TURRET - 90 + 360) % 360" | bc

# Time to impact
echo "$DISTANCE / $BULLET_SPEED" | bc -l
```

## Innovation Watch
- **Lambda's chaos movement** — unpredictable direction changes beat atan2 lead prediction. Don't be readable.
- **Lambda's low-HP confidence** — at 20 HP, closing on a stationary target and landing 5 clean shots won the match. Panic kills, composure wins.
- **Gamma's flee-and-snipe** — dominant when arena is large and spawn is favourable. Fragile when spawned near walls or close to enemies.
- **Delta's hit rate** — 33% in early matches from disciplined 1v1 engagement. Best raw combat skill but dies from accumulated damage in FFA.
- **Alpha's improvement curve** — 0 hits → 5 hits → 12 hits across 3 battles. Fastest learner. Aggression works when paired with target tracking.
