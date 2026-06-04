#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

const contentPaths = {
  clis: resolve(root, "src/content/clis.json"),
  makers: resolve(root, "src/content/makers.json"),
  metrics: resolve(root, "src/content/cli-metrics.json"),
  radar: resolve(root, "src/content/radar-candidates.json"),
};

const validMakerTypes = new Set(["org", "individual", "small-team"]);
const validPackageManagers = new Set(["brew", "npm", "cargo", "pipx", "curl", "go"]);
const validDestructivePotential = new Set(["low", "medium", "high"]);
const validCategories = new Set([
  "AI",
  "Browser Automation",
  "Cloud",
  "Containers / Infra",
  "Data",
  "Database",
  "Deploy",
  "Docs / Content",
  "Git",
  "Observability",
  "Package Management",
  "Productivity",
  "Scraping",
  "Security",
  "Shell Utilities",
  "Wallet / Payments",
]);

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const githubRepoPattern = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

const errors = [];
const warnings = [];

function readJson(name) {
  try {
    return JSON.parse(readFileSync(contentPaths[name], "utf8"));
  } catch (error) {
    errors.push(`${contentPaths[name]} is not valid JSON: ${error.message}`);
    return null;
  }
}

function label(collection, index, slug) {
  return `${collection}[${slug ?? index}]`;
}

function errorAt(collection, index, slug, message) {
  errors.push(`${label(collection, index, slug)}: ${message}`);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isHttpUrl(value) {
  if (!isNonEmptyString(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validateUniqueSlugs(collection, entries) {
  const seen = new Map();
  entries.forEach((entry, index) => {
    if (!isPlainObject(entry)) {
      errorAt(collection, index, null, "entry must be an object");
      return;
    }

    if (!isNonEmptyString(entry.slug)) {
      errorAt(collection, index, null, "missing slug");
      return;
    }

    if (!slugPattern.test(entry.slug)) {
      errorAt(collection, index, entry.slug, "slug must be kebab-case lowercase letters/numbers");
    }

    const previousIndex = seen.get(entry.slug);
    if (previousIndex !== undefined) {
      errorAt(collection, index, entry.slug, `duplicate slug also used at index ${previousIndex}`);
    } else {
      seen.set(entry.slug, index);
    }
  });

  return seen;
}

function validateStringArray(collection, index, slug, key, value, { min = 0 } = {}) {
  if (!Array.isArray(value)) {
    errorAt(collection, index, slug, `${key} must be an array`);
    return;
  }

  if (value.length < min) {
    errorAt(collection, index, slug, `${key} must contain at least ${min} item(s)`);
  }

  value.forEach((item, itemIndex) => {
    if (!isNonEmptyString(item)) {
      errorAt(collection, index, slug, `${key}[${itemIndex}] must be a non-empty string`);
    }
  });
}

function validateBoolean(collection, index, slug, key, value) {
  if (value !== undefined && typeof value !== "boolean") {
    errorAt(collection, index, slug, `${key} must be a boolean when present`);
  }
}

function validateMakers(makers) {
  if (!Array.isArray(makers)) {
    errors.push("makers.json must be an array");
    return new Set();
  }

  validateUniqueSlugs("makers", makers);

  makers.forEach((maker, index) => {
    const slug = maker?.slug;
    for (const key of ["name", "type", "url"]) {
      if (!isNonEmptyString(maker?.[key])) errorAt("makers", index, slug, `missing ${key}`);
    }

    if (isNonEmptyString(maker?.type) && !validMakerTypes.has(maker.type)) {
      errorAt("makers", index, slug, `invalid type ${JSON.stringify(maker.type)}`);
    }

    if (isNonEmptyString(maker?.url) && !isHttpUrl(maker.url)) {
      errorAt("makers", index, slug, "url must be an http(s) URL");
    }

    validateBoolean("makers", index, slug, "officialPlatformMaker", maker?.officialPlatformMaker);
    validateBoolean("makers", index, slug, "featuredBuilder", maker?.featuredBuilder);

    if (maker?.cliCount !== undefined && (!Number.isInteger(maker.cliCount) || maker.cliCount < 0)) {
      errorAt("makers", index, slug, "cliCount must be a non-negative integer when present");
    }
  });

  return new Set(makers.filter(isPlainObject).map((maker) => maker.slug));
}

function validateClis(clis, makerSlugs) {
  if (!Array.isArray(clis)) {
    errors.push("clis.json must be an array");
    return new Set();
  }

  validateUniqueSlugs("clis", clis);

  clis.forEach((cli, index) => {
    const slug = cli?.slug;
    for (const key of ["name", "shortName", "maker", "category", "installWith", "installCommand", "quickStart", "githubRepo"]) {
      if (!isNonEmptyString(cli?.[key])) errorAt("clis", index, slug, `missing ${key}`);
    }

    if (isNonEmptyString(cli?.maker) && !makerSlugs.has(cli.maker)) {
      errorAt("clis", index, slug, `maker ${JSON.stringify(cli.maker)} does not exist in makers.json`);
    }

    if (isNonEmptyString(cli?.category) && !validCategories.has(cli.category)) {
      errorAt("clis", index, slug, `invalid category ${JSON.stringify(cli.category)}`);
    }

    if (isNonEmptyString(cli?.installWith) && !validPackageManagers.has(cli.installWith)) {
      errorAt("clis", index, slug, `invalid installWith ${JSON.stringify(cli.installWith)}`);
    }

    if (isNonEmptyString(cli?.githubRepo) && !githubRepoPattern.test(cli.githubRepo)) {
      errorAt("clis", index, slug, "githubRepo must look like owner/repo, not a full URL");
    }

    for (const key of ["website", "docs"]) {
      if (cli?.[key] !== undefined && !isHttpUrl(cli[key])) {
        errorAt("clis", index, slug, `${key} must be an http(s) URL when present`);
      }
    }

    validateStringArray("clis", index, slug, "useCases", cli?.useCases, { min: 1 });
    for (const key of ["aliases", "keywords", "tags", "exampleWorkflow"]) {
      if (cli?.[key] !== undefined) validateStringArray("clis", index, slug, key, cli[key]);
    }

    for (const key of ["featured", "agentFriendly", "supportsJsonOutput", "supportsNonInteractive", "supportsDryRun", "requiresAuth", "requiresNetwork", "ciFriendly", "localFirst"]) {
      validateBoolean("clis", index, slug, key, cli?.[key]);
    }

    if (cli?.destructivePotential !== undefined && !validDestructivePotential.has(cli.destructivePotential)) {
      errorAt("clis", index, slug, `invalid destructivePotential ${JSON.stringify(cli.destructivePotential)}`);
    }
  });

  return new Set(clis.filter(isPlainObject).map((cli) => cli.slug));
}

function validateMetrics(metrics, cliSlugs) {
  if (!isPlainObject(metrics)) {
    errors.push("cli-metrics.json must be an object keyed by CLI slug");
    return;
  }

  for (const [slug, metric] of Object.entries(metrics)) {
    if (!cliSlugs.has(slug)) {
      errorAt("metrics", slug, slug, "metric key does not exist in clis.json");
    }

    if (!isPlainObject(metric)) {
      errorAt("metrics", slug, slug, "metric value must be an object");
      continue;
    }

    for (const key of ["githubStars", "metricValue"]) {
      const value = metric[key];
      if (value !== null && value !== undefined && (!Number.isInteger(value) || value < 0)) {
        errorAt("metrics", slug, slug, `${key} must be null or a non-negative integer`);
      }
    }

    for (const key of ["latestRelease", "license", "metricLabel", "metricSource", "metricAsOf"]) {
      const value = metric[key];
      if (value !== null && value !== undefined && typeof value !== "string") {
        errorAt("metrics", slug, slug, `${key} must be null or a string`);
      }
    }

    for (const key of ["latestRelease", "metricAsOf"]) {
      const value = metric[key];
      if (isNonEmptyString(value) && Number.isNaN(Date.parse(value))) {
        errorAt("metrics", slug, slug, `${key} must be an ISO-like date string`);
      }
    }
  }

  const missingMetrics = [...cliSlugs].filter((slug) => metrics[slug] === undefined);
  if (missingMetrics.length > 0) {
    warnings.push(`metrics: ${missingMetrics.length} CLI(s) do not have cached metrics yet: ${missingMetrics.slice(0, 10).join(", ")}${missingMetrics.length > 10 ? ", …" : ""}`);
  }
}

function validateRadar(radar) {
  if (!Array.isArray(radar)) {
    errors.push("radar-candidates.json must be an array");
    return;
  }

  validateUniqueSlugs("radar", radar);

  radar.forEach((candidate, index) => {
    const slug = candidate?.slug;
    for (const key of ["name", "sourceUrl", "description", "detectedCategory", "detectedInstallCommand", "whyFound", "status"]) {
      if (!isNonEmptyString(candidate?.[key])) errorAt("radar", index, slug, `missing ${key}`);
    }

    if (isNonEmptyString(candidate?.sourceUrl) && !isHttpUrl(candidate.sourceUrl)) {
      errorAt("radar", index, slug, "sourceUrl must be an http(s) URL");
    }

    validateStringArray("radar", index, slug, "detectedUseCases", candidate?.detectedUseCases, { min: 1 });

    if (!Number.isInteger(candidate?.agentReadinessGuess) || candidate.agentReadinessGuess < 0 || candidate.agentReadinessGuess > 100) {
      errorAt("radar", index, slug, "agentReadinessGuess must be an integer from 0 to 100");
    }

    if (!isPlainObject(candidate?.signals)) {
      errorAt("radar", index, slug, "signals must be an object");
      return;
    }

    if (!Number.isInteger(candidate.signals.stars) || candidate.signals.stars < 0) {
      errorAt("radar", index, slug, "signals.stars must be a non-negative integer");
    }

    for (const key of ["growth", "lastSeen"]) {
      if (!isNonEmptyString(candidate.signals[key])) errorAt("radar", index, slug, `signals.${key} must be a non-empty string`);
    }

    for (const key of ["hasBin", "jsonOutput", "dryRun"]) {
      if (typeof candidate.signals[key] !== "boolean") errorAt("radar", index, slug, `signals.${key} must be a boolean`);
    }
  });
}

const makers = readJson("makers");
const clis = readJson("clis");
const metrics = readJson("metrics");
const radar = readJson("radar");

const makerSlugs = makers ? validateMakers(makers) : new Set();
const cliSlugs = clis ? validateClis(clis, makerSlugs) : new Set();
if (metrics) validateMetrics(metrics, cliSlugs);
if (radar) validateRadar(radar);

for (const warning of warnings) console.warn(`⚠ ${warning}`);

if (errors.length > 0) {
  console.error(`\nData validation failed with ${errors.length} error(s):`);
  for (const message of errors) console.error(`- ${message}`);
  process.exit(1);
}

console.log(`Data validation passed: ${cliSlugs.size} CLIs, ${makerSlugs.size} makers, ${Object.keys(metrics ?? {}).length} metric records, ${Array.isArray(radar) ? radar.length : 0} radar candidates.`);
