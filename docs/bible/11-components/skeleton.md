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
    - Not focusable — decorative loading state
  ariaRoles:
    - progressbar
  contrastNotes: Skeleton shimmer contrast is decorative; ensure surrounding context provides loading state text.
  focusBehavior: No focus behavior; aria-busy=true set on the containing region during loading.
examples:
  - framework: astro
    code: "<Skeleton variant='text' width='80%' />"
donts:
  - Do not use skeletons for actions — only for content placeholders.
  - Do not animate skeletons when prefers-reduced-motion is set.
tokens:
  - component.skeleton.bg
  - component.skeleton.shimmer-start
  - component.skeleton.shimmer-end
  - component.skeleton.radius
---

# Skeleton

*[full doc body — see plan Task 25]*
