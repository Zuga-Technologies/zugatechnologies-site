---
name: Skeleton
summary: Animated placeholder that represents loading content to reduce perceived wait time.
anatomy:
  - Skeleton shape block
  - Shimmer animation layer
variants:
  - text
  - rect
  - circle
accessibility:
  keyboard:
    - Not focusable — decorative loading state element
  ariaRoles:
    - progressbar
  contrastNotes: >
    Skeleton shimmer is decorative; no text contrast requirement applies.
    --component-skeleton-bg (slate-100 #f1f5f9) on white (#ffffff) page surface = 14.48:1 non-text contrast — clearly visible.
    --component-skeleton-bg-shimmer (slate-200 #e2e8f0) on slate-100 = 1.20:1 — intentionally subtle for the shimmer wave effect.
    The containing region must carry aria-busy="true" and a visible loading state label where the skeleton is meaningful.
  focusBehavior: >
    No focus behavior. Skeleton elements are decorative and carry aria-hidden="true".
    aria-busy="true" is set on the containing region (not individual skeletons) during loading.
examples:
  - framework: astro
    code: |
      ---
      import Skeleton from '@zuga-technologies/ui/Skeleton.astro';
      ---
      <!-- text line skeletons -->
      <div aria-busy="true" aria-label="Loading user profile">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="40%" />
      </div>

      <!-- avatar + text row -->
      <div aria-busy="true" aria-label="Loading feed item">
        <Skeleton variant="circle" size="40px" />
        <div>
          <Skeleton variant="text" width="140px" />
          <Skeleton variant="text" width="100px" />
        </div>
      </div>

      <!-- card placeholder -->
      <div aria-busy="true" aria-label="Loading card">
        <Skeleton variant="rect" width="100%" height="180px" />
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="50%" />
      </div>
  - framework: vue
    code: |
      <template>
        <!-- show skeleton while loading; render real content when loaded -->
        <div :aria-busy="isLoading" aria-label="Loading user profile">
          <template v-if="isLoading">
            <Skeleton variant="circle" size="40px" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="80%" />
          </template>
          <template v-else>
            <Avatar :src="user.avatar" :alt="user.name" />
            <h2>{{ user.name }}</h2>
            <p>{{ user.bio }}</p>
          </template>
        </div>
      </template>

      <script setup>
      import { ref } from 'vue';
      import Skeleton from '@zuga-technologies/ui/Skeleton.vue';
      import Avatar from '@zuga-technologies/ui/Avatar.vue';

      const isLoading = ref(true);
      const user = ref(null);

      onMounted(async () => {
        user.value = await fetchUser();
        isLoading.value = false;
      });
      </script>
  - framework: plain-html
    code: |
      <!-- skeleton group with aria-busy on container -->
      <div aria-busy="true" aria-label="Loading profile" class="skeleton-group">
        <!-- circle (avatar placeholder) -->
        <span class="skeleton skeleton--circle" style="--size: 40px;"
              aria-hidden="true"></span>

        <!-- text lines -->
        <span class="skeleton skeleton--text" style="--width: 60%;"
              aria-hidden="true"></span>
        <span class="skeleton skeleton--text" style="--width: 80%;"
              aria-hidden="true"></span>
      </div>

      <!-- image/card placeholder -->
      <div aria-busy="true" aria-label="Loading content" class="skeleton-group">
        <span class="skeleton skeleton--rect" style="--width: 100%; --height: 180px;"
              aria-hidden="true"></span>
        <span class="skeleton skeleton--text" style="--width: 70%;"
              aria-hidden="true"></span>
      </div>
donts:
  - Do not use skeletons for interactive action states — use a loading spinner or button loading state for button clicks.
  - Do not animate skeletons when prefers-reduced-motion is set — disable the shimmer animation and use a static placeholder instead.
  - Do not forget aria-busy="true" on the containing region — screen readers need to know content is loading; individual skeleton elements carry aria-hidden.
  - Do not use a skeleton when load time is under 300ms — flashing a skeleton and replacing it instantly is more disorienting than just showing the content.
tokens:
  - component.skeleton.bg
  - component.skeleton.bg-shimmer
  - component.skeleton.radius
  - component.skeleton.duration
  - component.skeleton.easing
---

# Skeleton

## Anatomy

```
  text variant:
  ████████████████████████████████   ← --component-skeleton-bg (slate-100)
      ↑ shimmer layer animates left-to-right
      ↑ --component-skeleton-bg-shimmer (slate-200) as gradient wave

  rect variant:
  ┌─────────────────────────────────┐
  │  ██████████████████████████████ │  ← full block, configurable w/h
  └─────────────────────────────────┘

  circle variant:
   ●   ← --component-skeleton-radius (radius-full for circle)
```

Each part:

- **Skeleton shape block** — a `<span>` or `<div>` with `aria-hidden="true"`. Takes its width, height, and border-radius from the variant and size props. Background is `--component-skeleton-bg` (slate-100).
- **Shimmer animation layer** — a gradient overlay animated from left to right using a `@keyframes` animation. Duration: `--component-skeleton-duration` (`--motion-duration-slower`, 500ms). Easing: `--component-skeleton-easing` (`--motion-easing-standard`). Disabled when `prefers-reduced-motion: reduce` is active.

## Variants & Usage

**text** — A short horizontal block with 16px default height and slight border-radius. Use to represent one line of text content. Stack multiple to suggest a paragraph. Vary widths (60%, 80%, 40%) to simulate natural text line endings.

**rect** — A full block placeholder for images, cards, charts, or any rectangular content area. Width and height are explicitly set per use case.

**circle** — A fully rounded block for avatar or icon placeholders. Set a `size` prop or CSS custom property to control diameter.

## Accessibility

### Keyboard

Skeletons are not focusable. They carry `aria-hidden="true"` at the element level. The containing region (the area that will hold the real content) carries `aria-busy="true"` while loading is in progress, which signals to screen readers that content is being updated. When loading completes, `aria-busy` is removed or set to `false`, and the real content is announced.

### ARIA / Roles

`role="progressbar"` can be placed on the containing region to communicate a loading state to screen readers. If used, pair with `aria-label="Loading [content description]"` on the container. Individual skeleton elements are always `aria-hidden="true"`.

### Screen reader script

- **Loading:** "[containing region]" → SR announces "Loading user profile, busy" via `aria-busy="true"` and `aria-label`
- **Loaded:** `aria-busy` removed → SR announces the newly visible content
- **Individual skeletons:** silent (all carry `aria-hidden="true"`)

### Contrast verification

- **Skeleton block on page:** `--component-skeleton-bg` (slate-100, #f1f5f9) on white (#ffffff) = **14.48:1** non-text contrast — clearly distinguishable from the page surface.
- **Shimmer gradient** (slate-200 #e2e8f0 on slate-100): **~1.20:1** — intentionally subtle; the shimmer is a motion cue, not a contrast cue. Motion alone communicates loading to sighted users; `aria-busy` communicates it to SR users.

### Focus behavior

None. Skeleton elements are decorative and not part of the tab order. No interactive focus states exist on skeleton components.

## Code

### Astro

```astro
---
import Skeleton from '@zuga-technologies/ui/Skeleton.astro';
---
<div aria-busy="true" aria-label="Loading profile">
  <Skeleton variant="circle" size="40px" />
  <Skeleton variant="text" width="60%" />
  <Skeleton variant="text" width="80%" />
</div>

<div aria-busy="true" aria-label="Loading card">
  <Skeleton variant="rect" width="100%" height="180px" />
  <Skeleton variant="text" width="70%" />
  <Skeleton variant="text" width="50%" />
</div>
```

### Vue

```vue
<template>
  <div :aria-busy="isLoading" aria-label="Loading user profile">
    <template v-if="isLoading">
      <Skeleton variant="circle" size="40px" />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="80%" />
    </template>
    <template v-else>
      <Avatar :src="user.avatar" :alt="user.name" />
      <h2>{{ user.name }}</h2>
      <p>{{ user.bio }}</p>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Skeleton from '@zuga-technologies/ui/Skeleton.vue';

const isLoading = ref(true);
const user = ref(null);

onMounted(async () => {
  user.value = await fetchUser();
  isLoading.value = false;
});
</script>
```

### Plain HTML

```html
<div aria-busy="true" aria-label="Loading profile" class="skeleton-group">
  <span class="skeleton skeleton--circle" aria-hidden="true"
        style="--size: 40px;"></span>
  <span class="skeleton skeleton--text" aria-hidden="true"
        style="--width: 60%;"></span>
  <span class="skeleton skeleton--text" aria-hidden="true"
        style="--width: 80%;"></span>
</div>
```

## Don'ts

| Don't | Why |
|---|---|
| Use skeletons for button loading states | A skeleton replaces content; a loading spinner on the button communicates an in-progress action without swapping the UI. |
| Animate skeletons with `prefers-reduced-motion` active | Users with vestibular disorders find repeated motion distressing. Disable shimmer and use a static placeholder. |
| Skip `aria-busy="true"` on the container | SR users have no indication that content is pending without this attribute. Individual `aria-hidden` skeletons are silent. |
| Show a skeleton for sub-300ms loads | Instant flash is jarring. Guard with a minimum display duration or skip skeleton entirely for fast data. |

## Tokens reference

The component exposes these tokens (Tier 3, scoped):

- `--component-skeleton-bg` — base skeleton color (`--surface-secondary`, slate-100)
- `--component-skeleton-bg-shimmer` — shimmer highlight color (`--surface-tertiary`, slate-200)
- `--component-skeleton-radius` — corner radius (`--radius-md`, 6px; set to `--radius-full` for circle variant)
- `--component-skeleton-duration` — shimmer animation duration (`--motion-duration-slower`, 500ms)
- `--component-skeleton-easing` — shimmer animation curve (`--motion-easing-standard`)

These compose from Tier 2 semantic tokens (which compose from Tier 1 primitives — see §4 + §5).
