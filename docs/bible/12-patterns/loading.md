---
name: Loading
summary: Progressive loading pattern using skeletons and spinners to minimize perceived latency.
components:
  - Skeleton
  - Button
flow:
  - "Step 1: Immediately render Skeleton placeholders matching expected content layout"
  - "Step 2: Fetch data in background"
  - "Step 3: Replace Skeleton with real content on data resolve"
  - "Step 4: On fetch error, replace Skeleton with error state"
a11y: Container region must set aria-busy=true during load and aria-busy=false when content resolves.
---

# Loading

*[full doc body — see plan Task 26]*
