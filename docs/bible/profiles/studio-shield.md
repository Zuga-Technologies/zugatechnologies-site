---
profile: studio-shield
consumer: ZugaShield
family: security
accentRamp: red
rationale: "ZugaShield is the security studio; red signals alert and protection severity, reinforcing the importance of security posture at a glance."
deviations: []
---

# studio-shield Profile

## Persona

ZugaShield users are managing security posture — monitoring threat signals, reviewing audit logs, checking compliance status, and responding to alerts. The mental state can range from routine maintenance (low urgency) to incident response (high urgency). The UI must communicate severity clearly and never let the brand color be ambiguous: when something is red, it means "pay attention now." Designers working in this studio must treat red as a loaded color with restricted casual usage.

## Accent rationale

ZugaShield is the security family and uses red. Red is the universal signal for security severity, alerts, and protective action. No other hue would communicate the same immediate urgency to a user scanning a security dashboard. The CSS notes that designers must use red sparingly elsewhere in the UI to preserve its signal value — see studio-shield.css. See `acc19` in §5.

## Deviations from §15 whitelist

No deviations. This profile overrides only `--accent-*` (red ramp).

## Density posture

Comfortable density. No override.
