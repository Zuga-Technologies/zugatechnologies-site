import { describe, it, expect } from 'vitest';
import { extractCheckpoints, validateCheckpoints, buildReviewDoc } from '../aggregate-mike-review.mjs';
import path from 'node:path';

const fixtureDir = path.resolve(import.meta.dirname, 'fixtures', 'sample-bible');

describe('aggregate-mike-review', () => {
  it('extracts all checkpoints from markdown corpus', async () => {
    const checkpoints = await extractCheckpoints(fixtureDir);
    expect(checkpoints).toHaveLength(3);
    expect(checkpoints.map(c => c.key)).toEqual(['MIKE-CHECKPOINT-h01', 'MIKE-CHECKPOINT-tag01', 'MIKE-CHECKPOINT-bad01']);
  });

  it('validates that every checkpoint has populated draft', async () => {
    const checkpoints = await extractCheckpoints(fixtureDir);
    const result = validateCheckpoints(checkpoints);
    expect(result.invalid).toContainEqual(expect.objectContaining({ key: 'MIKE-CHECKPOINT-bad01', reason: expect.stringMatching(/draft/i) }));
  });

  it('groups checkpoints into 6 buckets by prefix', async () => {
    const checkpoints = await extractCheckpoints(fixtureDir);
    const doc = buildReviewDoc(checkpoints);
    expect(doc).toMatch(/## Bucket — Color hues/);
    expect(doc).toMatch(/## Bucket — Tagline/);
  });
});
