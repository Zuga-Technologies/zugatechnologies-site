---
section: 4
title: Color Foundations
summary: Tier 1 primitives only — full ramps, naming, dark-swap mechanics.
mikeCheckpoint: false
---

# 4. Color Foundations

> Authored: 2026-04-25
> Mike checkpoints: none (Tier 1 primitives are Antonio-final)

Tier 1 color primitives are brand-agnostic raw values. They have no meaning by themselves — meaning is assigned in §5 Color in Practice. The 13 ramps below are the complete primitive inventory. Hue confirm checkpoints (h01–h09) live in §5 where the *role* is decided. Hex values here are copied directly from `packages/design-tokens/src/tokens.css` — the bible documents what is shipped, it does not re-decide.

Every ramp runs 11 stops: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950. Lower numbers = lighter; higher numbers = darker. In dark mode, semantic roles that map to these ramps flip to higher-numbered stops (surface roles) or lighter stops (text roles). See §4.14 for dark-mode swap mechanics.

---

## 4.1 Slate — cool neutral

Role: the backbone neutral. All surface, text, and border tokens are drawn from this ramp.

| Stop | Hex |
|------|-----|
| 50   | `#f8fafc` |
| 100  | `#f1f5f9` |
| 200  | `#e2e8f0` |
| 300  | `#cbd5e1` |
| 400  | `#94a3b8` |
| 500  | `#64748b` |
| 600  | `#475569` |
| 700  | `#334155` |
| 800  | `#1e293b` |
| 900  | `#0f172a` |
| 950  | `#020617` |

Status: Antonio-final. No hue checkpoint — slate is the system neutral, not a brand color.

---

## 4.2 Cyan — master Zuga accent

Role: primary brand accent. Hue confirm in §5 (checkpoint h01). Default semantic stop is cyan-700 (`#0e7490`) for WCAG AA compliance on white surfaces; cyan-500 (`#06b6d4`) is the visual identity reference stop used in wordmarks and marketing on dark surfaces.

| Stop | Hex |
|------|-----|
| 50   | `#ecfeff` |
| 100  | `#cffafe` |
| 200  | `#a5f3fc` |
| 300  | `#67e8f9` |
| 400  | `#22d3ee` |
| 500  | `#06b6d4` |
| 600  | `#0891b2` |
| 700  | `#0e7490` |
| 800  | `#155e75` |
| 900  | `#164e63` |
| 950  | `#083344` |

Status: hue family Antonio-final; specific accent-stop confirmed in §5 h01.

---

## 4.3 Green — feedback.success

Role: success feedback only. Not used for brand or accent. Separate from emerald (which carries the markets convention).

| Stop | Hex |
|------|-----|
| 50   | `#f0fdf4` |
| 100  | `#dcfce7` |
| 200  | `#bbf7d0` |
| 300  | `#86efac` |
| 400  | `#4ade80` |
| 500  | `#22c55e` |
| 600  | `#16a34a` |
| 700  | `#15803d` |
| 800  | `#166534` |
| 900  | `#14532d` |
| 950  | `#052e16` |

Status: Antonio-final. No hue checkpoint.

---

## 4.4 Emerald — markets family accent

Role: ZugaTrader and ZugaTraderOverlay. Hue confirm in §5 (checkpoint h09). Visually distinct from green — emerald reads as "money/markets" where green reads as "success state."

| Stop | Hex |
|------|-----|
| 50   | `#ecfdf5` |
| 100  | `#d1fae5` |
| 200  | `#a7f3d0` |
| 300  | `#6ee7b7` |
| 400  | `#34d399` |
| 500  | `#10b981` |
| 600  | `#059669` |
| 700  | `#047857` |
| 800  | `#065f46` |
| 900  | `#064e3b` |
| 950  | `#022c22` |

Status: hue family in spec; specific stop confirmed in §5 h09.

---

## 4.5 Amber — feedback.warn

Role: warning feedback only. Not used for brand or accent. Dark-mode warning surfaces use amber-950 as the subtle background; text reverts to `--text-primary` (slate-50) for contrast — see §5 contrast table note.

| Stop | Hex |
|------|-----|
| 50   | `#fffbeb` |
| 100  | `#fef3c7` |
| 200  | `#fde68a` |
| 300  | `#fcd34d` |
| 400  | `#fbbf24` |
| 500  | `#f59e0b` |
| 600  | `#d97706` |
| 700  | `#b45309` |
| 800  | `#92400e` |
| 900  | `#78350f` |
| 950  | `#451a03` |

Status: Antonio-final. No hue checkpoint.

---

## 4.6 Red — feedback.danger / ZugaShield

Role: danger feedback and ZugaShield studio accent. Dual-use is intentional: security (ZugaShield) maps naturally to a danger-signal hue. Studio assignment confirmed in §5 acc19.

| Stop | Hex |
|------|-----|
| 50   | `#fef2f2` |
| 100  | `#fee2e2` |
| 200  | `#fecaca` |
| 300  | `#fca5a5` |
| 400  | `#f87171` |
| 500  | `#ef4444` |
| 600  | `#dc2626` |
| 700  | `#b91c1c` |
| 800  | `#991b1b` |
| 900  | `#7f1d1d` |
| 950  | `#450a0a` |

Status: Antonio-final. No hue checkpoint.

---

## 4.7 Mint — wellness family accent

Role: ZugaLife and ZugaHealth. Hue confirm in §5 (checkpoint h02). Mint (teal-leaning) reads as health/wellness, distinct from both cyan (brand) and green (success).

| Stop | Hex |
|------|-----|
| 50   | `#f0fdfa` |
| 100  | `#ccfbf1` |
| 200  | `#99f6e4` |
| 300  | `#5eead4` |
| 400  | `#2dd4bf` |
| 500  | `#14b8a6` |
| 600  | `#0d9488` |
| 700  | `#0f766e` |
| 800  | `#115e59` |
| 900  | `#134e4a` |
| 950  | `#042f2e` |

Status: hue family in spec; specific stop confirmed in §5 h02.

---

## 4.8 Violet — creative family accent

Role: ZugaImage, ZugaVideo, ZugaMotion. Hue confirm in §5 (checkpoint h03). Violet conveys creativity and visual production without the "brand" read of cyan.

| Stop | Hex |
|------|-----|
| 50   | `#f5f3ff` |
| 100  | `#ede9fe` |
| 200  | `#ddd6fe` |
| 300  | `#c4b5fd` |
| 400  | `#a78bfa` |
| 500  | `#8b5cf6` |
| 600  | `#7c3aed` |
| 700  | `#6d28d9` |
| 800  | `#5b21b6` |
| 900  | `#4c1d95` |
| 950  | `#2e1065` |

Status: hue family in spec; specific stop confirmed in §5 h03.

---

## 4.9 Blue — ZugaCode

Role: ZugaCode studio accent. Hue confirm in §5 (checkpoint h04). Blue is the canonical developer-tools convention. Kept separate from sky (cloud) for legible sibling distinction.

| Stop | Hex |
|------|-----|
| 50   | `#eff6ff` |
| 100  | `#dbeafe` |
| 200  | `#bfdbfe` |
| 300  | `#93c5fd` |
| 400  | `#60a5fa` |
| 500  | `#3b82f6` |
| 600  | `#2563eb` |
| 700  | `#1d4ed8` |
| 800  | `#1e40af` |
| 900  | `#1e3a8a` |
| 950  | `#172554` |

Status: hue family in spec; specific stop confirmed in §5 h04.

---

## 4.10 Sky — ZugaCloud

Role: ZugaCloud studio accent. Hue confirm in §5 (checkpoint h05). Sky reads as "cloud/infrastructure" — lighter and airier than blue, which reads as "code/IDE."

| Stop | Hex |
|------|-----|
| 50   | `#f0f9ff` |
| 100  | `#e0f2fe` |
| 200  | `#bae6fd` |
| 300  | `#7dd3fc` |
| 400  | `#38bdf8` |
| 500  | `#0ea5e9` |
| 600  | `#0284c7` |
| 700  | `#0369a1` |
| 800  | `#075985` |
| 900  | `#0c4a6e` |
| 950  | `#082f49` |

Status: hue family in spec; specific stop confirmed in §5 h05.

---

## 4.11 Magenta — ZugaAudio

Role: ZugaAudio studio accent. Hue confirm in §5 (checkpoint h06). Token name is `color.magenta.*`; the underlying CSS values are sourced from Tailwind's `fuchsia` ramp — this is noted in tokens.css and intentional.

| Stop | Hex |
|------|-----|
| 50   | `#fdf4ff` |
| 100  | `#fae8ff` |
| 200  | `#f5d0fe` |
| 300  | `#f0abfc` |
| 400  | `#e879f9` |
| 500  | `#d946ef` |
| 600  | `#c026d3` |
| 700  | `#a21caf` |
| 800  | `#86198f` |
| 900  | `#701a75` |
| 950  | `#4a044e` |

Status: hue family in spec; specific stop confirmed in §5 h06.

---

## 4.12 Orange — ZugaForge

Role: ZugaForge studio accent. Hue confirm in §5 (checkpoint h07). Orange conveys build heat and creation energy — appropriate for a forge/fabrication studio.

| Stop | Hex |
|------|-----|
| 50   | `#fff7ed` |
| 100  | `#ffedd5` |
| 200  | `#fed7aa` |
| 300  | `#fdba74` |
| 400  | `#fb923c` |
| 500  | `#f97316` |
| 600  | `#ea580c` |
| 700  | `#c2410c` |
| 800  | `#9a3412` |
| 900  | `#7c2d12` |
| 950  | `#431407` |

Status: hue family in spec; specific stop confirmed in §5 h07.

---

## 4.13 Indigo — ZugaLearn

Role: ZugaLearn studio accent. Hue confirm in §5 (checkpoint h08). Indigo reads as education and depth — the academic end of the blue spectrum, distinct from ZugaCode (blue) and ZugaCloud (sky).

| Stop | Hex |
|------|-----|
| 50   | `#eef2ff` |
| 100  | `#e0e7ff` |
| 200  | `#c7d2fe` |
| 300  | `#a5b4fc` |
| 400  | `#818cf8` |
| 500  | `#6366f1` |
| 600  | `#4f46e5` |
| 700  | `#4338ca` |
| 800  | `#3730a3` |
| 900  | `#312e81` |
| 950  | `#1e1b4b` |

Status: hue family in spec; specific stop confirmed in §5 h08.

---

## 4.14 Dark-mode swap mechanics

Tier 1 primitives are immutable — no stop value changes in dark mode. What changes is which stop the Tier 2 semantic token points to. The swap table below covers the Tier 2 roles defined in `tokens-dark.css`.

```
Light mode                     Dark mode
─────────────────────────────────────────────────────
--surface-canvas   slate-50    slate-950
--surface-primary  #ffffff     slate-900
--surface-secondary slate-100  slate-800
--surface-tertiary  slate-200  slate-700
--surface-inverse   slate-900  slate-50
--surface-brand     cyan-50    cyan-950
─────────────────────────────────────────────────────
--text-primary     slate-900   slate-50
--text-secondary   slate-700   slate-300
--text-tertiary    slate-500   slate-400
--text-muted       slate-400   slate-500
--text-link        cyan-700    cyan-400
--text-link-hover  cyan-800    cyan-300
─────────────────────────────────────────────────────
--border-subtle    slate-200   slate-800
--border-default   slate-300   slate-700
--border-strong    slate-400   slate-600
─────────────────────────────────────────────────────
--feedback-success-subtle  green-100   green-950
--feedback-warn-subtle     amber-100   amber-950
--feedback-danger-subtle   red-100     red-950
--feedback-info-subtle     cyan-100    cyan-950
─────────────────────────────────────────────────────
```

**Accent tokens** (`--accent-brand`, `--accent-brand-subtle`, `--accent-brand-strong`, `--accent-fg`) are unchanged between light and dark mode — the same stops hold sufficient contrast on both `--surface-primary` values. See §5 contrast tables for measured ratios.

**Dark-mode feedback subtle note:** On dark surfaces, the subtle-bg + main-fg pairings (e.g., green-700 on green-950) produce approximately 3.2:1 — below WCAG AA for normal text. The correct pattern on dark surfaces is: use the deep-stop subtle as background, pair with `--text-primary` (slate-50) as foreground, not the `--feedback-*` fg stop. This is formalized in §5 contrast tables.
