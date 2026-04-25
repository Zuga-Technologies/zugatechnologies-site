---
name: Badge
summary: Small label for status, count, or categorization attached to another element.
anatomy:
  - Badge container
  - Label text or count
variants:
  - default
  - dot
  - count
  - status
accessibility:
  keyboard:
    - Tab focusable only when badge itself is interactive
  ariaRoles:
    - status
  contrastNotes: Badge text must meet WCAG AA 4.5:1 against badge background.
  focusBehavior: Non-interactive badges are not in the tab sequence; content conveyed via aria-label on parent.
examples:
  - framework: astro
    code: "<Badge variant='count'>3</Badge>"
donts:
  - Do not use badges as the only means to convey critical status — also use text.
tokens:
  - component.badge.bg
  - component.badge.text
  - component.badge.border
  - component.badge.radius
---

# Badge

*[full doc body — see plan Task 25]*
