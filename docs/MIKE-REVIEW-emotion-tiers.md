# 🛑 Mike Review — Emotional Design tier assignments (Bible §19.6)

**Assignee:** @TacoNips
**Label:** `mike-review`
**Scope:** one decision per consumer — the *baseline* emotion tier (§19). Per-surface elevations (e.g. Ludus' delight surfaces) are already documented in the profiles; they are not part of this review.
**What this is NOT:** the four-tier model, the permission matrix, and the token mechanics are technical/locked (ADR-0004, R/A = Antonio). You are only confirming *which tier each product gets*.

---

## How to respond

For each row: **✅ approve** (leave as-is) or **✏️ modify** (write the tier you want + one line why). Three ways to send back: edit this file in a PR, comment inline, or tell Antonio verbally and he'll PR it. On approval, the value is written into each profile's `emotionTier` frontmatter (same rc → approve → propagate flow as the accent checkpoints).

**The four tiers (one-line each):**
- `restraint` — get out of the way. State feedback only, no ceremony. (The default floor.)
- `trust` — overcome skepticism in high-stakes domains. Polish, no play. (Phantom.)
- `premium` — sell quality / convert. Polished first impression. (Revolut.)
- `delight` — build a habit. Mascot, celebration, character. (Duolingo.)

---

## Decisions

| # | Product | Proposed tier | Antonio's reasoning | Your call |
|---|---|---|---|---|
| et01 | zugatechnologies-site (corp) | `premium` | Marketing first impression sells the company. | ☐ ✅ ☐ ✏️ ___ |
| et02 | ZugaApp (product-shell) | `premium` | Product home + onboarding is the first impression for every studio. | ☐ ✅ ☐ ✏️ ___ |
| et03 | **Spiritus** (ZugaLife) | `delight` | Habit product — journaling, check-ins, streaks. Textbook Duolingo case. | ☐ ✅ ☐ ✏️ ___ |
| et04 | ZugaHealth | `trust` | Biometrics are clinical/high-stakes; wellness-family delight accents allowed. | ☐ ✅ ☐ ✏️ ___ |
| et05 | ZugaLearn | `delight` | Education / repeated practice — Duolingo-adjacent. | ☐ ✅ ☐ ✏️ ___ |
| et06 | ZugaTrader | `trust` | Real money, dense data. Polish builds confidence; no celebration. | ☐ ✅ ☐ ✏️ ___ |
| et07 | ZugaTraderOverlay | `restraint` | Composited over live trading — glanceable only. | ☐ ✅ ☐ ✏️ ___ |
| et08 | ZugaShield | `trust` | Security. Polish = trust signal; ceremony undermines it. | ☐ ✅ ☐ ✏️ ___ |
| et09 | ZugaImage | `premium` | Creative tool; polish sells the craft. | ☐ ✅ ☐ ✏️ ___ |
| et10 | ZugaVideo | `premium` | Creative family (sibling to Image). | ☐ ✅ ☐ ✏️ ___ |
| et11 | ZugaMotion | `premium` | Creative family (sibling to Image). | ☐ ✅ ☐ ✏️ ___ |
| et12 | ZugaAudio | `premium` | Music tool; delight accents allowed, not the baseline. | ☐ ✅ ☐ ✏️ ___ |
| et13 | ZugaCode | `restraint` | Dev tool, friction-averse pros — low ceremony. | ☐ ✅ ☐ ✏️ ___ |
| et14 | ZugaCloud | `restraint` | Infra / ops surface. | ☐ ✅ ☐ ✏️ ___ |
| et15 | ZugaForge | `premium` | Build tool with a showcase surface. | ☐ ✅ ☐ ✏️ ___ |
| et16 | ZugaCraft | `premium` | Pending personality input; premium is the safe craft default. | ☐ ✅ ☐ ✏️ ___ |
| et17 | ZugaNews | `trust` | Journalistic neutrality; delight would read as editorializing. | ☐ ✅ ☐ ✏️ ___ |
| et18 | ZugaThemes | `premium` | Marketplace / showcase surface. | ☐ ✅ ☐ ✏️ ___ |
| et19 | ZugaData | `restraint` | Analytical; moments of insight, not celebration. | ☐ ✅ ☐ ✏️ ___ |
| et20 | ZugaOperator | `restraint` | System observability — near-internal. | ☐ ✅ ☐ ✏️ ___ |
| et21 | ZugaOverseer | `restraint` | Admin authority surface. | ☐ ✅ ☐ ✏️ ___ |
| et22 | **Ludus** (ZugaGamerOverlay) | `restraint` baseline | Live overlay is glanceable-only. Companion / onboarding / post-match recap already elevated to `delight` in the profile. | ☐ ✅ ☐ ✏️ ___ |
| et23 | ZugaClaw (internal) | `restraint` | Internal infra. | ☐ ✅ ☐ ✏️ ___ |
| et24 | BugaBot (internal) | `restraint` | Internal tooling. | ☐ ✅ ☐ ✏️ ___ |

---

## Notes for your review

- **The two you'll care most about:** et03 (Spiritus = `delight`) and et06/et08 (Trader, Shield = `trust`, deliberately *not* playful). If you disagree anywhere, it's most likely whether a creative tool (Image/Video/Audio) should be `delight` instead of `premium` — that's the live question.
- **Default is `restraint`.** Anything you don't approve stays at the safe floor (no emotional-design budget) until you do. Nothing ships playful by accident.
- Full rationale, the permission matrix, and the balance rules (e.g. "wellness celebration must be honest, not Vegas") live in `docs/bible/19-emotional-design.md`.
