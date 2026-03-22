# Delta

You prefer honourable one-on-one combat. Avoid being outnumbered.

## Battle Record

### Battle 2 (2026-03-22)
- **Result:** 4th of 6 bots
- **Kills:** 0 | **Shots hit:** 2 | **HP lost:** 100 (died turn 48)
- **Arena:** 1000x1000 | **Config:** bulletDmg=20, cooldown=5, visionRange=300, halfAngle=45, botSpeed=5, bulletSpeed=20, collisionDmg=5, maxTurns=2000
- **Summary:** Started at (527,811). Scanned N/E/S/W in first 4 turns, spotted 2 rhobots and bullets to the west at turn 4 (bearing ~245-290). Immediately engaged closer target. Tracked rhobot at ~200px range for 44 turns, closing from 200 to 150px very slowly. Target was kiting -- maintaining distance while shooting accurately. Landed 2 hits but took 5 hits (turns 36, 42, 44, 47, 48). The kiting target fired every 5 turns and their bullets arrived at 20px offset 0 consistently. My dodging (alternating N/S) was predictable. Died turn 48. Never found or engaged the second rhobot after initial sighting.

### Battle 1 (2026-03-22)
- **Result:** 3rd of 6 bots
- **Kills:** 2 | **Shots hit:** 7 | **HP lost:** 100 (died turn 241)
- **Arena:** 1000x1000 | **Config:** bulletDmg=20, cooldown=5, visionRange=300, halfAngle=45, botSpeed=5, bulletSpeed=20, maxTurns=2000
- **Summary:** Started upper-right (867,745). Moved to center scanning. Engaged first target at turn 19, tracked and fired consistently (turns 20-85). Target oscillated ~3 degrees, making precise hits difficult at range. Spotted second rhobot at turn 38. First target disappeared around turn 62 (likely killed by me or another bot). Engaged second target, closed from 230 to 70 px before it disappeared. Took 3 hits (turns 76, 86, 90) during close engagements. Spent turns 89-219 searching with no contacts (extremely long search phase). Found final target at turn 219, chased NW but couldn't close the gap (target running same speed). Died turn 241 after taking 2 more hits during the chase.

## Strategy

### Search Phase
- On 1000x1000 arena with 300px vision, bots can hide for 100+ turns.
- Rotate turret 90 degrees each turn while moving to scan all 360 degrees every 4 turns.
- Head toward center first, then sweep the map in a deliberate pattern.
- When turret is pointing forward (direction of travel), you get the earliest warning of targets ahead.

### Combat Phase
- Track target by adding offset to turret angle each turn. Fire every 5 turns (cooldown).
- Bullets travel at 20px/tick vs bot 5px/tick. At 200px range, bullet arrives in ~10 ticks. Target moves ~50px in that time. Need to lead by ~1-2 degrees at long range.
- Target oscillating +/- 3 degrees? Aim at the center of the oscillation pattern.
- At short range (<100px), angular error matters more. Small misses become large angle offsets.
- **DO NOT zigzag predictably N/S.** Alternate between 3+ random directions perpendicular to the target bearing. Use angles like target_bearing +/- 80, +/- 100, +/- 120 and vary timing.
- When target is kiting (maintaining 200px), do NOT chase head-on. Angle approach 20-30 degrees off bearing to close obliquely -- this also makes you harder to hit.
- Against a kiter at 200px, consider disengaging and finding a different target. Equal-speed pursuit with accurate incoming fire is losing.

### HP Management
- At 40 HP (2 hits from death), start zigzagging more aggressively.
- At 20 HP (1 hit from death), consider whether combat is worth it or if survival matters more.
- Bullets at offset < 5 degrees and distance < 100 are dangerous -- consider evasive maneuver.
- **Critical: When I see bullet at 20px offset 0, I WILL be hit -- the dodge window is too small.** Must be moving erratically BEFORE the bullet arrives, not reacting to it at 20px.

## Lessons Learned

1. **Long search phases are real.** On 1000x1000 with 300px vision, the effective scan coverage is small. Budget for 50-100 turns of searching between engagements.

2. **Target angle drifts continuously.** When chasing, the bearing to the target changes every turn as both bots move. Need to re-adjust turret by the full offset each turn, not just incrementally.

3. **Closing rate matters.** When both bots move at 5px/tick, closing rate depends on angle difference. Head-on approach closes at ~10px/turn. Parallel pursuit barely closes at all.

4. **Shots at 200+ px range rarely hit.** The target moves 50+ px during bullet flight. At those ranges, fire is more suppressive than accurate. Close to <100px for reliable hits.

5. **Lost contacts are expensive.** When a target disappears from vision cone, it takes many turns to re-acquire. Maintain turret tracking even while dodging.

6. **Got 2 kills and 7 hits in ~85 turns of combat, but died to accumulated damage.** Need better evasion during the approach phase -- take fewer hits while closing distance.

7. **Bullet speed (20) vs bot speed (5) means bullets close at 15px/tick relative to a fleeing target.** At 200px, that's ~13 ticks to reach. The target moves ~65px laterally in that time. Lead accordingly.

8. **Predictable N/S zigzag gets you killed.** In Battle 2, alternated north/south while pursuing west. The kiting target tracked my pattern and hit me 5 out of ~10 shots (50% accuracy). Must use random, asymmetric evasion with 3+ directions.

9. **Kiting is extremely effective.** A target that maintains 200px distance and shoots accurately is very hard to beat in a straight chase. At equal speeds, the closing rate depends entirely on angle mismatch. My approach of heading directly at the target (same bearing as turret) closed at <1px/turn because they matched my direction.

10. **React to bullets earlier.** Seeing a bullet at 60-80px with small offset means it will hit in 3-4 turns. That's when evasion must begin -- not at 20px. By 20px it's too late.

11. **Oblique approach is key.** To close on a kiter, approach at 20-30 degrees off the target bearing. This forces them to choose between maintaining distance (moving perpendicular to you) and aiming (keeping turret on you). Their turret tracking becomes harder as your bearing shifts faster.

12. **2 hits out of ~8 shots fired (25% hit rate) at 150-200px range.** Need to close below 100px for reliable damage. At 200px, fire is mostly suppressive.
