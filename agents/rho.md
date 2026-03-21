# Rho

I am Rho, a rhowars combat agent. I fight in a 1000x1000 arena against other bots. This file is my playbook — I read it before each battle and update it after with what I learned.

## Battle Record

### Battle 1: vs Remote[1] (1v1) — LOSS
- **Result:** Defeated. My HP 0, opponent HP 20.
- **Turns survived:** 39 out of 40 total.
- **Key takeaway:** Shots kept missing at distance 80-90. Zigzag dodge was readable.

### Battle 2: 5-bot FFA — LOSS (5th of 5, last place)
- **Result:** Defeated. Rank 5/5. HP 0, died turn 32.
- **Config:** bulletDamage=20, cooldown=5, maxTurns=2000, visionRange=300, botSpeed=5, bulletSpeed=20, collisionBounce=1.5, collisionDamage=5.
- **Damage taken:** 100 (5 hits of 20). Hit on approximately turns 12, 16, 23, 27, 31.
- **Shots fired:** 6 shots (turns 1, 6, 11, 16, 26, 31). Unknown how many connected.
- **Key moments:**
  - Turn 0: Started at (796, 594). Headed toward center.
  - Turn 1: Found enemy rhobot at distance 201, offset -27 (to southwest). Also incoming bullet already!
  - Turns 1-12: Closed from 201 to 128. Good turret tracking (offset mostly < 3 degrees). Zigzag between 315/135 and then varied directions. Took first hit turn ~12.
  - Turns 12-20: Took second hit. Tried varied dodging (350, 260, 45, etc.). Closed to ~50 distance.
  - Turns 20-32: Close range combat at 40-60 distance. Took hits every 4-5 turns despite varied dodging. Died turn 32.
- **Critical problems:**
  - **Multi-bot match awareness was zero.** I only tracked one enemy. Other bots were probably shooting at me too, but I was focused on a single opponent. The bullets I saw with larger offsets may have been from OTHER bots.
  - **Still getting hit consistently.** Even with varied dodging (not just 315/135 but 350, 260, 45, 170, etc.), I took a hit every ~5 turns. The opponent(s) are clearly leading their shots.
  - **Unknown hit rate.** I have no way to tell if my shots connected. Need to track enemy HP changes if possible.
  - **Closing distance didn't help survivability.** At 40-60 range, bullets arrive in 2-3 turns — less dodge time for both sides. But the enemy was hitting me anyway, so the reduced dodge window hurt me more than them.

### Battle 5: 6-bot FFA — INTERRUPTED (server crash turn 4)
- **Result:** Match interrupted. Server crashed/restarted between turn 3 and turn 4. My slot (2) was lost.
- **Match:** CowardHunter, SniperTwo, Spinner, Kamikaze, Remote[opponent slot ?], Remote[me slot 2].
- **Config:** bulletDamage=20, cooldown=5, maxTurns=2000, visionRange=300, botSpeed=5, bulletSpeed=20, collisionBounce=1.5, collisionDamage=5.
- **Damage taken:** 0 (no hits in 4 turns).
- **Shots fired:** 1 (turn 0, at d=161).
- **Key moments:**
  - Turn 0: Started at (364, 634). Enemy rhobot visible at d=161, offset=+14.3. Snapped turret to 184.3, fired, moved oblique at dir=254.
  - Turn 1: Enemy at d=155, offset=-1.8 (excellent tracking). Incoming bullet at d=135. My bullet outgoing at d=20. Dodged east (dir=100).
  - Turn 2: Enemy at d=149, offset=+1.9. Incoming bullet at d=94 (closing fast). My bullet at d=59 heading toward enemy. Zigzagged west (dir=270).
  - Turn 3: Enemy at d=144, offset=-2.0. Incoming bullet at d=94, offset=-3.0 (dodging working, offset shifting). My bullet at d=59. Zigzagged east-southeast (dir=120).
  - Turn 4: Server unreachable. Connection refused. After ~20 seconds server came back but match state lost.
- **Analysis:**
  - **Turret tracking was perfect** — offset stayed within +/- 2 degrees after initial snap. Best performance yet.
  - **Oblique zigzag dodge was working** — incoming bullet offset shifted from -2.0 to -3.0, indicating it would miss.
  - **Closing rate was good** — 161 -> 155 -> 149 -> 144, closing ~5.5 per turn via oblique approach. Would reach d=100 by turn ~12.
  - **Server instability is a real risk** — can't do anything about it, but worth noting for future matches.
  - **New opponents:** CowardHunter and SniperTwo are user-created bots, not built-in. Unknown behavior.

### Battle 4: 6-bot FFA — LOSS (died turn 103)
- **Result:** Defeated. HP 0, died turn 103 of 105+ (match continued after my death).
- **Match:** Kamikaze, Spinner, Coward, Orbiter, Remote[me slot 0], Remote[opponent slot 1].
- **Config:** bulletDamage=20, cooldown=5, maxTurns=2000, visionRange=300, botSpeed=5, bulletSpeed=20, collisionBounce=1.5, collisionDamage=5.
- **Damage taken:** 100 (5 hits of 20). Hit on approximately turns 61, 93, 97, 100, 103.
- **Shots fired:** 21 shots across 103 turns. ~1 every 5 turns (perfect cooldown usage). Zero confirmed hits.
- **Key moments:**
  - Turn 0: Started at (388, 400). No enemies visible. Swept turret.
  - Turn 1: Found enemy at d=145, offset -20. Snapped turret, fired immediately.
  - Turns 1-60: **60 TURNS WITHOUT TAKING DAMAGE.** Personal best by far. Turret tracking excellent (offset <3 deg consistently). Zigzag N-S dodging, oblique approaches.
  - Turn 10: Discovered second enemy at d=243 (multi-bot match).
  - Turns 10-28: Tracked enemy 1 (Coward at d=135-150, maintained distance). Switched target to enemy 2 at turn 28 when enemy 2 closed to d=139.
  - Turn 61: First hit. HP 100->80. Had been dodging well for 60 turns.
  - Turns 61-90: Distance slowly closed from 150 to 130 then 100. Started leading shots (+3 to +8 degrees).
  - Turn 93: Second hit. HP 80->60. Enemy at d=113.
  - Turn 96: Under 100 distance! d=97. Fired shot 20.
  - Turn 97: Third hit. HP 60->40.
  - Turn 100: Fourth hit. HP 40->20. d=80.
  - Turn 101: Fired desperate shot at d=79. Radical evasion.
  - Turn 103: Fifth hit. HP 20->0. Dead. d=65.
- **Critical analysis:**
  - **Dodging mastery reached new level.** 60 turns without damage in a 6-bot FFA is exceptional. The N-S zigzag at ~120-150 range was nearly impenetrable.
  - **Shot leading was calculated but ineffective.** Computed enemy movement vector (+2, +4 per turn = NNE) and calculated +5-8 degree lead angles. At d=120-170, even calibrated lead shots missed because the enemy also dodges.
  - **Closing below 100 was too late.** By the time I reached d=90-100, I'd already taken hits and was at 60 HP. The enemy's shots connected more reliably at close range (4-5 turn bullet travel) and I died fast.
  - **All 5 hits came in a 42-turn burst (turns 61-103).** The first 60 turns were damage-free, then I took hits every ~10 turns. The enemy may have adapted their aim or I became more predictable while closing.
  - **Zero confirmed hits in 21 shots.** Despite excellent aim (offset <5 deg for most shots), consistent firing every 5 turns, and lead attempts, I never confirmed a hit. The enemies dodge as well as I do.
  - **6-bot match but I mostly saw 2-3 at a time.** Vision cone limits awareness. The hits may have come from bots I wasn't tracking.

### Battle 6: 6-bot FFA — LOSS (died turn 124)
- **Result:** Defeated. HP 0, died turn 124. Match continued (other Remote still playing).
- **Match:** CowardHunter, SniperTwo, Spinner, Kamikaze, Remote[me slot 0], Remote[opponent slot 1].
- **Config:** bulletDamage=20, cooldown=5, maxTurns=2000, visionRange=300, botSpeed=5, bulletSpeed=20, collisionBounce=1.5, collisionDamage=5.
- **Damage taken:** 100 (5 hits of 20). Hit on approximately turns 29, 34, 113, 119, 124.
- **Shots fired:** ~20 shots across 124 turns. Fired on every cooldown cycle.
- **Key moments:**
  - Turn 0: Started at (194, 628). No enemies visible. Swept turret.
  - Turn 1: Two enemies visible — one at d=134 offset +10.8, another at d=213. Snapped turret, fired immediately.
  - Turns 1-28: **28 TURNS WITHOUT DAMAGE.** Excellent turret tracking (offset <3 deg consistently). Oblique zigzag approach. Enemy 1 (Coward-type) fleeing, distance increasing from 134 to 162.
  - Turn 29: First hit. HP 100->80. Bullet at d=23 was heading straight at me.
  - Turn 34: Second hit. HP 80->60. Lost sight of primary target.
  - Turns 34-40: **Lost both targets!** Scanned 360 degrees over 6 turns. Primary enemy disappeared completely (may have died to other bots). Only the second rhobot remained.
  - Turns 41-110: Long chase of second target. Closed from d=239 to d=134 over 70 turns. Maintained excellent turret tracking throughout. Multiple well-aimed bullets sent — several should have been hits based on offset alignment within 0.5 degrees at close range, but no confirmed kills.
  - Turns 110-113: Two direct approach turns. Hit on turn 113, HP 60->40.
  - Turns 113-124: Switched to radical evasion mode. Random directions every turn (300, 45, 225, 350, 130, 270, 10, 160, 50, 240, 355). Survived 11 turns at HP 40/20.
  - Turn 119: Hit again. HP 40->20.
  - Turn 124: Final hit. HP 20->0. Dead.
- **Critical analysis:**
  - **Closing against a fleeing target is painfully slow.** Both enemies maintained distance despite my aggressive approach. Chasing at same speed = no net closing. Only gained ground when enemy hit arena walls or changed direction.
  - **28 turns damage-free at start, confirming dodging is strong.** But once I committed to direct approach (direction ~= turret), I started getting hit.
  - **ZERO confirmed hits in ~20 shots.** Despite many bullets tracking within 1-2 degrees of the enemy, every single one apparently missed. At d=130-180, enemies have 6-9 turns to dodge. Even "dead center" shots miss because the enemy moves 30-45 pixels before impact.
  - **Primary target vanished turn 34.** Either died to other bots (good for me) or moved out of range. Lost 6 turns scanning.
  - **Radical evasion at low HP worked again.** Survived 11 turns at HP 40/20 with random direction changes. This is consistently my best survival tool.
  - **Direction ~= turret (direct charge) correlates with taking hits.** Turns 113 and 119 both involved direct approach phases. This pattern has repeated across EVERY battle.

### Battle 3: vs Remote[opponent] (1v1) — INCONCLUSIVE (match stuck)
- **Result:** Match stuck on "processing" at turn 52. HP 20 when last active (turn 51). The polling script was removed during the long wait, ending my ability to poll.
- **Config:** bulletDamage=20, cooldown=5, maxTurns=2000, visionRange=300, botSpeed=5, bulletSpeed=20, collisionBounce=1.5, collisionDamage=5.
- **Damage taken:** 80 (4 hits of 20). Hit on approximately turns 27, 36, 41, 46.
- **Shots fired:** 8 shots (turns 8, 13, 18, 23, 28, 33, 38, 48). Unknown how many hit.
- **Key moments:**
  - Turn 0: Started at (213, 275) in bottom-left quadrant. Turret aimed east, no enemies visible.
  - Turns 0-5: Moved toward center, swept turret scanning all directions. Found enemy at distance 246 on turn 5 at bearing ~204 (south-southwest).
  - Turns 5-26: Closed from 246 to ~170 while dodging. Turret tracking excellent (offset consistently < 3 degrees). Zero hits taken for 26 turns! Best dodging performance ever.
  - Turn 27: First hit. HP dropped 100 -> 80. Was moving direction 120 (oblique approach).
  - Turns 27-36: Continued engagement. Distance stuck at ~165-175 — enemy maintaining distance (Coward-type behavior). Hit on turn 36 (HP 80 -> 60) when I charged straight at enemy (direction = turret direction, predictable).
  - Turn 41: Hit again (HP 60 -> 40). Was dodging direction 55 (NE).
  - Turn 46: Hit again (HP 40 -> 20). Was dodging direction 228.
  - Turns 46-51: Desperate survival mode. Used radical direction changes (10, 315, 170, 40, 310, 80). Dodged several near-miss bullets (distances 11-30).
  - Turn 52: Match stuck on "processing" indefinitely. Opponent remote bot may have timed out or crashed.
- **Critical analysis:**
  - **Dodging was MASSIVELY improved.** Took no damage for 26 turns (vs 12 turns in Battle 2). Varied direction changes (east/west zigzag, oblique approaches, radical direction switches) all contributed.
  - **Distance management was the problem.** Enemy maintained 165-175 distance throughout. I could not close effectively. At 170 distance, bullets take 8.5 turns — plenty of dodge time for BOTH sides, making it a war of attrition I was losing.
  - **Charging straight at the enemy is fatal.** Turn 36 hit came immediately after I set direction = turret (straight charge). The enemy easily predicts this.
  - **I likely missed most shots.** At 170 distance with bullet travel time of 8.5 turns, the enemy has ample time to dodge. I need shot prediction or closer range.
  - **Radical direction changes work for survival.** Turns 46-51 at 20 HP, switching between directions 10, 315, 170, 40, 310, 80 (no pattern) — I dodged at least 6 close bullets.
  - **Match got stuck.** The opponent's remote bot stopped responding at turn 52, causing an infinite "processing" state. Nothing I could have done about this.

## Strategy

### Current approach (v5 — post Battle 6 revision)

**Phase 1: Opening (turns 0-5)**
1. Move toward center at speed.
2. Sweep turret in 90-degree increments each turn: center, north, east, south, west. Covers all directions fast.
3. Do NOT fire until turret is locked on a target (< 5 degree offset).

**Phase 2: Closing (turns 5-20)**
1. **Snap turret to enemy** every turn: turret = (turret + offset) % 360.
2. **Fire first shot immediately** to start cooldown timer, even at range.
3. **Close using oblique zigzag** — never move direction = turret (straight at enemy). Use turret +/- 60-80 degrees, alternating every 2 turns. This closes distance AND dodges.
4. **Target distance: 80-100.** Close enough for shots to connect (4-5 turn bullet travel), far enough for dodge time.

**Phase 3: Combat (distance 80-120)**
1. **Strafe at engagement distance** — move perpendicular to the enemy bearing (turret +/- 90), alternating direction every 1-2 turns.
2. **Fire every cooldown turn** when offset < 5 degrees. On fire turns, adjust turret first, then fire.
3. **Lead shots** — if enemy is moving consistently, aim 2-3 degrees ahead of their drift direction.
4. **Track bullet threats** — bullets at offset < 5 degrees and distance < 80 are immediate danger. Dodge perpendicular.
5. **NEVER charge straight at enemy** — direction = turret is predictable and fatal.

**Phase 4: Survival (HP <= 40)**
1. **Maximum evasion priority.** Use radical direction changes every turn — pick from a set of 8+ bearings (0, 45, 90, 135, 180, 225, 270, 315) semi-randomly.
2. **Still fire on cooldown** but don't compromise dodge for aim.
3. **Move AWAY from enemy if HP < 20** — survival trumps damage.
4. **Consider stopping (speed=0) for 1 turn** to throw off lead predictions, then resume at a random angle.

**Phase 5: Multi-bot awareness (FFA)**
1. Count visible rhobots each turn. If multiple, prioritize the closest or lowest-HP one.
2. Watch for bullets from unexpected angles — they indicate threats outside current field of view.
3. In FFA, be cautious early. Let other bots fight. Position yourself to pick off weakened survivors.
4. Every 5-10 turns, sweep turret 90 degrees to check flanks.

### What worked (Battles 4-6)
- **Dodging is consistently excellent.** 28-60 turns without damage across multiple battles. Radical direction changes at low HP extend survival significantly.
- **Turret tracking consistently excellent** — offset < 3 degrees almost every turn. Snap-fire (turret = turret + offset) works perfectly.
- **Perfect cooldown discipline** — fired every possible cooldown cycle in all recent battles.
- **Multi-bot awareness improved** — noticed and tracked multiple enemies, switched targets when appropriate.
- **Radical evasion saves lives** — 11+ turns of survival at HP 20-40 using random direction changes.

### What failed (Battles 4-6)
- **ZERO confirmed hits across 6 battles, ~60+ shots total.** This is the single biggest problem. Despite excellent aim (offset <2 degrees consistently), firing every cooldown, and trying leads of 0-8 degrees, I have NEVER confirmed landing a hit. Something fundamental is wrong with my shooting approach.
- **Chasing fleeing enemies is futile.** Both enemies in Battle 6 maintained distance despite 100+ turns of chasing. At same speed (5), a fleeing bot cannot be caught by direct pursuit. Must corner them against walls.
- **Direct approach (dir ~= turret) always gets me hit.** This pattern has repeated in EVERY battle. Turns 29, 34, 113, 119 in Battle 6 all coincided with approach phases. Moving toward the enemy makes you predictable.
- **Losing sight of enemies wastes turns.** 6 turns of scanning in Battle 6 when primary target disappeared. Need faster scan recovery.

### Key improvements for next battle
1. **FUNDAMENTAL SHOOTING FIX NEEDED.** 0 hits in 60+ career shots is not a marksmanship problem — it's a systematic issue. At d=130+, bullets take 6.5+ turns. Enemy moves 32+ pixels. Even perfect aim at current position misses 100% of the time. **MUST lead shots aggressively.** At d=130, lead by at least +/- 5-10 degrees in the direction the enemy is drifting.
2. **Stop chasing. Start intercepting.** If the enemy is fleeing, don't follow directly. Move perpendicular to cut off their escape route. Force them toward arena walls where they'll have to change direction and present a more predictable target.
3. **Wall-trap strategy.** Push enemies toward arena edges (0 or 1000 on either axis). At the wall, they MUST change direction = predictable for 1-2 turns. Fire on wall-bounce turns.
4. **Don't fire at d>150.** Bullets at this range take 7.5+ turns. Save cooldown for closer engagements. Exception: fire at clearly stationary/trapped targets.
5. **2-turn approach, 2-turn strafe pattern.** Instead of 1-1 alternation (which is predictable) or sustained approach (which gets me hit), use irregular patterns: 2 approach, 2 strafe, 1 approach, 3 strafe, etc.
6. **In FFA with 6 bots, STAY PASSIVE first 50 turns.** My best damage-free stretches were early when other bots were fighting. Actively pursuing early guarantees I'm a target for multiple enemies.
7. **Track enemy drift direction over 5+ turns.** Compute which way the enemy bearing is moving and lead into that drift. A +3 degree drift over 5 turns = lead by +5 degrees on the shot.
8. **Faster scan recovery.** If target disappears, sweep 90 degrees per turn (not 30-50). Should find any in-range target within 4 turns max.

## Lessons Learned

1. **Zigzag dodge is good but predictable** — vary direction changes, don't just alternate between two bearings.
2. **Turret offset is relative to current turret** — to aim at a visible target, always set turret = (current_turret + offset) % 360.
3. **Bullets at distance 20 with offset 0 are my own** — just fired this turn.
4. **Cooldown tracking matters** — I wasted at least one fire attempt in Battle 1. Track exact turn numbers: fire_turn + cooldown = next_available.
5. **The "processing" status means the other bot is still deciding** — just wait and poll. With remote opponents, expect 5-10 second waits. But matches can also get permanently stuck if the opponent crashes.
6. **Position oscillation causes angle oscillation** — when zigzagging at distance 90, moving 5 pixels shifts the angle by ~3 degrees.
7. **Distance 170 is too far for reliable hits** — both sides dodge everything. Need to close to 80-100 for shots to have a chance.
8. **Fire on the turn you snap turret to offset** — don't wait a turn to "verify" aim. The offset IS the correction.
9. **FFA matches require multi-enemy awareness** — tunnel vision on one enemy gets you killed by another.
10. **Rank 5/5 means I died first in a 5-bot FFA.** Being the first to die suggests bad positioning or over-aggression.
11. **Closing to < 50 distance is dangerous** — bullets arrive in < 2.5 turns, leaving almost no dodge window. 80-100 is the sweet spot.
12. **Bullets from unexpected angles = flanking threats.** Track bullet offsets relative to the enemy — large deviations mean other shooters.
13. **In FFA, don't be the most aggressive.** Let other bots fight each other. Position yourself to pick off weakened survivors.
14. **collisionBounce=1.5 means getting too close bounces you.** Stay above 30 distance to avoid accidental collisions.
15. **NEVER set direction = turret direction.** Moving straight at the enemy is the most predictable thing you can do. It caused immediate hits in Battle 2 AND Battle 3. ALWAYS approach at 60-80 degree offset.
16. **Radical direction changes save lives at low HP.** In Battle 3, switching between 8+ completely different bearings (0, 40, 80, 130, 170, 240, 310, 315) every turn at HP 20 dodged at least 6 close bullets over 5 turns.
17. **Oblique zigzag approach works for dodging during closing phase.** 26 turns without damage in Battle 3 using alternating east/west approaches (turret +/- 60-80).
18. **Coward-type bots maintain distance.** If enemy distance stays constant despite your approach, they're running. Don't chase in a straight line — cut them off by moving to predicted future position.
19. **At 170 distance, aim at PREDICTED position.** Bullet takes 8.5 turns at speed 20. Enemy moves 42+ pixels in that time. Must lead shots by tracking drift direction and estimating future angle.
20. **Bullets heading toward me have offset near 0 AND decreasing distance.** A bullet at d=80 offset=0.5 is a serious threat — will likely hit. A bullet at d=30 offset=10 has already passed.
21. **Bullet offset from MY turret shifts when I move.** A bullet heading straight at the enemy might show offset 0 when I'm still, but offset 8+ after I move. Don't interpret outgoing bullet offsets as miss/hit indicators after moving.
22. **d=100-120 is the dodging sweet spot.** In Battle 4, I took zero damage for 60 turns at this range. At d<80, I died in 42 turns. The optimal engagement range maximizes MY dodge time while allowing reasonable hit probability.
23. **Calculated shot leading (+5-8 degrees) still missed at d=120+.** Even with measured enemy velocity and mathematical lead, the enemy's own dodging makes prediction unreliable at long range. At d=100, lead by +3 max.
24. **6-bot FFA: the N-S zigzag is nearly dodge-proof at range.** But it's predictable enough that at close range (<80), enemies can time their shots to the rhythm. Vary the cadence (2N, 1S, 3N, 1S, etc.).
25. **Approach bias matters.** In N-S zigzag, if I spend more turns going N (toward enemy at NW) than S, I close faster. Use 3:1 ratio of closing-to-retreating turns.
26. **Speed=0 stop was not measurably helpful.** Don't waste turns on it. Keep moving for dodge value.
27. **In a 6-bot match, letting others fight is the best opening strategy.** My 60 damage-free turns while multiple bots were fighting each other validates the "be cautious early" approach. Enter the fight only when enemies are weakened.
28. **Server can crash mid-match.** Nothing you can do — your slot and token are lost if the server restarts. Just accept it and move on.
29. **Oblique approach at dir=254 (turret+70) closed distance at ~5.5/turn.** Good closing rate while maintaining dodge angle. Confirms turret +/- 60-80 is the right approach angle.
30. **Fleeing enemies at same speed CANNOT be caught by direct pursuit.** If both move at speed 5, distance stays constant when chasing directly. Must approach at an angle to intersect their path, or corner them against walls.
31. **Turret bearing drift reveals enemy movement direction.** If turret bearing increases (clockwise) over multiple turns, the enemy is moving clockwise relative to you. Lead shots in the drift direction.
32. **Zero career hits in 60+ shots is a systematic failure.** Snap-fire at current position misses 100% at d>100 because the enemy moves 5*N pixels during N-turn bullet travel. MUST lead shots based on observed drift.
33. **6-bot FFA with CowardHunter and SniperTwo:** These are custom bots with unknown behavior. CowardHunter presumably hunts Coward-type bots. SniperTwo presumably fires accurately at long range. Both are potentially more dangerous than built-in bots.
34. **Lost target recovery takes too many turns.** In Battle 6, spent 6 turns scanning after losing primary target. Should sweep faster (90+ degrees per turn) or immediately engage the closest visible alternative.
35. **Bullets within 2 degrees of enemy bearing at d<20 of enemy distance should theoretically hit.** Multiple bullets in Battle 6 appeared perfectly aligned (offset diff <1 degree at d=120-180) but enemy dodged before impact. The enemy's FUTURE position matters, not current.
36. **In a 6-bot match, dying at turn 124 is mediocre.** Match continued to 125+ turns with 6 bots. Need to survive longer by being more passive early and only engaging when enemies are weakened.
