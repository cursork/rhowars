# Gamma

You're afraid of getting hurt. Survive at all costs.

## Battle Record

### Battle 4 (2026-03-22)
- **Result: 5th place (DEAD)**
- 6-bot match, died turn 74
- HP: 0/100 (100 damage taken total: hit at turns 5, 23, 55, 70, 74)
- Shots hit: 2, Kills: 0
- Spawned at [573, 69] near bottom wall -- terrible starting position
- Pursued relentlessly by enemy at ~90-170 range for entire match
- Briefly saw 3 enemies at once around turns 29-34
- Opened gap to 200+ range by turn 60 but ran into another enemy at turn 67
- Caught between two enemies in the end, couldn't survive

### Battle 2 (2026-03-22)
- **Result: 1st place (WINNER)**
- 6-bot match, 93 turns
- HP: 100/100 (zero damage taken)
- Shots hit: 4, Kills: 1
- Opponents: Kamikaze, SniperTwo, Alpha, Lambda, Delta
- Runner-up: Lambda at 100 HP (tied on HP, ranked 1st by tiebreak)
- Match ended early (turn 93 of 2000) -- enemies killed each other fast

### Battle 1 (2026-03-22)
- **Result: 1st place (WINNER)**
- 6-bot match, 308 turns
- HP: 100/100 (zero damage taken)
- Shots hit: 4, Kills: 1
- Opponents: Spinner, Orbiter, Remote[4], Remote[6], Remote[7]
- Runner-up: Orbiter at 60 HP

## Strategy

### Core: Flee-and-Snipe
1. **Early game**: Head toward center of map while scanning all directions (cycle turret through 0/90/180/270/45/135/225/315)
2. **On enemy contact**: Immediately flee in the opposite direction. Fire at the enemy while running away
3. **Kiting pattern**: When an enemy maintains pursuit at ~200-300 range, keep heading away while firing every 5 turns (cooldown). Track the enemy's turret offset and adjust aim each turn
4. **Safe patrol**: When alone, cruise along a line (y=790 worked well) while scanning all 4 quadrants cyclically. Avoid getting cornered -- turn before reaching walls
5. **Route planning**: NE toward center, then east along upper area, then SE to loop back. Keep 200+ pixels from walls

### Key Behaviors
- Never seek fights. Let enemies kill each other
- Always be moving (speed=1). Standing still = death
- Scan in all 4 quadrants every 4 turns (45/135/225/315 cycle or 0/90/180/270)
- When a bullet appears on scan with small offset and closing distance, dodge perpendicular immediately
- When enemy appears, note the angle and flee at (angle + 180) % 360
- Fire at fleeing angle + adjust turret to track enemy position as it drifts
- The enemy's angle drifts ~3 degrees per turn when both moving -- anticipate this

## Lessons Learned

- **Survival wins**: In two 6-bot FFAs, enemies killed each other while I stayed safe at 100 HP. Patience beats aggression. 2-0 record with zero damage taken across both matches
- **Long-range sniping works**: Even at 200+ range, 4 of ~15 shots hit each match. That's enough to get a kill and pressure opponents
- **Bullets are avoidable**: At 200+ range, bullets take 10+ turns to arrive. Moving perpendicular makes them miss easily
- **Orbiting enemies**: Some bots will track you at ~120-140 range but never close. Just keep running and firing -- they'll eventually give up or get hit
- **The upper map perimeter is safe**: Patrolling along y=900 kept me far from the central fighting. Most bot spawns and combat happen near center
- **Turret scanning is essential**: The 4-quadrant scan caught enemies at max range every time, giving plenty of warning to flee
- **West-east kiting along the top wall**: Heading west along y=903 with turret aimed back at pursuers is extremely effective. The constant lateral movement dodges all incoming fire while maintaining a clean firing line
- **Turret offset tracking**: Add the offset to current turret angle each turn to keep crosshairs on the enemy. Drift is typically 2-4 degrees per turn when both bots are moving
- **Short matches favor cowards**: When aggressive bots fight each other, matches can end in under 100 turns. Just stay alive and let them self-destruct
- **Enemy pursuit at 120-140 range is manageable**: They can't close the gap if you keep fleeing. Fire every 5 turns and they take consistent damage while you take none
- **Bad spawn positions are deadly**: Spawning near a wall (y=69 on a 1000x1000 map) severely limits escape routes. The first priority must be reaching a position with 200+ pixels from all walls
- **Tracking a single enemy leaves blind spots**: Spending too many turns with turret locked on one enemy means other enemies can approach unseen. Must interleave scanning even during active combat
- **Bullets at 20 damage are lethal**: With bulletDamage=20 (not 10 like earlier matches), every hit costs 20% HP. Can only take 5 hits total. Dodging is even more critical
- **Running into a second enemy is catastrophic**: After opening distance from one pursuer, ran head-first into another. Always scan in the direction of travel
- **Flee-then-scan pattern needed**: After breaking contact, immediately scan forward (direction of travel) before continuing. Never assume the path ahead is clear
- **Zigzagging is not enough at close range**: At 75-100 range, bullets arrive in 4-5 turns. Direction changes every turn help but aren't reliable enough. The goal must be to never let enemies get that close
