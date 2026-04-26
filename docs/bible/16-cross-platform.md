---
section: 16
title: Cross-platform
summary: Token usage in web, native desktop, mobile, overlays.
mikeCheckpoint: false
---

# 16. Cross-platform

> Authored: 2026-04-26
> Authoring task: see plan Task 27

Token names are stable across all platforms. The *delivery format* differs — Phase 0 ships CSS custom properties only. Phase 2 will introduce Style Dictionary to generate platform-native formats from the same DTCG-aligned JSON source. Phase 2 is a governance roadmap item (see §17); specific version commitments and transform configs will be captured in ADRs when that work begins.

---

## 16.1 Platform mapping table

| Platform | Phase | Format | Example |
|----------|-------|--------|---------|
| Web (any framework) | 0 — shipped | CSS custom property | `var(--color-cyan-500)` |
| Electron (overlay, desktop apps) | 0 — shipped | CSS custom property (identical to web) | `var(--color-cyan-500)` |
| Tauri WebView (Rust + web frontend) | 0 — shipped | CSS custom property (WebView renders Chromium) | `var(--color-cyan-500)` |
| Tauri + Swift (macOS native widgets) | 2 — planned | Style Dictionary `swift` transform | `Token.color.cyan.500` |
| Tauri + Kotlin (Android native) | 2 — planned | Style Dictionary `compose` transform | `Token.Color.Cyan500` |
| Windows AppSDK / WinUI 3 | 2 — planned | Style Dictionary `xaml` transform | `{StaticResource ColorCyan500}` |
| iOS native (if needed) | 2 — planned | Style Dictionary `swift` transform | `Token.color.cyan.500` |

### Why web and Electron are identical

Electron renders inside Chromium. The renderer process loads the same HTML/CSS as the web build. No translation layer needed — the same `@import "@zuga-technologies/design-tokens/tokens.css"` line works in both contexts. The overlay (ZugaGamerOverlay) already ships this way.

### Why Tauri WebView is also identical

Tauri's WebView wraps the OS webview engine (WKWebView on macOS, WebView2 on Windows). CSS custom properties work in all of these. The Rust side of Tauri doesn't need to know about design tokens — it manages the window chrome, not the UI content. If a future Tauri native widget (outside the WebView) needs tokens, that's a Phase 2 item.

---

## 16.2 Phase 2 migration path (Style Dictionary)

Phase 0 is the CSS layer only. The DTCG-aligned naming convention (`--color-{ramp}-{stop}`, `--space-{n}`, etc.) was chosen deliberately to map cleanly to the W3C Design Tokens spec and to Style Dictionary's property reference model.

When Phase 2 begins, the migration shape is:

```
packages/design-tokens/src/tokens.json    ← single source of truth (DTCG JSON)
         │
         ▼
   Style Dictionary
         │
    ┌────┴────────────────────┐
    │                         │
tokens.css                 swift/tokens.swift
(existing export,          (new, macOS native)
 auto-generated from JSON)
                           kotlin/Tokens.kt
                           (new, Android Compose)

                           xaml/Tokens.xaml
                           (new, WinUI 3)
```

The CSS export continues working identically for web and Electron. The new format outputs are additive. No consumer needs to change their web import.

Style Dictionary transform selection, output directory structure, and version pinning are deferred to Phase 2 ADRs. Do not pre-specify Style Dictionary versions or transform configs in this document.

---

## 16.3 Overlay considerations

ZugaGamerOverlay (Electron) and ZugaTraderOverlay (Electron) are the primary overlay consumers today. Both import `@zuga-technologies/design-tokens/tokens.css` via their profile import chain. The overlay-gamer and overlay-trader profile files live in `packages/design-tokens/src/profiles/`.

Overlays have one additional concern: performance. The full `tokens.css` is ~350 lines; this is negligible for web apps but acceptable to audit in overlay contexts where startup latency is visible. If an overlay requires a stripped token set for startup performance, that is a Phase 2 optimization — add an ADR, don't create a parallel token file.

---

## 16.4 What does not change across platforms

Token **names** are the cross-platform contract, not values. When a native platform generates `Token.color.cyan.500`, it resolves to the same hex value (`#06b6d4`) as `--color-cyan-500` in CSS. The translation is purely syntactic. The semantic meaning, the WCAG compliance thresholds, and the RACI ownership are all identical regardless of delivery format.
