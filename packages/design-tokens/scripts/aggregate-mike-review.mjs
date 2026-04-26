#!/usr/bin/env node
// @zuga-technologies/design-tokens — aggregate-mike-review.mjs
// Extracts MIKE-CHECKPOINT markers from the design bible markdown corpus,
// validates that every checkpoint has a populated draft, and emits a bucketed
// review doc for Mike.

import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Regex with `g` flag — MUST use matchAll (stateless) to avoid lastIndex leak
// across multiple calls (Issue C in spec).
const CHECKPOINT_RE = /\[MIKE-CHECKPOINT-([a-z]+)(\d+)\]/g;
const PLACEHOLDER_TOKENS = ['TBD', 'TODO', 'FIXME', 'placeholder', 'rough'];

export async function extractCheckpoints(bibleDir) {
  const checkpoints = [];
  await walkMd(bibleDir, async (file, content) => {
    // Use matchAll (stateless) instead of exec loop to avoid global regex
    // lastIndex leaking across calls when extractCheckpoints is called multiple
    // times in the same process (e.g. repeated test suite calls).
    for (const match of content.matchAll(CHECKPOINT_RE)) {
      const [full, prefix, num] = match;
      const key = `MIKE-CHECKPOINT-${prefix}${num}`;
      const startIdx = match.index;
      // Capture consecutive blockquote (>) lines starting from the marker
      // position forward. The `>` pattern is not anchored to line-start so it
      // finds the first `>` after the inline marker (across blank lines) and
      // then captures all consecutive `>` lines. (Issue D in spec.)
      const blockMatch = content.slice(startIdx).match(/(?:>\s*[^\n]*\n)+/m);
      const contextBlock = blockMatch ? blockMatch[0] : '';
      checkpoints.push({ key, prefix, num: parseInt(num, 10), file, contextBlock });
    }
  });
  return checkpoints;
}

export function validateCheckpoints(checkpoints) {
  const invalid = [];
  for (const cp of checkpoints) {
    const draftMatch = cp.contextBlock.match(/Antonio'?s draft\s*\|\s*(.+?)\s*\|/i);
    const draft = draftMatch ? draftMatch[1].trim() : '';
    let reason = null;
    if (!draft) {
      reason = "Antonio's draft is empty";
    } else if (draft.length < 20) {
      reason = `Antonio's draft is only ${draft.length} chars (need >=20)`;
    } else {
      const found = PLACEHOLDER_TOKENS.find(t => draft.toLowerCase().includes(t.toLowerCase()));
      if (found) reason = `Antonio's draft contains placeholder token "${found}"`;
    }
    if (reason) invalid.push({ key: cp.key, reason });
  }
  return { invalid };
}

export function buildReviewDoc(checkpoints) {
  // Known bucket prefixes — unknown prefixes (e.g. "bad") are silently skipped
  // per spec: Issue A says this is intentional behavior.
  const buckets = {
    h:     'Color hues',
    typ:   'Typography',
    voice: 'Voice & tone',
    wm:    'Wordmark',
    tag:   'Tagline',
    acc:   'Studio accents',
  };

  const grouped = {};
  for (const cp of checkpoints) {
    (grouped[cp.prefix] ||= []).push(cp);
  }

  let doc =
    `# Mike Review\n\n` +
    `Generated: ${new Date().toISOString()}\n` +
    `Total checkpoints: ${checkpoints.length}\n\n`;

  for (const [prefix, label] of Object.entries(buckets)) {
    if (!grouped[prefix]) continue;
    doc += `## Bucket — ${label}\n\n`;
    for (const cp of grouped[prefix].sort((a, b) => a.num - b.num)) {
      doc += `### ${cp.key} (from ${cp.file})\n\n${cp.contextBlock}\n\n---\n\n`;
    }
  }

  return doc;
}

async function walkMd(dir, callback) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walkMd(p, callback);
    else if (e.name.endsWith('.md')) {
      const content = await fs.readFile(p, 'utf8');
      await callback(p, content);
    }
  }
}

// CLI guard — uses pathToFileURL for Windows compatibility (Issue: the plan's
// naive `file://${process.argv[1]}` form silently fails on Windows due to
// drive-letter path encoding; pathToFileURL handles it correctly).
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const bibleDir = process.argv[2] || './docs/bible';
  const outputPath = process.argv[3] || './docs/MIKE-REVIEW.md';

  let checkpoints;
  try {
    checkpoints = await extractCheckpoints(bibleDir);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(`ERROR: Bible directory not found: ${bibleDir}`);
      process.exit(2);
    }
    throw err;
  }
  const validation = validateCheckpoints(checkpoints);

  if (validation.invalid.length > 0) {
    console.error('FAIL: invalid checkpoints found:');
    for (const inv of validation.invalid) {
      console.error(`  ${inv.key}: ${inv.reason}`);
    }
    process.exit(1);
  }

  const doc = buildReviewDoc(checkpoints);
  await fs.writeFile(outputPath, doc);
  console.log(`Wrote ${checkpoints.length} checkpoints to ${outputPath}`);
}
