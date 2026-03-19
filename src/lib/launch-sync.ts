import { builderLaunches, type BuilderLaunch } from "@/data/clis";

async function fetchNpmDownloads(packageName: string) {
  const response = await fetch(`https://api.npmjs.org/downloads/point/last-month/${packageName}`, {
    headers: {
      Accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { downloads?: number };
  return typeof data.downloads === "number" ? data.downloads : null;
}

async function fetchNpmPublishedAt(packageName: string) {
  const response = await fetch(`https://registry.npmjs.org/${packageName}`, {
    headers: {
      Accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as {
    time?: Record<string, string>;
    "dist-tags"?: { latest?: string };
  };

  const latest = data["dist-tags"]?.latest;
  if (!latest || !data.time?.[latest]) {
    return null;
  }

  return data.time[latest];
}

async function fetchGitHubStars(githubRepo: string) {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(`https://api.github.com/repos/${githubRepo}`, {
    headers,
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { stargazers_count?: number };
  return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
}

export async function buildSyncedLaunches(seedLaunches: BuilderLaunch[] = builderLaunches) {
  const launches = await Promise.all(
    seedLaunches.map(async (launch) => {
      const [monthlyDownloads, publishedAt, stars] = await Promise.all([
        launch.packageName ? fetchNpmDownloads(launch.packageName) : Promise.resolve(launch.monthlyDownloads ?? null),
        launch.packageName ? fetchNpmPublishedAt(launch.packageName) : Promise.resolve(launch.publishedAt ?? null),
        launch.githubRepo ? fetchGitHubStars(launch.githubRepo) : Promise.resolve(launch.stars ?? null),
      ]);

      return {
        ...launch,
        monthlyDownloads,
        publishedAt,
        stars,
      } satisfies BuilderLaunch;
    }),
  );

  return launches;
}
