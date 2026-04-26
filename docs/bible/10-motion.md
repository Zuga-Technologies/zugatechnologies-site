---
section: 10
title: Motion
summary: Easing curves, durations, choreography, prefers-reduced-motion.
mikeCheckpoint: false
---

# 10. Motion

> Authored: 2026-04-25
> Mike checkpoints: none (Antonio-final)

Motion in Zuga products is functional, not decorative. Every transition either communicates state change, guides spatial orientation, or confirms user action. Motion that does none of these things is removed. All values below are sourced from `packages/design-tokens/src/tokens.css` — do not hardcode durations or easing functions in component code.

---

## 10.1 Duration tokens

| Token | Value | Use |
|---|---|---|
| `--motion-duration-instant` | 75ms | Immediate feedback. Tooltip appear/disappear, active/pressed state, toggle switch snap. |
| `--motion-duration-fast` | 150ms | Short UI transitions. Button hover state, checkbox check, badge update, inline input focus ring. |
| `--motion-duration-normal` | 200ms | **Default transition duration.** Most component enter/exit animations. Dropdown open, modal fade-in, tab switch. |
| `--motion-duration-slow` | 300ms | Larger layout changes. Sidebar collapse/expand, sheet slide-in, page-level route transitions where elements travel a large distance. |
| `--motion-duration-slower` | 500ms | Deliberate, weighty transitions. Full-page entry animation, complex choreography where multiple elements move in sequence, onboarding reveal sequences. |

**Rule: exit is faster than enter.** When a component enters, use its assigned duration. When it exits, use one step shorter. A modal opens at `--motion-duration-normal` (200ms) and closes at `--motion-duration-fast` (150ms). This makes the interface feel responsive to dismissal — users should never feel they are waiting for something to disappear.

---

## 10.2 Easing tokens

| Token | Value | Character |
|---|---|---|
| `--motion-easing-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Smooth start, crisp arrival. The default for most UI transitions. |
| `--motion-easing-emphasized` | `cubic-bezier(0.3, 0, 0, 1)` | Slightly more deliberate start than standard. Use for important reveals — modal entrance, hero section load, onboarding step. |
| `--motion-easing-decel` | `cubic-bezier(0, 0, 0, 1)` | Zero initial velocity, decelerates to stop. **Entering elements.** An element dropping into the viewport from above, a drawer sliding in — it starts fast and settles. |
| `--motion-easing-accel` | `cubic-bezier(0.3, 0, 1, 1)` | Starts slowly, accelerates out. **Exiting elements.** An element dismissed should accelerate away, not drift off. |

**Pairing rule:** Entering elements use `--motion-easing-decel`; exiting elements use `--motion-easing-accel`. Elements that stay in place and change state (color, scale, opacity in-place) use `--motion-easing-standard`. High-stakes reveals use `--motion-easing-emphasized`.

**Do not use spring/elastic curves for UI control transitions.** Bounce and elastic easing are appropriate for celebratory states — a success confirmation, a streak badge unlock, a goal completion animation. They are not appropriate for click/hover feedback, dropdown open/close, or modal transitions. Bounce on interactive controls makes the interface feel playful at the cost of user time — every overshoot adds perceived latency to an action the user has already committed to.

---

## 10.3 Easing in practice

Quick reference for common component patterns:

| Pattern | Duration | Easing |
|---|---|---|
| Button hover | `--motion-duration-fast` | `--motion-easing-standard` |
| Button active/pressed | `--motion-duration-instant` | `--motion-easing-standard` |
| Dropdown open | `--motion-duration-normal` | `--motion-easing-decel` |
| Dropdown close | `--motion-duration-fast` | `--motion-easing-accel` |
| Modal open | `--motion-duration-normal` | `--motion-easing-emphasized` |
| Modal close | `--motion-duration-fast` | `--motion-easing-accel` |
| Toast enter | `--motion-duration-normal` | `--motion-easing-decel` |
| Toast exit | `--motion-duration-fast` | `--motion-easing-accel` |
| Sidebar collapse/expand | `--motion-duration-slow` | `--motion-easing-standard` |
| Page route transition | `--motion-duration-slow` | `--motion-easing-emphasized` |
| Tab switch | `--motion-duration-normal` | `--motion-easing-standard` |
| Success / badge celebrate | `--motion-duration-slower` | Spring/elastic allowed |
| Tooltip show | `--motion-duration-instant` | `--motion-easing-standard` |

---

## 10.4 Choreography principles

### Parent-first reveal

When a container and its children both animate on entry, the parent reveals first. Children animate after the parent's boundary is established, staggered by `--motion-duration-instant` (75ms) increments. The stagger maximum is `--motion-duration-fast` (150ms) — after that, the user is waiting, not perceiving sequence.

**Why:** If children appear before the parent container, the result is elements floating in space before context arrives. The parent establishes the spatial reference frame; children populate it.

**Testable rule:** Visually inspect any entry animation. If content appears in a region before that region's boundary is visible, the animation order is wrong.

### Exit faster than enter

Enter and exit durations are not symmetric. Exit uses one duration step shorter than enter. (If enter uses `normal`, exit uses `fast`. If enter uses `slow`, exit uses `normal`.)

**Why:** After a user dismisses something, the cognitive task is done. The animation plays out for the user's perceptual system to process the state change — but prolonged exit animations feel like UI holding the user in place after they've moved on. Fast exits confirm the action; they don't delay it.

**Testable rule:** In any component with paired enter/exit animation, measure both durations. Exit must be shorter. Equal durations are a defect; exit longer than enter is a bug.

### No bounce on interactions

Hover, click, focus, toggle, and drag interactions do not use spring or elastic easing. Control feedback must complete without overshoot. The only exceptions are:

- **Celebratory states:** success confirmation animations, achievement unlocks, streak completions. These communicate "something positive happened" — a single bounce or elastic settle is appropriate and expected.
- **Loading/progress indicators:** a pulsing or bouncing animation on a loading spinner is acceptable because the user is waiting, not acting.

**Why:** Elastic easing on interactive controls adds frames after the motion should be complete. Every overshoot frame is a moment where the UI looks like it's catching up to the user's input. On fast machines this is barely perceptible; on slower hardware it compounds with rendering lag and makes the interface feel sluggish.

---

## 10.5 prefers-reduced-motion contract

Zuga products honor the `prefers-reduced-motion: reduce` media query. This is not optional.

**Contract:**

- When `prefers-reduced-motion: reduce` is active, all transition and animation durations collapse to `--motion-duration-instant` (75ms) or are removed entirely.
- Easing simplifies to `linear` — no acceleration or deceleration curve processing.
- Parallax, scroll-driven animations, and auto-playing motion are disabled entirely (not just slowed down).
- State changes still communicate — they happen instantly rather than not at all. A modal still "appears"; it just does so without a fade.

**Implementation baseline:**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

This is a global reset baseline. Individual components should also check `prefers-reduced-motion` at the component level when they have complex choreography (stagger sequences, scroll-driven reveals) that the global reset does not fully suppress.

**Carve-out for essential motion**: animation that communicates ongoing system activity (spinners, progress bars, skeleton-loader pulses) should be *reduced in amplitude*, not killed. A loading spinner that runs at slower speed or a progress bar that updates without a smooth fill is acceptable; an invisible indicator that leaves the user staring at a frozen UI is not. Components implementing essential motion should check `prefers-reduced-motion` themselves and override the global rule with a reduced-amplitude alternative.

**Note:** `prefers-reduced-motion: reduce` does not mean "no motion." It means "less motion" — prioritize respecting the user's system preference over exact animation parity. The full accessibility rationale and WCAG mapping lives in §13. Accessibility (cross-reference when authored in T27). This section states the implementation contract; §13 states the rationale.

---

## 10.6 What not to animate

Some transitions should not be animated regardless of duration or easing:

- **Color theme switches** (light/dark mode toggle). Animating a color-scheme switch causes the entire page surface to flash through intermediate states. Snap instantly.
- **Skeleton screen replacements.** When a skeleton loader resolves to real content, replace instantly. Fading from skeleton to content draws attention to the loading artifact rather than the content.
- **Error state appearances.** Errors should demand immediate attention — fade-in softens the signal. Render error states at full opacity without transition.
- **Focus ring appearance.** Focus indicators must appear without delay. A focus ring that fades in is a WCAG violation for keyboard-only users who depend on it for spatial orientation.
