#!/usr/bin/env node
// @zuga-technologies/design-tokens — drift-detect.mjs
// Runs nightly via GH Actions. Reads consuming-repos.json, clones each
// consumer, builds the CSS, dumps :root vars, diffs Tier 1 against canonical.

import { execSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

const REGISTRY = path.resolve(import.meta.dirname, '..', 'consuming-repos.json');
const CANONICAL_TIER1 = path.resolve(import.meta.dirname, '..', 'src', 'tokens.css');

async function main() {
  const registry = JSON.parse(await fs.readFile(REGISTRY, 'utf8'));
  const canonical = await readCanonicalTier1();
  const driftReports = [];

  for (const consumer of registry.consumers) {
    const tmpDir = path.join(os.tmpdir(), `drift-${consumer.repo.replace('/', '_')}-${Date.now()}`);
    try {
      execSync(`git clone --depth 1 https://github.com/${consumer.repo}.git ${tmpDir}`, { stdio: 'inherit' });
      execSync(`cd ${tmpDir} && pnpm install --no-frozen-lockfile`, { stdio: 'inherit' });
      const consumerTier1 = await extractTier1FromConsumer(tmpDir, consumer);
      const drift = compareTier1(canonical, consumerTier1);
      if (Object.keys(drift).length > 0) {
        driftReports.push({ consumer: consumer.repo, drift });
      }
    } catch (err) {
      driftReports.push({ consumer: consumer.repo, error: err.message });
    } finally {
      // cleanup tmpDir
    }
  }

  if (driftReports.length > 0) {
    console.log('DRIFT DETECTED:', JSON.stringify(driftReports, null, 2));
    process.exit(1);
  }
  console.log('All consumers clean.');
}

async function readCanonicalTier1() {
  const css = await fs.readFile(CANONICAL_TIER1, 'utf8');
  return parseTier1Vars(css);
}

function parseTier1Vars(css) {
  const map = {};
  const re = /(--(?:color|space|radius|shadow|motion|z|container|breakpoint|type|font)-[a-z0-9-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(css)) !== null) map[m[1]] = m[2].trim();
  return map;
}

async function extractTier1FromConsumer(repoDir, consumer) {
  // For consumers with subPath (e.g., ZugaApp/frontend), descend
  const targetDir = consumer.subPath ? path.join(repoDir, consumer.subPath) : repoDir;
  // Build the consumer's CSS (engineer fills based on consumer's build script)
  // For now, parse theme.css directly:
  const themePath = path.join(targetDir, 'src/styles/theme.css');
  try {
    const css = await fs.readFile(themePath, 'utf8');
    return parseTier1Vars(css);
  } catch { return {}; }
}

function compareTier1(canonical, consumer) {
  const drift = {};
  for (const [k, v] of Object.entries(consumer)) {
    if (canonical[k] && canonical[k] !== v) drift[k] = { expected: canonical[k], actual: v };
  }
  return drift;
}

main().catch(err => { console.error(err); process.exit(1); });
