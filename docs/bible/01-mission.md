---
section: 1
title: Mission & Principles
summary: The decision framework that resolves conflicts between bible sections.
mikeCheckpoint: false
---

# 1. Mission & Principles

> Authored: 2026-04-25
> Status: Sealed (no Mike checkpoint required)

## 1.1 Mission Statement

Zuga Technologies builds the tooling layer for the next generation of human-AI collaboration — a fleet of purpose-built studios under one identity, compounding toward a future where autonomous agents handle the cognitive load so people can spend time on what actually matters. We ship fast, stay coherent, and earn trust by working visibly in public. The studio fleet is the near-horizon bet; the far-horizon bet is that the autonomous-agent architecture underpinning all of it is a real research category worth proving, not just a product line.

## 1.2 Design Principles

These are operating principles — concrete enough that a designer or engineer can apply them in code review. When you're unsure whether a decision is on-brand, run it against this list.

### P1. Direct over decorative

Every visual or copy choice should earn its place by communicating something. Ornamentation that doesn't carry meaning is noise. A button label should say what happens; an illustration should clarify, not impress.

### P2. Coherent system, specialized surfaces

Studios share a common foundation (tokens, type scale, spacing, master mark) but adapt at the surface level for their domain. A wellness screen should feel different from a trading screen — same blood, different posture. Don't enforce uniformity where context calls for distinction.

### P3. Ship the thing, not the concept

Design for the version that ships in the next two weeks, not for a theoretical future state. Document aspirational states separately. Present-tense interfaces are built against present-tense constraints.

### P4. Accessibility is not optional

WCAG AA contrast is the minimum bar, not a stretch goal. Every interactive element has a focus state. Every image has alt text. This isn't a compliance checkbox — users who depend on these features have no fallback.

### P5. Hierarchy over entropy

One primary action per screen. One primary color per context. When everything competes for attention, nothing wins. Restraint in hierarchy is a feature, not a limitation.

### P6. Terminology is architecture

The words we use for products, features, and concepts are load-bearing. Changing "studios" to "apps" mid-product is a refactor, not a copy edit. Names go in the voice-and-tone dictionary before they go in the UI.

### P7. Earn trust incrementally

New patterns and visual directions need to prove themselves in one surface before they propagate. Speculative redesigns ship as experiments, not system-wide rewrites. Rollback paths are part of the design.

## 1.3 Anti-Patterns

These are explicit "we don't do this" rules with rationale. If a proposal lands in this list, it needs a compelling override argument before we proceed.

1. **No corporate-speak.** Phrases like "leverage synergies," "seamless experience," or "world-class" are banned from copy. They're signals that the writer doesn't trust the work to speak for itself.

2. **No dark patterns.** Misleading CTA placement, hidden cancellation flows, countdown timers on non-expiring offers — these destroy the long-term trust that drives retention. Short-term conversion gains aren't worth it.

3. **No inconsistent token usage.** Don't reach for hex values or raw pixel counts when a design token exists. Undocumented one-offs accumulate into maintenance debt that eventually breaks the system.

4. **No "just this once" accessibility shortcuts.** Skipping focus states, using color alone to convey state, or leaving aria labels empty with "we'll fix it later" is how permanently broken accessibility accumulates.

5. **No brand inflation.** Sub-brands don't invent their own primary color, typeface, or logo treatment outside the Branded House contract (§2). Each studio inherits the master mark and gets one accent color. That's the deal.

6. **No terminology drift.** "ZugaChat" and "Zugabot" are not interchangeable. "ZugaTokens" doesn't become "credits" in user-facing copy. "Studios" doesn't become "apps." See §3 terminology dictionary. Drift in one surface sets a precedent everywhere.

7. **No pattern sprawl.** If a new component pattern is created for one studio, it either goes into the shared component library immediately or it gets deleted after the specific use case resolves. Studio-local patterns that persist become orphans.

## 1.4 Decision Framework

When sections of this bible conflict with each other, follow this hierarchy:

**Accessibility > Brand Foundation > Mission > everything else.**

In prose: if a brand decision would compromise WCAG AA, accessibility wins. If a mission framing contradicts a brand-foundation rule already approved by Mike, the brand-foundation rule wins. Mission frames *why*; the bible body specifies *how*.

This hierarchy exists because:
- Accessibility failures have real users as victims and legal exposure as consequence.
- Brand-foundation decisions (§2) are the ones Mike has hard-veto authority on — once approved, they're stable contracts.
- Mission and principles (this section) are directional, not prescriptive — they lose to specific approved decisions.
