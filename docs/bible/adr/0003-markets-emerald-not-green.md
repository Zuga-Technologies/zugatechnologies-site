---
id: 3
title: Markets family uses emerald, not green
date: "2026-04-25"
status: accepted
context: "ZugaTrader (markets family) originally proposed green as accent, but green is reserved for feedback.success across all studios."
decision: "Markets family (studio-trader, overlay-trader) uses emerald-500/600 ramp. Green stays exclusively for feedback.success."
consequences: "Trade-success indicators and brand accent are visually distinguishable side-by-side in the same UI. No silent green-on-green collisions."
---

# ADR-0003: Markets family uses emerald, not green

## Context

ZugaTrader is the markets-family studio — trading signals, P&L display, position cards, order execution. When the initial accent assignment was drafted, the natural instinct was green: financial platforms are green, markets data is green, profit is green. The money-color convention is deeply embedded in fintech UI across Bloomberg, Robinhood, and Stripe.

The problem is that green is already taken. Across all 14+ Zuga studios, green is exclusively `--feedback-success`. It maps to the `--feedback-success` token (rendered at green-700 on white surfaces, green-600 elsewhere). This reservation is non-negotiable — feedback semantics must remain stable across the entire product. If ZugaTrader used green-500 as its studio accent, green would carry two independent meanings on the same screen: "this trade is the studio's brand context" and "this action succeeded." The two signals would be visually indistinguishable. A positive P&L row in emerald and a successful action state in green read as identical without close inspection — and close inspection is not something users should need.

The markets family needed a distinct green-adjacent hue that communicates financial data without occupying the feedback.success slot. See §5.9 for the full hue confirm record and §5.10 for the sub-brand accent assignment (acc05, acc18).

## Decision

The markets family — ZugaTrader (`studio-trader`) and ZugaTraderOverlay (`overlay-trader`) — uses the emerald ramp. The Tier 1 reference stop is emerald-500 (`#10b981`). The Tier 2 semantic stop for `--accent-brand` in markets-family profiles is emerald-700 (`#047857`), which achieves AA contrast on white.

Green (`--color-green-*`) is reserved exclusively for `--feedback-success` and its associated tokens (`--feedback-success-subtle`, `--feedback-success-fg`). No studio profile may use the green ramp for an accent assignment.

The markets-family convention applies to all current and future studios that deal primarily with financial data display. New studios entering this category inherit emerald without a new decision — the family rule is self-executing.

## Consequences

**Enables:**
- ZugaTrader UI can place a positive P&L indicator (emerald) and a successful order-execution confirmation (`--feedback-success`, green) side-by-side without visual collision. The two signals are perceptually distinct — different enough that the user reads them as different semantic categories.
- The family convention is additive: future markets-adjacent surfaces (hypothetical: ZugaPortfolio, ZugaOptions) enter the system with a known accent assignment and no new hue decision required.
- The rule is clear and checkable: green is never an accent ramp. Lint can enforce this if a profile attempts to use `--color-green-*` as an accent override.

**Costs:**
- The markets family cannot use the most obvious "money" color. Green-500 (`#22c55e`) is the immediate association for financial profit, and the studio must consistently use a hue that is adjacent but not identical. In practice, emerald reads as "money" to users — the fintech convention covers the green-to-emerald range — but this requires acknowledging that the most literal choice is not available.
- Studio designers working on ZugaTrader must know the rule and follow it, particularly when using accent colors for positive-movement indicators (up arrows, gain percentages). The instinct to reach for green must be checked against the feedback.success reservation every time.

## Alternatives Considered

**green-500 (`#22c55e`) directly as the markets accent.** The obvious choice — financial data is green by convention, and it is the clearest signal. Rejected: green is `--feedback-success` (see §4.3). Placing green-500 as ZugaTrader's studio accent means every ZugaTrader surface would visually echo a success state, regardless of whether any action has succeeded. The signal collision is not hypothetical; it appears in every P&L table, every price ticker, and every position card in the product.

**Teal as a compromise.** Teal sits between cyan and green and could serve as a neutral markets signal without touching either reserved ramp. Rejected: teal is perceptually close to the master cyan accent — close enough that teal on a shared surface (e.g., the ZugaApp shell showing a ZugaTrader widget) would read as "this is still master-brand cyan" rather than "this is a distinct markets-family surface." The purpose of a family override is to establish a distinct identity; teal fails that purpose.

**An unspecified "trading green."** Define the markets accent loosely as "a green-adjacent hue" and let individual surfaces pick stops. Rejected: a design system that permits ambiguous color choices at the studio level will drift into inconsistency. The emerald ramp is a specific, named inventory item in the token package (§4.4); using it by name locks the choice to a defined set of stops and makes the lint rule enforceable.
