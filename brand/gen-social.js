// Generate social-media logo assets from the vector Z mark (source: public/favicon.svg)
const sharp = require('sharp');
const path = require('path');
const OUT = path.join(__dirname, 'social');

const BG = '#14161B';
const GRAD_TOP = '#5FB5CF';
const GRAD_BOT = '#3D8FB6';
const Z_PATH = 'M12 12 H52 L31 42 H52 V52 H12 L33 22 H12 Z'; // 64x64 viewBox

const defs = `
  <defs>
    <linearGradient id="zgrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${GRAD_TOP}"/>
      <stop offset="100%" stop-color="${GRAD_BOT}"/>
    </linearGradient>
  </defs>`;

// Z mark group scaled to a box: mark drawn in 64-unit space, scaled so the
// glyph (spans 12..52) sits centered in a box of `size` at (x, y)
function zMark(x, y, size) {
  const s = size / 64;
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="${Z_PATH}" fill="url(#zgrad)"/></g>`;
}

// Full-bleed square avatar — background to the edges, survives circle crops
function avatarSvg(px) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 64 64">${defs}
    <rect width="64" height="64" fill="${BG}"/>
    <path d="${Z_PATH}" fill="url(#zgrad)"/>
  </svg>`;
}

// Rounded app-icon style (transparent corners)
function roundedSvg(px) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 64 64">${defs}
    <rect width="64" height="64" rx="14" fill="${BG}"/>
    <path d="${Z_PATH}" fill="url(#zgrad)"/>
  </svg>`;
}

// Z glyph only, transparent background
function markOnlySvg(px) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}" viewBox="0 0 64 64">${defs}
    <path d="${Z_PATH}" fill="url(#zgrad)"/>
  </svg>`;
}

const FONT = `'Segoe UI', Arial, sans-serif`;

// Horizontal lockup banner: Z mark + ZUGA TECHNOLOGIES, centered as a unit.
// Two-pass: render the wordmark alone, trim to measure its true pixel width,
// then compose mark + text with exact centering.
async function makeBanner(w, h, opts = {}, file) {
  const markH = opts.markH ?? Math.round(h * 0.5);
  const fs = Math.round(markH * 0.42);
  const ls = Math.round(fs * 0.08);
  const gap = Math.round(markH * 0.35);

  const textSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${Math.round(fs * 2)}">
    <text x="10" y="${Math.round(fs * 1.3)}" font-family="${FONT}" font-weight="700" font-size="${fs}" letter-spacing="${ls}">
      <tspan fill="${GRAD_TOP}">ZUGA</tspan><tspan fill="#E8ECF1" dx="${fs * 0.35}">TECHNOLOGIES</tspan>
    </text>
  </svg>`;
  const { data: textPng, info } = await sharp(Buffer.from(textSvg))
    .trim().png().toBuffer({ resolveWithObject: true });

  const glyphW = markH * (40 / 64);
  const totalW = glyphW + gap + info.width;
  const maxW = opts.maxW ?? Math.round(w * 0.72);
  if (totalW > maxW) {
    return makeBanner(w, h, { ...opts, markH: Math.floor(markH * (maxW / totalW)) }, file);
  }
  const left = (w - totalW) / 2;
  const markX = left - markH * (12 / 64); // glyph starts at 12/64 of the mark box
  const markY = (h - markH) / 2;

  const baseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${defs}
    <rect width="${w}" height="${h}" fill="${BG}"/>
    ${zMark(markX, markY, markH)}
  </svg>`;

  await sharp(Buffer.from(baseSvg))
    .composite([{ input: textPng, left: Math.round(left + glyphW + gap), top: Math.round((h - info.height) / 2) }])
    .png().toFile(path.join(OUT, file));
  console.log('wrote', file);
}

// Stacked lockup: mark centered, wordmark beneath (for tall canvases / OG card)
function stackedSvg(w, h, opts = {}) {
  const markH = opts.markH ?? Math.round(h * 0.42);
  const fs = Math.round(markH * 0.28);
  const blockH = markH + fs * 1.9;
  const topY = (h - blockH) / 2;
  const markX = (w - markH) / 2;
  const textY = topY + markH + fs * 1.4;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${defs}
    <rect width="${w}" height="${h}" fill="${BG}"/>
    ${zMark(markX, topY, markH)}
    <text x="${w / 2}" y="${textY}" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="${fs}" letter-spacing="${Math.round(fs * 0.12)}">
      <tspan fill="${GRAD_TOP}">ZUGA</tspan><tspan fill="#E8ECF1" dx="${fs * 0.4}">TECHNOLOGIES</tspan>
    </text>
  </svg>`;
}

async function png(svg, file) {
  await sharp(Buffer.from(svg)).png().toFile(path.join(OUT, file));
  console.log('wrote', file);
}

(async () => {
  // --- Avatars / profile pictures (full bleed, circle-crop safe) ---
  await png(avatarSvg(400), 'x-profile-400.png');            // X (Twitter)
  await png(avatarSvg(256), 'reddit-icon-256.png');          // Reddit community icon
  await png(avatarSvg(800), 'youtube-avatar-800.png');       // YouTube channel
  await png(avatarSvg(1024), 'facebook-profile-1024.png');   // Facebook page
  await png(avatarSvg(1080), 'instagram-profile-1080.png');  // Instagram (Threads uses this too)
  await png(avatarSvg(1080), 'tiktok-profile-1080.png');     // TikTok
  await png(avatarSvg(400), 'linkedin-logo-400.png');        // LinkedIn company logo
  await png(avatarSvg(512), 'discord-server-512.png');       // Discord server icon
  await png(avatarSvg(800), 'twitch-profile-800.png');       // Twitch
  await png(avatarSvg(500), 'github-org-500.png');           // GitHub org avatar
  await png(avatarSvg(1000), 'bluesky-avatar-1000.png');     // Bluesky

  // --- Banners / covers ---
  await makeBanner(1500, 500, {}, 'x-header-1500x500.png');
  await makeBanner(1920, 384, {}, 'reddit-banner-1920x384.png');
  await makeBanner(2048, 1152, { markH: 220, maxW: 1150 }, 'youtube-banner-2048x1152.png'); // safe area 1235x338 center
  await makeBanner(1640, 624, {}, 'facebook-cover-1640x624.png');
  await makeBanner(1128, 191, { markH: 110 }, 'linkedin-cover-1128x191.png');
  await makeBanner(1200, 480, {}, 'twitch-banner-1200x480.png');

  // --- Link-preview card (OG image for X/Facebook/Discord embeds) ---
  await png(stackedSvg(1200, 630), 'og-card-1200x630.png');

  // --- Master files ---
  await png(avatarSvg(2048), 'zuga-mark-fullbleed-2048.png');
  await png(roundedSvg(1024), 'zuga-mark-rounded-1024.png');
  await png(markOnlySvg(1024), 'zuga-mark-transparent-1024.png');
})();
