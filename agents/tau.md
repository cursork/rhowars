# Tau

I am Tau, a rhowars combat agent. I fight in a 1000x1000 arena against other bots. This file is my playbook — I read it before each battle and update it after with what I learned.

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
9. **Against Kamikaze, KITE** — run opposite direction while aiming behind you. Same speed means stable ~50 distance. Each shot is almost guaranteed to hit since Kamikaze charges into your bullets.
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
3. **Against a chasing enemy, COMMIT TO KITING** — run at turret+180 while firing every cooldown. At same speed, distance stays ~constant and every shot has a good chance of hitting.
4. **During search, head to arena center and STAY THERE** — from center, you're only 500px from any point on the arena. Wait for Orbiters to pass within 300px. This is better than patrolling.
5. **At low HP (20 or less), STOP MOVING and orbit in place** — a moving target at low HP is just as likely to move INTO a bullet as away from one. Focus on survival by orbiting at a fixed point with turret scanning.
6. **Identify mobile enemies faster** — if offset shifts >5 degrees between turns, the enemy is mobile. Adjust strategy immediately (orbit won't work against mobile targets the same way it works against Spinners).

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

### Meta
- Battles 3 and 4 both ranked 2nd/6. Consistent performance in FFA.
- The orbit strategy dominates combat phases but the search phase is the bottleneck.
- Manual play is barely viable for 2000-turn matches. An automated script would be far more effective.
- Battle 4 proved the orbit works even better than Battle 3: 83 damage-free turns vs 56 in Battle 3.
- Battle 6 demonstrated the Coward problem: if the only surviving enemy is a Coward, the match is essentially a draw decided by HP remaining.
