---
name: Button
summary: The primary interactive trigger for actions across all Zuga studios.
anatomy:
  - Label text
  - Container (bg + border-radius)
  - Icon slot (optional leading/trailing)
  - Focus ring (2px offset, --border-focus color)
variants:
  - primary
  - secondary
  - ghost
  - danger
accessibility:
  keyboard:
    - Enter activates the button
    - Space activates the button
    - Tab moves focus to the next interactive element
    - Shift+Tab moves focus to the previous interactive element
  ariaRoles:
    - button
  contrastNotes: >
    Primary: --component-button-fg-primary (#ffffff) on --component-button-bg-primary (cyan-700 #0e7490) = 5.36:1 — clears AA.
    Danger: --component-button-fg-danger (#ffffff) on --component-button-bg-danger (red-600 #dc2626) = 4.83:1 — clears AA.
    Secondary: --component-button-fg-secondary (slate-900 #0f172a) on --component-button-bg-secondary (slate-100 #f1f5f9) = 16.30:1 — AAA.
    Ghost: slate-900 on transparent (effective bg slate-50 #f8fafc) = 17.06:1 — AAA.
    Disabled: slate-500 (#64748b) on slate-300 (#cbd5e1) = 4.76:1 — marginal AA; disabled state is exempt from WCAG 1.4.3 per spec.
  focusBehavior: >
    Visible focus ring using --border-focus (cyan-500) with 2px solid outline and 2px offset on all variants.
    Disabled buttons do not appear in the tab sequence (disabled attribute removes them from focus order).
examples:
  - framework: astro
    code: |
      ---
      import Button from '@zuga-technologies/ui/Button.astro';
      ---
      <Button variant="primary" onclick="handleSave()">Save</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="ghost">More options</Button>
      <Button variant="danger" onclick="handleDelete()">Delete account</Button>
      <Button variant="primary" disabled>Saving…</Button>
  - framework: vue
    code: |
      <template>
        <Button variant="primary" @click="handleSave">Save</Button>
        <Button variant="secondary" @click="handleCancel">Cancel</Button>
        <Button variant="ghost" @click="openMenu">More options</Button>
        <Button variant="danger" @click="handleDelete">Delete account</Button>
        <Button variant="primary" :disabled="isSaving">
          {{ isSaving ? 'Saving…' : 'Save' }}
        </Button>
      </template>

      <script setup>
      import Button from '@zuga-technologies/ui/Button.vue';
      const isSaving = ref(false);
      async function handleSave() {
        isSaving.value = true;
        await save();
        isSaving.value = false;
      }
      </script>
  - framework: plain-html
    code: |
      <!-- primary -->
      <button type="button" class="btn btn--primary">Save</button>

      <!-- secondary -->
      <button type="button" class="btn btn--secondary">Cancel</button>

      <!-- ghost -->
      <button type="button" class="btn btn--ghost">More options</button>

      <!-- danger -->
      <button type="button" class="btn btn--danger">Delete account</button>

      <!-- disabled (note: title provides tooltip explaining why) -->
      <button type="button" class="btn btn--primary" disabled
              title="Complete the required fields before saving">
        Save
      </button>
donts:
  - Do not use a button as a navigation link — use an anchor element; buttons imply an in-page action, not a URL change.
  - Do not disable a button without a tooltip or adjacent explanation — a user who cannot proceed needs to know why.
  - Do not place an icon-only button without an aria-label — the label text is the accessible name.
  - Do not use the danger variant for non-destructive actions — it signals irreversible operations and raises cognitive cost.
tokens:
  - component.button.bg-primary
  - component.button.bg-primary-hover
  - component.button.bg-primary-active
  - component.button.bg-primary-disabled
  - component.button.fg-primary
  - component.button.fg-primary-disabled
  - component.button.bg-secondary
  - component.button.bg-secondary-hover
  - component.button.fg-secondary
  - component.button.border-secondary
  - component.button.bg-ghost
  - component.button.bg-ghost-hover
  - component.button.fg-ghost
  - component.button.bg-danger
  - component.button.bg-danger-hover
  - component.button.fg-danger
  - component.button.padding-x
  - component.button.padding-y
  - component.button.gap
  - component.button.radius
  - component.button.min-height
  - component.button.font-weight
  - component.button.font-size
---

# Button

## Anatomy

```
┌─────────────────────────────────┐
│  [icon?]  Label text  [icon?]   │  ← Container (bg + border-radius + padding)
└─────────────────────────────────┘
      ↑ Icon slot           ↑ Icon slot
         (optional,          (optional,
          leading)            trailing)

     ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
     │ focus ring (2px offset)      │  ← visible when focused via keyboard
     └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
```

Each part:

- **Container** — the `<button>` element; carries background, border-radius, and padding. The variant token family (`--component-button-bg-*`) is applied here. Min-height is 36px to meet tap-target minimums.
- **Label text** — the primary content. Font weight is semibold (600); size is `--type-scale-sm` (14px). This is the button's accessible name when no `aria-label` override is present.
- **Icon slot** — optional leading or trailing slot for a 16×16 icon. Gap between icon and label is `--component-button-gap` (8px). Icon-only buttons must carry `aria-label`.
- **Focus ring** — a 2px solid outline at 2px offset in `--border-focus` (cyan-500). Applied via `:focus-visible`, not `:focus`, so mouse clicks do not show the ring.

## Variants & Usage

**primary** — The dominant action on any surface. Cyan-700 background with white text (5.36:1 contrast). Use once per view hierarchy. Represents the thing the user is most likely to do next: Save, Submit, Continue.

**secondary** — Paired alongside primary for the lesser action (Cancel, Go back). Slate-100 background with slate-900 text (16.30:1 contrast), bordered with `--border-default`. Carries equal visual weight to primary in terms of reachability, but lower salience.

**ghost** — Tertiary actions that need to be present but not prominent. Transparent background; text-primary color (17.06:1 against slate-50). Use for actions like "More options", "Learn more", inline icon toggles. Do not use ghost for destructive actions.

**danger** — Irreversible or high-consequence actions: Delete, Remove, Revoke. Red-600 background with white text (4.83:1 contrast). Always pair with a confirmation step — a danger button should not fire the destructive action immediately on first click.

## Accessibility

### Keyboard

- **Enter** — activates the button's click handler. Native behavior on `<button type="button">`.
- **Space** — activates the button. Also native. Both keys fire `click` events, so a single handler covers both.
- **Tab** — moves focus forward through the tab sequence. Disabled buttons (`disabled` attribute) are skipped.
- **Shift+Tab** — moves focus backward.

### ARIA / Roles

The `<button>` element carries an implicit `role="button"` — no explicit role attribute needed. The accessible name comes from the visible label text. If the button contains only an icon, add `aria-label="Descriptive action"`. For loading states, add `aria-busy="true"` and update the label text to reflect the in-progress state.

### Screen reader script

- **Default:** "Save, button"
- **Disabled:** "Save, button, dimmed" (VoiceOver) / "Save, button, unavailable" (NVDA). Include a `title` attribute on disabled buttons explaining why.
- **Loading:** "Saving…, button" — update the visible label text; the SR reads the new label automatically without requiring `aria-live`.

### Contrast verification

- **Primary:** `--component-button-fg-primary` (#ffffff) on `--component-button-bg-primary` (cyan-700, #0e7490) = **5.36:1** — clears WCAG AA (4.5:1 threshold).
- **Danger:** #ffffff on red-600 (#dc2626) = **4.83:1** — clears AA.
- **Secondary:** slate-900 (#0f172a) on slate-100 (#f1f5f9) = **16.30:1** — AAA.
- **Ghost:** slate-900 on effective surface slate-50 (#f8fafc) = **17.06:1** — AAA.
- **Disabled text:** slate-500 (#64748b) on slate-300 (#cbd5e1) = **4.76:1**. WCAG 1.4.3 exempts disabled components from contrast requirements; this token pair is documented for reference only.

### Focus behavior

All variants use a 2px solid outline at 2px offset in `--border-focus` (cyan-500). The ring is triggered via `:focus-visible` only — keyboard users see it, mouse clicks do not produce the ring. This aligns with WCAG 2.4.7 (Focus Visible).

## Code

### Astro

```astro
---
import Button from '@zuga-technologies/ui/Button.astro';
---
<Button variant="primary" onclick="handleSave()">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">More options</Button>
<Button variant="danger" onclick="handleDelete()">Delete account</Button>

<!-- icon-only: must have aria-label -->
<Button variant="ghost" aria-label="Open settings">
  <Icon name="settings" size={16} />
</Button>

<!-- disabled with explanation -->
<Button variant="primary" disabled title="Complete required fields first">
  Save
</Button>
```

### Vue

```vue
<template>
  <Button variant="primary" @click="handleSave">Save</Button>
  <Button variant="secondary" @click="handleCancel">Cancel</Button>
  <Button variant="ghost" @click="openMenu">More options</Button>
  <Button variant="danger" @click="handleDelete">Delete account</Button>
  <Button variant="primary" :disabled="isSaving">
    {{ isSaving ? 'Saving…' : 'Save' }}
  </Button>
</template>

<script setup>
import { ref } from 'vue';
import Button from '@zuga-technologies/ui/Button.vue';

const isSaving = ref(false);

async function handleSave() {
  isSaving.value = true;
  await save();
  isSaving.value = false;
}
</script>
```

### Plain HTML

```html
<!-- primary -->
<button type="button" class="btn btn--primary">Save</button>

<!-- secondary -->
<button type="button" class="btn btn--secondary">Cancel</button>

<!-- ghost -->
<button type="button" class="btn btn--ghost">More options</button>

<!-- danger -->
<button type="button" class="btn btn--danger">Delete account</button>

<!-- icon-only — must have aria-label -->
<button type="button" class="btn btn--ghost" aria-label="Open settings">
  <svg aria-hidden="true" focusable="false"><!-- settings icon --></svg>
</button>

<!-- disabled — title explains why -->
<button type="button" class="btn btn--primary" disabled
        title="Complete required fields first">
  Save
</button>
```

## Don'ts

| Don't | Why |
|---|---|
| Use a `<button>` as a navigation link | Buttons imply in-page actions; links imply URL navigation. Screen readers announce them differently; `<a href>` is correct for routes. |
| Disable without explanation | The user is blocked and has no information. Provide a `title` or adjacent helper text explaining the condition. |
| Place an icon-only button without `aria-label` | The accessible name is empty. Screen readers say "button" with no context. |
| Use `danger` for non-destructive actions | The red affordance raises cognitive cost and desensitizes users to real danger warnings over time. |

## Tokens reference

The component exposes these tokens (Tier 3, scoped):

- `--component-button-bg-primary` — primary variant background (default: `--accent-brand`, cyan-700)
- `--component-button-bg-primary-hover` — primary hover state (`--accent-brand-strong`, cyan-800)
- `--component-button-bg-primary-disabled` — disabled state fill (`--color-slate-300`)
- `--component-button-fg-primary` — primary label color (`--accent-fg`, #ffffff)
- `--component-button-bg-secondary` — secondary variant background (`--surface-secondary`)
- `--component-button-border-secondary` — secondary border (`--border-default`)
- `--component-button-bg-ghost` — ghost background (transparent)
- `--component-button-bg-ghost-hover` — ghost hover fill (`--surface-secondary`)
- `--component-button-bg-danger` — danger background (`--feedback-danger`, red-600)
- `--component-button-fg-danger` — danger label color (`--feedback-danger-fg`, #ffffff)
- `--component-button-radius` — corner radius (`--radius-md`)
- `--component-button-font-weight` — label weight (`--font-weight-semibold`)

These compose from Tier 2 semantic tokens (which compose from Tier 1 primitives — see §4 + §5).
