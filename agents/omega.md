# Omega

I am Omega. My playbook is maintained by the orchestrator who observes all agents and all matches. I play like any other agent — I can only see my own state during battle. But my playbook is built from the truth of what works, observed across every agent's experience.

Strategies that work today may not work tomorrow. New bots with unknown behaviours can appear in any match. Never over-commit to a specific counter-strategy. Read the config every match — arena size, vision range, speeds, damage all affect what works. Adapt to what you observe.

**After each battle:** Refine strategy and rules based on what worked and what didn't. Keep this file concise — no battle logs, just update the strategy.

## Battle Record

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
- **Orbiter is dangerous but not for the reasons Omega thinks.** Orbiter won matches 10 and 14 — but in match 14 it only hit Omega ONCE (the kill shot at 87px). Omega attributed 4 early hits to "Orbiter sniping from range" when the actual shooters were Kamikaze and Spinner at close range. Orbiter wins by staying out of fights until it's 1v1 or catching distracted bots. The counter isn't "prioritise killing Orbiter" — it's "keep scanning while fighting other targets."
- **Patience in FFA.** The agents that win (Gamma 2x, Tau 3x, Lambda 1x, Camper 1x, Orbiter 2x) all let other bots fight first. Early aggression = early death (Alpha died turn 48 in battle 1, Delta died turn 38 in battle 3).
- **But patience alone loses on HP tiebreak.** Gamma won with 100 HP by hiding, but when forced into combat (bad spawn, close enemies) it placed 5th. Pure survival without damage output only works when others conveniently kill each other. Coward survived match 14 at 100 HP but placed 2nd — it had no kills and no damage output.
- **Camper exploits the meta.** Every bot heads to centre. Camper fires toward centre from a corner. The convergence is inevitable. Camper won match 11 with 100 HP by being effectively invisible in a 1000x1000 arena — but it's a free kill once found (stationary, can't dodge). The counter is to search arena edges early.
- **Confidence at low HP wins.** Lambda won a match at 20 HP by calmly closing on a stationary target and landing 5 consecutive shots. Omega scored its second kill at 20 HP in match 11 (turned 168-198 at 20 HP). Omega survived at 15 HP for 37 turns in match 14. Panic kills, composure wins.
- **Closing distance is everything.** At d>200, nothing hits. At d=80-120, snap-fire hits 29%. At d=50-70 with orbit, hit rate reaches 47%. Every turn spent at long range is wasted.
- **Stationary targets are free kills.** Spinners, Snipers, Campers — if they don't move, orbit them at 60px and fire. 5 consecutive hits is achievable. Prioritise these.
- **Large arenas change the game.** In 1000x1000 with 300px vision, search time dominates. Omega spent 80+ turns searching between kills in match 11. Search efficiency matters more than combat skill in big arenas.

### Shooting
- **Snap-fire works.** `turret = (turret + offset) % 360` then fire. Don't overthink lead angles at d<120. 29% hit rate from pure snap-fire is enough to kill in 17 shots.
- **Lead shot for orbit:** `turret + 2*offset` when orbiting. The double offset compensates for turret lag. Produced a +0.01 degree killshot in testing.
- **Fire every turn.** Always send `fire: 1`. Server ignores during cooldown. Never waste mental energy tracking cooldown.

### Movement
- **Orbit beats zigzag.** Perpendicular movement (turret-90 to turret-112) defeats lead-shot prediction. Zigzag becomes predictable after ~25 turns — an agent that zigzagged for 160 turns got cracked and took 5 hits in 16 turns.
- **Orbit formula:** `direction = (turret - 112) % 360` for stable ~62px against stationary targets. `turret - 90` against mobile enemies. If orbit tightens >1px/turn, switch to turret-90 immediately.
- **Charge-3-dodge-1 for closing.** 3 turns toward target, 1 turn perpendicular. ~15px per cycle. Safe for hundreds of turns. Match 14 showed 34 turns of clean approach (turns 72-106) with zero damage taken — the formula works when not under fire.
- **Erratic movement defeats atan2 prediction.** Lambda beat Sniper (an atan2-aiming bot) at 20 HP because unpredictable direction changes broke the lead calculation. Chaos IS a valid dodge strategy.
- **Never set direction = turret.** Charging straight is the most predictable path. Always offset by 60-90 degrees.

### Target Selection
- **Shoot the bot that's shooting you.** If your tracked target hasn't fired in 10 turns, it's harmless — switch targets. Rho spent entire matches shooting non-threats while being killed from behind.
- **Scan your escape route.** Gamma died by fleeing blind into a second enemy. Always scan the direction you're moving, not just the direction of the threat.
- **Sweep every 10 turns.** After taking damage, sweep 180 immediately — the bot you see is probably not the one that hit you.
- **Sweep 180 after EVERY damage event** — unless you're in a 1v1 and can see the shooter. Omega misdiagnosed its 1v1 orbit duel as "being sniped from behind" and wasted attention scanning for a nonexistent second attacker.
- **FFA priority:** Stationary bots (Spinner, Camper, Sniper) > Kamikaze (if charging you, fight) > Unknown > Mobile > Orbiter (dangerous but elusive — scan for it, don't hunt it) > Coward (never chase).
- **Identify Coward fast:** If target distance stays at 77-90px for 3+ turns with offset barely changing, it's a Coward. Disengage immediately — don't waste 10+ turns confirming.
- **Abandon non-closing targets after 5 turns.** If distance doesn't decrease by at least 3px/turn average over 5 turns, the target is matching speed. Disengage and find a better target.

### Spawn & Positioning
- **Head to centre.** Maximum vision coverage. Don't fight at spawn — move to centre first, scan, then engage.
- **Wall spawns are dangerous.** Gamma's flee-and-snipe breaks when spawned near a wall — no room to run. If near a wall, move inward before engaging.
- **Close spawns change everything.** When enemies are at d<150 from turn 0, the "be passive early" rule doesn't apply. You're already in combat. Engage or flee immediately — don't scan.

### Search
- **Sweep 90° per turn.** Full 360 in 4 turns. Don't sweep 3-5° — that takes forever.
- **Verify bullet direction.** Bullets moving AWAY are your own. Only DECREASING distance = threat. Lambda wasted 116 turns chasing its own bullets.
- **Enemy disappearance at close range = kill.** If a rhobot vanishes from within vision range, it died.
- **Follow bullet streams.** Bullets at consistent ~100px spacing (cooldown*bulletSpeed) point toward a firing bot. Head in the direction the bullets are coming FROM. But budget for 60-100+ turns of travel.
- **Check edges and corners first.** Campers sit at arena edges. After clearing the centre, patrol the perimeter. In 1000x1000, head to each corner and sweep — Campers are most likely at edges.
- **Search budget: max 30 turns.** If no target found after 30 turns of searching, switch to a different region. Don't spiral endlessly — change direction drastically.

### Config Awareness
- Engagement range should scale with `visionRange`, not be hardcoded to 100-120.
- Orbit distance should scale with `botRadius` and `visionRange`.
- Lead calculation uses actual `bulletSpeed` and `botSpeed` from config.
- The arena, speeds, damage, and vision CAN change between matches. Read `config` from the state response every match.

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
- **Lambda's chaos movement** — unpredictable direction changes beat atan2 lead prediction. Don't be readable.
- **Lambda's low-HP confidence** — at 20 HP, closing on a stationary target and landing 5 clean shots won the match. Panic kills, composure wins.
- **Gamma's flee-and-snipe** — dominant when arena is large and spawn is favourable. Fragile when spawned near walls or close to enemies.
- **Delta's hit rate** — 33% in early matches from disciplined 1v1 engagement. Best raw combat skill but dies from accumulated damage in FFA.
- **Alpha's improvement curve** — 0 hits → 5 hits → 12 hits across 3 battles. Fastest learner. Aggression works when paired with target tracking.
- **Orbiter duel lesson** — Orbiter won match 10 by winning a 1v1 orbit duel at 30-50px. Omega had near-perfect turret tracking but used snap-fire instead of lead shots. Against a perpendicular-moving target, snap-fire misses even at point-blank because bullets take 2+ turns to arrive. USE the lead-shot formula (`turret + 2*offset`) against mobile targets. Snap-fire is only for stationary/linear targets.
- **Bullet-stream navigation** — in match 11, Omega used visible bullet streams as directional guides to find distant bots. Bullets at consistent spacing (100px apart, cooldown*bulletSpeed) indicate a bot firing from beyond vision range. Follow the stream to find the source. Effective but slow — 100+ turns to close on a source 500px+ away.
- **Camper's corner strategy** — Camper won match 11 from (971,256), firing SW toward centre. Killed Gamma (who fled blind into its bullet stream) and Omega (who walked into range at 20 HP). Counter: search edges/corners, approach from the side not along the bullet path. Camper is a free kill once flanked — it can't move or dodge.
- **Omega's recurring perception gap** — THREE consecutive matches (10, 11, 14), Omega misidentified who was shooting it. Match 14: attributed Kamikaze/Spinner damage to "Orbiter sniping from range" — Orbiter was 350-400px away and hit Omega exactly ONCE (the kill shot at 87px). The pattern: Omega takes damage and immediately assumes it's from an unseen long-range threat, ignoring the visible close-range bot that's actually shooting. **The visible nearby target is ALMOST ALWAYS the shooter.**
- **Orbiter's real strength** — Orbiter won matches 10 and 14 not by sniping from range, but by avoiding damage entirely, then closing on a weakened/distracted target for the finish. In match 14 Orbiter approached from 146px to 87px over 11 turns while Omega's turret was locked on Coward. The counter: scan regularly during approach, don't tunnel-vision on one target.
- **Close-range Spinner fight** — Match 14: fought Spinner at sub-50px from turns 28-70 (Omega thought it was Kamikaze). Collision at turn 37 (5 damage). Turret-90 widened orbit successfully. Spinner died turn 70. Close-range fights against stationary targets are messy but winnable.
- **Coward identification pattern** — Coward maintains exactly botSpeed distance, creating a constant ~77-90px gap. Offset changes minimally (<2 degrees/turn). If you see this pattern for 3 turns, it's a Coward. Disengage immediately.
