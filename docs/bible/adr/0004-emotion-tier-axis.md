---
id: 4
title: Add emotion-tier axis and promote the Zuga Delight Kit upstream
date: "2026-05-23"
status: accepted
context: "Spiritus and Ludus already ship heavy emotional-design machinery (celebration, avatar, mascot, tactile charts), but the Delight Kit lives inside ZugaGamerOverlay with its own --zd-* motion tokens — a parallel motion system to the bible's --motion-*, the exact dual-layer drift the Design Bible exists to prevent. There was no governance over how much delight a surface should have, so 'add delight everywhere' was the implicit default."
decision: "Introduce an emotionTier axis (restraint | trust | premium | delight) declared per profile and defaulting to restraint, governed by a new §19 Emotional Design. Promote the Delight Kit's tokens into @zuga-technologies/design-tokens/delight.css as the canonical source, reconciled with --motion-* and --accent-brand."
consequences: "Emotion intensity becomes a deliberate, documented, per-surface decision instead of an ad-hoc one. The restraint default means surfaces earn delight rather than receive it by omission. Per-consumer tier values are Mike-checkpoint drafts until approved. The physical relocation of the kit's .vue components out of ZugaGamerOverlay is a tracked follow-up, not done in this ADR."
---

# ADR-0004: Add emotion-tier axis and promote the Zuga Delight Kit upstream

## Context

Two consumer products independently built rich emotional-design systems:

- **Spiritus (ZugaLife)** — `useCelebration.ts` (XP/streak/badge/level/prestige toasts, confetti, identity language, intrinsic-benefit messaging) and `useAvatarSpeech.ts` (TTS + lip-sync avatar).
- **Ludus (ZugaGamerOverlay)** — a `src/components/delight/` "Zuga Delight Kit": `ZugaCompanion`, `ZugaConfetti`, `ZugaSparkle`, `ZugaProgressMotion`, `ZugaTactileChart`.

Two problems followed. First, **no governance over dose.** The bible's §10 Motion is restraint-framed ("motion is functional, not decorative") and says nothing about *when a surface should be playful, polished, or plain*. Without a rule, the implicit default drifts toward "add delight everywhere" — actively wrong for a security console, a dev tool, or a live game overlay.

Second, **the Delight Kit forked the motion system.** Its `motion-tokens.css` defines a `--zd-*` namespace (durations, easings, glow) that parallels the canonical `--motion-*` Tier 1 tokens — and its glow tokens assume an RGB-triple accent (`rgba(var(--accent), …)`) incompatible with the package's hex `--accent-brand`. The kit's own header calls itself "single source of truth across all studios" while living inside one studio's repo. This is precisely the dual-layer drift the three-tier token system (ADR-0001) and the sub-brand contract (§15) exist to prevent: if other studios copy it, every copy diverges.

## Decision

**1. Emotion-tier axis.** Add `emotionTier: restraint | trust | premium | delight` to the profiles schema (`src/content.config.ts`), defaulting to `restraint`. Each tier maps to a job (get-out-of-the-way / overcome-skepticism / sell-quality / build-a-habit) and a permission matrix of which Delight Kit primitives it may use (§19.3). The default floor means a surface earns a higher tier deliberately; omission grants nothing. Per-surface elevation (one product spanning tiers) is documented in the profile body, with `overlay-gamer` (Ludus) as the canonical split example.

**2. New §19 Emotional Design.** Governs the tiers, the kit, the permission matrix, the balance rules (trust ≠ playful; wellness celebration must be honest; overlay budget is glanceable-only), and the per-consumer proposed assignments (Mike-checkpoint).

**3. Promote the Delight Kit upstream.** Canonical delight tokens move to `@zuga-technologies/design-tokens/delight.css` (new package export), with the `--zd-*` durations documented against their `--motion-*` siblings and the glow re-expressed via `color-mix()` on `--accent-brand` (no RGB triple). This is the single source of truth; consuming repos import it rather than redefining `--zd-*`.

RACI: the axis and token promotion are technical/Tier-2 changes — R/A = Antonio. The per-consumer tier *values* in §19.6 are brand-visible — Consulted/Approved by Mike.

## Consequences

**Enables:**
- A deliberate, auditable answer to "how much delight does this surface get," matched to the surface's job.
- One motion system again — the `--zd-*` fork has a canonical upstream home, killing the drift before it spreads to other studios.
- The `restraint` default encodes the right philosophy: delight is earned, not granted by omission (mirrors the accent-override model in §15).

**Costs:**
- Per-consumer tier assignments are drafts until Mike approves; until then unset profiles resolve to `restraint` (the safe floor), which is intentionally *under*-stated for studios that will end up `delight`/`premium`.
- The physical relocation of the kit's `.vue` components out of ZugaGamerOverlay, and switching that repo to consume the upstream tokens, is **not** done here. It is a Phase-2-style per-consumer migration requiring visual verification in a live Electron app, tracked as a follow-up. Until then, `delight.css` is the canonical token home but ZugaGamerOverlay still ships its local `.vue` implementations.

## Alternatives Considered

**Fold emotional design into §10 Motion.** Rejected: §10 is the restraint-first *mechanical* motion contract (durations, easing, reduced-motion). Emotional design is a *product-posture* decision with its own per-surface governance and a Mike-checkpoint table. Bolting it onto §10 would bury the dial inside the timing reference.

**A numeric 0–3 intensity dial instead of named tiers.** Rejected: a number invites "set it to 2" without engaging *why*. Named tiers carry the job (`trust` vs `premium` are both "high polish" but mean different things), which is the decision that actually matters.

**Leave the Delight Kit in ZugaGamerOverlay and document it as canonical-in-place.** Rejected: "canonical source that lives in one consumer's repo" is the definition of the fork we are preventing. Other studios cannot depend on a path inside ZugaGamerOverlay without coupling to it.

**Physically move the .vue components now.** Rejected for *this* change: relocating live components and rewiring imports in a shipping Electron app mid-change risks breakage and demands its own visual-verification pass. Token home + governance first (build minimal first); component relocation as a tracked wave.
