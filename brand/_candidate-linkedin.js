// Candidate LinkedIn company cover (1128x191) — tagline + subtle motif.
// Standalone preview; if approved, folds into gen-social.js.
const sharp = require('sharp');
const path = require('path');
const OUT = path.join(__dirname, 'social');

const BG = '#14161B';
const GRAD_TOP = '#5FB5CF';
const GRAD_BOT = '#3D8FB6';
const INK = '#B8BACB';
const WHITE = '#E8ECF1';
const Z_PATH = 'M12 12 H52 L31 42 H52 V52 H12 L33 22 H12 Z'; // 64x64 viewBox

const W = 1128, H = 191;
const LX = 210;            // lockup left (glyph) — clears LinkedIn logo overlap
const markH = 70;
const markY = 30;
const fsWord = 30;         // wordmark
const fsTag = 25;          // tagline
const s = markH / 64;
const markX = LX - markH * (12 / 64); // so glyph left aligns at LX
const glyphW = markH * (40 / 64);
const gap = 24;
const wordX = LX + glyphW + gap;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="zgrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${GRAD_TOP}"/>
      <stop offset="100%" stop-color="${GRAD_BOT}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${GRAD_TOP}" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="${GRAD_TOP}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.6" fill="${GRAD_TOP}" fill-opacity="0.07"/>
    </pattern>
    <linearGradient id="dotfade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#000" stop-opacity="0"/>
      <stop offset="55%" stop-color="#fff" stop-opacity="1"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="1"/>
    </linearGradient>
    <mask id="dotmask"><rect width="${W}" height="${H}" fill="url(#dotfade)"/></mask>
  </defs>

  <rect width="${W}" height="${H}" fill="${BG}"/>
  <ellipse cx="950" cy="170" rx="360" ry="240" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#dots)" mask="url(#dotmask)"/>

  <g transform="translate(${markX},${markY}) scale(${s})"><path d="${Z_PATH}" fill="url(#zgrad)"/></g>

  <text x="${wordX}" y="${markY + markH * 0.70}" font-family="'Segoe UI', Arial, sans-serif" font-weight="700" font-size="${fsWord}" letter-spacing="2.4">
    <tspan fill="${GRAD_TOP}">ZUGA</tspan><tspan fill="${WHITE}" dx="${fsWord * 0.35}">TECHNOLOGIES</tspan>
  </text>

  <text x="${LX}" y="${markY + markH + 38}" font-family="'Segoe UI', Arial, sans-serif" font-weight="400" font-size="${fsTag}" letter-spacing="0.3">
    <tspan fill="${INK}">Software for the agent era.</tspan><tspan fill="${GRAD_TOP}" dx="6" font-weight="700">_</tspan>
  </text>
</svg>`;

sharp(Buffer.from(svg)).png().toFile(path.join(OUT, '_candidate-linkedin.png'))
  .then(() => console.log('wrote _candidate-linkedin.png'));
