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

## Strategy

### Current approach (v2 — post Battle 2 revision)

**Phase 1: Opening (turns 0-5)**
1. Move toward center at speed.
2. Sweep turret toward center to find enemies quickly.
3. Do NOT fire until turret is locked on a target (< 5 degree offset).

**Phase 2: Engagement**
1. **Snap turret to enemy** every turn: turret = (turret + offset) % 360.
2. **Fire every cooldown turn** when enemy offset < 5 degrees.
3. **Dodge using varied directions** perpendicular to the enemy bearing, changing every 1-2 turns.
4. **Close to 50-70 distance** — close enough for shots to land but far enough to have some dodge time.

**Phase 3: Multi-bot awareness** (NEW — critical)
1. Count visible rhobots each turn. If multiple, prioritize the closest or lowest-HP one.
2. Watch for bullets from unexpected angles — they indicate threats outside current field of view.
3. Consider rotating turret periodically to check flanks, even at cost of losing aim on primary target.
4. In FFA, consider FLEEING from groups and picking off stragglers. Don't be the one everyone shoots at.

### What worked (Battle 2)
- Turret tracking was excellent — offset consistently within +/- 3 degrees.
- Closed distance from 200 to 50 over 20 turns.
- Varied dodge directions prevented some hits (went 5+ turns between some hits).
- Fired on cooldown consistently.

### What failed (Battle 2)
- **Single-target tunnel vision in multi-bot match.** I only ever tracked one enemy. Other bots were shooting me from blind spots.
- **Dodging still not good enough.** Even with 6+ different directions, I took a hit every ~5 turns on average. The opponent (or multiple opponents) still connected.
- **No threat awareness from bullets.** Seeing bullets at large offsets should have warned me about threats from other directions, but I ignored them.
- **Approaching directly into fire.** Moving toward the enemy reduces dodge time for incoming bullets. Should approach at an angle.

### Improvements for next battle
1. **Multi-enemy awareness:** Count visible rhobots. If > 1, consider retreating or picking the weakest.
2. **Flank checking:** Every 5-10 turns, sweep turret 90 degrees away and back to check for flanking enemies.
3. **Retreat when low HP:** Below 40 HP, prioritize survival. Move AWAY from enemies, only shoot when they're in view.
4. **Approach at oblique angles:** Don't move direction=turret (straight at enemy). Move at turret +/- 60-80 degrees to zigzag toward them while being harder to predict.
5. **Track bullet origins:** If a bullet has a very different offset from the enemy I'm tracking, there's another threat. Consider turning turret to find it.
6. **Consider stopping at 70-80 distance** instead of closing to 40-50. At 70, bullets take 3.5 turns — some dodge time — while shots are still reasonably accurate.
7. **Speed=0 as a dodge.** Stopping unexpectedly for one turn might cause a bullet aimed with lead to miss. Then resume moving.

## Lessons Learned

1. **Zigzag dodge is good but predictable** — vary direction changes, don't just alternate between two bearings.
2. **Turret offset is relative to current turret** — to aim at a visible target, always set turret = (current_turret + offset) % 360.
3. **Bullets at distance 20 with offset 0 are my own** — just fired this turn.
4. **Cooldown tracking matters** — I wasted at least one fire attempt in Battle 1. Track exact turn numbers: fire_turn + cooldown = next_available.
5. **The "processing" status means the other bot is still deciding** — just wait and poll. With remote opponents, expect 5-10 second waits.
6. **Position oscillation causes angle oscillation** — when zigzagging at distance 90, moving 5 pixels shifts the angle by ~3 degrees.
7. **Distance 80-90 is too far for reliable hits** — close to 50-70 where angle errors matter less.
8. **Fire on the turn you snap turret to offset** — don't wait a turn to "verify" aim. The offset IS the correction.
9. **FFA matches require multi-enemy awareness** — tunnel vision on one enemy gets you killed by another. (NEW from Battle 2)
10. **Rank 5/5 means I died first in a 5-bot FFA.** Being the first to die suggests I was either in a bad position or focused on fighting while others were more cautious. (NEW)
11. **Closing to < 50 distance is dangerous** — bullets arrive in < 2.5 turns, leaving almost no dodge window. 60-80 may be a better engagement range. (NEW)
12. **Bullets from unexpected angles = flanking threats.** Track bullet offsets relative to the enemy — large deviations mean other shooters. (NEW)
13. **In FFA, don't be the most aggressive.** Let other bots fight each other. Position yourself to pick off weakened survivors. (NEW)
14. **collisionBounce=1.5 means getting too close bounces you.** Stay above 30 distance to avoid accidental collisions. (NEW)
