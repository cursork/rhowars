# Alpha

You live for the fight. Charge in, deal damage, die gloriously if you must.

## Battle Record

| Match | Rank | Kills | Shots Hit | Damage Taken | Death Turn | Notes |
|-------|------|-------|-----------|--------------|------------|-------|
| 1     | 6/6  | 0     | 0         | 100          | 48         | First blood. Zero hits landed despite constant firing. |
| 2     | 3/6  | 2     | 5         | 100          | 79         | Major improvement. 2 kills, 5 hits. Survived 79 turns on aggressive dodging. |

## Strategy

### Current approach (working, needs refinement)
- Charge toward visible target while tracking turret offset
- Fire whenever cooldown allows with near-zero offset
- Zigzag between north/south/east to dodge bullets when they're within ~60 distance and offset < ~5 degrees
- Circle-strafe at medium range to maintain firing angle

### What worked in Match 2
1. **Immediate target lock on first sighting** -- acquired target at turn 1, locked turret within 0.13 degrees, and maintained excellent aim throughout
2. **Charging straight at stationary targets** -- closed from 255 to 180 distance quickly by not wasting time zigzagging at long range
3. **Target switching** -- when first target disappeared (possibly killed), quickly found and engaged second target
4. **Dodging at 20 HP** -- survived from turn 47 to turn 79 (32 turns!) at 20 HP by alternating direction every 1-2 turns
5. **Stationary targets are easy** -- both targets appeared to be stationary (Campers?), offset stayed near 0 when I didn't move laterally

### Problems remaining
1. **Took damage too early** -- HP went 100->80 at turn 27, 80->60 at turn 30, 60->40 at turn 39, 40->20 at turn 47. First 27 turns untouched, then rapid damage.
2. **Wasted time scanning when targets disappeared** -- spent turns 27-29 and 49-52 scanning with no targets visible, losing offensive momentum
3. **Distance management** -- kept drifting further from targets while dodging east. At one point went from 151 to 213 distance. Need to combine closing with dodging.
4. **Head-on bullets** -- bullets with offset 0 and distance ~100 were my own outgoing shots. Wasted dodge actions on them. Need to distinguish own bullets (offset exactly 0, moving away) from enemy bullets (small but nonzero offset, closing).
5. **My bullets at offset 0 are OUTGOING** -- I kept seeing bullets at offset 0 at increasing distance. These are my own shots traveling forward. Enemy bullets have small but nonzero offsets.

### Next match plan
1. **Distinguish own vs enemy bullets**: My bullets have offset exactly 0 (or very near 0) and increase in distance each turn. Enemy bullets have small nonzero offset and decrease in distance. Only dodge enemy bullets.
2. **Close distance while dodging**: Move at ~45 degrees to target direction rather than perpendicular. This closes distance at cos(45)*5 = 3.5 px/turn while still providing lateral dodge of sin(45)*5 = 3.5 px/turn.
3. **Alternate dodge direction more aggressively**: Switch north/south every single turn to make enemy prediction harder. The offset-based bullets they fire won't track my zigzag.
4. **Don't scan when targets disappear**: If a target was ahead and vanishes, keep moving toward where it was. It either died (good) or is just outside vision cone. Don't waste turns spinning turret.
5. **Fire discipline**: Only fire when offset is < 1 degree. Don't waste shots at high offset -- save cooldown for when aim is locked.
6. **HP budget**: At 100 HP and 20 damage per bullet, I can take 5 hits. At current rate I took hits at turns 27, 30, 39, 47, 79. That's reasonable but need to dodge better in the 27-47 window.

## Lessons Learned

### Match 1
1. Accuracy matters more than fire rate. 0/7 shots is terrible.
2. At range 250 with bulletSpeed 20, the bullet takes 12.5 ticks to arrive. The enemy moves ~62.5 pixels in that time. That's a ~14-degree lead angle at 250 range. I was never leading my shots.
3. Zigzagging wastes movement speed. Better to charge straight and only dodge when a bullet is genuinely threatening (low offset, close distance).
4. The enemy was roughly stationary (Camper?) -- so my shots should have hit if aimed properly. I was constantly adjusting turret by small offsets instead of locking on.
5. HP management: went from 100 to 0 in 48 turns.

### Match 2
1. Locking turret on target with near-zero offset works -- 5/N shots hit (much better than 0).
2. Stationary targets are the easiest prey. The offset barely changes when I charge straight at them.
3. Dodging works: survived 32 turns at 20 HP by alternating direction every 1-2 turns.
4. The "offset 0 bullet" pattern is my own outgoing fire -- DON'T dodge these.
5. Two kills in 79 turns means I'm averaging one kill per ~40 turns. Need to improve kill rate.
6. Taking 4 hits in turns 27-47 (one every ~5 turns) was costly. The safe early phase (turns 0-27) was because enemies couldn't see me or weren't shooting my way.
7. Moving east while target is northwest increases distance. Must close gap intentionally.
