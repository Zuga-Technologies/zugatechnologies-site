---
name: Card
summary: Surface container for grouping related content or actions in a studio layout.
anatomy:
  - Card container (bg + radius + shadow)
  - Header slot
  - Body slot
  - Footer / action slot (optional)
variants:
  - default
  - interactive
  - elevated
accessibility:
  keyboard:
    - Tab focusable when interactive variant
  ariaRoles:
    - article
  contrastNotes: Card body text must meet WCAG AA 4.5:1 against card surface background.
  focusBehavior: Interactive cards receive focus ring on the outer container.
examples:
  - framework: astro
    code: "<Card><CardHeader>Title</CardHeader><CardBody>Content</CardBody></Card>"
donts:
  - Do not nest interactive cards inside other interactive cards.
tokens:
  - component.card.bg
  - component.card.border
  - component.card.shadow
  - component.card.radius
---

# Card

*[full doc body — see plan Task 25]*
