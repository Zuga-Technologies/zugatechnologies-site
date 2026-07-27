#!/usr/bin/env node
// Pre-post enforcement gate for issue #57 ("Marketing that isn't marketing").
// Run on every queued draft BEFORE it reaches Buga for approval. Exit 0 = pass, 1 = fail.
//
// Doctrine lives in the Hivemind playbook `marketing/social-playbook`; this script is the
// machine-checkable subset of that doctrine, mirroring the `.claude/social/` data-plane
// convention set by issue #55 (see weekly-review.mjs).
//
// Usage:
//   node .claude/social/pre-post-check.mjs <draft.json>     # file path
//   cat draft.json | node .claude/social/pre-post-check.mjs  # stdin
//
// Draft shape:
// {
//   "lane": "text" | "video" | "community",
//   "platform": "linkedin",
//   "body": "the social copy",
//   "product_mention": true,                       // does this post mention a Zuga product?
//   "community_first_contribution_weeks": 6,       // weeks contributed before this post (community lane)
//   "claims": [ { "text": "...", "artifact_url": "https://..." } ],
//   "cross_posted_today": ["reddit_r_x", "discord_y"]  // other places this same post lands today
// }

import { readFileSync } from 'node:fs';

// --- Issue #57 §3: zero banned words ---------------------------------------------
const BANNED_WORDS = [
  'delve', 'leverage', 'robust', 'seamless', 'elevate', 'unlock', 'tapestry',
  'journey', 'transformative', 'game-changer', 'revolutionary', 'cutting-edge',
  'synergy', 'innovative', 'empower', 'foster', 'utilize', 'streamline',
  'holistic', 'ecosystem', 'paradigm', 'unprecedented',
];

// --- Issue #57 §2: banned claims (can't be receipted) ----------------------------
const BANNED_PHRASES = [
  "we're building something amazing",
  'the agent is doing great',
  'roadmap as live',
  'projections as results',
];

// Em/en dashes forbidden in social copy (use colon, period, or line break).
const DASHES = ['—', '–', '―'];

const URL_RE = /https?:\/\/\S+/i;

function readDraft() {
  const arg = process.argv[2];
  const raw = arg ? readFileSync(arg, 'utf8') : readFileSync(0, 'utf8');
  return JSON.parse(raw);
}

function main() {
  const d = readDraft();
  const fails = [];
  const warnings = [];

  const body = String(d.body ?? '');
  const lane = String(d.lane ?? '').toLowerCase();
  const lower = body.toLowerCase();

  // §3 voice: banned words
  for (const w of BANNED_WORDS) {
    if (new RegExp(`\\b${w.replace('-', '\\-')}\\b`).test(lower)) fails.push(`banned word: "${w}"`);
  }

  // §3 voice: em/en dashes
  for (const dash of DASHES) {
    if (body.includes(dash)) { fails.push('em/en dash in copy (use colon, period, or line break)'); break; }
  }

  // §2 receipts: banned phrases
  for (const p of BANNED_PHRASES) {
    if (lower.includes(p)) fails.push(`banned unreceiptable phrase: "${p}"`);
  }

  // §2 receipts: every claim must have an artifact URL
  for (const c of d.claims ?? []) {
    if (!c.artifact_url) fails.push(`claim without receipt: "${String(c.text).slice(0, 60)}"`);
  }

  // §1 community-first wall
  if (lane === 'community') {
    if (d.product_mention) {
      const w = Number(d.community_first_contribution_weeks ?? 0);
      if (w < 4) fails.push('community lane + product mention but <4 weeks contribution (contribute 4-6 weeks first; do not mention the product)');
    }
    if (URL_RE.test(body)) fails.push('link dropped in external community (never drop links in external communities)');
    if ((d.cross_posted_today ?? []).length > 1) fails.push('same post across multiple community subs/servers today');
  }

  // §1 heuristic: leads with "I built" instead of the problem
  if (/^\s*i built/i.test(body)) warnings.push('leads with "I built" (lead with the PROBLEM, not the product)');

  // Human-only checks (cannot automate) — surfaced as reminders, never auto-fail.
  const reminders = [
    'read-aloud test: sounds like a press release / LinkedIn ghostwriter? rewrite. sounds like Buga? ship.',
    'engagement is human: replies/comments/community are manual (Buga). never automate engagement.',
  ];

  const report = [
    `pre-post-check: ${d.platform ?? '?'} (${lane})`,
    ...fails.map((f) => `  FAIL  ${f}`),
    ...warnings.map((w) => `  WARN  ${w}`),
    ...reminders.map((r) => `  HUMAN ${r}`),
    fails.length ? `RESULT: FAIL (${fails.length} block)` : 'RESULT: PASS',
  ].join('\n');

  console.log(report);
  process.exit(fails.length ? 1 : 0);
}

try {
  main();
} catch (e) {
  console.error(`pre-post-check: could not parse draft (${e.message})`);
  process.exit(2);
}
