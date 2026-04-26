---
name: Toolbar
summary: Horizontal strip of controls providing context-sensitive actions for a view or selection.
anatomy:
  - Toolbar container (bg + padding + bottom border)
  - Button group slots
  - Divider separators
variants:
  - default
  - compact
accessibility:
  keyboard:
    - Tab enters the toolbar, focusing the first or last active item
    - Arrow Left/Right navigates between toolbar items
    - Escape exits the toolbar and returns focus to the triggering context
    - Enter or Space activates the focused toolbar control
  ariaRoles:
    - toolbar
  contrastNotes: >
    Toolbar controls use --text-primary (slate-900 #0f172a) on --component-toolbar-bg (white #ffffff) = 17.85:1 — AAA.
    Toolbar border bottom (non-text): --component-toolbar-border-bottom (slate-200 #e2e8f0) on white = 14.48:1 — well above 3:1.
    Icon controls should meet WCAG 1.4.11 (non-text contrast, 3:1) — icons in slate-700 (#334155) on white = 10.35:1 — AAA.
  focusBehavior: >
    Toolbar uses roving tabindex; only one item is in the tab sequence at a time.
    Arrow keys move the active item within the toolbar without leaving it.
    Tab exits the toolbar to the next element outside. Shift+Tab exits backward.
examples:
  - framework: astro
    code: |
      ---
      import { Toolbar, ToolbarButton, ToolbarDivider } from '@zuga/ui/Toolbar.astro';
      ---
      <Toolbar aria-label="Text formatting">
        <ToolbarButton icon="bold" aria-label="Bold" aria-pressed="false" />
        <ToolbarButton icon="italic" aria-label="Italic" aria-pressed="false" />
        <ToolbarButton icon="underline" aria-label="Underline" aria-pressed="false" />
        <ToolbarDivider />
        <ToolbarButton icon="align-left" aria-label="Align left" aria-pressed="true" />
        <ToolbarButton icon="align-center" aria-label="Align center" aria-pressed="false" />
        <ToolbarButton icon="align-right" aria-label="Align right" aria-pressed="false" />
      </Toolbar>

      <!-- compact variant for data-heavy views -->
      <Toolbar variant="compact" aria-label="Chart controls">
        <ToolbarButton icon="zoom-in" aria-label="Zoom in" />
        <ToolbarButton icon="zoom-out" aria-label="Zoom out" />
        <ToolbarDivider />
        <ToolbarButton icon="download" aria-label="Download chart data" />
      </Toolbar>
  - framework: vue
    code: |
      <template>
        <Toolbar aria-label="Text formatting">
          <ToolbarButton
            v-for="btn in formatButtons"
            :key="btn.icon"
            :icon="btn.icon"
            :aria-label="btn.label"
            :aria-pressed="btn.active"
            @click="toggleFormat(btn)"
          />
          <ToolbarDivider />
          <ToolbarButton
            v-for="align in alignButtons"
            :key="align.icon"
            :icon="align.icon"
            :aria-label="align.label"
            :aria-pressed="currentAlign === align.value"
            @click="setAlign(align.value)"
          />
        </Toolbar>
      </template>

      <script setup>
      import { ref } from 'vue';
      import { Toolbar, ToolbarButton, ToolbarDivider } from '@zuga/ui/Toolbar.vue';

      const formatButtons = ref([
        { icon: 'bold', label: 'Bold', active: false },
        { icon: 'italic', label: 'Italic', active: false },
      ]);
      const alignButtons = [
        { icon: 'align-left', label: 'Align left', value: 'left' },
        { icon: 'align-center', label: 'Align center', value: 'center' },
        { icon: 'align-right', label: 'Align right', value: 'right' },
      ];
      const currentAlign = ref('left');

      function toggleFormat(btn) { btn.active = !btn.active; }
      function setAlign(val) { currentAlign.value = val; }
      </script>
  - framework: plain-html
    code: |
      <div role="toolbar" aria-label="Text formatting" class="toolbar toolbar--default">
        <!-- toggle buttons use aria-pressed -->
        <button type="button" class="toolbar__btn" aria-label="Bold"
                aria-pressed="false" tabindex="0">
          <svg aria-hidden="true" focusable="false"><!-- bold icon --></svg>
        </button>
        <button type="button" class="toolbar__btn" aria-label="Italic"
                aria-pressed="false" tabindex="-1">
          <svg aria-hidden="true" focusable="false"><!-- italic icon --></svg>
        </button>
        <button type="button" class="toolbar__btn" aria-label="Underline"
                aria-pressed="false" tabindex="-1">
          <svg aria-hidden="true" focusable="false"><!-- underline icon --></svg>
        </button>

        <!-- divider: decorative, hidden from SR -->
        <div class="toolbar__divider" aria-hidden="true" role="separator"></div>

        <!-- radio-group behavior for align: use aria-checked on role=radio or aria-pressed on buttons -->
        <button type="button" class="toolbar__btn toolbar__btn--active"
                aria-label="Align left" aria-pressed="true" tabindex="-1">
          <svg aria-hidden="true" focusable="false"><!-- align-left icon --></svg>
        </button>
        <button type="button" class="toolbar__btn"
                aria-label="Align center" aria-pressed="false" tabindex="-1">
          <svg aria-hidden="true" focusable="false"><!-- align-center icon --></svg>
        </button>
        <button type="button" class="toolbar__btn"
                aria-label="Align right" aria-pressed="false" tabindex="-1">
          <svg aria-hidden="true" focusable="false"><!-- align-right icon --></svg>
        </button>
      </div>
donts:
  - Do not place more than 7 actions in a single toolbar group without a divider — cognitive overload; group related actions with ToolbarDivider.
  - Do not use icon-only buttons in a toolbar without aria-label — the icon is decorative; the label provides the accessible name.
  - Do not navigate toolbar items with Tab/Shift+Tab between buttons — the ARIA toolbar pattern uses roving tabindex + arrow keys; Tab exits the toolbar.
  - Do not put non-interactive elements (plain text, images) in a toolbar — the toolbar role implies all children are controls.
tokens:
  - component.toolbar.bg
  - component.toolbar.padding-x
  - component.toolbar.padding-y
  - component.toolbar.gap
  - component.toolbar.border-bottom
---

# Toolbar

## Anatomy

```
  ┌─────────────────────────────────────────────────────────────┐
  │  [B]  [I]  [U]  │  [←]  [↔]  [→]  │  [⬇ Export]          │
  └─────────────────────────────────────────────────────────────┘
    ↑ icon-only       ↑ divider           ↑ icon + label button
    buttons           (aria-hidden)
    (aria-label)

  ← --component-toolbar-bg (white)
  ← --component-toolbar-border-bottom (slate-200, bottom edge)
  ← --component-toolbar-padding-x / padding-y
  ← --component-toolbar-gap (space between items)
```

Each part:

- **Toolbar container** — `role="toolbar"` with a descriptive `aria-label` (e.g., "Text formatting"). Background `--component-toolbar-bg` (white). Bottom border `--component-toolbar-border-bottom` (slate-200). Horizontal padding `--component-toolbar-padding-x` (16px), vertical padding `--component-toolbar-padding-y` (8px).
- **Button group slots** — icon-only buttons or icon+label buttons. All must carry `aria-label`. Toggle buttons (Bold, Italic) use `aria-pressed="true|false"`. Radio-group patterns (alignment) can use `aria-checked` with `role="radio"` within a `role="radiogroup"`.
- **Divider separators** — `<div role="separator" aria-hidden="true">` elements that visually group related actions. Decorative and hidden from screen readers; grouping is communicated by visual proximity and the aria-label on grouped sections if needed.

## Variants & Usage

**default** — Standard toolbar height with full padding. Use for primary editing toolbars: text formatting, image editing controls, chart controls.

**compact** — Reduced vertical padding using the density scale. Use in data-heavy views (ZugaTrader, ZugaCode) where vertical space is premium. Controls and icons are the same size; only the surrounding padding shrinks.

## Accessibility

### Keyboard

- **Tab** — enters the toolbar, focusing the most recently active item (or the first item on first entry).
- **Arrow Left/Right** — moves the roving tabindex to adjacent toolbar items. Does not exit the toolbar.
- **Escape** — exits the toolbar and returns focus to the last element outside the toolbar that was focused before entering.
- **Enter / Space** — activates the currently focused toolbar control.
- **Home / End** — jumps to the first or last item in the toolbar.

### ARIA / Roles

`role="toolbar"` on the container. The toolbar must have an `aria-label` or `aria-labelledby`. Each control inside the toolbar uses its native role: `button`, `role="radiogroup"` + `role="radio"` for mutually exclusive selections, or `role="combobox"` for embedded selects. Do not use `role="menuitem"` inside a toolbar — that belongs inside a `role="menu"`.

Toggle buttons use `aria-pressed="true|false"`. For selection groups (alignment, list type), the active button uses `aria-pressed="true"` on all buttons in the group with only one active at a time — or the more explicit `role="radiogroup"` wrapper.

### Screen reader script

- **Toolbar focus:** "Text formatting, toolbar"
- **Bold toggle, off:** "Bold, button, not pressed"
- **Bold toggle, on:** "Bold, button, pressed"
- **Align left (active):** "Align left, button, pressed, 1 of 3"
- **Divider:** not announced (aria-hidden)

### Contrast verification

- **Toolbar control icons** (non-text): slate-700 (#334155) on white (#ffffff) = **10.35:1** — well above 3:1 non-text threshold (WCAG 1.4.11).
- **Toolbar body text** (for any labeled buttons): slate-900 (#0f172a) on white = **17.85:1** — AAA.
- **Bottom border** (non-text): slate-200 (#e2e8f0) on white = **14.48:1** — well above 3:1.

### Focus behavior

Roving tabindex: the active toolbar item has `tabindex="0"`, all others have `tabindex="-1"`. Arrow keys shift the `tabindex="0"` to the adjacent item without leaving the toolbar. Tab exits to the next element outside; Shift+Tab exits backward. This pattern is the ARIA toolbar specification; do not implement Tab-between-items.

## Code

### Astro

```astro
---
import { Toolbar, ToolbarButton, ToolbarDivider } from '@zuga/ui/Toolbar.astro';
---
<Toolbar aria-label="Text formatting">
  <ToolbarButton icon="bold" aria-label="Bold" aria-pressed="false" />
  <ToolbarButton icon="italic" aria-label="Italic" aria-pressed="false" />
  <ToolbarButton icon="underline" aria-label="Underline" aria-pressed="false" />
  <ToolbarDivider />
  <ToolbarButton icon="align-left" aria-label="Align left" aria-pressed="true" />
  <ToolbarButton icon="align-center" aria-label="Align center" aria-pressed="false" />
  <ToolbarButton icon="align-right" aria-label="Align right" aria-pressed="false" />
</Toolbar>
```

### Vue

```vue
<template>
  <Toolbar aria-label="Text formatting">
    <ToolbarButton
      icon="bold"
      aria-label="Bold"
      :aria-pressed="bold"
      @click="bold = !bold"
    />
    <ToolbarButton
      icon="italic"
      aria-label="Italic"
      :aria-pressed="italic"
      @click="italic = !italic"
    />
    <ToolbarDivider />
    <ToolbarButton
      v-for="a in alignments"
      :key="a.value"
      :icon="a.icon"
      :aria-label="a.label"
      :aria-pressed="align === a.value"
      @click="align = a.value"
    />
  </Toolbar>
</template>

<script setup>
import { ref } from 'vue';
import { Toolbar, ToolbarButton, ToolbarDivider } from '@zuga/ui/Toolbar.vue';

const bold = ref(false);
const italic = ref(false);
const align = ref('left');
const alignments = [
  { value: 'left', icon: 'align-left', label: 'Align left' },
  { value: 'center', icon: 'align-center', label: 'Align center' },
  { value: 'right', icon: 'align-right', label: 'Align right' },
];
</script>
```

### Plain HTML

```html
<div role="toolbar" aria-label="Text formatting" class="toolbar">
  <button type="button" class="toolbar__btn" aria-label="Bold"
          aria-pressed="false" tabindex="0">
    <svg aria-hidden="true" focusable="false"><!-- bold --></svg>
  </button>
  <button type="button" class="toolbar__btn" aria-label="Italic"
          aria-pressed="false" tabindex="-1">
    <svg aria-hidden="true" focusable="false"><!-- italic --></svg>
  </button>

  <div role="separator" aria-hidden="true" class="toolbar__divider"></div>

  <button type="button" class="toolbar__btn toolbar__btn--active"
          aria-label="Align left" aria-pressed="true" tabindex="-1">
    <svg aria-hidden="true" focusable="false"><!-- align-left --></svg>
  </button>
  <button type="button" class="toolbar__btn" aria-label="Align center"
          aria-pressed="false" tabindex="-1">
    <svg aria-hidden="true" focusable="false"><!-- align-center --></svg>
  </button>
</div>
```

## Don'ts

| Don't | Why |
|---|---|
| Exceed 7 items per group without a divider | Dense toolbars become visually unreadable and keyboard navigation becomes confusing. |
| Use icon-only buttons without `aria-label` | The icon is `aria-hidden`; the button's accessible name is empty without an aria-label. |
| Navigate between toolbar items with Tab | The ARIA toolbar pattern uses roving tabindex + arrows. Tab must exit the toolbar, not traverse it. |
| Put non-control content in a toolbar | `role="toolbar"` expects all children to be interactive controls. Static text or images break the pattern. |

## Tokens reference

The component exposes these tokens (Tier 3, scoped):

- `--component-toolbar-bg` — toolbar surface (`--surface-primary`, white)
- `--component-toolbar-padding-x` — horizontal padding (`--space-4`, 16px)
- `--component-toolbar-padding-y` — vertical padding (`--space-2`, 8px)
- `--component-toolbar-gap` — gap between toolbar controls (`--space-2`, 8px)
- `--component-toolbar-border-bottom` — bottom separator (`--border-subtle`, slate-200)

These compose from Tier 2 semantic tokens (which compose from Tier 1 primitives — see §4 + §5).
