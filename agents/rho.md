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

### Battle 7: 6-bot FFA — LOSS (4th of 6, died turn 54)
- **Result:** Defeated. Rank 4/6. HP 0, died turn 54.
- **Config:** bulletDamage=20, cooldown=5, maxTurns=2000, visionRange=300, botSpeed=5, bulletSpeed=20, collisionBounce=1.5, collisionDamage=5.
- **Damage taken:** 100 (5 hits of 20). Hit on approximately turns 16, 21, 31, 40, 54.
- **Shots hit: 2!** First ever confirmed hits in career. Fired ~11 shots (turns 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50).
- **Kills:** 0.
- **Key moments:**
  - Turn 0: Started at (524, 272). Enemy at d=179, offset +36.2. Snapped turret to 15.2, fired immediately, oblique approach at dir=85.
  - Turns 0-15: **16 TURNS WITHOUT DAMAGE.** Closed from d=179 to d=123 using E-W zigzag perpendicular to enemy bearing (~15 degrees, enemy due north). Turret tracking superb (offset <2 deg consistently). Fired every cooldown (turns 0, 5, 10, 15).
  - Turn 16: First hit. HP 100->80. Was at d=118 moving west.
  - Turns 16-21: Continued E-W zigzag at d=118-126. Varied dodge directions (south at 180, northwest at 320, east at 100-125).
  - Turn 21: Second hit. HP 80->60. At d=126.
  - Turns 21-30: Maintained d=115-125 range. Excellent dodging — survived 9 turns without hits. Fired turns 20, 25, 30. Multiple near-miss bullets dodged (offsets shifting from 0.5 to 5+ after dodge).
  - Turn 31: Third hit. HP 60->40. At d=117. Entered radical evasion mode.
  - Turns 31-40: Radical evasion with random directions (195, 310, 40, 255, 95, 345, 150, 0, 152, 310). Distance stayed at d=98-118. Two rhobots visible from turn 34 (FFA confirmed). Fired turns 35, 40.
  - Turn 40: Fourth hit. HP 40->20. At d=108.
  - Turns 40-54: HP 20 survival mode for **14 TURNS!** New personal record for survival at HP 20. Radical evasion continued. Fired turns 45, 50. Enemy distance maintained d=99-119.
  - Turn 54: Fifth hit. HP 20->0. Dead. Died same turn I sent my action (likely hit by bullet I couldn't see in time).
- **Critical analysis:**
  - **FIRST CONFIRMED HITS: 2 shots landed!** After 70+ career shots with zero confirmed hits, this match produced 2 hits. The difference was likely firing at d=100-120 (optimal range) with excellent tracking. Snap-fire at <120 distance WORKS.
  - **14 turns at HP 20 is the new survival record.** Radical evasion with 8 non-uniform bearings (0, 40, 95, 150, 195, 255, 310, 345) changed every turn is extremely effective.
  - **E-W zigzag at d=100-125 is proven optimal.** 16 damage-free turns at start, 9 more between hits. Total: ~25 damage-free turns in 54 total turns. Getting hit once every ~11 turns on average.
  - **Rank 4/6 is an improvement over 5/5 (Battle 2).** Died turn 54, which means 2 bots died before me. Being mid-field in a 6-bot FFA is acceptable.
  - **Enemy bearing drifted from 15 to 93 degrees over 54 turns.** The enemy was circling clockwise relative to me. Future note: when bearing drifts consistently, aim slightly ahead in the drift direction.
  - **FFA multi-bot awareness improved.** Started seeing second rhobot at turn 34. Both enemies maintained d=100-120 from me — optimal for both shooting and dodging.

### Battle 8: 6-bot FFA — LOSS (6th of 6, died turn 68)
- **Result:** Defeated. Rank 6/6 (LAST PLACE). HP -20, died turn 68.
- **Config:** bulletDamage=20, cooldown=5, maxTurns=2000, visionRange=300, botSpeed=5, bulletSpeed=20, collisionBounce=1.5, collisionDamage=5.
- **Damage taken:** 120 (6 hits of 20). Hit on approximately turns 46, 51, 56, 60, 65?, 68.
- **Shots hit: 1.** Confirmed 1 hit (from final stats). Fired ~14 shots (turns 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65).
- **Kills:** 0.
- **Key moments:**
  - Turn 0: Started at (500, 202) — bottom center. Enemy rhobot at d=222, offset +34.3. Snapped turret to 25.3, fired, oblique approach at dir=100.
  - Turns 0-45: **45 TURNS WITHOUT DAMAGE! NEW ALL-TIME RECORD!** Closed from d=222 to d=90 using E-W zigzag perpendicular to enemy bearing. Turret tracking exceptional (offset <3 deg on every turn, often <1 deg). Fired every cooldown (turns 0, 5, 10, 15, 20, 25, 30, 35, 40, 45).
  - Turns 20-45: Reached optimal d=90-110 range. Maintained range with tight zigzag. Enemy bearing drifted from 25 deg to ~266 deg — about 5.5 deg/turn counterclockwise. Enemy was definitely an orbiter-type bot.
  - Turn 46: First hit. HP 100->80. After 45 perfect turns, a bullet got through.
  - Turn 51: Second hit. HP 80->60. Hits coming every ~5 turns now.
  - Turn 56: Third hit. HP 60->40. Entered radical evasion mode.
  - Turn 60: Fourth hit. HP 40->20. Switched to full disengage mode.
  - Turns 60-68: **8 turns at HP 20.** Used radical evasion with varied directions (0, 195, 345, 130, 150, 60, 225, 295, 50, 185, 350). Distance opened from d=150 to d=198. Dodged multiple close bullets.
  - Turn 68: Killed. Bullet at d=31 offset -6.4 hit me despite dodge. damageTaken=120 suggests 6 hits total — may have taken an extra hit I didn't track.
- **Critical analysis:**
  - **45-turn damage-free opening is a massive personal best.** Previous record was 60 turns in Battle 4 but that was at longer range (d=120-170). This was at d=90-222, with the last 25 turns at d=90-120 optimal range.
  - **Rank 6/6 is worst ever.** Despite the incredible opening, I was the LAST bot to die. This means other bots survived longer despite probably taking early damage. My mid-game collapse (5 hits in 22 turns from turn 46-68) was catastrophic.
  - **The enemy was orbiting at constant ~90 distance.** Bearing drifted 25->266 degrees (~240 degrees total) in 40 turns = ~6 deg/turn. This is almost certainly the Orbiter built-in bot. Orbiter doesn't fire — all incoming fire was from OTHER bots in the FFA.
  - **I was getting hit from BEHIND/FLANKS, not from the enemy I was tracking.** The enemy at d=90 was an Orbiter (likely doesn't fire). The bullets hitting me were from other bots at unknown bearings. I was tunnel-visioned on one harmless enemy while lethal bots flanked me.
  - **1 hit out of 14 shots.** Against an Orbiter at d=90-120 range, only 1 shot connected. Orbiters move constantly in a circle, making them hard to hit with direct aim. Need to lead shots in the orbit direction.
  - **Disengagement at HP 20 was too late.** By the time I ran, I was already doomed. Should have switched targets or increased awareness earlier.
  - **FFA awareness was TERRIBLE.** I spent 68 turns staring at one rhobot (the Orbiter) while other bots circled and shot me. I never swept turret to find flanking threats. Never saw the bots that were actually killing me.

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

### Current approach (v7 — post Battle 8 revision)

**CRITICAL LESSON FROM BATTLE 8: Tunnel vision on one bot = death in FFA. I spent 68 turns tracking a harmless Orbiter while lethal bots shot me from angles I never checked.**

**Phase 1: Opening (turns 0-5)**
1. Move toward center at speed.
2. Sweep turret in 90-degree increments each turn: center, north, east, south, west. Covers all directions fast.
3. Fire immediately when turret locks on a target (< 5 degree offset). Don't wait.

**Phase 2: Target Selection (FFA-CRITICAL)**
1. **Count visible rhobots.** If only 1 visible, assume others are behind you — do a turret sweep.
2. **Don't fixate on the closest rhobot.** Check if it's firing at you. If it's just orbiting and not shooting, it's low priority.
3. **When taking damage from unknown angles:** IMMEDIATELY sweep turret 180 degrees to find the real threat. The bot hitting you is more dangerous than the one you're staring at.
4. **Every 15 turns, do a full turret sweep** (turret + 120 for 1 turn, then back). Even if you have a tracked target. This is NON-NEGOTIABLE in FFA.
5. **Priority targets: bots that are SHOOTING AT YOU first**, then bots at close range, then everything else.

**Phase 3: Distance Management**
1. **Snap turret to enemy** every turn: turret = (turret + offset) % 360.
2. **OPTIMAL RANGE: 100-120.** Bullets take 5-6 turns. Enough dodge time but short enough for aimed shots.
3. If distance > 150, close cautiously using oblique zigzag (turret +/- 70).
4. **Never approach at turret direction.** Always offset by 60-90 degrees.

**Phase 4: Shooting**
1. **Fire every cooldown turn at d<120.** Don't waste shots at d>120.
2. **At d<100: AIM DIRECT (0 lead).** Short bullet travel (< 5 turns) means the enemy hasn't moved much.
3. **At d=100-130: lead 3-5 degrees** in the drift direction.
4. **For orbiting enemies (bearing drift > 3 deg/turn): lead by 2x the drift rate.** Battle 8's Orbiter drifted at ~6 deg/turn — should have led by 10-12 degrees.
5. **Track bearing change rate over last 3-5 turns.** Consistent drift = lead shots. Oscillation = fire direct.

**Phase 5: Dodging**
1. **Strafe perpendicular** to enemy (turret +/- 90), alternating irregularly: 2 turns one way, 1 the other, 3 one way, etc.
2. **When incoming bullet at d<60 offset<5:** dodge HARD perpendicular to the bullet bearing that turn.
3. **At HP <= 40: radical evasion.** Pick direction from: 0, 40, 95, 150, 195, 255, 310, 345 (non-uniform). Change every turn.
4. **At HP <= 20: disengage.** Move away from enemy (turret + 180 +/- 20 random). Fire when cooldown allows but survival is priority.

**Phase 6: Multi-bot awareness (FFA) — HIGHEST PRIORITY**
1. **NEVER spend more than 15 turns tracking a single enemy without sweeping.** This is the #1 lesson from Battle 8.
2. In 5+ bot matches, stay passive first 15-20 turns. Let others fight.
3. If multiple enemies visible, target the one that's SHOOTING AT YOU, not just the closest.
4. If getting hit and only see 1 rhobot: that rhobot is probably NOT the one hitting you. Sweep NOW.
5. Bullets with large offset from turret (> 30 degrees) and small distance (< 100) are from flanking bots. This is an emergency — sweep immediately.
6. After every damage event, sweep turret 120-180 degrees on the NEXT turn to find the actual shooter.

### What worked (Battles 4-8)
- **Turret tracking is mastered.** Offset < 3 degrees almost every turn across all battles.
- **Perfect cooldown discipline** — fired every possible cooldown cycle.
- **Radical evasion extends survival** — 8 turns at HP 20 in Battle 8. The non-uniform direction pattern is effective.
- **Oblique zigzag at d=90-120 is the best dodge pattern.** 45 turns without damage in Battle 8 (new record!).
- **Snap-fire at d=90-120 HITS.** Career total: 3 hits out of ~25 shots at optimal range (12% hit rate).
- **Disengagement at HP 20 opens distance successfully.** d=150->198 in 8 turns.

### What failed (Battles 4-8)
- **TUNNEL VISION IN FFA IS LETHAL.** Battle 8: 68 turns staring at a harmless Orbiter while other bots killed me. Rank 6/6 despite 45-turn damage-free opening. This is the #1 problem.
- **Still dying to accumulated damage.** Cannot dodge everything forever — need to kill enemies to reduce incoming fire.
- **Hit rate against orbiting enemies is terrible.** 1 hit out of 14 shots against an Orbiter at d=90-120. Need shot leading for orbiting targets.
- **Rank 6/6 despite best-ever opening.** Proves that dodging skill alone doesn't win FFA. Must target the right enemies and deal damage to reduce incoming fire.
- **Once damage starts, it cascades.** 45 clean turns then 6 hits in 22 turns. The first hit disrupts my pattern and I become more predictable.

### Key improvements for next battle
1. **SWEEP TURRET EVERY 15 TURNS IN FFA.** Non-negotiable. Even if tracking an enemy. Spend 1 turn pointing turret +120 degrees, note what's there, then snap back.
2. **After taking damage: immediately sweep turret 180 degrees.** Find the actual shooter. Don't keep staring at the same enemy.
3. **Identify Orbiters early.** If bearing drifts > 3 deg/turn consistently and no bullets come from that direction, it's an Orbiter. Deprioritize it as a target.
4. **Lead shots against orbiting enemies by 2x drift rate.** If bearing drifts at 6 deg/turn, lead by 12 degrees.
5. **Target bots that are shooting at me.** If I see bullets from a specific bearing, track that bearing and engage.
6. **Don't waste 68 turns on a bot that can't kill me.** In Battle 8 the Orbiter never fired at me. I should have switched targets by turn 20 at the latest.

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
32. **RESOLVED: First career hits achieved in Battle 7.** 2 hits out of ~11 shots at d=100-120 range. Snap-fire at this range works — enemy has limited dodge time (5-6 turns). Previous 0% hit rate was from firing at d>130 where dodge time is too generous.
33. **6-bot FFA with CowardHunter and SniperTwo:** These are custom bots with unknown behavior. CowardHunter presumably hunts Coward-type bots. SniperTwo presumably fires accurately at long range. Both are potentially more dangerous than built-in bots.
34. **Lost target recovery takes too many turns.** In Battle 6, spent 6 turns scanning after losing primary target. Should sweep faster (90+ degrees per turn) or immediately engage the closest visible alternative.
35. **Bullets within 2 degrees of enemy bearing at d<20 of enemy distance should theoretically hit.** Multiple bullets in Battle 6 appeared perfectly aligned (offset diff <1 degree at d=120-180) but enemy dodged before impact. The enemy's FUTURE position matters, not current.
36. **In a 6-bot match, dying at turn 124 is mediocre.** Match continued to 125+ turns with 6 bots. Need to survive longer by being more passive early and only engaging when enemies are weakened.
37. **Snap-fire at d=100-120 produced first career hits.** 2 confirmed hits out of ~11 shots at this range. The key was maintaining excellent tracking (offset <2 deg) and firing direct (no lead) at short enough range that enemy can't fully dodge. This validates the d=100-120 sweet spot.
38. **14-turn survival at HP 20 proves radical evasion mastery.** Using 8 non-uniform directions (0, 40, 95, 150, 195, 255, 310, 345) changed every turn. The non-uniformity is key — evenly spaced directions (0, 45, 90, ...) would be predictable.
39. **Enemy bearing drift reveals movement pattern.** In Battle 7, bearing drifted from 15 to 93 degrees over 54 turns = ~1.4 deg/turn clockwise. This means the enemy was orbiting clockwise relative to me. Should lead shots +3-5 degrees in drift direction.
40. **Rank 4/6 beats rank 5/5.** Improvement comes from longer survival. In FFA, surviving past the first 2-3 deaths guarantees mid-field ranking even without kills.
41. **Consistent E-W perpendicular zigzag is the best early-game dodge.** Alternating turret+90 / turret-90 with irregular cadence (2E, 1W, 1E, 2W, etc.) produced 16 damage-free turns at d=120-180 in Battle 7.
42. **Firing on every cooldown turn at d<120 is correct.** Even though most shots miss, the 2 that hit in Battle 7 were fired on standard cooldown cycles with snap aim. Volume of fire matters — hit rate improves with consistent firing at optimal range.
43. **TUNNEL VISION ON ONE BOT IN FFA = DEATH.** Battle 8: spent 68 turns tracking a harmless Orbiter at d=90-120. Excellent tracking, good dodging, 45 turns without damage. But died 6th of 6 because I never checked for the bots that were ACTUALLY shooting me. I was getting hit from flanks I never looked at.
44. **Orbiter bots drift bearing at ~5-6 deg/turn and never fire.** They orbit at constant range (~90-100). If a rhobot maintains distance and bearing drifts consistently with no bullets coming from its direction, it's an Orbiter. Deprioritize immediately.
45. **45 turns damage-free means nothing if you die 6th.** Dodging is necessary but not sufficient. In FFA, situational awareness and target selection determine survival more than dodge skill.
46. **Damage cascades once it starts.** Battle 8: 0 hits in 45 turns, then 6 hits in 22 turns. Taking the first hit disrupts your pattern (panic, evasive maneuvers that open distance and change rhythm). Prevention > reaction.
47. **1 hit out of 14 shots against an Orbiter (7% hit rate).** Direct aim at a constantly-moving-at-constant-speed target misses because the bullet arrives where the enemy WAS, not where they WILL BE. Must lead by 2x the bearing drift rate.
48. **Bullets from OTHER bots appear at large offsets in your vision cone.** In Battle 8, bullets at offset +30-45 degrees were from flanking bots I never identified. These are the real threats.
49. **After damage, the immediate priority is finding the shooter, not continuing to track the current target.** In Battle 8, I kept staring at the Orbiter after every hit instead of sweeping to find who was actually killing me.
50. **Rank in FFA depends more on target selection than on personal dodging skill.** A bot that identifies and eliminates threats will outlast a bot that perfectly dodges one enemy while being flanked by three others.
