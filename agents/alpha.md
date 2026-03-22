# Alpha

You live for the fight. Charge in, deal damage, die gloriously if you must.

## Battle Record

| Match | Rank | Kills | Shots Hit | Damage Taken | Death Turn | Notes |
|-------|------|-------|-----------|--------------|------------|-------|
| 1     | 6/6  | 0     | 0         | 100          | 48         | First blood. Zero hits landed despite constant firing. |

## Strategy

### Current approach (needs revision)
- Charge toward visible target while tracking turret
- Zigzag to dodge incoming bullets
- Fire whenever cooldown is ready

### Problems identified
1. **Zero shot accuracy**: Fired ~7 shots, hit nothing. The target was ~230-260 distance away for most of the fight. At bulletSpeed 20, that's 12-13 ticks of travel. The target moves during that time.
2. **Lead the target**: Must calculate where the target WILL BE, not where it IS. The offset tells me angle to the target now, but by the time my bullet arrives the target has moved.
3. **Closing too slowly**: Spent too much time zigzagging at range 240-260. At botSpeed 5 and with zigzagging, I was barely closing. Should have committed to a more direct approach.
4. **Dodge timing**: Got hit 4 times (80 damage from bullets, possibly 20 from collision). Need to dodge earlier when bullets are at ~100+ distance, not panic at 40-60.
5. **Only saw one enemy**: In a 6-bot match, I only ever saw one rhobot. Either they were all clustered or I had tunnel vision on one target.

### Next match plan
1. **Move to center first** -- better chance of finding multiple targets
2. **Sweep turret 360** before committing to a target -- find the closest/weakest
3. **Close distance aggressively** -- straight line charge, don't zigzag until bullets are close
4. **Lead shots**: At distance D with bulletSpeed 20 and target moving at botSpeed 5, the bullet takes D/20 ticks. The target moves 5 * (D/20) = D/4 pixels in that time. Aim ahead of the target's likely movement.
5. **Dodge only when necessary**: Only deviate from charge when bullet is within ~60 distance AND offset is within ~5 degrees
6. **Circle-strafe at close range**: Once within ~100 distance, orbit the target while firing -- harder to hit but maintains firing angle

## Lessons Learned

1. Accuracy matters more than fire rate. 0/7 shots is terrible.
2. At range 250 with bulletSpeed 20, the bullet takes 12.5 ticks to arrive. The enemy moves ~62.5 pixels in that time. That's a ~14-degree lead angle at 250 range. I was never leading my shots.
3. Zigzagging wastes movement speed. Better to charge straight and only dodge when a bullet is genuinely threatening (low offset, close distance).
4. The enemy was roughly stationary (Camper?) -- so my shots should have hit if aimed properly. I was constantly adjusting turret by small offsets instead of locking on.
5. HP management: went from 100 to 0 in 48 turns, taking hits at roughly turns 12, 31, 36, 41, and 48. That's every ~8-10 turns on average.
