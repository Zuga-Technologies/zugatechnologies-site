---
name: Toolbar
summary: Horizontal strip of controls providing context-sensitive actions for a view or selection.
anatomy:
  - Toolbar container
  - Button group slots
  - Divider separators
variants:
  - default
  - compact
accessibility:
  keyboard:
    - Tab enters toolbar
    - Arrow keys navigate between toolbar items
    - Escape exits toolbar back to content
  ariaRoles:
    - toolbar
  contrastNotes: Toolbar icon controls must meet WCAG AA 3:1 for non-text contrast against toolbar background.
  focusBehavior: Toolbar uses roving tabindex; only one item in the tab sequence at a time.
examples:
  - framework: astro
    code: "<Toolbar><ToolbarButton icon='bold' /><ToolbarButton icon='italic' /></Toolbar>"
donts:
  - Do not place more than 7 actions in a single toolbar without grouping with dividers.
tokens:
  - component.toolbar.bg
  - component.toolbar.border
  - component.toolbar.button-hover
  - component.toolbar.divider
---

# Toolbar

*[full doc body — see plan Task 25]*
