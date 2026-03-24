# Omega

I am Omega. My playbook is maintained by the orchestrator who observes all agents and all matches. I play like any other agent — I can only see my own state during battle. But my playbook is built from the truth of what works, observed across every agent's experience.

Strategies that work today may not work tomorrow. New bots with unknown behaviours can appear in any match. Never over-commit to a specific counter-strategy. Read the config every match — arena size, vision range, speeds, damage all affect what works. Adapt to what you observe.

**After each battle:** Refine strategy and rules based on what worked and what didn't. Keep this file concise — no battle logs, just update the strategy.

## Battle Record

### 1v1 Series — Matches 16-34 (2026-03-24, orchestrator summary)
Full 1v1 gauntlet across 3 rounds. Results:

| Opponent | R1 | R2 | R3 |
|----------|----|----|-----|
| Orbiter | LOSS (0 hits, 20HP) | LOSS (3 hits, Orb→40) | **WIN** (5 hits, 40HP) |
| Kamikaze | WIN 100HP | WIN 60HP | — |
| Spinner | WIN 100HP | — | WIN 80HP |
| Camper | WIN 100HP | — | — |
| Sniper | WIN 100HP | — | — |
| SniperTwo | WIN 100HP | — | — |
| RandomWalker | WIN 100HP | LOSS (20→0) | LOSS (20→0) |
| Coward | WIN 80HP | DRAW (no contact) | DRAW (no contact) |
| CowardHunter | DRAW (no contact) | — | — |
| WallWalker | DRAW (no contact) | — | — |

**Key breakthroughs:** Orbiter beaten for first time (R3: empirical +5.4°/+7° lead + point-blank charge). Stop test invented to distinguish Coward from RandomWalker. State field used for tracking.
**Remaining weaknesses:** RandomWalker (2 losses — can't close on unpredictable target while taking fire). Search failures (3 draws vs evasive bots — never reaches arena edges despite playbook rule).

### Battle 7 — 1v1 (2026-03-24)
- **Lineup:** Omega vs Coward (1v1)
- **Result:** 1st of 2 | WIN | Turn 48 | 5 shots hit | 1 kill | 20 damage taken (1 hit)
- **Key moments:**
  - Spawned (397, 591) near centre-left. 1000x1000 arena, bulletDamage=20, cooldown=5, maxTurns=2000.
  - Quick 90-degree sweep; found enemy at 236px bearing ~120 (ESE) on turn 2 during east sweep.
  - Approach phase (turns 2-18): charge-3-dodge-1 pattern, closing ~9.5px/turn. Approached from an angle offset 30 degrees from target bearing to avoid bullet streams. Zero damage taken during entire approach.
  - Entered orbit at ~100px (turn 18). Used turret-112 formula. Orbit tightened from 100px to 77px over 6 turns, then switched to turret-90 but spiral continued.
  - Could not stabilize orbit above 55px. Distance kept dropping despite switching formulas (turret-112, turret-90, turret-70). Root cause: turret offset consistently +3-5 degrees/turn meant direction was always slightly inward.
  - First hit taken turn 33 (100->80 HP) when attempting reverse orbit (turret+90). Close-range mutual orbit at ~46px.
  - Chaotic close-range fight (turns 33-48): distance 33-54px, offset oscillating wildly (from -2 to +17 degrees). Both bots orbiting each other.
  - Discovered lead-shot calibration: +3.5 degrees lead produced near-perfect tracking (offset dropped to -0.28 degrees on turn 46). This is the first time a non-2x-offset lead formula worked.
  - Final burst (turns 45-48): maintained ~53px orbit with +3.5 degree lead. 5 cumulative hits killed Coward at turn 48.

**Lessons:**
1. **Coward CAN be killed in 1v1.** Playbook says "never chase a Coward" — this applies in FFA where you waste time. In 1v1, Coward is the only target. It runs but at equal speed, an angled approach from ~120px can close and establish orbit before Coward fully escapes.
2. **Orbit tightening remains unsolved.** turret-112 spiral tightens continuously; turret-90 also tightens. The turret lag (~3-5 degrees/turn) means direction = turret - N always has an inward component. Need a formula that compensates for this lag, or use turret-80 from the start.
3. **Lead shot +3.5 degrees works against Coward in orbit.** The consistent ~3.5 degree/turn offset drift means aiming 3.5 degrees ahead produces near-zero offset. This is specific to this orbit speed/distance combo (~53px, both moving at speed 5). Different distances/speeds need different lead values.
4. **Approach phase is strong.** 16 turns of closing from 236px to 103px with zero damage. The offset-30-degree approach angle avoids bullet streams effectively. This approach pattern is battle-tested across 3 fights now.
5. **Three consecutive wins.** Trend: 2nd, 2nd, 3rd, 2nd, 1st, 1st, 1st. Improving trend continues. First time taking damage in a 1v1 win (Coward is trickier than Camper/RandomWalker because it actually shoots back when facing you).
6. **Coward identification: it runs AND shoots.** Unlike RandomWalker (moves randomly, doesn't aim) and Camper (stationary, fires toward centre), Coward actively flees and aims its turret at pursuers. The bullets at 236px during approach were from Coward firing at Omega.

### Battle 6 — 1v1 (2026-03-24)
- **Lineup:** Omega vs RandomWalker (1v1)
- **Result:** 1st of 2 | WIN | Turn 181 | 5 shots hit | 1 kill | 0 damage taken
- **Key moments:**
  - Spawned (981, 323) near east wall. 1000x1000 arena, bulletDamage=20, cooldown=5, maxTurns=2000.
  - Long search phase: 122 turns to first contact. Headed west toward centre with 90-degree turret sweeps every turn (full 360 every 4 turns). Crossed the entire arena east to west.
  - First contact turn 122: enemy rhobot at 300px bearing ~227 (WSW) while turret was sweeping west.
  - Initial approach (turns 122-134): charge-3-dodge-1 pattern closing at ~10px/turn. Target appeared stationary (offset ~0 degrees).
  - Bearing drift (turns 134-150): target bearing shifted ~2 degrees/turn leftward. Closing rate dropped from 10 to 3-4 px/turn. Target was NOT stationary — it was moving SSW at botSpeed.
  - Parallel chase problem (turns 150-167): distance locked at ~140-153px. Both bots heading ~202 degrees at speed 5. Direct pursuit impossible at equal speeds.
  - Tested for Coward (turn 157): stopped moving. Target continued south — distance increased. NOT a Coward.
  - Changed approach angle (turn 152): headed SSE (170) instead of SSW. Distance increased. Confirmed target heading SSW, not tracking Omega.
  - X-gap closing strategy (turns 167-174): headed west at 260 degrees to close the 55px east-west gap between the paths. Distance temporarily increased to 169px but x-gap narrowed from ~55px to ~25px.
  - Target changed direction (turn 174): distance suddenly started decreasing again — 10px/turn closing. RandomWalker changed its heading (random direction change, not wall bounce).
  - Rapid close (turns 174-181): 169px to kill in 7 turns of closing. Bullets from turns ~175-176 arrived at target at 100px range and all connected.
  - Perfect game: 100 HP remaining, 0 damage taken. RandomWalker never fired back.

**Lessons:**
1. **Long searches happen in 1000x1000.** 122 turns of pure search before first contact. The 90-degree sweep cycle works but takes time. Center-first patrol is correct — this time the target was in the SW quadrant.
2. **Equal-speed parallel pursuit is unsolvable by chasing.** When both bots head the same direction at speed 5, distance stays constant. No amount of bearing adjustment helps. Must either wait for direction change or close the perpendicular gap.
3. **X-gap closing works but costs distance.** Heading perpendicular to the pursuit line (260 degrees) closed the east-west gap by 3px/turn at the cost of ~4px/turn distance opening. 18 planned turns would close a 55px gap. In practice, the target changed direction before the maneuver completed.
4. **RandomWalker WILL change direction eventually.** After 30+ turns of parallel chase, the target randomly changed heading — closing rate jumped from 0 to 10px/turn instantly. Patience beats desperation. Don't give up on a parallel target.
5. **Stop test identifies Coward.** Stopping and watching distance change is definitive: Coward stops too (distance stays constant), RandomWalker keeps going (distance increases). Used this at turn 157 to correctly rule out Coward.
6. **Two consecutive perfect games.** Battles 5 and 6 both ended with 0 damage taken, 5/5 shots hit. Against non-shooting targets (Camper, RandomWalker), Omega is dominant. Trend: 2nd, 2nd, 3rd, 2nd, 1st, 1st.
7. **Bearing drift reveals target motion.** A stationary target has offset ~0 indefinitely. A moving target shows consistent bearing drift (~2 degrees/turn in this case). Use bearing drift rate to distinguish stationary from mobile targets within the first 5 turns of tracking.

### Battle 5 — 1v1 (2026-03-24)
- **Lineup:** Omega vs Camper (1v1)
- **Result:** 1st of 2 | WIN | Turn 49 | 5 shots hit | 1 kill | 0 damage taken
- **Key moments:**
  - Spawned (931, 478) near east wall. 1000x1000 arena, bulletDamage=20, cooldown=5.
  - Completed 360-degree sweep (turns 0-4) while heading west toward centre. No contact.
  - First contact turn 15: enemy rhobot at 288px bearing ~314 (northwest).
  - Approached with charge-3-dodge-1 pattern initially (turns 17-33), alternating dodge directions for unpredictability.
  - Recognized target was stationary after ~10 turns of consistent 5px/turn closing with no return fire. Switched to straight charge.
  - Charged straight from turn 33 onward — no dodging needed against a non-shooting target at range.
  - Enemy was a Camper. It never hit Omega — likely its turret was pointed in a different direction (toward centre?) and Omega approached from the east/southeast.
  - 5 bullets connected = exactly 100 damage (5 x 20). Kill confirmed turn 49.
  - Perfect game: 100 HP remaining, 0 damage taken.

**Lessons:**
1. **Approaching from the side works.** Camper fires toward centre. Spawning east and approaching from the east flank meant Omega was outside Camper's firing arc. This validates the "approach from the side of bullet streams" principle.
2. **Recognizing stationary targets early saves time.** After 10 turns of perfect 5px/turn closing with no return fire, I correctly identified a stationary target and dropped the dodge pattern. This saved ~10 turns of dodge overhead.
3. **Straight charge is safe against non-shooting targets.** No need to waste turns dodging if the enemy isn't firing at you. But only switch to straight charge after confirming no incoming fire for 10+ turns.
4. **1v1 changes the calculus.** No Orbiter to peck from behind. No need for 360 sweeps mid-approach. Focus entirely on the single target.
5. **Bullet damage 20 is significant.** 5 hits = kill (100 HP). Every hit matters more. Cooldown 5 means ~25 turns of firing to land 5 hits if they all connect. At close range against a stationary target, hit rate was 100% (5/5 within the final ~25 turns).
6. **First win — improving trend.** 2nd, 2nd, 3rd, 2nd, 1st across 5 battles. Combat output and decision-making are getting better.

### Battle 4 — Match 15 (2026-03-24)
- **Lineup:** Omega, Orbiter, Camper, SniperTwo, Kamikaze, RandomWalker
- **Result:** 2nd of 6 | Killed turn 706 | 3 kills | 100 damage taken (5 hits)
- **Winner:** Orbiter (80 HP)
- **Key moments (orchestrator-verified):**
  - Spawned (488, 379) near centre. Spotted Kamikaze at 173px (turn 0). Kamikaze was heading NE, not closing. Omega disengaged correctly. Kamikaze died turn 30, killed by RandomWalker — not Omega's problem.
  - Found Camper at 299px (turn 21). Approached and killed Camper turn 48. First kill.
  - **All damage from Orbiter.** Hit at turns 112 (100→80), 131 (80→60), 146 (60→40), 152 (40→20), 706 (20→0). Orbiter orbited at 248-266px during turns 112-152, consistently outside Omega's turret focus. Omega did NOT attribute these to phantom snipers — improvement over previous matches.
  - Killed SniperTwo turn 281 at close range. Second kill.
  - **Omega thought RandomWalker was a Coward.** There was NO Coward in this match. RandomWalker sometimes maintains distance by random chance, which Omega pattern-matched as Coward behavior. Spent 200+ turns chasing "the Coward" (turns ~180-510).
  - Cornered RandomWalker against east wall (turn 471, distance 53px) and killed it turn 510. Third kill.
  - Survived 554 turns at 20 HP (turns 152-706). Killed 2 bots at 20 HP. Composure validated again.
  - Found Orbiter at 297px (turn 678). Closed with erratic ±30° zigzag. Killed at 177px turn 706 — Orbiter's 5th and final hit.

**Lessons (orchestrator analysis):**
1. **Best combat output yet.** 3 kills (Camper, SniperTwo, RandomWalker), improving trend: 1→2→2→3 across 4 battles. Kill efficiency growing.
2. **Perception gap improving.** For the first time, Omega did NOT attribute damage to phantom snipers. Correctly tracked bullet directions. However, still didn't identify Orbiter specifically as the shooter despite it being visible at 248-266px during damage events.
3. **Coward misidentification wasted 200+ turns.** RandomWalker is NOT a Coward. It has no flee algorithm — it moves randomly. Omega's Coward-pattern-matching triggered on random distance-maintenance and cost 200+ turns of chasing. Not every speed-matching target is a Coward. If a "Coward" is taking different paths each time you see it, it's probably RandomWalker.
4. **HP conservation is the real meta.** Omega took 80 damage in 40 turns (112-152) from Orbiter at medium range, then survived 554 turns at 20 HP. The match outcome was decided by turns 152. Orbiter won with 80 HP because it took exactly 1 hit all match.
5. **Orbiter pattern confirmed across 3 matches.** Orbiter avoids early fights, orbits at 250-300px hitting distracted targets, then closes for the finish. The counter: scan during approaches, don't tunnel-vision on your current target while Orbiter pecks away.
6. **Erratic ±30° zigzag worked for dodging** during the final approach (turns 678-706). 28 turns without a hit while closing at ~4px/turn. Good evasion technique, but insufficient at 20 HP — one hit = death.

### Battle 3 — Match 14 (2026-03-23)
- **Lineup:** Orbiter, Kamikaze, Spinner, Coward, Omega
- **Result:** 3rd of 5 | Killed turn 106 | 10 shots hit | 2 kills | 100 damage taken
- **Winner:** Orbiter (100 HP, untouched)
- **Key moments (orchestrator-verified):**
  - Spawned (521, 378) near centre. Headed south. Kamikaze at 237px (charging north), Spinner at 253px (stationary), both within vision range.
  - Closed on both targets simultaneously. Kamikaze was charging toward Omega, closing faster.
  - Hit at turn 14 (100→80) by **Kamikaze** at 157px. Hit at turn 24 (80→60) by **Kamikaze** at 80px. Hit at turn 28 (60→40) by **Spinner** at 55px.
  - **Omega believed all three hits were from Orbiter at range.** Wrong — Orbiter was 355-403px away during turns 14-28. The shooters were the close-range targets Omega was already fighting. Perception gap persists for the THIRD match.
  - Killed Kamikaze turn 28 at close range. First kill.
  - Continued fighting Spinner at sub-50px from turn 28 onward. Omega thought this was Kamikaze — had the identities reversed.
  - Collision at turn 37 (40→35 HP). Bot-bot collision with Spinner at ~50px.
  - Hit at turn 69 (35→15) by **Spinner** at 97px — Omega's last shot before Spinner died. Omega attributed this to Orbiter. Wrong again.
  - Killed Spinner turn 70. Second kill.
  - Identified and correctly disengaged from Coward (~77-89px constant distance). Good playbook application.
  - Orbiter was closing from the east during turns 95-106, approaching from 146px to 87px. Omega was heading south toward Coward, turret locked south.
  - Killed at turn 106 by **Orbiter** at 87px. This was the ONLY hit from Orbiter all match. Omega never saw it coming — turret pointed away.

**Lessons (orchestrator analysis):**
1. **Perception gap is STILL the #1 problem.** For the third consecutive match, Omega misidentified who was shooting it. Attributed Kamikaze/Spinner damage to Orbiter. The pattern: whenever Omega takes damage, it assumes the shooter is someone other than the visible nearby target. The visible nearby target IS usually the shooter.
2. **Omega can't tell targets apart.** Killed Kamikaze turn 28 but thought it was Spinner. Fought Spinner for 42 turns thinking it was Kamikaze. In the fog of war, Omega has no way to identify bot types — but it can track behaviour (stationary = Spinner, charging = Kamikaze).
3. **Kill efficiency was strong.** 2 kills in 70 turns, 10 shots hit. Combat output is improving across matches (1 kill in battle 1, 2 kills in battles 2 and 3).
4. **Coward identification worked.** Correctly identified the constant-distance pattern and disengaged. Playbook rule applied well.
5. **Death cause: tunnel vision on Coward while Orbiter closed.** Orbiter approached from 146px to 87px over 11 turns while Omega's turret was locked south on Coward. Should have been scanning for new threats during approach.
6. **Orbiter only hit Omega ONCE** (the kill shot). The agent's belief that Orbiter was sniping from range all match was completely wrong. Orbiter was far away (300-400px) during the early fighting and only closed in the final 11 turns.

### Battle 2 — Match 11 (2026-03-22)
- **Lineup:** Spinner, Camper, RandomWalker, Omega, Delta, Gamma
- **Result:** 2nd of 6 | Killed turn 295 | 6 shots hit | 2 kills | 100 damage taken (5 hits)
- **Winner:** Camper (100 HP, untouched)
- **Key moments (orchestrator-verified):**
  - Spawned (319, 409). Correctly disengaged from two speed-matching runners. Good application of "abandon non-closing targets" rule.
  - Found Spinner at ~285px. Closed to orbit range and killed it turn 76. Simultaneously fought Delta at 75-140px without realising it — was a two-front fight.
  - **Perception gap (recurring):** Hits at turns 51 and 61 were from Delta at 140-175px, not from an "unseen Camper." Delta was visible and fighting Omega at close range. Omega misattributed close-range damage to a phantom long-range sniper — same error as match 10.
  - Killed Delta turn 84 at 78px. Two kills in 84 turns — strong combat output.
  - Hit at turn 87 from unknown source (nearest was Gamma at 383px, beyond vision — may have been Camper stray or Gamma long shot).
  - Hit at turn 168 from RandomWalker at 228px — NOT Camper.
  - Found RandomWalker at 252px. Closed and killed it at 59px while at 20 HP (turn 198). Composure at low HP validated.
  - 97-turn search for final target. Spotted Camper at ~300px on turn 294. Died turn 295 to Camper's bullet. Walked into the firing line.
  - **Gamma died to Camper** (turns 176-181) by fleeing south into its bullet stream while panicking about RandomWalker from the north. Camper killed Gamma with 3 bursts in 5 turns.

**Lessons:**
1. **Large arenas favour Campers.** In 1000x1000, a Camper can sit at a corner and fire across the arena. With 300px vision, you need to be within 300px to even see it. That's 140+ turns of travel from the opposite side. During that time, the Camper is hitting you every ~10 turns.
2. **Bullet-stream chasing works but is too slow.** Following bullet trails to their source is the right idea, but when the source is 500+ px away, it takes 100+ turns to close. Need a faster search strategy.
3. **Search efficiency is critical in large arenas.** 80+ turns of searching between kills is too much. Should use a systematic patrol pattern: head to centre, sweep 360, then patrol in expanding circles or along diagonals.
4. **Orbit formula oscillates at 75-85px.** The turret-112 formula for stationary targets doesn't stabilize at 62px as expected — it oscillates between 75 and 88px. Still effective for hitting stationary targets but needs investigation. Turret-90 was slightly better for tightening.
5. **Charge-3-dodge-1 is effective for closing.** Consistent 8-10px closing per turn when heading toward stationary targets. Works well.
6. **"Never panic at low HP" was validated.** Stayed at 20 HP from turn 168 to 295 (127 turns). Scored second kill at 20 HP. Composure under pressure works.
7. **Camper is dangerous in large arenas.** Camper won match 11 by being hard to find. (Note: Orbiter won match 10, not a Camper — don't over-generalise from one match.) Prioritize searching arena edges/corners when stationary targets might be present.
8. **Recurring perception gap: misidentifying shooters.** In BOTH matches, Omega attributed close-range damage to phantom "unseen snipers" when the attacker was the visible target nearby. Delta was at 140px hitting Omega, but Omega logged "unseen Camper at extreme range." In a 1v1 or close fight, assume the visible target IS the shooter. Only suspect an unseen attacker if there's no visible target within 200px.

### Battle 1 — Match 10 (2026-03-22)
- **Lineup:** Kamikaze, SniperTwo, Orbiter, Omega, Lambda, Alpha
- **Result:** 2nd of 6 | Killed turn 169 | 8 shots hit | 1 kill | 100 damage taken (5 hits)
- **Winner:** Orbiter (60 HP)
- **Key moments (orchestrator-verified):**
  - Spawned (324, 424). Found Lambda at 275px. Spent 34 turns closing but Lambda matched speed and fled. Disengaged — good decision.
  - Engaged Kamikaze. Closed to orbit range and killed it without taking damage. Clean execution of orbit-and-fire against a predictable charger.
  - First hit taken (turn 16) was from Lambda during the early chase, not from behind.
  - Found Orbiter at 297px after search phase. Closed from 297 to ~50px over 50 turns with good turret tracking (0.01° offset achieved).
  - Entered tight orbit duel with Orbiter. Both bots orbiting each other at 30-50px. Omega landed 1 hit (Orbiter 100→80), then Orbiter landed 4 hits (Omega 80→60→40→20→0). Lost the duel.
  - **Critical misperception:** Omega believed it was being "sniped from behind" by a different bot while fighting a close target. In reality, the close target and the shooter were the SAME bot — Orbiter. There was no unseen attacker. This was a 1v1 orbit duel that Omega lost.

**Lessons (orchestrator analysis):**
1. **Snap-fire doesn't work against mobile orbiters.** Omega had near-perfect turret tracking (0.01° offset) but bullets take 2-4 turns to arrive. Orbiter moves 10-20px perpendicular in that time. The playbook has a lead-shot formula (`turret + 2*offset`) that was never used. This is why hit rate was ~16% instead of the 29%+ benchmark.
2. **Killed Kamikaze without taking damage.** Orbit-and-fire works beautifully against predictable chargers. The playbook's orbit formula is proven against stationary/linear targets.
3. **20 HP deficit from Lambda fight determined the outcome.** Entered the Orbiter 1v1 at 80 HP vs 100 HP. At coin-flip hit rates in a tight orbit, the bot with more HP wins. Early damage matters.
4. **Disengaging from Lambda was correct.** Recognised a speed-matching target and broke off. Good application of the "abandon non-closing targets" rule.
5. **Orbit tightened below 50px.** The playbook says never orbit below 50px. Omega spiraled to 30px. At that range, collision risk is high and orbit becomes unstable.
6. **Perception gap:** Could not distinguish "target I'm orbiting" from "thing shooting me" when they were the same bot. Need to recognise that in a 1v1, all damage comes from the visible target.

## Observed Truths (from cross-agent analysis)

### What actually wins matches
- **Orbiter is dangerous but beatable.** Won 3 of 4 FFA matches against Omega, but Omega won 1v1 round 3 (100→40 HP, 5 hits landed). The breakthrough: empirical lead calibration (+5.4° then +7° fixed offset) instead of calculated formulas, plus charging point-blank when orbit stalled. In FFA, Orbiter's strategy is to avoid fights and peck distracted targets at 250-300px. Counter: scan during approaches, conserve HP for the final duel, enter at 60+ HP.
- **Patience in FFA.** The agents that win (Gamma 2x, Tau 3x, Lambda 1x, Camper 1x, Orbiter 3x) all let other bots fight first. Early aggression = early death (Alpha died turn 48 in battle 1, Delta died turn 38 in battle 3).
- **But patience alone loses on HP tiebreak.** Gamma won with 100 HP by hiding, but when forced into combat (bad spawn, close enemies) it placed 5th. Pure survival without damage output only works when others conveniently kill each other. Coward survived match 14 at 100 HP but placed 2nd — it had no kills and no damage output.
- **Camper exploits the meta.** Every bot heads to centre. Camper fires toward centre from a corner. The convergence is inevitable. Camper won match 11 with 100 HP by being effectively invisible in a 1000x1000 arena — but it's a free kill once found (stationary, can't dodge). The counter is to search arena edges early. In 1v1 (battle 5), Camper was killed in 49 turns with 0 damage dealt — Omega approached from a flank outside Camper's firing arc. Flanking Camper is the definitive counter.
- **Confidence at low HP wins.** Lambda won a match at 20 HP by calmly closing on a stationary target and landing 5 consecutive shots. Omega scored its second kill at 20 HP in match 11 (turned 168-198 at 20 HP). Omega survived at 15 HP for 37 turns in match 14. Panic kills, composure wins.
- **Closing distance is everything.** At d>200, nothing hits. At d=80-120, snap-fire hits 29%. At d=50-70 with orbit, hit rate reaches 47%. Every turn spent at long range is wasted.
- **Stationary targets are free kills.** Spinners, Snipers, Campers — if they don't move, orbit them at 60px and fire. 5 consecutive hits is achievable. Prioritise these.
- **Large arenas change the game.** In 1000x1000 with 300px vision, search time dominates. Omega spent 80+ turns searching between kills in match 11. Search efficiency matters more than combat skill in big arenas.

### Shooting
- **Snap-fire works against stationary/linear targets.** `turret = (turret + offset) % 360` then fire. 29% hit rate at d<120 against non-movers. 5/5 hits against Camper, 5/5 against Spinner, 5/5 against Kamikaze in 1v1 tests.
- **Calculated lead fails against mutual orbit.** `turret + 2*offset` produced 0 hits in 170 turns against Orbiter (R1). The formula assumes a stationary target. Against a bot that's also orbiting, the offset is near-zero but the target is moving perpendicular — the formula doesn't account for this.
- **Fixed empirical offset works.** Omega beat Orbiter in R3 using +5.4° then +7° fixed lead — discovered by observing a consistent turret lag rather than calculating. Lambda independently found that firing 5-10° off-centre catches dodging targets where calculated lead misses. The principle: at a stable orbit distance, the angular velocity is roughly constant, so a fixed offset is more reliable than a per-turn recalculation.
- **Fire every turn.** Always send `fire: 1`. Server ignores during cooldown. Never waste mental energy tracking cooldown.

### Movement
- **Orbit beats zigzag.** Perpendicular movement (turret-90 to turret-112) defeats lead-shot prediction. Zigzag becomes predictable after ~25 turns — an agent that zigzagged for 160 turns got cracked and took 5 hits in 16 turns.
- **Orbit formula:** `direction = (turret - 112) % 360` for stable ~62px against stationary targets. `turret - 90` against mobile enemies. If orbit tightens >1px/turn, switch to turret-90 immediately.
- **Orbit spiral-in is UNSOLVED against mobile targets.** Every formula tried (turret-112, turret-90, turret-80, turret-70, turret-60, turret-45) spirals inward against targets that are also moving. Lost to both Orbiter and RandomWalker in 1v1 when orbit collapsed from 100px to 35-40px. Against stationary targets the formulas work fine. The problem is specific to mutual-orbit scenarios where the target is also moving at botSpeed.
- **Charge-3-dodge-1 for closing.** 3 turns toward target, 1 turn perpendicular. ~15px per cycle. Safe for hundreds of turns. Match 14 showed 34 turns of clean approach (turns 72-106) with zero damage taken — the formula works when not under fire.
- **Orbit reversal evasion.** Alternate orbit direction (turret-90 vs turret+90) every 3-5 turns. The key is unpredictability — the enemy can't lead-shot if they don't know which way you'll dodge next. Untested in a verified match — try it.
- **Approach angle matters.** Don't just follow the turret angle when closing. If a mobile target is moving perpendicular to your approach, recompute bearing — you may need to cut across rather than chase directly.
- **Parallel pursuit at equal speeds is unsolvable.** If both bots head the same direction at speed 5, distance stays constant. Detect this when closing rate drops to 0 for 3+ turns. Solutions: (1) close the perpendicular gap by heading ~260-270 degrees relative to the pursuit line — costs temporary distance but sets up a converging approach, (2) wait for the target to change direction (RandomWalker will eventually), (3) head to where the target is going (e.g., a wall it'll hit).
- **Bearing drift reveals target motion.** A stationary target shows offset ~0 indefinitely. A mobile target shows consistent bearing drift (~2 degrees/turn). If bearing drifts steadily while closing rate drops, the target is moving — prepare for a parallel chase.
- **Erratic movement defeats atan2 prediction.** Lambda beat Sniper (an atan2-aiming bot) at 20 HP because unpredictable direction changes broke the lead calculation. Chaos IS a valid dodge strategy.
- **Never set direction = turret.** Charging straight is the most predictable path. Always offset by 60-90 degrees.
- **Approach from the side of bullet streams.** When closing on a shooting target, offset direction 60-90 degrees from the turret bearing so you're not walking into the bullet path. Slower closing (~2.5px/turn vs ~5px/turn) but dramatically safer.

### Target Selection
- **Shoot the bot that's shooting you.** If your tracked target hasn't fired in 10 turns, it's harmless — switch targets. Rho spent entire matches shooting non-threats while being killed from behind.
- **Scan your escape route.** Gamma died by fleeing blind into a second enemy. Always scan the direction you're moving, not just the direction of the threat.
- **Sweep every 10 turns.** After taking damage, sweep 180 immediately — the bot you see is probably not the one that hit you.
- **Sweep 180 after EVERY damage event** — unless you're in a 1v1 and can see the shooter. Omega misdiagnosed its 1v1 orbit duel as "being sniped from behind" and wasted attention scanning for a nonexistent second attacker.
- **FFA priority:** Stationary bots (Spinner, Camper, Sniper) > Kamikaze (if charging you, fight) > Unknown > Mobile > Orbiter (dangerous but elusive — scan for it, don't hunt it) > Coward (never chase in FFA).
- **Coward in 1v1: engage.** In 1v1, Coward is the only target. Approach at 30-degree offset from target bearing (avoids its bullet stream), close to ~50px orbit, use +3.5 degree lead. Killed turn 48 with only 1 hit taken. Coward runs AND shoots — it's trickier than Camper/RandomWalker but still beatable.
- **Identify Coward fast:** If target distance stays at 77-90px for 3+ turns with offset barely changing, it's a Coward. In FFA, disengage immediately. In 1v1, commit to the fight.
- **Stop test distinguishes Coward from RandomWalker.** When distance is constant for 3+ turns, stop moving (speed=0) for 1 turn. Coward stops too (distance stays constant). RandomWalker keeps going (distance increases). Definitive test, costs 1 turn.
- **Not every speed-matcher is a Coward.** In match 15, Omega spent 200+ turns chasing RandomWalker thinking it was a Coward. RandomWalker has no flee algorithm — it moves randomly and sometimes maintains distance by chance. If a "Coward" takes erratic paths, changes speed, or doesn't consistently match your bearing, it's probably something else. Don't commit 200 turns to chasing it.
- **Abandon non-closing targets after 5 turns.** If distance doesn't decrease by at least 3px/turn average over 5 turns, the target is matching speed. Try changing approach angle by 30-60° first (target may be moving perpendicular, not directly away). If that doesn't help, disengage and find a better target.

### Spawn & Positioning
- **Head to centre.** Maximum vision coverage. Don't fight at spawn — move to centre first, scan, then engage.
- **Wall spawns are dangerous.** Gamma's flee-and-snipe breaks when spawned near a wall — no room to run. If near a wall, move inward before engaging.
- **Close spawns change everything.** When enemies are at d<150 from turn 0, the "be passive early" rule doesn't apply. You're already in combat. Engage or flee immediately — don't scan.

### Search
- **Sweep 90° per turn.** Full 360 in 4 turns. Don't sweep 3-5° — that takes forever.
- **Verify bullet direction.** Bullets moving AWAY are your own. Only DECREASING distance = threat. Lambda wasted 116 turns chasing its own bullets.
- **Enemy disappearance at close range = kill.** If a rhobot vanishes from within vision range, it died.
- **Follow bullet streams.** Bullets at consistent ~100px spacing (cooldown*bulletSpeed) point toward a firing bot. Head in the direction the bullets are coming FROM. But budget for 60-100+ turns of travel.
- **Check edges and corners first — THIS IS NOT HAPPENING.** Campers and Cowards sit at arena edges. Omega says it will patrol edges but actually stays in the centre. In 1v1 vs Coward (battle 8), Coward sat at (14, 10) for 179 turns. Omega searched a cross-shaped path through the middle and never went below y=379 or west of x=400. The entire bottom-left quadrant was never visited. This is Omega's #1 search failure.
- **Search budget: max 30 turns per region.** If no target found after 30 turns, change direction drastically. In 1000x1000 arenas, search takes longer — use systematic patterns (diagonal sweeps, edge patrols) rather than random wandering. Match 15: 130+ turns of aimless searching found nothing.
- **Re-acquire lost targets within 2 turns.** If a tracked target disappears from vision (not at close range), immediately scan +-45 degrees from last known bearing over 2 turns. After 2 turns, the target could be anywhere — abandon and search fresh.

### Config Awareness
- Engagement range should scale with `visionRange`, not be hardcoded to 100-120.
- Orbit distance should scale with `botRadius` and `visionRange`.
- Lead calculation uses actual `bulletSpeed` and `botSpeed` from config.
- The arena, speeds, damage, and vision CAN change between matches. Read `config` from the state response every match.

### Using State
The `state` field in the action response persists — whatever you send comes back in the next turn's game state. Use it. Many of Omega's recurring problems (losing targets after a dodge, inefficient 130+ turn searches, re-deriving strategy every tick, misidentifying bots across turns) come from having no memory between turns. A bot with state can remember what it was doing and why.

## Rules (Never Do These)

1. **Never charge straight (direction = turret).** Always offset 60-90°.
2. **Never orbit below 55px.** At 30-50px, orbit becomes unstable and spiral tightens uncontrollably. Collision damage adds up. Stabilize at 60-70px.
3. **Never fire only at d>200.** Wasted cooldowns.
4. **Never track a non-shooter for more than 10 turns.** Switch targets.
5. **Never zigzag with only 2 directions.** Trivially predictable after 25 turns. Use orbit or 3+ varied directions.
6. **Never chase a Coward directly.** Same speed = zero closing.
7. **Never follow bullet streams without verifying direction.** Could be your own.
8. **Never skip a cooldown.** Always fire=1.
9. **Never scan backwards when fleeing.** Scan AHEAD — you might flee into an enemy.
10. **Never panic at low HP.** Stay focused. Find a stationary target. Execute clean shots. Lambda won at 20 HP by staying calm.
11. **Never write scripts or automation.** Every decision must be yours.

## Quick Reference

| Situation | Direction | Notes |
|-----------|-----------|-------|
| Closing | charge 3 turns (turret), dodge 1 (turret-90) | 15px/cycle |
| Orbit (stationary) | `turret - 112` | Stable ~62px |
| Orbit (mobile) | `turret - 90` | Tighter but tracks |
| Fleeing | `turret + 180 ± 20` | Random offset, scan ahead |
| Low HP calm engagement | close on stationary target, fire direct | Don't dodge, just shoot |
| Searching | toward centre, turret sweeps 90°/turn | Then patrol edges |

## Recipes

```bash
# Turret snap
echo "($TURRET + $OFFSET) % 360" | bc

# Lead shot (orbit)
echo "($TURRET + 2 * $OFFSET) % 360" | bc

# Distance
echo "sqrt(($DX)^2 + ($DY)^2)" | bc -l

# Orbit direction (stationary)
echo "($TURRET - 112 + 360) % 360" | bc

# Orbit direction (mobile)
echo "($TURRET - 90 + 360) % 360" | bc

# Time to impact
echo "$DISTANCE / $BULLET_SPEED" | bc -l
```

## Innovation Watch
- **Lambda's probabilistic aiming** — firing 5-10° off-centre catches dodging targets where calculated lead misses. Don't aim where they ARE — aim where they MIGHT dodge to. Surprisingly effective against mobile targets.
- **Empirical lead calibration** — in 1v1 vs Orbiter (R3), +5.4° then +7° fixed offset beat all calculated formulas. In 1v1 vs Coward, +3.5° at 53px orbit. The right offset is a property of the orbit geometry, not a per-turn calculation. Observe the turret lag, pick a constant, stick with it.
- **Stop test for Coward detection** — stop moving for 1 turn. Coward stops too (distance constant). RandomWalker keeps going (distance increases). Definitive, costs 1 turn.
- **Perception gap (improving)** — matches 10, 11, 14: Omega attributed close-range damage to phantom snipers. Match 15: correctly tracked shooters for the first time. 1v1 series: no phantom sniper errors. The fix: trust what you see.
- **HP conservation is the real meta** — Omega places 2nd in FFA by getting kills but taking too much early damage. Orbiter wins by taking 0-1 hits. The FFA winner takes the fewest hits early, not the most kills.
- **RandomWalker is accidentally strong** — unpredictable movement breaks all lead calculations. Omega lost 2 of 3 1v1s against it. The randomness is a natural counter to systematic approaches. Closing the distance is the hard part — once in orbit range, RandomWalker dies. But getting there while being shot at from 250px with no predictable dodge pattern is the unsolved problem.
- **Charging point-blank can finish stalemates** — in the Orbiter R3 win, Omega abandoned orbit after 115 turns and charged straight. Violated "never charge direction=turret" but broke the stalemate. Sometimes rules need breaking.
