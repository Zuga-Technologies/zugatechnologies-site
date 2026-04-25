---
name: Input
summary: Single-line text entry field used across forms in all Zuga studios.
anatomy:
  - Label
  - Input field container
  - Helper / error text
variants:
  - default
  - error
  - disabled
accessibility:
  keyboard:
    - Tab focusable
    - Shift+Tab reverse focus
  ariaRoles:
    - textbox
  contrastNotes: Placeholder text must meet WCAG AA 4.5:1 against field background.
  focusBehavior: Focus ring applied to field container using --focus-ring token.
examples:
  - framework: astro
    code: "<Input label='Email' type='email' />"
donts:
  - Do not remove the visible label — placeholder alone is not accessible.
tokens:
  - component.input.bg
  - component.input.border
  - component.input.text
  - component.input.error
---

# Input

*[full doc body — see plan Task 25]*
