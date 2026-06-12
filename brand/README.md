# Zuga Technologies — brand & social assets

Source of truth for the Z mark is the vector in `../public/favicon.svg`
(colors: bg `#14161B`, gradient `#5FB5CF` → `#3D8FB6`).

`gen-social.js` regenerates everything in `social/` from that vector:

```
node gen-social.js
```

## Which file goes where

| Platform | Profile / icon | Banner / cover |
|---|---|---|
| X (Twitter) | `x-profile-400.png` | `x-header-1500x500.png` |
| Reddit | `reddit-icon-256.png` | `reddit-banner-1920x384.png` |
| YouTube | `youtube-avatar-800.png` | `youtube-banner-2048x1152.png` |
| Facebook | `facebook-profile-1024.png` | `facebook-cover-1640x624.png` |
| Instagram / Threads | `instagram-profile-1080.png` | — |
| TikTok | `tiktok-profile-1080.png` | — |
| LinkedIn | `linkedin-logo-400.png` | `linkedin-cover-1128x191.png` |
| Discord | already set — Zugabot robot (`../public/zugabot-discord-512.png`); `discord-server-512.png` is a spare Z version | — |
| Twitch | `twitch-profile-800.png` | `twitch-banner-1200x480.png` |
| GitHub org | `github-org-500.png` | — |
| Bluesky | `bluesky-avatar-1000.png` | — |
| Link previews (OG image) | — | `og-card-1200x630.png` |

## Notes

- Avatars are **full-bleed** (background to the edges) so they survive the
  circle crop every platform applies. The Z glyph sits safely inside the
  inscribed circle. Do NOT upload the rounded-corner version as an avatar —
  the transparent corners show through circle masks.
- The YouTube banner keeps the lockup inside the 1235×338 TV-safe center area.
- Masters: `zuga-mark-fullbleed-2048.png` (resize for anything square),
  `zuga-mark-rounded-1024.png` (app-icon style, transparent corners),
  `zuga-mark-transparent-1024.png` (glyph only, for compositing on photos/posts).
