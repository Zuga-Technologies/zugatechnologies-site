---
name: Select
summary: Dropdown list component for selecting a single option from a set.
anatomy:
  - Trigger button with current value
  - Dropdown panel
  - Option list items
variants:
  - default
  - error
accessibility:
  keyboard:
    - Tab focusable
    - Enter/Space opens dropdown
    - Arrow keys navigate options
  ariaRoles:
    - listbox
    - option
  contrastNotes: Option text must meet WCAG AA 4.5:1 against dropdown panel background.
  focusBehavior: Focus returns to trigger button on close; active option highlighted with --accent-brand.
examples:
  - framework: astro
    code: "<Select label='Country' options={countries} />"
donts:
  - Do not use for binary yes/no choices — use a checkbox or toggle instead.
tokens:
  - component.select.bg
  - component.select.border
  - component.select.text
  - component.select.option-hover
---

# Select

*[full doc body — see plan Task 25]*
