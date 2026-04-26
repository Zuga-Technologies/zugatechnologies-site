---
id: 1
title: Establish three-tier token architecture
date: "2026-04-25"
status: accepted
context: "Zuga has 14+ studios each wanting custom colors. Without structure, every studio would hard-code values, making global rebrand impossible."
decision: "Adopt a three-tier token system: Tier 1 primitives (raw values), Tier 2 semantics (role-mapped aliases), Tier 3 component tokens (component-scoped overrides). Studios may only override Tier 2 and Tier 3."
consequences: "All new tokens must be placed in the correct tier. Tier 1 values are frozen after Design Bible ratification. Lint rules enforce the constraint."
---

# ADR-0001: Establish three-tier token architecture

## Context

Zuga operates 14+ studios — ZugaLife, ZugaTrader, ZugaCode, ZugaImage, ZugaVideo, and more — each with its own visual identity. Left unstructured, each studio would hard-code hex values directly into component styles. The immediate cost is visual inconsistency. The long-term cost is worse: when the brand evolves or a single color value needs to change, there is no mechanical path to update all studios simultaneously. Every hard-coded stop becomes a manual search-and-replace across multiple repos with no guarantee of completeness.

A flat, single-tier token namespace would improve naming hygiene without solving the rebrand problem, because there is still no rule about which tokens a studio can change. Two tiers (primitives + semantics) get closer but leave component-level overrides in a grey zone. The three-tier model resolves all three concerns in a single decision. Full rationale for tier structure and the override whitelist is in §14 Code Tokens and §15 Sub-brand Contract.

## Decision

Adopt a three-tier token architecture:

**Tier 1 — Primitives.** Raw values with no semantic meaning. CSS custom properties prefixed by category (`--color-*`, `--space-*`, `--radius-*`, etc.). These are the full inventory of raw stops — ramp values, numeric scales, named constants. No component or profile code references Tier 1 directly; they are the foundation layer only.

**Tier 2 — Semantic.** Role-mapped aliases resolved from Tier 1. Prefixed by role (`--surface-*`, `--text-*`, `--border-*`, `--accent-*`, `--feedback-*`, `--density-*`). This is what component code uses. Tier 2 is split: `--accent-*` and `--density-*` are overridable; everything else is locked.

**Tier 3 — Component.** Per-component property overrides scoped to a single component, prefixed `--component-{name}-{property}`. Overridable per-profile.

Studios and profiles may override only `--accent-*`, `--density-*`, and `--component-*`. All other token prefixes are locked. The lint enforcer at `packages/design-tokens/scripts/tokens-lint.mjs` implements this constraint mechanically and runs on every PR.

## Consequences

**Enables:**
- Global rebrand via Tier 1 edit + Tier 2 semantic re-map, without touching any component or studio code.
- Studio personality via the `--accent-*` override whitelist — studios get identity without forking the system.
- Lint enforcement that catches violations before merge; no override slip goes undetected.
- Profile documentation gate: the Astro Zod schema in `src/content.config.ts` requires every profile to have a companion doc, so implementation and documentation are coupled.

**Costs:**
- Every new token must be assigned a tier before it can be used. Unclassified tokens are rejected by lint, so there is no "add it quick and classify later" path.
- Tier 1 primitives are frozen after Design Bible ratification. Adding a new ramp stop requires a structured proposal; arbitrary stop additions are not permitted.
- Engineers unfamiliar with the three-tier model will need onboarding before contributing tokens. The tier boundary is not self-evident from the CSS alone — this document and §14 are load-bearing references.

## Alternatives Considered

**Single-tier flat tokens.** One flat namespace of named variables. Simpler to start, no learning curve. Rejected because there is no structural rebrand path: changing a primitive value requires tracing every use manually, and nothing prevents components from using raw hex values alongside named variables. Drift is inevitable.

**Two tiers (primitives + semantics only).** Drop Tier 3; component overrides must be handled at Tier 2. Rejected because Tier 2 is a shared layer — adding component-specific entries to a shared semantic namespace pollutes it. Component-level customization (e.g., button radius differing per studio) needs its own scoped prefix to stay coherent and auditable.

**Let each studio fork the `@zuga/design-tokens` package.** Each studio maintains a copy and diverges as needed. Rejected because this is the failure mode we are explicitly preventing. Divergent forks mean no global rebrand, no consistent contrast guarantees, no shared enforcement, and version drift that compounds over time. The sub-brand profile system (§15) is the correct alternative: expressive identity within a bounded, auditable space.
