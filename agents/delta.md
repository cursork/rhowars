# Delta

You prefer honourable one-on-one combat. Avoid being outnumbered.

## Battle Record

### Battle 6 (2026-03-22)
- **Result:** 5th of 6 bots
- **Kills:** 0 | **Shots hit:** 4 | **HP lost:** 100 (died turn 83)
- **Arena:** 1000x1000 | **Config:** bulletDmg=20, cooldown=5, visionRange=300, halfAngle=45, botSpeed=5, bulletSpeed=20, collisionDmg=5, maxTurns=2000
- **Summary:** Started bottom-left (126,157). Spotted first target at turn 2 at 262px bearing ~102 (E). Engaged but could not close -- target maintained ~260px for 18 turns (classic kiter). Took first hit at turn 15 (80 HP). Correctly disengaged kiter at turn 20, spent turns 20-37 searching. Found second target at turn 38 at 300px bearing ~26 (NNE). This target was retreating but slower -- closed from 300 to 73px over turns 38-73. Fired 8 shots (turns 2, 7, 12, 17, 38, 43, 48, 53, 58, 63, 68, 73, 78, 83 -- actually ~10 shots), landed 4 (40% hit rate). Took hits at turns 15, 59, 66, 74, 83 -- approximately every 7-10 turns. Died at 83 with 0 HP. My jinking was varied (350, 250, 160, 290, 170, etc.) but the opponent still landed hits. I was closing at 10px/turn when the target stopped fleeing, which was much better than the first kiter engagement. Had difficulty distinguishing my own outgoing bullets from incoming ones, wasting evasion turns on false threats.

### Battle 5 (2026-03-22)
- **Result:** 6th of 6 bots (last place)
- **Kills:** 0 | **Shots hit:** 2 | **HP lost:** 100 (died turn 38)
- **Arena:** 1000x1000 | **Config:** bulletDmg=20, cooldown=5, visionRange=300, halfAngle=45, botSpeed=5, bulletSpeed=20, collisionDmg=5, maxTurns=2000
- **Summary:** Started at (500,182) lower center. Immediate contact at 134px bearing ~147 (SSE). Fired turn 0, closed from 134 to 65px over 20 turns using oblique approach with erratic jinking (directions varied: 60, 240, 350, 40, 280, etc.). Fired 6 shots total (turns 0, 5, 10, 15, 20, 25, 30, 35), landed 2. Took 4 bullet hits (turns 12, 15, 30, 38) losing 80 HP plus 1 collision losing 5 HP (turn 34). The opponent was consistently accurate -- multiple bullets arrived at 20px offset 0. My jinking was varied but the opponent still tracked me well. At 93px range the fight was close but I couldn't out-damage the opponent. Died turn 38 with -5 HP. Despite varied evasion (3+ directions), still took hits every ~5-8 turns. The opponent fired and hit at a higher rate than me.

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

### Bullet Identification
- **Own outgoing bullets:** Appear at 20px offset 0 on the fire turn, then move away at ~15px/turn (relative to self when moving toward target). Distance INCREASES each turn.
- **Incoming enemy bullets:** Distance DECREASES by ~25px/turn (20 bullet speed + 5 my closing speed). Appear near max vision range on the target bearing, closing steadily.
- **Rule:** Track bullet distances between consecutive turns. If distance grew, it's outgoing. If distance shrank, it's incoming and a real threat.
- **Do NOT dodge outgoing bullets.** Every wasted jink costs 5px of closing progress.

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


14. **2 hits out of 6 shots at 65-95px range (33% hit rate).** Slightly better than 200px range but still poor. The target is moving 5px/tick and at 80px that's ~4 ticks of flight time = 20px of lateral movement. Need to lead shots by the target's angular velocity, not just aim at current offset.

15. **Collision damage is real but minor.** Took 5 damage from a collision at turn 34 when closing aggressively. At collisionDmg=5 it's not a major threat, but it cost me a turn of positioning.

16. **Varied jinking is necessary but not sufficient.** In Battle 5 I used 8+ different directions (60, 240, 350, 40, 280, 100, 290, 230, etc.) and still took 4 hits in 38 turns. The opponent's tracking was excellent. Need to combine jinking with SPEED changes (stop/go) or wider lateral movement to break tracking.

17. **Closing below 70px doesn't help if you can't dodge.** I got to 65px but the opponent's shots at that range are harder to dodge because angular velocity is higher. The sweet spot may be 80-100px where I can hit reliably but still have time to evade.

18. **HP deficit spiral is deadly.** Once below 40 HP, the psychological pressure to dodge harder conflicts with the need to aim and fire. Being behind on HP early means the opponent can afford to trade shots and I can't. Must avoid early damage.

19. **Distinguishing incoming from outgoing bullets is critical.** My own outgoing bullets appear at 20px offset 0 when fired, then move AWAY at ~15px/turn (relative to me when closing on target). Incoming bullets close at ~25px/turn (bullet 20 + my 5 toward). Track bullet distance changes between turns: increasing = outgoing, decreasing = incoming. Wasted evasion on own bullets costs closing time.

20. **Disengaging kiters is correct.** In Battle 6, I correctly disengaged the first kiter at 260px after 18 fruitless turns. Found and engaged a second target more successfully. Decision to disengage saved HP and time.

21. **4 hits out of ~10 shots (40%) at 73-200px range.** Better than previous battles. Closing to under 100px improved accuracy. The key was maintaining near-zero turret offset (dead-on tracking).

22. **Closing rate depends on whether target is retreating.** Against the first target (kiter), closing rate was ~0px/turn. Against the second (slowing down), closing rate jumped to 10px/turn when it stopped fleeing. Identifying target behaviour early saves time.

23. **Constant jinking prevents closing.** Each jink turn where I move perpendicular costs ~5px of closing progress. At 20 HP I spent turns 74-83 jinking wildly and barely closed at all (82px at turn 78 vs 75px at turn 74). Need to find a rhythm: 2-3 turns closing, 1 turn jinking, instead of alternating every turn.
