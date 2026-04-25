---
name: Tabs
summary: Segmented navigation for switching between related content panels within a view.
anatomy:
  - Tab list container
  - Tab trigger items
  - Active indicator
  - Tab panel content area
variants:
  - default
  - underline
  - pill
accessibility:
  keyboard:
    - Tab enters tab list
    - Arrow keys navigate between tabs
    - Enter/Space activates tab
  ariaRoles:
    - tablist
    - tab
    - tabpanel
  contrastNotes: Active tab indicator must meet WCAG AA 3:1 for non-text contrast.
  focusBehavior: Roving tabindex within tab list; Tab moves to active panel content.
examples:
  - framework: astro
    code: "<Tabs><Tab label='Overview'>Content</Tab><Tab label='Settings'>Content</Tab></Tabs>"
donts:
  - Do not use tabs for sequential steps — use a stepper component instead.
tokens:
  - component.tabs.border
  - component.tabs.active-indicator
  - component.tabs.text
  - component.tabs.panel-bg
---

# Tabs

*[full doc body — see plan Task 25]*
