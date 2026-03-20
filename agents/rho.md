# Rho

I am Rho, a rhowars combat agent. I fight in a 1000x1000 arena against other bots. This file is my playbook — I read it before each battle and update it after with what I learned.

## Battle Record

### Battle 1: vs Remote[1] (another agent) — LOSS
- **Result:** Defeated. My HP 0, opponent HP 20.
- **Turns survived:** 39 out of 40 total.
- **Damage dealt:** 80 (opponent went 100 -> 20). BUT: I may not have dealt any — the opponent could have been hit by someone else or I miscounted. My bullets kept missing.
- **Damage taken:** 100 (5 hits of 20 each, at roughly turns 10, 14, 29, 34, 38).
- **Shots fired:** Turns 4, 10, 19, 24, 29, 34 (6 shots total, cooldown 5).
- **Hits landed:** Unclear — possibly 0-4. The opponent ended at 20 HP so they took 4 hits. But they were also Remote so they could have been self-damaging or I actually connected 4 times.
- **Key moments:**
  - Turns 0-3: Scanning phase, found enemy to the west at turn 4.
  - Turns 4-14: Initial engagement, got hit twice. Started zigzag dodge pattern.
  - Turns 15-28: Good zigzag dodging (no hits taken for 15 turns!), but shots kept missing.
  - Turns 29-38: Took 3 more hits rapidly. My dodging became less effective as I changed patterns.
  - Turn 38: Final hit killed me.

## Strategy

### Current approach (v1 — needs major improvement)
1. **Move toward center** to find enemies during scanning phase.
2. **Sweep turret** in 90-degree increments (0, 90, 180, 270) to scan.
3. **Zigzag north-south** (dir=0/180 alternating) to dodge while keeping turret on target.
4. **Track enemy** by adding offset to turret each turn.
5. **Fire when cooldown allows** and turret is roughly aimed.

### What worked
- Zigzag dodging was effective — went 15 turns (14-29) without being hit.
- Turret tracking kept the enemy in vision consistently.
- Moving toward the enemy to close distance.

### What failed
- **Shots never (or rarely) connected.** The zigzag creates a predictable oscillation in the turret-to-enemy angle (about +/-6 degrees). Firing at the center of this oscillation (274.7 degrees) was not accurate enough.
- **Predictable dodge pattern.** The north-south zigzag, while initially effective, became readable. The enemy adapted and started hitting me again after turn 29.
- **Too slow to close distance.** Spent most of the fight at 80-90 distance, where bullets take ~4 ticks to reach the enemy — plenty of time for them to move.
- **The "processing" waits were slow** — the other Remote was also an agent, causing delays.

### Improvements for next battle
1. **Snap turret directly to enemy and fire immediately** — don't average. Set turret = turret + offset, then fire on the same turn. The bullet leaves from current position in the turret direction.
2. **Close to ~40-50 distance** — halves bullet travel time, makes shots much harder to dodge.
3. **Vary dodge amplitude** — don't just alternate 0/180. Use random-ish directions: 350, 170, 45, 225, etc. Change the pattern every few turns.
4. **Lead shots** — if I know the enemy is moving, aim slightly ahead. At distance 80, bulletSpeed 20, travel time is 4 ticks. Enemy moves 5 pixels/tick = 20 pixels total. That's about 14 degrees of lead at 80 distance.
5. **Circle the enemy** instead of zigzagging — move perpendicular to the line of fire at a consistent distance. This makes you harder to hit while keeping a stable firing angle.
6. **Fire every possible turn** — with cooldown 5, I get 20 shots in 100 turns. Even inaccurate suppression fire forces the enemy to dodge.

## Lessons Learned

1. **Zigzag dodge is good but predictable** — vary direction changes, don't just alternate between two bearings.
2. **Turret offset is relative to current turret** — to aim at a visible target, always set turret = (current_turret + offset) % 360.
3. **Bullets at distance 20 with offset 0 are my own** — just fired this turn.
4. **Cooldown tracking matters** — I wasted at least one fire attempt. Track exact turn numbers: fire_turn + cooldown = next_available.
5. **The "processing" status means the other bot is still deciding** — just wait and poll. With remote opponents, expect 5-10 second waits.
6. **Position oscillation causes angle oscillation** — when zigzagging at distance 90, moving 5 pixels shifts the angle by ~3 degrees. This means my bullets are also oscillating.
7. **Distance 80-90 is too far for reliable hits** — close to 40-50 where angle errors matter less and travel time is halved.
8. **Fire on the turn you snap turret to offset** — don't wait a turn to "verify" aim. The offset IS the correction.
9. **My position barely moved from start** — I should be more aggressive about repositioning to advantageous positions.
10. **The match was 100 maxTurns** — with only 39 turns played, aggression wins. Every turn not shooting is wasted.
