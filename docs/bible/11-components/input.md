---
name: Input
summary: Single-line text entry field used across forms in all Zuga studios.
anatomy:
  - Label (always visible)
  - Input field container (border + bg + padding)
  - Placeholder text
  - Helper text / error text
  - Leading/trailing icon slot (optional)
variants:
  - text
  - email
  - password
  - number
  - search
accessibility:
  keyboard:
    - Tab focuses the input field
    - Shift+Tab moves focus backward
    - Standard text editing keys apply when focused (arrow keys, Home, End, Ctrl+A, etc.)
  ariaRoles:
    - textbox
  contrastNotes: >
    Input text: --component-input-fg (slate-900 #0f172a) on --component-input-bg (white #ffffff) = 17.85:1 — AAA.
    Placeholder text: --component-input-fg-placeholder (slate-400 #94a3b8) on white = 2.56:1 — below AA 4.5:1 threshold.
    Placeholder text contrast is intentionally subdued to distinguish it from real input; WCAG 1.4.3 exempts placeholder text from the 4.5:1 requirement. A visible label is required for all inputs regardless.
    Error border (non-text): --component-input-border-error (red-600 #dc2626) against white = 4.83:1 — clears AA.
    Focus border (non-text): --component-input-border-focus (cyan-500 #06b6d4) against white = 2.43:1 — below 3:1 but this is a focus ring indicator where the ring width + shape provides sufficient perceptual cue per WCAG 1.4.11 (note: this is a known design tension; studios may increase focus border width to compensate).
  focusBehavior: >
    A 2px solid border in --component-input-border-focus (cyan-500) is applied on :focus-visible.
    The full input container receives the focus style. Disabled inputs are not focusable.
examples:
  - framework: astro
    code: |
      ---
      import Input from '@zuga-technologies/ui/Input.astro';
      ---
      <!-- text -->
      <Input type="text" name="username" label="Username" placeholder="e.g. antonio" />

      <!-- email with error -->
      <Input
        type="email"
        name="email"
        label="Email address"
        value="not-an-email"
        error="Enter a valid email address."
      />

      <!-- password -->
      <Input type="password" name="password" label="Password" />

      <!-- search with leading icon -->
      <Input type="search" name="q" label="Search" placeholder="Search studios…" leadingIcon="search" />

      <!-- disabled -->
      <Input type="text" name="plan" label="Current plan" value="Growth" disabled />
  - framework: vue
    code: |
      <template>
        <Input
          v-model="email"
          type="email"
          name="email"
          label="Email address"
          :error="emailError"
        />
        <Input
          v-model="password"
          type="password"
          name="password"
          label="Password"
          :helper="passwordHelper"
        />
        <Input
          v-model="query"
          type="search"
          name="q"
          label="Search"
          placeholder="Search studios…"
        />
      </template>

      <script setup>
      import { ref, computed } from 'vue';
      import Input from '@zuga-technologies/ui/Input.vue';

      const email = ref('');
      const password = ref('');
      const query = ref('');

      const emailError = computed(() =>
        email.value && !email.value.includes('@')
          ? 'Enter a valid email address.'
          : ''
      );
      const passwordHelper = 'At least 8 characters.';
      </script>
  - framework: plain-html
    code: |
      <!-- text input with visible label -->
      <div class="input-field">
        <label for="username" class="input__label">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          class="input__control"
          placeholder="e.g. antonio"
        />
      </div>

      <!-- email with error state -->
      <div class="input-field input-field--error">
        <label for="email" class="input__label">Email address</label>
        <input
          type="email"
          id="email"
          name="email"
          class="input__control"
          aria-invalid="true"
          aria-describedby="email-error"
          value="not-an-email"
        />
        <span id="email-error" class="input__error" role="alert">
          Enter a valid email address.
        </span>
      </div>

      <!-- password -->
      <div class="input-field">
        <label for="password" class="input__label">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          class="input__control"
          aria-describedby="password-helper"
        />
        <span id="password-helper" class="input__helper">At least 8 characters.</span>
      </div>
donts:
  - Do not remove the visible label — placeholder alone is not accessible; it disappears on input and fails screen reader users and users with cognitive disabilities.
  - Do not use placeholder text as a label substitute — it provides hint text only; it is not a persistent label.
  - Do not skip aria-invalid on error states — set aria-invalid="true" on the input element when validation fails.
  - Do not skip aria-describedby — link error text and helper text by ID so screen readers announce them with the field.
  - Do not use type="text" for structured data — use type="email", "number", "password", "search" appropriately; browsers apply native validation and mobile keyboards based on type.
tokens:
  - component.input.padding-x
  - component.input.padding-y
  - component.input.radius
  - component.input.bg
  - component.input.bg-disabled
  - component.input.border
  - component.input.border-focus
  - component.input.border-error
  - component.input.fg
  - component.input.fg-placeholder
  - component.input.font-size
  - component.input.min-height
---

# Input

## Anatomy

```
  Label text                        ← always visible <label> element, linked via for/id
  ┌────────────────────────────────┐
  │  [icon?]  Input value...       │  ← --component-input-bg (white)
  └────────────────────────────────┘  ← --component-input-border (slate-300)
         ↑ placeholder              ← --component-input-fg-placeholder (slate-400)
         ↑ typed value              ← --component-input-fg (slate-900)

  Helper text or error message      ← linked via aria-describedby
```

Each part:

- **Label** — a `<label>` element linked to the input via `for`/`id`. Always visible — never replaced by placeholder or aria-label alone.
- **Input field container** — the `<input>` element. Min-height 36px (`--component-input-min-height`). Background is `--component-input-bg` (white), border is `--component-input-border` (slate-300). Radius is `--component-input-radius` (radius-md, 6px). Font size is `--component-input-font-size` (14px).
- **Placeholder text** — hint text inside the field when empty. Uses `--component-input-fg-placeholder` (slate-400). Disappears on input — not a substitute for a label.
- **Helper / error text** — supplementary text below the input. Helper text provides format guidance; error text appears in the error state with `role="alert"` and is linked via `aria-describedby`. Both are `<span>` elements with unique IDs.
- **Leading/trailing icon slot** — optional 16px icon inside the input container. Leading icon: search, lock, mail glyphs for context. Trailing icon: clear (×), toggle password visibility. Icons are `aria-hidden="true"` and do not replace the label.

## Variants & Usage

**text** — Generic single-line text. Use when no specific data format applies: names, titles, descriptions, URLs.

**email** — `type="email"`. Browser applies basic format validation and shows email keyboard on mobile. Use for all email address fields. Pair with server-side validation.

**password** — `type="password"`. Masks the input value. Include a toggle button to reveal the password (trailing icon position). Do not log or surface password values in any form.

**number** — `type="number"`. Use for quantity inputs, age, numeric codes. Avoid for ZIP codes and phone numbers — use `type="text"` with `inputmode="numeric"` and `pattern` instead to prevent mobile keyboard issues.

**search** — `type="search"`. Browser may apply native search UI (e.g., × clear button on iOS). Use for search bars where clear is a common action. Pair with `role="search"` on the wrapping form element.

## Accessibility

### Keyboard

- **Tab** — focuses the input field.
- **Shift+Tab** — moves focus backward.
- **Standard text editing** — arrow keys, Home, End, Ctrl+A (select all), Ctrl+C/V, Delete, Backspace work natively within the focused input.

### ARIA / Roles

`<input type="text">` carries implicit `role="textbox"`. For error states: set `aria-invalid="true"` directly on the `<input>` element when validation fails, and add `aria-describedby="<error-id>"` pointing to the error message element. For helper text visible at all times: add `aria-describedby="<helper-id>"`. If both exist: `aria-describedby="helper-id error-id"` (space-separated).

### Screen reader script

- **Default, empty:** "Email address, edit text"
- **Filled:** "Email address, not-an-email@, edit text"
- **Error state:** "Email address, edit text, invalid entry — Enter a valid email address."
- **With helper:** "Password, edit text — At least 8 characters."
- **Disabled:** "Current plan, edit text, dimmed"

### Contrast verification

- **Input text:** `--component-input-fg` (slate-900, #0f172a) on `--component-input-bg` (white, #ffffff) = **17.85:1** — AAA.
- **Placeholder text:** slate-400 (#94a3b8) on white = **2.56:1** — below 4.5:1. WCAG 1.4.3 explicitly exempts placeholder text. A visible, always-present label ensures no information is lost.
- **Error border** (non-text): red-600 (#dc2626) against white = **4.83:1** — clears AA for UI component contrast (WCAG 1.4.11, 3:1 threshold).
- **Focus border** (non-text): cyan-500 (#06b6d4) against white = **2.43:1** — below the 3:1 WCAG 1.4.11 non-text contrast threshold. This is a known design tension; the transition from the standard slate-300 border to cyan-500 provides a perceptual change that compensates partially. Studios with strict compliance requirements should increase focus border weight to 2–3px or add an outer offset ring.

### Focus behavior

A 2px border-color change to `--component-input-border-focus` (cyan-500) triggers on `:focus-visible`. The transition is accompanied by a slight box-shadow ring to increase perceived contrast. Disabled inputs (`disabled` attribute) are removed from the tab sequence by the browser.

## Code

### Astro

```astro
---
import Input from '@zuga-technologies/ui/Input.astro';
---
<!-- text -->
<Input type="text" name="username" label="Username" placeholder="e.g. antonio" />

<!-- email with error -->
<Input
  type="email"
  name="email"
  label="Email address"
  value="not-an-email"
  error="Enter a valid email address."
/>

<!-- password -->
<Input type="password" name="password" label="Password" helper="At least 8 characters." />

<!-- search -->
<Input type="search" name="q" label="Search" placeholder="Search studios…" />
```

### Vue

```vue
<template>
  <Input
    v-model="email"
    type="email"
    name="email"
    label="Email address"
    :error="emailError"
  />
  <Input
    v-model="password"
    type="password"
    name="password"
    label="Password"
    helper="At least 8 characters."
  />
</template>

<script setup>
import { ref, computed } from 'vue';
import Input from '@zuga-technologies/ui/Input.vue';

const email = ref('');
const password = ref('');
const emailError = computed(() =>
  email.value && !email.value.includes('@') ? 'Enter a valid email address.' : ''
);
</script>
```

### Plain HTML

```html
<!-- text with visible label -->
<div class="input-field">
  <label for="username" class="input__label">Username</label>
  <input type="text" id="username" name="username" class="input__control"
         placeholder="e.g. antonio" />
</div>

<!-- email with error -->
<div class="input-field input-field--error">
  <label for="email" class="input__label">Email address</label>
  <input type="email" id="email" name="email" class="input__control"
         aria-invalid="true" aria-describedby="email-error" />
  <span id="email-error" class="input__error" role="alert">
    Enter a valid email address.
  </span>
</div>

<!-- password with helper -->
<div class="input-field">
  <label for="password" class="input__label">Password</label>
  <input type="password" id="password" name="password" class="input__control"
         aria-describedby="password-helper" />
  <span id="password-helper" class="input__helper">At least 8 characters.</span>
</div>
```

## Don'ts

| Don't | Why |
|---|---|
| Remove the visible label | Placeholder disappears on input; aria-label alone is invisible to sighted users. Both audiences need a persistent label. |
| Use placeholder as a label substitute | Placeholder text fails cognitive disability users and has low contrast; it is hint text only. |
| Omit `aria-invalid` on error state | Screen readers won't announce the invalid state without the attribute set on the input itself. |
| Skip `aria-describedby` for error/helper text | Error text that isn't linked to the input is announced by SR only if the user navigates to it — not when the field is focused. |
| Use `type="number"` for phone or ZIP | Spinners appear; mobile keyboards show the wrong layout. Use `type="text"` with `inputmode="numeric"`. |

## Tokens reference

The component exposes these tokens (Tier 3, scoped):

- `--component-input-padding-x` — horizontal padding inside the field (`--space-3`, 12px)
- `--component-input-padding-y` — vertical padding (`--space-2`, 8px)
- `--component-input-radius` — border radius (`--radius-md`, 6px)
- `--component-input-bg` — default background (`--surface-primary`, white)
- `--component-input-bg-disabled` — disabled background (`--surface-secondary`, slate-100)
- `--component-input-border` — default border color (`--border-default`, slate-300)
- `--component-input-border-focus` — focused border (`--border-focus`, cyan-500)
- `--component-input-border-error` — error state border (`--feedback-danger`, red-600)
- `--component-input-fg` — input text color (`--text-primary`, slate-900)
- `--component-input-fg-placeholder` — placeholder text color (`--text-muted`, slate-400)
- `--component-input-font-size` — type size (`--type-scale-sm`, 14px)
- `--component-input-min-height` — minimum tap target (36px)

These compose from Tier 2 semantic tokens (which compose from Tier 1 primitives — see §4 + §5).
