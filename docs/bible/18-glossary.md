---
section: 18
title: Glossary
summary: Definitions of bible-specific terms.
mikeCheckpoint: false
---

# 18. Glossary

> Authored: 2026-04-26
> Authoring task: see plan Task 27

Terminology used consistently across the design bible, codebase, and internal communications. When a term has a user-facing restriction (what NOT to call it in product copy), that is noted explicitly.

---

## Product names

These three are the highest-confusion cluster because they overlap in context. Keep them distinct.

### Zugabot

The autonomous agent — the cognitive core of the Zuga system. Runs as a daemon on the Mac Mini. Responsible for autonomous task execution, memory, tool use, and the agent loop. Zugabot is an *experiment* / infrastructure layer, not a user-facing product name in isolation. In user-facing copy, refer to specific capabilities by studio name, not "Zugabot."

See: `docs/bible/01-mission.md` for mission context.

### ZugaChat

The user-facing chat surface. The place where users interact with Zugabot's conversational layer. ZugaChat is distinct from Zugabot itself — ZugaChat is the interface, Zugabot is the engine. In product copy, say "ZugaChat" when referring to the chat feature, not "Zugabot."

### ZugaLife

The wellness studio. One of ~21 studios within ZugaApp. Focuses on habits, meditation, fitness, and health tracking. The accent ramp for ZugaLife is the mint/teal family (`--color-mint-*`). ZugaLife is a product name — users see it. The billing currency inside ZugaLife uses ZugaTokens (see below).

---

## Architecture terms

### Branded House

The brand architecture pattern Zuga uses. A single master brand (Zuga) with sub-brands that share the prefix (ZugaLife, ZugaTrader, ZugaCode, ZugaForge, etc.). The opposite of a "house of brands" (where each product has a fully independent brand identity). The Branded House pattern means every studio inherits the master accent color family and the Zuga prefix before introducing its own personality. See §2 for the full brand architecture.

### Drift

When a consumer's token usage diverges from what the registry says it should be. Drift has two forms:
1. **Version drift** — consumer is using an outdated `@zuga/design-tokens` version.
2. **Usage drift** — consumer is importing or defining tokens outside the `@zuga/design-tokens` package (e.g., copy-pasting `tokens.css` into their repo).

`drift-detect.mjs` catches both automatically on a nightly schedule. The quarterly audit is the human-in-the-loop check. See §17.6.

### Food court

The host shell — ZugaApp. The place studios (food trucks) live. This is an internal metaphor used in development conversations to describe the relationship between the ZugaApp shell and its studio units. **Do not use "food court" in user-facing copy.** Users see "ZugaApp."

### Food truck

A studio. The integrated unit that plugs into ZugaApp. Each studio is self-contained (its own backend, its own plugin, its own profile). **Do not use "food truck" in user-facing copy.** Users see the studio's product name (ZugaLife, ZugaCode, etc.).

### Master accent

The master Zuga accent hue: `--color-cyan-500` (hex `#06b6d4`) from the cyan ramp. The semantic token that carries this hue in production is `--accent-brand`, which resolves to `--color-cyan-700` (#0e7490) at the default level for AA compliance on white text. The production semantic uses cyan-700 rather than cyan-500 because cyan-700 is the lightest cyan stop that achieves WCAG AA 4.5:1 contrast against `--accent-fg: #ffffff` (per the comment in `tokens.css` at the `--accent-brand` declaration). "Master accent" = cyan family. Studio sub-brands use different ramps but are all sub-ordinate to this master identity.

### Mike checkpoint

A `[MIKE-CHECKPOINT-*]` marker in source files or design docs. Marks a decision that requires Mike's review before it can ship. Unresolved checkpoints appear in the output of `aggregate-mike-review.mjs`. Once approved by Mike, the marker flips to `[MIKE-APPROVED-*]`. There are 45 checkpoints in the design bible as of T26.

### Mike-approved

The resolved form of a Mike checkpoint. `[MIKE-APPROVED-*]` indicates the decision at that marker has received Mike's explicit approval and can proceed to production. See §17.5 for Mike's RACI role.

### OpenClaw

A third-party Manus-derived agent framework. **Not owned by Zuga.** The naming distinction matters: OpenClaw is the external tool Zuga integrates with; ZugaClaw is Zuga's own wrapper and tooling around it. Never conflate these in code, comments, or documentation. Also: never put Claude API tokens into OpenClaw — this risks account suspension. See memory rule `feedback_openclaw_subscription_ban.md`.

### Profile

A sub-brand override CSS file. Lives at `packages/design-tokens/src/profiles/<slug>.css`. Contains only the token overrides a studio is allowed to make (accent, density, component). Must be registered in `consuming-repos.json` and documented in `docs/bible/profiles/<slug>.md`. Enforced by `tokens-lint.mjs`. See §15 for the full sub-brand contract.

### Studios

The plug-in app units inside ZugaApp. Each studio is a self-contained product experience: its own backend, its own Vue plugin, its own profile. The ~21 active studios include ZugaLife, ZugaTrader, ZugaCode, ZugaImage, ZugaCloud, ZugaAudio, ZugaForge, and others. In user-facing copy, studios are called by their product name — never "apps," never "plugins," never "modules." Internally, "studio" and "food truck" are interchangeable.

### Tier 1 / Tier 2 / Tier 3 tokens

The three-layer token architecture:

- **Tier 1 — Primitives.** Raw values. Brand-agnostic. Color ramps, spacing scale, type scale, radii, shadows, motion durations, z-index levels, containers, breakpoints. Locked — no profile can redefine them. Prefix: `--color-*`, `--space-*`, `--radius-*`, `--shadow-*`, `--motion-*`, `--z-*`, `--container-*`, `--breakpoint-*`, `--type-*`, `--font-*`.

- **Tier 2 — Semantic.** Carry meaning. Resolved from Tier 1. This is what components use. Divided into locked (`--surface-*`, `--text-*`, `--border-*`, `--feedback-*`) and overridable (`--accent-*`, `--density-*`). Profiles may only override the overridable Tier 2 group.

- **Tier 3 — Component.** Scoped to a single component. Declared in component CSS files under `packages/design-tokens/src/components/`. Overridable per profile. Prefix: `--component-{name}-{property}`.

See §14 for the full naming convention and code examples.

### ZugaClaw

Zuga's in-house wrapper and tooling around the OpenClaw agent framework. ZugaClaw is owned by Zuga Technologies. This is the distinction that matters in all code references and documentation. When you see `ZugaClaw`, it refers to Zuga's code. When you see `OpenClaw`, it refers to the third-party upstream.

### ZugaTokens

The user credit currency. Always written with capital Z and T. Used across all studios for premium features, API consumption, and marketplace transactions. In user-facing copy, always say "ZugaTokens" — never "credits," never "tokens" (lowercase, generic). The token economy is managed at the ZugaApp level, not per-studio.
