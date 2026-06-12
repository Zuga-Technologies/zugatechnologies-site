---
profile: studio-life
consumer: ZugaLife
family: wellness
accentRamp: mint
rationale: "ZugaLife is the wellness studio. Master cyan reads clinical; mint reinforces calm and clean for a softer mental state."
deviations:
  - "--font-family-display = Fraunces (sanctioned sub-brand display face, §6.7) — body stays Inter"
emotionTier: delight
---

# studio-life Profile

## Persona

ZugaLife users are health-conscious adults building daily habits — hydration, sleep, movement, streaks. They open the studio first thing in the morning or last thing at night, in a soft mental state: motivated but not sharp. The UI needs to feel encouraging, not clinical. Interaction density is low; the screen should breathe. A single green checkmark on a habit can carry the emotional weight of the whole session.

## Accent rationale

ZugaLife is in the wellness family and mints over master cyan. Mint is calmer and warmer than cyan's crisp tech edge — it reads "healthy and clean" without the sterile connotation of blue-green medical palettes. The family logic is: wellness = mint. Studio-health shares the same family ramp for a related but distinct reason (biometrics vs. habits). See `acc03` in §5.

## Deviations from §15 whitelist

One deviation: `--font-family-display` is overridden to **Fraunces** (soft optical serif), a sanctioned sub-brand display face per §6.7. Body text stays Inter; Sora is replaced only at display scale (Wisp greeting hero, wellness headings). Geometric Sora reads clinical for a wellness register; Fraunces' warm old-style forms fit the calm, encouraging posture. Loaded only on Spiritus surfaces, never in the shared bundle. The mint accent ramp (`--accent-*`) is the only other override.

## Density posture

Comfortable density. No override.

## Emotional posture (§19)

Tier: **`delight`**. Spiritus (the ZugaLife product) is a habit engine — journaling, mood check-ins, meditation, streaks. It is the textbook Duolingo case: repeated behavior whose adherence depends on the user *feeling good* about showing up. The full Delight Kit is in scope — companion expression, celebration, progress/streak motion, identity-affirming copy.

**Honesty constraint (§19.5).** This is a mental-health product. Celebration must reinforce a real, named benefit, never manufacture compulsion. Variable-reward mechanics with no genuine user payoff are a prohibited dark pattern here. The existing `useCelebration` composable is the reference standard — its identity language and intrinsic-benefit messaging exist specifically to counter overjustification.
