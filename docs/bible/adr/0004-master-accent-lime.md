---
id: 4
title: Master accent unified to acid lime
date: "2026-06-30"
status: accepted
supersedes: 2
context: "The corp landing (zugatechnologies.com) rendered in cyan while the product (zugabot.ai) rendered in acid lime. The two read as different companies. Cyan was the documented master accent (ADR-0002); lime was the shipped product reality."
decision: "The single master Zuga accent is acid lime, lime-400 #a3e635, always paired with a dark foreground #0a0a0a. Cyan is retired as brand and retained only for --feedback-info."
consequences: "Corp landing recolored to lime and shipped live. tokens.css gains a lime ramp; --accent-brand, --surface-brand, --text-link, --border-focus resolve to lime; --accent-fg flips to dark. Studios keep their own accent overrides (unaffected). Cyan ramp stays as a Tier-1 primitive for the info/feedback state."
---

# ADR-0004: Master accent unified to acid lime

## Context

Zuga ran two brand accents at once. The corporate landing at zugatechnologies.com used cyan (`#06b6d4`), documented as the master accent in ADR-0002 and §4.2. The product at zugabot.ai used acid lime (`#a3e635`) — the "reality over spec" operator decision recorded in the product's own theme (lime-400 with dark foreground). A visitor moving from the marketing site to the product saw two different color identities, reading as two different companies.

Earlier framing treated this as an intentional "Branded House" split (corp cyan vs product lime). In practice it was drift, not design — the bible never actually described a cyan/lime split; it described a single cyan master that the product had quietly diverged from. The correct fix is to pick one master and unify, not to formalize the drift.

Lime is the stronger candidate for the single master: it is what the live product already ships, it is more distinctive than cyan in the AI-tools space, and near-black + acid-lime is the look the product is already known by. Cyan's remaining useful job is as the info/feedback state hue, where it is well separated from success-green, warn-amber, and danger-red.

## Decision

The single master Zuga brand accent is **acid lime, `--color-lime-400` (`#a3e635`)**, paired with a **dark foreground `--accent-fg: #0a0a0a`**.

Unlike the former cyan master (ADR-0002), lime does not need a separate darker functional stop. Cyan-500 is a mid-tone that failed WCAG AA as a filled element with white text, which forced ADR-0002 to push `--accent-brand` down to cyan-700. Lime-400 is light-forward: a filled lime-400 element with a **dark** foreground (`#0a0a0a`) clears WCAG AAA (~13:1) on both light and dark surfaces. So for lime the identity stop and the functional stop are the same stop — the model is inverted (light accent + dark foreground) rather than (dark accent + white foreground).

The one caveat lime introduces: lime-400 must never be used as **text on a light surface** (light-on-light fails contrast). For accent text on light surfaces, use lime-700 (`#4d7c0f`), which is what `--text-link` resolves to in light mode. On dark surfaces, accent text uses lime-400 directly.

Cyan is retired as a brand accent and retained as a Tier-1 primitive serving `--feedback-info` only.

## Consequences

**Enables:**
- One brand identity across the corp landing, the product shell, and every teammate-facing asset. Site and product read as one company.
- The design tokens now match shipped reality — `tokens.css` documents lime as master instead of describing a cyan the product had already abandoned.

**Costs / follow-ups:**
- `tokens.css` gains an 11-stop lime ramp; `--accent-brand`, `--accent-brand-subtle`, `--accent-brand-strong`, `--surface-brand`, `--text-link`, `--text-link-hover`, `--border-focus`, and `--shadow-ring` repoint to lime; `--accent-fg` flips from white to `#0a0a0a`. Dark-mode swaps in `tokens-dark.css` follow (bright lime links on dark, lime-950 brand surface).
- The design-tokens package needs a version bump; its publish is currently 403-blocked (Mike issue #2), so the bump lands in source without auto-publishing.
- OG social-share raster cards and any external assets still rendering cyan are a separate regeneration task.
- Sub-brand profiles are unaffected — all 17 studio profiles override `--accent-brand` to their own ramp, so only the corp/parent/product-shell surfaces (which inherit the master) change.

## Alternatives Considered

**Keep the cyan/lime split (corp cyan, product lime).** Formalize the two-accent state as an intentional Branded House. Rejected: it makes the company look like two brands to anyone crossing from site to product, and the split was never actually a decision — it was drift. A single master is the whole point of a Branded House.

**Unify on cyan instead (recolor the product to cyan).** Rejected: the product already ships lime, users know it as lime, and recoloring the live product is far more invasive than recoloring the near-monochrome marketing site. Lime is also more distinctive than cyan for an AI-tools brand.

**Introduce a darker lime functional stop (mirror ADR-0002 with lime-700 as `--accent-brand`).** Rejected: unnecessary. Lime-400 with a dark foreground already clears AAA as a filled element, so the identity stop can serve as the functional stop. Adding a second stop would reintroduce exactly the identity-vs-functional confusion ADR-0002 had to carry, for no contrast benefit. The only place a darker stop is needed is accent text on light surfaces, which `--text-link` (lime-700) already covers.
