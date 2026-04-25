---
name: Button
summary: The primary interactive trigger for actions across all Zuga studios.
anatomy:
  - Label text
  - Container (bg + border-radius)
  - Icon slot (optional leading/trailing)
variants:
  - primary
  - secondary
  - ghost
  - destructive
accessibility:
  keyboard:
    - Enter activates
    - Space activates
  ariaRoles:
    - button
  contrastNotes: Primary variant must meet WCAG AA 4.5:1 against bg surface.
  focusBehavior: Visible focus ring using --focus-ring token; 2px offset.
examples:
  - framework: astro
    code: "<Button variant='primary'>Save</Button>"
donts:
  - Do not use as a navigation link — use an anchor element instead.
  - Do not disable without providing a tooltip explaining why.
tokens:
  - component.button.bg
  - component.button.text
  - component.button.border
  - component.button.radius
---

# Button

*[full doc body — see plan Task 25]*
