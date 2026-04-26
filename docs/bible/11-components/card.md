---
name: Card
summary: Surface container for grouping related content or actions in a studio layout.
anatomy:
  - Card container (bg + radius + shadow + padding)
  - Header slot
  - Body slot
  - Footer / action slot (optional)
variants:
  - default
  - interactive
  - elevated
accessibility:
  keyboard:
    - Tab focusable when using the interactive variant
    - Enter activates interactive card
  ariaRoles:
    - article
  contrastNotes: >
    Card body text: --text-primary (slate-900 #0f172a) on --component-card-bg (#ffffff surface-primary) = 17.85:1 — AAA.
    Card border: --component-card-border (--border-subtle, slate-200 #e2e8f0) against white = 1.23:1 non-text contrast — below WCAG 1.4.11 (3:1 non-text contrast). The card boundary is communicated through box-shadow and surface color difference (--surface-canvas vs --surface-primary) rather than border contrast alone. Studios with strict compliance requirements should bump border weight or shift to slate-400 minimum (2.81:1).
  focusBehavior: >
    Interactive cards receive a visible focus ring on the outer container using --border-focus (cyan-500).
    Static cards are not focusable; interactive elements within (buttons, links) carry their own focus handling.
examples:
  - framework: astro
    code: |
      ---
      import { Card, CardHeader, CardBody, CardFooter } from '@zuga/ui/Card.astro';
      ---
      <!-- static informational card -->
      <Card>
        <CardHeader>Session Summary</CardHeader>
        <CardBody>You completed 3 of 5 goals today.</CardBody>
      </Card>

      <!-- interactive card: entire card is a link -->
      <Card variant="interactive" href="/studio/trader" as="a">
        <CardHeader>ZugaTrader</CardHeader>
        <CardBody>Markets open · 4 active signals</CardBody>
      </Card>

      <!-- elevated card with action footer -->
      <Card variant="elevated">
        <CardHeader>Meditation</CardHeader>
        <CardBody>5-minute breathing session.</CardBody>
        <CardFooter>
          <Button variant="primary">Start</Button>
        </CardFooter>
      </Card>
  - framework: vue
    code: |
      <template>
        <!-- static -->
        <Card>
          <template #header>Session Summary</template>
          <template #body>You completed 3 of 5 goals today.</template>
        </Card>

        <!-- interactive link card -->
        <Card variant="interactive" as="a" :href="`/studio/${studio.slug}`">
          <template #header>{{ studio.name }}</template>
          <template #body>{{ studio.status }}</template>
        </Card>
      </template>

      <script setup>
      import Card from '@zuga/ui/Card.vue';
      defineProps({ studio: Object });
      </script>
  - framework: plain-html
    code: |
      <!-- static card -->
      <article class="card card--default">
        <header class="card__header">Session Summary</header>
        <div class="card__body">You completed 3 of 5 goals today.</div>
      </article>

      <!-- interactive card as a link -->
      <a href="/studio/trader" class="card card--interactive">
        <header class="card__header">ZugaTrader</header>
        <div class="card__body">Markets open · 4 active signals</div>
      </a>

      <!-- elevated card with footer actions -->
      <article class="card card--elevated">
        <header class="card__header">Meditation</header>
        <div class="card__body">5-minute breathing session.</div>
        <footer class="card__footer">
          <button type="button" class="btn btn--primary">Start</button>
        </footer>
      </article>
donts:
  - Do not nest interactive cards inside other interactive cards — keyboard focus becomes ambiguous and the hit areas collide.
  - Do not use an interactive card for navigation when a standard link or button suffices — reserve the card affordance for multi-content units.
  - Do not omit semantic structure (header, body, footer) in favor of a single blob of text — screen readers use heading hierarchy inside card regions.
  - Do not mix an interactive card with additional interactive children — the entire card is the action target; extra buttons create conflicting click zones.
tokens:
  - component.card.padding
  - component.card.radius
  - component.card.bg
  - component.card.border
  - component.card.shadow
  - component.card.shadow-hover
---

# Card

## Anatomy

```
  ┌─────────────────────────────────────────────┐  ← shadow (--component-card-shadow)
  │  ┌───────────────────────────────────────┐  │
  │  │  Header slot                          │  │  ← title, label, or avatar row
  │  ├───────────────────────────────────────┤  │
  │  │                                       │  │
  │  │  Body slot                            │  │  ← primary content
  │  │                                       │  │
  │  ├───────────────────────────────────────┤  │
  │  │  Footer / action slot  [optional]     │  │  ← buttons, links, metadata
  │  └───────────────────────────────────────┘  │
  └─────────────────────────────────────────────┘
    ↑ border (--component-card-border, border-subtle)
```

Each part:

- **Card container** — carries background (`--component-card-bg`, white), border (`--component-card-border`, border-subtle slate-200), border-radius (`--component-card-radius`, radius-lg, 8px), and box-shadow. Padding is `--component-card-padding` (24px) applied to the outer container.
- **Header slot** — the topmost content area; typically holds a title, avatar, or metadata line. Rendered as `<header>` within the `<article>` for semantic correctness.
- **Body slot** — the primary content area. No imposed type styles — inherits from the surrounding context.
- **Footer / action slot** — optional bottom strip for action buttons or secondary metadata. Rendered as `<footer>`. Optional — omit when no actions are needed.

## Variants & Usage

**default** — Static informational surface. No hover or focus state on the card itself. Interactive children (buttons, links) inside the card carry their own affordances. Use for summary panels, stat blocks, descriptive content areas.

**interactive** — The entire card is clickable (rendered as `<a>` or `<button>`). Shadow lifts on hover (`--component-card-shadow-hover`). Use for navigation tiles, studio pickers, content grids where clicking anywhere in the card is the expected action. Do not mix with interactive children.

**elevated** — Visually distinguished surface with stronger shadow (`--component-card-shadow` promoted to `--shadow-md`). Used for featured content, modals-lite contexts, or cards that float above surrounding content. Static variant — add a footer with explicit action buttons.

## Accessibility

### Keyboard

- **Tab** — focuses an interactive card as a single unit. The accessible name comes from the card's heading or the `aria-label` on the card element.
- **Enter** — activates the interactive card's href or click handler.

### ARIA / Roles

Cards use `role="article"` (implicit via `<article>`) to create a browsable landmark. Within a card list, each article is announced as "article N of M" by screen readers that support article navigation. Interactive cards rendered as `<a>` carry the implicit `role="link"` with an accessible name derived from visible content. Use `aria-label` to override if the visible content isn't a complete description.

### Screen reader script

- **Static card:** "Session Summary, article" — user reads through heading and body with arrow keys
- **Interactive card:** "ZugaTrader, link — Markets open · 4 active signals" (accessible name from heading + body)
- **Focused interactive:** full card content announced on Tab focus

### Contrast verification

- **Body text:** `--text-primary` (slate-900, #0f172a) on `--component-card-bg` (white, #ffffff) = **17.85:1** — AAA.
- **Card border** (non-text): `--border-subtle` (slate-200, #e2e8f0) against white = **1.23:1** — **below WCAG 1.4.11 (3:1 non-text contrast)**. The card boundary is communicated through `box-shadow` and surface color difference (`--surface-canvas` vs `--surface-primary`), not border contrast alone. Studios with strict compliance requirements should bump border weight or shift to slate-400 minimum (≈2.81:1).

### Focus behavior

Interactive cards receive a 2px focus ring in `--border-focus` (cyan-500) at 2px offset on the full card container. Static cards are never in the tab order.

## Code

### Astro

```astro
---
import { Card, CardHeader, CardBody, CardFooter } from '@zuga/ui/Card.astro';
---
<!-- static -->
<Card>
  <CardHeader>Session Summary</CardHeader>
  <CardBody>You completed 3 of 5 goals today.</CardBody>
</Card>

<!-- interactive link card -->
<Card variant="interactive" href="/studio/trader" as="a">
  <CardHeader>ZugaTrader</CardHeader>
  <CardBody>Markets open · 4 active signals</CardBody>
</Card>

<!-- elevated with actions -->
<Card variant="elevated">
  <CardHeader>Meditation</CardHeader>
  <CardBody>5-minute breathing session.</CardBody>
  <CardFooter>
    <Button variant="primary">Start</Button>
  </CardFooter>
</Card>
```

### Vue

```vue
<template>
  <!-- static -->
  <Card>
    <template #header>Session Summary</template>
    <template #body>You completed 3 of 5 goals today.</template>
  </Card>

  <!-- interactive -->
  <Card variant="interactive" as="a" :href="`/studio/${studio.slug}`">
    <template #header>{{ studio.name }}</template>
    <template #body>{{ studio.status }}</template>
  </Card>
</template>

<script setup>
import Card from '@zuga/ui/Card.vue';
defineProps({ studio: Object });
</script>
```

### Plain HTML

```html
<!-- static -->
<article class="card card--default">
  <header class="card__header">Session Summary</header>
  <div class="card__body">You completed 3 of 5 goals today.</div>
</article>

<!-- interactive link card -->
<a href="/studio/trader" class="card card--interactive">
  <header class="card__header">ZugaTrader</header>
  <div class="card__body">Markets open · 4 active signals</div>
</a>

<!-- elevated with footer -->
<article class="card card--elevated">
  <header class="card__header">Meditation</header>
  <div class="card__body">5-minute breathing session.</div>
  <footer class="card__footer">
    <button type="button" class="btn btn--primary">Start</button>
  </footer>
</article>
```

## Don'ts

| Don't | Why |
|---|---|
| Nest interactive cards inside interactive cards | Keyboard focus becomes ambiguous; click areas overlap; screen readers can't determine what activates. |
| Use interactive card for single-action navigation when a button suffices | The card pattern implies multi-content; using it for a single text link overloads the component. |
| Omit semantic header/body/footer structure | Screen readers navigate by headings inside articles; a flat content blob has no hierarchy. |
| Add buttons inside an interactive card | Creates conflicting click zones. An interactive card is one single action target. |

## Tokens reference

The component exposes these tokens (Tier 3, scoped):

- `--component-card-padding` — interior padding on all sides (`--space-6`, 24px)
- `--component-card-radius` — corner rounding (`--radius-lg`, 8px)
- `--component-card-bg` — surface color (`--surface-primary`, white)
- `--component-card-border` — border color (`--border-subtle`, slate-200)
- `--component-card-shadow` — default elevation (`--shadow-sm`)
- `--component-card-shadow-hover` — elevated hover state (`--shadow-md`)

These compose from Tier 2 semantic tokens (which compose from Tier 1 primitives — see §4 + §5).
