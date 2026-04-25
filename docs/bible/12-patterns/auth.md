---
name: Auth
summary: Login and registration flow pattern used across all Zuga studios.
components:
  - Input
  - Button
  - Card
flow:
  - "Step 1: Render login form with email and password fields"
  - "Step 2: Validate inputs on submit"
  - "Step 3: Show loading state on Button during request"
  - "Step 4: On error, display inline error via Input error variant"
  - "Step 5: On success, redirect to dashboard"
a11y: Form fields must have explicit labels; error messages linked via aria-describedby.
---

# Auth

*[full doc body — see plan Task 26]*
