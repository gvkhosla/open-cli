# Open CLI

[opencli.co](https://opencli.co) is a curated directory of command-line tools.

It is built around a simple idea:
- find a useful CLI
- copy the install command
- run the first real command
- understand who built it
- see exact source-labeled metrics when available

## Stack
- Next.js
- TypeScript
- Tailwind CSS
- Vercel

## Local development

```bash
npm install
npm run dev
```

## Core content files

- Makers: `src/content/makers.json`
- CLI directory: `src/content/clis.json`
- Exact metrics cache: `src/content/cli-metrics.json`
- Builder launches: `src/content/builder-launches.json`

## Data philosophy

Open CLI keeps two kinds of data separate:

### 1. Editorial data
Curated by hand:
- name
- maker
- category
- install command
- docs links
- aliases
- tags
- use cases
- agent-readiness notes

### 2. Exact metrics
Fetched by script and stored in git:
- GitHub stars
- latest release activity
- license
- npm weekly downloads
- Homebrew installs (30d)
- crates recent downloads

If Open CLI cannot fetch an exact install metric for a tool, it does not invent one.

## Refresh metrics

```bash
npm run sync:metrics
```

This updates `src/content/cli-metrics.json` using:
- GitHub API
- npm downloads API
- Homebrew formula API
- crates.io API

The script prefers `GITHUB_TOKEN`, and falls back to `gh auth token` if available.

## Discover more builder-made CLIs

```bash
npm run discover:maker -- steipete
```

This prints candidate repos and npm packages for a maker so you can review them before adding them to the directory.

## Submit a CLI

Use the public submit flow:
- https://opencli.co/submit

That keeps the project easy to contribute to without adding a heavy backend.

## Links
- Production: https://opencli.co
- Official tools: https://opencli.co/official
- Makers: https://opencli.co/makers
- Submit: https://opencli.co/submit
- GitHub: https://github.com/gvkhosla/open-cli
