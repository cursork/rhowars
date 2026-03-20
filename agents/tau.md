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

## Strategy

### Current approach (v3 — circle-and-shoot)
1. **Move to center first** — head toward (500, 500) to avoid corner traps and see more bots
2. **Snap turret to closest enemy** — set turret = (turret + offset) % 360
3. **Circle at 60-80 distance** — move perpendicular to turret angle to orbit the enemy. Harder to hit than straight-line approach
4. **Fire ONLY when offset < 5 degrees AND cooldown ready** — compute turret adjustment before firing in the same action
5. **Zigzag unpredictably** — alternate circling direction every 2-3 turns (not every turn — too predictable)
6. **Dodge bullets aggressively** — if bullet distance < 40 and appears to be incoming (wasn't there last turn), make 90-degree direction change
7. **Never charge straight at an enemy** — collision damage (5) + being easy to hit is too costly
8. **In FFA (3+ bots), stay on the edge of fights** — let other bots damage each other, then engage the weakened survivor

### What worked (Battle 2)
- Turret tracking remained excellent — consistently had enemy within 1-5 degrees offset during approach
- Closed distance effectively (250 to 35 in ~30 turns)
- Identified multiple enemies and tracked them

### What failed (Battle 2)
- **Took invisible hits** — enemy bullets came from outside my 90-degree vision cone. I never saw them until HP dropped.
- **Closed too aggressively** — went from 50 to 28 distance and collided, taking 25 HP in one turn (bullet + collision)
- **Erratic circling** — constantly changing direction between 6 different headings confused my own tracking more than the enemy's aim
- **Wasted early shots** — fired at distance 160 and 113 which likely missed entirely
- **Only fired 4 times in 42 turns** — cooldown 5 means I could have fired 8 times. Wasted potential.
- **Never confirmed any hits** — no way to tell if bullets landed without seeing enemy HP drop

### Improvements for next battle
1. **Fire earlier and more often** — even at 150+ distance, fire to apply pressure. Don't wait for perfect range.
2. **Keep distance at 50-80** — close enough for 2.5-4 turn bullet travel, far enough to avoid collision.
3. **When circling, alternate direction every 3 turns** — not every turn, and not randomly.
4. **Track bullet approach** — compare visible bullets between turns. If a bullet's distance DECREASED, it's incoming.
5. **In FFA, don't tunnel on one target** — periodically sweep turret to check for threats from other bots.
6. **Avoid moving directly toward the enemy** — always move at least 30 degrees off the turret angle.

## Lessons Learned

### Mechanics
- `./rh` sometimes returns "processing" — just poll again immediately, no sleep needed
- Cooldown of 5 means I can fire at turns 0, 5, 10, 15, 20, 25, 30, 35...
- Trying to fire during cooldown silently fails (no error, just no bullet)
- Bullets visible at offset 0 and distance 20 are MY bullets just fired
- Bullets I see moving away (increasing distance) are mine; decreasing distance means incoming
- The "done" response includes: alive, deathTurn, hp, rank, totalBots, status, turn
- botRadius=10 means a bullet must pass within 10 pixels to hit
- Collision with enemy = 5 damage + 1.5 bounce (pushes you apart). AVOID getting within 20 pixels.

### FFA (Free-For-All)
- Matches can have 5+ bots, not just 1v1
- In Battle 2, ranked 4th/5 — died at turn 42 of a 2000-turn match
- Multiple enemies can be visible simultaneously with different offsets
- Other bots fight each other — I can benefit from letting them weaken each other
- Don't tunnel on one target — other bots may be shooting me from outside my vision

### Dodging
- Bullets at distance < 25 that are decreasing will likely hit next turn — must dodge immediately
- My zigzag at 5 pixels per turn (botSpeed=5) wasn't enough displacement to reliably dodge
- Need larger direction changes (90+ degree turns) and less predictable patterns
- CRITICAL: Enemy bullets may come from OUTSIDE my 90-degree vision cone. HP drops with no visible warning.
- Consider stopping (speed=0) occasionally — if the enemy leads their shots, stopping can cause misses

### Aiming
- At distance 80+, even perfect aim (offset ~0) may miss because the enemy moves during bullet travel time
- With bulletSpeed=20 and enemy botSpeed=5, at distance 80 (4 turn travel), enemy can move 20 pixels — 2x their radius. Roughly 50% dodge chance.
- At distance 40 (2 turn travel), enemy moves 10 pixels — just their radius. Much better hit rate.
- Lead distance = (enemy_speed * distance) / bullet_speed = (5 * 80) / 20 = 20 pixels at distance 80
- When posting an action, turret is set FIRST, then bullet fires at that turret angle. So I need to compute the correct turret angle WITH the offset correction in the same action as firing.

### Meta
- In FFA, figure out how many bots there are (totalBots in done response). If visible count < total-1, bots are behind me.
- Identify opponent types: Spinner stays near center + spins turret. Camper sits in corner. Kamikaze charges. Coward flees. Orbiter circles.
- In Battle 2, the enemy I tracked seemed nearly stationary (offset drifted slowly, distance decreased linearly as I approached). Could have been Spinner or Camper.
- The bot that kept hitting me was likely someone else I never saw (outside my vision cone).
