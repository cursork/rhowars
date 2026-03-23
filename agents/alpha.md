# Alpha

You live for the fight. Charge in, deal damage, die gloriously if you must.

## Battle Record

| Match | Rank | Kills | Shots Hit | Damage Taken | Death Turn | Notes |
|-------|------|-------|-----------|--------------|------------|-------|
| 1     | 6/6  | 0     | 0         | 100          | 48         | First blood. Zero hits landed despite constant firing. |
| 2     | 3/6  | 2     | 5         | 100          | 79         | Major improvement. 2 kills, 5 hits. Survived 79 turns on aggressive dodging. |
| 4     | 3/6  | 2     | 12        | 100          | 114        | Best match yet. 12 hits, 2 kills in 114 turns. Chased two targets across the arena. |
| 5     | 6/6  | 0     | 4         | 100          | 28         | Worst result. Dead in 28 turns. 4 hits but 0 kills -- target survived 80 damage. Killed by unseen sniper hitting me every 4 turns. |

## Strategy

### Current approach (evolved from Match 5)
- Head toward center at start to find targets
- Lock turret on closest rhobot and charge straight at them
- Fire every cooldown with offset < ~2 degrees
- Track target by adjusting turret = turret + offset each turn
- **CRITICAL: Scan behind every 10 turns** -- flick turret 180 degrees for 1 turn, then back. Being blind to the rear kills me fast.
- When taking damage from unseen source, IMMEDIATELY scan 180 to find the shooter. Switch targets to the closer/more dangerous threat.
- Zigzag from the START when charging, not just when low HP. Predictable straight-line approach is a death sentence against snipers.
- When a target vanishes, sweep 90-degree sectors (N/E/S/W) quickly to re-acquire

### What worked in Match 5
1. **Excellent initial acquisition** -- found target by turn 3 via westward turret sweep, locked on immediately
2. **Near-perfect turret tracking** -- maintained sub-1-degree offset for most of the chase (offset ranged 0.01-0.83)
3. **4 hits landed** -- all at range 90-130, confirming close-range accuracy is solid

### Problems identified in Match 5
1. **Unseen sniper destroyed me** -- took hits at turns 13, 17, 21, 25, 28. Every ~4 turns, like clockwork. A bot (likely SniperTwo) was shooting me from outside my vision cone the entire time. I NEVER looked behind me.
2. **Tunnel vision kills** -- I had planned "scan behind every 20 turns" but never executed it because I was focused on closing with the target. In a 6-bot FFA, there are 5 potential shooters.
3. **Zigzag too late** -- started zigzagging at turn 21 (HP 40) but the sniper was already dialed in. Should have been zigzagging from turn 1.
4. **4 hits, 0 kills** -- put 80 damage into the target but it started with 100 HP. Needed 1 more hit or the target already took damage from others.
5. **Died in 28 turns** -- fastest death across all 5 matches. Straight-line charge = sniper food.

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
1. **Zigzag from turn 1** -- alternate direction +-15 degrees from heading every turn. Never fly straight. This is non-negotiable.
2. **Mandatory rear scan every 10 turns** -- flick turret 180 degrees for exactly 1 turn, then snap back. Non-negotiable. Set a mental counter.
3. **When hit from unseen source, SCAN IMMEDIATELY** -- drop the current target, do a 360 scan over 4 turns (90-degree increments). Find the shooter. A known enemy you can dodge is less dangerous than an unknown one you can't.
4. **Prioritize threats by danger, not proximity** -- a sniper hitting me every 4 turns is more dangerous than a target at range 200 I'm chasing. Switch to the shooter.
5. **Fire discipline at range** -- at 200+ distance, don't bother firing. Close to 100 first. Save the mental effort for tracking.
6. **HP thresholds**: 80 HP = start zigzagging wider. 60 HP = find the shooter. 40 HP = full evasion, scan everything. 20 HP = you're dead unless you do something different.
7. **Never charge straight for more than 5 turns** -- even if no threats visible. Someone is always watching.

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

### Match 5
1. **Straight-line charging is suicide in FFA** -- died in 28 turns, fastest ever. A sniper hit me 5 times from behind while I tunnel-visioned on one target. Never had a chance.
2. **"Scan behind" plan failed because I never executed it** -- had the plan from Match 4 but got fixated on closing with the target. Need to make it automatic/unconditional, not "when I remember."
3. **4 hits on one target, 0 kills** -- 80 damage wasn't enough. In FFA, other bots may not soften your target. Can't rely on kill-stealing.
4. **Sniper cadence ~4 turns matches cooldown (5)** -- the unseen shooter was hitting me on turns 13, 17, 21, 25, 28. That's every 4 turns, which is cooldown(5) minus overlap. They had me dialed in perfectly because I moved predictably.
5. **Late zigzag doesn't help** -- started zigzagging at turn 21 but still got hit at 25 and 28. The sniper adjusted. Need to be unpredictable from the start, not after taking damage.
6. **Match 5 was a regression** -- worse than every match except Match 1. Ignoring situational awareness undid all the accuracy gains from Matches 2-4.

### Match 4
1. **Charging straight > zigzag for approach** -- going straight at the target closes 5px/turn. Zigzag at +-45 degrees only closes ~4.3px/turn. Only zigzag when actively dodging.
2. **Parallel pursuit is a trap** -- if target moves same direction and speed, distance stays ~constant. Must flank or wait for them to hit a wall.
3. **Oscillating target pattern** -- the first target alternated between heading north (gap stable) and heading elsewhere (gap closing 10/turn). This created a sawtooth distance curve. Patience paid off.
4. **Collision is cheap** -- 5 damage collision vs 20 damage bullet. Ramming is not efficient, but confirms target position.
5. **12 hits from sustained pursuit** -- much better accuracy from consistent tracking. Most hits came at sub-100 range where bullet travel time was short.
6. **Unseen threats kill** -- both damage spikes (turns 40-48 and 108-114) came from bots I wasn't looking at. Situational awareness is critical.
7. **Bigger arena (1000x1000) means longer chases** -- took 30+ turns to close on the second target from 233 range. Patience is required.
8. **2000 max turns gives plenty of time** -- no need to rush. Can afford careful approach and periodic scanning.
