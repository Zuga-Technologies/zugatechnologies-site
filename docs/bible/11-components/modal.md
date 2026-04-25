---
name: Modal
summary: Overlay dialog that interrupts the current flow to present focused content or actions.
anatomy:
  - Backdrop overlay
  - Dialog container
  - Header with title and close button
  - Body content slot
  - Footer action slot
variants:
  - dialog
  - drawer
accessibility:
  keyboard:
    - Escape closes modal
    - Tab cycles focus within modal trap
    - Shift+Tab reverse cycles within modal trap
  ariaRoles:
    - dialog
  contrastNotes: Modal surface must maintain WCAG AA 4.5:1 for all body text against the modal background.
  focusBehavior: Focus is trapped inside modal while open; returns to trigger element on close.
examples:
  - framework: astro
    code: "<Modal title='Confirm action'><p>Are you sure?</p></Modal>"
donts:
  - Do not open a modal from within another modal — use a step flow instead.
  - Do not use modals for non-critical confirmations where inline messaging would suffice.
tokens:
  - component.modal.bg
  - component.modal.overlay
  - component.modal.border
  - component.modal.shadow
---

# Modal

*[full doc body — see plan Task 25]*
