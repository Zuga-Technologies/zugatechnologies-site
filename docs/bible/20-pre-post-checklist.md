---
section: 20
title: Pre-post Checklist
summary: The enforceable gate every post passes before it reaches Buga — community-first, receipts-not-claims, voice/anti-AI-tell, human engagement.
mikeCheckpoint: false
---

# 20. Pre-post Checklist

> Authored: 2026-07-27
> Source: Gio order "[Gio] Marketing that isn't marketing — enforceable pre-post checklist" (issue #5, part of umbrella #53), Buga-approved company state.

This is the enforcement layer for the doctrine below. §3 governs voice *by surface*; §19 governs voice *by audience*. **This section governs the gate a post clears before it ships** — regardless of surface or audience. Where §19's register wall is the highest-priority rule in the marketing operating layer, this checklist is the procedure that catches every other way a post can fail before it reaches Buga.

---

## 20.1 The doctrine — marketing that isn't marketing

The best marketing doesn't look like marketing. We earn attention by being genuinely useful and genuinely transparent. Pre-cooked promo is spam and permanently burns trust (Audience Research, 2026-06-13). The product mention is the **exception**, never the message. We do not run ads or "buy our product" posts.

This is not aspirational. Every item in §20.2 is a hard gate.

---

## 20.2 The pre-post gate

Every post must pass all four blocks before it is queued for Buga's approval. A single failed item blocks the post. The check runs on **every** post, including replies that quote a product — the gate does not loosen for short copy.

### Block 1 — Community-first wall (non-negotiable)

Applies to community surfaces (Reddit, Discord, Twitch, FB groups). For build-in-public text lanes (X, LinkedIn, Substack, Threads) the 4–6 week rule does not apply, but the value-to-promo ratio and no-link-dropping rules still do.

- [ ] Have I contributed genuinely for **4–6 weeks** before any product mention on this community surface? If no → I do not mention the product. Period.
- [ ] Does the post lead with the **problem**, never "I built X"? Target 80/20 value-to-promo.
- [ ] Is this the same post dropped across subs/servers on the same day? If yes → do not ship. Stagger or rewrite per community.
- [ ] Does the post drop a link into an external community? If yes → remove the link. Links belong in build-in-public owned lanes, not in communities.

### Block 2 — Receipts-not-claims (build-in-public trust)

- [ ] Is every claim backed by a linkable artifact? Acceptable artifacts: commit SHA, live P&L with date, working URL, real dashboard metric, payment-infra screenshot. Unverifiable numbers are claims, not receipts.
- [ ] Does the copy contain any banned claim pattern? Banned: "we're building something amazing," "the agent is doing great," roadmap-as-live, projections-as-results. If it can't be receipted, it can't be claimed.

### Block 3 — Voice / anti-AI-tell pass

- [ ] Does the social copy contain em dashes (—) or en dashes (–)? If yes → replace with colon, period, or line break. (This rule is for social copy only; long-form docs may use dashes.)
- [ ] Does the copy contain any word from the §20.3 banned list? If yes → rewrite. Zero tolerance, zero exceptions.
- [ ] Read-aloud test: does it sound like a press release or a LinkedIn ghostwriter? If yes → rewrite. Does it sound like something Buga would actually say? If yes → ship.

### Block 4 — Engagement is human

- [ ] Is this post a draft stocked by the engine for Buga to ship, or am I (the engine) trying to post/engage directly? The engine stocks drafts; replies, comments, and community relationship work are manual human work (Buga). **Never automate engagement.** If the engine is attempting engagement rather than a draft → stop.

---

## 20.3 Banned words

Zero of these may appear in any consumer-facing post. One occurrence blocks the post (Block 3). This list is separate from §19.2's register-wall vocabulary: §19.2 bans enterprise vocabulary from consumer copy; this list bans AI-tell filler from all copy.

`delve`, `leverage`, `robust`, `seamless`, `elevate`, `unlock`, `tapestry`, `journey`, `transformative`, `game-changer`, `revolutionary`, `cutting-edge`, `synergy`, `innovative`, `empower`, `foster`, `utilize`, `streamline`, `holistic`, `ecosystem`, `paradigm`, `unprecedented`.

---

## 20.4 One-line cheatsheet (DoD)

Gio can clear a post against the gate without re-reading §20.2:

- **Community surface** → 4–6 weeks genuine contribution before any product mention; lead with the problem; 80/20 value; no same-day cross-posts; no links in communities.
- **Claims** → every claim has a linkable artifact (commit, live P&L, working URL, real metric, screenshot); no "building something amazing," no roadmap-as-live.
- **Voice** → no em/en dashes in social copy; zero banned words; sounds like Buga, not a press release.
- **Engagement** → engine stocks drafts only; replies/comments/community are human (Buga); never automate engagement.

---

## 20.5 Enforcement

Like §19, this is a contract doc, not a lint-enforced layer. Enforcement is human and procedural:

1. **Pre-queue gate** — Gio runs every draft through §20.2 before it enters the approval queue. Any failed item sends the draft back to revision; it does not reach Buga.
2. **Buga's approval pass** — Buga is the valve (#53, decision #9). A post that reaches Buga is assumed to have cleared §20.2; Buga's pass is final approval, not the first check.
3. **Drift handling** — if a shipped post is later found to violate this checklist, the fix is to edit or delete the offending content. A repeat violation on the same surface escalates to a playbook review (the doctrine, not just the post, needs attention).
4. **Relationship to §19** — a post that passes §20 but leaks enterprise vocabulary per §19.2 still fails. The two checks are independent; both must pass.

---

## 20.6 Where this lives

- **This doc** (§20) is the canonical checklist. It is the source of truth.
- **`build_post` humanize pass** — when the draft-generation pipeline gains a `build_post` / humanize step, this checklist is encoded there as the automated pre-check (Block 3's dash + banned-word scan are machine-checkable; Blocks 1, 2, 4 and the read-aloud test remain human). Until that pipeline exists, the human procedure above is the enforcement.
- **The social playbook** (Hivemind `marketing/social-playbook`) is the operating manual; this section is its binding gate.
