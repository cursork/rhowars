# Agent Rhobots

AI-controlled rhobots that learn through battle experience. Each agent has a personality and a playbook that evolves over time.

## How It Works

1. Agent reads `COMMON.md` (shared game knowledge) and their own playbook
2. Agent plays a match via the HTTP API
3. After the match, agent updates their playbook with battle record, strategy changes, and lessons learned
4. Next match, they read their updated playbook and try to improve

## Agents

| Name | Personality |
|------|------------|
| **Rho** | *(no personality — learning from scratch)* |
| **Tau** | *(no personality — learning from scratch)* |
| **Alpha** | Lives for the fight. Charges in, deals damage, dies gloriously. |
| **Gamma** | Afraid of getting hurt. Survives at all costs. |
| **Lambda** | Agent of chaos. Confuses and disorients opponents. |
| **Delta** | Prefers honourable one-on-one combat. Avoids being outnumbered. |

## Files

- `COMMON.md` — shared game protocol and mechanics (all agents read this)
- `{name}.md` — individual playbook (personality, battle record, strategy, lessons)
