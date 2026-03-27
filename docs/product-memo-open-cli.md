# Open CLI — Product Memo

## Product thesis

Open CLI should be the **trusted guide for choosing and using the right CLI for a real job**.

Not a giant directory.  
Not a launch feed.  
Not a docs mirror.

It should help a developer go from:

**“I need to do X”**  
to  
**“Here’s the CLI I should use, why it’s the right choice, and the first safe commands to run.”**

## Target user

**Primary user:**  
Developers who work in the terminal and increasingly use coding agents.

They are trying to do jobs like:

- deploy an app
- review PRs
- inspect a database
- automate a browser workflow
- run local AI tools

They do **not** want to:

- browse 20 repos
- guess which CLI is trustworthy
- stitch together docs from scratch
- follow random hype from X

## Core problem

There are too many CLI tools, too many new launches, and too little judgment.

People don’t just need discovery. They need:

1. **selection** — which tool should I use?
2. **trust** — is this legit and worth adopting?
3. **activation** — what should I run first?
4. **operationalization** — how do I make this reusable in my workflow or agent setup?

## Product definition

**Open CLI is an opinionated task-to-tool-to-workflow product for developers.**

It should do 3 things well:

### 1. Recommend
Given a job, recommend the best CLI.

### 2. Explain
Show why this tool fits, when not to use it, and what the tradeoffs are.

### 3. Operationalize
Give the first safe commands, verify step, and an agent-ready export.

## What Open CLI is not

To stay focused, Open CLI is **not**:

- a complete database of every CLI
- Product Hunt for terminal tools
- a raw feed of launches from X
- a generic AI search engine over GitHub repos
- a package manager

Those can support the product, but they should not define it.

## Core user promise

When a user comes to Open CLI, they should reliably get:

- the right CLI for the job
- a clear reason to trust that choice
- the first safe workflow to try
- a reusable setup for agent workflows

## Core experience

### Input
User describes a job in plain English.

Examples:

- “deploy my Next.js app”
- “inspect my Postgres schema”
- “review open PRs”
- “test a signup flow in the browser”

### Output
Open CLI returns:

- **recommended CLI**
- **why this tool**
- **watch-outs / caveats**
- **install command**
- **verify command**
- **first real command**
- **alternatives with tradeoffs**
- **agent-ready export**

That is the product.

## Non-goals

For now, do **not** optimize for:

- exhaustive coverage
- tracking every launch
- social/feed mechanics
- personalized accounts/workspaces
- running CLIs in-browser
- deep analytics dashboards

These are distractions unless they directly improve the core job.

## Why this can win

Most sources do one of these well:

- discovery
- hype
- raw docs
- popularity metrics

Very few combine:

- **judgment**
- **comparison**
- **safe activation**
- **agent readiness**

That combination is the moat.

## V1

### Goal
Make Open CLI clearly useful for high-frequency developer jobs.

### V1 scope
Focus on a small set of high-confidence jobs:

- deploy
- GitHub / PR review
- database inspection
- browser automation
- local AI

### V1 features
- task-first homepage
- one recommended CLI + 2–3 alternatives
- why this tool / why not
- install + verify + first safe command
- `SKILL.md` export
- CLI detail pages as decision pages, not reference pages

### V1 success
A new visitor can:

1. describe a job
2. get a recommendation
3. trust the answer
4. run the first safe step
5. export a reusable setup

## V2

Once the core loop is working, add:

### 1. CLI Radar
A curated feed of new CLIs that are actually worth attention.

For each:
- what it’s for
- whether it beats the incumbent
- whether it’s trustworthy
- whether to try now / wait / skip

### 2. Better workflow packs
Make exports more tailored to Claude, Codex, Cursor, etc.

### 3. Stronger comparisons
“Choose this over X when…”

## Product litmus test

A feature belongs in Open CLI if it helps answer one of these:

- What tool should I use?
- Why should I trust it?
- What should I run first?
- How do I make this reusable?

If it doesn’t help one of those, it’s probably noise.

## Final product statement

**Open CLI helps developers choose the right CLI for a real task, trust the choice, and start using it safely — with agent-ready workflows built in.**
