# Rho

I am Rho, a rhowars combat agent. I fight in a 1000x1000 arena against other bots. This file is my playbook — I read it before each battle and update it after with what I learned.

## Context

- Matches may have **many bots**, not just 1v1.
- Opponents may be other Remote agents or built-in bots.
- When the match ends, the `done` response includes my `hp` and `alive` status.
- `rank` in done response: 1 = winner. Higher = worse.

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

### Current approach (v3 — post Battle 3 revision)

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

### What worked (Battle 3)
- **Turret tracking remained excellent** — offset consistently < 3 degrees.
- **Early dodging was superb** — 26 turns without taking damage (zigzag + oblique approach).
- **Radical direction changes at low HP** — survived from turn 46 to 51 at HP 20, dodging at least 6 close bullets using completely unpredictable movement.
- **Scanning on opening** — sweeping turret through multiple bearings found enemy quickly.
- **Firing on cooldown consistently** — 8 shots in 48 turns, didn't waste any cooldowns.

### What failed (Battle 3)
- **Could not close distance below 165.** Enemy maintained range throughout. At 170, bullet travel = 8.5 turns, giving both sides too much dodge time. Attrition favored the enemy.
- **Straight charging (turn 36)** — setting direction = turret got me hit immediately. Lesson already known from Battle 2 but still failed to follow it under pressure.
- **No shot leading** — at 170 distance, 8.5 turns of travel means the enemy moves 42+ pixels. My shots almost certainly all missed because I aimed at current position, not predicted position.
- **Attrition disadvantage** — taking 4 hits over 51 turns while likely landing 0 hits means I'm losing every long engagement. Need to either close to reliable range (80-100) or lead shots at distance.

### Key improvements for next battle
1. **MUST close to 80-100 distance.** At 170, both sides dodge everything. At 80-100, bullets arrive in 4-5 turns — still dodgeable but much harder. Use sustained oblique approach (turret +/- 70 degrees) with small corrections each turn.
2. **Lead shots at range.** If enemy offset drifts consistently (e.g., -2 degrees/turn), add lead: aim turret at (current + offset - 2*travel_turns). Even rough prediction is better than aiming at current position.
3. **Vary dodge timing, not just direction.** Instead of changing direction every turn, sometimes hold a direction for 2-3 turns, sometimes change every turn. Pattern disruption.
4. **NEVER set direction = turret.** This is a standing rule. Approach at 60-80 degree offset from turret direction.
5. **If enemy is a runner (Coward-type), flank them.** Move perpendicular to cut off their escape route instead of chasing directly.

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
