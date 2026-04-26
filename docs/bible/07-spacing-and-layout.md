---
section: 7
title: Spacing & Layout
summary: Spacing scale, container widths, grid, breakpoints, density.
mikeCheckpoint: false
---

# 7. Spacing & Layout

> Authored: 2026-04-25
> Mike checkpoints: none (Antonio-final)

All spacing and layout decisions in this section are fully resolved. No checkpoints. Values are sourced from `packages/design-tokens/src/tokens.css`.

---

## 7.1 Spacing scale — rationale

The scale is **4-based** (base unit = 4px = 0.25rem). Every step is a multiple or fraction of 4. This is the same base unit as Tailwind, Material, and most contemporary design systems — which matters because it means spacing values from any of those systems map without conversion.

**Why 4px and not 8px?** An 8-base system skips half-steps that UI components actually need: a 2px inset between a button and its outline ring, a 6px gap between an icon and a label. A 4-base system with fractional steps (0.5, 1.5) covers those cases without breaking the rhythm.

The scale is intentionally **sparse at the high end** — jumps from 16 → 20 → 24 → 32 are wide enough that they produce visible, purposeful rhythm breaks rather than incremental drift.

---

## 7.2 Spacing scale — full table

| Token | rem | px | Use |
|---|---|---|---|
| `--space-0` | 0 | 0px | Reset / flush |
| `--space-0_5` | 0.125rem | 2px | Focus ring inset, micro gap between icon + badge pip |
| `--space-1` | 0.25rem | 4px | Icon internal padding, badge horizontal inset |
| `--space-1_5` | 0.375rem | 6px | Icon + label gap, tight inline elements |
| `--space-2` | 0.5rem | 8px | Input internal padding (tight), compact row gap |
| `--space-3` | 0.75rem | 12px | Chip / tag padding, button padding Y |
| `--space-4` | 1rem | 16px | Default gap — card padding, form field spacing |
| `--space-5` | 1.25rem | 20px | Button padding X, list item padding |
| `--space-6` | 1.5rem | 24px | Card padding (comfortable), modal header padding |
| `--space-8` | 2rem | 32px | Section inner gap, sidebar item block padding |
| `--space-10` | 2.5rem | 40px | Large card padding, content well side padding (mobile) |
| `--space-12` | 3rem | 48px | Content section top/bottom padding (mobile) |
| `--space-16` | 4rem | 64px | Default section spacing on desktop |
| `--space-20` | 5rem | 80px | Section spacing between major content blocks |
| `--space-24` | 6rem | 96px | Hero section padding top/bottom |
| `--space-32` | 8rem | 128px | Maximum section breathing room (corp landing sections) |

---

## 7.3 Semantic spacing tokens

The token layer adds semantic spacing values on top of the raw scale. These are the values to reference in component code — not the raw `--space-*` tokens.

| Token | Maps to | Use |
|---|---|---|
| `--spacing-section` | `--space-16` (64px) | Default top/bottom padding between page sections |
| `--spacing-section-sm` | `--space-12` (48px) | Reduced section padding on compact views / mobile |
| `--spacing-section-lg` | `--space-24` (96px) | Hero and feature sections on corp landing |
| `--spacing-gap-tight` | `--space-2` (8px) | Tight component gap (icon + text, badge group) |
| `--spacing-gap-default` | `--space-4` (16px) | Standard component gap (card grid, form rows) |
| `--spacing-gap-loose` | `--space-8` (32px) | Loose layout gap (sidebar items, content blocks) |

---

## 7.4 Container widths

Three containers — narrow, page, and wide — cover all known layout needs.

| Token | rem | px | Use |
|---|---|---|---|
| `--container-narrow` | 42rem | 672px | Long-form text (ZugaLearn lesson, ZugaLife onboarding copy, legal pages). Reading width capped to prevent line lengths beyond ~75 characters. |
| `--container-page` | 72rem | 1152px | Standard page width. ZugaApp studio content, ZugaTrader dashboard, ZugaImage gallery. |
| `--container-wide` | 90rem | 1440px | Full-width marketing surfaces (corp landing sections). ZugaVideo wallpaper browser. Does not apply padding — layout components inside are responsible for gutters. |

All containers are centered with `margin-inline: auto`. Padding is applied by the layout wrapper, not the container token itself.

---

## 7.5 Breakpoints

| Token | Value | Behavior |
|---|---|---|
| `--breakpoint-sm` | 640px | Single-column stacks at `< sm`. Minimum supported width for mobile web. |
| `--breakpoint-md` | 768px | Two-column layouts unlock at `≥ md`. Tablet portrait target. |
| `--breakpoint-lg` | 1024px | Sidebar nav visible at `≥ lg`. Desktop default. |
| `--breakpoint-xl` | 1280px | Wide content layouts (ZugaTrader multi-column dashboard) at `≥ xl`. |
| `--breakpoint-2xl` | 1536px | Max-width clamping target. Layouts above this width use `--container-wide` centering and do not expand further. |

**Mobile-first convention:** all media queries are min-width. Components start from the narrowest case (`< 640px`) and progressively unlock layout complexity. Overlay components (ZugaGamerOverlay, ZugaTraderOverlay) are exempt — they target fixed desktop viewport sizes and do not need responsive breakpoints.

---

## 7.6 Density system

The token system exposes two density multipliers. Sub-brand profiles override `--density-*` to control spacing tightness for data-heavy studios.

| Token | Value | Profile |
|---|---|---|
| `--density-comfortable` | 1 | Default. All studios unless overridden. ZugaLife, ZugaLearn, ZugaCloud, corp landing. |
| `--density-compact` | 0.875 | Data-heavy studios. ZugaTrader dashboard, ZugaCode diff/review. Apply by multiplying spacing tokens: `calc(var(--space-4) * var(--density-compact))`. |

**How density is applied:** The multiplier is not applied globally — it is applied per-component in data-dense studio profiles. A card's padding, row height, and gap use density as a multiplier. Typography size tokens are NOT density-controlled — font sizes stay fixed regardless of density. Only spacing and layout dimensions shrink.

**Comfortable is the default** because most studios (wellness, creative, education) benefit from generous whitespace. Compact is an explicit opt-in for studios where information density is a feature, not a tradeoff.

---

## 7.7 Z-index stack

Z-index values are in the token system to prevent the ad-hoc integer race that breaks every long-lived UI codebase.

| Token | Value | Layer |
|---|---|---|
| `--z-base` | 0 | Default flow elements |
| `--z-dropdown` | 10 | Dropdown menus, select popups |
| `--z-sticky` | 20 | Sticky headers, pinned sidebars |
| `--z-modal-backdrop` | 30 | Modal overlay backdrop |
| `--z-modal` | 40 | Modal content |
| `--z-toast` | 50 | Toast notifications (above modals) |
| `--z-tooltip` | 60 | Tooltips (above everything) |

Rule: never hardcode a z-index integer in component code. Always reference a `--z-*` token. If a new layer is needed, add a token — don't increment a hardcoded value.

---

## 7.8 Shadow scale

Shadows provide elevation cues. They are subtle — the design language does not use aggressive drop shadows.

| Token | Use |
|---|---|
| `--shadow-xs` | Card resting state in light mode |
| `--shadow-sm` | Input focus ring supplement, small interactive element lift |
| `--shadow-md` | Card on hover, dropdown panel |
| `--shadow-lg` | Modal, flyout panel |
| `--shadow-xl` | Full-page overlay, popover anchored to viewport |
| `--shadow-ring` | Focus ring — 3px offset ring using `--border-focus` (cyan-500) |

**Dark-mode note:** Shadows are less perceptible on dark surfaces. In dark mode, elevation is primarily communicated through surface stops (`--surface-secondary`, `--surface-tertiary`) rather than drop shadows. Components should not rely solely on shadow for elevation communication.

---

## 7.9 Grid

No dedicated grid token exists — layout grid is handled by CSS Grid/Flexbox with gap values drawn from the semantic spacing tokens. The standard patterns:

- **Card grid:** `display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--spacing-gap-default);`
- **Sidebar + main:** `display: grid; grid-template-columns: 240px 1fr; gap: var(--spacing-gap-loose);`
- **Form fields:** `display: flex; flex-direction: column; gap: var(--spacing-gap-default);`
- **Inline group (icon + label, badge + text):** `display: flex; align-items: center; gap: var(--spacing-gap-tight);`

The sidebar column width (240px) is not a token — it is a layout-specific dimension that varies by studio. ZugaTrader uses a narrower sidebar (200px) in compact density mode; ZugaApp shell uses 240px.
