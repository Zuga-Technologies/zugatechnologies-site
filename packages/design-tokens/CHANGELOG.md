# @zuga-technologies/design-tokens — Changelog

## 1.0.0-rc.1 — 2026-04-26

Initial release candidate. Phase 0 of the Zuga Technologies Design Bible.

### Added

- Tier 1 primitives: 13 color ramps, spacing scale, type scale, motion, radius, shadow, z-index, container, breakpoint
- Tier 2 semantic: surface, text, border, accent, feedback, density (light + dark mode)
- Tier 3 component CSS: 13 v1 primitives (button, input, select, checkbox, card, modal, toast, toolbar, nav, tabs, avatar, badge, skeleton)
- 21 sub-brand profiles (corp, product-shell, 14 studios, 5 standalones)
- `tokens-lint` CLI enforcing whitelist semantics — 0 violations across all 21 profiles
- `aggregate-mike-review` + `propagate-mike-approvals` Mike-review workflow
- `drift-detect` nightly cross-repo audit script
- 3 Architecture Decision Records (three-tier model, master cyan-700 for AA, markets emerald)

### Pending

- Mike's end-of-build review for 45 `[MIKE-CHECKPOINT-*]` markers (see `docs/MIKE-REVIEW.md`)
- Final 1.0.0 publishes after all checkpoints flip to `[MIKE-APPROVED-*]`
