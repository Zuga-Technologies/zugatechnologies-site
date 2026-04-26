---
name: Badge
summary: Small label for status, count, or categorization attached to another element.
anatomy:
  - Badge container (pill shape)
  - Label text or numeric count
variants:
  - default
  - brand
  - success
  - danger
accessibility:
  keyboard:
    - Not focusable when decorative; Tab focusable only when badge itself is interactive
  ariaRoles:
    - status
  contrastNotes: >
    Default: --component-badge-fg-default (slate-900 #0f172a) on --component-badge-bg-default (slate-100 #f1f5f9) = 16.30:1 — AAA.
    Brand: --component-badge-fg-brand (cyan-800 #155e75) on --component-badge-bg-brand (cyan-100 #cffafe) = 6.49:1 — AA.
    Success: --component-badge-fg-success (green-700 #15803d) on --component-badge-bg-success (green-100 #dcfce7) = 4.57:1 — AA.
    Danger: --component-badge-fg-danger (red-600 #dc2626) on --component-badge-bg-danger (red-100 #fee2e2) = 3.95:1 — below WCAG AA 4.5:1 normal-text threshold. The 3:1 large-text exception does NOT apply at 12px (WCAG large-text is 18pt normal / 14pt bold, approx 18.67px). Always pair a danger badge with text context so users do not depend on it alone — see the Don'ts section.
  focusBehavior: >
    Decorative badges are removed from the tab sequence. When a badge is placed on an interactive parent (button, nav item),
    its value should be included in the parent's aria-label so screen readers announce it without the badge being separately focusable.
examples:
  - framework: astro
    code: |
      ---
      import Badge from '@zuga/ui/Badge.astro';
      ---
      <Badge variant="default">Draft</Badge>
      <Badge variant="brand">New</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="danger">3</Badge>

      <!-- on a button: include count in aria-label -->
      <button type="button" aria-label="Notifications, 3 unread">
        Notifications
        <Badge variant="danger" aria-hidden="true">3</Badge>
      </button>
  - framework: vue
    code: |
      <template>
        <Badge variant="default">Draft</Badge>
        <Badge variant="brand">New</Badge>
        <Badge variant="success">Active</Badge>
        <Badge variant="danger">{{ unreadCount }}</Badge>

        <!-- attached to a button -->
        <button type="button" :aria-label="`Notifications, ${unreadCount} unread`">
          Notifications
          <Badge variant="danger" aria-hidden="true">{{ unreadCount }}</Badge>
        </button>
      </template>

      <script setup>
      import Badge from '@zuga/ui/Badge.vue';
      const props = defineProps({ unreadCount: Number });
      </script>
  - framework: plain-html
    code: |
      <!-- default -->
      <span class="badge badge--default">Draft</span>

      <!-- brand -->
      <span class="badge badge--brand">New</span>

      <!-- success -->
      <span class="badge badge--success">Active</span>

      <!-- danger count: badge is decorative; count lives in parent aria-label -->
      <button type="button" aria-label="Notifications, 3 unread">
        Notifications
        <span class="badge badge--danger" aria-hidden="true">3</span>
      </button>
donts:
  - Do not use badges as the only means to convey critical status — color-blind users may miss the semantic distinction; pair with text or an icon.
  - Do not put interactive content inside a badge — badges are labels, not buttons.
  - Do not render a count badge with stale data without a visible loading state on the parent.
  - Do not use the danger variant for non-error categorization just because red looks emphatic.
tokens:
  - component.badge.padding-x
  - component.badge.padding-y
  - component.badge.radius
  - component.badge.font-size
  - component.badge.font-weight
  - component.badge.bg-default
  - component.badge.fg-default
  - component.badge.bg-brand
  - component.badge.fg-brand
  - component.badge.bg-success
  - component.badge.fg-success
  - component.badge.bg-danger
  - component.badge.fg-danger
---

# Badge

## Anatomy

```
  ┌──────────────────┐
  │  Label / Count   │  ← container (pill, --component-badge-radius: full)
  └──────────────────┘
       ↑         ↑
  padding-x   font-size xs, font-weight semibold
```

Each part:

- **Badge container** — a pill-shaped span (`border-radius: full`) with horizontal padding (`--component-badge-padding-x`, 8px) and minimal vertical padding (`--component-badge-padding-y`, 2px). The variant token family sets background and foreground colors.
- **Label text or numeric count** — `--component-badge-font-size` (`--type-scale-xs`, 12px) at `--component-badge-font-weight` (semibold, 600). The small size means bold text is used to compensate for reduced legibility at 12px.

## Variants & Usage

**default** — Neutral categorization. Use for states like "Draft", "Archived", "Pending" where no urgency or brand signal is needed. Slate-100 background, slate-900 text (16.30:1).

**brand** — Highlights new features, newly released items, or brand-signaled categorization. Cyan-100 background, cyan-800 text (6.49:1). Use sparingly — overuse dilutes the "new" signal.

**success** — Positive or active status: "Active", "Published", "Completed". Green-100 background, green-700 text (4.57:1).

**danger** — Error counts, alert counts, or destructive-state labels: notification counts, "Overdue", "Error". Red-100 background, red-600 text (3.95:1 — clears large-text AA for bold 14px; badge text is semibold at xs/sm scale).

## Accessibility

### Keyboard

Decorative badges (attached to a parent element's label) are not in the tab sequence. They carry `aria-hidden="true"` and their value is included in the parent element's `aria-label`. Interactive badges (rare — e.g., a removable tag with an ×) are focusable and must have their own `aria-label`.

### ARIA / Roles

`role="status"` for count badges that update dynamically (triggers polite `aria-live` announcement). Static categorization badges use no role — they're decorative spans with `aria-hidden="true"` when the parent element already communicates the value.

### Screen reader script

- **Standalone status badge:** "Active, status" (role=status)
- **Count on button:** parent announces "Notifications, 3 unread" — badge itself is hidden (`aria-hidden="true"`)
- **Dynamic count update:** `role="status"` causes SR to politely announce the new count after user action

### Contrast verification

- **Default:** slate-900 (#0f172a) on slate-100 (#f1f5f9) = **16.30:1** — AAA.
- **Brand:** cyan-800 (#155e75) on cyan-100 (#cffafe) = **6.49:1** — AA.
- **Success:** green-700 (#15803d) on green-100 (#dcfce7) = **4.57:1** — AA.
- **Danger:** red-600 (#dc2626) on red-100 (#fee2e2) = **3.95:1** — below 4.5:1 for normal text, but WCAG 1.4.3 grants a lower threshold (3:1) for bold text at 14px+. Badge text is semibold (600) at xs (12px); at 12px bold, the 3:1 large-text exception does not technically apply. This is a known limitation — danger badge should always be accompanied by text that conveys the count meaning, not relied upon solely for status communication.

### Focus behavior

Decorative badges are skipped by Tab. When a badge is used as a removable tag with a dismiss button, the dismiss button is the focusable element — not the badge container itself.

## Code

### Astro

```astro
---
import Badge from '@zuga/ui/Badge.astro';
---
<Badge variant="default">Draft</Badge>
<Badge variant="brand">New</Badge>
<Badge variant="success">Active</Badge>

<!-- count on interactive parent: hide badge from SR, put count in aria-label -->
<button type="button" aria-label="Notifications, 3 unread">
  Notifications
  <Badge variant="danger" aria-hidden="true">3</Badge>
</button>
```

### Vue

```vue
<template>
  <Badge variant="default">Draft</Badge>
  <Badge variant="brand">New</Badge>
  <Badge variant="success">Active</Badge>
  <Badge variant="danger">{{ count }}</Badge>

  <button type="button" :aria-label="`Notifications, ${count} unread`">
    Notifications
    <Badge variant="danger" aria-hidden="true">{{ count }}</Badge>
  </button>
</template>

<script setup>
import Badge from '@zuga/ui/Badge.vue';
defineProps({ count: Number });
</script>
```

### Plain HTML

```html
<!-- default -->
<span class="badge badge--default">Draft</span>

<!-- brand -->
<span class="badge badge--brand">New</span>

<!-- success -->
<span class="badge badge--success">Active</span>

<!-- count on interactive parent -->
<button type="button" aria-label="Notifications, 3 unread">
  Notifications
  <span class="badge badge--danger" aria-hidden="true">3</span>
</button>
```

## Don'ts

| Don't | Why |
|---|---|
| Use badge alone to convey critical status | Color-blind users may not distinguish danger from default. Always pair with text. |
| Put interactive elements inside a badge | Badges are labels. Buttons go outside; the badge is the label on the button. |
| Use danger variant for non-alert categorization | Desensitizes users to real alerts. Reserve red for counts or error states. |
| Render stale count badges without a loading signal | Users see "3 unread" on a nav item that hasn't loaded yet — the count is a lie. |

## Tokens reference

The component exposes these tokens (Tier 3, scoped):

- `--component-badge-bg-default` — neutral background (`--surface-secondary`)
- `--component-badge-fg-default` — neutral label (`--text-primary`)
- `--component-badge-bg-brand` — brand background (`--accent-brand-subtle`)
- `--component-badge-fg-brand` — brand label (`--accent-brand-strong`)
- `--component-badge-bg-success` — success background (`--feedback-success-subtle`)
- `--component-badge-fg-success` — success label (`--feedback-success`)
- `--component-badge-bg-danger` — danger background (`--feedback-danger-subtle`)
- `--component-badge-fg-danger` — danger label (`--feedback-danger`)
- `--component-badge-radius` — always `--radius-full` (pill shape)
- `--component-badge-font-size` — `--type-scale-xs` (12px)
- `--component-badge-font-weight` — `--font-weight-semibold` (600)

These compose from Tier 2 semantic tokens (which compose from Tier 1 primitives — see §4 + §5).
