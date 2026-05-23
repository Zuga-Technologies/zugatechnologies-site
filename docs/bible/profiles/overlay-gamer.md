---
profile: overlay-gamer
consumer: ZugaGamerOverlay
family: master
accentRamp: cyan
rationale: "ZugaGamerOverlay is the gaming HUD; master cyan keeps it neutral so it doesn't fight game UI accents which vary by title."
deviations: []
emotionTier: restraint
---

# overlay-gamer Profile

## Persona

ZugaGamerOverlay users are active gamers with the overlay running on top of a live game session. The overlay surfaces real-time stats, wake-word-triggered panels, voice commands, and coaching feedback without pulling focus from the game. The persona is competitive or recreational gamers who tolerate exactly zero friction — the overlay must respond fast, dismiss fast, and never block gameplay. The mental state is fully absorbed in the game, not in Zuga.

## Accent rationale

ZugaGamerOverlay inherits master cyan — it earns no override. Game UI accents vary dramatically by title: a shooter uses red and black; a fantasy RPG might use gold and purple. Any strong Zuga accent would risk clashing with the game's own palette. Master cyan is the least opinionated anchor and the most likely to read as "overlay chrome" rather than "game element." See `acc17` in §5.

## Deviations from §15 whitelist

No deviations. This profile overrides only `--accent-*` — and in this case, not even that; it consumes Tier 2 defaults as-is.

## Density posture

Comfortable density. No override.

## Emotional posture (§19)

This profile is the canonical example of **per-surface tier elevation** (§19.4). Ludus (the ZugaGamerOverlay product) is one app spanning two opposite postures depending on whether the user is mid-game:

| Surface | Tier | Why |
|---|---|---|
| In-game overlay (live HUD) | **`restraint`** | Composited over an active game. Motion competes with the title, costs frame budget, and occludes gameplay. Glanceable state feedback only — no companion, no confetti, no bounce. |
| Companion panel (not mid-action) | **`delight`** | When the user is looking *at* Zuga, not the game, the mascot earns expression. |
| Onboarding | **`delight`** | First-run is the place to establish character and energy. |
| Post-match recap | **`delight`** | The user is reviewing, not playing — full celebration of wins/improvements is on-brand for gaming. |

The baseline `emotionTier` is `restraint` because the overlay is the default surface and must never pull focus. Delight is granted to the specific surfaces above, never to the live HUD. This is the "overlay budget: glanceable only" rule (§19.5) in practice.

Ludus is also where the Zuga Delight Kit originated (`src/components/delight/`); those primitives are being promoted into `@zuga-technologies/design-tokens` so other studios consume them instead of forking (§19.2, ADR-0004).
