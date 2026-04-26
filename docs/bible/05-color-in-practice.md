---
section: 5
title: Color in Practice
summary: Tier 2 semantic mappings, accent assignments, contrast tables, do/don't.
mikeCheckpoint: true
---

# 5. Color in Practice

> Authored: 2026-04-25
> Mike checkpoints: h01–h09 (hue confirm), acc01–acc21 (studio accent confirm)

Tier 2 semantic tokens map raw ramp stops to meaning. Sub-brand profiles override `--accent-*` and `--density-*` only — everything else inherits from the master token layer. All hue-confirm and accent-confirm decisions are tagged for Mike review below.

---

## 5.1 Master accent hue

The master Zuga accent hue is [MIKE-CHECKPOINT-h01].

> **🛑 MIKE-CHECKPOINT-h01** — confirm master accent hue
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `#06b6d4` (cyan-500) as the brand-identity reference stop. The semantic token `--accent-brand` uses cyan-700 (`#0e7490`) for WCAG AA compliance on white surfaces; cyan-500 is the visual identity reference used in wordmarks and marketing on dark canvases. The hue family — cyan — is the master brand accent for all surfaces that do not earn a sub-brand override. |
> | Alternates considered | `#0891b2` (cyan-600) — rejected: too somber; loses energy at small sizes and in pill-shaped elements. `#22d3ee` (cyan-400) — rejected: fails AA on white, reads as juvenile against slate neutrals. `#3b82f6` (blue-500) — rejected: maps to ZugaCode convention; using it for master brand creates collision with studio identity. |
> | Renders on | Corp landing CTAs, ZugaApp primary buttons, ZugaApp navbar active states, focus rings system-wide, ZugaThemes accent pills, master wordmark on dark surfaces |
>
> ✅ Approve → flip to `[MIKE-APPROVED-h01: YYYY-MM-DD] hex=#06b6d4`
> ✏️ Modify  → edit "Antonio's draft" field

---

## 5.2 Wellness family — mint hue confirm

The wellness family accent hue is [MIKE-CHECKPOINT-h02].

> **🛑 MIKE-CHECKPOINT-h02** — confirm wellness family accent hue (mint)
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `#14b8a6` (mint-500) as the reference stop for ZugaLife and ZugaHealth. Semantic `--accent-brand` in wellness profiles uses mint-700 (`#0f766e`) for AA on white. Mint reads as health, calm, and organic renewal — distinct from cyan (brand) and green (success signal). ZugaHealth shares this hue as a sibling to ZugaLife under the wellness family convention. |
> | Alternates considered | `#22c55e` (green-500) — rejected: green is reserved for `--feedback-success`; using it for wellness accent creates signal collision. `#06b6d4` (cyan, master) — rejected: wellness studios earn a category override precisely because health is a distinct product category; defaulting to master cyan loses studio identity. |
> | Renders on | ZugaLife habit cards, streak indicators, goal progress bars, ZugaHealth metric displays, wellness onboarding UI |
>
> ✅ Approve → flip to `[MIKE-APPROVED-h02: YYYY-MM-DD] hex=#14b8a6`
> ✏️ Modify  → edit "Antonio's draft" field

---

## 5.3 Creative family — violet hue confirm

The creative family accent hue is [MIKE-CHECKPOINT-h03].

> **🛑 MIKE-CHECKPOINT-h03** — confirm creative family accent hue (violet)
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `#8b5cf6` (violet-500) as the reference stop for ZugaImage, ZugaVideo, and ZugaMotion. Semantic `--accent-brand` in creative profiles uses violet-700 (`#6d28d9`) for AA on white. Violet reads as visual production, imagination, and creative tooling without the "corporate tech" read of blue. All three creative studios share this hue because their function is unified: media creation and manipulation. |
> | Alternates considered | `#a855f7` (Tailwind purple-500) — not in the token inventory; violet covers the same perceptual range without introducing a 14th ramp. `#ec4899` (pink) — rejected: too fashion-forward, clashes with ZugaAudio's magenta when the two studios appear together on the same surface. |
> | Renders on | ZugaImage gallery headers, video generation controls in ZugaVideo, motion timeline in ZugaMotion, creative studio nav indicators |
>
> ✅ Approve → flip to `[MIKE-APPROVED-h03: YYYY-MM-DD] hex=#8b5cf6`
> ✏️ Modify  → edit "Antonio's draft" field

---

## 5.4 ZugaCode — blue hue confirm

The ZugaCode accent hue is [MIKE-CHECKPOINT-h04].

> **🛑 MIKE-CHECKPOINT-h04** — confirm ZugaCode accent hue (blue)
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `#3b82f6` (blue-500) as the reference stop for ZugaCode. Semantic `--accent-brand` in the ZugaCode profile uses blue-700 (`#1d4ed8`) for AA on white. Blue is the canonical developer-tools convention — VS Code, GitHub, GitLab all operate in this range. Leaning into convention lowers cognitive load for the developer-audience ZugaCode targets. |
> | Alternates considered | `#0ea5e9` (sky-500) — rejected: sky is reserved for ZugaCloud; using it for ZugaCode merges two conceptually distinct studios in the user's eye. `#6366f1` (indigo-500) — rejected: indigo is ZugaLearn; education and code-tooling are separate categories. |
> | Renders on | ZugaCode activity feed, diff viewer, commit panel, hook status indicators, code review queue headers |
>
> ✅ Approve → flip to `[MIKE-APPROVED-h04: YYYY-MM-DD] hex=#3b82f6`
> ✏️ Modify  → edit "Antonio's draft" field

---

## 5.5 ZugaCloud — sky hue confirm

The ZugaCloud accent hue is [MIKE-CHECKPOINT-h05].

> **🛑 MIKE-CHECKPOINT-h05** — confirm ZugaCloud accent hue (sky)
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `#0ea5e9` (sky-500) as the reference stop for ZugaCloud. Semantic `--accent-brand` in the ZugaCloud profile uses sky-700 (`#0369a1`) for AA on white. Sky is lighter and airier than blue — it reads "cloud, infrastructure, distributed" rather than "IDE, terminal, code." The perceptual distance from blue-500 is enough to distinguish siblings in the nav at a glance. |
> | Alternates considered | `#06b6d4` (cyan, master) — rejected: ZugaCloud would be visually indistinguishable from the master brand, losing studio identity in mixed navigation. `#3b82f6` (blue, ZugaCode) — rejected: both studios would appear identical; cloud and code are different product categories. |
> | Renders on | ZugaCloud storage indicators, sync-status chips, infrastructure health panels, ZugaCloud nav active state |
>
> ✅ Approve → flip to `[MIKE-APPROVED-h05: YYYY-MM-DD] hex=#0ea5e9`
> ✏️ Modify  → edit "Antonio's draft" field

---

## 5.6 ZugaAudio — magenta hue confirm

The ZugaAudio accent hue is [MIKE-CHECKPOINT-h06].

> **🛑 MIKE-CHECKPOINT-h06** — confirm ZugaAudio accent hue (magenta)
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `#d946ef` (magenta-500, sourced from Tailwind fuchsia) as the reference stop for ZugaAudio. Semantic `--accent-brand` in the ZugaAudio profile uses magenta-700 (`#a21caf`) for AA on white. Magenta is the standard music and audio production convention — Ableton, Spotify Wrapped, SoundCloud all operate in the pink/magenta spectrum. It pops against dark studio surfaces where audio waveforms and mixing UI live. |
> | Alternates considered | `#ec4899` (Tailwind pink-500) — not in the token inventory; magenta covers the same perceptual territory. `#8b5cf6` (violet) — rejected: violet is the creative family (video/image/motion); audio is a separate discipline that deserves its own signal color. |
> | Renders on | ZugaAudio waveform highlights, track level indicators, audio studio nav active state, recording session status badges |
>
> ✅ Approve → flip to `[MIKE-APPROVED-h06: YYYY-MM-DD] hex=#d946ef`
> ✏️ Modify  → edit "Antonio's draft" field

---

## 5.7 ZugaForge — orange hue confirm

The ZugaForge accent hue is [MIKE-CHECKPOINT-h07].

> **🛑 MIKE-CHECKPOINT-h07** — confirm ZugaForge accent hue (orange)
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `#f97316` (orange-500) as the reference stop for ZugaForge. Semantic `--accent-brand` in the ZugaForge profile uses orange-700 (`#c2410c`) for AA on white. Orange conveys build heat, fabrication energy, and creation momentum — appropriate for a forge/creation registry studio. It also aligns with the "build" tool convention (Buildkite, Netlify deploy indicators). |
> | Alternates considered | `#f59e0b` (amber-500) — rejected: amber is `--feedback-warn`; sharing the hue with warning states would make ZugaForge UI feel like something is wrong. `#ef4444` (red-500) — rejected: red is `--feedback-danger` and ZugaShield; two studios on red creates collision. |
> | Renders on | ZugaForge creation registry items, build-pipeline progress indicators, forge studio nav active state, creation-run status badges |
>
> ✅ Approve → flip to `[MIKE-APPROVED-h07: YYYY-MM-DD] hex=#f97316`
> ✏️ Modify  → edit "Antonio's draft" field

---

## 5.8 ZugaLearn — indigo hue confirm

The ZugaLearn accent hue is [MIKE-CHECKPOINT-h08].

> **🛑 MIKE-CHECKPOINT-h08** — confirm ZugaLearn accent hue (indigo)
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `#6366f1` (indigo-500) as the reference stop for ZugaLearn. Semantic `--accent-brand` in the ZugaLearn profile uses indigo-700 (`#4338ca`) for AA on white. Indigo reads as education, depth, and academic gravity — the scholarly end of the blue spectrum. It sits between blue (ZugaCode) and violet (creative family) perceptually, creating a coherent nav spectrum without collision. |
> | Alternates considered | `#3b82f6` (blue, ZugaCode) — rejected: learning and coding are separate activities in the product; conflating their studio colors undermines the distinction. `#8b5cf6` (violet, creative family) — rejected: violet is reserved for media-creation tools; education is a different product category. |
> | Renders on | ZugaLearn course progress bars, lesson completion badges, curriculum nav active state, quiz result displays |
>
> ✅ Approve → flip to `[MIKE-APPROVED-h08: YYYY-MM-DD] hex=#6366f1`
> ✏️ Modify  → edit "Antonio's draft" field

---

## 5.9 Markets family — emerald hue confirm

The markets family accent hue is [MIKE-CHECKPOINT-h09].

> **🛑 MIKE-CHECKPOINT-h09** — confirm markets family accent hue (emerald)
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `#10b981` (emerald-500) as the reference stop for ZugaTrader and ZugaTraderOverlay. Semantic `--accent-brand` in the markets profile uses emerald-700 (`#047857`) for AA on white. Emerald reads as "money and markets" — distinct from green-500 (which is `--feedback-success`). Bloomberg terminals, trading platforms, and financial dashboards universally operate in this green-to-emerald range. ZugaTraderOverlay inherits this as a sibling because it surfaces the same data in-game. |
> | Alternates considered | `#22c55e` (green-500) — rejected: green-500 is `--feedback-success`; markets accent on the same stop causes the entire ZugaTrader UI to read as a permanent success state. `#06b6d4` (cyan, master) — rejected: markets is a high-conviction category that earns its own override; defaulting to master cyan loses the financial-platform signal. |
> | Renders on | ZugaTrader P&L indicators, position cards, watchlist rows, order execution buttons, ZugaTraderOverlay ticker displays |
>
> ✅ Approve → flip to `[MIKE-APPROVED-h09: YYYY-MM-DD] hex=#10b981`
> ✏️ Modify  → edit "Antonio's draft" field

---

## 5.10 Sub-brand accent assignments

The table below maps every consumer, product surface, and internal tool to its accent ramp. Family logic: wellness siblings share mint; creative siblings share violet; markets siblings share emerald. Surfaces that do not earn a category convention default to master cyan. All rows are tagged for Mike confirmation.

### acc01 — zugatechnologies-site (corp)

The zugatechnologies.com corporate site accent assignment is [MIKE-CHECKPOINT-acc01].

> **🛑 MIKE-CHECKPOINT-acc01** — confirm corporate site accent assignment
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `cyan.*` (master). The corporate landing page is brand identity, not a studio. It does not represent a product category, so it does not earn a category override. Master cyan is correct — it IS the brand. |
> | Alternates considered | Own distinct hue — rejected: the corporate site is the brand home; it should be the fullest expression of master cyan, not a sub-brand variant. `#0891b2` (cyan-600) as a "more serious corporate" choice — rejected: the semantic `--accent-brand` already uses cyan-700 for AA compliance; the system handles the stop adjustment. |
> | Renders on | zugatechnologies.com CTAs, nav active states, hover states, link color |
>
> ✅ Approve → flip to `[MIKE-APPROVED-acc01: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

### acc02 — ZugaApp/frontend shell (product-shell)

The ZugaApp product shell accent assignment is [MIKE-CHECKPOINT-acc02].

> **🛑 MIKE-CHECKPOINT-acc02** — confirm ZugaApp shell accent assignment
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `cyan.*` (master). The ZugaApp shell is the food court — the host surface that aggregates all studios. Its accent should read as "home base," which is master cyan. Studio-specific accents appear inside each studio's context; the shell frame stays on brand. |
> | Alternates considered | Own distinct hue to differentiate "product" from "corp" — rejected: the shell and the corp site are different surfaces but the same brand; splitting them creates inconsistency at the identity level. Studio-rotating accent (changes based on which studio is active) — rejected: introduces unpredictable chrome shifts that confuse spatial navigation. |
> | Renders on | ZugaApp global nav active states, sidebar indicators, primary action buttons in the shell layer, ZugaApp token wallet display |
>
> ✅ Approve → flip to `[MIKE-APPROVED-acc02: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

### acc03 — ZugaLife (studio-life)

The ZugaLife accent assignment is [MIKE-CHECKPOINT-acc03].

> **🛑 MIKE-CHECKPOINT-acc03** — confirm ZugaLife accent assignment
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `mint.*` (mint-500 reference, mint-700 semantic stop). ZugaLife is the wellness studio — habit tracking, meditation, addiction recovery. Mint reads as health, calm, and organic renewal. The wellness category earns an override because it is perceptually and emotionally distinct from the tech-forward master cyan. |
> | Alternates considered | Master cyan — rejected: wellness surfaces should feel softer and more biologically grounded than the sharp electric of brand cyan; the category earns the distinction. Green-500 — rejected: green is `--feedback-success`, not a studio accent; signal collision would make all ZugaLife UI feel like a constant success state. |
> | Renders on | ZugaLife habit cards, streak fire indicators, goal rings, meditation session UI, addiction tracker progress |
>
> ✅ Approve → flip to `[MIKE-APPROVED-acc03: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

### acc04 — ZugaHealth (studio-health)

The ZugaHealth accent assignment is [MIKE-CHECKPOINT-acc04].

> **🛑 MIKE-CHECKPOINT-acc04** — confirm ZugaHealth accent assignment
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `mint.*` (sibling to ZugaLife, same stop references). ZugaHealth is the clinical/biometric sibling — Fitbit sync, health metrics, body data. It shares mint because both studios are in the wellness family; a user moving between them should not experience a color jump. Same hue, same semantic stops as acc03. |
> | Alternates considered | Distinct wellness-adjacent hue — rejected: we defined the wellness family to mean exactly this: siblings share a hue. Splitting ZugaHealth to a different color breaks the family grouping that makes the product map navigable. Master cyan — rejected: same rationale as acc03 above. |
> | Renders on | ZugaHealth metric charts, Fitbit sync status, heart rate displays, health dashboard nav active state |
>
> ✅ Approve → flip to `[MIKE-APPROVED-acc04: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

### acc05 — ZugaTrader (studio-trader)

The ZugaTrader accent assignment is [MIKE-CHECKPOINT-acc05].

> **🛑 MIKE-CHECKPOINT-acc05** — confirm ZugaTrader accent assignment
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `emerald.*` (emerald-500 reference, emerald-700 semantic stop). ZugaTrader is the markets/financial studio. Emerald is the financial-platform convention; it signals money and markets without confusing with `--feedback-success` (green). The markets category earns an override because financial data visualization lives in a different emotional register than the brand. |
> | Alternates considered | Master cyan — rejected: the markets override is high-conviction; cyan reads as "tech brand," not "financial terminal." Green-500 — rejected: same feedback-collision problem as described in h09 above. |
> | Renders on | ZugaTrader P&L rows, position cards, order execution primary button, watchlist active indicators, TA signal badges |
>
> ✅ Approve → flip to `[MIKE-APPROVED-acc05: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

### acc06 — ZugaImage (studio-image)

The ZugaImage accent assignment is [MIKE-CHECKPOINT-acc06].

> **🛑 MIKE-CHECKPOINT-acc06** — confirm ZugaImage accent assignment
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `violet.*` (violet-500 reference, violet-700 semantic stop). ZugaImage is an AI image-generation and editing studio. Violet reads as creativity and visual imagination. It leads the creative family — ZugaVideo and ZugaMotion are siblings under violet. |
> | Alternates considered | Master cyan — rejected: creative studios earn an override; cyan is brand identity, not creative-tools identity. Magenta — rejected: magenta is ZugaAudio's signal; image and audio are distinct creative disciplines that need distinct signals. |
> | Renders on | ZugaImage gallery headers, generation prompt controls, image editing toolbar, composable slot indicators |
>
> ✅ Approve → flip to `[MIKE-APPROVED-acc06: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

### acc07 — ZugaVideo (studio-video)

The ZugaVideo accent assignment is [MIKE-CHECKPOINT-acc07].

> **🛑 MIKE-CHECKPOINT-acc07** — confirm ZugaVideo accent assignment
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `violet.*` (sibling to ZugaImage, same stop references). ZugaVideo is the video generation and wallpaper studio. It shares violet because it is in the creative family — a user who sees violet in ZugaImage will immediately recognize the creative family context in ZugaVideo. |
> | Alternates considered | Distinct creative-adjacent hue per studio — rejected: the creative family is defined to have a shared hue; per-studio splits would make the color system feel arbitrary rather than principled. Master cyan — rejected: creative studios earn the override. |
> | Renders on | ZugaVideo provider cards, video generation controls, wallpaper template browser, video pipeline status |
>
> ✅ Approve → flip to `[MIKE-APPROVED-acc07: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

### acc08 — ZugaMotion (studio-motion)

The ZugaMotion accent assignment is [MIKE-CHECKPOINT-acc08].

> **🛑 MIKE-CHECKPOINT-acc08** — confirm ZugaMotion accent assignment
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `violet.*` (sibling to ZugaImage and ZugaVideo, same stop references). ZugaMotion handles animation and motion design. It completes the creative family triad under violet. Same rationale as acc07 — the family grouping creates navigable product cohesion. |
> | Alternates considered | Distinct hue for motion — rejected: we have three creative siblings (image, video, motion) and three is exactly the right number to justify a named family with a shared hue. Fragmenting to individual hues removes the family signal. |
> | Renders on | ZugaMotion animation timeline, keyframe editor, preview panel controls, motion studio nav active state |
>
> ✅ Approve → flip to `[MIKE-APPROVED-acc08: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

### acc09 — ZugaCode (studio-code)

The ZugaCode accent assignment is [MIKE-CHECKPOINT-acc09].

> **🛑 MIKE-CHECKPOINT-acc09** — confirm ZugaCode accent assignment
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `blue.*` (blue-500 reference, blue-700 semantic stop). ZugaCode is the developer-tools studio — activity tracking, commit hooks, code review queue. Blue is the canonical dev-tools convention; leaning into it reduces cognitive load for the developer audience and signals "this is where code happens." |
> | Alternates considered | Master cyan — rejected: the dev-tools convention is blue; using cyan here would mean ZugaCode looks like a generic Zuga surface rather than a purpose-built code studio. Indigo — rejected: indigo is ZugaLearn; code and education are distinct. |
> | Renders on | ZugaCode activity feed, diff viewer chrome, commit panel status, hook failure notifications, review queue badges |
>
> ✅ Approve → flip to `[MIKE-APPROVED-acc09: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

### acc10 — ZugaCloud (studio-cloud)

The ZugaCloud accent assignment is [MIKE-CHECKPOINT-acc10].

> **🛑 MIKE-CHECKPOINT-acc10** — confirm ZugaCloud accent assignment
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `sky.*` (sky-500 reference, sky-700 semantic stop). ZugaCloud is the file storage and sync studio. Sky reads as "infrastructure and distributed systems" — lighter and more expansive than the IDE-register of blue. The sky/blue sibling pair mirrors the cloud/code conceptual pair in the product. |
> | Alternates considered | Blue — rejected: ZugaCloud and ZugaCode would be visually indistinguishable; cloud infrastructure and code tooling are different product categories. Master cyan — rejected: sky earns the override because cloud is a distinct category with an established color convention. |
> | Renders on | ZugaCloud storage bars, sync-status chips, infrastructure health panels, cloud nav active state |
>
> ✅ Approve → flip to `[MIKE-APPROVED-acc10: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

### acc11 — ZugaAudio (studio-audio)

The ZugaAudio accent assignment is [MIKE-CHECKPOINT-acc11].

> **🛑 MIKE-CHECKPOINT-acc11** — confirm ZugaAudio accent assignment
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `magenta.*` (magenta-500 reference, magenta-700 semantic stop). ZugaAudio is the music and audio production studio. Magenta is the music convention — waveform editors and production tools from Ableton to SoundCloud operate in the pink/magenta range. It pops against dark studio surfaces where audio visualization lives. |
> | Alternates considered | Violet — rejected: violet is the creative family (visual media); audio is a distinct discipline with its own established color convention. Master cyan — rejected: audio earns the override; the music convention is magenta, not cyan. |
> | Renders on | ZugaAudio waveform highlights, track level indicators, studio recording session status, audio nav active state |
>
> ✅ Approve → flip to `[MIKE-APPROVED-acc11: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

### acc12 — ZugaForge (studio-forge)

The ZugaForge accent assignment is [MIKE-CHECKPOINT-acc12].

> **🛑 MIKE-CHECKPOINT-acc12** — confirm ZugaForge accent assignment
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `orange.*` (orange-500 reference, orange-700 semantic stop). ZugaForge is the creation registry and build-pipeline studio. Orange conveys build heat and fabrication energy — the color of molten metal and combustion, which is exactly the metaphor. Build tools (Buildkite, deploy pipelines) use orange and amber as their primary signal color. |
> | Alternates considered | Amber — rejected: amber is `--feedback-warn`; the entire ZugaForge UI would read as a permanent warning state. Red — rejected: red is `--feedback-danger` and ZugaShield; two studios on red collapses the signal. |
> | Renders on | ZugaForge creation registry item cards, build-run progress indicators, forge pipeline status badges, forge nav active state |
>
> ✅ Approve → flip to `[MIKE-APPROVED-acc12: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

### acc13 — ZugaThemes (studio-themes)

The ZugaThemes accent assignment is [MIKE-CHECKPOINT-acc13].

> **🛑 MIKE-CHECKPOINT-acc13** — confirm ZugaThemes accent assignment
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `cyan.*` (master). ZugaThemes is the design-token marketplace — it sells visual customization to other studios. Its own UI should be on master cyan to signal "this is a ZugaApp-layer product, not a studio with its own personality." Theming other studios is its function; it should not impose its own color identity. |
> | Alternates considered | Own distinct hue (e.g., coral or gold) — rejected: ZugaThemes does not have a product category convention; it is a marketplace layer that does not earn an override. Rotating to reflect the active theme for sale — rejected: the chrome of the marketplace should be stable; previewed themes render in contained preview slots, not in the chrome. |
> | Renders on | ZugaThemes marketplace shell, theme card accent pills, purchase CTA buttons, marketplace nav active state |
>
> ✅ Approve → flip to `[MIKE-APPROVED-acc13: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

### acc14 — ZugaLearn (studio-learn)

The ZugaLearn accent assignment is [MIKE-CHECKPOINT-acc14].

> **🛑 MIKE-CHECKPOINT-acc14** — confirm ZugaLearn accent assignment
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `indigo.*` (indigo-500 reference, indigo-700 semantic stop). ZugaLearn is the education and curriculum studio. Indigo reads as academic depth and intellectual gravity — the scholarly end of the blue spectrum. It is perceptually distinct from ZugaCode (blue) and ZugaCloud (sky), creating a coherent blue-family spectrum across three related but different studios. |
> | Alternates considered | Blue — rejected: blue is ZugaCode; learning and coding are distinct product experiences. Violet — rejected: violet is the creative family; education is not creative-media production. |
> | Renders on | ZugaLearn course progress bars, lesson completion badges, quiz result displays, curriculum nav active state |
>
> ✅ Approve → flip to `[MIKE-APPROVED-acc14: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

### acc15 — ZugaCraft (studio-craft)

The ZugaCraft accent assignment is [MIKE-CHECKPOINT-acc15].

> **🛑 MIKE-CHECKPOINT-acc15** — confirm ZugaCraft accent assignment
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `cyan.*` (master) — pending Antonio personality input before Phase 0 seal. ZugaCraft's product category is not yet defined precisely enough to earn a category-convention override. Master cyan is the correct default under spec rule: "defaults to master per spec rule." If Antonio identifies a clear product category for ZugaCraft (e.g., handmade goods marketplace, crafting game overlay) before Phase 0 closes, this checkpoint should be revisited and may earn its own hue. |
> | Alternates considered | Own distinct hue — rejected at this time: ZugaCraft does not yet have a defined product category strong enough to justify pulling a new convention from thin air; conventions are earned by product identity, not invented. Violet (creative family) — considered: if ZugaCraft ends up being a digital-creation tool, violet is a candidate; Antonio to confirm. |
> | Renders on | ZugaCraft studio UI — TBD pending product definition; assumes standard master-cyan chrome until category is specified |
>
> ✅ Approve → flip to `[MIKE-APPROVED-acc15: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

### acc16 — ZugaNews (studio-news)

The ZugaNews accent assignment is [MIKE-CHECKPOINT-acc16].

> **🛑 MIKE-CHECKPOINT-acc16** — confirm ZugaNews accent assignment
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `cyan.*` (master). ZugaNews is the news and intelligence studio. Journalism and news platforms historically use neutral color systems — black, white, and a single accent; the accent is rarely a "hot" color. Master cyan is the appropriate default because it reads as informational and credible without the emotional charge of amber (warn) or red (danger). ZugaNews does not have a proprietary product-category convention. |
> | Alternates considered | Own distinct hue — rejected: news/journalism does not have a universal studio-accent convention strong enough to override; defaulting to master keeps the brand coherent without an arbitrary color decision. Slate-900 (near-black, very journalistic) — rejected: the design system does not support monochrome studio identities; the neutral-slate story is handled by the surface system. |
> | Renders on | ZugaNews article headers, source badges, intelligence summary cards, news nav active state |
>
> ✅ Approve → flip to `[MIKE-APPROVED-acc16: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

### acc17 — ZugaGamerOverlay (overlay-gamer)

The ZugaGamerOverlay accent assignment is [MIKE-CHECKPOINT-acc17].

> **🛑 MIKE-CHECKPOINT-acc17** — confirm ZugaGamerOverlay accent assignment
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `cyan.*` (master). The gaming overlay is a neutral surface — it surfaces data and voice commands, but does not advocate for a game genre or platform color convention. Cyan on dark overlay backgrounds gives a clean "HUD" read without the aggression of red/orange overlays that feel like threat indicators. Gaming HUDs commonly use cyan/blue as neutral data-display colors. |
> | Alternates considered | Aggressive gaming palette (neon green or hot red) — rejected: neon green reads as "RGB gaming peripheral" not "intelligent assistant overlay"; hot red conflicts with danger/threat signals in games. Master cyan is the neutral choice here, and neutral is right for an information-display layer. |
> | Renders on | ZugaGamerOverlay HUD panel borders, wake-word indicator, TTS display, stat readouts, dismiss controls |
>
> ✅ Approve → flip to `[MIKE-APPROVED-acc17: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

### acc18 — ZugaTraderOverlay (overlay-trader)

The ZugaTraderOverlay accent assignment is [MIKE-CHECKPOINT-acc18].

> **🛑 MIKE-CHECKPOINT-acc18** — confirm ZugaTraderOverlay accent assignment
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `emerald.*` (sibling to ZugaTrader, same stop references). ZugaTraderOverlay is a game-overlay surface for ZugaTrader data — it shows the same financial data in a HUD format while gaming. It should be immediately recognizable as "ZugaTrader data" from the accent color alone. Matching ZugaTrader's emerald achieves this without extra visual vocabulary. |
> | Alternates considered | Master cyan (neutral overlay convention from acc17) — rejected: ZugaTraderOverlay is not a neutral tool; it is specifically a financial data display, and the emerald markets accent is load-bearing for that association. Own distinct hue — rejected: the overlay and its parent studio should share an accent; introducing a third color splits the product identity. |
> | Renders on | ZugaTraderOverlay position cards, P&L ticker, order status chips, financial HUD panel chrome |
>
> ✅ Approve → flip to `[MIKE-APPROVED-acc18: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

### acc19 — ZugaShield (studio-shield)

The ZugaShield accent assignment is [MIKE-CHECKPOINT-acc19].

> **🛑 MIKE-CHECKPOINT-acc19** — confirm ZugaShield accent assignment
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `red.*` (red-500 reference, red-700 semantic stop for interactive elements). ZugaShield is the security studio — threat detection, account monitoring, shield events. Red is the universal security-signal color. It carries the same weight as `--feedback-danger` intentionally: security alerts ARE danger states. The studio UI should feel like a monitoring dashboard that takes its work seriously. |
> | Alternates considered | A "softer" security color (slate, indigo) — rejected: security needs to read as "this matters" at a glance; a neutral or educational hue removes that urgency. Master cyan — rejected: ZugaShield earning the danger-signal red is the correct override; cyan here would make security surface feel like a generic Zuga tool. |
> | Renders on | ZugaShield threat alerts, shield event severity badges, account health indicators, security nav active state |
>
> ✅ Approve → flip to `[MIKE-APPROVED-acc19: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

### acc20 — ZugaClaw (internal-claw)

The ZugaClaw accent assignment is [MIKE-CHECKPOINT-acc20].

> **🛑 MIKE-CHECKPOINT-acc20** — confirm ZugaClaw accent assignment
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `cyan.*` (master). ZugaClaw is an internal infrastructure tool — the third-party AI provider bridge layer. Internal tooling defaults to master cyan for cohesion; it does not have a user-facing product identity that would earn a category override. Engineers using ZugaClaw are Zuga engineers; the product context is "Zuga infrastructure" not a distinct studio. |
> | Alternates considered | Own distinct hue to signal "internal / restricted" — rejected: creating a special color for internal tools adds a new semantic layer that does not exist in the token system; internal vs external is handled by access control, not color. Master cyan affirms that internal tools belong to the same design system. |
> | Renders on | ZugaClaw internal admin UI elements (if any surface-level UI exists), internal tooling chrome |
>
> ✅ Approve → flip to `[MIKE-APPROVED-acc20: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

### acc21 — BugaBot (internal-bugabot)

The BugaBot internal tooling accent assignment is [MIKE-CHECKPOINT-acc21].

> **🛑 MIKE-CHECKPOINT-acc21** — confirm BugaBot accent assignment
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `cyan.*` (master). BugaBot is internal tooling — Antonio's personal automation and development assistant layer. Like ZugaClaw (acc20), internal tooling defaults to master cyan. BugaBot has no user-facing product surface; the accent appears only in internal dashboards and developer tooling. Cohesion with the master brand is the right call for tools with no external audience. |
> | Alternates considered | Own distinct hue to differentiate "developer persona" from product brand — rejected: the developer persona already has a dedicated hue (blue, ZugaCode); using blue for BugaBot would conflate internal automation with the ZugaCode studio product. Master cyan keeps internal tools clearly in the Zuga system without studio collision. |
> | Renders on | BugaBot internal admin surfaces, developer tooling UI if rendered, internal status dashboards |
>
> ✅ Approve → flip to `[MIKE-APPROVED-acc21: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field

---

## 5.11 Contrast tables

All ratios below are measured using the WCAG 2.1 relative-luminance formula. Ratios are stated as measured values, not thresholds. AA normal text requires 4.5:1; AA large text / UI components require 3:1; AAA normal text requires 7:1.

### Light-mode — key pairings

| Foreground | Background | Measured ratio | Clears |
|---|---|---|---|
| `--text-primary` slate-900 `#0f172a` | `--surface-primary` white `#ffffff` | ≈17.85:1 | AAA |
| `--text-primary` slate-900 `#0f172a` | `--surface-canvas` slate-50 `#f8fafc` | ≈16.75:1 | AAA |
| `--text-secondary` slate-700 `#334155` | `--surface-primary` white `#ffffff` | ≈10.65:1 | AAA |
| `--text-link` cyan-700 `#0e7490` | `--surface-primary` white `#ffffff` | ≈5.74:1 | AA |
| `--accent-brand` cyan-700 `#0e7490` | white `#ffffff` (button fg) | ≈5.74:1 | AA |
| `--accent-fg` white `#ffffff` | `--accent-brand` cyan-700 `#0e7490` (button bg) | ≈5.74:1 | AA |
| `--feedback-success` green-700 `#15803d` | white `#ffffff` | ≈5.93:1 | AA |
| `--feedback-warn` amber-600 `#d97706` | `--surface-primary` white `#ffffff` | ≈3.12:1 | AA large/UI only — warn text uses `--text-primary` (slate-900) as fg, not white |
| `--feedback-danger` red-600 `#dc2626` | white `#ffffff` | ≈5.25:1 | AA |

**Known failure:** cyan-500 (`#06b6d4`) against white (`#ffffff`) ≈ 2.43:1 — fails AA for all text sizes. Cyan-500 is a brand reference stop, not a text color. It appears on dark surfaces (marketing hero, wordmark on slate-900) where it clears AAA at ≈7.35:1. Never place cyan-500 text on a white surface.

### Dark-mode — key pairings

| Foreground | Background | Measured ratio | Clears |
|---|---|---|---|
| `--text-primary` slate-50 `#f8fafc` | `--surface-primary` slate-900 `#0f172a` | ≈16.75:1 | AAA |
| `--text-secondary` slate-300 `#cbd5e1` | `--surface-primary` slate-900 `#0f172a` | ≈9.35:1 | AAA |
| `--text-link` cyan-400 `#22d3ee` | `--surface-primary` slate-900 `#0f172a` | ≈11.25:1 | AAA |
| `--accent-brand` cyan-700 `#0e7490` | `--surface-primary` slate-900 `#0f172a` | passes AA large/UI; for body-text use `--text-link` (cyan-400) instead | AA UI |
| `--accent-fg` white `#ffffff` | `--accent-brand` cyan-700 `#0e7490` | ≈5.74:1 | AA |

**Dark-mode feedback subtle note (from tokens-dark.css):** Subtle-bg + main-fg pairings like green-700 on green-950 produce approximately 3.2:1 — below AA for normal text. On dark surfaces, subtle alert boxes must pair the deep-stop subtle background with `--text-primary` (slate-50) as foreground, not the `--feedback-*-fg` stop.

---

## 5.12 Do / Don't

**Do:**
- Use `--accent-brand` (cyan-700 in master profile) for all interactive primary elements.
- Override `--accent-brand` at the profile level for studios that have earned a category convention.
- Use `--feedback-*` tokens exclusively for success/warn/danger/info states — not for decorative accent.
- Pair `--accent-fg` (white) as the text color on any `--accent-brand` background.

**Don't:**
- Place cyan-500 (`#06b6d4`) text on white or light surfaces — it fails AA.
- Use emerald for anything other than markets-family elements — it will be read as financial data.
- Use red outside of danger/ZugaShield contexts — it carries the danger semantic system-wide.
- Use amber for studio accents — amber is the exclusive property of `--feedback-warn`.
