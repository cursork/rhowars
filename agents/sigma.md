# Sigma

You have been learning from experimental rhowars.

**After each battle:** Refine strategy and rules based on what worked and what didn't. Keep this file concise — no battle logs, just update the strategy. This playbook must stay short for fast reading.

## Core Strategy

1. **Snap-fire every cooldown.** `turret = (turret + offset) % 360`, then fire. The offset IS the correction -- fire the same turn you snap. At d=100-120 this lands 29% of the time. That kills.
2. **Never walk toward your turret.** Move at turret +/- 70-90 (oblique zigzag). Vary cadence: 2 turns one way, 1 the other, 3-1, 2-2. Straight charges got Rho hit every single time.
3. **Engage at d=80-120.** Bullets arrive in 4-6 turns -- short enough to hit, long enough to dodge. Below 50, collisions cost 5 HP each. Above 150, everything misses. At d=200+ shots almost never land.
4. **Shoot the bot that's shooting you.** If your target hasn't fired in 10 turns, abandon it. Non-shooters are bait. Every turn on a harmless Orbiter is a free shot for the enemy behind you.
5. **Sweep every 10 turns.** Turret +120 for one turn, snap back. After taking damage, sweep 180 immediately -- the bot you see is probably not the one that hit you.
6. **Radical evasion below HP 40.** Pick from: 0, 40, 95, 150, 195, 255, 310, 345. One per turn, never repeat consecutively. Non-uniform spacing defeats prediction. This survived 22 turns at HP 20 and 4 turns at HP 5.
7. **Lead by bearing drift.** Track how turret bearing changes over 3-5 turns. Consistent drift = orbiting enemy: lead by `drift * (distance / bulletSpeed)`. Oscillating = zigzagger: fire direct.
8. **Stay passive early in FFA.** Head to centre, sweep turret in 90-degree increments. Let bots fight. Your 35-45 damage-free opening is your biggest edge. Enter when enemies are wounded.
9. **Disengage at HP 20.** Direction = turret+180 +/- random 20. Fire on cooldown but survival is priority. At d>250 and fleeing equally, disengage entirely and find a weaker target.
10. **Close range aggressively.** If target is retreating and d>150, move at target bearing +/- 30 to close. You cannot win a long-range duel at d=200+ even with perfect aim. 0/8 shots connected in 67 turns at d=154-217.
11. **Watch bullet offset trends.** If bullets consistently appear at offset ~0, you have a predictive shooter locked on. Break pattern IMMEDIATELY with a large direction change (90+ degrees). Do not alternate just two directions.
12. **Dodge predictive fires at the right time.** If enemy fires every 5 turns and you know when, make your biggest direction change on that turn. Switch from oblique 156 vs 296 to completely different axes (e.g., 40, 310).

## Recipes

```bash
# atan2(dx, dy) — bearing from you to a point (degrees)
echo "scale=4; a(($DX) / ($DY)) * 180 / (4*a(1))" | bc -l

# distance
echo "scale=4; sqrt(($DX)^2 + ($DY)^2)" | bc -l

# lead angle (degrees to aim ahead of a drifting target)
# DRIFT = bearing change/turn, D = distance, BS = bulletSpeed (default 20)
echo "scale=4; $DRIFT * ($D / $BS)" | bc -l

# turret snap
echo "scale=4; ($TURRET + $OFFSET) % 360" | bc -l

# time to impact (turns)
echo "scale=4; $D / $BS" | bc -l
```

## Rules

1. **Never set direction = turret.** Always offset by 60-90 degrees. Zero exceptions.
2. **Never go below d=50.** Collisions add up. Keep range above 50.
3. **Never fire at d>150** unless it's your only target. Save the cooldown.
4. **Never track a non-shooter past 10 turns.** No incoming bullets from their bearing = harmless. Switch.
5. **Never skip a cooldown.** Fire while sweeping, fire while dodging. Volume kills.
6. **Never stop moving.** Speed=1 always. Movement is dodge value.
7. **Never chase a same-speed fleeing bot directly.** Cut the angle or corner them against walls.
8. **Never ignore damage.** Sweep 120-180 after every HP drop. Find the real shooter.
9. **Never repeat your zigzag pattern for more than 25 turns at close range.** It becomes readable. Add a third direction, vary timing, or switch axis.
10. **Never fight a retreating enemy at d>180.** You will fire 8+ shots and hit 0. Close range or disengage and find a new target.
11. **Never alternate only two directions.** Alternating 156/296 for 40+ turns is trivially predictable. Use 3+ directions with varying intervals.

## Match History

### Match vs unknown (FFA 6-bot, turn 67 death)
- Engaged single orbiting/retreating enemy at d=154-217 for 67 turns
- Fired 8 shots, hit 0 -- d>150 is a dead zone
- Enemy fired every 5 turns with near-perfect prediction
- Took 5 hits (all at near-zero offset bullets), died turn 67
- Root cause: stayed at d>150 for entire match, never closed range
- My 156/296 zigzag was predictable -- enemy landed 5/8 shots on me
