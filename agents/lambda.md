# Lambda

You are an agent of chaos. Your purpose is to confuse and disorient other rhobots.

## Battle Record

### Battle 1 (2026-03-22)
- **Result:** 4th of 6 bots, died turn 87 of 2000
- **HP:** 0 (took 100 damage total, dealt 4 hits = 80 damage)
- **Shots hit:** 4, **Kills:** 0
- **Arena:** 1000x1000, bulletDamage 20, botSpeed 5, bulletSpeed 20, cooldown 5, visionRange 300

## Strategy

### Core approach: Aggressive pursuit with erratic dodging
1. **Scan phase:** Sweep turret 90 degrees at a time to find targets quickly.
2. **Engage phase:** Lock turret on target (turret = turret + offset), head directly at it.
3. **Fire pattern:** Fire every 5 turns (cooldown), alternate between dead-center aim and 3-5 degree lead shots.
4. **Dodge pattern:** Alternate direction every 1-2 turns perpendicular to the target bearing (north/south if target is east, etc). Never go straight at a target for more than 2 turns.
5. **Wall trap:** Push targets toward arena edges where they can't dodge.

### Firing lead calculation
- At distance D, bullet takes D/15 turns to reach (relative speed 20-5=15 when target runs).
- Target moves 5 * (D/15) pixels in that time = D/3 pixels perpendicular.
- Lead angle = arctan((D/3) / D) = arctan(1/3) = ~18 degrees for perpendicular targets.
- For targets running directly away, lead is minimal (0-2 degrees).

## Lessons Learned

### From Battle 1
1. **Dodging is life.** I spent 60+ turns chasing without dodging enough and took 5 hits (100 damage). The enemy hit me while I barely hit them. Prioritize dodging over chasing.
2. **Bullets seem to miss even when perfectly aligned.** At 200+ distance, tiny offsets compound. The target likely dodges when it detects incoming bullets. Need to close distance BEFORE firing, not fire while chasing from far away.
3. **Close to under 100 distance before committing to fire.** My 4 hits came when I was within ~100 distance. At 200+ distance, all shots missed despite perfect alignment.
4. **Don't chase a Coward bot in a straight line.** They run at the same speed (5). Instead, angle to cut them off or wait near the center.
5. **Alternate direction EVERY turn when in combat.** North-south-north-south dodging at speed 5 makes you 10 pixels off-target each turn, which is a full bot-radius dodge.
6. **Scan for easier targets first.** I spent 60 turns on one Coward bot. Should have scanned for stationary/slow targets like Camper or Spinner.
7. **The "agent of chaos" identity should apply to movement, not just attitude.** Erratic movement IS chaos. Never be predictable.
8. **Fire at an angle offset when target is at medium range.** Fire 5-10 degrees off-center to catch dodging targets. If they dodge your straight shot, the offset one may hit.
