---
section: 8
title: Iconography
summary: Icon library, sizing, custom Zuga marks.
mikeCheckpoint: false
---

# 8. Iconography

> Authored: 2026-04-25
> Mike checkpoints: none (Antonio-final)

All iconography decisions in this section are fully resolved. No checkpoints. Sizing references `--space-*` tokens from §7. Spacing & Layout. Custom mark variants reference §2. Brand Foundation (wm02).

---

## 8.1 Primary library — Lucide

**Lucide** is the primary icon library across all Zuga products.

Why Lucide:

- **MIT licensed** — no attribution required, safe for commercial product and open-core distribution.
- **Broad coverage** — covers the full range of UI primitives needed across 14+ studios without gaps (navigation, data, media, feedback, commerce, productivity).
- **Feather lineage** — Lucide is a maintained fork of Feather Icons. The visual language (open, geometric stroke icons) is well-established and familiar without being generic.
- **Consistent defaults** — every icon ships at 24×24px on a 24-unit grid with a 2px stroke. No per-icon sizing negotiation.
- **Framework-agnostic** — available as standalone SVG, Vanilla JS, React, Vue, and Svelte packages. Matches the Zuga multi-framework reality (Vue in studios, Astro on corp landing, Electron for overlay).

When sourcing icons, use the latest stable Lucide release pinned in the consuming repo's `package.json`. Do not vendor SVG copies unless the icon is a custom Zuga mark (see §8.4).

---

## 8.2 Grid and stroke

| Property | Value | Rationale |
|---|---|---|
| Grid | 24×24px | Lucide default. Aligns with `--space-6` (1.5rem / 24px) at base density. |
| Stroke weight | 2px | Matches body text weight. Inter/system-sans rendered at 16-18px medium weight reads as a similar visual mass to a 2px stroke outline at 24px. Thinner strokes (1px, 1.5px) feel anemic at this size. Thicker strokes (2.5px, 3px) read as heavy and misalign with the type weight. |
| Line cap | Round | Lucide default. Round caps read softer — consistent with the brand's non-aggressive tone. |
| Corner join | Round | Lucide default. |
| Fill | None (outline only) | Filled variants are reserved for active/selected state indicators only — an icon in its default state is always outline. |

**Filled / active variant rule:** When a filled version of an icon is needed to communicate a selected or active state (e.g., a bookmarked item, an active nav item), use the Lucide `*-fill` suffix variant where available, or apply `fill: currentColor; stroke: none` manually. Do not use filled icons as the default resting state.

---

## 8.3 Sizing tokens

Icon sizing maps to the `--space-*` scale established in §7. Spacing & Layout. Never hardcode icon dimensions — reference space tokens.

| Size class | Space tokens | px range | Typical use |
|---|---|---|---|
| `icon-xs` | `--space-3` to `--space-4` | 12–16px | Badge pips, inline label decorators, dense data tables, compact toolbar |
| `icon-sm` | `--space-4` to `--space-5` | 16–20px | Secondary actions, list item decorators, breadcrumb separators |
| `icon-md` | `--space-5` to `--space-6` | 20–24px | **Default.** Primary action buttons, nav items, card CTAs. The 24px end maps to the Lucide native grid. |
| `icon-lg` | `--space-8` to `--space-10` | 32–40px | Empty state illustrations, feature callouts, marketing icon grids |

The native Lucide SVG is 24×24. Rendering at `icon-xs` or `icon-sm` requires explicit `width`/`height` overrides on the `<svg>` element or a wrapping container — do not rely on CSS `font-size` scaling for SVG icons in production.

**Touch target minimum:** Icon-only interactive elements must have a minimum touch target of 44×44px regardless of the rendered icon size. Apply padding to the button/anchor wrapper, not the icon itself.

**Icon-only buttons require ARIA labels.** An `<button>` containing only an icon with no visible text label must have `aria-label` or `aria-labelledby`. See §13. Accessibility (cross-reference when authored).

---

## 8.4 Custom Zuga marks

Three categories of custom marks exist alongside the Lucide library.

**Z monogram and logo mark variants**

The Z monogram and logo mark glyph are defined in §2. Brand Foundation (wm02 checkpoint). These marks are not sourced from Lucide — they are produced by the brand design process and versioned as SVG assets in `packages/design-tokens/assets/` (path to be established when wm02 is finalized). Use only the canonical exported SVG; do not redraw from memory or approximate.

Z monogram variants by context:

| Variant | Use |
|---|---|
| Monochrome light | App icons, favicons, avatar slots on dark backgrounds |
| Monochrome dark | Avatar slots on light backgrounds, watermarks |
| Cyan-tinted | Product hero sections, marketing surfaces where brand color is the intent |
| Lockup (wordmark + glyph) | Full logo — header nav, email headers, social card OG images |

**ZugaShield**

ZugaShield is the custom security/trust mark used in ZugaID and authentication surfaces. It is not a Lucide icon. Treat it as a brand asset with the same versioning rules as the Z monogram.

**Sub-brand glyphs**

Studios that have distinct domain icons (e.g., ZugaTrader chart mark, ZugaGamer overlay icon) maintain their own glyph assets. These are allowed to diverge from Lucide's visual language for domain authenticity (a trading chart icon needs precision; a music waveform icon benefits from custom curves), but must conform to the 24×24 grid and 2px stroke weight to remain composable with Lucide icons in mixed contexts.

---

## 8.5 Usage rules

- **Render icons at their token-specified size.** Do not scale icons with `transform: scale()` in production — it blurs subpixel rendering on non-retina displays.
- **Icon color inherits `currentColor` by default.** Do not hardcode fill or stroke colors on icons. Set color on the parent element.
- **Do not mix icon libraries.** If Lucide has a close enough version of what you need, use it. Introducing a second icon library (Heroicons, Phosphor, etc.) for one-off icons creates visual inconsistency across studios. The only exception is custom Zuga marks (§8.4).
- **No emoji as icons.** Emoji rendering is platform-dependent, inconsistent across OS and browser, and cannot be styled with CSS. Use Lucide icons for all UI icon needs.
- **No rasterized icons.** All icons in UI are SVG. PNG/WebP icon sprites are not used.
