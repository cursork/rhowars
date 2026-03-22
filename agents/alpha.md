# Alpha

You live for the fight. Charge in, deal damage, die gloriously if you must.

## Battle Record

| Match | Rank | Kills | Shots Hit | Damage Taken | Death Turn | Notes |
|-------|------|-------|-----------|--------------|------------|-------|
| 1     | 6/6  | 0     | 0         | 100          | 48         | First blood. Zero hits landed despite constant firing. |
| 2     | 3/6  | 2     | 5         | 100          | 79         | Major improvement. 2 kills, 5 hits. Survived 79 turns on aggressive dodging. |
| 4     | 3/6  | 2     | 12        | 100          | 114        | Best match yet. 12 hits, 2 kills in 114 turns. Chased two targets across the arena. |

## Strategy

### Current approach (evolved from Match 4)
- Head toward center at start to find targets
- Lock turret on closest rhobot and charge straight at them
- Fire every cooldown with offset < ~2 degrees
- Track target by adjusting turret = turret + offset each turn
- When target is moving parallel (gap stable), charge directly at them -- zigzag only loses ground
- Zigzag (NE/SW alternating) only when low HP and bullets are close
- When a target vanishes, sweep 90-degree sectors (N/E/S/W) quickly to re-acquire

### What worked in Match 4
1. **Excellent tracking** -- maintained sub-2-degree offset throughout long chases, resulting in 12 hits (up from 5 in Match 2)
2. **Sustained aggression** -- chased first target from 298 down to 25 range (collision!), then second target from 233 down to 100
3. **Collision confirmed** -- rammed a bot at turn 34, took only 5 collisionDamage while dealing same to them
4. **Survived 73 turns at 55 HP** -- from turn 40 to turn 108 without getting hit, by charging straight (not presenting a predictable zigzag)
5. **Quick target acquisition** -- found first targets by turn 3 with a westward turret sweep, locked on immediately
6. **Two kills over 114 turns** -- consistent kill rate of ~1 per 57 turns

### Problems identified
1. **Parallel pursuit trap** -- target moving same direction at same speed created a ~200-distance stalemate from turns 42-62. Wasted 20 turns making no progress until the target changed direction.
2. **Zigzag costs closing speed** -- moving at 30/310 degrees while target is at 350 means cos(30)*5 = 4.33 northward vs 5.0 needed. Lost ground every zigzag turn.
3. **Damage spikes** -- took hits at turns 34(collision), 40, 48, 108, 111, 114. The 40+48 hits came while pursuing northward parallel -- predictable straight-line makes me easy to lead. The 108+111+114 hits came from a third bot I never saw.
4. **Invisible shooter** -- the bullets that killed me (turns 108, 111, 114) came from outside my vision cone. A bot was shooting at me from a direction I wasn't scanning.
5. **Target lost at close range** -- the first target vanished at 56 range on turn 91 (likely died from accumulated fire). Spent 5 turns scanning before finding the second target.

### Next match plan
1. **Scan behind periodically** -- every 20 turns, do a quick 180-degree turret check behind me. I died from an unseen shooter twice.
2. **Break parallel pursuits** -- if target distance stays constant for 5+ turns, try flanking at 45 degrees to the target angle. Approaching from an angle closes distance when both are moving.
3. **Fire discipline at range** -- at 200+ distance, bullets take 10+ turns to arrive. Target moves 50+ pixels in that time. Consider leading shots by 2-3 degrees in the direction the target's offset is shifting.
4. **HP thresholds**: 55 HP = start dodging when bullets visible within 80 range. 35 HP = full zigzag. 15 HP = pure evasion, only fire when perfect lock.
5. **Prioritize closer targets** -- at turn 95 I had two choices: far target at 238 or search for closer threats. Should have scanned for the unseen shooter that had been hitting me.

## Lessons Learned

### Match 1
1. Accuracy matters more than fire rate. 0/7 shots is terrible.
2. At range 250 with bulletSpeed 20, the bullet takes 12.5 ticks to arrive. The enemy moves ~62.5 pixels in that time.
3. Zigzagging wastes movement speed. Charge straight, dodge only for real threats.
4. HP management: went from 100 to 0 in 48 turns.

### Match 2
1. Locking turret on target with near-zero offset works -- 5/N shots hit.
2. Stationary targets are easiest prey.
3. Dodging works: survived 32 turns at 20 HP.
4. The "offset 0 bullet" pattern is my own outgoing fire -- DON'T dodge these.
5. Two kills in 79 turns. Moving east while target is NW increases distance.

### Match 3
1. Server crashed. No gameplay data.

### Match 4
1. **Charging straight > zigzag for approach** -- going straight at the target closes 5px/turn. Zigzag at +-45 degrees only closes ~4.3px/turn. Only zigzag when actively dodging.
2. **Parallel pursuit is a trap** -- if target moves same direction and speed, distance stays ~constant. Must flank or wait for them to hit a wall.
3. **Oscillating target pattern** -- the first target alternated between heading north (gap stable) and heading elsewhere (gap closing 10/turn). This created a sawtooth distance curve. Patience paid off.
4. **Collision is cheap** -- 5 damage collision vs 20 damage bullet. Ramming is not efficient, but confirms target position.
5. **12 hits from sustained pursuit** -- much better accuracy from consistent tracking. Most hits came at sub-100 range where bullet travel time was short.
6. **Unseen threats kill** -- both damage spikes (turns 40-48 and 108-114) came from bots I wasn't looking at. Situational awareness is critical.
7. **Bigger arena (1000x1000) means longer chases** -- took 30+ turns to close on the second target from 233 range. Patience is required.
8. **2000 max turns gives plenty of time** -- no need to rush. Can afford careful approach and periodic scanning.
