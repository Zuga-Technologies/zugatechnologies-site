import { describe, it, expect } from 'vitest';
import { findApprovedCheckpoints, applyApproval } from '../propagate-mike-approvals.mjs';

describe('propagate-mike-approvals', () => {
  it('finds [MIKE-APPROVED-*] entries in MIKE-REVIEW.md', () => {
    const reviewDoc = `
### MIKE-CHECKPOINT-h01
[MIKE-APPROVED-h01: 2026-04-30] hex=#0891b2

### MIKE-CHECKPOINT-tag01
[MIKE-CHECKPOINT-tag01]   <!-- still pending -->
`;
    const approved = findApprovedCheckpoints(reviewDoc);
    expect(approved).toHaveLength(1);
    expect(approved[0]).toMatchObject({ key: 'MIKE-APPROVED-h01', date: '2026-04-30', value: '#0891b2' });
  });

  it('applies approval to source markdown by replacing the marker', () => {
    const sourceMd = `
The accent is [MIKE-CHECKPOINT-h01].
`;
    const result = applyApproval(sourceMd, { key: 'MIKE-CHECKPOINT-h01', date: '2026-04-30', value: '#0891b2' });
    expect(result).toContain('[MIKE-APPROVED-h01: 2026-04-30] hex=#0891b2');
    expect(result).not.toContain('[MIKE-CHECKPOINT-h01]');
  });
});
