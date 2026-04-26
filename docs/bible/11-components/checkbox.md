---
name: Checkbox
summary: Binary selection control used in forms and settings panels.
anatomy:
  - Checkbox control box (border + fill)
  - Checkmark icon
  - Label text
  - Focus ring
variants:
  - default
  - indeterminate
  - disabled
accessibility:
  keyboard:
    - Tab focuses the checkbox control
    - Space toggles the checked state
    - Shift+Tab moves focus backward
  ariaRoles:
    - checkbox
  contrastNotes: >
    Checkmark: --component-checkbox-fg-check (#ffffff, --accent-fg) on --component-checkbox-bg-checked (cyan-700 #0e7490) = 5.36:1 — clears AA.
    Default box border: --component-checkbox-border-default (slate-300 #cbd5e1) against white = 1.48:1 non-text contrast — below WCAG 1.4.11 (3:1 non-text contrast). The checkbox boundary is communicated through shape and the checkmark glyph rather than border contrast alone. Studios with strict compliance requirements should shift to slate-500 (4.61:1, clears 3:1) or increase border weight to 2px.
    Label text: slate-900 (#0f172a) on white = 17.85:1 — AAA.
    Error border: --component-checkbox-border-error (red-600 #dc2626) against white = non-text; measured at 4.83:1 — clears AA.
  focusBehavior: >
    Focus ring wraps the checkbox control box using --border-focus (cyan-500), 2px solid, 2px offset.
    Triggered via :focus-visible only; does not appear on mouse click.
examples:
  - framework: astro
    code: |
      ---
      import Checkbox from '@zuga-technologies/ui/Checkbox.astro';
      ---
      <!-- default unchecked -->
      <Checkbox name="terms" label="Accept terms and conditions" />

      <!-- pre-checked -->
      <Checkbox name="marketing" label="Receive product updates" checked />

      <!-- indeterminate (e.g., parent of a partial selection) -->
      <Checkbox name="select-all" label="Select all" indeterminate />

      <!-- disabled -->
      <Checkbox name="required" label="Required by your plan" disabled checked />

      <!-- with error state -->
      <Checkbox name="terms" label="Accept terms" error="You must accept the terms to continue." />
  - framework: vue
    code: |
      <template>
        <Checkbox
          v-model="accepted"
          name="terms"
          label="Accept terms and conditions"
        />

        <Checkbox
          v-model="selectAll"
          name="select-all"
          label="Select all"
          :indeterminate="isPartialSelection"
        />

        <Checkbox
          v-model="marketing"
          name="marketing"
          label="Receive product updates"
          :error="marketingError"
        />
      </template>

      <script setup>
      import { ref, computed } from 'vue';
      import Checkbox from '@zuga-technologies/ui/Checkbox.vue';

      const accepted = ref(false);
      const marketing = ref(false);
      const marketingError = ref('');
      const selectedItems = ref([]);
      const allItems = [1, 2, 3, 4];
      const selectAll = computed({
        get: () => selectedItems.value.length === allItems.length,
        set: (val) => { selectedItems.value = val ? [...allItems] : []; },
      });
      const isPartialSelection = computed(() =>
        selectedItems.value.length > 0 && selectedItems.value.length < allItems.length
      );
      </script>
  - framework: plain-html
    code: |
      <!-- default checkbox with visible label -->
      <div class="checkbox-field">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          class="checkbox__control"
        />
        <label for="terms" class="checkbox__label">
          Accept terms and conditions
        </label>
      </div>

      <!-- indeterminate: set via JS -->
      <div class="checkbox-field">
        <input
          type="checkbox"
          id="select-all"
          name="select-all"
          class="checkbox__control"
          aria-checked="mixed"
        />
        <label for="select-all" class="checkbox__label">Select all</label>
      </div>
      <script>
        document.getElementById('select-all').indeterminate = true;
      </script>

      <!-- error state -->
      <div class="checkbox-field checkbox-field--error">
        <input
          type="checkbox"
          id="terms-err"
          name="terms"
          class="checkbox__control"
          aria-invalid="true"
          aria-describedby="terms-error"
        />
        <label for="terms-err" class="checkbox__label">Accept terms and conditions</label>
        <span id="terms-error" class="checkbox__error-text" role="alert">
          You must accept the terms to continue.
        </span>
      </div>
donts:
  - Do not use checkboxes for mutually exclusive options — use radio buttons; checkboxes imply independent selection.
  - Do not remove the visible label — using only aria-label is not equivalent; sighted users need the visible label.
  - Do not use the indeterminate state as a persistent, settled state — it represents partial selection only and must resolve to checked or unchecked after user interaction.
  - Do not disable a checkbox without explaining why — users who cannot change a setting need to know the reason.
tokens:
  - component.checkbox.size
  - component.checkbox.radius
  - component.checkbox.bg
  - component.checkbox.bg-checked
  - component.checkbox.fg-check
  - component.checkbox.border-default
  - component.checkbox.border-focus
  - component.checkbox.border-error
---

# Checkbox

## Anatomy

```
  ┌──────┐  Label text
  │  ✓   │  ← checkmark icon (--component-checkbox-fg-check on --bg-checked)
  └──────┘
     ↑
  control box (16×16px, --component-checkbox-size)
  --component-checkbox-bg (unchecked: white)
  --component-checkbox-bg-checked (checked: cyan-700)
  --component-checkbox-border-default (unchecked border: slate-300)
  --component-checkbox-border-focus (focus: cyan-500)
  --component-checkbox-border-error (error: red-600)

  ┌ ─ ─ ─ ┐
  │ focus  │  ← 2px ring, --border-focus, 2px offset
  └ ─ ─ ─ ┘
```

Each part:

- **Checkbox control box** — 16×16px (`--component-checkbox-size`). Background transitions between unchecked (`--component-checkbox-bg`, white) and checked (`--component-checkbox-bg-checked`, cyan-700) on state change. Border uses `--component-checkbox-border-default` when unchecked, `--component-checkbox-border-focus` when focused, `--component-checkbox-border-error` in error state.
- **Checkmark icon** — rendered as SVG or CSS pseudo-element inside the control. Color is `--component-checkbox-fg-check` (white) against the checked cyan-700 background.
- **Label text** — the associated `<label>` element, linked via `for` / `id`. Required; never omit.
- **Focus ring** — 2px solid `--border-focus` (cyan-500), 2px offset, triggered via `:focus-visible`.

## Variants & Usage

**default** — Standard binary selection. A checkbox represents an independent on/off state. Unchecked means the option is not selected; checked means it is. Use in forms, settings, permission matrices.

**indeterminate** — Represents partial selection: a parent checkbox in a select-all scenario where some but not all children are selected. The `indeterminate` property must be set via JavaScript (it is not a pure HTML attribute). `aria-checked="mixed"` communicates this state to screen readers. This is a transitional state — user interaction resolves it to fully checked or unchecked.

**disabled** — The checkbox cannot be changed. Set the `disabled` attribute. The browser removes the control from the tab sequence automatically. Include a `title` or adjacent explanation for why the control is disabled.

## Accessibility

### Keyboard

- **Tab** — moves focus to the checkbox control.
- **Space** — toggles the checked state. This is the only keyboard activation; Enter does not activate checkboxes.
- **Shift+Tab** — moves focus to the previous element.

### ARIA / Roles

`<input type="checkbox">` carries the implicit `role="checkbox"` — no explicit role needed. The `aria-checked` attribute should mirror the `checked` and `indeterminate` states: `true`, `false`, or `mixed`. For error states, apply `aria-invalid="true"` and link the error message via `aria-describedby="<error-id>"`.

### Screen reader script

- **Unchecked:** "Accept terms and conditions, checkbox, not checked"
- **Checked:** "Accept terms and conditions, checkbox, checked"
- **Indeterminate:** "Select all, checkbox, mixed"
- **Error, unchecked:** "Accept terms and conditions, checkbox, not checked, invalid — You must accept the terms to continue."
- **Disabled:** "Required by your plan, checkbox, checked, dimmed"

### Contrast verification

- **Checkmark on checked background:** `--component-checkbox-fg-check` (#ffffff) on `--component-checkbox-bg-checked` (cyan-700, #0e7490) = **5.36:1** — clears AA.
- **Default box border** (non-text): slate-300 (#cbd5e1) against white = **1.48:1** — **below WCAG 1.4.11 (3:1 non-text contrast)**. The checkbox boundary is communicated through shape and the checkmark glyph rather than border contrast alone. Studios with strict compliance requirements should shift to slate-400 (≈2.81:1) or slate-500 (≈4.61:1, clears 3:1), or increase border weight to 2px.
- **Error border** (non-text): red-600 (#dc2626) against white = **4.83:1** — clears AA.
- **Label text:** slate-900 (#0f172a) on white = **17.85:1** — AAA.

### Focus behavior

The 2px focus ring in `--border-focus` (cyan-500) wraps the control box, not the label. Triggered via `:focus-visible`. Mouse clicks do not show the ring.

## Code

### Astro

```astro
---
import Checkbox from '@zuga-technologies/ui/Checkbox.astro';
---
<!-- default -->
<Checkbox name="terms" label="Accept terms and conditions" />

<!-- indeterminate -->
<Checkbox name="select-all" label="Select all" indeterminate />

<!-- error state -->
<Checkbox
  name="terms"
  label="Accept terms and conditions"
  error="You must accept the terms to continue."
/>

<!-- disabled -->
<Checkbox name="required" label="Required by your plan" disabled checked />
```

### Vue

```vue
<template>
  <Checkbox v-model="accepted" name="terms" label="Accept terms and conditions" />
  <Checkbox
    v-model="selectAll"
    name="select-all"
    label="Select all"
    :indeterminate="isPartial"
  />
  <Checkbox
    v-model="marketing"
    name="marketing"
    label="Receive updates"
    :error="errors.marketing"
  />
</template>

<script setup>
import { ref } from 'vue';
import Checkbox from '@zuga-technologies/ui/Checkbox.vue';

const accepted = ref(false);
const marketing = ref(false);
const selectAll = ref(false);
const isPartial = ref(true);
const errors = ref({ marketing: '' });
</script>
```

### Plain HTML

```html
<!-- default -->
<div class="checkbox-field">
  <input type="checkbox" id="terms" name="terms" class="checkbox__control" />
  <label for="terms" class="checkbox__label">Accept terms and conditions</label>
</div>

<!-- indeterminate -->
<div class="checkbox-field">
  <input type="checkbox" id="select-all" class="checkbox__control" aria-checked="mixed" />
  <label for="select-all" class="checkbox__label">Select all</label>
</div>
<script>document.getElementById('select-all').indeterminate = true;</script>

<!-- error state -->
<div class="checkbox-field checkbox-field--error">
  <input
    type="checkbox" id="terms-err" name="terms"
    class="checkbox__control"
    aria-invalid="true"
    aria-describedby="terms-err-msg"
  />
  <label for="terms-err" class="checkbox__label">Accept terms and conditions</label>
  <span id="terms-err-msg" class="checkbox__error" role="alert">
    You must accept the terms to continue.
  </span>
</div>
```

## Don'ts

| Don't | Why |
|---|---|
| Use checkboxes for mutually exclusive choices | Multiple selections become possible; use radio buttons for either/or options. |
| Remove the visible label | Screen readers work, but sighted users lose context. Both audiences need the label. |
| Use indeterminate as a final state | It communicates partial selection. Resolve to true/false after the next user action. |
| Disable without explanation | Users cannot change the setting and don't know why. Provide `title` or adjacent text. |

## Tokens reference

The component exposes these tokens (Tier 3, scoped):

- `--component-checkbox-size` — control box dimensions (16px)
- `--component-checkbox-radius` — corner rounding (`--radius-sm`)
- `--component-checkbox-bg` — unchecked background (`--surface-primary`, white)
- `--component-checkbox-bg-checked` — checked background (`--accent-brand`, cyan-700)
- `--component-checkbox-fg-check` — checkmark color (`--accent-fg`, #ffffff)
- `--component-checkbox-border-default` — default border (`--border-default`, slate-300)
- `--component-checkbox-border-focus` — focused border (`--border-focus`, cyan-500)
- `--component-checkbox-border-error` — error state border (`--feedback-danger`, red-600)

These compose from Tier 2 semantic tokens (which compose from Tier 1 primitives — see §4 + §5).
