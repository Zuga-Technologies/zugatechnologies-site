// Zuga brand package generator — per-brand, per-platform social assets for Gio.
// Three brands (Zuga / Ludus / Spiritus), each with its locked hue + real mark,
// emitted into a grab-and-go tree: brand-package/<brand>/<platform>/<file>.
//
//   node gen-brand-package.js            # full tree
//   node gen-brand-package.js --sample   # one avatar + one banner per brand
//
// Marks:
//   Zuga Z      — hardcoded glyph, solid lime  (professional avatars + wordmark)
//   Zuga robot  — public/zugabot-mark.svg, lime line-art (casual avatars)
//   Ludus head  — LudusOverlay/build/ludus-head-8bit.svg, purple pixel sprite
//   Spiritus orb— Spiritus/frontend/assets/icon.png, rose app icon (full-bleed)

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..', '..', '..', '..'); // -> E:/Programming
const OUT = path.join(__dirname, 'brand-package');
const BG = '#0a0a0a';            // near-black surface-0, shared by all brands
const INK = '#E8ECF1';           // wordmark light ink
const FONT = `'Segoe UI', Arial, sans-serif`;

const MARK = {
  zugaRobot: path.join(ROOT, 'apps/platform/zugatechnologies-site/public/zugabot-mark.svg'),
  ludusHead: path.join(ROOT, 'apps/gaming/LudusOverlay/build/ludus-head-8bit.svg'),
  spiritusOrb: path.join(ROOT, 'apps/wellness/Spiritus/frontend/assets/icon.png'),
};

// Zuga Z glyph in a 64 viewBox (same geometry as the favicon), solid lime.
const Z_PATH = 'M12 12 H52 L31 42 H52 V52 H12 L33 22 H12 Z';

const BRANDS = {
  zuga:     { name: 'ZUGA TECHNOLOGIES', accent: '#a3e635', wordmarkLead: 'ZUGA', wordmarkRest: 'TECHNOLOGIES' },
  ludus:    { name: 'LUDUS',    accent: '#a855f7', wordmarkLead: 'LUDUS', wordmarkRest: '' },
  spiritus: { name: 'SPIRITUS', accent: '#fb7185', wordmarkLead: 'SPIRITUS', wordmarkRest: '' },
};

// platform -> { avatar: px, banner: [w,h], mark: 'Z'|'robot'|'head'|'orb' }
const PLATFORMS = {
  // 2026-07-07 (Buga): the robot IS the logo — no more Z-glyph avatars (neither
  // this file's lime Z nor gen-social.js's cyan-gradient Z). Robot on every
  // zuga surface; platforms the old social/ set covered now live here too.
  // BRAND surfaces only: Substack + personal LinkedIn are Buga's personal
  // accounts, handled separately with their own images — not in this package.
  zuga: {
    x:         { avatar: 400,  banner: [1500, 500], mark: 'robot' },
    linkedin:  { avatar: 400,  banner: [1128, 191], mark: 'robot' }, // COMPANY page
    github:    { avatar: 500,  mark: 'robot' },
    threads:   { avatar: 1080, mark: 'robot' },
    discord:   { avatar: 512,  mark: 'robot' },
    instagram: { avatar: 1080, mark: 'robot' },
    tiktok:    { avatar: 1080, mark: 'robot' },
    youtube:   { avatar: 800,  banner: [2048, 1152], mark: 'robot' },
    facebook:  { avatar: 1024, banner: [1640, 624],  mark: 'robot' },
    reddit:    { avatar: 256,  banner: [1920, 384],  mark: 'robot' },
    twitch:    { avatar: 800,  banner: [1200, 480],  mark: 'robot' },
  },
  ludus: {
    youtube:   { avatar: 800,  banner: [2048, 1152], mark: 'head' },
    tiktok:    { avatar: 1080, mark: 'head' },
    reddit:    { avatar: 256,  banner: [1920, 384], mark: 'head' },
    twitch:    { avatar: 800,  banner: [1200, 480], mark: 'head' },
    discord:   { avatar: 512,  mark: 'head' },
  },
  spiritus: {
    tiktok:    { avatar: 1080, mark: 'orb' },
    instagram: { avatar: 1080, mark: 'orb' },
    youtube:   { avatar: 800,  banner: [2048, 1152], mark: 'orb' },
    reddit:    { avatar: 256,  banner: [1920, 384], mark: 'orb' },
    facebook:  { avatar: 1024, mark: 'orb' },
  },
};

function ensure(dir) { fs.mkdirSync(dir, { recursive: true }); }

// ---- mark renderers: return a PNG buffer of the mark at `size`, transparent bg ----
async function markZ(size, accent) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64"><path d="${Z_PATH}" fill="${accent}"/></svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}
async function markFromFile(file, size, opts = {}) {
  // Fit the mark inside `size` preserving aspect; nearest kernel keeps pixel art crisp.
  const density = opts.pixel ? 32 : 384; // low density for 16px sprite, upscaled nearest
  let img = sharp(file, file.endsWith('.svg') ? { density } : undefined)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: opts.pixel ? 'nearest' : 'lanczos3' });
  return img.png().toBuffer();
}
async function getMark(kind, size, accent) {
  if (kind === 'Z')     return markZ(size, accent);
  if (kind === 'robot') return markFromFile(MARK.zugaRobot, size, {});
  if (kind === 'head')  return markFromFile(MARK.ludusHead, size, { pixel: true });
  if (kind === 'orb')   return markFromFile(MARK.spiritusOrb, size, {}); // orb is full-bleed already
  throw new Error('unknown mark ' + kind);
}

// ---- avatar: full-bleed square, mark centered, survives circle crop ----
async function makeAvatar(px, markKind, accent, file) {
  if (markKind === 'orb') {
    // Orb icon is already a full-bleed square; just resize it.
    await sharp(MARK.spiritusOrb).resize(px, px, { fit: 'cover' }).png().toFile(file);
    return;
  }
  const inner = Math.round(px * (markKind === 'Z' ? 0.62 : 0.70));
  const mark = await getMark(markKind, inner, accent);
  const base = sharp({ create: { width: px, height: px, channels: 4, background: BG } });
  await base.composite([{ input: mark, gravity: 'center' }]).png().toFile(file);
}

// ---- banner: mark + wordmark lockup, centered on near-black ----
async function makeBanner(w, h, brand, markKind, file, markHOverride) {
  const markH = markHOverride ?? Math.round(h * 0.5);
  const fs2 = Math.round(markH * 0.42);
  const ls = Math.round(fs2 * 0.08);
  const gap = Math.round(markH * 0.4);

  const rest = brand.wordmarkRest
    ? `<tspan fill="${INK}" dx="${fs2 * 0.35}">${brand.wordmarkRest}</tspan>`
    : '';
  const textSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${Math.round(fs2 * 2)}">
    <text x="10" y="${Math.round(fs2 * 1.3)}" font-family="${FONT}" font-weight="700" font-size="${fs2}" letter-spacing="${ls}">
      <tspan fill="${brand.accent}">${brand.wordmarkLead}</tspan>${rest}
    </text></svg>`;
  const { data: textPng, info } = await sharp(Buffer.from(textSvg)).trim().png().toBuffer({ resolveWithObject: true });

  const totalW = markH + gap + info.width;
  const maxW = Math.round(w * 0.82);
  if (totalW > maxW) {
    // Lockup too wide for this canvas — shrink the whole unit and re-render.
    return makeBanner(w, h, brand, markKind, file, Math.floor(markH * (maxW / totalW)));
  }
  const mark = await getMark(markKind, markH, brand.accent);
  const left = Math.round((w - totalW) / 2);

  await sharp({ create: { width: w, height: h, channels: 4, background: BG } })
    .composite([
      { input: mark, left: left, top: Math.round((h - markH) / 2) },
      { input: textPng, left: left + markH + gap, top: Math.round((h - info.height) / 2) },
    ]).png().toFile(file);
}

async function run(sampleOnly) {
  ensure(OUT);
  let count = 0;
  for (const [brandKey, platforms] of Object.entries(PLATFORMS)) {
    const brand = BRANDS[brandKey];
    let firstAvatar = true, firstBanner = true;
    for (const [platform, spec] of Object.entries(platforms)) {
      if (sampleOnly && !firstAvatar && !(spec.banner && firstBanner)) continue;
      const dir = sampleOnly ? path.join(OUT, '_samples') : path.join(OUT, brandKey, platform);
      ensure(dir);
      const tag = sampleOnly ? `${brandKey}-${platform}-` : '';

      if (!sampleOnly || firstAvatar) {
        const af = path.join(dir, `${tag}${platform}-avatar-${spec.avatar}.png`);
        await makeAvatar(spec.avatar, spec.mark, brand.accent, af);
        console.log('avatar', brandKey, platform, spec.mark); count++;
        firstAvatar = false;
      }
      if (spec.banner && (!sampleOnly || firstBanner)) {
        const [bw, bh] = spec.banner;
        const bf = path.join(dir, `${tag}${platform}-banner-${bw}x${bh}.png`);
        await makeBanner(bw, bh, brand, spec.mark, bf);
        console.log('banner', brandKey, platform, `${bw}x${bh}`); count++;
        firstBanner = false;
      }
    }
  }
  console.log(`\nDone: ${count} assets -> ${OUT}`);
}

run(process.argv.includes('--sample')).catch(e => { console.error(e); process.exit(1); });
