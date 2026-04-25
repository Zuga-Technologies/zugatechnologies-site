---
name: Avatar
summary: Circular or rounded visual identity element representing a user or entity.
anatomy:
  - Image container
  - Fallback initials layer
  - Status indicator dot (optional)
variants:
  - image
  - initials
  - icon
accessibility:
  keyboard:
    - Tab focusable when interactive
  ariaRoles:
    - img
  contrastNotes: Initials fallback text must meet WCAG AA 4.5:1 against avatar background color.
  focusBehavior: When used as a button, focus ring wraps the full avatar container.
examples:
  - framework: astro
    code: "<Avatar src='/user.png' alt='Antonio Delgado' />"
donts:
  - Do not use avatar as the sole affordance for a dropdown menu — add a visible caret.
tokens:
  - component.avatar.bg
  - component.avatar.text
  - component.avatar.border
  - component.avatar.status-online
---

# Avatar

*[full doc body — see plan Task 25]*
