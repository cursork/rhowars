# Tau

I am Tau, a rhowars combat agent. I fight in a 1000x1000 arena against other bots. This file is my playbook — I read it before each battle and update it after with what I learned.

## Battle Record

### Battle 1 — 2026-03-20
- **Opponent:** Unknown (slot 0) — possibly another Remote or a built-in bot
- **Result:** LOSS (killed at turn 39 of 100)
- **My final HP:** 0 (was 20 at turn 38, died turn 39)
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

## Strategy

### Current approach (v1 - needs improvement)
1. **Snap turret to enemy on first sight** — set turret = turret + offset
2. **Zigzag while advancing** — alternate between NE/NW or N/S directions each turn
3. **Fire when cooldown is ready** — aim turret precisely (add offset) then fire
4. **Try to close distance** — shorter distance means bullets arrive faster, harder to dodge

### What worked
- Turret tracking was solid — I consistently had the enemy within 1-7 degrees offset
- Zigzag movement kept me alive for 39 turns (survived about 8 enemy volleys, only got hit by 4)
- Never lost sight of the enemy throughout the match

### What failed
- **My shots probably all missed** — at 80-115 distance, bullets take 4-6 turns to arrive. The enemy has plenty of time to move 20-30 pixels and dodge. Bot radius is only 10.
- **Zigzag pattern was too predictable** — N/S oscillation at constant distance means the enemy can predict my position
- **Never checked if the other bot had a pattern I could exploit** — e.g., Spinner moves to center and spins, I could lead my shots
- **Distance never closed below ~75** — I zigzagged laterally instead of actually approaching

### Improvements for next battle
1. **Lead shots** — Don't aim where the enemy IS, aim where they WILL BE. If enemy is moving, offset the turret by a few degrees in their direction of travel.
2. **Close distance aggressively** — Move mostly TOWARD the enemy (direction ~= turret angle) with only slight perpendicular zigzag. At distance 40, bullets arrive in 2 turns, much harder to dodge.
3. **Track enemy movement** — Compare enemy offset between turns to determine if they're moving clockwise or counterclockwise relative to me. Use this to lead shots.
4. **When a close bullet is detected (distance < 30), make a SHARP perpendicular turn** — not a gentle zigzag. Move 90 degrees from the bullet's approach direction.
5. **Fire only when offset < 2 degrees** — Don't waste cooldown on poor aim.
6. **Consider circling at medium range (60-80)** — Harder target than straight-line approach.

## Lessons Learned

### Mechanics
- `./rh` sometimes returns "processing" and requires 5-10 seconds of waiting before the state is ready
- Cooldown of 5 means I can fire at turns 0, 5, 10, 15, 20, 25, 30, 35...
- Trying to fire during cooldown silently fails (no error, just no bullet)
- Bullets visible at offset 0 and distance 20 are MY bullets just fired
- Bullets I see moving away (increasing distance) are mine; decreasing distance means incoming
- The "done" status response is minimal — no winner info in the polling endpoint
- botRadius=10 means a bullet must pass within 10 pixels to hit

### Timing
- The enemy bot (slot 0) was slow to respond — "processing" delays of 5-10 seconds suggest it was also a Remote bot (possibly another AI agent or human)
- With 100-turn max, I need to be more aggressive to kill the enemy before time runs out

### Dodging
- Bullets at distance < 25 that are decreasing will likely hit next turn — must dodge immediately
- My N/S zigzag at 5 pixels per turn (botSpeed=5) wasn't enough displacement to reliably dodge
- Need larger direction changes (90+ degree turns) and less predictable patterns
- Consider stopping (speed=0) occasionally — if the enemy leads their shots, stopping can cause misses

### Aiming
- At distance 80+, even perfect aim (offset ~0) may miss because the enemy moves during bullet travel time
- With bulletSpeed=20 and enemy botSpeed=5, at distance 80 (4 turn travel), enemy can move 20 pixels — 2x their radius. Roughly 50% dodge chance.
- At distance 40 (2 turn travel), enemy moves 10 pixels — just their radius. Much better hit rate.
- Lead distance = (enemy_speed * distance) / bullet_speed = (5 * 80) / 20 = 20 pixels at distance 80

### Meta
- I should figure out WHO my opponent is. The behavior pattern (staying at ~80-100 distance, hitting me every ~10 turns) could match Spinner, Camper, or another Remote.
- Next time check if enemy distance stays constant (orbiting/stationary) or changes (approaching/fleeing) to identify the opponent type.
