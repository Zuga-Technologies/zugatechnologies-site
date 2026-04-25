---
name: Toast
summary: Ephemeral notification that appears temporarily to confirm or alert the user.
anatomy:
  - Toast container
  - Icon (optional)
  - Message text
  - Dismiss button (optional)
variants:
  - info
  - success
  - warning
  - error
accessibility:
  keyboard:
    - Tab focusable when dismiss button present
  ariaRoles:
    - status
    - alert
  contrastNotes: Toast message text must meet WCAG AA 4.5:1 against toast background.
  focusBehavior: Error toasts use role=alert for immediate announcement; others use role=status.
examples:
  - framework: astro
    code: "<Toast variant='success' message='Changes saved.' />"
donts:
  - Do not use toasts for errors that require user action — use inline error messages instead.
tokens:
  - component.toast.bg
  - component.toast.text
  - component.toast.icon
  - component.toast.border
---

# Toast

*[full doc body — see plan Task 25]*
