---
section: 13
title: Accessibility
summary: WCAG conformance, keyboard, ARIA, focus rules.
mikeCheckpoint: false
---

# 13. Accessibility

> Authored: 2026-04-26
> Authoring task: see plan Task 27

Zuga targets **WCAG 2.2 AA** across all products. This section is the governance layer — it states thresholds and rules. Per-component measured contrast ratios and ARIA implementation details live in §11 component pages (button, modal, input, etc.). Cross-references to §10.5 (reduced-motion carve-outs) are noted where relevant.

---

## 13.1 Conformance target

| Level | Target | Notes |
|-------|--------|-------|
| WCAG 2.2 AA | Required | All shipped components and patterns |
| WCAG 2.2 A | Required | Baseline subset of AA |
| WCAG 2.2 AAA | Aspirational | Target Size Enhanced (2.5.5) noted below; not a blocking gate |

Non-conformance on any AA criterion is a **ship blocker** for the affected component.

---

## 13.2 Color and contrast — per-role minimums

These are governance thresholds, not measured values. Measured ratios for specific token pairs are documented in each §11 component page.

| Role | Criterion | Threshold | Notes |
|------|-----------|-----------|-------|
| Body text (≤18px or ≤14px bold) | 1.4.3 AA | **4.5 : 1** | Against background surface |
| Large text (≥18px regular or ≥14px bold) | 1.4.3 AA | **3 : 1** | Against background surface |
| UI components (focus rings, borders, icons) | 1.4.11 AA | **3 : 1** | Against adjacent color |
| Graphical objects (chart lines, SVG icons) | 1.4.11 AA | **3 : 1** | Against adjacent color |
| Feedback text (success, warn, danger) | 1.4.3 AA | **4.5 : 1** | Body-size feedback labels |
| Disabled state | 1.4.3 AA | exempt | Disabled elements are explicitly exempt; must still be perceivable |
| Phase 2 aspirational (body) | 1.4.6 AAA | **7 : 1** | Not required; target for high-stakes surfaces |

The `--accent-brand` default resolves to `--color-cyan-700` (#0e7490), which passes 4.5:1 against `--accent-fg` (#ffffff). Sub-brand profiles that override `--accent-brand` are responsible for maintaining compliance at the same threshold.

---

## 13.3 Color-only signaling — banned

**WCAG 1.4.1 (Use of Color) is non-negotiable.** Color alone must never be the sole means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.

Practical rules:
- Error states: icon + text label required alongside any red color treatment. Red border alone fails.
- Success/warn/danger toasts: must include an icon (check, warning triangle, X) in addition to feedback color.
- Form field validation: invalid state requires visible text error message (→ WCAG 3.3.1). Red outline alone fails.
- Charts and graphs: data series must be distinguishable by shape, pattern, or label, not color alone.
- Link detection: links within body text must have a non-color visual indicator (underline or weight change) unless the contrast ratio between the link and surrounding text is ≥ 3:1.

When in doubt: remove all color from the UI in your head and ask whether the information still comes through. If not, it fails 1.4.1.

---

## 13.4 Keyboard model

Every interactive element must be fully operable by keyboard alone (WCAG 2.1.1). There are no exceptions for components where mouse interaction is "standard" (drag-to-reorder, date pickers, sliders — all need keyboard equivalents).

### Navigation keys

| Key | Action |
|-----|--------|
| `Tab` | Advance focus to next focusable element |
| `Shift+Tab` | Reverse focus to previous focusable element |
| `Enter` | Activate: buttons, links, menu items, checkboxes |
| `Space` | Activate: buttons, checkboxes; scroll (when not trapped) |
| `Esc` | Close: modals, dialogs, tooltips, popovers, dropdowns |
| `Arrow keys` | Navigate within a widget: tabs, radio groups, menus, listboxes |
| `Home` / `End` | Jump to first / last item in a list or text field |

### Focus trap rules

Modals trap focus by design — this is correct behavior, not a keyboard trap (WCAG 2.1.2). A modal focus trap is allowed because pressing `Esc` always exits, making focus escapable. Focus must never be trapped in a way that requires a mouse to escape.

Focus order must match visual and reading order (WCAG 2.4.3). If CSS order differs from DOM order, DOM order wins for keyboard navigation.

### Focus visibility

Focus indicators must always be visible (WCAG 2.4.7). The Zuga focus indicator is `--shadow-ring` (3px cyan ring via `box-shadow`). This ring must not be suppressed via `outline: none` without a replacement indicator of equal or greater visibility. Focused elements must not be fully obscured by sticky headers, banners, or overlays (WCAG 2.4.11).

---

## 13.5 Target size

| Standard | Criterion | Minimum size | Gate |
|----------|-----------|--------------|------|
| Zuga minimum | 2.5.8 AA | **24 × 24 px** | Ship blocker |
| Zuga aspirational | 2.5.5 AAA | **44 × 44 px** | Best-effort; applied to primary actions |

The 24×24px minimum applies to the interactive click/touch target, not the visual icon. Icon-only buttons with 16px icons must have padding that brings the total target to at least 24×24px.

---

## 13.6 Screen reader patterns

### Semantic HTML first

Native HTML elements carry implicit roles and states. Prefer `<button>` over `<div role="button">`, `<nav>` over `<div role="navigation">`, `<input type="checkbox">` over `<div role="checkbox">`. Only add ARIA when native semantics are insufficient.

### Required `aria-*` defaults by primitive

| Primitive | Required ARIA | Notes |
|-----------|--------------|-------|
| Icon-only button | `aria-label="[action]"` | Visible label text alone is insufficient for icon-only; label must describe the action |
| Toggle button | `aria-pressed="true|false"` | Reflects pressed state |
| Loading skeleton | `aria-busy="true"` on parent container | Announce when content is loading |
| Toast / alert | `role="status"` or `role="alert"` + `aria-live="polite|assertive"` | See §13.6.2 |
| Modal / dialog | `role="dialog"` + `aria-modal="true"` + `aria-labelledby` pointing to heading | Required; focus trap applies |
| Tooltip | `role="tooltip"` + `id` + trigger `aria-describedby` pointing to tooltip id | Only for supplemental information; don't hide critical info in tooltips |
| Progress / spinner | `role="progressbar"` + `aria-valuenow` + `aria-valuemin` + `aria-valuemax` | Use `aria-label` if no visible label |
| Form input | `<label>` associated via `for`/`id` or `aria-label`; error state via `aria-describedby` pointing to error element | Never label via `placeholder` alone |
| Navigation landmark | `<nav aria-label="[unique name]">` | Multiple `<nav>` elements need distinct labels |
| Collapsible / accordion | trigger: `aria-expanded="true|false"` + `aria-controls` pointing to panel id | Panel: `id` matches `aria-controls` value |

### 13.6.1 Name, Role, Value (WCAG 4.1.2)

Every interactive element must have:
1. **Accessible name** — provided by `<label>`, `aria-label`, or `aria-labelledby`.
2. **Role** — provided by native HTML element or explicit `role` attribute.
3. **State/value** — dynamic state changes (`aria-checked`, `aria-expanded`, `aria-disabled`) must be kept in sync with visual state via JS.

### 13.6.2 Status messages (WCAG 4.1.3)

Non-modal status messages (toasts, form save confirmations, inline validation success) must be announced to screen readers without moving focus. Use `aria-live` regions:

- `aria-live="polite"` — normal status messages. Screen reader finishes current utterance first. Use for toasts, form save confirmations.
- `aria-live="assertive"` — urgent interruptions only (unrecoverable errors, session expiry). Interrupts screen reader immediately.

The live region element must exist in the DOM before content is injected into it. Injecting a live region and content simultaneously does not reliably trigger announcement.

---

## 13.7 Error handling accessibility

| Rule | Criterion |
|------|-----------|
| Errors must be described in text, not just color or icon | 3.3.1 |
| When the cause of an error is known, suggest the correction | 3.3.3 |
| Legal, financial, or data-deleting actions require confirmation, undo, or review step | 3.3.4 |
| Don't ask users to re-enter information they've already provided in the same session | 3.3.7 |
| Auth flows must not require cognitive function tests (CAPTCHA) without an accessible alternative | 3.3.8 |

---

## 13.8 Text spacing (WCAG 1.4.12)

Content must not lose information or functionality when the user overrides text spacing to:
- Line height ≥ 1.5× the font size
- Paragraph spacing ≥ 2× the font size
- Letter spacing ≥ 0.12× the font size
- Word spacing ≥ 0.16× the font size

The Zuga default tokens already satisfy these thresholds. The rule is that custom components must not hard-code heights or clamp containers in ways that clip text when spacing is increased.

---

## 13.9 Tooltips and hover content (WCAG 1.4.13)

Tooltips and popovers triggered by hover or focus must be:
1. **Dismissible** — user can dismiss without moving pointer or focus (typically `Esc`).
2. **Hoverable** — pointer can move over the tooltip without the tooltip disappearing.
3. **Persistent** — tooltip stays visible until dismissed, focus moves away, or hover leaves the trigger + tooltip area.

---

## 13.10 Reduced motion

Zuga's motion system includes a `prefers-reduced-motion` layer. See §10.5 for the full essential-motion carve-out policy.

Summary of §13 rules:
- All transitions and animations must be gated by `@media (prefers-reduced-motion: reduce)`.
- "Essential motion" (progress spinners, loading states that convey real-time information) may retain reduced but not eliminated animation.
- Position-changing transforms (slide-ins, parallax, scroll-jacking) must stop completely under reduced-motion preference.

The `--motion-duration-*` tokens are used throughout components. Reduced-motion overrides set these to `0ms` or near-zero on the component scope. Never hard-code duration values in component CSS — always reference the tokens so the override layer works.

---

## 13.11 Component-level deep dives

Per-component accessibility specifics (measured contrast ratios, exact ARIA patterns, keyboard interaction models) live in the §11 component pages:

- `docs/bible/11-components/button.md` — button, icon-button, toggle patterns
- `docs/bible/11-components/input.md` — text input, error association
- `docs/bible/11-components/modal.md` — focus trap, dialog ARIA, Esc behavior
- `docs/bible/11-components/toast.md` — live region implementation
- `docs/bible/11-components/checkbox.md` — `aria-checked`, indeterminate state
- `docs/bible/11-components/select.md` — listbox pattern, keyboard navigation
- `docs/bible/11-components/tabs.md` — tab/tabpanel ARIA, arrow-key navigation
- `docs/bible/11-components/nav.md` — landmark labels, active state
