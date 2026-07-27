# raw/ — per-platform n8n output drops

n8n workflows drop one `<platform>.json` per pull here. See `../README.md` for
the output contract. These files are gitignored (transient raw data); only the
rolled-up `../metrics.json` is committed.

Platform filenames: `linkedin.json`, `x.json`, `substack.json`, `threads.json`,
`tiktok.json`, `youtube.json`, `instagram.json`, `reddit.json`, `discord.json`,
`twitch.json`, `facebook_groups.json`.
