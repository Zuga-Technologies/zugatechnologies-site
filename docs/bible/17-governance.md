---
section: 17
title: Governance
summary: RACI, ADR process, semver rules, drift remediation.
mikeCheckpoint: false
---

# 17. Governance

> Authored: 2026-04-26
> Authoring task: see plan Task 27

This section owns the decision-making and change-management rules for the design system. The sub-brand contract's enforcement mechanisms are specified in §15; governance owns the human processes that wrap them.

---

## 17.1 Semver — strict definitions

The `@zuga/design-tokens` package follows semantic versioning. The definitions below are intentionally narrower than default semver convention — this is a design system, where "breaking" includes visual breaks, not just compile breaks.

### MAJOR — breaking change

A major version increment is required when any of the following occur:

- A token is **removed** from the public surface (`tokens.css`, any profile, any component CSS).
- A token is **renamed** (renaming = remove old + add new, which is a break for consumers using the old name).
- A token's **resolved value changes in a way that shifts downstream visuals detectably** — e.g., changing `--color-cyan-500` from `#06b6d4` to a different hex is a major change even if the name stays the same, because every consumer's rendered UI shifts without their consent.
- A profile CSS file is **removed** from the package.

Examples: removing `--accent-brand-subtle`, renaming `--surface-canvas` to `--surface-bg`, changing `--color-slate-900` to a different value.

### MINOR — additive change

A minor version increment is required when:

- A new token is **added** to `tokens.css` or a component CSS file.
- A new **profile** is added to `packages/design-tokens/src/profiles/`.
- A new **component CSS** file is added under `components/`.

No existing consumer code breaks. Consumers opt in to new tokens by using them.

Examples: adding `--feedback-neutral` and `--feedback-neutral-subtle`, adding `profiles/studio-audio.css`.

### PATCH — fix

A patch increment is required when:

- A token's value is **corrected** (e.g., a hex typo that was never the intended value, documented as a bug fix in release notes).
- A documentation comment inside a shipped file is corrected (typo fix, clarification).
- A CI script or lint rule is fixed without changing the token surface.

---

## 17.2 Deprecation lifecycle

Removing a token requires a minimum one-calendar-quarter window between deprecation and deletion.

### Step 1 — Deprecate (minor release N)

- Token stays in place and continues to work.
- Add a CSS comment: `/* DEPRECATED in vN.x.x — use --replacement-token instead. Will be removed in vN+1.0.0 */`.
- Add an entry to `CHANGELOG.md` in the deprecation section.
- Notify all registered consumers via the consuming-repos.json registry (manual announcement or automated GH issue).

### Step 2 — Confirm no active consumers (12-week minimum window)

- Run `drift-detect.mjs` to verify no registered consumer is still referencing the deprecated token.
- If consumers remain, extend the window. Do not remove until all registered consumers have migrated.

### Step 3 — Remove (major release N+1)

- Delete the token from `tokens.css` (or the relevant file).
- Bump to major version.
- Add entry to `CHANGELOG.md` in the breaking-changes section.

The 12-week minimum is a floor, not a target. If the system is early-stage and consumers can migrate quickly, you can compress the window — but document the compressed timeline in the release notes and get explicit confirmation from all affected consumers before proceeding.

---

## 17.3 ADR format

Architecture Decision Records live at `docs/bible/adr/`. T29 will populate the first set of ADRs. Every ADR uses this structure:

```yaml
---
id: <integer>
title: "<short decision title>"
date: "YYYY-MM-DD"
status: proposed | accepted | deprecated | superseded
context: "<one paragraph — what situation required a decision>"
decision: "<what was decided>"
consequences: "<what changes, what becomes easier, what becomes harder>"
supersededBy: <id>  # optional — only if status is superseded
---
```

ADRs are write-once. Once `accepted`, an ADR is never edited to change the decision — if the decision changes, write a new ADR that supersedes it and update the old ADR's status to `superseded` with a `supersededBy` pointer.

New token categories (not just new values within an existing ramp) require an ADR. See §17.4.

---

## 17.4 Token-add policy — anti-speculation rule

Tokens are added to the system when **≥ 1 component or profile actually uses them**. "We might need this later" is not a justification. Unused tokens create surface area that must be versioned, documented, and eventually deprecated. They also mislead engineers about what's available.

Additional rules:
- A new value in an existing ramp (e.g., adding `--color-cyan-925`) requires a MINOR version increment but does **not** require an ADR.
- A **new category** (e.g., adding a `--border-radius-*` semantic alias layer that doesn't currently exist) requires an ADR before the token is added. This prevents system architecture from drifting through accumulation.
- A new profile for a studio requires both a `consuming-repos.json` entry and a profile doc (`docs/bible/profiles/<slug>.md`) before the CSS is accepted. See §15 for the four-step gate.

---

## 17.5 RACI

RACI for design system decisions. This reflects the actual division of labor, not a template.

| Decision type | Antonio | Mike | Studio engineer | Other studios |
|---------------|---------|------|-----------------|---------------|
| Master accent hue (cyan family assignment) | A | R (veto) | — | I |
| Color ramp values (Tier 1 hex values) | R / A | C | — | I |
| Semantic token assignments (which ramp stop maps to which role) | R / A | C | — | I |
| New token category (requires ADR) | R / A | C | C | I |
| New value in existing ramp (minor add) | R / A | I | — | I |
| Studio accent ramp assignment | A | R (approval) | C | I |
| Per-studio component token overrides | — | I | R / A | I |
| Breaking change (major version) | R / A | C | — | I |
| Deprecation announcement | R / A | I | C | I |
| Profile registration gate (new profile) | A | — | R | I |
| ADR status changes | R / A | C | — | I |

**Key:**
- **R** — Responsible (does the work)
- **A** — Accountable (decision stops here; only one per row)
- **C** — Consulted (must be heard before decision)
- **I** — Informed (notified of outcome)

Mike's veto applies to brand decisions in his lanes (wordmark adjacency, hue assignments, voice in external-facing copy). Antonio holds accountability for shipped visual decisions across the system. Studio engineers own their integration work and are responsible for passing CI before requesting merge.

---

## 17.6 Quarterly drift audit cadence

`packages/design-tokens/scripts/drift-detect.mjs` runs nightly (GH Actions cron, T19). This catches mechanical drift automatically.

The **quarterly audit** (every 12 weeks) is the human-in-the-loop sweep:

1. Antonio reviews the accumulated drift-detect output for the quarter.
2. Any consumer flagged for drift (outdated version, non-registry token import) receives a filed GitHub issue with a migration target date.
3. Consumers that have been on a deprecated token for longer than the 12-week window get escalated — their profile is reviewed for forced migration in the next major release cycle.
4. Quarterly audit results are recorded as a comment in the relevant ADR or as a new short ADR if the audit reveals a systemic issue.

The quarterly cadence aligns with the deprecation lifecycle window, so a token deprecated at the start of Q1 is eligible for removal at the Q2 audit if all consumers have migrated. This creates a predictable rhythm for consumers to plan their upgrade work.

Phase 2 platform expansion (Style Dictionary, native formats) is a governance roadmap item for the quarterly review when native consumer repos come online. See §16 for the migration shape.
