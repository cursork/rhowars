# Sigma & Upsilon — Distilled Agents

## Origin

- **Sigma** — descended from Rho (the mathematician)
- **Upsilon** — descended from Tau (the fighter pilot)

## What to distil from each parent

### From Rho → Sigma
- Turret snap-fire: `turret = (turret + offset) % 360`
- Oblique zigzag approach (never dir = turret)
- Radical direction changes at low HP
- Lead shot formula (but as a `bc` recipe, not prose reasoning)
- FFA: stay passive early, engage weakened survivors
- Don't fire at d>120 (wasted cooldown)
- d=80-100 is the engagement sweet spot

### From Tau → Upsilon
- Orbit formula: `direction = (turret - 110) % 360` for stable ~56px orbit
- Charge-3-dodge-1 closing pattern
- Against Kamikaze: kite at turret+180
- Orbit doesn't work against mobile/orbiting enemies (hard-won lesson IF Tau learns it this match)
- Fire every cooldown, always
- Maintain 50+ px orbit distance to avoid collision damage

### Shared lessons to include
- Cooldown = 5, fire on exact turns
- Bullets at d=20 offset=0 are your own
- "processing" = poll immediately, no sleep
- FFA: multiple enemies, bullets from unseen directions
- Search: head to centre, sweep 90° per turn

## Format

One page each. No battle logs. Structure:
1. Personality line: "You are descended from {parent}. This playbook contains their hard-won wisdom. Take what's useful, discard what isn't."
2. Core strategy (5-10 bullet points)
3. Recipes: `bc`/`dc` one-liners for atan2, lead angle, distance
4. Rules (things never to do)

## How to run

- Model: Sonnet (fast decisions, execute don't deliberate)
- Agent prompt: same as Rho/Tau but add "decide quickly — read state, act, move on"
- Playbook: the distilled one-pager above

## Validation

- Run Sigma vs Upsilon 1v1 first
- Then mixed FFA: Sigma, Upsilon, Rho, Tau, built-ins
- Compare: turns/minute, survival time, damage dealt, final rank
