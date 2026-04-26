---
section: 6
title: Typography
summary: Type scale, font stacks, line-height, weight scale.
mikeCheckpoint: true
---

# 6. Typography

> Authored: 2026-04-25
> Mike checkpoints: typ01 (custom display face)

Typography is functional first. Every scale decision below serves legibility and information density — not visual novelty. One checkpoint (typ01) covers the deferred custom display face; everything else is Antonio-final.

---

## 6.1 Font stacks

Three stacks are in play. All values are sourced from `packages/design-tokens/src/tokens.css`.

### Sans (body, UI, labels)

```
system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
```

Token: `--font-family-sans`

System-first. No web font request, no FOIT, no external dependency. The stack renders the OS native UI font on every platform: San Francisco on macOS/iOS, Segoe UI on Windows, Roboto on Android. Consistent with ZugaApp's posture as a desktop-first progressive web app.

### Mono (code, tokens, data)

```
ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace
```

Token: `--font-family-mono`

Used in: ZugaCode diff viewer, API key displays, ZugaTrader order IDs, any literal value that must be read character-by-character. `ui-monospace` is the modern entry that picks the OS native mono (SF Mono on Apple, Cascadia Code on modern Windows). Fallback chain covers pre-`ui-monospace` environments.

### Display (hero copy, marketing headings)

The custom display typeface is [MIKE-CHECKPOINT-typ01].

> **🛑 MIKE-CHECKPOINT-typ01** — confirm display typeface direction
>
> | Field | Value |
> |---|---|
> | Antonio's draft | Deferred to Phase 2. `--font-family-display` currently aliases `--font-family-sans` (system stack). Rationale: introducing a web font in Phase 0 adds a network dependency and FOUT risk before the design system is stable. The system-font hero headings already read as intentional on modern OS renderers. Phase 2 will evaluate a geometric sans (candidates: Inter Display, Geist, or a custom variable font at weights 600–800) — but no font is selected until Phase 0 is sealed. |
> | Alternates considered | Inter (Google Fonts) — considered: excellent metrics, very legible; rejected for Phase 0 because every SaaS product uses Inter and differentiation matters at the display size; decision deferred not rejected. Geist (Vercel) — considered: geometric, modern; rejected for Phase 0 because brand association with Vercel is a concern given Zuga's infrastructure choices. Custom variable font — considered: maximum differentiation; rejected for Phase 0 because commissioning takes time and budget not yet allocated. |
> | Renders on | Corp landing H1/H2, ZugaApp marketing hero, ZugaThemes promotional banners — currently renders as system-ui at weight 700; will be swapped to a custom face once Phase 2 decision lands |
>
> ✅ Approve → flip to `[MIKE-APPROVED-typ01: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

---

## 6.2 Type scale

The scale uses a modular ratio of approximately 1.2 (minor third), anchored at 1rem / 16px base. Values are sourced from `packages/design-tokens/src/tokens.css`.

| Token | rem | px | Role |
|---|---|---|---|
| `--type-scale-xs` | 0.75rem | 12px | Caption, timestamp, badge label |
| `--type-scale-sm` | 0.875rem | 14px | Secondary body, tooltip, label |
| `--type-scale-base` | 1rem | 16px | Primary body text |
| `--type-scale-lg` | 1.125rem | 18px | Lead paragraph, emphasized body |
| `--type-scale-xl` | 1.25rem | 20px | Card title, section subtitle |
| `--type-scale-2xl` | 1.5rem | 24px | H3 / sub-section heading |
| `--type-scale-3xl` | 1.875rem | 30px | H2 / content heading |
| `--type-scale-4xl` | 2.25rem | 36px | H1 / page heading |
| `--type-scale-5xl` | 3rem | 48px | Display small (hero sub) |
| `--type-scale-6xl` | 3.75rem | 60px | Display medium (marketing H1) |
| `--type-scale-7xl` | 4.5rem | 72px | Display large (hero feature callout) |

**Rendered examples (approximate visual reference):**

- `xs` (12px): `Used for timestamps, badges`
- `sm` (14px): `Secondary body — sidebar annotations`
- `base` (16px): `Primary body — this line is 16px`
- `lg` (18px): `Lead paragraph`
- `xl` (20px): Card title
- `2xl` (24px): **Sub-section heading**
- `3xl` (30px): **Content heading**
- `4xl` (36px): **Page heading**
- `5xl` (48px): **Display small**

---

## 6.3 Weight inventory

| Token | Value | Role |
|---|---|---|
| `--font-weight-regular` | 400 | Body text, secondary labels |
| `--font-weight-medium` | 500 | Emphasized body, nav items |
| `--font-weight-semibold` | 600 | Card titles, UI labels, H3 |
| `--font-weight-bold` | 700 | H1/H2, CTA button labels, critical alerts |

**Weight pairing rules:**
- Body text (`--type-scale-base` or smaller): regular (400).
- Interactive labels and nav: medium (500) — enough weight to signal interactivity without the heaviness of bold.
- Headings at `--type-scale-2xl` and above: semibold (600) or bold (700). Bold is reserved for H1 and primary CTAs.
- Never use a weight below 400 — the system stack has no thin/light variants that render consistently across OS renderers.

---

## 6.4 Line-height

| Token | Value | Role |
|---|---|---|
| `--font-line-height-tight` | 1.1 | Display headings (5xl–7xl) — optical tracking at large sizes |
| `--font-line-height-snug` | 1.25 | H1–H3, card titles — compact but not cramped |
| `--font-line-height-normal` | 1.5 | Body text, UI copy — WCAG SC 1.4.12 compliant at 1.5 |
| `--font-line-height-relaxed` | 1.625 | Long-form reading surfaces (docs, legal copy, ZugaLearn lesson body) |

**Rationale:** Body at 1.5 satisfies WCAG Success Criterion 1.4.12 (Text Spacing) without override. Display headings at 1.1 prevent exaggerated gaps between wrapped lines at 48–72px that make multi-line heroes look broken. Relaxed at 1.625 is appropriate only for extended reading (ZugaLearn, ZugaNews article body) — using it in UI copy inflates layout without benefit.

---

## 6.5 Typography pairing table

Common surface-to-token pairings for reference. These are not exhaustive — they document the load-bearing cases.

| Surface | Size token | Weight | Line height |
|---|---|---|---|
| Corp landing H1 | `7xl` | bold | tight |
| Corp landing H2 | `4xl` | bold | snug |
| ZugaApp page heading (H1) | `4xl` | bold | snug |
| ZugaApp section heading (H2) | `3xl` | semibold | snug |
| ZugaApp card title | `xl` | semibold | snug |
| Body copy (all surfaces) | `base` | regular | normal |
| Studio sidebar label | `sm` | medium | normal |
| Badge / chip | `xs` | semibold | tight |
| ZugaLearn lesson body | `base` | regular | relaxed |
| ZugaCode diff line | `sm` (mono) | regular | normal |
| Tooltip | `sm` | regular | snug |

---

## 6.6 Typography do / don't

**Do:**
- Use `--font-family-mono` for any literal value — API keys, commit SHAs, token IDs, order numbers.
- Use `--font-line-height-normal` (1.5) for all body text.
- Pair semibold/bold with `--type-scale-2xl` and above.

**Don't:**
- Mix `--font-family-display` (currently the same as sans) with a distinct web-font size before typ01 is resolved — the swap needs to happen system-wide, not per-component.
- Use `--type-scale-xs` for body text — 12px body fails WCAG SC 1.4.4 (Resize Text) at default zoom on some platforms.
- Set body text weight above 500 — medium body text reads as stressed copy, not normal reading state.
