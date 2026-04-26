# Mike Review — zugatechnologies.com Landing Page

> Every decision below is overrideable. The site is built; this doc is the
> "everything Mike has hard-veto on" surface, gathered in one place so the
> review takes 15 minutes instead of forensic-grepping the repo. Last
> compiled: 2026-04-26.

## Status at a glance

| Section          | State                                        |
|------------------|----------------------------------------------|
| Hero             | Real copy live — typewriter + caret + particles |
| Studios          | Real copy + 3 tiles (ZugaLife, Overlay, "More products soon") |
| Moat (How we build) | Real copy live — 3 pillars, no public moat-naming, particles |
| Team             | Real copy live — 3 founder cards, cohort line |
| Contact          | Real copy live — `mailto:buga@zugabot.ai` with pre-filled email |
| Footer           | Real copy live — Zuga Technologies LLC, NY entity |
| Legal pages      | `/privacy`, `/terms` ported from ZugaApp + updated for NY incorporation |

All `[MIKE-PENDING]` placeholders have been resolved or are explicitly listed
under "Open Questions" below.

---

## Copy choices that affect positioning (Mike's veto lane)

### Hero

```
Eyebrow:   Zuga Technologies
Headline:  Software for the agent era.   ← typewritten in
Subhead:   A growing suite of studios where observability and
           autonomy ship by default.
CTAs:      [See what we build]  [Get in touch]
```

**Decisions made**: lower-case "for the agent era" tagline (no caps drama),
"observability and autonomy" lead (deliberately not "AI agents" / "AGI" —
those words skew product-marketing). "Studios" plural and unspecified count.

### Studios ("The product line for the agent era")

```
ZugaLife          → Launching   "A wellness companion that tracks habits,
                                 mood, and fitness — with an AI coach that
                                 actually pays attention."
ZugaGamerOverlay  → Launching   "A real-time overlay for streamers and
                                 competitive gamers — AI-driven moments,
                                 overlays you don't have to babysit."
More products soon → In build   "A growing pipeline across health, trading,
                                 code, and creative tools. Built in the open."
```

**Open**: ZugaTrader, ZugaCode, etc. omitted intentionally so the section
isn't crowded with not-yet-customer-facing items. Tile 3 is the catch-all.
Mike can tell us if we should pull a specific upcoming product up to a named
tile (and if so, what status badge — "In build", "Beta", etc.).

### Moat ("How we build")

> **Earlier discussion: should we publicly state the moat?** Conclusion: no.
> The section demonstrates moat through evidence rather than naming
> data-gravity / ship-speed / interpretability. A competitor reads this and
> shrugs; an investor reads it and infers defensibility.

```
Eyebrow:   How we build
Heading:   Compounding leverage, in the open
Intro:     Every product on the platform shares one identity, one wallet,
           one memory, one safety layer. New studios inherit the whole
           stack on day one — and contribute back to it.

01  One platform, every studio
    Identity, payments, memory, and AI routing live in a shared canonical
    layer. New products inherit the whole stack on day one — and feed the
    same memory back. The platform compounds with every studio that ships.

02  Built to ship daily
    Autonomous agents work the codebase around the clock under hard
    guardrails and a multi-layer safety system. Releases land in days,
    not quarters. The changelog is the roadmap.

03  Mechanistic by default
    Every agent thought, decision, cost, and file change is observable
    in real time. No black box — full audit trail by default.
```

**Factual audit done** — every claim defensible against current code state.
"Anthropic" deliberately not named anywhere. BMI / interpretability research
publication claim was dropped because Paper 3 hasn't been submitted yet.

### Team

```
Antonio Delgado      Michael Gonzalez       Giovanni Rosario
FOUNDER              CO-FOUNDER, STRATEGY    CO-FOUNDER, GROWTH

[bios as drafted; see Team.astro]

"Plus a small partner cohort building across domains — with more on the way."
```

**Open for Mike**:
- Mike's bio uses "Hard veto on anything that would over-claim or under-deliver" — that phrasing is internal-truth; want to keep it visible publicly or soften?
- "Co-founder, Growth" for Gio — alternatives: "Co-founder, Marketing & Sales", "Co-founder, Revenue", "Co-founder, Go-to-Market". His call.
- **No photos** by intentional design — three text-only cards read as serious for the audience. If you want photos, queue them as a follow-up.
- Cohort line ("Plus a small partner cohort... with more on the way") deliberately doesn't name Anthropic.

### Contact

```
Get in touch
Talk to us

Investors, partners, and builders welcome. Email goes straight to a
founder — no forms, no funnels.

[ Contact buga@zugabot.ai ]   ← mailto with pre-filled subject + body
```

The button opens the visitor's mail client with subject "Hello from
zugatechnologies.com" and a structured-but-empty body (a bit about you /
what you'd like to discuss). Free attribution data without analytics.

### Footer

```
© 2026 Zuga Technologies LLC, a New York limited liability company.
                       All rights reserved.

Privacy  •  Terms  •  buga@zugabot.ai
```

---

## Legal documents — both moved here, ZugaApp redirects

### What changed

1. **`/privacy` and `/terms` now live on zugatechnologies.com** (canonical).
2. **ZugaApp's Vue views (`PrivacyView.vue`, `TermsView.vue`) hard-redirect**
   to the canonical URLs via `window.location.replace()`.
3. **Policies updated** to:
   - Add `zugatechnologies.com` to the covered-sites list.
   - Note explicitly: corporate site has no analytics, cookies, or tracking.
   - Replace `Zuga Technologies` → `Zuga Technologies LLC, a New York
     limited liability company` in contact + masthead.
   - Tighten governing law from "United States" → **State of New York with
     NY arbitration venue** (matches LLC formation jurisdiction).
   - Replace `hello@zugabot.ai` references with `buga@zugabot.ai` (matches
     the public-facing footer + Contact button).
4. **Last-updated date set to April 26, 2026** — reflects the material edits
   above. Bump again only when content materially changes.

### Items still open for Mike / counsel

| Item | Recommendation |
|---|---|
| **Server-side 301 redirect** for ZugaApp's `/privacy` and `/terms` | Current redirect is client-side (JS). Fine for users; weaker SEO than a true 301. Add a CF Worker rule or Railway rewrite when convenient. |
| **Counsel review** of NY governing-law clause + LLC entity name | Especially if the registered entity name on the NY filing has a comma (`Zuga Technologies, LLC`) instead of without (`Zuga Technologies LLC`). Footer + policies use the no-comma form — match the actual Articles of Organization. |
| **Email address consistency** | Policies were `hello@`; now `buga@`. Confirm `buga@zugabot.ai` is monitored or `hello@` forwards there. |
| **No registered office address listed** | Common for pre-launch LLCs, but if you want it shown for gravitas, send the NY street address and I'll add it to the footer. |
| **Trademark notation (`™` / `®`)** | None applied. Add only if/when filed with USPTO. |

---

## Visual / UX choices Mike should sanity-check

- **Particle field** in Hero and Moat sections — subtle cyan dots on dark BG,
  drift slowly, gather toward cursor on hover. Reduced when `prefers-reduced-motion`.
- **Back-to-top arrow** fixed top-right (non-standard; standard is bottom-right).
  Hidden until user scrolls past ~half a viewport.
- **Hero typewriter** on the headline (one-shot on load; respects reduced-motion).
- **Hero caret** blinks like a real terminal cursor (snaps 100% → 0%, no fade).
- **Favicon** is a custom geometric Z mark on a dark rounded-square tile, with
  a subtle vertical accent gradient. Replaces the Astro default.
- **No photos / no headshots** anywhere on the site (intentional; can change).

---

## Things this site does NOT have (deliberate)

- **No `<form>` anywhere.** mailto-only contact. Avoids GDPR / CCPA data
  collection surface entirely.
- **No analytics.** Not PostHog, not GA, nothing. Zero cookies. Privacy
  policy reflects this.
- **No third-party fonts** (system stack only — Mike-gated decision per the
  original metaprompt).
- **No Anthropic mention** anywhere in public copy. Cohort referenced only
  generically.

---

## Files to inspect (for direct review)

```
src/pages/index.astro                  ← page composition
src/components/Header.astro            ← logomark + nav copy
src/components/Footer.astro            ← legal entity + policy links
src/components/sections/Hero.astro     ← headline + typewriter
src/components/sections/Studios.astro  ← product tile copy
src/components/sections/Moat.astro     ← "how we build" copy
src/components/sections/Team.astro     ← founder cards
src/components/sections/Contact.astro  ← mailto + pre-filled email
src/pages/privacy.astro                ← privacy policy (canonical)
src/pages/terms.astro                  ← terms of use (canonical)
```
