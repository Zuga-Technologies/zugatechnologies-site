# Copy + Positioning Sign-off — Zuga Technologies Landing Page

**Owner:** @TacoNips (Mike) — hard-veto on this entire surface per division-of-labor.
**Blocks:** custom-domain bind to `zugatechnologies.com` (Phase 6). Until 100% of below is `[MIKE-APPROVED:]`, the canonical domain stays unbound and only the preview URL exists.

## Where to look

- **Live preview:** https://zugatechnologies-site.pages.dev
- **Repo:** https://github.com/Zuga-Technologies/zugatechnologies-site
- **Source files** (one per section — open these to see structure + decision context):
  - `src/components/sections/Hero.astro`
  - `src/components/sections/Studios.astro`
  - `src/components/sections/Moat.astro`
  - `src/components/sections/Team.astro`
  - `src/components/sections/Contact.astro`
  - `src/components/Header.astro`
  - `src/components/Footer.astro`
  - `src/styles/global.css` *(brand color decision)*

## How approval works

Every decision below is currently tagged `[MIKE-PENDING: <key>]` in the source. When you approve a value, the tag becomes `[MIKE-APPROVED: 2026-04-22]` (today's date or whatever date you sign) and the `[MIKE-PENDING: <key>]` placeholder gets replaced with your approved string.

**Three ways to send approvals back, your pick:**

1. **PR directly to this repo** — open a PR editing `MIKE-REVIEW.md` (this file) with your approved values written into the "your value" column below. Antonio (or me, in a follow-up Claude session) merges the PR and splices the values into the `.astro` source files. Your edit is the audit trail — git blame ties every approved string back to your commit.
2. **Comments on Issue #1** — drop approved values as Issue comments. Less granular, but conversational. Antonio transcribes from comments to PR.
3. **In-person at work** — verbal approvals get transcribed by Antonio into a PR with `[MIKE-APPROVED: <date>]` tagged, you confirm via Issue thumbs-up.

**Section-by-section approval is fine and expected.** You don't have to do all 8 buckets at once. Hero approved on day 1 + footer on day 5 + everything else next weekend works — each batch ships to preview within 90 sec of the splice commit.

## What's been pre-decided (reversible if you disagree)

These were technical-shell decisions in the Antonio-lane, but flag any of them for change if you want — none are baked-in:

- **Stack:** Astro v6 + Tailwind v4, static-rendered, no JS shipped to client. Hosted on CF Pages auto-deploying from `main` branch.
- **Page structure:** single-page, six sections (Hero → Studios → Moat → Team → Contact → Footer). Reorder / remove / add as you see fit.
- **Visual posture:** dark, monochrome, single accent (cool steel-cyan), system fonts only (no Google Fonts). Intentionally cool/restrained to contrast against ZugaApp's amber/glow product aesthetic — corp-identity vs product-identity. Flip the accent hue or go light-mode if you'd rather.
- **No analytics / no forms / no third-party scripts.** Held off pending your privacy/GDPR review.
- **Canonical link tag** points at `https://zugatechnologies.com/` even on the preview URL — that's so Google and social-card scrapers always credit the canonical domain regardless of which preview hash they hit.

---

## The 8 decision buckets

### Bucket 1 — Brand identity

| Key | What it controls | Where | Your value |
|---|---|---|---|
| `site-title` | Browser tab title + SEO `<title>` + social-card title | `Layout.astro` (via index.astro `title=` prop) | |
| `site-description` | Meta description + social-card description (~160 chars) | same | |
| `wordmark` | Top-left header logo text. E.g. "Zuga Technologies", "ZUGA", "zuga.tech" | `Header.astro` | |
| `accent-hue` *(design token)* | Single brand color. Currently steel-cyan (oklch 0.68 0.10 220). Could be indigo, near-white, etc. | `global.css` `--color-accent-500` | |

### Bucket 2 — Hero

| Key | What it controls | Your value |
|---|---|---|
| `hero-eyebrow` | Small uppercase line above headline | |
| `hero-headline` | The big H1. Pick one strong sentence | |
| `hero-subheadline` | One supporting sentence under H1 | |
| `hero-primary-cta-label` | Primary button text (e.g. "Get in touch") | |
| `hero-primary-cta-href` *(in source comment)* | Where primary CTA goes. Options: `#contact` (scroll to contact), `mailto:...`, external link | |
| `hero-secondary-cta-label` | Secondary button text | |
| `hero-secondary-cta-href` *(in source comment)* | Same options as primary | |

### Bucket 3 — Studios section

This is the "what we're building" tile grid. 4 tiles × 3 fields each + 3 section-level strings = 15 fields. **The narrative shape is one decision** — pick the 4 studios to feature and a one-sentence framing for each.

| Key | What it controls | Your value |
|---|---|---|
| `studios-eyebrow` | Section eyebrow | |
| `studios-heading` | Section H2 | |
| `studios-intro` | One-paragraph intro under H2 | |
| `studio-1-name` / `-blurb` / `-status` | Tile 1 (suggested: Zugabot) | |
| `studio-2-name` / `-blurb` / `-status` | Tile 2 (suggested: ZugaGamerOverlay) | |
| `studio-3-name` / `-blurb` / `-status` | Tile 3 (suggested: ZugaLife) | |
| `studio-4-name` / `-blurb` / `-status` | Tile 4 (suggested: ZugaCode) | |

> Status badge is a short uppercase tag, e.g. `LIVE`, `BETA`, `Q2 2026`. Keep ≤ ~10 chars.

### Bucket 4 — Moat / why Zuga

Three numbered pillars (`01 / 02 / 03`). Current shortlist is consciousness architecture + BMI thesis + Anthropic Partner Network cohort, but **how each is framed for an investor / partner audience is your call** — including whether to name Anthropic at all.

| Key | What it controls | Your value |
|---|---|---|
| `moat-eyebrow` | Section eyebrow | |
| `moat-heading` | Section H2 | |
| `moat-intro` | One-paragraph intro | |
| `moat-1-title` / `-body` | Pillar 01 title + 2–3 sentence body | |
| `moat-2-title` / `-body` | Pillar 02 | |
| `moat-3-title` / `-body` | Pillar 03 | |

### Bucket 5 — Team

| Key | What it controls | Your value |
|---|---|---|
| `team-eyebrow` | Section eyebrow | |
| `team-heading` | Section H2 | |
| `founder-1-name` / `-role` / `-bio` | First founder card | |
| `founder-2-name` / `-role` / `-bio` | Second founder card | |
| `cohort-line` | One-sentence acknowledgment of the partner-network cohort | |

> Names are tagged because *how* they're presented is a positioning decision (full names vs first-only vs role-only vs no names). Photos: not in this scaffold — flag if you want them, headshot grid adds layout work.

### Bucket 6 — Contact / investors

| Key | What it controls | Your value |
|---|---|---|
| `contact-eyebrow` | Section eyebrow | |
| `contact-heading` | Section H2 | |
| `contact-body` | Short framing paragraph | |
| `contact-email-address` *(in source comment)* | The actual email. Could be `hello@`, `investors@`, `partners@`, route through your inbox, etc. **Cloudflare Email Routing setup needed once you pick the alias** — see `reference_zugabot_ai_email_routing.md` for the pattern. | |
| `contact-email-cta-label` | Email button text | |
| `contact-secondary-channel` | Optional second contact (calendar link / social DM / nothing) | |

### Bucket 7 — Header navigation

Four nav links in the top bar. Each currently scrolls to a section anchor (`#what`, `#moat`, `#team`, `#contact`).

| Key | What it controls | Your value |
|---|---|---|
| `nav-1` | Label for #what (Studios section) | |
| `nav-2` | Label for #moat (Moat section) | |
| `nav-3` | Label for #team (Team section) | |
| `nav-4` | Label for #contact (Contact section) | |

### Bucket 8 — Footer

| Key | What it controls | Your value |
|---|---|---|
| `legal-entity-name` | © line entity. **Blocks on DELIVERABLE 0** (LLC/Inc decision) — leave `[MIKE-PENDING]` if entity isn't formed yet | |
| `privacy-link-text` *(+ should /privacy page exist?)* | Link label + whether the page itself exists | |
| `terms-link-text` *(+ should /terms page exist?)* | Same | |
| `optional-social-link` | LinkedIn / Twitter / nothing | |

---

## Once you've approved enough to ship

When buckets are 100% `[MIKE-APPROVED]`, the next session unlocks **Phase 6** of the metaprompt:
1. Bind `zugatechnologies.com` apex + `www.zugatechnologies.com` as custom domains in CF Pages
2. CF auto-creates the CNAME flattening records (~5 min SSL provisioning)
3. The two redirect domains (`zugaindustries.com`, `zugainc.com`) start serving the real page at the destination — they were already 301'ing to `zugatechnologies.com`, but until Phase 6 the destination had no origin
4. Submit to Google Search Console for indexing

Until that gate, the canonical domain stays unbound. No external surface, no first-impression risk.
