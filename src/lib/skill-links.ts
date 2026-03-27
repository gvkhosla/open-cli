import cliSkillLinksJson from "@/content/cli-skill-links.json";
import skillsCatalogJson from "@/content/skills-catalog.json";
import type { CliEntry } from "@/data/clis";

export type CompanionSkillConfidence = "verified" | "recommended" | "fallback";

type SkillCatalogEntry = {
  id: string;
  source: string;
  skillId: string;
  title: string;
  categories?: string[];
  makers?: string[];
  tags?: string[];
  oneLiner: string;
};

type CliSkillOverride = {
  primarySkillId: string;
  secondarySkillIds?: string[];
};

export type CompanionSkill = {
  id: string;
  title: string;
  source: string;
  skillId: string;
  repoUrl: string;
  skillsUrl: string;
  installCommand: string;
  confidence: CompanionSkillConfidence;
  confidenceLabel: string;
  whyItPairs: string;
  starterPrompt: string;
  oneLiner: string;
};

const skillCatalog = skillsCatalogJson as SkillCatalogEntry[];
const cliSkillLinks = cliSkillLinksJson as Record<string, CliSkillOverride>;
const skillCatalogById = new Map(skillCatalog.map((entry) => [entry.id, entry]));

const makerDefaultSkillIds: Record<string, string[]> = {
  vercel: ["deploy-to-vercel", "next-best-practices", "vercel-react-best-practices"],
  supabase: ["supabase-postgres-best-practices", "database-schema-design", "data-analysis"],
  neon: ["neon-postgres", "database-schema-design", "data-analysis"],
  firecrawl: ["firecrawl-search", "firecrawl-scrape", "firecrawl-crawl"],
};

const categoryDefaultSkillIds: Record<string, string[]> = {
  Git: ["git-workflow", "code-review", "codebase-search"],
  Deploy: ["deployment-automation", "workflow-automation", "monitoring-observability"],
  "Package Management": ["environment-setup", "workflow-automation", "backend-testing"],
  Cloud: ["deployment-automation", "monitoring-observability", "workflow-automation"],
  Database: ["database-schema-design", "data-analysis", "backend-testing"],
  "Containers / Infra": ["deployment-automation", "monitoring-observability", "docker-expert"],
  Security: ["security-best-practices", "code-review", "debugging"],
  Productivity: ["workflow-automation", "technical-writing", "debugging"],
  Observability: ["monitoring-observability", "log-analysis", "debugging"],
  AI: ["prompt-engineering", "ai-automation-workflows", "workflow-automation"],
  "Shell Utilities": ["workflow-automation", "codebase-search", "debugging"],
  Data: ["data-analysis", "codebase-search", "workflow-automation"],
  "Docs / Content": ["technical-writing", "api-documentation", "workflow-automation"],
  "Browser Automation": ["playwright-cli", "playwright-best-practices", "webapp-testing"],
  Scraping: ["firecrawl-scrape", "firecrawl-search", "web-search"],
  "Wallet / Payments": ["security-best-practices", "api-documentation", "workflow-automation"],
};

const universalFallbackSkillIds = ["workflow-automation", "debugging", "technical-writing"];

function buildRepoUrl(source: string) {
  return `https://github.com/${source}`;
}

function buildSkillsUrl(source: string, skillId: string) {
  return `https://skills.sh/${source}/${skillId}`;
}

function buildInstallCommand(source: string, skillId: string) {
  return `npx skills add ${buildRepoUrl(source)} --skill ${skillId}`;
}

function titleCaseConfidence(confidence: CompanionSkillConfidence) {
  if (confidence === "verified") return "Verified pairing";
  if (confidence === "recommended") return "Recommended pairing";
  return "Fallback pairing";
}

function buildWhyItPairs(cli: CliEntry, entry: SkillCatalogEntry, confidence: CompanionSkillConfidence) {
  if (confidence === "verified") {
    return `Open CLI integrates ${cli.shortName} with this skills.sh skill because it is the clearest fit for how ${cli.shortName} is usually used. ${entry.oneLiner}`;
  }

  if (entry.makers?.includes(cli.makerSlug)) {
    return `Open CLI matched ${cli.shortName} to this skills.sh skill from the same ecosystem. ${entry.oneLiner}`;
  }

  if (entry.categories?.includes(cli.category)) {
    return `Open CLI recommends this skills.sh skill because it fits ${cli.category.toLowerCase()} workflows. ${entry.oneLiner}`;
  }

  return `Open CLI uses this skills.sh skill as a safe general companion for ${cli.shortName}. ${entry.oneLiner}`;
}

function buildStarterPrompt(cli: CliEntry, entry: SkillCatalogEntry) {
  if (cli.category === "Deploy" || entry.tags?.includes("deploy")) {
    return `Use ${cli.shortName} together with the ${entry.title} skills.sh skill. Inspect the current project, verify prerequisites, and suggest the safest next deployment step before changing anything.`;
  }

  if (cli.category === "Database") {
    return `Use ${cli.shortName} together with the ${entry.title} skills.sh skill. Inspect the current schema or data first, summarize what matters, and ask before any migration or write action.`;
  }

  if (cli.category === "Browser Automation") {
    return `Use ${cli.shortName} together with the ${entry.title} skills.sh skill. Explore the app step by step, describe what you observe, and only then generate or run broader automation.`;
  }

  if (cli.category === "AI") {
    return `Use ${cli.shortName} together with the ${entry.title} skills.sh skill. Start with a small prompt or read-only action, show the result, and propose the next loop before escalating scope.`;
  }

  if (cli.category === "Security" || (cli.category as string) === "Wallet / Payments") {
    return `Use ${cli.shortName} together with the ${entry.title} skills.sh skill. Start with inspection or dry-run commands, summarize any risk, and ask before actions with side effects.`;
  }

  return `Use ${cli.shortName} together with the ${entry.title} skills.sh skill. Start with safe inspection commands, summarize what you find, and ask before any step with side effects.`;
}

function buildCompanionSkill(cli: CliEntry, entry: SkillCatalogEntry, confidence: CompanionSkillConfidence): CompanionSkill {
  return {
    id: entry.id,
    title: entry.title,
    source: entry.source,
    skillId: entry.skillId,
    repoUrl: buildRepoUrl(entry.source),
    skillsUrl: buildSkillsUrl(entry.source, entry.skillId),
    installCommand: buildInstallCommand(entry.source, entry.skillId),
    confidence,
    confidenceLabel: titleCaseConfidence(confidence),
    whyItPairs: buildWhyItPairs(cli, entry, confidence),
    starterPrompt: buildStarterPrompt(cli, entry),
    oneLiner: entry.oneLiner,
  };
}

function uniqueSkillIds(ids: string[]) {
  return ids.filter((id, index) => ids.indexOf(id) === index);
}

export function resolveCompanionSkillsForCli(cli: CliEntry): CompanionSkill[] {
  const override = cliSkillLinks[cli.slug];
  const overrideIds = override ? [override.primarySkillId, ...(override.secondarySkillIds ?? [])] : [];
  const makerIds = makerDefaultSkillIds[cli.makerSlug] ?? [];
  const categoryIds = categoryDefaultSkillIds[cli.category] ?? [];
  const fallbackIds = universalFallbackSkillIds;

  const resolvedIds = uniqueSkillIds([...overrideIds, ...makerIds, ...categoryIds, ...fallbackIds]);

  return resolvedIds
    .map((id) => {
      const entry = skillCatalogById.get(id);
      if (!entry) return null;

      const confidence: CompanionSkillConfidence = overrideIds.includes(id)
        ? "verified"
        : makerIds.includes(id) || categoryIds.includes(id)
          ? "recommended"
          : "fallback";

      return buildCompanionSkill(cli, entry, confidence);
    })
    .filter((skill): skill is CompanionSkill => Boolean(skill))
    .slice(0, 3);
}
