# Social KPI metrics store

Wiring for issue #55 — the one autonomous deliverable from the Social KPIs order.
The KPI *framework* (which signal each platform's algorithm weights) and the
*targets* live in the Hivemind playbook `marketing/social-playbook` (Buga-owned).
This dir is the **data plane**: it collects the raw numbers that make targets
possible and feeds the weekly review.

## Layout

```
.claude/social/
  metrics.json          rolled-up store (this is what the review reads)
  weekly-review.mjs     Sunday-eve script: raw/*.json -> metrics.json + top/bottom per lane
  raw/                  per-platform n8n output drops (one file per platform per pull)
    README.md           n8n output contract
```

## n8n output contract (per-platform)

Each platform's n8n workflow writes **one JSON file** to `raw/<platform>.json`
on every pull (weekly, before the Sunday review). Shape:

```json
{
  "platform": "linkedin",
  "pulled_at": "2026-07-27T22:00:00-04:00",
  "window": { "from": "2026-07-20", "to": "2026-07-27" },
  "signals": {
    "replies": 12,
    "saves": 4,
    "dwell_see_through_rate": 0.38,
    "first_60_min_reply_rate": 0.25
  },
  "lagging": { "follower_growth": 9 }
}
```

Only `platform`, `pulled_at`, and `signals` are required; `window` and `lagging`
are optional but expected. Keys under `signals` should match the lane's signal
list in `metrics.json`. Unknown keys are preserved, not dropped.

## What is NOT set here

- **KPI targets** — `[NEEDS BUGA]`. Set only after ≥2 weeks of real baseline
  data exist in `metrics.json`. Do not invent pre-launch (issue #55 rule).
- **Review cadence confirmation** — proposed Sunday eve; Buga confirms.
- **Flush-vs-pause gates** — proposed in `metrics.json.queue_flush_vs_pause`;
  Buga confirms.

Until those are confirmed, this dir captures the framework + the data pipeline
so baseline can accrue. Targets fill in afterwards.
