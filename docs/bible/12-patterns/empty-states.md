---
name: Empty States
summary: Visual and textual treatment for views with no content, guiding the user toward the first or filtered action.
components:
  - Card
  - Button
flow:
  - "Step 1: Detect zero-item collection (true empty) or zero results (filtered empty) on data resolve"
  - "Step 2: Render illustration or icon, headline, and supporting copy appropriate to the empty type"
  - "Step 3: Render primary CTA Button for the action that resolves the empty state"
  - "Step 4: On CTA click, route to the creation or filter-clear flow"
a11y: Empty state region has a descriptive heading that identifies both the collection name and the empty reason; CTA Button text is self-explanatory without surrounding context; illustration is aria-hidden.
---

# Empty States

## When to use

An empty state renders whenever a view's data set is empty and the user would otherwise see a blank space. There are two distinct types — treat them differently:

**True empty:** The user has never created any items in this collection. ZugaLife habit list with no habits added. ZugaTrader watchlist with no assets. The empty state should be inviting — it explains what the feature does and gives a clear first step.

**Filtered empty:** Items exist, but the current search query or filter combination returned zero results. ZugaLife journal search with no matches. ZugaTrader screener with over-constrained filters. The empty state should acknowledge the filter, not pretend the product is empty, and offer a path to clear or adjust it.

Do not render an empty state before data has finished loading — show the loading pattern first (see [loading.md](loading.md)).

## Visual / structural anatomy

```
┌──────────────────────────────────────────────────┐
│  Card (optional — used when empty state is        │
│         embedded inside a panel)                 │
│                                                  │
│          ┌───────────────┐                       │
│          │  Illustration │  ← aria-hidden="true" │
│          │  or icon      │    120–160px           │
│          └───────────────┘                       │
│                                                  │
│       No habits yet                              │  ← h2 or h3 (heading level
│                                                  │    follows page hierarchy)
│   Start tracking your daily habits to            │
│   build momentum over time.                      │  ← Supporting copy (1–2 sentences)
│                                                  │
│       ┌─────────────────────┐                    │
│       │   Add first habit   │                    │  ← Button primary
│       └─────────────────────┘                    │
│                                                  │
└──────────────────────────────────────────────────┘

Filtered empty variant:

│       No results for "pushups"                   │  ← Acknowledgement
│   Try a different search term                    │
│   or clear your filters.                         │
│                                                  │
│   [Clear filters]   [Adjust search]              │  ← Two actions max
```

## Components used

- [Card](../11-components/card.md) — wraps the empty state when it sits inside a bordered panel (e.g., a list view that expected rows). For full-page empties (a studio with no content at all), Card is optional — the empty state can sit on the page surface directly.
- [Button](../11-components/button.md) — primary CTA for true empties ("Add first habit", "Connect a data source"). Secondary or ghost Button for filtered empties ("Clear filters"). Never more than two action Buttons in one empty state.

## Flow

1. Data fetch resolves with an empty array (or zero-length filtered result).
2. Loading skeleton is removed.
3. Empty state mounts: illustration renders (aria-hidden), heading renders, supporting copy renders, CTA Button renders.
4. For filtered empty: current filter values are reflected in the copy ("No results for 'pushups'"). Filter identity makes the state scannable without re-reading the filter panel.
5. User clicks the CTA. For true empty: routes to creation flow. For filtered empty: clears filter state (or opens filter panel for adjustment) and re-fetches.

## Do / Don't grid

| Situation | ✅ Do | ❌ Don't |
|---|---|---|
| True empty headline | "No habits yet" | "Nothing here!" (cute but vague) |
| Filtered empty headline | "No results for 'pushups'" | "No results" (ignores the filter) |
| Supporting copy | 1–2 sentences explaining the feature and the path forward | A paragraph — empty states should feel quick to read |
| CTA label | "Add first habit" (specific, self-explanatory) | "Get started" (generic, means nothing without context) |
| Filtered CTA | "Clear filters" | "Reset" (ambiguous — reset what?) |
| Illustration | §9 illustration style: flat, on-brand, relevant to the collection | Stock photography, generic sad-face icons |
| Full-page vs in-panel | Match the empty state size to the area it fills | A 400px illustration inside a 200px sidebar panel |

## Accessibility

### Keyboard

The CTA Button is the primary focus target. On empty state render, do not move focus to the empty state automatically — the user may have just cleared a filter and expects focus to remain on the filter control. If the empty state is the only meaningful content on the page (true first-load empty), it is acceptable to set focus on the CTA Button after a short delay.

### Screen reader script

- **True empty:** "No habits yet. [heading] Start tracking your daily habits to build momentum over time. Add first habit, button."
- **Filtered empty:** "No results for 'pushups'. [heading] Try a different search term or clear your filters. Clear filters, button. Adjust search, button."
- The illustration or icon carries `aria-hidden="true"` — it is decorative. The heading + copy carry the full meaning.

### Focus management

- Illustration: `aria-hidden="true"`. Never place meaningful text inside the illustration.
- Heading level: follow the page hierarchy. If the page heading is h1, the empty state heading is h2. Do not skip levels.
- After the user clears a filter and the list re-populates: focus stays on the "Clear filters" Button (now gone or changed state). Move focus to the first result item or the search input so the user knows content appeared.

### prefers-reduced-motion

If the empty state mounts with an entrance animation (fade-in, slide-up), gate the transition inside `@media (prefers-reduced-motion: no-preference)`. Under reduced motion, the state appears immediately.

## Pattern-specific notes

**Illustration style:** Follow §9 imagery guidelines. Illustrations are flat, use the Zuga brand palette, and are thematically connected to the collection (a calendar for an empty schedule, a chart outline for an empty watchlist). Do not reuse the same illustration across different empty states — the illustration is a scent trail back to the feature.

**Never fake content:** Do not seed template data or example items to hide the empty state. Ghost content (subtle placeholder items showing what the data will look like) is acceptable on first load for orientation, but real empties must show the empty state, not fabricated rows.

**Studio-specific notes:**
- ZugaLife: true empties in habit, journal, and meditation lists should include a motivational one-liner as the supporting copy — aligned with the wellness voice in §3.
- ZugaTrader: filtered empties in the screener must show the active filter chips inline in the empty state so the user can see at a glance what is constraining results.
- ZugaGamer: empty game catalog during onboarding should use the "Add first habit" analogue — "Connect your first game library."
