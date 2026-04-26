---
name: Loading
summary: Progressive loading pattern using skeletons for first-load layout, spinners for action feedback, and progress bars for known-duration operations.
components:
  - Skeleton
  - Button
flow:
  - "Step 1: On navigation or data fetch initiation, immediately render the appropriate loading treatment"
  - "Step 2: Skeleton — render matching the expected content layout; set aria-busy=true on the container"
  - "Step 3: Spinner — show inline with the action trigger (Button loading variant); do not move focus"
  - "Step 4: Progress bar — render with known percentage; update as operation progresses"
  - "Step 5: On data resolve, replace loading treatment with real content; set aria-busy=false; announce via aria-live"
  - "Step 6: On fetch error, replace loading treatment with the error state (see error-states.md)"
a11y: Container sets aria-busy=true during load and aria-busy=false on resolve; aria-live polite region announces when content is ready; Skeleton elements are aria-hidden; spinner within Button uses aria-busy on the Button element.
---

# Loading

## When to use

Loading UI falls into three types — pick based on what you know about the operation:

**Skeleton** — use when the layout of the incoming content is known before the data arrives. A list of habit cards, a profile page, a dashboard with fixed panels. The Skeleton mirrors the real content's shape, so the transition from loading to loaded is a simple fill-in rather than a layout shift.

**Spinner** — use when the layout does not change after the operation completes. A form submit, a Button click that saves in place, an in-page refresh. The spinner lives inside the triggering element (Button loading variant) or as a small inline indicator beside the updated region. Do not center a full-page spinner for in-place actions.

**Progress bar** — use when the operation has a known or estimable duration and progress can be reported (file uploads, multi-step task pipelines, background processing). The progress bar sets a duration expectation that a spinner cannot.

**Indeterminate spinner** — the fallback for when none of the above apply. Use it sparingly. An indeterminate spinner tells the user nothing about duration or progress. Every indeterminate spinner is a signal that either a skeleton or progress bar should exist instead.

Do not show a skeleton and then replace it with a spinner, or vice versa — pick one loading mode per region and stay consistent for that surface across all load events.

## Visual / structural anatomy

### Skeleton (first-load, known layout)

```
┌──────────────────────────────────────────────────┐
│  aria-busy="true"                                │  ← Container attribute
│                                                  │
│  ┌─────────────────────────────────────────────┐ │
│  │  ████████████████████                       │ │  ← Skeleton title bar
│  │                                             │ │
│  │  ████████████████████████████████████████   │ │  ← Skeleton body line
│  │  ████████████████████████████               │ │
│  │                                             │ │
│  │  [████████████]                             │ │  ← Skeleton button placeholder
│  └─────────────────────────────────────────────┘ │
│                                                  │
│  (Each Skeleton element is aria-hidden="true")   │
└──────────────────────────────────────────────────┘
```

### Spinner (action feedback, in-place)

```
  ┌─────────────────────────────┐
  │  ⟳  Saving…                │  ← Button loading variant
  └─────────────────────────────┘    aria-busy="true" on Button
                                     label text updates to "Saving…"
```

### Progress bar (known-duration operation)

```
  Uploading export… 63%
  ┌──────────────────────────────────────────────┐
  │██████████████████████████░░░░░░░░░░░░░░░░░░░│  ← role="progressbar"
  └──────────────────────────────────────────────┘    aria-valuenow="63"
                                                      aria-valuemin="0"
                                                      aria-valuemax="100"
```

## Components used

- [Skeleton](../11-components/skeleton.md) — the Skeleton component renders animated placeholder bars. Each bar is `aria-hidden="true"`. The containing region carries `aria-busy="true"`. Skeleton shape (width, height, border-radius) should match the expected real content — a Skeleton for an Avatar should be circular; a Skeleton for a title should be wide and short.
- [Button](../11-components/button.md) — the loading variant of Button handles the spinner case for action feedback. The Button's label text updates to reflect the in-progress state ("Saving…", "Uploading…", "Connecting…") and `aria-busy="true"` is added. The spinner icon is decorative (`aria-hidden="true"`).

## Flow

### Skeleton flow (page/section load)

1. Navigation fires or section mounts. Before the API call resolves, Skeleton placeholders render immediately — zero delay.
2. The container region has `aria-busy="true"` set.
3. Data fetch completes. Real content replaces Skeletons element by element (or all at once for small sections). `aria-busy` is set to `"false"`.
4. An `aria-live="polite"` region fires: "[Section name] loaded." This is a one-shot announcement — not a persistent label.
5. On fetch error: Skeletons are removed; the error state renders (see [error-states.md](error-states.md)).

### Spinner flow (action feedback)

1. User clicks a Button. The Button immediately shifts to loading variant: label → "Saving…", `aria-busy="true"`, spinner icon visible. The Button is `disabled` during the request.
2. No other layout changes occur — the page structure is stable.
3. On success: Button returns to default state; label reverts; a Toast or inline success indicator confirms completion.
4. On error: Button returns to default state; inline error message appears (see [error-states.md](error-states.md)).

### Progress bar flow (known-duration operation)

1. Operation starts (file upload, export generation, background task). A `role="progressbar"` element renders with `aria-valuenow="0"`, `aria-valuemin="0"`, `aria-valuemax="100"`, and a visible percentage label.
2. As progress events fire (from upload API, WebSocket, or polling), `aria-valuenow` and the visible label update.
3. On completion: the progress bar transitions to 100%, then is replaced by a success indicator (Toast or inline confirmation) after a brief pause so the user sees the completed state before it disappears.
4. On failure: the progress bar is replaced by the error state, with a Retry Button.

## Accessibility

### Keyboard

- Skeleton regions are inert — no interactive elements. Users should be able to navigate past them.
- Button loading state: the Button is `disabled` during the request. It is removed from the tab sequence. If the form has other interactive elements, the user can continue tabbing past the loading Button.
- Progress bar: keyboard users can navigate to it in the tab sequence if it is a meaningful, long-running operation. For short operations (< 2 seconds), the progress bar does not need to be in the tab sequence.

### Screen reader script

- **Skeleton container:** When `aria-busy="true"` is set, most screen readers pause reading the region and wait for `aria-busy="false"`. The announcement on `"false"` is: "Habits list loaded." (via aria-live region).
- **Button loading:** "Saving…, button, unavailable." (aria-busy causes this phrasing in most screen readers.) The label update ("Saving…") is the primary cue.
- **Progress bar:** "Uploading export, 63 percent." Updated as aria-valuenow changes. Screen readers announce value changes at a throttled rate — do not update faster than once per second.
- **Completion:** aria-live polite region: "Upload complete." This fires once — not on every percentage tick.

### Focus management

- Skeleton → content transition: do not move focus. The user's focus position is preserved.
- Button loading: focus stays on the Button (it is temporarily disabled). On resolution, Button is re-enabled; focus is already there.
- Progress bar in a Modal: if the Modal was opened to contain a progress bar (e.g., an export dialog), on completion the Modal can auto-close and return focus to the trigger Button. Include a brief success confirmation before closing so the user sees the 100% state.

### prefers-reduced-motion

Skeleton shimmer animation must be disabled under `prefers-reduced-motion: reduce`. The Skeleton elements remain as static placeholder shapes — no pulse or shimmer. See §10.5 essential-motion carve-out. This applies to both the Skeleton component's own animation and any entrance fade applied to the real content on load.

The spinner rotation inside the Button loading state is motion-essential (it communicates "in progress" without an alternative static signal). Under reduced motion, replace the spinning animation with a static "…" ellipsis appended to the label text — "Saving…" remains communicative without any animation.

## Don'ts

| ❌ Don't | Why |
|---|---|
| Use a full-page centered spinner for in-place actions | A spinner that takes over the full page for a Button click says "everything stopped" when actually only the Button's action is pending. Use the Button loading variant. |
| Show a Skeleton after the layout is unknown | A Skeleton that doesn't match the incoming content causes a jarring layout shift that defeats its purpose. If the content shape is unknown, use a spinner or a subtle loading indicator instead. |
| Skip aria-busy on Skeleton containers | Screen readers may start reading the Skeleton text nodes as content. aria-busy suppresses this until real content arrives. |
| Let Skeleton elements be indefinite | Skeletons should resolve or error within a defined timeout (e.g., 15 seconds). If not resolved by then, replace with the error state rather than leaving the user staring at a forever-loading skeleton. |
| Use indeterminate spinners for operations > 3 seconds | After 3 seconds, users start wondering if the app is stuck. A progress bar with any estimate — even a rough one — is better than an indeterminate indefinite spinner. |
| Animate progress bar from 0 to 100 without real data | Fake progress bars (animated to simulate completion without real progress events) train users to distrust the indicator. If you cannot get real progress events, use a spinner. |

## Pattern-specific notes

**Skeleton anatomy matching:** Each Skeleton element should be sized to approximately match the real content. A Skeleton for a three-line text block should be three bars. A Skeleton for a 48×48 Avatar should be a 48×48 circle. The match does not have to be pixel-perfect, but the proportions should communicate the coming layout. Mismatched Skeletons cause layout shifts that increase perceived latency.

**Spinner vs Skeleton decision shortcut:**
- Does the layout change after the operation? Skeleton.
- Does only the content inside an existing layout area update? Spinner.
- Do you know the operation's duration or progress? Progress bar.
- None of the above? Indeterminate spinner — and file a ticket to add progress reporting.

**Studio-specific notes:**
- ZugaTrader: market data tables use Skeleton with row count matching the last-known response length (persisted in cache). This prevents the table from growing or shrinking on refresh.
- ZugaLife: habit list Skeleton count defaults to 3 rows on first load (before any cache). After the first load, use the last-known count.
- ZugaGamer: overlay loading states use the spinner exclusively — Skeleton is inappropriate in an overlay context where content shape is unpredictable. See §overlay-patterns (when authored) for overlay-specific loading treatment.
