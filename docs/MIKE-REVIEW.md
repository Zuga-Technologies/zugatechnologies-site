# Mike Review

Generated: 2026-04-26T00:43:46.864Z
Total checkpoints: 14

## Bucket — Voice & tone

### MIKE-CHECKPOINT-voice01 (from docs\bible\03-voice-and-tone.md)

> **🛑 MIKE-CHECKPOINT-voice01** — confirm master tone descriptor
>
> | Field | Value |
> |---|---|
> | Antonio's draft | Direct, technical, occasionally dry — never corporate. We write like a founder explaining something to a smart friend, not like a product manager writing for a press release. Confidence comes from specificity, not from superlatives. |
> | Alternates considered | "Warm and approachable" — rejected: sounds like a consumer wellness brand, not an agent-fleet platform. "Bold and visionary" — rejected: too much pitch-deck energy, doesn't hold at error-state copy. |
> | Renders on | All surfaces — this is the baseline every other tone shift modifies |
>
> ✅ Approve → flip to `[MIKE-APPROVED-voice01: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field


---

### MIKE-CHECKPOINT-voice02 (from docs\bible\03-voice-and-tone.md)

> **🛑 MIKE-CHECKPOINT-voice02** — confirm marketing tone
>
> | Field | Value |
> |---|---|
> | Antonio's draft | Energetic but earned. We lead with what the product does, not what we aspire to be. Headlines state a concrete outcome ("Your AI agent fleet, one login"). Body copy explains the mechanism. No countdown timers, no vague "AI-powered" claims, no social proof fabrication. We can be punchy; we can't be hollow. |
> | Alternates considered | Hype-forward ("The future of work is here") — rejected: every SaaS company says this; it's become noise. Dry/technical only — rejected: marketing is still a hook; we're allowed to have energy at the top of the funnel. |
> | Renders on | zugatechnologies.com landing, ZugaApp marketing pages, social card copy, GitHub org README |
>
> ✅ Approve → flip to `[MIKE-APPROVED-voice02: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field


---

### MIKE-CHECKPOINT-voice03 (from docs\bible\03-voice-and-tone.md)

> **🛑 MIKE-CHECKPOINT-voice03** — confirm product-UI tone
>
> | Field | Value |
> |---|---|
> | Antonio's draft | Terse and action-oriented. Button labels use imperative verbs: "Run", "Connect", "Dismiss", not "Click here to run" or "Please connect your account." Tooltip copy answers one question only. Status messages report state without editorializing ("Syncing 3 files" not "We're working hard to sync your files!"). |
> | Alternates considered | Conversational ("Hey, let's connect your account!") — rejected: adds friction to task-completion flows; users in the UI want to act, not chat. Passive ("Files are being synced") — rejected: hides agency and feels slower. |
> | Renders on | All studio UIs — ZugaApp nav, ZugaLife habit cards, ZugaTrader order panel, ZugaCode activity feed, ZugaGamer overlay |
>
> ✅ Approve → flip to `[MIKE-APPROVED-voice03: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field


---

### MIKE-CHECKPOINT-voice04 (from docs\bible\03-voice-and-tone.md)

> **🛑 MIKE-CHECKPOINT-voice04** — confirm error-state tone
>
> | Field | Value |
> |---|---|
> | Antonio's draft | Honest and specific, never apologetic theater. State what broke, state what the user can do next, and stop. "Couldn't reach the server. Check your connection and try again." — not "Oops! Something went wrong on our end. We're so sorry for the inconvenience!" Blame should go to the system, not the user; but we don't perform guilt either. |
> | Alternates considered | Cute/emoji-heavy errors ("🙈 Oops, that didn't work!") — rejected: condescending when something is actually broken; erodes trust for users dealing with a genuine failure. Clinical/code-dump errors ("Error 503: upstream connect error") — rejected: not actionable for most users; raw codes belong in developer consoles, not UI copy. |
> | Renders on | ZugaApp error banners, ZugaLife form validation, ZugaTrader order rejection messages, ZugaCode hook failure notifications, all 4xx/5xx page copy |
>
> ✅ Approve → flip to `[MIKE-APPROVED-voice04: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field


---

### MIKE-CHECKPOINT-voice05 (from docs\bible\03-voice-and-tone.md)

> **🛑 MIKE-CHECKPOINT-voice05** — confirm empty-state tone
>
> | Field | Value |
> |---|---|
> | Antonio's draft | Contextual and forward-leaning. Tell the user what this space is for and what action fills it. "No habits yet. Add your first one to start tracking." — not a decorative illustration with "Nothing to see here!" Empty states are the best moment to orient a new user; they should carry real information, not filler copy. |
> | Alternates considered | Whimsical/illustrated ("Your canvas is blank — let's paint something amazing!") — rejected: doesn't scale across business-facing studios like ZugaTrader. Pure blank (no copy at all) — rejected: disorienting, especially for first-time users; the empty state is a teaching moment. |
> | Renders on | ZugaLife habits/streaks/goals, ZugaTrader watchlist, ZugaImage gallery, ZugaCode review queue, ZugaChat history |
>
> ✅ Approve → flip to `[MIKE-APPROVED-voice05: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field


---

### MIKE-CHECKPOINT-voice06 (from docs\bible\03-voice-and-tone.md)

> **🛑 MIKE-CHECKPOINT-voice06** — confirm onboarding tone
>
> | Field | Value |
> |---|---|
> | Antonio's draft | Confident and tutorial-paced. We assume the user is smart and skip condescension ("You're doing great!"). We don't assume they know our jargon — first use of "studios," "ZugaTokens," or "Zugabot" gets a one-sentence definition inline, not a glossary redirect. Steps are numbered; nothing is hidden behind "you'll figure it out." We want users to feel capable after onboarding, not grateful. |
> | Alternates considered | Gamified congratulations at every step — rejected: feels patronizing after the second badge, cheapens actual milestones. No onboarding copy (jump straight to the UI) — rejected: works for power users but alienates the target segment joining via the Anthropic partnership cohort. |
> | Renders on | ZugaApp signup flow, ZugaLife first-run habit setup, ZugaTrader account connection wizard, ZugaCode observer install prompt |
>
> ✅ Approve → flip to `[MIKE-APPROVED-voice06: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field


---

### MIKE-CHECKPOINT-voice07 (from docs\bible\03-voice-and-tone.md)

> **🛑 MIKE-CHECKPOINT-voice07** — confirm pronoun and contraction rules
>
> | Field | Value |
> |---|---|
> | Antonio's draft | We use "you" for the user and "we" for Zuga. Contractions are allowed and preferred in UI copy and marketing — "you're" not "you are," "we'll" not "we will." Oxford comma is mandatory in all lists of three or more ("studios, agents, and tokens" not "studios, agents and tokens"). Sentence case for UI labels ("Add habit" not "Add Habit"), title case for section headers and navigation ("Voice & Tone" not "Voice and tone"). |
> | Alternates considered | Third-person brand voice ("Zuga will sync your data") — rejected: creates unnecessary distance, reads as legal boilerplate. No contractions (formal register throughout) — rejected: clashes with the direct/blunt brand voice; formal language implies bureaucracy. |
> | Renders on | All surfaces — this is a universal grammar rule applied system-wide |
>
> ✅ Approve → flip to `[MIKE-APPROVED-voice07: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field


---

### MIKE-CHECKPOINT-voice08 (from docs\bible\03-voice-and-tone.md)

> **🛑 MIKE-CHECKPOINT-voice08** — confirm Zugabot vs ZugaChat terminology rule
>
> | Field | Value |
> |---|---|
> | Antonio's draft | "Zugabot" refers to the autonomous agent core — the system that executes tasks, manages memory, and runs without real-time human input. "ZugaChat" refers to the user-facing chat surface where humans talk to the agent in real time. Never conflate them. In UI copy: "Chat with Zugabot via ZugaChat" is correct; "Open Zugabot" as a label for the chat window is wrong — that label implies you're opening the agent itself, not the interface. |
> | Alternates considered | Treating them as interchangeable ("Zugabot/ZugaChat") — rejected: they are architecturally distinct; conflation causes user confusion and engineering miscommunication. Using "Zugabot" as the user-facing name everywhere — rejected: the agent name in user copy sounds robotic; ZugaChat is the human-facing product surface. |
> | Renders on | ZugaApp nav labels, marketing copy, onboarding steps, API documentation, internal engineering specs |
>
> ✅ Approve → flip to `[MIKE-APPROVED-voice08: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field


---

### MIKE-CHECKPOINT-voice09 (from docs\bible\03-voice-and-tone.md)

> **🛑 MIKE-CHECKPOINT-voice09** — confirm ZugaTokens vs credits terminology rule
>
> | Field | Value |
> |---|---|
> | Antonio's draft | The user-facing currency is always "ZugaTokens" — capital Z, capital T, one word. Never "credits," "coins," "points," or "tokens" (lowercase). In sentence-level copy: "You have 240 ZugaTokens remaining." The internal/developer name for the unit may be "token" (lowercase) in code and database schemas. The user never sees the lowercase form in the product UI. |
> | Alternates considered | "Credits" — rejected: generic, used by dozens of competitors, gives users no brand recall; also implies consumption without investment. "Zuga Credits" — rejected: "credits" still carries the wrong connotation; ZugaTokens is already established in the codebase and user-facing copy. |
> | Renders on | ZugaApp wallet UI, pricing pages, ZugaLife feature gates, ZugaTrader execution costs display, ZugaImage generation cost display, all billing-related copy |
>
> ✅ Approve → flip to `[MIKE-APPROVED-voice09: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field


---

### MIKE-CHECKPOINT-voice10 (from docs\bible\03-voice-and-tone.md)

> **🛑 MIKE-CHECKPOINT-voice10** — confirm studios vs apps terminology rule
>
> | Field | Value |
> |---|---|
> | Antonio's draft | The plug-in units inside ZugaApp are called "studios" in all user-facing copy. Never "apps," "modules," "plugins," or "tools" in user-facing surfaces. In the food-court metaphor: ZugaApp is the food court (host shell); each studio is a food truck (specialized vendor). The metaphor is internal framing — don't use "food truck" in user-facing copy. Externally: "ZugaLife is a studio inside ZugaApp." In navigation labels: "Studios" (not "Apps"). |
> | Alternates considered | "Apps" — rejected: implies standalone installation; studios are integrated; using "apps" creates the wrong mental model about scope and portability. "Modules" — rejected: sounds like a content-management system, implies optional add-ons rather than first-class products. |
> | Renders on | ZugaApp Studios directory, onboarding copy, marketing pages, ZugaApp navbar ("Studios" section label), all product descriptions |
>
> ✅ Approve → flip to `[MIKE-APPROVED-voice10: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field


---

### MIKE-CHECKPOINT-voice11 (from docs\bible\03-voice-and-tone.md)

> **🛑 MIKE-CHECKPOINT-voice11** — confirm food court / food truck internal framing rule
>
> | Field | Value |
> |---|---|
> | Antonio's draft | Internal engineering and design vocabulary only. "Food court" = ZugaApp (the host shell that aggregates studios). "Food truck" = an individual studio that operates inside the food court. The framing clarifies integration ownership: if a studio (food truck) has a problem, fix the food truck; don't renovate the food court for one vendor. This metaphor governs architecture decisions — a studio-specific problem is not a ZugaApp-layer problem unless the integration layer itself is broken. Never appears in user-facing copy. |
> | Alternates considered | "Container / service" — rejected: too generic, maps to Docker mental models in engineering but loses the integration-ownership nuance for design and product discussions. "Platform / plug-in" — rejected: "plug-in" implies optional and detachable; studios are first-class products in the Branded House, not optional extensions. |
> | Renders on | Internal engineering specs, design system documentation, architecture diagrams, code review discussions — NOT user-facing surfaces |
>
> ✅ Approve → flip to `[MIKE-APPROVED-voice11: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field


---

## Bucket — Wordmark

### MIKE-CHECKPOINT-wm01 (from docs\bible\02-brand-foundation.md)

> **🛑 MIKE-CHECKPOINT-wm01** — confirm wordmark direction
>
> | Field | Value |
> |---|---|
> | Antonio's draft | All-caps "ZUGA" set in a geometric sans — Inter or equivalent, weight 700, tracked +20. The wordmark is set in master cyan (#06b6d4) on dark surfaces and near-black (#0f172a) on light surfaces. No tagline lockup at small sizes. |
> | Alternates considered | Mixed-case "Zuga" (title case) — rejected: feels like a consumer startup, loses authority at product scale. Lowercase "zuga" — rejected: too casual for a company that runs financial tooling. |
> | Renders on | Corp landing header, ZugaApp navbar, all studio top-bars, email headers, GitHub org avatar, social card OG images |
>
> ✅ Approve → flip to `[MIKE-APPROVED-wm01: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field


---

### MIKE-CHECKPOINT-wm02 (from docs\bible\02-brand-foundation.md)

> **🛑 MIKE-CHECKPOINT-wm02** — confirm logo mark / glyph treatment
>
> | Field | Value |
> |---|---|
> | Antonio's draft | Geometric "Z" constructed from two horizontal strokes and one diagonal — all strokes equal weight, rounded terminals, no serifs. The Z sits inside a square container with 15% padding. Background: master cyan (#06b6d4). Foreground: white (#ffffff). Corner radius: 22% of container width (feels like a modern app icon, not a logo stamp). |
> | Alternates considered | Circular container — rejected: squares tile better in OS icon grids and favicon contexts. Stylized Z with a cutting diagonal notch — rejected: too aggressive, doesn't read cleanly at 16px. Wordmark-only (no glyph) — rejected: doesn't work in 32px favicon or 1:1 avatar slot. |
> | Renders on | Browser favicon (16px, 32px), iOS/Android app icon (1024px source), GitHub org avatar, Discord server icon, ZugaApp PWA manifest icon |
>
> ✅ Approve → flip to `[MIKE-APPROVED-wm02: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field


---

### MIKE-CHECKPOINT-wm03 (from docs\bible\02-brand-foundation.md)

> **🛑 MIKE-CHECKPOINT-wm03** — confirm master accent hue
>
> | Field | Value |
> |---|---|
> | Antonio's draft | `#06b6d4` (Tailwind cyan-500). Passes WCAG AA against #0f172a (near-black surfaces) — measured contrast ≈7.35:1, which exceeds the 4.5:1 AA threshold and clears the 7:1 AAA threshold for normal text. Fails AA against white (#ffffff) — never used as a background color behind body text. Used for: primary CTAs, active nav indicators, focus rings, master wordmark on dark surfaces, hyperlinks in body copy. |
> | Alternates considered | `#0891b2` (cyan-600) — rejected: too somber for a tech-forward brand, loses energy at small sizes. `#22d3ee` (cyan-400) — rejected: fails WCAG AA on white backgrounds, feels juvenile. `#3b82f6` (blue-500) — rejected: indistinguishable from a dozen SaaS products; cyan is the differentiation. |
> | Renders on | Corp landing CTAs, ZugaApp primary buttons, ZugaApp navbar active states, ZugaThemes accent pills, focus ring system-wide, master wordmark on dark surfaces |
>
> ✅ Approve → flip to `[MIKE-APPROVED-wm03: YYYY-MM-DD]`
> ✏️ Modify  → edit "Antonio's draft" field


---

