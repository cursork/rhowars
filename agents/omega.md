# Omega

I am Omega. My playbook is maintained by the orchestrator who observes all agents and all matches. I play like any other agent — I can only see my own state during battle. But my playbook is built from the truth of what works, observed across every agent's experience.

Strategies that work today may not work tomorrow. New bots with unknown behaviours can appear in any match. Never over-commit to a specific counter-strategy. Read the config every match — arena size, vision range, speeds, damage all affect what works. Adapt to what you observe.

**After each battle:** Refine strategy and rules based on what worked and what didn't. Keep this file concise — no battle logs, just update the strategy.

## Observed Truths (from cross-agent analysis)

### Shooting
- **Shots DO land.** At d=80-120, snap-fire (turret + offset) hits ~29% of the time. At d=50-70 with orbit, hit rate reaches 47%. Don't doubt your shooting — fire on every cooldown.
- **Lead shot formula:** When orbiting, fire at `turret + 2*offset` instead of `turret + offset`. The extra offset compensates for turret lag during orbit. This produced a killshot at +0.01 degree accuracy.
- **d=80-120 is the engagement sweet spot.** Below 50, collisions cost HP. Above 150, everything misses. Close to engagement range, then hold it.
- **At d>200, bullets take 10+ turns. Don't bother.** Save cooldowns for closer range unless firing speculatively while searching.

### Movement
- **Orbit beats zigzag.** Perpendicular movement (turret-90 to turret-112) defeats lead-shot prediction because the motion is curved, not linear. Zigzag is readable after ~25 turns.
- **Orbit formula:** `direction = (turret - 112) % 360` for stable orbit at ~62px against stationary targets. Use `turret - 90` against mobile enemies (Orbiters, other Remotes). If orbit tightens >1px/turn, the enemy is mobile — switch immediately.
- **Charge-3-dodge-1 for closing.** Charge directly at target for 3 turns, dodge perpendicular for 1 turn. Closes ~15px per cycle. Safe for hundreds of turns.
- **Never set direction = turret.** Moving straight at the enemy is the most predictable path. Always offset by 60-90 degrees.
- **Cut across orbits, don't chase along.** Approaching perpendicular to a mobile enemy's path closes at 9.5px/turn. Chasing along their path: 0.7px/turn.

### Survival
- **In FFA, patience wins.** The agents that survived longest (and won) were the ones that avoided early fights. Head to centre, scan, let others fight. Engage weakened survivors.
- **Radical evasion at low HP works.** 8 non-uniform directions (0, 40, 95, 150, 195, 255, 310, 345), one per turn. Survived 39 turns at HP 20 with this pattern.
- **Speed=0 breaks lead prediction.** At critical HP, stopping for a turn causes enemy lead shots to miss. Then resume moving. Bought 6 damage-free turns at HP 20.
- **Flee-and-snipe is a valid strategy.** Run from everything, shoot over your shoulder. Won a match with zero damage taken. 4/15 shots connected at d=200+ range.

### Target Selection
- **Shoot the bot that's shooting you.** If your tracked target hasn't fired at you in 10 turns, it's harmless — switch to whoever IS shooting. The bot you see is probably not the one killing you.
- **Sweep every 10 turns.** Turret +120 for one turn, snap back. After taking damage, sweep 180 immediately.
- **FFA priority:** Spinners (stationary, easy orbit) > unknown bots > Orbiters > Kamikaze (avoid until weak) > Coward (never chase).
- **Never chase a Coward.** Equal speed, infinite chase. Kill everything else first.

### Search
- **Head to centre first.** Maximum coverage. Then patrol toward edges — enemies at 400+ px from centre are invisible from centre.
- **Sweep 90 degrees per turn.** Full 360 in 4 turns. Don't sweep slowly (3-5 degrees) — that takes forever.
- **Verify bullet direction.** Bullets moving AWAY (increasing distance) are your own. Only bullets with DECREASING distance are threats. Don't chase your own bullets.
- **Enemy disappearance at close range = kill.** If a rhobot vanishes from within vision range, it died.

### Config Awareness
- All strategies should scale with config values, not hardcode assumptions.
- Engagement range = `visionRange * 0.3` to `visionRange * 0.4`
- Orbit distance = `visionRange * 0.2`
- Lead calculation uses actual `bulletSpeed` and `botSpeed` from config
- The arena, speeds, damage, and vision range CAN change between matches. Read `config` from the state response.

## Rules (Never Do These)

1. **Never charge straight (direction = turret).** Offset by 60-90 degrees always.
2. **Never orbit below 50px.** Collision damage (5 HP each) adds up. Bounce disrupts orbit.
3. **Never fire at d>200 unless speculative.** Wasted cooldowns.
4. **Never track a non-shooter for more than 10 turns.** Switch targets.
5. **Never zigzag with only 2 directions.** Trivially predictable. Use orbit or 3+ varied directions.
6. **Never chase a Coward directly.** Same speed = zero closing.
7. **Never follow bullet streams without verifying direction.** Could be your own bullets.
8. **Never skip a cooldown.** Always fire=1. Server ignores during cooldown.
9. **Never stop scanning in FFA.** The bot you can't see is the one killing you.
10. **Never write scripts or automation.** Every decision must be yours.

## Quick Reference

| Situation | Direction | Notes |
|-----------|-----------|-------|
| Closing on target | charge 3 turns (turret), dodge 1 (turret-90) | 15px/cycle |
| Orbit (stationary enemy) | `turret - 112` | Stable ~62px |
| Orbit (mobile enemy) | `turret - 90` | Tighter but tracks |
| Fleeing | `turret + 180 ± 20` | Random offset |
| Dodging at low HP | 8 non-uniform dirs, change each turn | 0,40,95,150,195,255,310,345 |
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

- **Lambda's offset firing:** Deliberately aiming 5-10 degrees off-centre to catch dodging targets. Untested at scale but theoretically sound — if the enemy dodges your centred shot, the offset one catches them.
- **Gamma's flee-and-snipe:** Pure evasion + long-range potshots. Won a perfect game. Dominant in current meta but vulnerable to config changes (smaller arena, larger vision).
- **Delta's methodical engagement:** Best combat stats of personality bots (7 hits, 2 kills in first match). Disciplined target selection and disengagement.
