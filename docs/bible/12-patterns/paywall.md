---
name: Paywall
summary: Gating pattern that presents upgrade prompts when a user reaches a feature or usage limit.
components:
  - Modal
  - Button
  - Card
  - Badge
flow:
  - "Step 1: Detect limit reached or premium feature access attempt"
  - "Step 2: Render paywall Modal or inline Card with plan comparison"
  - "Step 3: Highlight recommended plan with Badge"
  - "Step 4: CTA Button routes to Stripe checkout"
  - "Step 5: On success, dismiss paywall and unlock feature"
a11y: Paywall modal must trap focus; plan comparison table requires proper thead/th markup for screen readers.
---

# Paywall

*[full doc body — see plan Task 26]*
