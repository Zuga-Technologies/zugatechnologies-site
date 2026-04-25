---
name: Nav
summary: Primary navigation component for studio-level and app-level wayfinding.
anatomy:
  - Nav container
  - Nav item links
  - Active state indicator
  - Icon slot (optional)
variants:
  - sidebar
  - topbar
accessibility:
  keyboard:
    - Tab navigates between nav items
    - Enter activates nav item
  ariaRoles:
    - navigation
  contrastNotes: Active nav item text must meet WCAG AA 4.5:1 against active state background.
  focusBehavior: Current page indicated via aria-current=page; focus ring on individual nav items.
examples:
  - framework: astro
    code: "<Nav><NavItem href='/dashboard'>Dashboard</NavItem></Nav>"
donts:
  - Do not rely on color alone to indicate the active nav item.
tokens:
  - component.nav.bg
  - component.nav.text
  - component.nav.active-bg
  - component.nav.active-text
---

# Nav

*[full doc body — see plan Task 25]*
