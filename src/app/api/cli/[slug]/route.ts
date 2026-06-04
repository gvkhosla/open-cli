import { NextResponse } from "next/server";

import { clis, getCliBySlug } from "@/data/clis";
import { buildAgentPack, getAgentReadiness, getVerifyStep } from "@/lib/agent-pack";

export const dynamicParams = false;

type CliJsonRouteProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return clis.map((cli) => ({ slug: cli.slug }));
}

export async function GET(_request: Request, { params }: CliJsonRouteProps) {
  const { slug } = await params;
  const cli = getCliBySlug(slug);

  if (!cli) {
    return NextResponse.json({ error: "CLI not found" }, { status: 404 });
  }

  const verify = getVerifyStep(cli);
  const readiness = getAgentReadiness(cli);

  return NextResponse.json(
    {
      schemaVersion: "opencli.cli.v1",
      slug: cli.slug,
      name: cli.name,
      shortName: cli.shortName,
      binaryName: cli.binaryName,
      maker: {
        slug: cli.makerSlug,
        name: cli.makerName,
        type: cli.makerType,
        url: cli.makerUrl,
        officialPlatformMaker: cli.official,
        featuredBuilder: cli.featuredBuilder,
      },
      category: cli.category,
      description: cli.description,
      tagline: cli.tagline,
      install: {
        packageManager: cli.installWith,
        command: cli.installCommand,
        packageName: cli.packageName ?? null,
        npmPackage: cli.npmPackage ?? null,
        brewFormula: cli.brewFormula ?? null,
        brewCask: cli.brewCask ?? null,
        crateName: cli.crateName ?? null,
        pypiPackage: cli.pypiPackage ?? null,
        goPackage: cli.goPackage ?? null,
        dockerImage: cli.dockerImage ?? null,
      },
      verify,
      quickStart: cli.quickStart,
      exampleWorkflow: cli.exampleWorkflow,
      agent: {
        readiness,
        packUrl: `https://opencli.co/cli/${cli.slug}/agent.md`,
        packMarkdown: buildAgentPack(cli),
      },
      fit: {
        bestFor: cli.bestFor,
        useThisIf: cli.useThisIf,
        skipIf: cli.skipIf,
        whatHappensNext: cli.whatHappensNext,
      },
      capabilities: {
        agentFriendly: cli.agentFriendly,
        supportsJsonOutput: cli.supportsJsonOutput,
        supportsNonInteractive: cli.supportsNonInteractive,
        supportsDryRun: cli.supportsDryRun,
        requiresAuth: cli.requiresAuth,
        requiresNetwork: cli.requiresNetwork,
        ciFriendly: cli.ciFriendly,
        localFirst: cli.localFirst,
        destructivePotential: cli.destructivePotential,
      },
      taxonomy: {
        useCases: cli.useCases,
        aliases: cli.aliases,
        keywords: cli.keywords,
        tags: cli.tags,
      },
      links: {
        website: cli.website,
        github: cli.github,
        docs: cli.docs,
        opencli: `https://opencli.co/cli/${cli.slug}`,
        markdown: `https://opencli.co/cli/${cli.slug}/agent.md`,
        json: `https://opencli.co/cli/${cli.slug}.json`,
      },
      metrics: {
        githubStars: cli.githubStars,
        latestRelease: cli.latestRelease,
        license: cli.license,
        metricLabel: cli.metricLabel,
        metricValue: cli.metricValue,
        metricSource: cli.metricSource,
        metricAsOf: cli.metricAsOf,
      },
    },
    {
      headers: {
        "cache-control": "public, max-age=3600, s-maxage=86400",
      },
    },
  );
}
