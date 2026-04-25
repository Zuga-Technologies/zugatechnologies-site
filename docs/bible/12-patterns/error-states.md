---
name: Error States
summary: Consistent error presentation pattern for network failures, validation errors, and system faults.
components:
  - Toast
  - Input
  - Button
flow:
  - "Step 1: Catch error at boundary (network, validation, or system)"
  - "Step 2: Classify error severity (inline vs. page-level vs. critical)"
  - "Step 3: Display appropriate error UI (Input error variant, Toast, or full error page)"
  - "Step 4: Offer recovery action (retry Button or navigation link)"
a11y: Error messages must use role=alert for immediate announcement; inline errors linked via aria-describedby.
---

# Error States

*[full doc body — see plan Task 26]*
