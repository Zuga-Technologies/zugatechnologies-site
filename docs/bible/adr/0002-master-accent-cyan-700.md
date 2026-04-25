---
id: 2
title: Master accent uses cyan-700 for WCAG AA on white
date: "2026-04-25"
status: accepted
context: "Master accent originally defaulted to cyan-500 (#06b6d4). Contrast against white text falls below WCAG AA 4.5:1."
decision: "Use cyan-700 (#0e7490) as --accent-brand at Tier 2 for contrast compliance. cyan-500 stays in Tier 1 ramp for any non-fg use."
consequences: "All Zuga primary buttons render at cyan-700, not cyan-500. Contract still permits sub-brand profiles to override --accent-brand."
---

# ADR-0002: Master accent uses cyan-700 for WCAG AA on white

*[full prose — see plan Task 29]*
