---
profile: overlay-trader
consumer: ZugaTraderOverlay
family: markets
accentRamp: emerald
rationale: "ZugaTraderOverlay is a game overlay extension of the markets family; emerald keeps brand consistent with the desktop studio."
deviations: []
---

# overlay-trader Profile

## Persona

ZugaTraderOverlay users are watching financial markets while doing something else — typically monitoring positions during a gaming session or while a secondary workflow runs. The overlay surface is a trimmed-down read-only view of market data: price tickers, alerts, P&L snapshots. Unlike the full ZugaTrader studio, the overlay cannot host a full data dashboard; it shows the minimum signal the trader needs without forcing them to leave their current context.

## Accent rationale

ZugaTraderOverlay is a sibling of ZugaTrader in the markets family and uses the same emerald ramp. The brand must be consistent across both surfaces: a user running both the desktop studio and the overlay simultaneously needs to recognize the same brand accent on both. Emerald is the markets family color. See `acc18` in §5.

## Deviations from §15 whitelist

No deviations. This profile overrides only `--accent-*` (emerald ramp).

## Density posture

Comfortable density. No override. Note: the overlay-trader.css does not currently declare density variables, unlike studio-trader.css. Compact density for the overlay surface is a candidate for a future ADR if the overlay panel proves too tall for typical viewport constraints.
