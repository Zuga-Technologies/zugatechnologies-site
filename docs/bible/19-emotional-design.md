---
section: 19
title: Emotional Design
summary: The emotion-tier dial — how much delight, polish, and character a surface earns, matched to the job it does.
mikeCheckpoint: true
lastReviewed: "2026-05-23"
---

# 19. Emotional Design

> Authored: 2026-05-23
> Mike checkpoints: §19.6 (per-consumer tier assignments)

Now that anyone can ship features fast — APIs, no-code, AI models — *being useful is no longer a differentiator*. The durable edge is how a product **feels** when someone opens it: smooth, delightful, trustworthy, premium, or just like every other app. This section governs that layer.

The mistake is treating emotional design as a switch — "add delight everywhere." It is a **dial**. The right dose is set by the *job the surface does*, and for some surfaces the correct dose is **zero** — a security console or an in-game overlay is made worse by confetti. Emotional design is not granted automatically; like a sub-brand accent (§15), a surface **earns** its tier by category convention. The default is restraint.

Canonical reference: Don Norman, *Emotional Design* (visceral / behavioral / reflective levels). The three public exemplars this section draws on — Duolingo (delight → habit), Phantom (polish → trust), Revolut (polish → premium) — each used the *same* mechanics for a *different* job. That mapping is the whole point of the tier model below.

---

## 19.1 The four emotion tiers

Every consumer surface is assigned exactly one **emotion tier**. The tier is the surface's *job*, expressed as an emotional posture.

| Tier | Job | Public exemplar | Posture |
|---|---|---|---|
| **`restraint`** | Get out of the way | (dev tools, dashboards) | Essential state feedback only. Instant, glanceable, no ceremony. The **default floor** — a surface stays here until it earns more. |
| **`trust`** | Overcome skepticism in high-stakes domains | Phantom (crypto) | Polish *as a trust signal*. Smooth, tactile feedback; approachable, warm copy; build-for-people-not-pros. **No celebration, no bounce, no variable reward.** |
| **`premium`** | Sell quality / convert | Revolut (fintech) | Nail the first impression. Polished onboarding/welcome, tactile charts, dynamic-but-subtle motion. Communicates care without playfulness. |
| **`delight`** | Build a habit (repeated behavior) | Duolingo (learning) | The full kit — mascot/companion expression, micro-interactions, celebration of small wins, progress/streak motion, identity-affirming copy. |

The tiers are **cumulative in polish but not in playfulness.** `trust` and `premium` both demand high polish; neither permits the celebratory, character-driven mechanics of `delight`. A `trust` surface with confetti reads as *unserious*, which in a finance or security context destroys the exact thing the tier exists to build.

---

## 19.2 The Zuga Delight Kit

The shared emotional-design primitives live in **`@zuga-technologies/design-tokens`** as the Zuga Delight Kit. Surfaces consume these; they do not reimplement them per-repo (that is the forking failure mode §15 exists to prevent).

| Primitive | What it is | Tiers permitted |
|---|---|---|
| `ZugaSparkle` | One-shot sparkle/glow on a confirmation moment | premium, delight |
| `ZugaConfetti` | Celebration burst (achievement, milestone) | delight only |
| `ZugaProgressMotion` | Animated streak / level / progress fill | delight only |
| `ZugaTactileChart` | Drag-responsive chart with glow feedback (the Revolut move) | trust, premium, delight |
| `ZugaCompanion` | Mascot/character with expression states | delight only |
| `ZugaOnboardScaffold` | First-run reveal choreography | premium, delight (trust may use the reveal, not the flourish) |
| Voice + lip-sync avatar | TTS-driven avatar mouth animation | delight only |
| Identity / affirmation copy | "A vote for who you want to be" framing | delight only |

### Token contract

Delight motion is governed by canonical Tier 1 tokens in `@zuga-technologies/design-tokens/delight.css` (the `--zd-*` namespace). **These are the single source of truth.** Do not redefine `--zd-*` values in a consuming repo — import `delight.css` and consume them.

> **Drift note (2026-05-23):** the Delight Kit originated *inside ZugaGamerOverlay* with its own copy of these tokens, and its glow used an RGB-triple accent (`rgba(var(--accent), …)`) incompatible with the package's hex `--accent-brand`. The canonical `delight.css` resolves both: glow is expressed via `color-mix()` on `--accent-brand`, and the durations are documented against their `--motion-*` siblings. The physical relocation of the kit's `.vue` components out of ZugaGamerOverlay and into a shared consumer path is a tracked follow-up (Phase-2-style per-consumer migration), not yet done — see ADR-0004.

---

## 19.3 Per-tier permission matrix

What each tier **may** use. Anything not permitted at a tier is a lint/review violation for that surface.

| Mechanic | restraint | trust | premium | delight |
|---|:--:|:--:|:--:|:--:|
| Essential state feedback (instant) | ✅ | ✅ | ✅ | ✅ |
| Smooth tactile feedback (`ZugaTactileChart`) | — | ✅ | ✅ | ✅ |
| First-run reveal (`ZugaOnboardScaffold`) | — | reveal only | ✅ | ✅ |
| Subtle delight (`ZugaSparkle`, glow) | — | — | ✅ (sparing) | ✅ |
| Bounce / elastic easing on celebration | — | — | — | ✅ |
| Celebration burst (`ZugaConfetti`) | — | — | — | ✅ |
| Progress / streak motion (`ZugaProgressMotion`) | — | — | — | ✅ |
| Mascot / companion (`ZugaCompanion`) | — | — | — | ✅ |
| Voice + lip-sync avatar | — | — | — | ✅ |
| Variable-reward / identity copy | — | — | — | ✅ |

This matrix is consistent with §10 Motion's "no bounce on interactions" rule: celebratory bounce is permitted *only* at the `delight` tier and *only* on celebration states, never on interactive controls at any tier.

---

## 19.4 The `emotionTier` profile axis

Emotion tier is declared in each sub-brand profile (`docs/bible/profiles/<name>.md` frontmatter) alongside `accentRamp` and density — it is one more governed axis, not a free choice in component code.

```yaml
---
profile: studio-life
emotionTier: delight   # delight | trust | premium | restraint
---
```

**Default is `restraint`.** A profile with no `emotionTier` field resolves to `restraint` — a surface gets *no* emotional-design budget until a tier is deliberately granted. This mirrors how accent works: master cyan unless a studio *earns* an override.

**Per-surface elevation.** A single product often spans tiers across surfaces. The profile's `emotionTier` is the **baseline (chrome) tier**; specific surfaces may be elevated, documented in an *"Emotional posture"* section in the profile body. The canonical example is `overlay-gamer` (Ludus): the in-game overlay is `restraint` (it must not pull focus mid-game), but the companion, onboarding, and post-match recap are `delight`. Elevation is documented per-surface; it is never silent.

---

## 19.5 Balance rules — what the surface is *for* wins

These are the guardrails that keep emotional design serving the product instead of decorating it.

### Restraint is the default, delight is earned
A surface stays at `restraint` until a category convention justifies more. New surfaces do not start playful. (Mirrors §15: identity is earned, not granted.)

### Trust ≠ playful
In `trust` domains (finance, security, health, insurance) polish *is* the emotional payload. Bounce, confetti, and mascots are prohibited — they read as unserious and destroy the credibility the tier exists to build. The Phantom lesson is *polish*, not *play*.

### Wellness celebration must be honest, not Vegas
`delight` in a mental-health product (Spiritus) must reinforce intrinsic benefit, not manufacture compulsion. Variable-reward mechanics that exist only to drive engagement — without a real, named user benefit — are a prohibited dark pattern here. Celebration copy must point at something true ("you've meditated 12 of the last 30 days"), not just dispense dopamine. Spiritus's `useCelebration` already does this (identity language + intrinsic-benefit messaging that fights overjustification); that is the reference standard.

### Overlay budget: glanceable only
Any surface composited *on top of* a live application (game overlay, trading overlay) is `restraint` regardless of the product's headline tier. Motion competes with the host app, costs frame budget, and occludes content the user is actively using. Save the celebration for a surface the user is actually looking at (a post-session recap), never the live overlay.

### Performance is part of the feeling
A delightful animation that drops frames feels worse than no animation. All emotional motion honors `prefers-reduced-motion` (§10.5) and degrades to the instant state rather than a janky one.

---

## 19.6 Proposed tier assignments  🛑 MIKE-CHECKPOINT

Baseline (chrome) tier per consumer. These are **drafts pending brand sign-off** (per §17 RACI, brand-visible decisions are Mike-approved). Per-surface elevations are noted in the relevant profile body.

| Consumer | Proposed tier | Reason |
|---|---|---|
| zugatechnologies-site (corp) | `premium` | Marketing first impression sells the company. |
| ZugaApp (product-shell) | `premium` | Product home + onboarding is the first impression for every studio. |
| ZugaLife / **Spiritus** | `delight` | Habit product — journaling, check-ins, streaks. The textbook Duolingo case. |
| ZugaHealth | `trust` | Biometrics are higher-stakes/clinical; wellness-family delight accents permitted. |
| ZugaLearn | `delight` | Education / repeated practice — Duolingo-adjacent. |
| ZugaTrader | `trust` | Real money, dense data. Polish builds confidence; no celebration. |
| ZugaTraderOverlay | `restraint` | Composited over live trading — glanceable only. |
| ZugaShield | `trust` | Security. Polish = trust signal; ceremony would undermine it. |
| ZugaImage | `premium` | Creative tool; polish sells the craft. |
| ZugaVideo | `premium` | Creative family (sibling to Image). |
| ZugaMotion | `premium` | Creative family (sibling to Image). |
| ZugaAudio | `premium` | Music tool; delight accents permitted, not the baseline. |
| ZugaCode | `restraint` | Dev tool, friction-averse pros — low ceremony. |
| ZugaCloud | `restraint` | Infra / ops surface. |
| ZugaForge | `premium` | Build tool with a showcase surface. |
| ZugaCraft | `premium` | Pending personality input; premium is the safe craft default. |
| ZugaNews | `trust` | Journalistic neutrality; delight would read as editorializing. |
| ZugaThemes | `premium` | Marketplace / showcase surface. |
| ZugaData | `restraint` | Analytical; moments of insight, not celebration. |
| ZugaOperator | `restraint` | System observability — near-internal. |
| ZugaOverseer | `restraint` | Admin authority surface. |
| **ZugaGamerOverlay (Ludus)** | `restraint` (baseline) | Live overlay is glanceable-only. **Companion / onboarding / post-match recap elevated to `delight`** — see profile. |
| ZugaClaw (internal) | `restraint` | Internal infra. |
| BugaBot (internal) | `restraint` | Internal tooling. |

Until each row is approved, the profile's frontmatter `emotionTier` is left unset (resolving to the `restraint` floor). On approval, values propagate to profile frontmatter — same rc → approve → propagate flow as §15 accents.

---

## 19.7 Current implementations (reference)

What already exists, as the reference standard for each tier:

- **Spiritus (`delight`)** — `ZugaLife/frontend/composables/useCelebration.ts`: XP/streak/badge/level/prestige toasts, confetti, identity language, intrinsic-benefit messaging. `useAvatarSpeech.ts`: TTS + RMS-driven lip-sync avatar. This is the canonical `delight` implementation.
- **Ludus (`restraint` + `delight`)** — `ZugaGamerOverlay/src/components/delight/`: `ZugaCompanion`, `ZugaConfetti`, `ZugaSparkle`, `ZugaProgressMotion`, `ZugaTactileChart`. This is where the Delight Kit originated; it is being promoted upstream (§19.2 drift note, ADR-0004).

---

## 19.8 Accessibility

All emotional motion is subject to the §10.5 `prefers-reduced-motion` contract and the §13 accessibility requirements. Celebration that conveys information (a level-up, a streak milestone) must also surface that information in a non-motion, screen-reader-accessible form — the confetti is the garnish, not the message.
