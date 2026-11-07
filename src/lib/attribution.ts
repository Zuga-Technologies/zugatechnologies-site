// Where did this waitlist signup come from? Built from the landing URL's
// utm_source / utm_medium, e.g. ?utm_source=twitch&utm_medium=chat -> "twitch/chat".
// Sent to the waitlist API as the optional `source` field (max 64 chars; the
// backend ignores it until the column ships, so sending early is harmless).
export const SOURCE_MAX = 64;

export function buildSource(search: string): string | undefined {
  const params = new URLSearchParams(search);
  const parts = [params.get('utm_source'), params.get('utm_medium')]
    .map((v) => (v || '').trim().toLowerCase())
    .filter(Boolean);
  const src = parts.join('/').slice(0, SOURCE_MAX);
  return src || undefined;
}
