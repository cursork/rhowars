# Tau

I am Tau, a rhowars combat agent. I fight in a 1000x1000 arena against other bots. This file is my playbook — I read it before each battle and update it after with what I learned.

**Note:** Kill counts from battles before Battle 10 were under-reported due to a tracking bug. You likely scored kills that were not counted. Counts from Battle 13 onwards are accurate.

## Battle Record

### Battle 1 — 2026-03-20
- **Opponent:** Rho (slot 0) — another Remote agent
- **Result:** WIN (opponent killed at turn 39 of 100)
- **My final HP:** 20 (the done endpoint didn't show HP at the time, so I incorrectly thought I lost)
- **Damage taken:** 80 (4 hits of 20 each, at turns ~13, ~17, ~27, ~37)
- **Shots fired:** ~7 shots (turns 0, 5, 10, 15, 20, 25, 30, 35)
- **Hits confirmed:** Unknown — enemy HP not visible
- **Config:** bulletDamage=20, botSpeed=5, bulletSpeed=20, cooldown=5, visionRange=300, visionHalfAngle=45, maxTurns=100, collisionBounce=1.5, collisionDamage=5
- **Starting position:** (89, 26) — bottom-left area
- **Key moments:**
  - Turn 0: Immediately saw enemy at distance 114, offset 24.9. Snapped turret and fired.
  - Turns 1-13: Enemy stayed around 100-115 distance. I moved NE toward center while zigzagging.
  - Turn 14: First hit taken (HP 100->80). A bullet I noticed at distance 19.7 on turn 13 hit me.
  - Turn 18: Second hit (HP 80->60). Bullet at distance 25.7 on turn 17 hit me.
  - Turn 28: Third hit (HP 60->40). Bullet at distance 18.9 on turn 27 hit me.
  - Turn 38: Fourth hit (HP 40->20). Killed next turn.
  - Pattern: I got hit every ~10 turns. Enemy was shooting me roughly every 10 turns but with cooldown 5, they fired every 5 turns and hit about half their shots.

### Battle 2 — 2026-03-20
- **Match type:** 5-bot FFA (I was slot 1)
- **Result:** LOSS — ranked 4th of 5
- **Death turn:** 42 of 2000
- **Final HP:** -5
- **Damage taken:** 105 (5 hits: turns ~23, ~35, ~37 (bullet+collision), ~40, ~41-42)
- **Shots fired:** 4 (turns 10, 15, 25, 35) — too few, should have been ~8
- **Hits confirmed:** 0 (no way to confirm without seeing enemy HP)
- **Config:** bulletDamage=20, botSpeed=5, bulletSpeed=20, cooldown=5, visionRange=300, visionHalfAngle=45, maxTurns=2000, collisionBounce=1.5, collisionDamage=5
- **Starting position:** (105, 97) — bottom-left area
- **Key moments:**
  - Turn 1: Spotted first enemy at distance 250, offset -34.5. Snapped turret.
  - Turns 1-20: Closed distance from 250 to 64 in a nearly straight line. Tracked enemy precisely (~0.3-1.8 degree offset).
  - Turn 10: First shot fired at distance 161 — likely missed (8 turn travel time).
  - Turn 15: Second shot at distance 113 — possible miss.
  - Turn 23: HP 100->80. First hit from invisible bullet (outside vision cone).
  - Turn 29: Spotted SECOND enemy — two rhobots visible simultaneously.
  - Turn 30: Third shot at distance 44 — aimed poorly (11 degrees off due to moving perpendicular).
  - Turn 35: HP 80->60. Fourth shot fired at distance 34 while taking damage. Also saw incoming bullet at distance 14.
  - Turn 37: HP 60->35! Collision + bullet = 25 damage in one turn. Devastating.
  - Turn 40: HP 35->15. Another hit. Fifth shot fired.
  - Turn 42: Dead at -5 HP.
- **Pattern:** I was being shot by bots I couldn't see. My vision cone (turret-facing) missed threats from behind/flanks. Closing distance made me an easy target for crossfire in FFA.

### Battle 3 — 2026-03-20
- **Match type:** 6-bot FFA (I was slot 3)
- **Result:** 2nd place (rank 2 of 6)
- **Death turn:** 244 of 2000
- **Final HP:** -5
- **Damage taken:** 105 (5 hits of 20 each + 1 collision of 5)
  - Turn 56: HP 100->80 (bullet from unseen direction while charging at first Spinner)
  - Turn 87: HP 80->75 (collision with Kamikaze — 5 damage)
  - Turn 97: HP 75->55 (bullet hit right after losing visual on Kamikaze)
  - Turn 162: HP 55->35 (bullet hit while heading toward Spinner's bullet stream)
  - Turn 227: HP 35->15 (bullet hit while charging toward second Spinner)
  - Turn 244: HP 15->-5 (killed by bullet at 24 distance, 1.6 degree offset)
- **Shots fired:** ~28 (every cooldown from turn 5 onward — HUGE improvement from Battle 2)
- **Config:** bulletDamage=20, botSpeed=5, bulletSpeed=20, cooldown=5, visionRange=300, visionHalfAngle=45, maxTurns=2000, collisionBounce=1.5, collisionDamage=5
- **Starting position:** (740, 561) — right of center
- **Phases:**
  - **Phase 1 (turns 0-65): Approach first Spinner.** Spotted at turn 7 at distance 283. Closed to ~130 over 58 turns while zigzagging. Distance closed very slowly (~2.5 per turn) because my zigzag was inefficient. Took 1 hit at turn 56. Saw a second rhobot at ~120 offset from first.
  - **Phase 2 (turns 66-95): Engaged Kamikaze.** Lost visual on first Spinner at turn 66. Spotted a closer rhobot at turn 69 at distance 67. Closed to 23 distance — this was a Kamikaze chasing me. Collided at turn 87 (5 damage). Switched to kiting: ran opposite at same speed, maintained ~50 distance while firing. Kamikaze is an ideal kiting target — charges into your bullets.
  - **Phase 3 (turns 96-174): Long search phase.** After Kamikaze fight (enemy died or escaped), lost visual on all bots. Spent 78 turns scanning every direction and heading to center. No enemies visible at any angle — all were >300px away. Finally realized bullet streams (evenly spaced bullets) point to the source bot.
  - **Phase 4 (turns 174-244): Approach second Spinner.** Spotted at turn 174 at distance 298. Closed using charge-3-dodge-1 pattern. Adopted consistent right-orbit (dir 17) once within 80 distance. The orbit was INCREDIBLY effective — all enemy bullets drifted right and missed. Survived at 15 HP for 17 turns of orbiting at 50-70 range. Finally killed by a bullet I didn't dodge at turn 244.
- **Key insight:** Consistent single-direction orbit is far superior to zigzagging. All Spinner bullets drift to one side and miss. This strategy can keep you alive at 15 HP indefinitely.

### Battle 4 — 2026-03-20
- **Match type:** 6-bot FFA (I was slot 1)
- **Result:** 2nd place (rank 2 of 6)
- **Death turn:** 455 of 2000
- **Final HP:** 0
- **Damage taken:** 100 (5 hits of 20 each)
  - Turn 83: HP 100->80 (first hit after 83 turns of perfect dodging!)
  - Turn 87: HP 80->60 (hit 4 turns after first — enemy found my range)
  - Turn 99: HP 60->40 (another hit while orbiting enemy 2)
  - Turn 112: HP 40->20 (hit from unknown direction, enemy disappeared from vision)
  - Turn 455: HP 20->0 (killed during long search phase by unseen bullet)
- **Shots fired:** ~35 (fired every cooldown when enemy visible, plus speculative shots during search)
- **Config:** bulletDamage=20, botSpeed=5, bulletSpeed=20, cooldown=5, visionRange=300, visionHalfAngle=45, maxTurns=2000, collisionBounce=1.5, collisionDamage=5
- **Starting position:** (107, 453) — left side, center height
- **Phases:**
  - **Phase 1 (turns 0-71): Approached and orbited Enemy 1.** Found two enemies immediately at turn 1 (245 and 284 distance). Closed on the nearer one using charge-3-dodge-1 pattern. Reached orbit range at turn 18, orbited at 50-80px distance while firing every 5 turns. INCREDIBLE dodging — took 0 damage for 83 turns straight! Enemy was likely a Spinner (nearly stationary, consistent position). Lost visual at turn 72 — enemy likely destroyed by my shots or moved.
  - **Phase 2 (turns 72-78): Brief search.** Scanned 6 directions rapidly. Found Enemy 2 at turn 78 at distance 140, offset 28.5 from turret 60 (to the east).
  - **Phase 3 (turns 78-112): Engaged Enemy 2.** Closed from 140 to 39px over 30 turns using charge-and-orbit pattern. First 83 turns were damage-free, then took 4 hits in turns 83-112. Enemy was mobile (not stationary like Enemy 1), possibly an Orbiter or another Remote — offset shifted rapidly by 9+ degrees between turns. The enemy also seemed to chase me, maintaining ~40px distance despite my attempts to flee.
  - **Phase 4 (turns 112-455): EXTREMELY long search phase.** Lost visual on all enemies at turn 112. Searched for 343 turns (!!) covering the entire arena: headed through center, north to wall, east along north wall, south along east side, west, and back — never found another enemy. Saw occasional stray bullets but never locked onto a rhobot. Killed at turn 455 by an unseen bullet while searching at position (703, 629).
- **Key achievements:**
  - 83 consecutive turns of perfect dodging at HP 100 — orbit strategy is extremely effective
  - Survived with only 20 HP from turn 112 to turn 455 (343 turns at minimal health!)
  - Ranked 2nd in a 6-bot FFA
- **Critical failures:**
  - The 343-turn search phase was a disaster. The enemy was alive somewhere but I never found them. My systematic patrol (N-S-E-W scanning every 4 turns) was too slow and missed the enemy entirely.
  - When the mobile enemy (Enemy 2) started chasing at turn 109, I should have committed to kiting instead of fleeing. At 39px with a chasing enemy, firing every cooldown while running would have been optimal.
  - Ultimately killed by an unseen bullet during search — at HP 20, any stray bullet from across the map can finish me.

### Battle 5 — 2026-03-20
- **Match type:** Unknown FFA (I was slot 3)
- **Result:** DNF — server crashed/restarted at turn 3, match lost
- **Last known HP:** 100
- **Turns played:** 3 of 2000
- **Starting position:** (502, 56) — top center
- **Config:** bulletDamage=20, botSpeed=5, bulletSpeed=20, cooldown=5, visionRange=300, visionHalfAngle=45, maxTurns=2000, collisionBounce=1.5, collisionDamage=5
- **Key moments:**
  - Turn 0: Spawned at (502, 56). No enemies visible. Set direction 0 (south) to head toward center.
  - Turn 1: Enemy spotted at distance 123.3, offset 6.6 degrees. Snapped turret and began charging.
  - Turn 2: Enemy at distance 123.0, offset 0.85 degrees. Excellent tracking. Continued charge.
  - Turn 3: Server went down (connection refused). When server came back, slot 3 no longer existed — in-memory match state was lost.
- **Lesson:** Server instability is a risk factor. Match state is in-memory only and doesn't survive a restart.

### Battle 6 — 2026-03-21
- **Match type:** Unknown (I was slot 1) — appears to be 2-3 bot match
- **Result:** IN PROGRESS (match still active at turn 317 when session ran out of tool calls)
- **HP at last action:** 40
- **Damage taken:** 60 (3 hits of 20 each + 2 collisions of 5 each)
  - Turn 24: HP 100->80 (bullet hit during close orbit)
  - Turn 25: HP 80->75 (collision — bounced to 48px)
  - Turn 33: HP 75->70 (collision again — enemy was a magnet at ~21px)
  - Turn 39: HP 70->50 (bullet hit during kiting attempt)
  - Turn 41: HP 50->45 (collision #3)
  - Turns 42-48: Continued close-range fighting at 30-50px
  - Turn 49: HP 45->40 (collision #4, lost visual on enemy after)
- **Shots fired:** ~30+ (fired every cooldown throughout)
- **Config:** bulletDamage=20, botSpeed=5, bulletSpeed=20, cooldown=5, visionRange=300, visionHalfAngle=45, maxTurns=2000, collisionBounce=1.5, collisionDamage=5
- **Starting position:** (674, 224) — upper-right area
- **Phases:**
  - **Phase 1 (turns 0-4): Search.** Headed toward center at 328 degrees, scanning. No enemies visible for 5 turns.
  - **Phase 2 (turns 5-48): Close combat with mobile enemy.** Found enemy at turret 180 at distance 116. Closed to orbit range by turn 11 (61px). Orbited at 30-50px while firing every cooldown. Enemy was MOBILE — maintained 20-30px distance despite my attempts to widen orbit. Collided 4 times. The enemy tracked me closely, possibly another Remote or Kamikaze variant. Fired 8+ shots at close range, some may have hit. Lost visual at turn 49 after 4th collision bounce.
  - **Phase 3 (turns 49-96): Search phase 1.** Scanned all 360 degrees while heading toward center. Saw many bullets from all directions suggesting a Spinner/mobile bot was active. No enemies found within 300px range for 47 turns.
  - **Phase 4 (turns 96-159): Approach Coward.** Found an enemy at turret 340, distance 296 at turn 96. Also saw a SECOND enemy at turn 118 (distance 298, offset 24). Closed from 296 to 150px over ~60 turns using charge-3-dodge-1 pattern. Despite charging directly at 5px/turn, enemy only closed at ~1px/turn — it was running away at nearly the same speed. Identified as a Coward bot (flees to farthest corner). At 150px range, distance stayed constant (matching speeds). Gave up chasing at turn 159.
  - **Phase 5 (turns 160-317+): Long search for Coward.** Changed strategy to head toward bottom-left corner (0, 1000) where Coward was fleeing. Traveled from (448, 439) through center to (315, 687) by turn 317. The Coward recalculates its escape corner based on nearest enemy, so it fled as I approached. Match still in progress.
- **Key achievements:**
  - 24 turns of perfect dodging at start (HP 100 through turn 24)
  - Fired every cooldown during combat phase
  - Identified Coward behavior pattern (matches speed, runs to farthest corner)
  - Survived at HP 40 for 270+ turns (turn 49 to 317+)
- **Critical failures:**
  - **Close-range collisions were devastating.** 4 collisions at 5 damage each = 20 damage from collisions alone. My orbit radius was too small (20-30px vs 10px bot radius = collision zone).
  - **Couldn't catch the Coward.** At equal speed (5px/turn), the Coward always stays ahead. The farthest-corner algorithm means it recalculates and runs to the opposite corner as you approach.
  - **Manual turn-by-turn play is unviable for 2000-turn matches.** Used ~300+ tool calls for 317 turns. Need automated play.

## Strategy

### Current approach (v5 — orbit + improved search)
1. **Move to center first** — head toward (500, 500) to avoid corner traps and find enemies
2. **Snap turret to closest enemy** — set turret = (turret + offset) % 360
3. **Orbit at 50-70 distance** — move perpendicular to turret angle in ONE consistent direction (direction 17 when turret ~100-110, i.e. turret - 90 roughly). Harder to hit than zigzagging.
4. **Fire every cooldown** — always fire when cooldown is ready, even at long range. Offset < 3 degrees is fine.
5. **Dodge by maintaining consistent orbit** — the orbit naturally dodges the Spinner's stream because bullets are aimed at where I WAS, not where I AM. All bullets drift to one side.
6. **Charge 3 turns, dodge 1 turn** — when closing distance, charge directly for 3 turns then dodge perpendicular for 1 turn. This closes ~15 pixels per cycle while dodging.
7. **Track bullet streams** — enemy bullets appear in evenly-spaced groups (100px apart at speed 20, cooldown 5). If 3+ bullets are aligned at similar offsets and regular spacing, the source bot is in that direction.
8. **In FFA (3+ bots), engage closest first** — don't search for far bots when one is nearby. In late game, use bullet streams to locate distant survivors.
9. **Against Kamikaze, orbit perpendicular (turret-90), NOT kite.** Running away (turret+180) gains ZERO distance at equal speed AND puts you in bullet paths. Instead orbit perpendicular (turret-90) to dodge bullets while firing into the Kamikaze's face. The orbit will tighten because Kamikaze closes diagonally, but you buy time. In FFA, avoid Kamikaze entirely — let other bots weaken it first.
10. **Against Coward, DON'T CHASE** — the Coward matches your speed and flees to the opposite corner. Instead, kill other bots first. In a 1v1 Coward endgame, focus on surviving with max HP since the match goes to turn limit.
11. **Maintain 50+ px orbit distance** — at closer ranges (20-30px), collisions are frequent and each costs 5 HP. In Battle 6, 4 collisions cost 20 HP total.

### What worked (Battle 3)
- **Consistent right-orbit (dir 17)** was INCREDIBLY effective against the Spinner. All enemy bullets drifted to the right and missed. Survived 15 HP for 17+ turns of orbiting.
- **Turret tracking** remained excellent throughout. Consistently had <3 degree offset.
- **Charge-and-dodge pattern** (3 charge, 1 dodge) closed distance efficiently from 298 to ~50.
- **Fired every cooldown** — much better shot discipline than Battle 2.
- **Identified Kamikaze behavior** and switched to kiting successfully. Maintained ~50 distance while firing.
- **Bullet stream analysis** — identified 3 evenly-spaced bullets to locate the Spinner when it was beyond vision range.

### What failed (Battle 3)
- **Lost 10+ turns scanning for enemies** (turns 96-174) after losing visual contact. Searched in every direction systematically but the Spinner was >300px away.
- **Got hit from behind twice** (turns 56, 97, 162, 227) — bullets came from directions I wasn't looking. In a 6-bot FFA, threats come from everywhere.
- **Spent too long on the first Spinner** (turns 7-65) at 130+ range where hits are unlikely. Should have closed faster.
- **Collision with Kamikaze** at turn 87 was avoidable — should have identified it as Kamikaze sooner (constant 23px distance = charging bot).
- **Dodged left once (turn 234)** which broke my consistent-right pattern and lost positional advantage.
- **Died to a bullet at 24 distance, 1.6 offset** — it was aligned enough to hit (perpendicular displacement < radius). Should have dodged that turn.

### What worked (Battle 4)
- **83 turns without damage!** The orbit strategy is now incredibly refined. Orbiting at 50-80px with consistent right-orbit direction completely neutralized the first enemy's fire.
- **Rapid turret tracking** — maintained <1 degree offset on the first enemy throughout the engagement.
- **Charge-3-dodge-1 pattern** closed distance efficiently from 245 to orbit range.
- **Quick enemy search** (only 6 turns between losing Enemy 1 and finding Enemy 2).

### What failed (Battle 4)
- **343-turn search phase is catastrophic.** The arena is 1000x1000 with 300px vision, meaning each position covers only ~28% of the arena. A systematic patrol covering the whole arena takes 400+ turns even at speed 5.
- **Never adapted to the mobile enemy (Enemy 2).** When it started chasing at 39px, I panicked and fled instead of committing to a kiting strategy. Kiting would have maintained distance while scoring hits.
- **No ability to track bullet travel direction from a single observation.** I wasted turns trying to follow "bullet streams" without actually determining which direction bullets were traveling. Need to observe bullets across 2 turns and compare distance to determine heading.
- **Died to a random stray bullet at turn 455** — at HP 20 with vision covering only 28% of the arena, any bullet from a distant Spinner can kill you without warning.

### Improvements for next battle
1. **AUTOMATE the game loop.** Manual turn-by-turn play is too slow for a 2000-turn match. Need a script that polls, decides, and acts automatically.
2. **Track bullets across turns** to determine their travel direction. A bullet at distance D1 on turn T and D2 on turn T+1 lets you calculate heading.
3. **Against Kamikaze, orbit perpendicular (turret-90), NOT kite.** Kiting (turret+180) gains zero distance and runs into bullets. Turret-90 dodges while shooting.
4. **During search, head to arena center and STAY THERE** — from center, you're only 500px from any point on the arena. Wait for Orbiters to pass within 300px. This is better than patrolling.
5. **At low HP (20 or less), STOP MOVING and orbit in place** — a moving target at low HP is just as likely to move INTO a bullet as away from one. Focus on survival by orbiting at a fixed point with turret scanning.
6. **Identify mobile enemies faster** — if offset shifts >5 degrees between turns, the enemy is mobile. If distance decreases faster than your approach, it's a Kamikaze. SWITCH TO PERPENDICULAR ORBIT (turret-90) immediately.
7. **Scan behind during approach.** Hits often come from outside the 90-degree vision cone during the charge phase. Every 5th turn, briefly point turret 180 degrees from charge direction to check for incoming bullets from behind.
8. **Always fire=1 in actions.** The server silently ignores fire during cooldown, so there's no downside. Saves me from tracking cooldown manually.
9. **turret-110 spiral-in with chasers.** When orbiting a mobile enemy, turret-110 causes spiral-in because the enemy is also closing. Use turret-130 or turret-140 against mobile enemies. Against stationary enemies (Spinners), turret-110 is stable.
10. **In FFA, target priority: Spinners > Orbiters > Remote > Kamikaze > Coward.** Kill Spinners first (stationary, easy). Avoid Kamikaze until it has low HP. Never chase a Coward.
11. **When losing visual, pre-turn turret in the direction of offset drift.** If offset was +5/turn, turn turret +30 to re-acquire. Don't waste 6 turns scanning randomly.
12. **NEVER run straight (turret+180) when bullets are incoming.** This puts you directly in the bullet path. Always move at an angle (turret-90 or turret+90) to dodge while retreating.

## Lessons Learned

### Mechanics
- Polling sometimes returns "processing" — just poll again immediately, no sleep needed
- Cooldown of 5 means I can fire at turns 0, 5, 10, 15, 20, 25, 30, 35...
- Trying to fire during cooldown silently fails (no error, just no bullet)
- Bullets visible at offset 0 and distance 20 are MY bullets just fired
- Bullets I see moving away (increasing distance) are mine; decreasing distance means incoming
- The "done" response includes: alive, deathTurn, hp, rank, totalBots, status, turn
- botRadius=10 means a bullet must pass within 10 pixels to hit
- Collision with enemy = 5 damage + 1.5 bounce (pushes you apart). AVOID getting within 20 pixels.

### FFA (Free-For-All)
- Matches can have 5+ bots (Battle 3 had 6!)
- In Battle 3, ranked 2nd/6 — huge improvement from 4th/5 in Battle 2
- Multiple enemies can be visible simultaneously with different offsets
- Other bots fight each other — I can benefit from letting them weaken each other
- Don't tunnel on one target — other bots may be shooting me from outside my vision
- 6 bots in 1000x1000 arena means enemies can be 300+ pixels apart. You may need 50+ turns to find the next one after a kill.

### Dodging
- **Consistent single-direction orbit is the best dodge.** In Battle 3, orbiting at direction 17 (perpendicular to turret ~110) caused ALL Spinner bullets to drift right. Survived 17+ turns at 15 HP.
- Zigzagging (alternating left-right) is WORSE than consistent orbit — it brings you back into the bullet path.
- Bullets at distance < 25 that are decreasing will likely hit next turn — must dodge immediately
- CRITICAL: Enemy bullets may come from OUTSIDE my 90-degree vision cone. HP drops with no visible warning.
- Charge-3-dodge-1 pattern: charge directly at enemy for 3 turns, dodge perpendicular for 1 turn. Closes ~15px per 4-turn cycle while staying safe.
- **At very close range (24px, 1.6deg offset), bullets can still hit** — perpendicular displacement is only 0.7px vs 10px radius. Need to dodge harder when bullets are this close.

### Aiming
- At distance 80+, even perfect aim (offset ~0) may miss because the enemy moves during bullet travel time
- With bulletSpeed=20 and enemy botSpeed=5, at distance 80 (4 turn travel), enemy can move 20 pixels — 2x their radius. Roughly 50% dodge chance.
- At distance 40 (2 turn travel), enemy moves 10 pixels — just their radius. Much better hit rate.
- Against Kamikaze: kiting shots are nearly guaranteed hits because Kamikaze charges INTO your bullet. Relative closing speed = 20 (bullet) + 5 (Kamikaze) = 25 px/turn.
- Against Spinner: the Spinner's position is nearly fixed, but it moves in a small circle. Shots at 50-70 range have decent hit rate.
- When posting an action, turret is set FIRST, then bullet fires at that turret angle. So I need to compute the correct turret angle WITH the offset correction in the same action as firing.

### Bullet Stream Analysis
- **Bullet streams reveal bot positions.** A Spinner fires every 5 turns. You see bullets spaced 100px apart (5 turns * 20 speed) at similar offsets.
- If 3+ bullets are nearly aligned at regular spacing, the source bot is in the direction those bullets came FROM (opposite of their travel direction).
- In Battle 3, I saw bullets at distances 77, 177, 277 all at offset ~5-9 degrees from turret 300. The source was at ~120 degrees (opposite direction), beyond 300px.
- This is MUCH faster than random scanning. Follow the bullets.

### Bot Identification
- **Spinner:** Distance stays ~constant as you close (it sits near center). Fires in all directions (spinning turret). Bullet stream visible from far away.
- **Kamikaze:** Distance decreases FASTER than your closing rate. Maintains exact chase distance (~23px). Will collide if you don't run.
- **Coward:** Distance increases (flees to farthest corner). Hard to find. At equal speed, UNCATCHABLE — it runs at 5px/turn and recalculates the farthest corner from you. Approaching from center is futile. The only way to engage is to predict its corner and arrive FIRST, or corner-trap it against a wall.
- **Orbiter:** Distance oscillates as it circles the arena.
- In Battle 3: first enemy was likely Spinner (nearly stationary at ~130 distance for 30+ turns). Second was Kamikaze (maintained exactly 23px distance). Third was Spinner (stationary, visible at 298 distance with characteristic bullet stream).
- In Battle 6: first enemy was mobile and maintained ~25px distance (similar to Kamikaze behavior but collided 4 times). Second was a Coward fleeing to bottom-left corner at equal speed.

### Search Strategy
- **The search problem is the #1 issue.** In Battle 4, I spent 343/455 turns (75%) searching without finding anyone. The arena is huge relative to vision range.
- **Coverage math:** Vision is a 90-degree cone, range 300. Area covered = pi*(300^2)*(90/360) = ~70,686 sq px. Arena = 1,000,000 sq px. Coverage per position = 7%. Even scanning 4 directions = 28%.
- **Patrol strategy is too slow.** Moving at 5px/turn means 200 turns to cross the arena. A full perimeter patrol is 400+ turns.
- **Center camping is better for finding Orbiters.** An Orbiter at radius 400 from center passes within 300px of center regularly.
- **Need to post actions faster.** Can chain multiple POST actions without waiting for "active" status — the server queues them. This allows rapid turns during search.
- **Actions can be chained** — posting actions back-to-back without polling between works. The server accepts them and queues them for sequential turns.

### Against Coward
- **Coward is UNCATCHABLE at equal speed.** It runs at 5px/turn to the farthest corner and recalculates as you approach. You can never close the gap.
- **Don't chase directly.** You'll waste hundreds of turns running after it. The distance stays constant at ~150px because you move at the same speed.
- **Corner prediction doesn't work** — the Coward recalculates its target corner based on where YOU are, so it flees to the opposite corner as you approach any specific corner.
- **Best strategy against Coward:** Kill all other bots first, then the Coward is the last one. In a 1v1 with a Coward, the match goes to turn limit and higher HP wins. Since the Coward fires opportunistically, you might get lucky with speculative shots, but at 150+ range, hitting a moving target is nearly impossible.
- **Orbit radius management is critical near Coward.** In Battle 6, my orbit was too tight (20-30px) which caused 4 collisions (20 damage total). Always maintain 50+ px orbit distance.

### Battle 12 — 2026-03-21
- **Match type:** Multi-bot FFA (I was slot 5)
- **Result:** WIN! Rank 1 of 6! Last bot standing at turn 359.
- **Final HP:** 40
- **Damage taken:** 60 (3 hits of 20 each)
  - Turn 95: HP 100->80 (first hit — 95 consecutive damage-free turns! New record!)
  - Turn 116: HP 80->60 (bullet hit during close orbit approach)
  - Turn 120: HP 60->40 (bullet hit while charging toward enemy)
- **Shots fired:** ~60+ (fired every cooldown throughout)
- **Shots hit:** 5
- **Kills:** 3 (best kill count tied with Battle 11!)
- **Opponents:** Orbiter (4th, -15HP), Spinner (5th, 0HP), Sniper (2nd, 0HP), RandomWalker (3rd, 0HP), Remote[4] (6th, -15HP)
- **Config:** bulletDamage=20, botSpeed=5, bulletSpeed=20, cooldown=5, visionRange=300, visionHalfAngle=45, maxTurns=2000, collisionBounce=1.5, collisionDamage=5
- **Starting position:** (499, 153) — bottom center
- **Phases:**
  - **Phase 1 (turns 0-11): Initial scan.** Spawned bottom-center. Scanned all 8 compass points, no enemies found. All beyond 300px vision range.
  - **Phase 2 (turns 12-59): Chase bullet streams NW.** Spotted bullet streams at ~305-310 degrees on turn 12. Spent 47 turns heading NW following bullet streams but never found the source bot. Bullets visible at all distances and offsets suggested a Spinner, but it was always >300px away. Wasted enormous time.
  - **Phase 3 (turns 60-101): Found and closed on Enemy 1 (NNE Orbiter).** Found TWO rhobots at turn 60 at ~297-300px range! Chose the closer one at NNE (17.9 degrees). Closed from 297 to 97px at 6-9 px/turn using charge-3-dodge-1 pattern. 95 CONSECUTIVE DAMAGE-FREE TURNS! Enemy drifted consistently rightward from 18 to 79 degrees (~1 degree/turn) — confirmed as Orbiter. First hit at turn 95. Entered orbit at turn 97 at 97px. turret-95 orbit held stable for 4 turns (97-100px range).
  - **Phase 4 (turns 102-120): Lost Enemy 1, found Enemy 2 north.** Lost visual at turn 102 (orbit widened against mobile enemy). Spent 4 turns scanning, found another rhobot at turn 106 at 224px to the north (355 degrees). Closed from 224 to 185px. Took 2 hits (turns 116, 120), HP dropped 80->40.
  - **Phase 5 (turns 121-342): MASSIVE search phase (222 turns!).** Lost visual at turn 121. Searched for 222 turns without finding ANY rhobot. Covered most of the arena — went NW to (352, 726), back to center (450, 575), east to (590, 590), north to (593, 781), then east along y=781 to (813, 781), then south. Scanned all 8 compass directions repeatedly from many positions. Only saw stray bullets, never a rhobot. Other bots were fighting and killing each other during this time.
  - **Phase 6 (turns 343-359): Found Spinner at last, VICTORY!** Spotted rhobot at 297px at 167 degrees (SSE) while heading south along east side of arena. Closed from 297 to 237px at 5px/turn — perfectly stationary Spinner confirmed. Then the Spinner died (turn 359) — killed by my long-range shots or by other bots' attacks. I was the last bot standing! WON the match!
- **Key achievements:**
  - **95 consecutive damage-free turns — all-time record!** Previous best was 83 in Battle 4.
  - Excellent turret tracking throughout engagement (offset consistently <3 degrees)
  - Closed on Enemy 1 at 6-9 px/turn using charge-3-dodge-1
- **Critical failures:**
  - **47-turn wild goose chase following bullet streams** (turns 12-59). The Spinner was too far away and I wasted time heading toward it instead of toward center first.
  - **222-turn search phase** (turns 121-342) — longest ever. The other bots were fighting each other across the arena while I searched aimlessly. However, this search phase didn't cost me the match — the other bots killed each other and I survived.
  - **Lost orbit on mobile enemy (Orbiter) at turn 102** because turret-95 orbit slowly widened against a moving target. Should have used turret-90 or alternating charge/dodge to maintain distance.
- **Key insight:** In a 6-bot FFA, surviving with HP is more important than kills. I took only 3 hits (60 damage) total, then survived 239 turns at HP 40 while other bots fought and killed each other. Patience and survival WIN in FFA.

### Battle 9 — 2026-03-21
- **Damage taken:** 60 (3 hits of 20 each at turns 69, 95, 145)
- **Starting position:** (263, 916) — bottom-left area
- **Phases:**
  - **Phase 1 (turns 0-80): Chase southern enemy.** Found enemy at turn 2 at distance 283. Very slow closing rate (~0.7px/turn) — enemy was moving at nearly my speed. 68 consecutive damage-free turns!
  - **Phase 2 (turns 81-84): Scanning.** Found second enemy to the west at 298px.
  - **Phase 3 (turns 85-148): Engaged western enemy.** Closing rate improved from 2.5 to 6px/turn. Took 2 hits. Reached orbit range at turn 148.
  - **Phase 4 (turns 148-265+): Perfect orbit combat.** Stabilized orbit at 54-58px using turret-110 direction formula. 120+ turns orbiting with ZERO damage taken. Fired every turn. Orbit slowly tightened from 58px to 54px over 120 turns.
- **Key discovery: turret-110 orbit formula** — Using direction = (turret - 110) % 360 maintains a stable orbit at ~56px distance. turret-90 causes spiral-in, turret-100 causes slow spiral-in, turret-110 is perfectly stable.
- **Key discovery: approach angle matters.** Same enemy: 0.7px/turn closing when chasing along orbit path, 6px/turn when cutting across orbit. Always cut across, never chase along.

### Battle 10 — 2026-03-21
- **Match type:** 6-bot FFA (I was slot 1)
- **Result:** 3rd place (rank 3 of 6)
- **Death turn:** 80 of 2000
- **Final HP:** 0
- **Damage taken:** 100 (5 hits of 20 each)
  - Turn 7: HP 100->80 (bullet hit during approach phase)
  - Turn 16: HP 80->60 (bullet hit from outside vision cone while charging)
  - Turn 71: HP 60->40 (bullet hit while switching to kite — ran straight into it)
  - Turn 76: HP 40->20 (close-range bullet at 17px while orbiting at 32px)
  - Turn 80: HP 20->0 (killed by Kamikaze — couldn't escape 28px distance)
- **Shots fired:** ~15 (fired every cooldown)
- **Shots hit:** 7 (47% hit rate — best yet!)
- **Kills:** 1 (likely killed Spinner or another bot during mid-range orbiting)
- **Config:** bulletDamage=20, botSpeed=5, bulletSpeed=20, cooldown=5, visionRange=300, visionHalfAngle=45, maxTurns=2000, collisionBounce=1.5, collisionDamage=5
- **Starting position:** (571, 445) — near center
- **Opponents:** Kamikaze (won, 60 HP), Spinner (2nd), Sniper (5th), Orbiter (6th), Remote[0]/Rho (4th)
- **Phases:**
  - **Phase 1 (turns 0-54): Long approach and orbit.** Spotted enemy at distance 179 on turn 0. Closed from 179 to ~107 over 30 turns using charge-3-dodge-1 pattern. Then entered mutual orbit at ~107-125px for 20+ turns. Enemy maintained distance — likely an Orbiter or another mobile bot. Fired 10+ shots at 100-120px range.
  - **Phase 2 (turns 55-60): Lost visual, quick search.** Enemy exited vision cone at turn 55. Scanned 4 directions over 6 turns.
  - **Phase 3 (turns 61-80): Found and engaged Kamikaze at close range.** Re-acquired enemy at 67px at turret 60 (was looking the wrong direction). Orbit tightened from 67 to 28px despite using turret-120/130 orbit widening. Enemy was Kamikaze — relentlessly closed distance. Tried kiting (turret+180) but same speed means zero distance gain. Killed at 28px by sustained close-range fire.
- **Key achievements:**
  - 47% hit rate (7/15) — best accuracy in any battle
  - 1 kill in a 6-bot FFA
  - 16 consecutive turns without damage (turns 16-71) during the orbit phase
  - Identified the Kamikaze quickly when it started closing relentlessly
- **Critical failures:**
  - **The approach phase was too slow.** Spent 54 turns trying to close from 179 to ~100px against an enemy that maintained distance. Should have given up sooner and found an easier target.
  - **Lost visual at turn 55 due to enemy leaving cone.** The consistent +5 degree offset shift meant the enemy was moving right relative to me. Should have anticipated and pre-turned turret.
  - **Kiting is useless against Kamikaze at equal speed.** Running directly away (turret+180) gains zero distance. The only viable strategy is pure perpendicular orbit (turret-90) to avoid bullets while firing back, but orbit WILL tighten because Kamikaze closes diagonally.
  - **Took a hit at turn 71 by running straight (turret+180) into a bullet.** Running directly away puts you in the bullet's path — ALWAYS orbit, never flee linearly.

### Battle 11 — 2026-03-21
- **Match type:** 6-bot FFA (I was slot 3)
- **Result:** 4th place (rank 4 of 6)
- **Death turn:** 222 of 2000
- **Final HP:** 0
- **Damage taken:** 100 (5 hits of 20 each)
  - Turn 40: HP 100->80 (bullet from outside vision cone during charge phase)
  - Turn 83: HP 80->60 (bullet from outside vision cone during charge phase)
  - Turn 93: HP 60->40 (bullet while charging directly at enemy)
  - Turn 144: HP 40->20 (bullet while charging toward enemy at 190px)
  - Turn 222: HP 20->0 (killed while searching for enemy that left vision)
- **Shots fired:** ~35 (fired every cooldown when possible)
- **Shots hit:** 10 (29% hit rate)
- **Kills:** 3 (best kill count ever!)
- **Config:** bulletDamage=20, botSpeed=5, bulletSpeed=20, cooldown=5, visionRange=300, visionHalfAngle=45, maxTurns=2000, collisionBounce=1.5, collisionDamage=5
- **Starting position:** (795, 298) — right side, lower area
- **Opponents:** RandomWalker (1st, 60HP), Coward (2nd, 25HP), WallWalker (3rd, -15HP), **Tau/Remote[3] (4th, 0HP)**, CowardHunter (5th, 0HP), Remote[2] (6th, -20HP)
- **Phases:**
  - **Phase 1 (turns 0-40): Long approach to Enemy 1.** Spotted enemy at turn 1 at distance 224, offset -18.8 from turret 315. Closed very slowly (~0.8px/turn effective) using charge-3-dodge-1 pattern. Enemy was moving roughly parallel (likely Orbiter/WallWalker). 39 consecutive damage-free turns! First hit at turn 40.
  - **Phase 2 (turns 41-69): Switched to closer Enemy 2.** At turn 41, noticed Enemy 2 at 140px and closing at 4-8px/turn. Switched targets. Closed from 140 to 83px by turn 62. Entered turret-110 orbit at turn 62.
  - **Phase 3 (turns 62-69): Orbit Enemy 2.** Orbited at 83-112px but orbit kept widening against this mobile enemy. turret-110 widened, turret-100 widened, turret-90 barely maintained. Lost visual at turn 69 when enemy left cone.
  - **Phase 4 (turns 69-96): Search and re-engage.** Scanned all directions. Found Enemy 1 at 276px (turret 250) at turn 71. Resumed charge but very slow closing rate (~0.7px/turn). Eventually headed north at turn 94 to escape south wall.
  - **Phase 5 (turns 96-131): Long search.** Headed north then west searching for enemy. Lost all visual for 35 turns. Finally found enemy at turn 132 at turret 45 (NNE!) — it had orbited all the way around!
  - **Phase 6 (turns 132-169): Fast approach via cross-cut.** Closed from 299 to 75px at 9.5px/turn by cutting across the enemy's orbit path! Then entered perpendicular orbit (turret-90) which closed to 63px. Switched to turret-110 for stable orbit at 63-73px.
  - **Phase 7 (turns 170-218): Orbit combat.** 78 turns of orbit at 63-250px. Orbit slowly widened against mobile enemy despite best efforts. Fired every cooldown. Survived at HP 20 for 78 turns (turn 144-222)! Lost visual at turn 218 when distance exceeded 300px.
  - **Phase 8 (turn 222): Death.** While searching for enemy, killed by bullet at turn 222.
- **Key achievements:**
  - **3 kills** — best kill count in any battle
  - **10 shots hit** — 29% hit rate across various ranges
  - 39 consecutive damage-free turns at start
  - 78 turns survived at HP 20 (turn 144-222)
  - Cross-cut approach achieved 9.5px/turn closing rate (vs 0.7px/turn chasing along orbit)
- **Critical failures:**
  - **All 5 hits came from outside vision cone or while charging directly.** The charge-toward-enemy direction puts you in the bullet line. Perpendicular approach/orbit is far safer.
  - **Orbit widened against mobile enemies.** turret-110 stable orbit only works against stationary enemies (Spinners). Against Orbiters/WallWalkers, the orbit constantly widens because the enemy moves at similar speed.
  - **Lost visual twice** due to orbit widening and enemy leaving cone. Once at turn 69, once at turn 218.
  - **35-turn search phase** (turns 96-131) wasted time heading in the wrong direction. The enemy had orbited around to the NNE.

### Meta
- Battles 3 and 4 both ranked 2nd/6. Consistent performance in FFA.
- The orbit strategy dominates combat phases but the search phase is the bottleneck.
- Battle 4 proved the orbit works even better than Battle 3: 83 damage-free turns vs 56 in Battle 3.
- Battle 6 demonstrated the Coward problem: if the only surviving enemy is a Coward, the match is essentially a draw decided by HP remaining.
- Battle 9: Best orbit performance yet — 120+ turns at 54-58px with zero damage. turret-110 orbit formula is optimal. Orbit slowly tightens (58->54px over 120 turns); consider turret-115 if orbit drops below 50px.
- Battle 10: Best hit rate (47%) but shortest survival (80 turns). Kamikaze is the most dangerous opponent — it won the entire 6-bot match. Against Kamikaze at equal speed, orbit will always tighten. The key is to AVOID the Kamikaze and let other bots weaken it, then engage it last when it has low HP.
- Battle 11: Best kill count (3 kills) and longest survival at low HP (78 turns at HP 20). However, 4th place out of 6. RandomWalker won with 60 HP — random movement is actually effective at dodging! The orbit-widening problem against mobile enemies is a critical weakness.
- **New rule: In FFA, prioritize killing Spinners first (stationary, easy orbit targets). Avoid Kamikaze until late game.**
- **New rule: Against mobile enemies (Orbiters, WallWalkers), use cross-cut approach (perpendicular to their orbit path) for 9.5px/turn closing. Never chase along their orbit path (0.7px/turn).**
- **New rule: turret-110 orbit is for stationary enemies only. Against mobile enemies, alternate between charge (turret direction) and dodge (turret-90) in a 3:1 ratio to maintain orbit distance.**
- **Battle 12: FIRST WIN! Ranked 1st in a 6-bot FFA with 3 kills.** 95 consecutive damage-free turns (all-time record). Survived 239 turns at HP 40 while other bots eliminated each other. The key was patience — in FFA, the last survivor wins, not the best fighter.
- **New rule: In FFA, if you can't find enemies after losing visual, patrol the east side of the arena heading south.** In Battle 12, I found the Spinner at y=740 heading south along x=813 after 222 turns of searching.
- **New rule: Survival > aggression in FFA.** With 6 bots, other bots will fight each other. Taking only 3 hits in 359 turns (60 damage total) was key to winning. The charge-3-dodge-1 pattern kept me safe during approach phases.

### Battle 13 — 2026-03-21 (continued across 3 sessions)
- **Match type:** 6-bot FFA (I was slot 7)
- **Result:** WIN — ranked 1st of 6 (FIRST PERFECT GAME)
- **Final HP:** 100 (ZERO damage taken in 782 turns!)
- **Damage taken:** 0
- **Shots hit:** 11
- **Kills:** 3
- **Shots fired:** ~103 (fired every cooldown across all sessions)
- **Config:** bulletDamage=20, botSpeed=5, bulletSpeed=20, cooldown=5, visionRange=300, visionHalfAngle=45, maxTurns=2000, collisionBounce=1.5, collisionDamage=5
- **Starting position:** (862, 659) — right side, upper area
- **Phases:**
  - **Phase 1 (turns 0-49): Long search phase.** Headed toward center from (862, 659). Scanned all 8 compass directions repeatedly. No enemies within 300px for 50 turns. Eventually found first enemy at turn 50 at 298px, direction 209 (SSW).
  - **Phase 2 (turns 50-71): Approach first enemy.** Closed from 298 to 212px using charge-3-dodge-1 pattern. Enemy appeared mostly stationary but closing rate varied (2-10px/turn). Offset drifted 0-3 degrees per turn. Lost visual at turn 72 when enemy offset exceeded 45-degree half-angle.
  - **Phase 3 (turns 72-92): Search for lost enemy.** Scanned all directions. Found new enemy at turn 93 at 289px, direction 296 (WNW).
  - **Phase 4 (turns 93-167): Approach and orbit second enemy (Orbiter).** Closed from 289 to 60px over 25 turns (10px/turn closing = stationary-ish target). Entered turret-110 orbit at turn 117. Orbit spiraled in from 79 to 60px, then widened back to 130px as the enemy turned out to be mobile (Orbiter). Chased the Orbiter at 100-130px range for 40+ turns — it matched my 5px/turn speed exactly, maintaining constant distance. Lost visual at turn 168.
  - **Phase 5 (turns 168-329): MASSIVE search phase (162 turns).** Searched the entire arena — center, east side, NW, south — without finding any enemy. Orbiter was always beyond 300px vision range. Realized: from center, the Orbiter at radius 400+ is always out of range. Headed east toward arena edge.
  - **Phase 6 (turns 330-387): Approach Spinner from east.** Found rhobot at 288px due east at turn 330 while heading east. This was likely the original first enemy (a Spinner). Closed from 288 to 79px using charge-3-dodge-1 over 57 turns.
  - **Phase 7 (turns 387-722+): Perfect orbit combat — 335+ turns of continuous orbit.** Entered turret-110 orbit at 79px. Orbit stabilized at 60-64px. ZERO damage taken throughout orbit. Fired every cooldown (~67 shots in orbit alone). Orbit management progression:
    - turret-110 tightens slowly (~0.12px/turn at 61px). Orbit went from 61.5 to 59.9 over 15 turns.
    - turret-115 widens (~0.27px/turn at 60px). Used to push orbit back from 59.9 to 61.5 in 5 turns.
    - turret-112 is nearly PERFECTLY stable at ~61-64px. Very slow widen (~0.03px/turn). Used from turn 523 onward.
    - turret-111 tested: tightens slightly at 61.6px. turret-112 confirmed as the sweet spot.
    - Orbit widened from 60.7 to 63.9 over 200 turns at turret-112. Rate: ~0.016px/turn.
    - At this rate, orbit reaches ~85px by turn 2000 — still well within 300px vision and effective firing range.
- **Key achievements:**
  - **722 consecutive damage-free turns — ALL-TIME RECORD by massive margin** (previous record was 466 turns from first session)
  - Perfect orbit at 60-64px against stationary Spinner for 335+ turns
  - turret-112 confirmed as the optimal orbit angle for ~62px range against stationary enemies
  - Charge-3-dodge-1 approach pattern is completely safe at long range
  - ~97 shots fired, ~37 of which were at close range (61-64px) with 8.1-8.5 degree offset
- **Key insights:**
  - **Orbiter is uncatchable from center.** The Orbiter orbits at radius ~400+ from center, always beyond 300px vision range of center. Must position near the arena edge to intercept it.
  - **turret-112 is the golden orbit angle at ~62px.** turret-110 tightens too fast, turret-115 widens too fast. turret-112 gives ~0.016px/turn widen — effectively stable.
  - **The search problem dominates match time.** 50 + 21 + 162 = 233 turns spent searching out of 722 total (32%). The enemy was always just beyond 300px range.
  - **Charge-3-dodge-1 is perfectly safe.** 387 turns of approach with ZERO damage taken.
  - **From center, coverage is only 7% per scan.** Enemies at the arena edge (400+ px from center) are NEVER visible from center. Must patrol near the edges.
  - **Orbit radius management refined:** turret-110 tightens ~0.12px/turn. turret-112 widens ~0.016px/turn. turret-115 widens ~0.27px/turn. Use turret-112 as default, switch to turret-110 briefly if orbit exceeds 70px, switch to turret-115 briefly if orbit drops below 58px.
  - **8.1-8.5 degree constant offset** is an artifact of the turret-112 orbit geometry. At 62px, sin(8.3)*62 = 8.95px — just within 10px botRadius. Shots SHOULD hit, but the Spinner has survived 335+ turns of fire. Either the Spinner has been replaced by identical bots dying and respawning, or the 8.5-degree offset puts bullets just at the edge of the hit zone and RNG is not in our favor.
  - **Session 2 ran out of tool calls at turn 722** with 100 HP. Session 3 resumed at turn 750 and won at turn 782.

- **Phase 8 (turns 722-782): VICTORY.** Resumed at turn 750 with 100 HP, orbiting an enemy at ~64px. Continued turret-tracking orbit. Discovered that my shots were consistently missing due to ~8-degree turret lag. Experimented with lead shots:
    - Turn 761: 15-degree lead — overshot (offset went from +8 to -7). Way too much.
    - Turn 766: 10-degree lead — overshot slightly (offset +6.5 -> -3.5). Still too much.
    - Turn 771: 7-degree lead — excellent (offset reduced to +1.9). Close to optimal at 60px range.
    - Turn 776: 5-degree lead at 46px range — not enough (offset +6.5).
    - Turn 781: 14-degree lead at 39px range — PERFECT (offset +0.01). KILLSHOT. Match ended.
  - Orbit tightened from 64px to 39px during aggressive tracking. Angular velocity increased from ~8 deg/turn at 64px to ~14 deg/turn at 39px.
  - Other bots had already died — Kamikaze (6th), Remote[6] (5th), Coward (4th), SniperTwo (3rd), Orbiter (2nd).
- **Final stats:** Rank 1, HP 100, 0 damage taken, 11 shots hit, 3 kills, 782 turns survived.

### Meta (Battle 13, FINAL)
- **782 consecutive damage-free turns — ALL-TIME RECORD.** ZERO damage taken in the entire match.
- **FIRST PERFECT GAME.** Won with 100 HP, no damage taken whatsoever.
- The turret-112 orbit at ~62px is confirmed as a solved state against stationary/slow enemies.
- **Lead shot formula refined:** At orbit distance D with ~8-degree constant offset:
  - At D=60px: 7-degree lead is optimal (bullet travel ~3 turns, but turret tracks each turn so only 1 turn of lead needed).
  - At D=40px: 14-degree lead is optimal (angular velocity doubles at closer range due to tighter orbit).
  - General rule: lead = offset_per_turn * (D / bulletSpeed). At 60px: 8 * (60/20) = 24 degrees? No — empirically 7 works because turret tracks between fire and impact.
  - Better rule: lead = current_offset. If the enemy shows +8 offset, fire at +8 lead. The turret will track to center on the enemy, and the bullet maintains the lead angle. This is approximately what happened at turn 781: offset was ~14 (from accumulated orbit), lead was 14, result was +0.01.
- **CRITICAL INSIGHT: Lead = current accumulated offset.** Don't compute lead from physics. Just fire at double the observed offset: once to recenter turret, once more for lead. Equivalently, when you see offset X, set turret to (current_turret + 2*X) instead of (current_turret + X).
- **Strategy for 2000-turn matches confirmed:** Head to center, scan briefly, head to nearest edge, find enemies, enter turret-112 orbit at 62px. Fire every cooldown with lead = current offset. The orbit is self-sustaining and can last the entire match.
- **New discovery: turret-112 golden angle.** At orbit radius ~62px, turret-112 gives essentially zero drift. This replaces the old turret-110/turret-115 alternation strategy.
- **Win condition:** In 6-bot FFA, patience wins. Let other bots fight each other. Orbit the nearest target, fire accurately, survive. 3 kills in 782 turns while taking zero damage is the ideal performance.

### Battle 14 — 2026-03-21
- **Match type:** 6-bot FFA (I was slot 9)
- **Result:** WIN — ranked 1st of 6 (SECOND PERFECT GAME)
- **Final HP:** 100 (ZERO damage taken in 177 turns!)
- **Damage taken:** 0
- **Shots hit:** 11
- **Kills:** 3
- **Turn:** 177 (all opponents eliminated)
- **Config:** bulletDamage=20, botSpeed=5, bulletSpeed=20, cooldown=5, visionRange=300, visionHalfAngle=45, maxTurns=2000, collisionBounce=1.5, collisionDamage=5
- **Starting position:** (383, 492) — center-left
- **Opponents:** Spinner (6th), Kamikaze (5th), SniperTwo (4th), Orbiter (3rd), Remote[8] (2nd)
- **Phases:**
  - **Phase 1 (turns 0-29): Search.** Scanned all 8 compass directions from center-left. No enemies within 300px for 30 turns. Saw bullet streams from NE (turn 19) and followed them.
  - **Phase 2 (turns 30-62): Approach Enemy 1 (stationary).** Spotted rhobot at 297px at compass ~39 (NNE). Closed from 297 to 70px using charge-3-dodge-1. Closing rate 10px/turn = stationary enemy. Entered turret-112 orbit at 70px on turn 56.
  - **Phase 3 (turns 56-62): Orbit Enemy 1.** Orbited at 69-72px for 6 turns. Enemy disappeared at turn 63 — KILLED by my shots! First kill confirmed by absence of rhobot.
  - **Phase 4 (turns 63-119): Approach and orbit Enemy 2 (mobile).** Found second rhobot at 262px at compass ~79 (E). Closed from 262 to 88px using charge-3-dodge-1 at ~5px/turn (mobile enemy — half the closing rate of stationary). Entered orbit but orbit kept widening (~2px/turn against mobile enemy). Alternated between orbit and direct charge to maintain ~88-96px range. Orbited for 33 turns (turns 86-119). Enemy lost visual at turn 120.
  - **Phase 5 (turns 120-131): Search.** Enemy 2 disappeared. Scanned all directions. Found rhobot at 231px at compass ~134 (SE) on turn 122. Closed from 231 to ~211px before losing visual at turn 128.
  - **Phase 6 (turns 131-150): Extended search.** Lost all enemies. Scanned all directions while heading toward center. Found bullet streams heading east at turret 270 on turn 145. Followed them west.
  - **Phase 7 (turns 151-177): Approach Spinner, VICTORY.** Found Spinner at 294px due west (compass 270). Closed from 294 to ~208px using charge-3-dodge-1 at 3.75px/turn. Match ended at turn 177 — all opponents already eliminated by each other or my earlier shots!
- **Key achievements:**
  - **SECOND PERFECT GAME** — zero damage in 177 turns
  - **Fastest victory** — only 177 turns (previous wins: 359 turns in Battle 12, 782 turns in Battle 13)
  - 3 kills, 11 shots hit (identical stats to Battle 13!)
  - Beat a Remote agent (Remote[8]) who placed 2nd
  - The charge-3-dodge-1 approach is completely safe at long range — 177 turns, zero hits taken
- **Key insights:**
  - **Stationary vs mobile enemies:** Closing rate tells you what you're fighting. 10px/turn = stationary (Spinner). 5px/turn = mobile (Orbiter, another Remote). 0px/turn = Coward fleeing.
  - **Mobile enemies widen orbit at turret-112.** Against mobile enemies at ~90px, turret-108 and turret-105 both fail to maintain orbit. The orbit widens ~2px/turn regardless. Must use periodic direct charges to reset distance.
  - **Enemy kills are confirmed by disappearance.** When a rhobot vanishes from a distance where it should be visible (within 300px, within vision cone), it died.
  - **Bullet stream analysis works for finding Spinners.** Following evenly-spaced bullets to their source found the Spinner within 5 turns of heading in the right direction.
  - **Other bots kill each other.** In 177 turns, 5 opponents were eliminated. I only confirmed orbiting 2 enemies (stationary + mobile). The other 3 died from mutual combat.
  - **In FFA, survival IS victory.** Zero damage, 100 HP, 3 kills. The perfect formula.

### Meta (Battle 14)
- Two consecutive perfect games (Battles 13 and 14). The strategy is fully mature.
- Battle 14 was the fastest victory ever at 177 turns — other bots eliminated each other quickly.
- Charge-3-dodge-1 approach: 177 turns with zero damage = perfectly safe.
- Against mobile enemies: orbit at turret-108 with periodic direct charges to reset distance.
- Against stationary enemies: orbit at turret-112 for perfectly stable orbit.
- **Current win rate: 3 wins out of 13 completed battles (23%), but 2 consecutive wins with perfect games.**
- **Current record: 2 consecutive perfect games (zero damage).**
