---
name: Tabs
summary: Segmented navigation for switching between related content panels within a view.
anatomy:
  - Tab list container (role=tablist)
  - Tab trigger items (role=tab)
  - Active indicator (underline or pill)
  - Tab panel content area (role=tabpanel)
variants:
  - default
  - underline
  - pill
accessibility:
  keyboard:
    - Tab enters the tab list and focuses the active tab
    - Arrow Left/Right navigates between tabs within the tab list
    - Enter or Space activates the focused tab
    - Tab (from active tab) moves focus to the active tab panel content
    - Shift+Tab moves focus backward
  ariaRoles:
    - tablist
    - tab
    - tabpanel
  contrastNotes: >
    Active tab text: --component-tabs-fg-active (cyan-700 #0e7490) on transparent/white = 5.36:1 — AA.
    Inactive tab text: --component-tabs-fg (slate-700 #334155) on white = 10.35:1 — AAA.
    Active indicator (non-text): --component-tabs-border-bottom-active (cyan-700 #0e7490) on white = 5.36:1 — well above the 3:1 non-text threshold (WCAG 1.4.11).
    Bottom border (non-text): --component-tabs-border-bottom (slate-200 #e2e8f0) on white = 14.48:1 — AAA.
  focusBehavior: >
    Roving tabindex within the tab list: only the active tab is in the tab sequence at a given time.
    Arrow keys change the focused (and activated) tab without leaving the tablist.
    Tab moves focus from the tablist to the active panel content.
examples:
  - framework: astro
    code: |
      ---
      import { Tabs, Tab } from '@zuga-technologies/ui/Tabs.astro';
      ---
      <!-- default variant -->
      <Tabs defaultTab="overview" variant="default">
        <Tab id="overview" label="Overview">
          <p>Overview content goes here.</p>
        </Tab>
        <Tab id="settings" label="Settings">
          <p>Settings content goes here.</p>
        </Tab>
        <Tab id="history" label="History">
          <p>History content goes here.</p>
        </Tab>
      </Tabs>

      <!-- underline variant -->
      <Tabs defaultTab="stats" variant="underline">
        <Tab id="stats" label="Stats">Stats panel</Tab>
        <Tab id="signals" label="Signals">Signals panel</Tab>
        <Tab id="logs" label="Logs">Logs panel</Tab>
      </Tabs>
  - framework: vue
    code: |
      <template>
        <Tabs v-model="activeTab" variant="underline">
          <Tab id="overview" label="Overview">
            <p>Overview content.</p>
          </Tab>
          <Tab id="settings" label="Settings">
            <p>Settings content.</p>
          </Tab>
        </Tabs>
      </template>

      <script setup>
      import { ref } from 'vue';
      import { Tabs, Tab } from '@zuga-technologies/ui/Tabs.vue';

      const activeTab = ref('overview');
      </script>
  - framework: plain-html
    code: |
      <!-- tab list -->
      <div class="tabs tabs--underline">
        <div role="tablist" aria-label="Content sections" class="tabs__list">
          <button
            role="tab"
            id="tab-overview"
            aria-controls="panel-overview"
            aria-selected="true"
            tabindex="0"
            class="tabs__tab tabs__tab--active"
          >Overview</button>
          <button
            role="tab"
            id="tab-settings"
            aria-controls="panel-settings"
            aria-selected="false"
            tabindex="-1"
            class="tabs__tab"
          >Settings</button>
          <button
            role="tab"
            id="tab-history"
            aria-controls="panel-history"
            aria-selected="false"
            tabindex="-1"
            class="tabs__tab"
          >History</button>
        </div>

        <!-- panels: hidden panels use hidden attribute -->
        <div
          role="tabpanel"
          id="panel-overview"
          aria-labelledby="tab-overview"
          class="tabs__panel"
        >
          <p>Overview content.</p>
        </div>
        <div
          role="tabpanel"
          id="panel-settings"
          aria-labelledby="tab-settings"
          class="tabs__panel"
          hidden
        >
          <p>Settings content.</p>
        </div>
        <div
          role="tabpanel"
          id="panel-history"
          aria-labelledby="tab-history"
          class="tabs__panel"
          hidden
        >
          <p>History content.</p>
        </div>
      </div>
donts:
  - Do not use tabs for sequential steps — steps imply order and progression; use a stepper component.
  - Do not use tabs for navigation between distinct pages — tabs switch between co-located panels; use nav links for routing.
  - Do not hide tab panels with display:none without the hidden attribute — aria-selected alone does not hide panels from screen readers.
  - Do not exceed 5-6 tabs without overflow handling — tab lists that wrap onto two rows break the visual contract and become confusing on mobile.
tokens:
  - component.tabs.bg
  - component.tabs.fg
  - component.tabs.fg-active
  - component.tabs.border-bottom
  - component.tabs.border-bottom-active
  - component.tabs.padding-x
  - component.tabs.padding-y
---

# Tabs

## Anatomy

```
  ┌─────────────────────────────────────────────────────┐
  │  [Overview]  [Settings]  [History]                  │  ← tablist
  │  ─────────── (underline active indicator)            │
  └─────────────────────────────────────────────────────┘
  ┌─────────────────────────────────────────────────────┐
  │                                                     │
  │  Active panel content (role=tabpanel)               │
  │                                                     │
  └─────────────────────────────────────────────────────┘
```

Each part:

- **Tab list container** — `role="tablist"`. Carries an `aria-label` describing the group of tabs (e.g., "Content sections"). Contains only the tab trigger elements.
- **Tab trigger items** — `<button role="tab">` elements. Each tab has an `id`, `aria-controls="<panel-id>"`, and `aria-selected="true|false"`. Only the active tab has `tabindex="0"`; all others have `tabindex="-1"` (roving tabindex pattern).
- **Active indicator** — visual treatment on the active tab. Underline variant: a bottom border using `--component-tabs-border-bottom-active` (cyan-700). Pill variant: a filled background. The indicator is presentational; `aria-selected` is the semantic indicator.
- **Tab panel content area** — `role="tabpanel"`, `id` matching the tab's `aria-controls`, `aria-labelledby` pointing to the tab's `id`. Hidden panels use the `hidden` attribute; `display:none` alone is insufficient.

## Variants & Usage

**default** — Minimal tab style; active tab uses text color change only (`--component-tabs-fg-active`, cyan-700). Use for compact, space-constrained contexts.

**underline** — Active tab has a bottom border accent in `--component-tabs-border-bottom-active` (cyan-700) and a separator line below the whole tab list using `--component-tabs-border-bottom` (slate-200). The most common variant across Zuga studios for content panel switching.

**pill** — Active tab has a filled pill/badge background in `--accent-brand-subtle` (cyan-100) with `--accent-brand-strong` (cyan-800) text. Use for context-switcher patterns (e.g., chart timeframes: 1D / 1W / 1M).

## Accessibility

### Keyboard

- **Tab** — on first entry, focuses the active tab. On second Tab press, moves focus to the active panel content (skipping inactive tabs).
- **Arrow Left/Right** — moves focus between tabs within the tablist. In ARIA tab pattern, arrow keys also activate the newly focused tab (automatic activation).
- **Enter / Space** — activates the focused tab (for manual activation variants).
- **Shift+Tab** — moves focus out of the tablist backward.

### ARIA / Roles

Three required roles: `tablist` on the container, `tab` on each trigger, `tabpanel` on each panel. The linkage: `tab[aria-controls] = panel[id]` and `panel[aria-labelledby] = tab[id]`. All tabs belong to the same tablist. Inactive panels must be hidden with the `hidden` attribute so SR users don't navigate into them.

### Screen reader script

- **Tab focused:** "Overview, tab, selected, 1 of 3"
- **Inactive tab focused:** "Settings, tab, not selected, 2 of 3"
- **Tab panel:** "Overview, tab panel — [panel content]"
- **Tab group announced:** "Content sections, tab list"

### Contrast verification

- **Active tab text:** cyan-700 (#0e7490) on white (#ffffff) = **5.36:1** — AA.
- **Inactive tab text:** slate-700 (#334155) on white = **10.35:1** — AAA.
- **Active indicator border** (non-text): cyan-700 on white = **5.36:1** — well above 3:1 for WCAG 1.4.11.
- **Tab list bottom border** (non-text): slate-200 (#e2e8f0) on white = **14.48:1** — AAA.

### Focus behavior

Roving tabindex: the active tab has `tabindex="0"`, all others have `tabindex="-1"`. Arrow keys move the roving tabindex to a new tab (and activate it in auto-activation mode). When Tab is pressed inside the tablist, focus jumps directly to the active panel, skipping inactive tabs. This is the ARIA tab pattern; do not implement tabs with Tab/Shift+Tab navigation between tabs — that's a different pattern.

## Code

### Astro

```astro
---
import { Tabs, Tab } from '@zuga-technologies/ui/Tabs.astro';
---
<Tabs defaultTab="overview" variant="underline">
  <Tab id="overview" label="Overview">
    <p>Overview content.</p>
  </Tab>
  <Tab id="settings" label="Settings">
    <p>Settings content.</p>
  </Tab>
  <Tab id="history" label="History">
    <p>History content.</p>
  </Tab>
</Tabs>
```

### Vue

```vue
<template>
  <Tabs v-model="activeTab" variant="underline">
    <Tab id="overview" label="Overview">
      <p>Overview content.</p>
    </Tab>
    <Tab id="settings" label="Settings">
      <p>Settings content.</p>
    </Tab>
  </Tabs>
</template>

<script setup>
import { ref } from 'vue';
import { Tabs, Tab } from '@zuga-technologies/ui/Tabs.vue';
const activeTab = ref('overview');
</script>
```

### Plain HTML

```html
<div role="tablist" aria-label="Content sections" class="tabs__list">
  <button role="tab" id="tab-overview" aria-controls="panel-overview"
          aria-selected="true" tabindex="0" class="tabs__tab tabs__tab--active">
    Overview
  </button>
  <button role="tab" id="tab-settings" aria-controls="panel-settings"
          aria-selected="false" tabindex="-1" class="tabs__tab">
    Settings
  </button>
</div>

<div role="tabpanel" id="panel-overview" aria-labelledby="tab-overview" class="tabs__panel">
  <p>Overview content.</p>
</div>
<div role="tabpanel" id="panel-settings" aria-labelledby="tab-settings"
     class="tabs__panel" hidden>
  <p>Settings content.</p>
</div>
```

## Don'ts

| Don't | Why |
|---|---|
| Use tabs for sequential steps | Tabs imply co-equal panels that can be visited in any order. Steps imply a progression — use a stepper. |
| Use tabs for page-level navigation | Tabs switch co-located panels; they don't change routes. Links/nav do routing. |
| Hide panels with only CSS (`display:none` without `hidden`) | The `hidden` attribute prevents SR navigation into inactive panels. CSS alone doesn't affect the ARIA tree. |
| Put more than 6 tabs without overflow handling | Multi-row tab lists break the visual pattern and confuse keyboard navigation on narrow screens. |

## Tokens reference

The component exposes these tokens (Tier 3, scoped):

- `--component-tabs-bg` — tab list background (transparent by default)
- `--component-tabs-fg` — inactive tab text (`--text-secondary`, slate-700)
- `--component-tabs-fg-active` — active tab text (`--accent-brand`, cyan-700)
- `--component-tabs-border-bottom` — tab list separator line (`--border-subtle`, slate-200)
- `--component-tabs-border-bottom-active` — active tab underline indicator (`--accent-brand`, cyan-700)
- `--component-tabs-padding-x` — horizontal tab trigger padding (`--space-4`, 16px)
- `--component-tabs-padding-y` — vertical tab trigger padding (`--space-2`, 8px)

These compose from Tier 2 semantic tokens (which compose from Tier 1 primitives — see §4 + §5).
