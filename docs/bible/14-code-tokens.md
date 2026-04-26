---
section: 14
title: Code Tokens
summary: How tokens map to CSS custom properties + DTCG JSON.
mikeCheckpoint: false
---

# 14. Code Tokens

> Authored: 2026-04-26
> Authoring task: see plan Task 27

This section is the engineer's entry point to the token system. For override rules (which tokens a sub-brand profile can change), see §15. For cross-platform delivery beyond web CSS, see §16.

---

## 14.1 Package

```
@zuga/design-tokens  v0.1.0
```

Published to the GitHub Package Registry (`npm.pkg.github.com`). Access is restricted — you need a GitHub PAT with `read:packages` scope in your `.npmrc`.

```
// .npmrc
@zuga:registry=https://npm.pkg.github.com
```

### Exports

| Export path | What it is |
|-------------|-----------|
| `@zuga/design-tokens/tokens.css` | Tier 1 primitives + Tier 2 semantic defaults (light mode) |
| `@zuga/design-tokens/tokens-dark.css` | Dark mode semantic overrides |
| `@zuga/design-tokens/reset.css` | Zuga CSS reset (box-sizing, margin zeroing) |
| `@zuga/design-tokens/profiles/*.css` | Sub-brand profile overrides (e.g., `profiles/studio-life.css`) |
| `@zuga/design-tokens/components/*.css` | Component-scoped Tier 3 tokens |

---

## 14.2 Naming convention (DTCG-aligned)

Tokens follow a three-tier hierarchy. The CSS custom property name encodes the tier.

```
--{tier-prefix}-{category}-{variant}
```

### Tier 1 — Primitives

Raw values. No semantic meaning. Never referenced directly in component code — use Tier 2 instead.

```
--color-{ramp}-{stop}         e.g. --color-cyan-500
--space-{n}                   e.g. --space-4
--type-scale-{name}           e.g. --type-scale-base
--font-family-{name}          e.g. --font-family-sans
--font-weight-{name}          e.g. --font-weight-semibold
--font-line-height-{name}     e.g. --font-line-height-normal
--radius-{name}               e.g. --radius-md
--motion-duration-{name}      e.g. --motion-duration-fast
--motion-easing-{name}        e.g. --motion-easing-standard
--z-{name}                    e.g. --z-modal
```

### Tier 2 — Semantic

Carry meaning. Resolved from Tier 1 values. These are what components use.

```
--surface-{name}              e.g. --surface-primary
--text-{name}                 e.g. --text-primary
--border-{name}               e.g. --border-focus
--accent-{role}               e.g. --accent-brand
--feedback-{type}             e.g. --feedback-success
--density-{mode}              e.g. --density-compact
```

Tier 2 is split into **locked** and **overridable**:
- `surface.*`, `text.*`, `border.*`, `feedback.*` — **locked**. No profile override.
- `accent.*`, `density.*` — **overridable** by sub-brand profiles (see §15).

### Tier 3 — Component

Scoped to a single component. Declared inside component CSS files.

```
--component-{name}-{property}   e.g. --component-button-radius
```

Component tokens are overridable per-profile. Tier 1 and locked Tier 2 tokens are not.

---

## 14.3 Override rules summary

Only three prefix groups are overridable by sub-brand profiles:
1. `--accent-*`
2. `--density-*`
3. `--component-*`

Everything else is locked. The lint enforcer for this rule lives at `packages/design-tokens/scripts/tokens-lint.mjs`. See §15 for the full enforcement model and the profile registration gate.

---

## 14.4 Code examples

### Astro

Import the package CSS in your global stylesheet. Token variables are then available everywhere.

```css
/* src/styles/global.css */
@import "@zuga/design-tokens/tokens.css";
@import "@zuga/design-tokens/tokens-dark.css";
@import "@zuga/design-tokens/reset.css";

/* If this consumer uses a sub-brand profile: */
@import "@zuga/design-tokens/profiles/studio-life.css";
```

Reference tokens in component styles:

```astro
---
// src/components/HeroCard.astro
---
<div class="hero-card">
  <h2>Title</h2>
  <p>Body copy</p>
</div>

<style>
.hero-card {
  background-color: var(--surface-primary);
  color: var(--text-primary);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
}

.hero-card h2 {
  font-size: var(--type-scale-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.hero-card p {
  font-size: var(--type-scale-base);
  color: var(--text-secondary);
  margin-top: var(--space-2);
}
</style>
```

### Vue SFC

Same CSS variables — Vue scoped styles work identically to Astro component styles.

```vue
<!-- src/components/StatusBadge.vue -->
<template>
  <span class="badge" :class="`badge--${variant}`">
    <slot />
  </span>
</template>

<script setup lang="ts">
defineProps<{ variant: 'success' | 'warn' | 'danger' }>()
</script>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-0_5) var(--space-2);
  border-radius: var(--radius-full);
  font-size: var(--type-scale-sm);
  font-weight: var(--font-weight-medium);
}

.badge--success {
  background-color: var(--feedback-success-subtle);
  color: var(--feedback-success);
}

.badge--warn {
  background-color: var(--feedback-warn-subtle);
  color: var(--feedback-warn);
}

.badge--danger {
  background-color: var(--feedback-danger-subtle);
  color: var(--feedback-danger);
}
</style>
```

### Plain HTML

Link the token CSS directly and use variables inline or in a `<style>` block.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="/node_modules/@zuga/design-tokens/src/tokens.css" />
  <style>
    body {
      background-color: var(--surface-canvas);
      color: var(--text-primary);
      font-family: var(--font-family-sans);
    }

    .cta-button {
      background-color: var(--accent-brand);
      color: var(--accent-fg);
      padding: var(--space-3) var(--space-6);
      border-radius: var(--radius-md);
      border: none;
      font-weight: var(--font-weight-semibold);
    }
  </style>
</head>
<body>
  <button class="cta-button" style="color: var(--accent-fg)">
    Get started
  </button>
</body>
</html>
```

---

## 14.5 Dark mode

Dark mode is a semantic-layer swap — Tier 1 primitives don't change, only Tier 2 `surface.*` and `text.*` values flip.

```css
/* Apply dark mode at the OS level */
@import "@zuga/design-tokens/tokens.css";
@import "@zuga/design-tokens/tokens-dark.css";
```

`tokens-dark.css` overrides `--surface-*` and `--text-*` inside `@media (prefers-color-scheme: dark)`. If you need manual dark-mode toggle, apply a `[data-theme="dark"]` attribute and scope the dark overrides to that selector — do not maintain a separate stylesheet; patch `tokens-dark.css` to support both the media query and the attribute selector.
