---
name: Select
summary: Dropdown list component for selecting a single option from a set.
anatomy:
  - Trigger button with current value
  - Dropdown chevron icon
  - Dropdown panel
  - Option list items
  - Selected state indicator
variants:
  - default
  - error
accessibility:
  keyboard:
    - Tab focuses the select trigger
    - Enter or Space opens the dropdown
    - Arrow keys navigate options within the open dropdown
    - Escape closes the dropdown without selecting
    - Home moves to the first option
    - End moves to the last option
  ariaRoles:
    - listbox
    - option
  contrastNotes: >
    Trigger text: --component-select-fg (slate-900 #0f172a) on --component-select-bg (white #ffffff) = 17.85:1 — AAA.
    Placeholder text: --component-select-fg-placeholder (slate-400 #94a3b8) on white = 2.56:1 — below AA; placeholder in select is exempt per WCAG 1.4.3 (same as input).
    Arrow icon: --component-select-arrow-color (slate-700 #334155) on white = 10.35:1 — AAA.
    Error border (non-text): in error state the border becomes --feedback-danger (red-600 #dc2626) against white = 4.83:1 — clears AA. Select has no scoped --component-select-border-error token; error state references --feedback-danger directly.
  focusBehavior: >
    Focus ring on trigger using --border-focus (cyan-500), 2px solid, 2px offset.
    When dropdown is open, the active option is highlighted. Closing returns focus to the trigger.
examples:
  - framework: astro
    code: |
      ---
      import Select from '@zuga-technologies/ui/Select.astro';
      const countries = [
        { value: 'us', label: 'United States' },
        { value: 'mx', label: 'Mexico' },
        { value: 'ca', label: 'Canada' },
      ];
      ---
      <!-- default -->
      <Select name="country" label="Country" :options="countries" placeholder="Select a country" />

      <!-- with pre-selected value -->
      <Select name="country" label="Country" :options="countries" value="us" />

      <!-- error state -->
      <Select
        name="country"
        label="Country"
        :options="countries"
        error="Please select your country."
      />

      <!-- disabled -->
      <Select name="plan" label="Plan" :options="plans" value="growth" disabled />
  - framework: vue
    code: |
      <template>
        <Select
          v-model="country"
          name="country"
          label="Country"
          :options="countries"
          placeholder="Select a country"
          :error="countryError"
        />
        <Select
          v-model="timezone"
          name="timezone"
          label="Timezone"
          :options="timezones"
        />
      </template>

      <script setup>
      import { ref, computed } from 'vue';
      import Select from '@zuga-technologies/ui/Select.vue';

      const country = ref('');
      const timezone = ref('');
      const countries = [
        { value: 'us', label: 'United States' },
        { value: 'mx', label: 'Mexico' },
        { value: 'ca', label: 'Canada' },
      ];
      const timezones = [
        { value: 'America/New_York', label: 'Eastern Time' },
        { value: 'America/Chicago', label: 'Central Time' },
        { value: 'America/Los_Angeles', label: 'Pacific Time' },
      ];
      const countryError = computed(() =>
        !country.value ? 'Please select your country.' : ''
      );
      </script>
  - framework: plain-html
    code: |
      <!-- native select: accessible by default -->
      <div class="select-field">
        <label for="country" class="select__label">Country</label>
        <div class="select__wrapper">
          <select id="country" name="country" class="select__control">
            <option value="" disabled selected>Select a country</option>
            <option value="us">United States</option>
            <option value="mx">Mexico</option>
            <option value="ca">Canada</option>
          </select>
          <svg class="select__arrow" aria-hidden="true" focusable="false">
            <!-- chevron-down icon -->
          </svg>
        </div>
      </div>

      <!-- error state (native) -->
      <div class="select-field select-field--error">
        <label for="country-err" class="select__label">Country</label>
        <div class="select__wrapper">
          <select id="country-err" name="country" class="select__control"
                  aria-invalid="true" aria-describedby="country-error">
            <option value="" disabled selected>Select a country</option>
            <option value="us">United States</option>
          </select>
        </div>
        <span id="country-error" class="select__error" role="alert">
          Please select your country.
        </span>
      </div>
donts:
  - Do not use a select for binary yes/no choices — use a checkbox or toggle, which are faster to activate.
  - Do not use a custom select without full keyboard support — if you replace the native <select>, you must implement all keyboard bindings manually.
  - Do not omit the visible label — placeholder text inside the trigger is not a label substitute.
  - Do not use a select for more than ~20 options without a search/filter — scrolling through long lists is unusable on keyboard.
tokens:
  - component.select.padding-x
  - component.select.padding-y
  - component.select.radius
  - component.select.bg
  - component.select.bg-disabled
  - component.select.border
  - component.select.border-focus
  - component.select.fg
  - component.select.fg-placeholder
  - component.select.font-size
  - component.select.min-height
  - component.select.arrow-color
---

# Select

## Anatomy

```
  Label text                             ← always visible <label>, linked via for/id
  ┌──────────────────────────────────┐
  │  Current value or placeholder  ▾ │  ← trigger button + chevron icon
  └──────────────────────────────────┘
  ↓ (when open)
  ┌──────────────────────────────────┐
  │  Option 1                        │  ← option list (role="listbox")
  │  ● Option 2 (selected)           │  ← selected (role="option" aria-selected="true")
  │  Option 3                        │
  └──────────────────────────────────┘
```

Each part:

- **Trigger button** — displays the currently selected value (or placeholder if none selected). On activation, opens the dropdown. Carries `aria-haspopup="listbox"` and `aria-expanded` state.
- **Dropdown chevron icon** — `aria-hidden="true"` decorative indicator. Color: `--component-select-arrow-color` (slate-700).
- **Dropdown panel** — the `role="listbox"` container. Positioned below the trigger. Width matches trigger. Z-index: `--z-dropdown` (10).
- **Option list items** — each option is `role="option"`. The selected option carries `aria-selected="true"`. Active (keyboard-focused) option is highlighted using `--accent-brand` (cyan-700).
- **Selected state indicator** — a checkmark or color highlight on the currently selected option within the open list.

## Variants & Usage

**default** — Standard single-value selection. White background, slate-300 border, slate-900 text. Focuses on simplicity — use when 3–20 options exist and a selection is optional or can have a reasonable default.

**error** — Validation failure state. Border changes to `--feedback-danger` (red-600) — select's error state inherits from the Tier 2 feedback semantic token directly; select has no scoped `--component-select-border-error` token. Add `aria-invalid="true"` on the select control and `aria-describedby` pointing to the error message element.

## Accessibility

### Keyboard

- **Tab** — focuses the select trigger.
- **Enter / Space** — opens the dropdown listbox.
- **Arrow Up/Down** — navigates options within the open dropdown.
- **Home / End** — jumps to first or last option.
- **Escape** — closes the dropdown without changing the selection; returns focus to trigger.
- **Type-ahead** — pressing a letter key jumps to the first option starting with that character.

### ARIA / Roles

The dropdown panel carries `role="listbox"`. Each option carries `role="option"` with `aria-selected="true|false"`. The trigger carries `aria-haspopup="listbox"`, `aria-expanded="true|false"`, and `aria-controls="<listbox-id>"`. Error state: `aria-invalid="true"` on the trigger and `aria-describedby="<error-id>"`.

For native `<select>` elements, all of this is handled by the browser — prefer native `<select>` unless the design requires custom option rendering.

### Screen reader script

- **Closed, no selection:** "Country, collapsed, select a country"
- **Closed, with selection:** "Country, collapsed, United States"
- **Open:** "Country, expanded, listbox — Select a country, Option 1 of 3"
- **Error state:** "Country, collapsed, invalid — Please select your country."

### Contrast verification

- **Trigger text:** slate-900 (#0f172a) on white (#ffffff) = **17.85:1** — AAA.
- **Arrow icon** (non-text): slate-700 (#334155) on white = **10.35:1** — well above AA.
- **Error border** (non-text): red-600 (#dc2626) against white = **4.83:1** — clears AA.
- **Placeholder text:** slate-400 (#94a3b8) on white = **2.56:1** — exempt per WCAG 1.4.3; visible label is required regardless.
- **Focus border** (non-text): `--border-focus` (cyan-500, #06b6d4) on white = **2.43:1** — below the 3:1 WCAG 1.4.11 non-text contrast threshold. This is the same known design tension as `input.md`; the border-color transition from slate-300 to cyan-500 provides a perceptual cue. Studios with strict compliance requirements should increase focus border weight to 2–3px or add an outer offset ring.

### Focus behavior

A 2px border-color change to `--component-select-border-focus` (cyan-500) plus a ring shadow applies on `:focus-visible` to the trigger. When the listbox opens, keyboard focus moves into the list and the trigger loses the focus ring until the dropdown closes.

## Code

### Astro

```astro
---
import Select from '@zuga-technologies/ui/Select.astro';
const countries = [
  { value: 'us', label: 'United States' },
  { value: 'mx', label: 'Mexico' },
  { value: 'ca', label: 'Canada' },
];
---
<Select name="country" label="Country" options={countries} placeholder="Select a country" />

<!-- error state -->
<Select
  name="country"
  label="Country"
  options={countries}
  error="Please select your country."
/>
```

### Vue

```vue
<template>
  <Select
    v-model="country"
    name="country"
    label="Country"
    :options="countries"
    placeholder="Select a country"
    :error="countryError"
  />
</template>

<script setup>
import { ref, computed } from 'vue';
import Select from '@zuga-technologies/ui/Select.vue';

const country = ref('');
const countries = [
  { value: 'us', label: 'United States' },
  { value: 'mx', label: 'Mexico' },
  { value: 'ca', label: 'Canada' },
];
const countryError = computed(() =>
  !country.value ? 'Please select your country.' : ''
);
</script>
```

### Plain HTML

```html
<div class="select-field">
  <label for="country" class="select__label">Country</label>
  <div class="select__wrapper">
    <select id="country" name="country" class="select__control">
      <option value="" disabled selected>Select a country</option>
      <option value="us">United States</option>
      <option value="mx">Mexico</option>
      <option value="ca">Canada</option>
    </select>
  </div>
</div>

<!-- error state -->
<div class="select-field select-field--error">
  <label for="country-err" class="select__label">Country</label>
  <select id="country-err" name="country" class="select__control"
          aria-invalid="true" aria-describedby="country-error">
    <option value="" disabled selected>Select a country</option>
    <option value="us">United States</option>
  </select>
  <span id="country-error" class="select__error" role="alert">
    Please select your country.
  </span>
</div>
```

## Don'ts

| Don't | Why |
|---|---|
| Use select for yes/no choices | A checkbox or toggle activates in one step; a select requires open → choose → confirm. Unnecessary friction. |
| Replace native select without full keyboard parity | Custom selects that lack Arrow/Home/End/Escape/type-ahead fail keyboard users completely. |
| Omit the visible label | Trigger placeholder is not a persistent label. Both sighted and SR users need a label that doesn't disappear on selection. |
| Use select for 20+ options without search | Long lists are slow to navigate by keyboard. Add a filterable combobox or autocomplete pattern instead. |

## Tokens reference

The component exposes these tokens (Tier 3, scoped):

- `--component-select-padding-x` — horizontal padding (`--space-3`, 12px)
- `--component-select-padding-y` — vertical padding (`--space-2`, 8px)
- `--component-select-radius` — border radius (`--radius-md`, 6px)
- `--component-select-bg` — default background (`--surface-primary`, white)
- `--component-select-bg-disabled` — disabled background (`--surface-secondary`, slate-100)
- `--component-select-border` — default border (`--border-default`, slate-300)
- `--component-select-border-focus` — focused border (`--border-focus`, cyan-500)
- `--component-select-fg` — text color (`--text-primary`, slate-900)
- `--component-select-fg-placeholder` — placeholder color (`--text-muted`, slate-400)
- `--component-select-font-size` — type size (`--type-scale-sm`, 14px)
- `--component-select-min-height` — minimum trigger height (36px)
- `--component-select-arrow-color` — chevron color (`--text-secondary`, slate-700)

These compose from Tier 2 semantic tokens (which compose from Tier 1 primitives — see §4 + §5).
