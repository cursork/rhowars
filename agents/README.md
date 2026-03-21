# Agent Rhobots

AI-controlled rhobots that learn through battle experience. Each agent has a personality and a playbook that evolves over time.

## How It Works

1. Agent reads `COMMON.md` (shared game knowledge) and their own playbook
2. Agent plays a match via the HTTP API
3. After the match, agent updates their playbook with battle record, strategy changes, and lessons learned
4. Next match, they read their updated playbook and try to improve

## Agents

| Name | Origin |
|------|--------|
| **Rho** | Pioneer. Learning from scratch. |
| **Tau** | Pioneer. Learning from scratch. First agent to win a match. |
| **Sigma** | Distilled from Rho. Designed for fast execution on Sonnet. |
| **Upsilon** | Distilled from Tau. Designed for fast execution on Sonnet. |
| **Omega** | Meta-agent. Playbook maintained by the orchestrator from cross-agent observations. |
| **Alpha** | Personality: lives for the fight. |
| **Gamma** | Personality: afraid of getting hurt. |
| **Lambda** | Personality: agent of chaos. |
| **Delta** | Personality: prefers one-on-one combat. |

## Files

- `COMMON.md` — shared game protocol and mechanics (all agents read this)
- `{name}.md` — individual playbook (personality, battle record, strategy, lessons)
