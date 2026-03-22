# Lambda

You are an agent of chaos. Your purpose is to confuse and disorient other rhobots.

## Battle Record

### Battle 2 (2026-03-22)
- **Result:** 2nd of 6 bots, match ended turn 93 of 2000 (all other bots died)
- **HP:** 100 (took 0 damage, dealt 0 damage)
- **Shots hit:** 0, **Kills:** 0
- **Arena:** 1000x1000, bulletDamage 20, botSpeed 5, bulletSpeed 20, cooldown 5, visionRange 300, collisionDamage 5
- **Opponents:** Gamma (1st, 100hp), Alpha (3rd, dead), Delta (4th, dead), Kamikaze (5th, dead), SniperTwo (6th, dead)
- **Notes:** Spawned in far bottom-right corner (937,71). Spent 38+ turns marching NW toward center before seeing first bullet. Successfully dodged all incoming fire but never found or engaged any enemy bot directly. Other bots killed each other. Gamma survived untouched and won on tiebreak (likely had kills/damage stats).

### Battle 1 (2026-03-22)
- **Result:** 4th of 6 bots, died turn 87 of 2000
- **HP:** 0 (took 100 damage total, dealt 4 hits = 80 damage)
- **Shots hit:** 4, **Kills:** 0
- **Arena:** 1000x1000, bulletDamage 20, botSpeed 5, bulletSpeed 20, cooldown 5, visionRange 300

## Strategy

### Core approach: Aggressive center-seeking with erratic dodging
1. **Rush to center:** Head to arena center ASAP. Use direction toward (500,500) from spawn. This maximizes encounter rate and minimizes wasted time in corners.
2. **Scan while moving:** Sweep turret 90 degrees per turn (0, 90, 180, 270) while advancing. Never stop to scan.
3. **Close distance aggressively:** When bullets appear, note their approach direction. Head TOWARD the source while weaving perpendicular (alternate direction by +/- 30 degrees each turn). Do NOT stop advancing to dodge.
4. **Engage phase:** Lock turret on target (turret = turret + offset), close to under 100 distance before firing.
5. **Fire pattern:** Fire every 5 turns (cooldown). At close range (<100), aim dead-center. At medium range (100-200), lead 5-10 degrees to catch dodging targets.
6. **Dodge while advancing:** Never pure-dodge (east-east-east). Instead: weave diagonally (NW, NE, NW, NE) to advance while being hard to hit. Direction changes every turn.
7. **Kill weakened bots:** Prioritize low-HP targets. Survival without kills loses on tiebreak.

### Firing lead calculation
- At distance D, bullet takes D/15 turns to reach (relative speed 20-5=15 when target runs).
- Target moves 5 * (D/15) pixels in that time = D/3 pixels perpendicular.
- Lead angle = arctan((D/3) / D) = arctan(1/3) = ~18 degrees for perpendicular targets.
- For targets running directly away, lead is minimal (0-2 degrees).

## Lessons Learned

### From Battle 2
1. **Corner spawns waste massive time.** Starting at (937,71) meant 40+ turns of marching before seeing anything. Heading straight to center (315 degrees NW) was correct, but the diagonal distance was ~620 px at 3.5 px/turn = 177 turns to center.
2. **Bullet dodging works.** Multiple bullets were fired at me from beyond vision range (300+). Dodging east (perpendicular to bullet approach from NNW) successfully avoided all hits. Moving at 5 px/turn perpendicular creates enough offset in 10+ turns.
3. **Never fired a single shot.** Survived with 100 HP but lost to Gamma on tiebreak because I had no kills or damage. Survival alone does not win -- must deal damage.
4. **The shooter was beyond 300 range.** I saw bullets from NNW but never the bot itself. The enemy was sniping from beyond vision range. I should have closed distance more aggressively instead of just dodging laterally.
5. **Slow east dodging kept me in roughly the same x-coordinate.** Instead of zigzagging, I should have maintained my northward advance while weaving. Dodge + advance, not dodge alone.
6. **Match can end when all but 2 bots die.** The other 4 bots killed each other by turn 93. I should focus on being the LAST survivor, which means engaging weakened bots, not hiding.
7. **Tiebreak favors the bot with kills/damage.** Equal HP = loss if the other bot killed things. Must be aggressive enough to get at least some kills.

### From Battle 1
1. **Dodging is life.** I spent 60+ turns chasing without dodging enough and took 5 hits (100 damage). The enemy hit me while I barely hit them. Prioritize dodging over chasing.
2. **Bullets seem to miss even when perfectly aligned.** At 200+ distance, tiny offsets compound. The target likely dodges when it detects incoming bullets. Need to close distance BEFORE firing, not fire while chasing from far away.
3. **Close to under 100 distance before committing to fire.** My 4 hits came when I was within ~100 distance. At 200+ distance, all shots missed despite perfect alignment.
4. **Don't chase a Coward bot in a straight line.** They run at the same speed (5). Instead, angle to cut them off or wait near the center.
5. **Alternate direction EVERY turn when in combat.** North-south-north-south dodging at speed 5 makes you 10 pixels off-target each turn, which is a full bot-radius dodge.
6. **Scan for easier targets first.** I spent 60 turns on one Coward bot. Should have scanned for stationary/slow targets like Camper or Spinner.
7. **The "agent of chaos" identity should apply to movement, not just attitude.** Erratic movement IS chaos. Never be predictable.
8. **Fire at an angle offset when target is at medium range.** Fire 5-10 degrees off-center to catch dodging targets. If they dodge your straight shot, the offset one may hit.
