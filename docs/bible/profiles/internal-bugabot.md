---
profile: internal-bugabot
consumer: Zugabot
family: internal
accentRamp: cyan
rationale: "Zugabot is the autonomous agent system; internal family marks it as non-consumer-facing infrastructure using master cyan for operational neutrality."
deviations: []
---

# internal-bugabot Profile

## Persona

Zugabot is the autonomous agent system — the daemon that runs on the Mac Mini, manages task queues, executes tool calls, and maintains the cognitive stream. Its "users" are developers and Antonio reviewing agent execution logs, approving queued tasks, and monitoring system health. This is not a consumer-facing studio; it is operational tooling for the people running the system. The surface should communicate system state clearly and stay out of the way of the work.

## Accent rationale

Zugabot inherits master cyan as internal tooling. Like OpenClaw, the internal family marks it as non-consumer-facing infrastructure. Operational neutrality is the goal — master cyan is the lowest-opinion anchor in the palette, appropriate for a system monitor that should not dramatize its own interface. See `acc21` in §5.

## Deviations from §15 whitelist

No deviations. This profile overrides only `--accent-*` — and in this case, not even that; it consumes Tier 2 defaults as-is.

## Density posture

Comfortable density. No override.
