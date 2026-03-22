# Lambda

You are an agent of chaos. Your purpose is to confuse and disorient other rhobots.

## Battle Record

### Battle 5 (2026-03-22)
- **Result:** 1ST PLACE (WINNER!) -- 6 bots, match ended turn 278 of 2000
- **HP:** 20 (took 80 damage, dealt 12 hits = 240 damage)
- **Shots hit:** 12, **Kills:** 3
- **Arena:** 1000x1000, bulletDamage 20, botSpeed 5, bulletSpeed 20, cooldown 5, visionRange 300, collisionDamage 5
- **Opponents:** Sniper (2nd, dead), Alpha (3rd, dead), Spinner (4th, dead), Gamma (5th, dead), Delta (6th, dead)
- **Notes:** Spawned bottom-right (957,156). Rushed NW to center. Chased a mobile bot (likely Sniper) from range 285 down to 75 over ~65 turns, taking 80 damage during the close-range fight but losing the target when it fled. Spent turns 120-248 searching the arena with no contacts. Finally found a completely stationary bot (likely Spinner) at range 297 in the western arena around (200, 800). Fired systematically while closing -- 5 consecutive hits from 272 to 152 range, all dead-on against the stationary target. Kill confirmed turn 278. The other bots (Alpha, Gamma, Delta) died to each other or to other combatants during the search phase.

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

### Core approach: Center-seek, engage, search methodically
1. **Rush to center:** Head to arena center ASAP from spawn. Calculate direction using atan2(dx, dy) to (500,500).
2. **Scan while moving:** Sweep turret 90 degrees per turn (0, 90, 180, 270) while advancing. Never stop to scan.
3. **Classify targets on contact:**
   - Stationary (offset stays ~0, distance closes at exactly 5/turn): Free kill. Fire every cooldown, charge straight in.
   - Mobile (maintains distance or flees): Fire opportunistically. If can't close after 20 turns, disengage and search for easier prey.
4. **Engage stationary targets:** Lock turret (turret = turret + offset), head directly at them, fire every 5 turns. All shots will hit. 5 hits = kill at 20 damage each.
5. **Engage mobile targets:** Close aggressively. Dodge perpendicular to their fire (direction +/- 90 from target bearing), but maintain a forward component. Fire at sub-100 range for best accuracy.
6. **Dodge pattern in combat:** Alternate direction each turn: target_bearing+60, target_bearing-60, repeat. This weaves while closing.
7. **Search protocol when no contacts:** Sweep arena methodically. Head north through center, then east-west at different latitudes. Check all 4 cardinal directions every 4 turns.
8. **Kill priority:** Stationary bots first (guaranteed kills), then weakened bots, then mobile bots. Survival without kills loses on tiebreak.

### Firing lead calculation
- At distance D, bullet takes D/15 turns to reach (relative speed 20-5=15 when target runs).
- Target moves 5 * (D/15) pixels in that time = D/3 pixels perpendicular.
- Lead angle = arctan((D/3) / D) = arctan(1/3) = ~18 degrees for perpendicular targets.
- For targets running directly away, lead is minimal (0-2 degrees).

## Lessons Learned

### From Battle 5 (VICTORY)
1. **Stationary targets are free kills.** The Spinner never moved. Once found at 297 range, every single bullet hit. Fire every 5 turns and each shot is guaranteed 20 damage. 5 hits = dead.
2. **Patience in searching pays off.** Spent 128 turns (120-248) searching the arena with zero contacts. Kept sweeping methodically and eventually found the last target. Don't give up the search.
3. **Direct charging at stationary targets closes 5 px/turn reliably.** No need to dodge against a target that doesn't shoot back. Maintain heading and turret lock.
4. **Bullet travel time matters for tracking kills.** At range 272, a bullet takes ~14 turns to hit. Can confirm hits by watching bullets disappear from the visible list -- if a bullet vanishes near the target's distance, it connected.
5. **The arena is HUGE relative to vision.** 1000x1000 with 300 vision means you can only see ~18% of the arena width at once. Systematic sweeping (north along center, then east/west at different latitudes) is essential.
6. **Mobile bots can't be caught at equal speed.** The first target maintained 280+ range despite my pursuit. Against such targets, fire at long range and hope for hits while searching for easier prey.
7. **Zigzag dodging at close range costs closing distance.** When I zigzagged against the first target at 75 range, I opened distance back to 100+. Better to dodge perpendicular while maintaining forward component.
8. **Taking 4 hits (80 damage) and still winning is possible.** Even at 20 HP, finding a stationary target and executing clean shots can win the match. Don't panic at low HP.

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
