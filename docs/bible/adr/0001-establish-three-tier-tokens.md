---
id: 1
title: Establish three-tier token architecture
date: "2026-04-25"
status: accepted
context: "Zuga has 14+ studios each wanting custom colors. Without structure, every studio would hard-code values, making global rebrand impossible."
decision: "Adopt a three-tier token system: Tier 1 primitives (raw values), Tier 2 semantics (role-mapped aliases), Tier 3 component tokens (component-scoped overrides). Studios may only override Tier 2 and Tier 3."
consequences: "All new tokens must be placed in the correct tier. Tier 1 values are frozen after Design Bible ratification. Lint rules enforce the constraint."
---

# ADR-0001: Establish three-tier token architecture

*[full prose — see plan Task 29]*
