import { describe, it, expect } from 'vitest';
import { lintFile, lintConsumerDir } from '../tokens-lint.mjs';
import path from 'node:path';

const fixtures = path.resolve(import.meta.dirname, 'fixtures');

describe('tokens-lint', () => {
  it('accepts valid overrides with WHY comments', async () => {
    const result = await lintFile(path.join(fixtures, 'valid-overrides.css'));
    expect(result.violations).toHaveLength(0);
  });

  it('rejects Tier 1 primitive redefinition', async () => {
    const result = await lintFile(path.join(fixtures, 'invalid-tier1-redefinition.css'));
    expect(result.violations).toContainEqual(expect.objectContaining({ rule: 'no-tier1-redefinition' }));
  });

  it('rejects overrides without WHY comment', async () => {
    const result = await lintFile(path.join(fixtures, 'missing-why.css'));
    expect(result.violations).toContainEqual(expect.objectContaining({ rule: 'why-comment-required' }));
  });

  it('rejects WHY comments shorter than 20 chars', async () => {
    const result = await lintFile(path.join(fixtures, 'short-why.css'));
    expect(result.violations).toContainEqual(expect.objectContaining({ rule: 'why-comment-substance' }));
  });

  it('rejects .zuga-design.json with unregistered profile', async () => {
    const registryPath = path.resolve(import.meta.dirname, '..', '..', 'consuming-repos.json');
    const result = await lintConsumerDir(fixtures, { registryPath, manifestName: '.zuga-design.unregistered.json' });
    expect(result.violations).toContainEqual(expect.objectContaining({ rule: 'profile-must-be-registered' }));
  });
});
