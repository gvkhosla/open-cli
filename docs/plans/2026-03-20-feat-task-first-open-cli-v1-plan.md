---
title: feat: Task-first Open CLI v1
type: feat
date: 2026-03-20
---

# Task-first Open CLI v1

## Overview

Open CLI should stop feeling like a list of tools and start feeling like a guide that helps someone go from "I need to do this job" to "I know what to install and what to run next."

The current product is already close. It has strong editorial data, useful tool metadata, and the beginning of a task-first experience in the Supercharge flow. V1 should make that task-first flow the main product and turn the directory into supporting infrastructure.

## Problem Statement

Right now the site is strongest as a searchable catalog, but weaker as a decision tool.

This creates a few problems:

- People still have to browse and compare too much before acting.
- Popularity data is visible, but trust and fit are not explained clearly enough.
- The most useful concept in the product, "task -> tool -> verify -> reusable agent setup", is present but not yet the main experience.
- The site does not yet create a strong artifact people can take away and use in their agent environment.

## Product Goal

Help a person answer four questions fast:

1. What tool should I use for this job?
2. Why this one over the others?
3. What is the safest first command?
4. How do I turn this into a repeatable agent capability?

## Success Criteria

V1 succeeds if a new visitor can:

- Describe a job in plain words and get a clear recommended CLI.
- Understand why that CLI was chosen.
- Copy an install command and a verify command with confidence.
- Export a reusable setup artifact for their agent workflow.
- Discover reasonable alternatives without falling back into open-ended browsing.

## Non-goals

V1 does not need to:

- Become a full marketplace or package manager.
- Support account systems, saved workspaces, or personalization.
- Add live execution of CLI commands in the browser.
- Build a complex scoring or recommendation engine beyond the current local heuristics.
- Cover every CLI category perfectly before launch.

## Guiding Principles

- Start from the user's job, not the tool name.
- Explain choices in plain language.
- Show the next safe step, not just the install step.
- Separate "fit", "trust", and "popularity" instead of blending them into one vague score.
- Keep the directory, but make it serve the guided flow.

## Current Strengths To Preserve

- Hand-curated tool metadata in `src/content/clis.json`
- Exact source-labeled metrics in `src/content/cli-metrics.json`
- Search ranking that already understands tasks in `src/data/clis.ts`
- The Supercharge recommendation concept in `src/components/supercharge-agent.tsx`
- Rich CLI detail pages with install, workflow, and safety fields in `src/app/cli/[slug]/page.tsx`

## Proposed V1 Experience

### Core user journey

1. User lands on the homepage.
2. User describes the job in plain words.
3. Open CLI recommends one primary tool and 2-3 alternatives.
4. The page explains:
   - why this tool fits
   - what must be set up first
   - what command verifies readiness
   - what risks or limits matter
5. User can export a reusable artifact:
   - `SKILL.md`
   - copyable setup brief
   - optionally agent-specific format later
6. User can inspect the deeper CLI page if they want more detail.

### Homepage changes

The homepage becomes a guided chooser, not a ranked table.

Primary section:

- One task input
- A few example jobs
- One recommended tool card
- Install
- Verify
- Why this fits
- Safety notes
- Alternatives
- Export artifact

Secondary section:

- Browse by capability or category
- Trending or featured tools
- Link into full directory

### CLI detail page changes

Each CLI page should answer:

- What is this best for?
- When should I not use this?
- What is the first safe proof that it works?
- Is it friendly for agents and scripts?
- What tools is it commonly compared with?

The page should move from "information panel" to "decision + action panel."

## V1 Scope

### Workstream 1: Reframe the homepage

Make the Supercharge flow the main hero and primary interaction.

Changes:

- Move the recommendation UI above everything else as the main page purpose.
- Reduce the visual dominance of the directory table.
- Rename or reposition the directory as a supporting browse section.
- Add short explanatory copy that teaches the value in simple terms.

Acceptance criteria:

- The first screen communicates task-first behavior clearly.
- A visitor can understand the product without scrolling into the directory list.
- The top CTA leads to a recommendation, not browsing.

### Workstream 2: Improve recommendation output

Strengthen the recommendation content so it feels trustworthy and actionable.

Changes:

- Add a "Why this tool" section with 3 short reasons.
- Add "Watch out for" notes for auth, network, destructive actions, and interactivity.
- Show a clearer comparison against alternatives.
- Keep verify commands tool-specific whenever possible.

Acceptance criteria:

- Every recommendation includes a primary reason, a verify step, and at least one caveat.
- Alternatives are explained as tradeoffs, not just links.
- The recommendation reads like advice, not just generated metadata.

### Workstream 3: Export reusable artifacts

Turn the current copyable skill into a real takeaway.

Changes:

- Add download for `SKILL.md`.
- Add copy for a plain "agent setup brief".
- Keep the existing copy action, but make the export more obvious.
- Structure the generated artifact so it is readable and immediately usable.

Acceptance criteria:

- A user can download a valid `SKILL.md` file from the recommendation view.
- The artifact contains install, verify, intended use, and safety guidance.
- The artifact is useful without needing to revisit the site.

### Workstream 4: Clarify trust signals

Present trust in a way people can understand quickly.

Changes:

- Separate "fit", "trust", and "popularity" in the UI.
- Label metric source and freshness more clearly.
- Add "official" and "agent-friendly" meaning in plain words.
- Prefer exact dates for freshness instead of vague language.

Acceptance criteria:

- Users can tell whether a tool is first-party, well-adopted, and recently active.
- Metric labels do not imply false equivalence across different sources.
- Trust signals support a decision instead of feeling like dashboard noise.

### Workstream 5: Make the detail page decision-oriented

Update CLI pages so they help a person commit or rule a tool out quickly.

Changes:

- Add a top summary block with best fit, caveats, and first safe command.
- Add "Choose this over..." comparisons where we have reasonable alternatives.
- Tighten sidebar links and move the most important actions higher.
- Improve the wording of agent-readiness so it is easier to understand.

Acceptance criteria:

- A CLI detail page can stand alone as a decision page.
- The first meaningful action appears without needing to hunt for it.
- Alternative tools are presented as choices with reasons.

## Suggested Implementation Phases

### Phase 1: Make the product shape obvious

Focus:

- Homepage reframing
- Recommendation output copy improvements
- Better alternative explanations

Files likely touched:

- `src/components/home-view.tsx`
- `src/components/supercharge-agent.tsx`
- `src/lib/supercharge.ts`

### Phase 2: Add export and trust clarity

Focus:

- `SKILL.md` download
- clearer metric presentation
- freshness labels

Files likely touched:

- `src/components/supercharge-agent.tsx`
- `src/app/cli/[slug]/page.tsx`
- `src/data/clis.ts`
- `src/lib/format.ts`

### Phase 3: Upgrade CLI detail pages

Focus:

- decision-oriented layout
- comparison language
- clearer safety and readiness framing

Files likely touched:

- `src/app/cli/[slug]/page.tsx`
- `src/data/clis.ts`

## User Flow Gaps To Watch

- What should happen when the task is vague or matches many tools?
- What should happen when no tool is a strong match?
- Should the site prefer official tools by default, or best-fit tools?
- How should we explain incomparable metrics like npm downloads vs Docker pulls?
- What should a downloaded `SKILL.md` look like when a tool is not truly agent-friendly?

## Recommended Defaults For V1

- When uncertain, recommend the clearest low-risk tool, not the most popular one.
- Prefer official tools only when fit is close.
- Keep the directory accessible, but not primary.
- Use plain language instead of agent-platform jargon in the main UI.
- Always show one explicit next command after install.

## Risks

- Overexplaining could make the homepage feel heavy.
- Recommendation copy may feel repetitive without better data fields.
- Popularity metrics may continue to confuse users if we do not label them carefully.
- Exported artifacts may feel thin unless the recommendation copy is strong.

## Open Questions

- Should v1 focus on a smaller set of high-confidence categories first, such as Git, deploy, database, browser, and AI?
- Should the homepage still show a directory table at all, or switch to curated shelves?
- Do we want one generic export format first, or explicit exports for Codex, Claude Code, and Cursor?

## Recommended First Build Slice

Build this first before anything else:

1. Make the homepage hero fully task-first.
2. Demote the directory table below the recommendation experience.
3. Upgrade the recommendation card to include:
   - why this tool
   - watch-outs
   - better alternatives framing
4. Add `Download SKILL.md`.

This slice delivers the biggest product change with the least moving parts.

## Acceptance Checklist

- [ ] Homepage reads as "describe the job, get the tool" within five seconds.
- [ ] Recommendation output explains fit, trust, and next step clearly.
- [ ] A user can copy install, copy verify, and download `SKILL.md`.
- [ ] The directory still works, but no longer defines the product.
- [ ] CLI detail pages remain useful and can be upgraded in a second pass.
