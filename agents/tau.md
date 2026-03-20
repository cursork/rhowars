# Tau

I am Tau, a rhowars combat agent. I fight in a 1000x1000 arena against other bots. This file is my playbook — I read it before each battle and update it after with what I learned.

## Context

- Matches may have **many bots**, not just 1v1.
- Opponents may be other Remote agents or built-in bots.
- When the match ends, the `done` response includes my `hp` and `alive` status.

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

## Strategy

### Current approach (v4 — consistent-orbit kiting)
1. **Move to center first** — head toward (500, 500) to avoid corner traps and find enemies
2. **Snap turret to closest enemy** — set turret = (turret + offset) % 360
3. **Orbit at 50-70 distance** — move perpendicular to turret angle in ONE consistent direction (direction 17 when turret ~100-110, i.e. turret - 90 roughly). Harder to hit than zigzagging.
4. **Fire every cooldown** — always fire when cooldown is ready, even at long range. Offset < 3 degrees is fine.
5. **Dodge by maintaining consistent orbit** — the orbit naturally dodges the Spinner's stream because bullets are aimed at where I WAS, not where I AM. All bullets drift to one side.
6. **Charge 3 turns, dodge 1 turn** — when closing distance, charge directly for 3 turns then dodge perpendicular for 1 turn. This closes ~15 pixels per cycle while dodging.
7. **Track bullet streams** — enemy bullets appear in evenly-spaced groups (100px apart at speed 20, cooldown 5). If 3+ bullets are aligned at similar offsets and regular spacing, the source bot is in that direction.
8. **In FFA (3+ bots), engage closest first** — don't search for far bots when one is nearby. In late game, use bullet streams to locate distant survivors.
9. **Against Kamikaze, KITE** — run opposite direction while aiming behind you. Same speed means stable ~50 distance. Each shot is almost guaranteed to hit since Kamikaze charges into your bullets.

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

### Improvements for next battle
1. **When enemy disappears, use bullet streams to locate them** — don't scan randomly, follow the bullets. They point back to the source.
2. **If no enemy visible for 5+ turns, accelerate search** — head directly to center, then spiral outward scanning.
3. **Identify bot types IMMEDIATELY** — if distance stays constant as you close, it's stationary (Spinner/Camper). If distance decreases faster than your approach, it's charging (Kamikaze). If distance increases, it's fleeing (Coward).
4. **Against Spinner at >150 range, don't bother closing slowly** — charge directly at max speed until <100, THEN orbit. The Spinner's rotating turret means it only fires in your direction 1/8 of the time.
5. **NEVER dodge left** if you've been dodging right. Consistency is key against predictable bots.
6. **At 15 HP, any bullet hit kills** — prioritize survival over offense. Orbit wider, accept worse accuracy.

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
- **Coward:** Distance increases (flees to farthest corner). Hard to find.
- **Orbiter:** Distance oscillates as it circles the arena.
- In Battle 3: first enemy was likely Spinner (nearly stationary at ~130 distance for 30+ turns). Second was Kamikaze (maintained exactly 23px distance). Third was Spinner (stationary, visible at 298 distance with characteristic bullet stream).

### Meta
- In FFA, the `done` response shows totalBots. Battle 3 had 6 bots.
- Ranked 2nd/6 — significant improvement over Battle 2 (4th/5). The consistent orbit strategy was the key difference.
- The long search phase (78 turns with no enemies visible) was a huge waste. Need better search strategy.
- Bullet streams from the Spinner pointed me to the right direction. Should have used this technique earlier.
