---
name: Nav
summary: Primary navigation component for studio-level and app-level wayfinding.
anatomy:
  - Nav container (bg + padding)
  - Nav item links
  - Active state indicator (border or accent color)
  - Icon slot (optional, per item)
variants:
  - sidebar
  - topbar
accessibility:
  keyboard:
    - Tab navigates between nav items
    - Enter activates the focused nav item
    - Shift+Tab moves focus to the previous item
  ariaRoles:
    - navigation
  contrastNotes: >
    Default nav item text: --component-nav-fg (slate-700 #334155) on --component-nav-bg (white #ffffff) = 10.35:1 — AAA.
    Active nav item: --component-nav-fg-active (cyan-700 #0e7490) on --component-nav-bg (white #ffffff) = 5.36:1 — AA.
    Hover nav item: --component-nav-fg-hover (slate-900 #0f172a) on white = 17.85:1 — AAA.
  focusBehavior: >
    Each nav item receives a visible focus ring using --border-focus (cyan-500), 2px solid, 2px offset.
    Current page is indicated via aria-current="page" on the active anchor element — this is the semantic
    indicator, not just color.
examples:
  - framework: astro
    code: |
      ---
      import { Nav, NavItem } from '@zuga-technologies/ui/Nav.astro';
      const currentPath = Astro.url.pathname;
      ---
      <!-- sidebar nav -->
      <Nav variant="sidebar" aria-label="Studio navigation">
        <NavItem href="/dashboard" current={currentPath === '/dashboard'}>
          Dashboard
        </NavItem>
        <NavItem href="/studio/life" current={currentPath.startsWith('/studio/life')}>
          ZugaLife
        </NavItem>
        <NavItem href="/studio/trader" current={currentPath.startsWith('/studio/trader')}>
          ZugaTrader
        </NavItem>
        <NavItem href="/settings" current={currentPath === '/settings'}>
          Settings
        </NavItem>
      </Nav>

      <!-- topbar nav -->
      <Nav variant="topbar" aria-label="Primary navigation">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/studios" current={currentPath === '/studios'}>Studios</NavItem>
        <NavItem href="/pricing">Pricing</NavItem>
      </Nav>
  - framework: vue
    code: |
      <template>
        <Nav variant="sidebar" aria-label="Studio navigation">
          <NavItem
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            :current="isCurrentPath(item.href)"
          >
            <template v-if="item.icon">
              <Icon :name="item.icon" size="16" aria-hidden="true" />
            </template>
            {{ item.label }}
          </NavItem>
        </Nav>
      </template>

      <script setup>
      import { useRoute } from 'vue-router';
      import { Nav, NavItem } from '@zuga-technologies/ui/Nav.vue';

      const route = useRoute();
      const navItems = [
        { href: '/dashboard', label: 'Dashboard', icon: 'home' },
        { href: '/studio/life', label: 'ZugaLife', icon: 'heart' },
        { href: '/studio/trader', label: 'ZugaTrader', icon: 'chart' },
        { href: '/settings', label: 'Settings', icon: 'settings' },
      ];
      function isCurrentPath(href) {
        return route.path === href || route.path.startsWith(href + '/');
      }
      </script>
  - framework: plain-html
    code: |
      <!-- sidebar nav -->
      <nav class="nav nav--sidebar" aria-label="Studio navigation">
        <ul class="nav__list" role="list">
          <li class="nav__item">
            <a href="/dashboard" class="nav__link nav__link--active"
               aria-current="page">
              Dashboard
            </a>
          </li>
          <li class="nav__item">
            <a href="/studio/life" class="nav__link">ZugaLife</a>
          </li>
          <li class="nav__item">
            <a href="/studio/trader" class="nav__link">ZugaTrader</a>
          </li>
        </ul>
      </nav>

      <!-- topbar nav -->
      <nav class="nav nav--topbar" aria-label="Primary navigation">
        <ul class="nav__list" role="list">
          <li><a href="/" class="nav__link">Home</a></li>
          <li><a href="/studios" class="nav__link">Studios</a></li>
          <li><a href="/pricing" class="nav__link">Pricing</a></li>
        </ul>
      </nav>
donts:
  - Do not rely on color alone to indicate the active nav item — use aria-current="page" as the semantic indicator alongside the visual accent.
  - Do not nest a nav inside another nav without unique aria-label values — overlapping navigation landmarks confuse screen reader navigation.
  - Do not use buttons instead of anchor elements for nav items — nav items are links; buttons imply in-page actions.
  - Do not put more than 7 primary items in a topbar nav without grouping — cognitive overload; consider a dropdown group for secondary items.
tokens:
  - component.nav.bg
  - component.nav.fg
  - component.nav.fg-hover
  - component.nav.fg-active
  - component.nav.padding-x
  - component.nav.padding-y
  - component.nav.gap
---

# Nav

## Anatomy

```
sidebar variant:
┌────────────────────┐
│  nav container     │  ← --component-nav-bg (white), --component-nav-padding-*
│  ┌──────────────┐  │
│  │ ■ Dashboard  │  │  ← active item (--component-nav-fg-active: cyan-700)
│  │               │  │    aria-current="page"
│  │   ZugaLife   │  │  ← default item (--component-nav-fg: slate-700)
│  │   ZugaTrader │  │
│  │   Settings   │  │
│  └──────────────┘  │
└────────────────────┘

topbar variant:
┌────────────────────────────────────────────────────────┐
│  [Home]  [Studios ●]  [Pricing]  [Docs]                │
│                ↑ active indicator (underline or color)  │
└────────────────────────────────────────────────────────┘
```

Each part:

- **Nav container** — the `<nav>` element. Background is `--component-nav-bg` (white). Contains the list of nav items. Must carry a unique `aria-label` to distinguish it from other navigation landmarks on the page (e.g., "Studio navigation", "Primary navigation").
- **Nav item links** — `<a>` elements inside an unordered list. Padding is `--component-nav-padding-x` / `--component-nav-padding-y`. Gap between items is `--component-nav-gap` (4px).
- **Active state indicator** — the current page item uses `--component-nav-fg-active` (cyan-700) for text color. Supplemented by a left-border accent in sidebar or an underline in topbar. `aria-current="page"` is the semantic indicator.
- **Icon slot** — optional 16px icon preceding the label text. Carries `aria-hidden="true"`; the label text alone is the accessible name.

## Variants & Usage

**sidebar** — Vertical list of navigation links, typically in a fixed left-side panel. Items stack vertically with controlled gap. Active item may use a left-border accent strip. Use for studio-level navigation where 4–8 primary destinations exist.

**topbar** — Horizontal row of navigation links in a top bar. Items flow left-to-right. Active item uses an underline accent or color change. Use for app-level navigation (Home, Studios, Pricing, Docs) where 3–6 items exist. On mobile, topbar collapses to a hamburger menu or stacked sidebar.

## Accessibility

### Keyboard

- **Tab** — moves focus through each nav item anchor in document order.
- **Enter** — activates (follows) the focused link.
- **Shift+Tab** — moves focus to the previous nav item.

### ARIA / Roles

The `<nav>` element carries implicit `role="navigation"`. Each `<nav>` on the page must have a unique `aria-label` so screen reader users can distinguish "Studio navigation" from "Primary navigation" in the landmarks list. The active page item must carry `aria-current="page"` — this is the programmatic indicator, separate from visual color.

### Screen reader script

- **Nav landmark:** "Studio navigation, navigation" (announced on landmark navigation)
- **Default item:** "ZugaLife, link"
- **Active item:** "Dashboard, link, current page"
- **Item with icon:** icon is `aria-hidden="true"`; SR reads "Dashboard, link" — not the icon name

### Contrast verification

- **Default nav item text:** `--component-nav-fg` (slate-700, #334155) on `--component-nav-bg` (white, #ffffff) = **10.35:1** — AAA.
- **Active nav item text:** `--component-nav-fg-active` (cyan-700, #0e7490) on white = **5.36:1** — AA.
- **Hover nav item text:** `--component-nav-fg-hover` (slate-900, #0f172a) on white = **17.85:1** — AAA.

### Focus behavior

Each nav item `<a>` receives a 2px focus ring in `--border-focus` (cyan-500) on `:focus-visible`. Active items already carry a distinct visual treatment; the focus ring is additive and does not rely on color differentiation for active-vs-focused distinction.

## Code

### Astro

```astro
---
import { Nav, NavItem } from '@zuga-technologies/ui/Nav.astro';
const currentPath = Astro.url.pathname;
---
<Nav variant="sidebar" aria-label="Studio navigation">
  <NavItem href="/dashboard" current={currentPath === '/dashboard'}>Dashboard</NavItem>
  <NavItem href="/studio/life" current={currentPath.startsWith('/studio/life')}>ZugaLife</NavItem>
  <NavItem href="/studio/trader" current={currentPath.startsWith('/studio/trader')}>ZugaTrader</NavItem>
  <NavItem href="/settings" current={currentPath === '/settings'}>Settings</NavItem>
</Nav>
```

### Vue

```vue
<template>
  <Nav variant="sidebar" aria-label="Studio navigation">
    <NavItem
      v-for="item in navItems"
      :key="item.href"
      :href="item.href"
      :current="route.path === item.href"
    >
      {{ item.label }}
    </NavItem>
  </Nav>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { Nav, NavItem } from '@zuga-technologies/ui/Nav.vue';

const route = useRoute();
const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/studio/life', label: 'ZugaLife' },
  { href: '/studio/trader', label: 'ZugaTrader' },
];
</script>
```

### Plain HTML

```html
<nav class="nav nav--sidebar" aria-label="Studio navigation">
  <ul class="nav__list" role="list">
    <li class="nav__item">
      <a href="/dashboard" class="nav__link nav__link--active" aria-current="page">
        Dashboard
      </a>
    </li>
    <li class="nav__item">
      <a href="/studio/life" class="nav__link">ZugaLife</a>
    </li>
    <li class="nav__item">
      <a href="/studio/trader" class="nav__link">ZugaTrader</a>
    </li>
  </ul>
</nav>
```

## Don'ts

| Don't | Why |
|---|---|
| Use color alone for active state | Color-blind users can't distinguish active from default. `aria-current="page"` is required alongside the visual treatment. |
| Use multiple `<nav>` elements with identical `aria-label` | Screen reader users navigating by landmarks can't tell them apart. Each nav needs a unique label. |
| Use `<button>` for nav items | Buttons are for actions; anchors are for navigation. Wrong semantics produce confusing SR announcements. |
| Exceed 7 topbar items without grouping | Cognitive overload on narrow screens and for users reading linearly via keyboard. |

## Tokens reference

The component exposes these tokens (Tier 3, scoped):

- `--component-nav-bg` — nav surface background (`--surface-primary`, white)
- `--component-nav-fg` — default item text (`--text-secondary`, slate-700)
- `--component-nav-fg-hover` — hover item text (`--text-primary`, slate-900)
- `--component-nav-fg-active` — active/current item text (`--accent-brand`, cyan-700)
- `--component-nav-padding-x` — horizontal item padding (`--space-3`, 12px)
- `--component-nav-padding-y` — vertical item padding (`--space-2`, 8px)
- `--component-nav-gap` — space between items (`--space-1`, 4px)

These compose from Tier 2 semantic tokens (which compose from Tier 1 primitives — see §4 + §5).
