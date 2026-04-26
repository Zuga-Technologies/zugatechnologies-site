#!/usr/bin/env node
// @zuga-technologies/design-tokens — propagate-mike-approvals.mjs
// Reads MIKE-REVIEW.md for [MIKE-APPROVED-*] markers, applies them to bible
// source markdown files, and (for color approvals) writes the new hex value
// into tokens.css.

import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Regex with `g` flag — MUST use matchAll (stateless) to avoid lastIndex leak
// across multiple calls when findApprovedCheckpoints is called more than once
// in the same process (e.g. repeated test suite calls).
const APPROVED_RE = /\[MIKE-APPROVED-([a-z]+\d+):\s*(\d{4}-\d{2}-\d{2})\]\s*(?:hex=([^\s\n]+)|copy="([^"]+)")?/g;

export function findApprovedCheckpoints(reviewDoc) {
  const approved = [];
  // Use matchAll (stateless) instead of exec loop to avoid global regex
  // lastIndex leaking across calls. The plan's snippet used .exec() — this
  // avoids the subtle state-leakage bug if called multiple times per load.
  for (const m of reviewDoc.matchAll(APPROVED_RE)) {
    const [, suffix, date, hex, copy] = m;
    approved.push({ key: `MIKE-APPROVED-${suffix}`, date, value: hex || copy || null });
  }
  return approved;
}

export function applyApproval(sourceMd, { key, date, value }) {
  // key may arrive in either MIKE-APPROVED-* or MIKE-CHECKPOINT-* form.
  // Normalise: checkpointKey = the marker embedded in source files;
  //            approvedKey   = the replacement label written back.
  const checkpointKey = key.replace('MIKE-APPROVED', 'MIKE-CHECKPOINT');
  const approvedKey   = key.replace('MIKE-CHECKPOINT', 'MIKE-APPROVED');
  const markerRe = new RegExp(`\\[${checkpointKey}\\]`, 'g');
  const valueSuffix = value
    ? value.startsWith('#')
      ? ` hex=${value}`
      : ` copy="${value}"`
    : '';
  // Returns a NEW string — does not mutate the input (immutable transformation).
  return sourceMd.replace(markerRe, `[${approvedKey}: ${date}]${valueSuffix}`);
}

// Map from approval key to CSS custom property in tokens.css
const HUE_CHECKPOINT_TO_TOKEN = {
  'MIKE-APPROVED-h01': '--color-cyan-500',     // master accent
  'MIKE-APPROVED-h02': '--color-mint-500',     // wellness family
  'MIKE-APPROVED-h03': '--color-violet-500',   // creative family
  'MIKE-APPROVED-h04': '--color-blue-500',     // ZugaCode
  'MIKE-APPROVED-h05': '--color-sky-500',      // ZugaCloud
  'MIKE-APPROVED-h06': '--color-magenta-500',  // ZugaAudio
  'MIKE-APPROVED-h07': '--color-orange-500',   // ZugaForge
  'MIKE-APPROVED-h08': '--color-indigo-500',   // ZugaLearn
  'MIKE-APPROVED-h09': '--color-emerald-500',  // markets family
};

// CLI guard — uses pathToFileURL for Windows compatibility. The plan's naive
// `file://${process.argv[1]}` form silently fails on Windows due to
// drive-letter path encoding; pathToFileURL handles it correctly.
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const reviewPath = process.argv[2] || './docs/MIKE-REVIEW.md';
  const bibleDir = process.argv[3] || './docs/bible';
  const tokensCssPath = process.argv[4] || './packages/design-tokens/src/tokens.css';

  const reviewDoc = await fs.readFile(reviewPath, 'utf8');
  const approved = findApprovedCheckpoints(reviewDoc);

  let tokensCss = await fs.readFile(tokensCssPath, 'utf8');

  for (const approval of approved) {
    await walkAndApply(bibleDir, approval);

    if (approval.value && approval.value.startsWith('#') && HUE_CHECKPOINT_TO_TOKEN[approval.key]) {
      const tokenName = HUE_CHECKPOINT_TO_TOKEN[approval.key];
      const tokenRe = new RegExp(
        `(${tokenName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*:\\s*)#[0-9a-fA-F]{3,8}`
      );
      tokensCss = tokensCss.replace(tokenRe, `$1${approval.value}`);
    }
  }

  await fs.writeFile(tokensCssPath, tokensCss);
  console.log(`Propagated ${approved.length} approvals.`);
}

async function walkAndApply(dir, approval) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walkAndApply(p, approval);
    else if (e.name.endsWith('.md')) {
      const content = await fs.readFile(p, 'utf8');
      const updated = applyApproval(content, approval);
      if (updated !== content) await fs.writeFile(p, updated);
    }
  }
}
