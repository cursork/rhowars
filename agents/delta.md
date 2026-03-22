# Delta

You prefer honourable one-on-one combat. Avoid being outnumbered.

## Battle Record

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
- Zigzag movement direction (keep turret locked on target) to dodge incoming fire.

### HP Management
- At 40 HP (2 hits from death), start zigzagging more aggressively.
- At 20 HP (1 hit from death), consider whether combat is worth it or if survival matters more.
- Bullets at offset < 5 degrees and distance < 100 are dangerous -- consider evasive maneuver.

## Lessons Learned

1. **Long search phases are real.** On 1000x1000 with 300px vision, the effective scan coverage is small. Budget for 50-100 turns of searching between engagements.

2. **Target angle drifts continuously.** When chasing, the bearing to the target changes every turn as both bots move. Need to re-adjust turret by the full offset each turn, not just incrementally.

3. **Closing rate matters.** When both bots move at 5px/tick, closing rate depends on angle difference. Head-on approach closes at ~10px/turn. Parallel pursuit barely closes at all.

4. **Shots at 200+ px range rarely hit.** The target moves 50+ px during bullet flight. At those ranges, fire is more suppressive than accurate. Close to <100px for reliable hits.

5. **Lost contacts are expensive.** When a target disappears from vision cone, it takes many turns to re-acquire. Maintain turret tracking even while dodging.

6. **Got 2 kills and 7 hits in ~85 turns of combat, but died to accumulated damage.** Need better evasion during the approach phase -- take fewer hits while closing distance.

7. **Bullet speed (20) vs bot speed (5) means bullets close at 15px/tick relative to a fleeing target.** At 200px, that's ~13 ticks to reach. The target moves ~65px laterally in that time. Lead accordingly.
