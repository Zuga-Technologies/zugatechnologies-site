#!/usr/bin/env node
// @zuga-technologies/design-tokens — tokens-lint.mjs
// Enforces sub-brand contract per spec §15.

import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const TIER1_PREFIXES = ['color', 'space', 'radius', 'shadow', 'motion', 'z', 'container', 'breakpoint', 'type', 'font'];
const TIER2_LOCKED_PREFIXES = ['surface', 'text', 'border', 'feedback'];
const TIER2_OVERRIDABLE_PREFIXES = ['accent', 'density'];
const TIER3_PREFIX = 'component';
const WHY_RE = /\/\*\s*WHY:\s*([\s\S]*?)\*\//i;

export async function lintFile(filePath) {
  const css = await fs.readFile(filePath, 'utf8');
  const violations = [];

  // Match optional leading block comment then a CSS custom property declaration.
  // The comment is captured as group 1, the variable name as group 2.
  const declRe = /(\/\*[\s\S]*?\*\/)?\s*(--[a-z0-9-]+)\s*:/gi;
  let match;
  while ((match = declRe.exec(css)) !== null) {
    const [, leadingComment, varName] = match;
    const cleaned = varName.slice(2); // strip leading --
    const segments = cleaned.split('-');
    const category = segments[0];

    // Rule: no-tier1-redefinition
    if (TIER1_PREFIXES.includes(category)) {
      violations.push({
        rule: 'no-tier1-redefinition',
        varName,
        message: `Cannot redefine Tier 1 primitive "${varName}"`,
      });
      continue;
    }

    // Rule: no-tier2-locked-override
    if (TIER2_LOCKED_PREFIXES.includes(category)) {
      violations.push({
        rule: 'no-tier2-locked-override',
        varName,
        message: `Cannot override locked Tier 2 semantic "${varName}"`,
      });
      continue;
    }

    // Only Tier 2 overridable and Tier 3 component tokens are allowed
    const allowed = TIER2_OVERRIDABLE_PREFIXES.includes(category) || category === TIER3_PREFIX;
    if (!allowed) {
      violations.push({
        rule: 'not-on-whitelist',
        varName,
        message: `"${varName}" is not on the override whitelist`,
      });
      continue;
    }

    // Rule: why-comment-required — every overridable declaration must have a preceding WHY: comment
    if (!leadingComment) {
      violations.push({
        rule: 'why-comment-required',
        varName,
        message: `Missing /* WHY: ... */ comment before "${varName}"`,
      });
      continue;
    }
    const whyMatch = WHY_RE.exec(leadingComment);
    if (!whyMatch) {
      violations.push({
        rule: 'why-comment-required',
        varName,
        message: `Comment before "${varName}" must start with WHY:`,
      });
      continue;
    }

    // Rule: why-comment-substance — the WHY body must be substantive (≥20 chars, no placeholders)
    const whyBody = whyMatch[1].trim();
    const placeholderTokens = ['TBD', 'TODO', 'FIXME', 'placeholder', 'idk'];
    if (
      whyBody.length < 20 ||
      placeholderTokens.some(t => whyBody.toLowerCase().includes(t.toLowerCase()))
    ) {
      violations.push({
        rule: 'why-comment-substance',
        varName,
        message: `WHY: comment for "${varName}" is too short or contains placeholder text`,
      });
    }
  }

  return { file: filePath, violations };
}

export async function lintConsumerDir(dirPath, opts = {}) {
  const manifestName = opts.manifestName || '.zuga-design.json';
  const registryPath = opts.registryPath;

  const violations = [];

  const manifestPath = path.join(dirPath, manifestName);
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));

  if (registryPath) {
    // Resolve profile CSS relative to the package root (parent of consuming-repos.json)
    const profileFile = path.resolve(
      path.dirname(registryPath),
      'src',
      'profiles',
      `${manifest.profile}.css`,
    );
    try {
      await fs.access(profileFile);
    } catch {
      violations.push({
        rule: 'profile-must-be-registered',
        message: `Profile "${manifest.profile}" not found at ${profileFile}`,
      });
    }
  }

  return { violations };
}

// ── CLI entry ──────────────────────────────────────────────────────────────────
// Usage:
//   tokens-lint.mjs <file.css>        → lint a single CSS file
//   tokens-lint.mjs <directory>       → lint consumer directory (reads .zuga-design.json)
//   tokens-lint.mjs                   → lint cwd as consumer directory

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const target = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();

  // Resolve default registryPath: climb from __dirname up to package root
  // tokens-lint.mjs lives at <pkg>/scripts/tokens-lint.mjs
  const packageRoot = path.resolve(import.meta.dirname, '..');
  const defaultRegistryPath = path.join(packageRoot, 'consuming-repos.json');

  let allViolations = [];
  let fileCount = 0;

  try {
    const stat = await fs.stat(target);

    if (stat.isFile()) {
      // Single CSS file
      fileCount = 1;
      const result = await lintFile(target);
      allViolations = result.violations;
      for (const v of result.violations) {
        process.stdout.write(`${result.file}: [${v.rule}] ${v.message}\n`);
      }
    } else {
      // Directory — treat as consumer dir
      fileCount = 1;
      const result = await lintConsumerDir(target, {
        registryPath: defaultRegistryPath,
        manifestName: '.zuga-design.json',
      });
      allViolations = result.violations;
      for (const v of result.violations) {
        process.stdout.write(`${target}: [${v.rule}] ${v.message}\n`);
      }
    }
  } catch (err) {
    process.stderr.write(`tokens-lint: error — ${err.message}\n`);
    process.exit(2);
  }

  const summary = `tokens-lint: ${allViolations.length} violation${allViolations.length === 1 ? '' : 's'} across ${fileCount} file${fileCount === 1 ? '' : 's'}\n`;
  process.stdout.write(summary);
  process.exit(allViolations.length > 0 ? 1 : 0);
}
