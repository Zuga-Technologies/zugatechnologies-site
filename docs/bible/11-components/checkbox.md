---
name: Checkbox
summary: Binary selection control used in forms and settings panels.
anatomy:
  - Checkbox control (box + checkmark)
  - Label text
variants:
  - default
  - indeterminate
  - disabled
accessibility:
  keyboard:
    - Tab focusable
    - Space toggles checked state
  ariaRoles:
    - checkbox
  contrastNotes: Checkmark icon must meet WCAG AA 4.5:1 against filled background.
  focusBehavior: Focus ring wraps the checkbox control box using --focus-ring token.
examples:
  - framework: astro
    code: "<Checkbox label='Accept terms' />"
donts:
  - Do not use checkboxes for mutually exclusive options — use radio buttons instead.
tokens:
  - component.checkbox.bg
  - component.checkbox.border
  - component.checkbox.check
  - component.checkbox.label
---

# Checkbox

*[full doc body — see plan Task 25]*
