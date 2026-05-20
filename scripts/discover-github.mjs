#!/usr/bin/env node

import fs from "node:fs/promises";

const token = process.env.GITHUB_TOKEN;
const headers = {
  "accept": "application/vnd.github+json",
  "user-agent": "opencli-radar",
  ...(token ? { authorization: `Bearer ${token}` } : {}),
};

const queries = [
  "topic:cli stars:>100 pushed:>2025-01-01",
  "topic:terminal stars:>100 pushed:>2025-01-01",
  "topic:ai-agent stars:>20 pushed:>2025-01-01",
  "topic:developer-tools stars:>100 pushed:>2025-01-01",
];

async function github(path) {
  const response = await fetch(`https://api.github.com${path}`, { headers });
  if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
  return response.json();
}

function categoryFor(repo) {
  const text = `${repo.name} ${repo.description ?? ""} ${(repo.topics ?? []).join(" ")}`.toLowerCase();
  if (/browser|playwright|crawl|scrap/.test(text)) return "Browser Automation";
  if (/ai|agent|llm|model/.test(text)) return "AI";
  if (/deploy|cloud|serverless|hosting/.test(text)) return "Deploy";
  if (/db|database|postgres|sql|sqlite/.test(text)) return "Database";
  if (/kubernetes|docker|terraform|infra/.test(text)) return "Containers / Infra";
  return "Shell Utilities";
}

const seen = new Map();
for (const query of queries) {
  const data = await github(`/search/repositories?q=${encodeURIComponent(query)}&sort=updated&order=desc&per_page=10`);
  for (const repo of data.items ?? []) seen.set(repo.full_name, repo);
}

const candidates = Array.from(seen.values()).map((repo) => ({
  slug: repo.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  name: repo.name,
  sourceUrl: repo.html_url,
  description: repo.description ?? "Discovered CLI candidate from GitHub activity.",
  detectedCategory: categoryFor(repo),
  detectedUseCases: repo.topics?.slice(0, 3) ?? ["terminal workflow"],
  detectedInstallCommand: `# Check ${repo.html_url} for install instructions`,
  whyFound: `GitHub discovery: ${repo.stargazers_count.toLocaleString()} stars, pushed ${repo.pushed_at?.slice(0, 10)}, topics: ${(repo.topics ?? []).slice(0, 4).join(", ") || "none"}.`,
  signals: {
    stars: repo.stargazers_count,
    growth: "newly discovered",
    lastSeen: new Date().toISOString().slice(0, 10),
    hasBin: false,
    jsonOutput: false,
    dryRun: false
  },
  agentReadinessGuess: Math.min(95, 45 + Math.round(Math.log10(Math.max(repo.stargazers_count, 1)) * 12)),
  status: "candidate"
}));

await fs.mkdir("src/content", { recursive: true });
await fs.writeFile("src/content/radar-candidates.generated.json", `${JSON.stringify(candidates, null, 2)}\n`);
console.log(`Discovered ${candidates.length} candidates -> src/content/radar-candidates.generated.json`);
