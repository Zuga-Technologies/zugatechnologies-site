---
id: 2
title: Master accent uses cyan-700 for WCAG AA on white
date: "2026-04-25"
status: accepted
context: "Master accent originally defaulted to cyan-500 (#06b6d4). Contrast against white text falls below WCAG AA 4.5:1."
decision: "Use cyan-700 (#0e7490) as --accent-brand at Tier 2 for contrast compliance. cyan-500 stays in Tier 1 ramp for any non-fg use."
consequences: "All Zuga primary buttons render at cyan-700, not cyan-500. Contract still permits sub-brand profiles to override --accent-brand."
---

# ADR-0002: Master accent uses cyan-700 for WCAG AA on white

## Context

The master Zuga brand hue is cyan — chosen for its precision, cool composure, and perceptual distance from the success-green, danger-red, and warn-amber feedback states already in use.

The first implementation defaulted `--accent-brand` to cyan-500 (`#06b6d4`), the mid-ramp reference stop. Cyan-500 is visually prominent and works well in marketing contexts on dark surfaces. The problem is interactive use on white: as documented in the §5.11 contrast table, cyan-500 against white fails WCAG SC 1.4.3 (Contrast Minimum) for normal-weight text at any size. Placing cyan-500 directly as a button background with white foreground, or as link text on a white surface, produces a non-compliant pairing. This is not a theoretical concern — primary buttons and text links are the highest-frequency interactive elements in the product.

A decision was needed to fix the semantic stop while preserving cyan-500 as the visual identity reference.

## Decision

`--accent-brand` at Tier 2 is set to cyan-700 (`#0e7490`). This is the default for all primary interactive elements: buttons, focus rings, active nav states, and text links on white or light surfaces.

cyan-500 (`#06b6d4`) remains in the Tier 1 ramp as the identity reference stop. It is used in marketing contexts where it appears on dark surfaces (wordmarks on slate-900, hero backgrounds), where its contrast clears AAA. It is never placed as text or interactive-state color on white or light surfaces.

The distinction is: cyan-500 is what the brand *looks like* in identity materials; cyan-700 is what the brand *functions as* in the UI. Both stops live in the same ramp and share the same hue character. Profiles that override `--accent-brand` for a sub-brand are not affected — this decision sets the master profile default only, and the sub-brand contract (§15.1) still permits `--accent-brand` overrides per profile.

## Consequences

**Enables:**
- All primary interactive elements across Zuga — buttons, links, focus rings, active nav states — clear WCAG SC 1.4.3 AA contrast on white surfaces without any component-level workarounds.
- The marketing identity (cyan-500) and the functional semantic token (cyan-700) are cleanly separated. Designers working in marketing and designers working in product UI are operating on different stops with different rules, and both are documented.
- Sub-brand profiles are unaffected. They override `--accent-brand` to their own ramp (emerald, mint, blue, etc.), so this decision only governs the master profile default.

**Costs:**
- Marketing and brand surfaces that reference cyan-500 as "the Zuga color" need to hold the distinction between identity stop and semantic stop in mind. The stop used in the wordmark (`#06b6d4`) is not the same stop rendered in primary buttons (`#0e7490`). This is a subtle split that requires ongoing documentation discipline to prevent identity materials from accidentally using the semantic stop, or product UI from accidentally using the identity stop.

## Alternatives Considered

**cyan-500 (`#06b6d4`) directly as `--accent-brand`.** The visually natural choice — it is the mid-ramp reference and the identity stop. Rejected: fails AA on white for normal-weight text and interactive element backgrounds (see §5.11). Using a non-compliant color as the primary interactive token creates an accessibility debt that grows with every new surface.

**cyan-600 (`#0891b2`) as `--accent-brand`.** One stop darker than cyan-500. Rejected: the §5.11 contrast table shows this stop sits close to the AA threshold with minimal margin for acceptable drift. It also reads as noticeably more somber than cyan-700 — the energy that makes cyan a strong brand accent is present at 700 and starts to fade at 600. Choosing the stop with more margin (700) is the correct call.

**blue-700 as a more accessible alternative.** A darker, clearly accessible stop in the blue family. Rejected: blue is assigned to ZugaCode (see §5.4 hue confirm and `acc09` in §5.10 accent assignments). Using blue-700 as the master brand accent would create a collision with the ZugaCode dev-tools convention — the brand accent and the developer-studio accent would be perceptually indistinguishable in mixed navigation.
