---
section: 9
title: Imagery & Illustration
summary: Photography direction, illustration style, do/don't.
mikeCheckpoint: false
---

# 9. Imagery & Illustration

> Authored: 2026-04-25
> Mike checkpoints: none (Antonio-final)

This section sets sourcing and treatment rules for photography and illustration. These are design constraints that apply when anyone on the team — engineer, marketer, or contractor — is choosing or producing imagery for a Zuga surface.

---

## 9.1 Photography direction

**Mood:** Engineered, considered, AGI-future.

Translated into rules:

1. **Real production over stock.** Prefer screenshots and recordings of actual Zuga products — real ZugaApp dashboards, real ZugaTrader charts mid-session, real ZugaLife habit completions. These images are self-documenting and brand-authentic. Stock photos of "technology" are not.
2. **Dark surfaces preferred for dark-mode-first products.** When showcasing a Zuga product on marketing surfaces, use dark-mode screenshots unless the studio is explicitly light-mode (ZugaLife wellness surfaces are acceptable either way). Dark backgrounds make the cyan and emerald accent colors read at full saturation.
3. **Minimal post-processing.** No heavy color grading, no lens flares, no Instagram-filter warmth. Light adjustments for brightness and contrast are acceptable. The goal is "what it actually looks like to use this," not "what we wish it looked like."
4. **Environment context, not people.** When context shots are needed, show the environment where the product is used (a trading setup, a code editor, a game stream) rather than staged photos of people interacting with it. If a person must appear, they should be doing something real, not posed.
5. **Technical precision over lifestyle aspiration.** Charts should be legible. Code should be real. UI states should be accurate. A screenshot of a ZugaTrader signal firing is more credible than a photo of a phone floating in front of a sunset.
6. **Avoid imagery that ages.** Hardware, fashion, and desktop wallpapers date screenshots. Use neutral environments. Blur or crop out incidental third-party branding where possible.

---

## 9.2 Illustration style

Illustration is geometric, abstract, and uses a limited palette drawn from the token system.

**Style rules:**

- **Geometric, not organic.** Shapes are rectangles, circles, lines, and their combinations. No hand-drawn or loose-stroke illustration. The visual vocabulary is system-level, not artisanal.
- **Abstract over literal.** An illustration representing ZugaTrader does not need to be a picture of a chart. It can be a grid of lines that implies data flow. Abstraction ages better and travels across cultural contexts without misreading.
- **Limited palette.** Master Zuga palette for illustration: `--color-cyan-500` / `--color-cyan-400` (primary), `--color-slate-800` / `--color-slate-700` (background mass), `--color-slate-300` (secondary structural elements). Sub-brand accent colors are allowed when the illustration is scoped to one studio. Do not introduce colors outside the token system.
- **Single-color preferred for small contexts.** At icon-lg size and below, use single-color (monochrome). Multi-color illustration is reserved for hero sections and feature callouts at larger sizes.
- **No gradients from outside the palette.** If a gradient is used (e.g., a hero background fill), it must be composed from stops within the token color ramps — not from arbitrary interpolated hues.

---

## 9.3 Hero patterns

Hero sections (corp landing, studio feature pages) use geometric background patterns to add depth without photographic complexity.

**Acceptable hero pattern treatments:**

- **Grid overlays:** A fine-line grid (1px `--color-slate-700` at 8–12% opacity) on `--surface-inverse` communicates precision and structure. Common in ZugaTrader and ZugaCode hero sections.
- **Dot fields:** Regularly-spaced dot grids (same opacity treatment) work for more open, spacious contexts like ZugaLife and ZugaCloud.
- **Diagonal line fields:** Sparse hatching at 30-45° adds texture to marketing surfaces without weight. Use `--color-slate-600` at 10-15% opacity.

**What patterns are not:**

- Not brand illustrations. A hero pattern is a background texture — it does not carry narrative.
- Not full-bleed photography replacements. They accompany UI screenshots or illustration; they don't stand alone as a hero "image."

Hero patterns are Phase 1 — elaborate-on-need. The corp landing site currently uses a combination of grid overlay and feature product screenshots. That combination is the working baseline.

---

## 9.4 Do / Don't

### Do

- **Do** use real ZugaApp, ZugaTrader, or ZugaLife product screenshots on marketing surfaces.
- **Do** show UI in the actual state a user would see it — data visible, not empty states.
- **Do** use dark-mode product screenshots on dark marketing backgrounds.
- **Do** apply minimal exposure/contrast correction to screenshots for web (brighten highlights slightly for readability on marketing surfaces).
- **Do** use geometric illustration at icon-lg size for empty states and feature callouts.
- **Do** use the corp landing geometric grid pattern as a hero background texture.
- **Do** source custom photos of actual hardware setups (trading station, code workstation) when environment context is needed.

### Don't

- **Don't** use stock photography of people at computers, at whiteboards, or in "team collaboration" poses — especially the trope of strangers laughing at laptops.
- **Don't** use imagery that implies features or UI states that aren't shipped — no Figma mockups of unreleased flows, no screenshots annotated with speculative data.
- **Don't** use imagery sourced from generic "AI / technology" stock libraries (glowing neural networks, floating holographic interfaces, futuristic cityscapes).
- **Don't** use screenshots from competitor products — even as "context" or "comparison."
- **Don't** use UI mockups (Figma frames, browser chrome templates) in place of real product screenshots. If the product isn't built yet, use illustration or describe it in text.
- **Don't** apply heavy photo filters, dramatic vignettes, or color grading that changes the perceived color of the Zuga UI.
- **Don't** use imagery that shows outdated versions of the UI — keep screenshots current to the deployed product.
