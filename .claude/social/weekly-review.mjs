#!/usr/bin/env node
// Sunday-eve social KPI review. Reads raw/*.json (n8n drops), rolls up into
// metrics.json, prints top + bottom performer per lane. Run:
//   node .claude/social/weekly-review.mjs
// ponytail: no framework, no deps. One runnable check at bottom of file.

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const METRICS = join(HERE, "metrics.json");
const RAW = join(HERE, "raw");

const store = JSON.parse(readFileSync(METRICS, "utf8"));

// lane lookup: platform name -> { lane, laneObj, platformObj }
const byPlatform = {};
for (const [laneName, lane] of Object.entries(store.lanes)) {
  for (const [plat, platObj] of Object.entries(lane.platforms)) byPlatform[plat] = { lane: laneName, laneObj: lane, platObj };
}

// ingest raw drops
let ingested = 0;
if (existsSync(RAW)) {
  for (const f of readdirSync(RAW)) {
    if (!f.endsWith(".json")) continue;
    const drop = JSON.parse(readFileSync(join(RAW, f), "utf8"));
    const plat = drop.platform || f.replace(/\.json$/, "");
    const entry = byPlatform[plat];
    if (!entry) { console.warn(`unknown platform: ${plat} (${f}) — skipped`); continue; }
    entry.platObj.last_week = { pulled_at: drop.pulled_at ?? null, signals: drop.signals ?? {}, lagging: drop.lagging ?? {} };
    ingested++;
  }
}

store.updated_at = new Date().toISOString();
store.week_of = new Date().toISOString().slice(0, 10);
writeFileSync(METRICS, JSON.stringify(store, null, 2) + "\n");

// report top/bottom per lane by a leading signal (first listed signal)
const score = (platObj, lane) => {
  if (!platObj.last_week?.signals) return null;
  const sig = lane.signals[0];
  return platObj.last_week.signals[sig];
};
console.log(`\n=== Social KPI weekly review — ${store.week_of} ===`);
console.log(`Ingested ${ingested} platform drop(s).\n`);
for (const [laneName, lane] of Object.entries(store.lanes)) {
  const ranked = Object.entries(lane.platforms)
    .map(([p, po]) => ({ p, s: score(po, lane) }))
    .filter(r => r.s != null && typeof r.s === "number")
    .sort((a, b) => b.s - a.s);
  console.log(`[${laneName}] leading signal: ${lane.signals[0]}`);
  if (!ranked.length) { console.log("  (no numeric data this week)\n"); continue; }
  console.log(`  top   : ${ranked[0].p} (${ranked[0].s})`);
  console.log(`  bottom: ${ranked[ranked.length - 1].p} (${ranked[ranked.length - 1].s})\n`);
}
// targets not set reminder
const needsTargets = Object.values(store.lanes).some(l => Object.values(l.platforms).some(p => p.targets?.needs === "buga"));
if (needsTargets) console.log("Reminder: KPI targets are [NEEDS BUGA] — set only after >=2wk baseline. See issue #55.");
