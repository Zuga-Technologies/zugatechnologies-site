---
name: Modal
summary: Overlay dialog that interrupts the current flow to present focused content or actions.
anatomy:
  - Backdrop overlay (semi-transparent, z-modal-backdrop)
  - Dialog container (bg + radius + shadow)
  - Header with title and close button
  - Body content slot
  - Footer action slot
variants:
  - dialog
  - alertdialog
accessibility:
  keyboard:
    - Escape closes the modal
    - Tab cycles focus forward within the modal focus trap
    - Shift+Tab cycles focus backward within the modal focus trap
  ariaRoles:
    - dialog
    - alertdialog
  contrastNotes: >
    Modal body text: --component-modal-fg (slate-900 #0f172a) on --component-modal-bg (white #ffffff) = 17.85:1 — AAA.
    Close button icon: slate-700 (#334155) on white = 10.35:1 — AAA.
    Modal border: slate-300 (#cbd5e1) on white = 1.48:1 non-text contrast — below WCAG 1.4.11 (3:1 non-text contrast). The modal boundary is communicated primarily through box-shadow (shadow-xl) rather than border contrast alone. Studios with strict compliance requirements should increase border weight to 2px and/or shift to slate-500 (4.61:1, clears 3:1).
  focusBehavior: >
    Focus is trapped inside the modal while open. The first focusable element receives focus on open.
    On close, focus returns to the trigger element that opened the modal.
    Tab and Shift+Tab cycle only among focusable elements within the modal container.
    Clicking the backdrop dismisses the modal (configurable; disabled by default for confirmation dialogs).
examples:
  - framework: astro
    code: |
      ---
      import Modal from '@zuga-technologies/ui/Modal.astro';
      import Button from '@zuga-technologies/ui/Button.astro';
      ---
      <!-- dialog variant (informational, dismissible) -->
      <Modal id="settings-modal" title="Settings" variant="dialog">
        <p>Update your notification preferences below.</p>
        <footer slot="footer">
          <Button variant="secondary" data-modal-close>Cancel</Button>
          <Button variant="primary">Save changes</Button>
        </footer>
      </Modal>

      <!-- alertdialog variant (requires explicit user decision) -->
      <Modal id="delete-modal" title="Delete account?" variant="alertdialog">
        <p>This action cannot be undone. All data will be permanently removed.</p>
        <footer slot="footer">
          <Button variant="secondary" data-modal-close>Cancel</Button>
          <Button variant="danger" onclick="deleteAccount()">Delete account</Button>
        </footer>
      </Modal>

      <!-- trigger -->
      <Button variant="primary" data-modal-open="settings-modal">Open settings</Button>
  - framework: vue
    code: |
      <template>
        <Button variant="primary" @click="showSettings = true">Open settings</Button>
        <Button variant="danger" @click="showDelete = true">Delete account</Button>

        <Modal
          v-model="showSettings"
          title="Settings"
          variant="dialog"
          @close="showSettings = false"
        >
          <p>Update your notification preferences below.</p>
          <template #footer>
            <Button variant="secondary" @click="showSettings = false">Cancel</Button>
            <Button variant="primary" @click="saveSettings">Save changes</Button>
          </template>
        </Modal>

        <Modal
          v-model="showDelete"
          title="Delete account?"
          variant="alertdialog"
          :close-on-backdrop="false"
          @close="showDelete = false"
        >
          <p>This action cannot be undone.</p>
          <template #footer>
            <Button variant="secondary" @click="showDelete = false">Cancel</Button>
            <Button variant="danger" @click="deleteAccount">Delete account</Button>
          </template>
        </Modal>
      </template>

      <script setup>
      import { ref } from 'vue';
      import Modal from '@zuga-technologies/ui/Modal.vue';
      import Button from '@zuga-technologies/ui/Button.vue';

      const showSettings = ref(false);
      const showDelete = ref(false);
      async function saveSettings() { /* ... */ showSettings.value = false; }
      async function deleteAccount() { /* ... */ showDelete.value = false; }
      </script>
  - framework: plain-html
    code: |
      <!-- backdrop -->
      <div id="modal-backdrop" class="modal-backdrop" aria-hidden="true"></div>

      <!-- dialog modal -->
      <div
        id="settings-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-modal-title"
        class="modal modal--dialog"
        hidden
      >
        <header class="modal__header">
          <h2 id="settings-modal-title" class="modal__title">Settings</h2>
          <button type="button" class="modal__close" aria-label="Close settings dialog">
            <svg aria-hidden="true" focusable="false"><!-- × icon --></svg>
          </button>
        </header>
        <div class="modal__body">
          <p>Update your notification preferences below.</p>
        </div>
        <footer class="modal__footer">
          <button type="button" class="btn btn--secondary" data-modal-close>Cancel</button>
          <button type="button" class="btn btn--primary">Save changes</button>
        </footer>
      </div>

      <!-- alertdialog (confirmation, no backdrop click dismiss) -->
      <div
        id="delete-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-body"
        class="modal modal--alertdialog"
        hidden
      >
        <header class="modal__header">
          <h2 id="delete-modal-title" class="modal__title">Delete account?</h2>
        </header>
        <div id="delete-modal-body" class="modal__body">
          <p>This action cannot be undone. All data will be permanently removed.</p>
        </div>
        <footer class="modal__footer">
          <button type="button" class="btn btn--secondary" data-modal-close>Cancel</button>
          <button type="button" class="btn btn--danger" onclick="deleteAccount()">
            Delete account
          </button>
        </footer>
      </div>
donts:
  - Do not open a modal from within another modal — use a step flow or wizard pattern instead.
  - Do not use a modal for non-critical confirmations where inline messaging would suffice — modals interrupt flow and carry a high cognitive cost.
  - Do not skip aria-modal="true" — without it, screen readers do not confine navigation to the modal, defeating the focus trap semantically.
  - Do not auto-dismiss alertdialog modals — any modal that requires a user decision must wait for an explicit response.
  - Do not scroll the page body while a modal is open — apply overflow:hidden to <body> when the modal opens; restore it on close.
tokens:
  - component.modal.bg
  - component.modal.fg
  - component.modal.border
  - component.modal.radius
  - component.modal.shadow
  - component.modal.padding
  - component.modal.max-width
  - component.modal.backdrop
  - component.modal.backdrop-z
  - component.modal.z
---

# Modal

## Anatomy

```
┌────────────────── backdrop (z: --z-modal-backdrop) ───────────────────┐
│  rgba(15, 23, 42, 0.5)  ← --component-modal-backdrop                  │
│                                                                         │
│    ┌──────────────────────────────────────────────────┐                │
│    │  Header: Title text                        [×]   │ ← close btn   │
│    ├──────────────────────────────────────────────────┤                │
│    │                                                  │                │
│    │  Body content slot                               │                │
│    │                                                  │                │
│    ├──────────────────────────────────────────────────┤                │
│    │  Footer: [Cancel]   [Primary action]             │                │
│    └──────────────────────────────────────────────────┘                │
│      ↑ --component-modal-bg (white)                                     │
│      ↑ --component-modal-shadow (shadow-xl)                             │
│      ↑ --component-modal-radius (radius-xl)                             │
│      ↑ max-width: --component-modal-max-width (32rem)                   │
└─────────────────────────────────────────────────────────────────────────┘
```

Each part:

- **Backdrop overlay** — full-viewport semi-transparent layer (`--component-modal-backdrop`, rgba slate-900 at 0.5 opacity) at `z-index: --z-modal-backdrop` (30). Clicking the backdrop closes `dialog` variant modals; clicking backdrop on `alertdialog` does nothing — the user must choose a button action.
- **Dialog container** — the `<div role="dialog">` or `<div role="alertdialog">` element. White background, `--component-modal-radius` (radius-xl, 12px), `--component-modal-shadow` (shadow-xl). Max-width 32rem; centered with `margin: auto` and flexbox centering on the backdrop. Z-index: `--z-modal` (40).
- **Header** — contains the dialog title (rendered as `<h2>`, referenced via `aria-labelledby`) and a close button (×). The close button must have `aria-label="Close <title> dialog"`.
- **Body content slot** — the primary content area. Can contain forms, text, images. Referenced via `aria-describedby` on alertdialog variants.
- **Footer action slot** — button row. Always place the primary/destructive action to the right; Cancel to the left. For alertdialog, Cancel is mandatory.

## Variants & Usage

**dialog** — Standard informational or form-based overlay. Escape and backdrop-click both dismiss it. Use for settings, detail views, confirmation prompts where canceling is a valid no-op action. Role: `dialog`.

**alertdialog** — Requires an explicit user decision. Backdrop click does NOT dismiss it. Used for destructive actions (Delete, Revoke, Remove), confirmations where "Cancel" vs. the action are both meaningful responses. Escape is still permitted to act as Cancel. Role: `alertdialog`. Combine with `role="alertdialog"` and `aria-describedby` pointing to the body text that explains the consequence.

## Accessibility

### Keyboard

- **Escape** — closes the modal (fires the Cancel action for alertdialog). This behavior is mandatory for all modal types.
- **Tab** — moves focus forward among focusable elements inside the modal only. Focus wraps from the last element back to the first (focus trap).
- **Shift+Tab** — moves focus backward. Also trapped within the modal.

### ARIA / Roles

The outer container carries `role="dialog"` or `role="alertdialog"` plus `aria-modal="true"`. The title is referenced via `aria-labelledby="<title-id>"`. For alertdialog, the body text explaining the consequence is referenced via `aria-describedby="<body-id>"`. This ensures screen readers announce both title and consequence on modal open.

### Screen reader script

- **Dialog open:** "Settings, dialog — Update your notification preferences below." (title + first body text)
- **Alertdialog open:** "Delete account? alertdialog — This action cannot be undone." (immediately announces the warning text)
- **Close button:** "Close settings dialog, button"
- **Dialog closed:** focus returns to the trigger button; SR announces the button again

### Contrast verification

- **Body text:** slate-900 (#0f172a) on white (#ffffff) = **17.85:1** — AAA.
- **Close button icon:** slate-700 (#334155) on white = **10.35:1** — AAA.
- **Modal border** (non-text): slate-300 (#cbd5e1) against white = **1.48:1** — **below WCAG 1.4.11 (3:1 non-text contrast)**. The modal boundary is communicated primarily through `box-shadow` (shadow-xl), not border contrast alone. Studios with strict compliance requirements should increase border weight to 2px and/or shift to slate-400 (≈2.81:1) or slate-500 (≈4.61:1, clears 3:1).

### Focus behavior

Focus trap: when the modal opens, the first focusable element inside the dialog (typically the close button or the first form field) receives focus. Tab and Shift+Tab cycle among only the focusable elements within `role="dialog"`. When the modal closes, focus returns to the element that triggered the modal open. Both behaviors are required for WCAG 2.4.3 (Focus Order) and 2.4.11 (Focus Not Obscured). Body scroll is locked (`overflow: hidden` on `<body>`) while the modal is open to prevent content from scrolling behind the backdrop.

## Code

### Astro

```astro
---
import Modal from '@zuga-technologies/ui/Modal.astro';
import Button from '@zuga-technologies/ui/Button.astro';
---
<!-- dialog -->
<Modal id="settings-modal" title="Settings" variant="dialog">
  <p>Update your notification preferences below.</p>
  <footer slot="footer">
    <Button variant="secondary" data-modal-close>Cancel</Button>
    <Button variant="primary">Save changes</Button>
  </footer>
</Modal>

<!-- alertdialog: no backdrop dismiss -->
<Modal id="delete-modal" title="Delete account?" variant="alertdialog">
  <p>This action cannot be undone. All data will be permanently removed.</p>
  <footer slot="footer">
    <Button variant="secondary" data-modal-close>Cancel</Button>
    <Button variant="danger" onclick="deleteAccount()">Delete account</Button>
  </footer>
</Modal>

<Button variant="primary" data-modal-open="settings-modal">Open settings</Button>
```

### Vue

```vue
<template>
  <Modal v-model="open" title="Settings" variant="dialog" @close="open = false">
    <p>Update your notification preferences below.</p>
    <template #footer>
      <Button variant="secondary" @click="open = false">Cancel</Button>
      <Button variant="primary" @click="save">Save changes</Button>
    </template>
  </Modal>

  <Modal
    v-model="showDelete"
    title="Delete account?"
    variant="alertdialog"
    :close-on-backdrop="false"
    @close="showDelete = false"
  >
    <p>This action cannot be undone.</p>
    <template #footer>
      <Button variant="secondary" @click="showDelete = false">Cancel</Button>
      <Button variant="danger" @click="deleteAccount">Delete account</Button>
    </template>
  </Modal>
</template>

<script setup>
import { ref } from 'vue';
import Modal from '@zuga-technologies/ui/Modal.vue';
import Button from '@zuga-technologies/ui/Button.vue';

const open = ref(false);
const showDelete = ref(false);
function save() { open.value = false; }
function deleteAccount() { showDelete.value = false; }
</script>
```

### Plain HTML

```html
<!-- dialog -->
<div role="dialog" aria-modal="true" aria-labelledby="settings-title"
     id="settings-modal" class="modal modal--dialog" hidden>
  <header class="modal__header">
    <h2 id="settings-title" class="modal__title">Settings</h2>
    <button type="button" class="modal__close" aria-label="Close settings dialog">
      <svg aria-hidden="true" focusable="false"><!-- × icon --></svg>
    </button>
  </header>
  <div class="modal__body">
    <p>Update your notification preferences below.</p>
  </div>
  <footer class="modal__footer">
    <button type="button" class="btn btn--secondary" data-modal-close>Cancel</button>
    <button type="button" class="btn btn--primary">Save changes</button>
  </footer>
</div>

<!-- alertdialog -->
<div role="alertdialog" aria-modal="true" aria-labelledby="delete-title"
     aria-describedby="delete-body" id="delete-modal" class="modal" hidden>
  <header class="modal__header">
    <h2 id="delete-title" class="modal__title">Delete account?</h2>
  </header>
  <div id="delete-body" class="modal__body">
    <p>This action cannot be undone. All data will be permanently removed.</p>
  </div>
  <footer class="modal__footer">
    <button type="button" class="btn btn--secondary" data-modal-close>Cancel</button>
    <button type="button" class="btn btn--danger" onclick="deleteAccount()">Delete account</button>
  </footer>
</div>
```

## Don'ts

| Don't | Why |
|---|---|
| Open a modal from within another modal | Focus trap logic breaks; keyboard users get stranded. Use a step/wizard flow instead. |
| Use modals for non-critical prompts | Modals block all page interaction. Use inline messaging for low-stakes states. |
| Skip `aria-modal="true"` | Screen readers allow navigation to background content without it, defeating the focus trap. |
| Auto-dismiss alertdialog modals | The user chose `alertdialog` because a decision is required. A timeout dismissal is the wrong UX. |
| Allow page body to scroll while modal is open | Content shifts under the backdrop; body scroll must be locked (overflow:hidden on body). |

## Tokens reference

The component exposes these tokens (Tier 3, scoped):

- `--component-modal-bg` — dialog surface color (`--surface-primary`, white)
- `--component-modal-fg` — body text color (`--text-primary`, slate-900)
- `--component-modal-border` — dialog border (`--border-default`, slate-300)
- `--component-modal-radius` — corner rounding (`--radius-xl`, 12px)
- `--component-modal-shadow` — elevation (`--shadow-xl`)
- `--component-modal-padding` — interior padding (`--space-8`, 32px)
- `--component-modal-max-width` — dialog container width cap (32rem / 512px)
- `--component-modal-backdrop` — overlay color (`--surface-overlay`, rgba slate-900 0.5)
- `--component-modal-backdrop-z` — backdrop layer (`--z-modal-backdrop`, 30)
- `--component-modal-z` — dialog layer (`--z-modal`, 40)

These compose from Tier 2 semantic tokens (which compose from Tier 1 primitives — see §4 + §5).
