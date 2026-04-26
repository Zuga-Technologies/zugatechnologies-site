---
profile: studio-trader
consumer: ZugaTrader
family: markets
accentRamp: emerald
rationale: "ZugaTrader is markets-data-heavy; emerald separates brand from feedback.success which uses green."
deviations: []
---

# studio-trader Profile

## Persona

ZugaTrader users are active traders and market analysts scanning multiple data streams simultaneously — price charts, technical analysis signals, weather derivatives, prediction market positions. The mental state is alert, pattern-seeking, and time-pressured. The UI must pack information into as little vertical space as possible without losing scannability. A misread number or a missed signal has a real cost.

## Accent rationale

ZugaTrader uses emerald, not green. Green is reserved for `feedback.success` (a profitable trade, a confirmation alert) — using the same hue as brand would create ambiguity at the worst possible moment: is this button brand-styled, or is the position up? Emerald is adjacent enough to read "markets/money" but distinguishable from pure green in side-by-side UI. See `acc05` in §5. Reference: studio-trader.css notes ADR-0003.

## Deviations from §15 whitelist

No deviations. This profile overrides `--accent-*` (emerald ramp) and `--density-*` (compact posture).

## Density posture

Compact density — ZugaTrader is the data-heaviest studio in the system. The CSS declares `--density-comfortable: 0.9375; --density-compact: 0.8125;` to compress vertical rhythm and allow more data rows per viewport.
