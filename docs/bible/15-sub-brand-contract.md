---
section: 15
title: Sub-brand Contract
summary: Override whitelist, profile schema, lint enforcement.
mikeCheckpoint: false
---

# 15. Sub-brand Contract

> Authored: 2026-04-26
> Authoring task: see plan Task 27

The sub-brand contract defines exactly what a studio or product is allowed to change about the token system — and enforces it mechanically. The goal is expressive flexibility within a bounded space. "Flexibility" means studios have a distinct personality. "Bounded" means the base system never drifts into incoherence.

Governance and RACI for this contract live in §17. New-component upstream flow is at the bottom of this section.

---

## 15.1 Override whitelist

Only three token prefix groups are overridable in a profile CSS file:

| Prefix | What it covers | Example |
|--------|---------------|---------|
| `--accent-*` | Brand hue, subtle tint, strong shade, foreground | `--accent-brand`, `--accent-brand-subtle` |
| `--density-*` | Comfortable / compact density multipliers | `--density-compact` |
| `--component-*` | Per-component property overrides | `--component-button-radius` |

Everything else is **locked**:
- `--color-*`, `--space-*`, `--radius-*`, `--shadow-*`, `--motion-*`, `--z-*`, `--container-*`, `--breakpoint-*`, `--type-*`, `--font-*` (Tier 1) — locked. No profile may redefine any Tier 1 primitive. The full set is encoded verbatim in the `TIER1_PREFIXES` constant of `packages/design-tokens/scripts/tokens-lint.mjs`.
- `--surface-*`, `--text-*`, `--border-*`, `--feedback-*` (locked Tier 2) — no profile may override these. The semantic neutrals are a shared floor all studios stand on.

The rationale: accent identity is a studio's primary personality knob. Density is a layout knob. Component radius and spacing are finishing-touch knobs. The text and surface system is the coherence layer — if studios could override `--text-primary` freely, the bible's contrast guarantees would be unenforceable.

---

## 15.2 The six enforcement mechanisms

### 1. Whitelist of overridable prefixes (encoded in `tokens-lint.mjs`)

The lint tool at `packages/design-tokens/scripts/tokens-lint.mjs` parses every CSS declaration in a profile file. If a variable name falls under a locked category, the lint emits a violation and exits with code 1. The categories are defined in the constants at the top of the file:

```js
const TIER1_PREFIXES = ['color', 'space', 'radius', 'shadow', 'motion', 'z', 'container', 'breakpoint', 'type', 'font'];
const TIER2_LOCKED_PREFIXES = ['surface', 'text', 'border', 'feedback'];
const TIER2_OVERRIDABLE_PREFIXES = ['accent', 'density'];
const TIER3_PREFIX = 'component';
```

Anything not on `TIER2_OVERRIDABLE_PREFIXES` or `TIER3_PREFIX` is rejected.

Additionally, every overridable declaration must be preceded by a `/* WHY: ... */` comment with ≥ 20 characters of substantive rationale (no "TBD", "TODO", or "placeholder" text). This creates a human-readable audit trail inside the CSS itself.

### 2. `tokens-lint.mjs` runs on every PR via CI

The lint runs as a `pnpm lint` script on the `@zuga-technologies/design-tokens` package and as a consumer check via `zuga-tokens-lint` binary. T34 wires CI; the lint is available today as `pnpm --filter @zuga-technologies/design-tokens lint`. Any PR that touches a profile file must pass lint before merge.

### 3. Profile schema validation via Astro Zod (`src/content.config.ts`)

Every profile must have a companion documentation file at `docs/bible/profiles/<profile>.md`. The `profiles` content collection enforces this schema:

```ts
schema: z.object({
  profile: z.string(),
  consumer: z.string(),
  family: z.enum(['master', 'wellness', 'markets', 'creative', 'dev', 'cloud', 'music', 'forge', 'education', 'security', 'internal']),
  accentRamp: z.string(),
  rationale: z.string().min(40),
  deviations: z.array(z.string()).default([]),
})
```

`astro check` will fail if a profile doc is missing or has an invalid schema. This ties documentation to implementation — you cannot ship a new profile without the doc.

### 4. `consuming-repos.json` registry

Every consumer of `@zuga-technologies/design-tokens` must register itself in `consuming-repos.json` at the package root. The registry maps consumer repos to their profile choice. The lint tool's `lintConsumerDir()` function checks that the profile named in a consumer's `.zuga-design.json` manifest actually exists in the profiles directory. Unregistered consumers or consumers pointing at nonexistent profiles fail lint.

### 5. `drift-detect.mjs` nightly GH Action

`packages/design-tokens/scripts/drift-detect.mjs` runs nightly via GitHub Actions (T19 implementation). It checks that every registered consumer is using the current published version of `@zuga-technologies/design-tokens` and that no consumer has imported token CSS from outside the package (copy-pasting a token file is the failure mode it targets). Consumers failing drift detection are flagged as issues.

### 6. `aggregate-mike-review.mjs` checkpoint lint

`packages/design-tokens/scripts/aggregate-mike-review.mjs` scans all design bible markdown files (the `docs/bible/` tree, walked recursively by `walkMd`) for `[MIKE-CHECKPOINT-*]` markers and reports which are pending review. This prevents a profile from shipping a color decision that's still marked as awaiting Mike's approval. A profile that references an unresolved checkpoint stops the review flow — it does not fail CI directly, but it blocks the human sign-off step.

---

## 15.3 What a profile looks like

A minimal valid profile (no overrides, consuming defaults as-is):

```css
/* @zuga-technologies/design-tokens — profiles/overlay-gamer.css
 * Used by: ZugaGamerOverlay (in-game HUD)
 * Accent: master cyan (no override)
 */

/* No overrides — consumes Tier 2 defaults as-is */
```

A profile with a real accent override:

```css
/* @zuga-technologies/design-tokens — profiles/studio-trader.css
 * Used by: ZugaTrader
 * Accent: emerald (markets family)
 */

/* WHY: ZugaTrader uses emerald as its accent family per the markets color assignment
   in the design bible §4. Emerald is distinct from master cyan and communicates
   the financial/growth context of a trading product. */
--accent-brand:        var(--color-emerald-700);

/* WHY: Subtle tint for trader-specific chip and badge backgrounds.
   Emerald-100 at the same lightness level as cyan-100 in the master profile. */
--accent-brand-subtle: var(--color-emerald-100);

/* WHY: Strong shade used for hover/focus pressed state on accent surfaces.
   Emerald-800 maintains sufficient contrast against --accent-fg (#ffffff). */
--accent-brand-strong: var(--color-emerald-800);
```

Every declaration has a `WHY:` comment. The lint enforces this. No WHY comment → lint failure → PR blocked.

---

## 15.4 Four-step new-profile registration gate

### Step 1 — Author the profile CSS

Add `<profile-slug>.css` to `packages/design-tokens/src/profiles/`. Override only whitelisted token prefixes. Include a `WHY:` comment before every override declaration.

### Step 2 — Register the consumer

Add a row to `consuming-repos.json`:

```json
{
  "consumer": "ZugaTrader",
  "repo": "github.com/zuga-technologies/ZugaTrader",
  "profile": "studio-trader",
  "accentRamp": "emerald"
}
```

Also create a `.zuga-design.json` manifest in the consumer repo root with `{ "profile": "studio-trader" }`.

### Step 3 — Author the profile doc

Create `docs/bible/profiles/<profile-slug>.md` with all fields required by the Astro Zod schema (profile, consumer, family, accentRamp, rationale ≥ 40 chars, deviations). The `astro check` step will fail if this file is missing or malformed.

### Step 4 — Open a PR and pass CI

CI runs three checks:
1. `tokens-lint.mjs` on the new profile CSS — zero violations required.
2. `astro check` — zero type errors required. This validates the profile doc schema.
3. `drift-detect.mjs` — consumer registry must be consistent.

All three must pass before merge. There is no exception path. If any check fails, fix the violation and push again.

---

## 15.5 New-component upstream flow

When a studio engineer authors a new component that's specific to their studio:

1. Build the component locally with `--component-*` tokens scoped to that component.
2. If the component is useful to the broader system, open a proposal in the design-tokens repo with: the component name, the tokens it introduces, an ADR stub (see §17), and at least one consuming case.
3. Tokens are added to the system only when ≥ 1 component actually uses them (anti-speculation rule — see §17).
4. Studio-specific component tokens that will never be shared stay in the studio repo and don't need a bible entry. They must still use the `--component-*` prefix and must not conflict with existing system component tokens.

This upstream flow prevents the common failure mode where studios build parallel token systems that can never be reconciled with the canonical package.
