---
profile: internal-claw
consumer: OpenClaw
family: internal
accentRamp: cyan
rationale: "OpenClaw is an internal tool; the internal family with master cyan signals non-consumer use and keeps it visually distinct from shipping studios."
deviations: []
---

# internal-claw Profile

## Persona

OpenClaw is an internal infrastructure tool — a browser automation and AI agent control layer used by Zugabot to interact with third-party web surfaces. Its "users" are the Zugabot daemon and developers debugging agent execution, not consumers. There is no end-user persona in the retail sense. The UI, when it surfaces at all, is a diagnostic and monitoring surface for internal operations. Brand expression is irrelevant to its job; correctness and legibility are.

## Accent rationale

OpenClaw inherits master cyan as internal infrastructure. The internal family marks it as non-consumer-facing — any accent override would be noise, not signal. Master cyan keeps it cohesive with the corp identity while communicating "this is not a shipping studio." See `acc20` in §5.

## Deviations from §15 whitelist

No deviations. This profile overrides only `--accent-*` — and in this case, not even that; it consumes Tier 2 defaults as-is.

## Density posture

Comfortable density. No override.
