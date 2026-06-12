---
section: 6
title: Typography
summary: Type scale, font stacks, line-height, weight scale.
mikeCheckpoint: true
---

# 6. Typography

> Authored: 2026-04-25
> Updated: 2026-05-24 — typ01 resolved (display = Sora, body = Inter)
> Mike checkpoints: typ01 ✅ APPROVED 2026-05-24

Typography is functional first. Every scale decision below serves legibility and information density — not visual novelty. The display-face checkpoint (typ01) is now resolved: **Sora** for display and the Zugabot wordmark, **Inter** for body/UI. Everything else is Antonio-final.

---

## 6.1 Font stacks

Three stacks are in play. All values are sourced from `packages/design-tokens/src/tokens.css`.

### Sans (body, UI, labels)

```
"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
```

Token: `--font-family-sans`

Inter-first, system fallback. Inter is loaded from Google Fonts (`wght@400;500;600;700`, `display=swap`) — already requested in `index.html`; the fix is to actually apply it as the base `body` family (it was being shipped but never declared). The system stack renders during load (FOUT, not FOIT) and as the permanent fallback if the font request fails. Inter's neutral neo-grotesque metrics carry UI density without distracting at body size; the distinctive voice lives in the display face, not here.

### Mono (code, tokens, data)

```
ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace
```

Token: `--font-family-mono`

Used in: ZugaCode diff viewer, API key displays, ZugaTrader order IDs, any literal value that must be read character-by-character. `ui-monospace` is the modern entry that picks the OS native mono (SF Mono on Apple, Cascadia Code on modern Windows). Fallback chain covers pre-`ui-monospace` environments.

### Display (wordmark, hero copy, marketing headings)

```
"Sora", "Inter", system-ui, -apple-system, "Segoe UI", sans-serif
```

Token: `--font-family-display`

**Sora** (Google Fonts, geometric sans, weights 600–700). Loaded alongside Inter via `display=swap`; Inter is the fallback during load so the swap is between two real geometric sans faces, not into the system stack. Sora carries the brand voice at large sizes — clean geometric forms that read as purpose-built for an AI/tooling company without the cold neutrality of Inter at display scale.

> **✅ MIKE-APPROVED-typ01: 2026-05-24** — display typeface direction
>
> | Field | Value |
> |---|---|
> | Decision | Display + wordmark = **Sora** (geometric sans, Google Fonts). Body/UI = **Inter** (Google Fonts), applied as the base `body` family. The "no third-party fonts / system-first" posture is retired: both faces are real web fonts with the system stack as fallback only. |
> | Alternates considered | Space Grotesk — geometric display with more personality (quirky single-story `a`); strong contender, edged out in favor of Sora's cleaner, more neutral geometric forms. Space Mono — committed harder to the "agent/bot" identity; rejected as too narrow/dev-only at small sizes. Outfit — rounded, mascot-friendly; rejected as leaning cute over technical. System-only — rejected: zero distinctiveness at display size, which is the whole point of a display face. |
> | Renders on | The **Zugabot wordmark** (top nav, footer), Corp landing H1/H2, ZugaApp marketing hero, ZugaThemes promotional banners |

### Wordmark spec

The **Zugabot** wordmark is the canonical brand lockup (mark + word). The word is set in:

| Property | Value |
|---|---|
| Family | `--font-family-display` (Sora) |
| Weight | 700 (bold) |
| Tracking | `-0.025em` |
| Color | acid-lime `#a3e635` on dark chrome (`#0a0a0a`); never re-tinted through `--accent-brand` |
| Lockup | mark to the left, word to the right, optically centered |

Note: the product surface is **ZugaApp**; the brand is **Zugabot**. The wordmark always reads "Zugabot."

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
| Zugabot wordmark | display (Sora) | bold | tight |
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
- Hand-set the wordmark in any face other than Sora, or re-tint it off `#a3e635` — it is the canonical lockup (see 6.1 Wordmark spec).
- Apply `--font-family-display` (Sora) to body or UI copy — it is display-scale only; below `--type-scale-2xl` use the sans (Inter) stack.
- Use `--type-scale-xs` for body text — 12px body fails WCAG SC 1.4.4 (Resize Text) at default zoom on some platforms.
- Set body text weight above 500 — medium body text reads as stressed copy, not normal reading state.

---

## 6.7 Sub-brand display faces

Body (**Inter**) and the master display (**Sora**) are locked Tier-1 defaults for every studio — see §15. Differentiation runs through accent color, density, and components, *not* type. There is one bounded exception: a studio whose emotional register diverges hard from the master may adopt a **sanctioned display face**, documented here and registered as a `--font-family-display` override in its profile (see §15.1 carve-out). Body always stays Inter. This is a documented allow-list, not a free-for-all — a face not in the table below is a lint violation.

| Studio / theme | Display face | Body | Rationale |
|---|---|---|---|
| **Master** (all studios default) | Sora | Inter | Geometric, technical, distinctive. |
| **Spiritus** (ZugaLife — wellness default) | **Fraunces** (soft optical serif, wght 500–700, `opsz` auto) | Inter | Geometric Sora reads clinical/techy; wellness needs warmth. Fraunces' soft old-style forms read "care," not "dashboard." Applies to the Wisp greeting hero + wellness headings. |
| Spiritus — devotional preset (`data-theme="biblical"`) | EB Garamond (kept) | EB Garamond | Warm, readable book serif; correct for scripture reading. Cormorant Garamond is the sanctioned ceremonial alternate; Cardo if polytonic Greek/Hebrew glyphs are needed. |
| Spiritus — mystical preset (`data-theme="expressive"`) | Cormorant Garamond *italic* (recommended over Cinzel) | Inter | Cinzel is monumental Roman caps — title-only, weak as body. Cormorant italic is ethereal and scales to running text. |
| **Ludus** (ZugaGamerOverlay) | **Sora** (no sub-brand face) | Inter | In-game HUD runs at frame budget over live games (restraint, §19.4); a heavy bespoke webfont is the wrong call. Identity is the purple accent. A gaming display (Chakra Petch) is reserved for *non-gameplay* delight surfaces only (recap / onboarding) and is **not** adopted at this time. |

**Spiritus wordmark note:** the Zugabot brand wordmark stays Sora everywhere (§6.1) — the Fraunces decision governs Spiritus *content* display (hero, headings), not the corporate lockup.

**Load discipline:** Fraunces is loaded only on Spiritus surfaces (ZugaLife `index.html`), never globally — it must not enter the shared bundle for studios that don't use it.
