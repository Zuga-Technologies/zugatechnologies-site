---
section: 2
title: Brand Foundation
summary: Wordmark, logo, color identity, brand voice anchors.
mikeCheckpoint: true
---

# 2. Brand Foundation

> Authored: 2026-04-25
> Mike checkpoints: wm01, wm02, wm03

## 2.1 Brand Architecture

Zuga Technologies operates as a **Branded House** — not a house of brands. Every product carries the Zuga prefix and inherits the master mark. Sub-brands get one accent color and adapt tone for their domain; they don't build separate identities.

```
                   ZUGA  (master · #06b6d4 cyan)
                     │
   ┌──────────────┬──┴───┬────────────────┬──────────────┐
   │              │      │                │              │
 wellness       markets  creative       knowledge   infrastructure
 (mint)         (emerald)(violet)       (indigo)    (slate/cyan)
   │              │      │                │              │
ZugaLife       ZugaTrader ZugaImage     ZugaLearn     ZugaCore
ZugaHealth     TraderOverlay ZugaVideo                ZugaCloud
                          ZugaMotion                  ZugaApp
                          ZugaAudio                   ZugaForge
                          ZugaThemes                  ZugaCraft
                                                      ZugaID
                                                      ZugaOperator
                                                      ZugaChat
                                                      ZugaCode
```

Sub-brands inherit: master wordmark, type system, spacing tokens. Sub-brands own: one accent hue, surface-level illustration style, domain-specific iconography.

## 2.2 Wordmark

The wordmark is the primary identity asset. It appears on every product surface, every public document, and every release artifact. The wordmark direction is [MIKE-CHECKPOINT-wm01].

> **🛑 MIKE-CHECKPOINT-wm01** — confirm wordmark direction
>
> | Field | Value |
> |---|---|
> | Antonio's draft | All-caps "ZUGA" set in a geometric sans — Inter or equivalent, weight 700, tracked +20. The wordmark is set in master cyan (#06b6d4) on dark surfaces and near-black (#0f172a) on light surfaces. No tagline lockup at small sizes. |
> | Alternates considered | Mixed-case "Zuga" (title case) — rejected: feels like a consumer startup, loses authority at product scale. Lowercase "zuga" — rejected: too casual for a company that runs financial tooling. |
> | Renders on | Corp landing header, ZugaApp navbar, all studio top-bars, email headers, GitHub org avatar, social card OG images |
>
> ✅ Approve → flip to `[MIKE-APPROVED-wm01: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

## 2.3 Logo Mark / Glyph

For contexts where the full wordmark doesn't fit (app icons, favicons, avatar slots), Zuga uses a single-glyph mark. The glyph treatment is [MIKE-CHECKPOINT-wm02].

> **🛑 MIKE-CHECKPOINT-wm02** — confirm logo mark / glyph treatment
>
> | Field | Value |
> |---|---|
> | Antonio's draft | Geometric "Z" constructed from two horizontal strokes and one diagonal — all strokes equal weight, rounded terminals, no serifs. The Z sits inside a square container with 15% padding. Background: master cyan (#06b6d4). Foreground: white (#ffffff). Corner radius: 22% of container width (feels like a modern app icon, not a logo stamp). |
> | Alternates considered | Circular container — rejected: squares tile better in OS icon grids and favicon contexts. Stylized Z with a cutting diagonal notch — rejected: too aggressive, doesn't read cleanly at 16px. Wordmark-only (no glyph) — rejected: doesn't work in 32px favicon or 1:1 avatar slot. |
> | Renders on | Browser favicon (16px, 32px), iOS/Android app icon (1024px source), GitHub org avatar, Discord server icon, ZugaApp PWA manifest icon |
>
> ✅ Approve → flip to `[MIKE-APPROVED-wm02: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

## 2.4 Master Color Anchor

The Zuga master accent hue is the single most visible brand signal across all surfaces. The master hue is [MIKE-CHECKPOINT-wm03].

> **🛑 MIKE-CHECKPOINT-wm03** — confirm master accent hue
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `#06b6d4` (Tailwind cyan-500). Passes WCAG AA against #0f172a (near-black surfaces) — measured contrast ≈7.35:1, which exceeds the 4.5:1 AA threshold and clears the 7:1 AAA threshold for normal text. Fails AA against white (#ffffff) — never used as a background color behind body text. Used for: primary CTAs, active nav indicators, focus rings, master wordmark on dark surfaces, hyperlinks in body copy. |
> | Alternates considered | `#0891b2` (cyan-600) — rejected: too somber for a tech-forward brand, loses energy at small sizes. `#22d3ee` (cyan-400) — rejected: fails WCAG AA on white backgrounds, feels juvenile. `#3b82f6` (blue-500) — rejected: indistinguishable from a dozen SaaS products; cyan is the differentiation. |
> | Renders on | Corp landing CTAs, ZugaApp primary buttons, ZugaApp navbar active states, ZugaThemes accent pills, focus ring system-wide, master wordmark on dark surfaces |
>
> ✅ Approve → flip to `[MIKE-APPROVED-wm03: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

## 2.5 Brand Voice Anchors

The full voice system lives in §3. These are the three anchors that apply at the brand level — the adjectives Mike can hold the whole system to:

1. **Direct.** We say what we mean in the fewest words that carry the meaning. If you can cut a word without losing anything, cut it.
2. **Technical but not exclusive.** We use precise vocabulary because our users are capable. We don't use jargon to signal status or exclude newcomers.
3. **Grounded.** We don't make claims we can't back up. We don't hype features that aren't shipped. We don't promise futures we haven't committed to building.
