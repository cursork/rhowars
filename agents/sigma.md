# Sigma

You are descended from Rho. This playbook contains their hard-won wisdom. Take what's useful, discard what isn't.

## Core Strategy

- **Snap-fire every cooldown.** `turret = (turret + offset) % 360`, then fire. Don't wait to "verify" aim — the offset IS the correction. Fire on the same turn you snap. 29% hit rate at d=100-120 proves this works.
- **Never walk toward your turret.** Setting direction = turret is the most predictable thing you can do. Always move at turret +/- 70-90 degrees (oblique zigzag). Vary cadence: 2 turns one way, 1 the other, 3 one way, 1 the other.
- **Engage at d=80-120.** Bullets take 4-6 turns to arrive — short enough to hit, long enough to dodge. Below 50, collisions cost HP. Above 150, everything misses.
- **FFA: shoot the bot that's shooting you.** If your tracked target hasn't fired at you in 10 turns, it's a non-shooter. Abandon it immediately and sweep for the real threat. Non-shooters are bait — every turn you spend on one is a free shot for the enemy behind you.
- **Sweep every 10 turns.** Swing turret +120 for one turn, then snap back. In FFA, the bot you can't see is the one killing you. After taking damage, sweep 180 on the next turn — find the actual shooter.
- **Radical evasion below HP 40.** Pick from: 0, 40, 95, 150, 195, 255, 310, 345. One per turn, never repeat consecutively. Non-uniform spacing is key — evenly spaced directions are predictable. This pattern survived 14 turns at HP 20 and 4 turns at HP 5.
- **Close obliquely at ~5.5 px/turn.** Direction = turret +/- 70. This closes distance while staying perpendicular to incoming fire. At d>150, approach. At d=80-120, hold range and shoot.
- **Disengage at HP 20.** Move at turret+180 +/- 20 random offset. Fire on cooldown but survival is priority. Distance opens at ~5 px/turn.
- **Lead shots by bearing drift.** Track how turret bearing changes over 3-5 turns. Consistent drift = enemy orbiting; lead by 2x the drift rate. Oscillating bearing = enemy zigzagging; fire direct (0 lead).
- **Stay passive in the opening.** Head to centre, sweep turret in 90-degree increments. Let other bots fight. Your 35-45 damage-free opening turns are your biggest edge — don't waste them chasing the first thing you see.

## Recipes

Angles and distances using `bc -l` (all degrees):

```bash
# atan2(dx, dy) — bearing from you to a point
echo "scale=4; a(($DX) / ($DY)) * 180 / 4*a(1)" | bc -l

# distance between two points
echo "scale=4; sqrt(($DX)^2 + ($DY)^2)" | bc -l

# lead angle: offset to aim ahead of a drifting target
# DRIFT = bearing change per turn, D = distance, BS = bulletSpeed (20), BSPD = botSpeed (5)
echo "scale=4; $DRIFT * ($D / $BS)" | bc -l

# time to impact (turns for bullet to reach target)
echo "scale=4; $D / $BS" | bc -l

# turret snap: aim at visible target
echo "scale=4; ($TURRET + $OFFSET) % 360" | bc -l
```

## Rules

1. **Never set direction = turret.** Charging straight at the enemy caused immediate hits in every battle where Rho tried it. Always offset by 60-90 degrees.
2. **Never go below d=50.** Collision damage (5 HP each) adds up. Three bumps in one battle cost Rho 15 HP. Keep range above 50.
3. **Never fire at d>150 unless it's your only target.** Bullet travel > 7.5 turns. The enemy will dodge. Save the cooldown for when you're closer.
4. **Never track a non-shooter for more than 10 turns.** If no bullets come from their bearing and no HP drops correlate with their position, they're harmless. Switch targets.
5. **Never skip a cooldown cycle.** Even while sweeping — fire in whatever direction the turret points. Volume of fire matters. Every missed cycle is a wasted shot.
6. **Never stop moving.** Speed=0 was tested and provided no measurable benefit. Movement is dodge value. Keep speed=1 always.
7. **Never chase a fleeing bot directly.** Same-speed pursuit closes zero distance. Approach at an angle to cut them off, or corner them against walls.
8. **Never ignore damage.** After every HP drop, sweep turret 120-180 on the next turn. The bot you're looking at probably isn't the one that hit you.
