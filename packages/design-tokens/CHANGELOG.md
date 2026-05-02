# @zuga-technologies/design-tokens — Changelog

## 1.0.0-rc.2 — 2026-05-02

ZugaApp product-shell visual identity + Windows-tile launcher pattern.

### Added

- **Tier 1 lime ramp** (`--color-lime-50` through `--color-lime-950`) — Tailwind v4 default ramp, marked `[MIKE-CHECKPOINT-product-acid-lime]`. The 100–135° hue band is unclaimed in the AI brand landscape; this ramp gives the product surface its distinct identity from sister-brand cyan.
- **`profiles/product-shell.css` overrides** — `--accent-brand` now resolves to `lime-400` (~10:1 on slate-950, AAA). `--accent-fg` is `slate-950` (dark text on the bright accent), the first profile to require dark-text-on-accent. Pending Mike's HITL review.
- **`components/tile.css`** (NEW Tier 3) — token declarations for the Windows-style "studio tile" pressable launcher pattern: aspect/icon/type sizing, the four-layer pressable shadow stack (base/hover/active states), film-grain noise opacity, hover lift translation, and motion tokens (overshoot easing for tile lift + icon micro-rotation). First consumer: ZugaApp's `StudioTile.vue` in DashboardView.
- **`reveal.css`** (NEW utility) — `[data-reveal]` scroll-reveal pattern with directional variants (`left`/`right`/`up`), uses existing motion-duration/easing tokens, fully reduced-motion-aware.
- **`scroll-reveal.js`** (NEW vanilla module) — companion IntersectionObserver setup for `[data-reveal]`, framework-agnostic, idempotent, observer disconnects per element after reveal. Falls back to immediate-visible under reduced-motion or no-IO environments.
- **`brand/zugabot-mark.svg`** (NEW) — canonical cyan mark moved into the package as the source of truth (was duplicated across `zugatechnologies-site/public/`, `Zugabot/frontend/public/`, `ZugaApp/frontend/public/` — those copies remain consumers).
- **`brand/zugabot-mark-product.svg`** (NEW) — acid-lime variant of the canonical mark, six accent paths swapped from `#67e8f9` to `#a3e635`. ZugaApp consumes this as the product-surface logo.
- **`profiles/studio-data.css`** (NEW) — ZugaData profile. Accent emerald-700 (analytical sibling of Trader's emerald-500). `consuming-repos.json` updated.
- **`profiles/studio-operator.css`** (NEW) — ZugaOperator profile. Accent slate-500 (system-neutral; observability chrome stays out of the way of cognitive-stream content). `consuming-repos.json` updated.
- **`profiles/studio-overseer.css`** (NEW) — ZugaOverseer profile. Accent slate-700 (admin-authoritative; deeper than Operator's -500 to signal the privilege gradient). `consuming-repos.json` updated.

### Pending

- Mike's HITL review for `[MIKE-CHECKPOINT-product-acid-lime]` — covers both the lime Tier 1 ramp addition and the product-shell accent override + dark-text-on-accent decision.
- Mike's review of the three new studio profile accent picks (Data=emerald-700, Operator=slate-500, Overseer=slate-700) — minimal new surface area, all use existing Tier 1 ramps, no new ramp additions required.

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
