import { describe, expect, it } from 'vitest';
import { buildSource, SOURCE_MAX } from './attribution';

describe('buildSource', () => {
  it('joins utm_source and utm_medium', () => {
    expect(buildSource('?utm_source=twitch&utm_medium=chat')).toBe('twitch/chat');
  });
  it('accepts either one alone', () => {
    expect(buildSource('?utm_source=twitch')).toBe('twitch');
    expect(buildSource('?utm_medium=chat')).toBe('chat');
  });
  it('is undefined with no utm params (so the field is omitted from the POST)', () => {
    expect(buildSource('')).toBeUndefined();
    expect(buildSource('?ref=ABC123')).toBeUndefined();
    expect(buildSource('?utm_source=&utm_medium=%20')).toBeUndefined();
  });
  it('lowercases and trims', () => {
    expect(buildSource('?utm_source=%20Twitch%20&utm_medium=Chat')).toBe('twitch/chat');
  });
  it('caps at 64 chars', () => {
    const out = buildSource('?utm_source=' + 'a'.repeat(200));
    expect(out).toHaveLength(SOURCE_MAX);
  });
});
