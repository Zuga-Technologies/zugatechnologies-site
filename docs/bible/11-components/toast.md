---
name: Toast
summary: Ephemeral notification that appears temporarily to confirm or alert the user.
anatomy:
  - Toast container (bg + radius + shadow)
  - Icon (optional, communicates variant type)
  - Message text
  - Dismiss button (optional)
variants:
  - info
  - success
  - warning
  - danger
accessibility:
  keyboard:
    - Tab focuses the dismiss button when present
    - Enter or Space activates the dismiss button
    - Escape dismisses the focused toast
  ariaRoles:
    - status
    - alert
  contrastNotes: >
    All variants use --component-toast-fg (slate-900 #0f172a) for message text.
    Info: slate-900 on --component-toast-bg-info (white #ffffff) = 17.85:1 — AAA.
    Success: slate-900 on --component-toast-bg-success (green-100 #dcfce7) = 17.06:1 — AAA.
    Warning: slate-900 on --component-toast-bg-warn (amber-100 #fef3c7) = 17.06:1 — AAA.
    Danger: slate-900 on --component-toast-bg-danger (red-100 #fee2e2) = 14.48:1 — AAA.
  focusBehavior: >
    Toasts are not automatically focused on appearance — focus stays with the current element.
    The dismiss button is reachable via Tab. When a toast is dismissed by the button, focus stays
    on the button's previous position or moves to the next focusable element.
    Danger toasts (role=alert) do not move focus automatically; the live region announces the message.
examples:
  - framework: astro
    code: |
      ---
      import Toast from '@zuga/ui/Toast.astro';
      ---
      <!-- info: polite announcement -->
      <Toast variant="info" message="Your session was restored." />

      <!-- success: polite announcement, auto-dismisses after 5s -->
      <Toast variant="success" message="Changes saved." :autoDismiss="5000" />

      <!-- warning: polite announcement -->
      <Toast variant="warning" message="Your free trial ends in 3 days." :autoDismiss="7000" />

      <!-- danger: assertive — NEVER auto-dismiss; requires user acknowledgment -->
      <Toast variant="danger" message="Payment failed. Please update your billing details." />
  - framework: vue
    code: |
      <template>
        <ToastStack>
          <Toast
            v-for="toast in toasts"
            :key="toast.id"
            :variant="toast.variant"
            :message="toast.message"
            :auto-dismiss="toast.autoDismiss"
            @dismiss="removeToast(toast.id)"
          />
        </ToastStack>
      </template>

      <script setup>
      import { ref } from 'vue';
      import Toast from '@zuga/ui/Toast.vue';
      import ToastStack from '@zuga/ui/ToastStack.vue';

      const toasts = ref([]);

      function addToast(variant, message, autoDismiss = null) {
        const id = Date.now();
        // danger variant: never auto-dismiss
        const dismissMs = variant === 'danger' ? null : (autoDismiss ?? 5000);
        toasts.value.push({ id, variant, message, autoDismiss: dismissMs });
      }

      function removeToast(id) {
        toasts.value = toasts.value.filter(t => t.id !== id);
      }

      // expose for parent
      defineExpose({ addToast });
      </script>
  - framework: plain-html
    code: |
      <!-- info toast (role=status: polite live region) -->
      <div role="status" aria-live="polite" aria-atomic="true"
           class="toast toast--info" id="toast-info">
        <p class="toast__message">Your session was restored.</p>
        <button type="button" class="toast__dismiss" aria-label="Dismiss notification">
          <svg aria-hidden="true" focusable="false"><!-- × icon --></svg>
        </button>
      </div>

      <!-- success toast (polite) -->
      <div role="status" aria-live="polite" aria-atomic="true"
           class="toast toast--success" id="toast-success">
        <p class="toast__message">Changes saved.</p>
        <button type="button" class="toast__dismiss" aria-label="Dismiss notification">
          <svg aria-hidden="true" focusable="false"><!-- × icon --></svg>
        </button>
      </div>

      <!-- danger toast (role=alert: assertive — interrupts immediately) -->
      <div role="alert" aria-live="assertive" aria-atomic="true"
           class="toast toast--danger" id="toast-danger">
        <p class="toast__message">
          Payment failed. Please update your billing details.
        </p>
        <button type="button" class="toast__dismiss" aria-label="Dismiss alert">
          <svg aria-hidden="true" focusable="false"><!-- × icon --></svg>
        </button>
      </div>
donts:
  - Do not auto-dismiss a danger toast — danger variants require acknowledgment; timing out removes information the user still needs.
  - Do not use toasts for errors that require user action beyond acknowledgment — use inline error messages, a modal, or an error banner.
  - Do not stack more than 3 toasts simultaneously — the toast area becomes unusable and dismissing multiple toasts is a poor experience.
  - Do not use assertive live regions (role=alert) for non-urgent success or info messages — assertive interrupts the current screen reader output; reserve it for danger.
tokens:
  - component.toast.padding
  - component.toast.radius
  - component.toast.shadow
  - component.toast.max-width
  - component.toast.z
  - component.toast.bg-info
  - component.toast.bg-success
  - component.toast.bg-warn
  - component.toast.bg-danger
  - component.toast.fg
  - component.toast.border
---

# Toast

## Anatomy

```
  toast stack (bottom-right, --z-toast: 50):
  ┌─────────────────────────────────────┐
  │  [✓]  Changes saved.           [×]  │  ← success toast
  └─────────────────────────────────────┘
  ┌─────────────────────────────────────┐
  │  [⚠]  Trial ends in 3 days.   [×]  │  ← warning toast
  └─────────────────────────────────────┘

  Each toast:
  ┌─────────────────────────────────────┐
  │  [icon?]  Message text        [×]?  │
  └─────────────────────────────────────┘
       ↑ variant icon              ↑ dismiss button (optional)
       aria-hidden="true"           aria-label="Dismiss notification"
```

Each part:

- **Toast container** — `--component-toast-radius` (radius-md, 6px), `--component-toast-shadow` (shadow-lg), `--component-toast-max-width` (24rem). Positioned at the toast stack area (typically bottom-right, `z-index: --z-toast`, 50). Background varies by variant.
- **Icon** — optional 16px icon communicating the variant type (checkmark for success, warning triangle, info circle, X for danger). Always `aria-hidden="true"`.
- **Message text** — the primary content. Uses `--component-toast-fg` (slate-900) across all variants. Should be concise (under 100 characters).
- **Dismiss button** — optional ×-icon button. Must carry `aria-label="Dismiss notification"`. When absent, the toast must auto-dismiss after a timeout (except danger).

## Variants & Usage

**info** — Neutral informational message. Not urgent. `role="status"`, `aria-live="polite"`. White background (`--component-toast-bg-info`). Auto-dismiss at 5–7 seconds is appropriate.

**success** — Confirmation that an action completed. Not urgent. `role="status"`, `aria-live="polite"`. Green-100 background (`--component-toast-bg-success`). Auto-dismiss at 5 seconds is appropriate.

**warning** — Attention-needed message that isn't a failure. `role="status"`, `aria-live="polite"`. Amber-100 background (`--component-toast-bg-warn`). Auto-dismiss at 7 seconds — give users slightly more time to read it.

**danger** — Error or failure requiring user acknowledgment. `role="alert"`, `aria-live="assertive"` — this immediately interrupts the current screen reader announcement. Red-100 background (`--component-toast-bg-danger`). **Never auto-dismiss.** The dismiss button or an action button must be present for the user to explicitly resolve the message.

## Accessibility

### Keyboard

- **Tab** — focuses the dismiss button when present.
- **Enter / Space** — activates the dismiss button.
- **Escape** — dismisses the toast when it is focused (or when the dismiss button has focus).

### ARIA / Roles

Two roles are used:
- `role="status"` (implicit `aria-live="polite"`) — for info, success, warning. The screen reader finishes the current announcement before reading the toast content.
- `role="alert"` (implicit `aria-live="assertive"`) — for danger. The screen reader interrupts the current announcement immediately to read the toast content.

Both roles require `aria-atomic="true"` to ensure the full message is announced as a single unit when the content updates.

### Screen reader script

- **Info/Success/Warning (polite):** After a short delay, SR reads "Changes saved." — does not interrupt current reading.
- **Danger (assertive):** SR immediately interrupts: "Payment failed. Please update your billing details." — regardless of what else the user was doing.
- **Dismiss button:** "Dismiss notification, button" (or "Dismiss alert, button" for danger)

### Contrast verification

All variants use `--component-toast-fg` (slate-900, #0f172a) for message text:

- **Info:** slate-900 on white (#ffffff) = **17.85:1** — AAA.
- **Success:** slate-900 on green-100 (#dcfce7) = **17.06:1** — AAA.
- **Warning:** slate-900 on amber-100 (#fef3c7) = **17.06:1** — AAA.
- **Danger:** slate-900 on red-100 (#fee2e2) = **14.48:1** — AAA.

### Focus behavior

Toast appearance does not move focus. The user's focus stays on the element they were interacting with. Toasts are non-modal and should never trap focus. The dismiss button becomes reachable via Tab in the natural tab order. This satisfies WCAG 2.4.3 (Focus Order) — the user can continue their task without being interrupted by focus movement.

## Code

### Astro

```astro
---
import Toast from '@zuga/ui/Toast.astro';
---
<!-- info: polite, auto-dismisses at 5s -->
<Toast variant="info" message="Your session was restored." auto-dismiss={5000} />

<!-- success: polite, auto-dismisses at 5s -->
<Toast variant="success" message="Changes saved." auto-dismiss={5000} />

<!-- warning: polite, slightly longer display -->
<Toast variant="warning" message="Your free trial ends in 3 days." auto-dismiss={7000} />

<!-- danger: assertive, NEVER auto-dismiss -->
<Toast variant="danger" message="Payment failed. Please update your billing details." />
```

### Vue

```vue
<template>
  <Toast
    v-for="toast in toasts"
    :key="toast.id"
    :variant="toast.variant"
    :message="toast.message"
    :auto-dismiss="toast.autoDismiss"
    @dismiss="removeToast(toast.id)"
  />
</template>

<script setup>
import { ref } from 'vue';
import Toast from '@zuga/ui/Toast.vue';

const toasts = ref([]);

function addToast(variant, message) {
  const autoDismiss = variant === 'danger' ? null : 5000;
  toasts.value.push({ id: Date.now(), variant, message, autoDismiss });
}

function removeToast(id) {
  toasts.value = toasts.value.filter(t => t.id !== id);
}
</script>
```

### Plain HTML

```html
<!-- info/success/warning: role=status (polite) -->
<div role="status" aria-live="polite" aria-atomic="true" class="toast toast--success">
  <p class="toast__message">Changes saved.</p>
  <button type="button" class="toast__dismiss" aria-label="Dismiss notification">
    <svg aria-hidden="true" focusable="false"><!-- × --></svg>
  </button>
</div>

<!-- danger: role=alert (assertive), no auto-dismiss -->
<div role="alert" aria-live="assertive" aria-atomic="true" class="toast toast--danger">
  <p class="toast__message">Payment failed. Please update your billing details.</p>
  <button type="button" class="toast__dismiss" aria-label="Dismiss alert">
    <svg aria-hidden="true" focusable="false"><!-- × --></svg>
  </button>
</div>
```

## Don'ts

| Don't | Why |
|---|---|
| Auto-dismiss a danger toast | Danger requires acknowledgment. Timing it out removes information the user may still be reading or acting on. |
| Use toasts for errors requiring complex user action | A modal or inline error is the right pattern when the user must take more than one step to resolve the problem. |
| Stack more than 3 toasts | The toast area becomes a wall of text; users scroll past or dismiss without reading. Deduplicate or replace. |
| Use `role="alert"` for info/success | `assertive` interrupts the screen reader mid-sentence. Polite (`role="status"`) is correct for non-urgent feedback. |

## Tokens reference

The component exposes these tokens (Tier 3, scoped):

- `--component-toast-padding` — interior padding (`--space-4`, 16px)
- `--component-toast-radius` — corner rounding (`--radius-md`, 6px)
- `--component-toast-shadow` — elevation (`--shadow-lg`)
- `--component-toast-max-width` — maximum toast width (24rem / 384px)
- `--component-toast-z` — stacking context (`--z-toast`, 50)
- `--component-toast-bg-info` — info background (`--surface-primary`, white)
- `--component-toast-bg-success` — success background (`--feedback-success-subtle`, green-100)
- `--component-toast-bg-warn` — warning background (`--feedback-warn-subtle`, amber-100)
- `--component-toast-bg-danger` — danger background (`--feedback-danger-subtle`, red-100)
- `--component-toast-fg` — message text (`--text-primary`, slate-900)
- `--component-toast-border` — toast border (`--border-default`, slate-300)

These compose from Tier 2 semantic tokens (which compose from Tier 1 primitives — see §4 + §5).
