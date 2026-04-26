---
name: Avatar
summary: Circular or rounded visual identity element representing a user or entity.
anatomy:
  - Image container (circle, fixed size)
  - Fallback initials layer
  - Status indicator dot (optional)
  - Focus ring (when interactive)
variants:
  - image
  - initials
  - icon
accessibility:
  keyboard:
    - Tab focusable when used as an interactive button
    - Enter or Space activates when avatar is a button trigger
  ariaRoles:
    - img
  contrastNotes: >
    Initials fallback: --component-avatar-fg (slate-900 #0f172a) on --component-avatar-bg (slate-100 #f1f5f9) = 16.30:1 — AAA.
    Status dot (green-700 #15803d) against white surface = 5.02:1 — clears AA.
  focusBehavior: >
    When used as a button trigger, a visible focus ring wraps the full circular container using --border-focus (cyan-500).
    Static (non-interactive) avatars are not in the tab sequence and carry role=img with an alt/aria-label.
examples:
  - framework: astro
    code: |
      ---
      import Avatar from '@zuga/ui/Avatar.astro';
      ---
      <!-- image variant -->
      <Avatar
        src="/users/antonio.png"
        alt="Antonio Delgado"
        size="md"
      />

      <!-- initials fallback -->
      <Avatar initials="AD" size="lg" />

      <!-- icon fallback -->
      <Avatar variant="icon" size="sm" />

      <!-- interactive: opens profile menu -->
      <Avatar
        as="button"
        src="/users/antonio.png"
        alt="Antonio Delgado — open profile menu"
        aria-haspopup="true"
        aria-expanded="false"
      />
  - framework: vue
    code: |
      <template>
        <!-- image -->
        <Avatar src="/users/antonio.png" alt="Antonio Delgado" size="md" />

        <!-- initials fallback when src fails or is absent -->
        <Avatar :initials="userInitials" size="md" />

        <!-- interactive button trigger -->
        <Avatar
          as="button"
          :src="user.avatar"
          :alt="`${user.name} — open profile menu`"
          :aria-expanded="menuOpen"
          aria-haspopup="true"
          @click="toggleMenu"
        />
      </template>

      <script setup>
      import { ref, computed } from 'vue';
      import Avatar from '@zuga/ui/Avatar.vue';

      const props = defineProps(['user']);
      const menuOpen = ref(false);
      const userInitials = computed(() =>
        props.user.name.split(' ').map(n => n[0]).join('').slice(0, 2)
      );
      function toggleMenu() { menuOpen.value = !menuOpen.value; }
      </script>
  - framework: plain-html
    code: |
      <!-- static image: role=img is implicit on <img> -->
      <span class="avatar avatar--md">
        <img src="/users/antonio.png" alt="Antonio Delgado" class="avatar__image" />
      </span>

      <!-- initials fallback -->
      <span class="avatar avatar--md avatar--initials" aria-label="Antonio Delgado">
        <span aria-hidden="true">AD</span>
      </span>

      <!-- interactive: wraps in a <button> for keyboard + SR access -->
      <button type="button" class="avatar avatar--md avatar--interactive"
              aria-label="Antonio Delgado — open profile menu"
              aria-haspopup="true" aria-expanded="false">
        <img src="/users/antonio.png" alt="" aria-hidden="true" class="avatar__image" />
      </button>

      <!-- status dot (online) -->
      <span class="avatar avatar--md">
        <img src="/users/antonio.png" alt="Antonio Delgado" class="avatar__image" />
        <span class="avatar__status avatar__status--online" aria-hidden="true"></span>
      </span>
      <!-- convey status in SR-accessible text separately if needed -->
donts:
  - Do not use the avatar as the sole affordance for a dropdown trigger — add a visible caret or chevron; the avatar alone doesn't signal interactivity.
  - Do not display status dots without conveying status in accessible text on the parent element — color alone fails WCAG 1.4.1.
  - Do not render initials from raw display names without trimming — "  A  " produces wrong initials.
  - Do not hard-code size via inline style — use the size token variants so density overrides propagate.
tokens:
  - component.avatar.size-sm
  - component.avatar.size-md
  - component.avatar.size-lg
  - component.avatar.bg
  - component.avatar.fg
  - component.avatar.radius
  - component.avatar.border
---

# Avatar

## Anatomy

```
  ┌───────────────┐
  │  ┌─────────┐  │  ← border (2px, --surface-primary)
  │  │         │  │
  │  │  AD     │  │  ← fallback initials layer (or <img>, or icon)
  │  │         │  │
  │  └─────────┘  │  ← container (circular, --component-avatar-radius: full)
  └───────────────┘
              ●      ← status indicator dot (optional, positioned bottom-right)

  ┌ ─ ─ ─ ─ ─ ─ ─ ┐
  │  focus ring     │  ← visible when avatar is an interactive button
  └ ─ ─ ─ ─ ─ ─ ─ ┘
```

Each part:

- **Image container** — a fixed-size circle (`border-radius: full`). The `--component-avatar-size-*` tokens control diameter: sm=24px, md=32px, lg=48px. Contains the `<img>` when a photo is available.
- **Fallback initials layer** — rendered when `src` is absent or fails to load. Shows 1–2 uppercase characters in `--component-avatar-fg` (slate-900) against `--component-avatar-bg` (slate-100).
- **Status indicator dot** — optional 8–10px circle positioned at the bottom-right of the avatar container. Color conveys online/away/offline; must also be reflected in accessible text on the parent.
- **Focus ring** — appears when the avatar is used as a `<button>` trigger. 2px solid `--border-focus`, 2px offset, full-circle shape matching the avatar radius.

## Variants & Usage

**image** — Displays a user photo. The `src` prop provides the image URL; `alt` must be the person's name. Image loading failures should trigger automatic fallback to `initials` or `icon`.

**initials** — Rendered when no photo is available or when the photo fails to load. Extract 1–2 uppercase characters from the display name. Safe for all users; never blank.

**icon** — Falls back to a generic person icon when neither a photo nor a name is available. Used for system entities, bot accounts, or anonymous contexts.

## Accessibility

### Keyboard

- **Tab** — focuses the avatar only when it functions as an interactive button trigger (e.g., opens a profile menu). Static avatars are not in the tab order.
- **Enter / Space** — activates the button action when the avatar is a button trigger. Use `as="button"` or wrap in a `<button>` element.

### ARIA / Roles

Static avatars carry `role="img"` (implicit via `<img>`) with a descriptive `alt` text. The initials container should use `aria-label` on the outer element and `aria-hidden="true"` on the visible initials span to prevent double-reading. Interactive avatars must be `<button>` elements with `aria-label`, `aria-haspopup`, and `aria-expanded` attributes.

### Screen reader script

- **Static image:** "Antonio Delgado, image"
- **Initials fallback:** "Antonio Delgado, image" (via `aria-label` on container)
- **Interactive, menu closed:** "Antonio Delgado — open profile menu, button, collapsed"
- **Interactive, menu open:** "Antonio Delgado — open profile menu, button, expanded"

### Contrast verification

- **Initials:** `--component-avatar-fg` (slate-900, #0f172a) on `--component-avatar-bg` (slate-100, #f1f5f9) = **16.30:1** — AAA.
- **Status online dot** (green-700, #15803d) against white surface = **5.02:1** — clears AA.

### Focus behavior

Non-interactive avatars skip the tab sequence entirely. Interactive avatars use a full-circle 2px focus ring in `--border-focus` (cyan-500), triggered via `:focus-visible`. The ring wraps the full circle container, not just the interior image.

## Code

### Astro

```astro
---
import Avatar from '@zuga/ui/Avatar.astro';
---
<!-- static image -->
<Avatar src="/users/antonio.png" alt="Antonio Delgado" size="md" />

<!-- initials fallback -->
<Avatar initials="AD" size="lg" />

<!-- interactive button trigger -->
<Avatar
  as="button"
  src="/users/antonio.png"
  alt="Antonio Delgado — open profile menu"
  aria-haspopup="true"
  aria-expanded="false"
  onclick="toggleProfileMenu()"
/>
```

### Vue

```vue
<template>
  <Avatar src="/users/antonio.png" alt="Antonio Delgado" size="md" />
  <Avatar :initials="userInitials" size="md" />
  <Avatar
    as="button"
    :src="user.avatar"
    :alt="`${user.name} — open profile menu`"
    :aria-expanded="menuOpen"
    aria-haspopup="true"
    @click="toggleMenu"
  />
</template>

<script setup>
import { ref, computed } from 'vue';
import Avatar from '@zuga/ui/Avatar.vue';

const props = defineProps(['user']);
const menuOpen = ref(false);
const userInitials = computed(() =>
  props.user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
);
function toggleMenu() { menuOpen.value = !menuOpen.value; }
</script>
```

### Plain HTML

```html
<!-- static image -->
<span class="avatar avatar--md">
  <img src="/users/antonio.png" alt="Antonio Delgado" class="avatar__image" />
</span>

<!-- initials fallback -->
<span class="avatar avatar--md avatar--initials" aria-label="Antonio Delgado">
  <span aria-hidden="true">AD</span>
</span>

<!-- interactive button -->
<button type="button" class="avatar avatar--md avatar--interactive"
        aria-label="Antonio Delgado — open profile menu"
        aria-haspopup="true" aria-expanded="false">
  <img src="/users/antonio.png" alt="" aria-hidden="true" class="avatar__image" />
</button>
```

## Don'ts

| Don't | Why |
|---|---|
| Use avatar as the only affordance for a dropdown | No visible caret means users don't know it's interactive; fails discoverability. |
| Show status dots without accessible text | Color alone fails WCAG 1.4.1 (Use of Color). Put status in `aria-label` on the parent container. |
| Render initials from untrimmed names | Extra whitespace produces wrong characters or blank output. Always `.trim()` before extracting. |
| Hard-code size via `style` | Bypasses density token overrides; compact-mode studios need size to scale down. |

## Tokens reference

The component exposes these tokens (Tier 3, scoped):

- `--component-avatar-size-sm` — 24px diameter (small context: nav, comments)
- `--component-avatar-size-md` — 32px diameter (default)
- `--component-avatar-size-lg` — 48px diameter (profile headers)
- `--component-avatar-bg` — fallback initials background (`--surface-secondary`)
- `--component-avatar-fg` — fallback initials text (`--text-primary`)
- `--component-avatar-radius` — always `--radius-full` (circle); override for square avatars in specific studios
- `--component-avatar-border` — 2px border (`--surface-primary`) that separates avatar from any adjacent avatar in a stack

These compose from Tier 2 semantic tokens (which compose from Tier 1 primitives — see §4 + §5).
