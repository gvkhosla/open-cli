import { builderLaunches, type BuilderLaunch } from "@/data/clis";
import { getSupabaseAdmin } from "@/lib/supabase";

export type LaunchSubmission = {
  id?: string;
  name: string;
  creator: string;
  creatorUrl?: string;
  tagline: string;
  installCommand: string;
  href: string;
  released: string;
  notes?: string;
  createdAt?: string;
  status?: string;
};

export async function getBuilderLaunches(): Promise<BuilderLaunch[]> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return builderLaunches;
  }

  const { data, error } = await supabase
    .from("builder_launches")
    .select("name, creator, creator_url, tagline, install_command, href, released, package_name, github_repo, stars, monthly_downloads, published_at")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error || !data) {
    return builderLaunches;
  }

  return data.map((item) => ({
    name: item.name,
    creator: item.creator,
    creatorUrl: item.creator_url,
    tagline: item.tagline,
    installCommand: item.install_command,
    href: item.href,
    released: item.released,
    packageName: item.package_name,
    githubRepo: item.github_repo,
    stars: item.stars,
    monthlyDownloads: item.monthly_downloads,
    publishedAt: item.published_at,
  }));
}

export async function getLaunchSubmissions(): Promise<LaunchSubmission[]> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("launch_submissions")
    .select("id, name, creator, creator_url, tagline, install_command, href, released, notes, status, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error || !data) {
    return [];
  }

  return data.map((item) => ({
    id: item.id,
    name: item.name,
    creator: item.creator,
    creatorUrl: item.creator_url,
    tagline: item.tagline,
    installCommand: item.install_command,
    href: item.href,
    released: item.released,
    notes: item.notes,
    status: item.status,
    createdAt: item.created_at,
  }));
}

export async function saveLaunchSubmission(submission: LaunchSubmission) {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return {
      ok: false,
      error: "Supabase is not configured.",
    };
  }

  const { error } = await supabase.from("launch_submissions").insert({
    name: submission.name,
    creator: submission.creator,
    creator_url: submission.creatorUrl ?? null,
    tagline: submission.tagline,
    install_command: submission.installCommand,
    href: submission.href,
    released: submission.released,
    notes: submission.notes ?? null,
    status: "new",
  });

  if (error) {
    return {
      ok: false,
      error: error.message,
    };
  }

  return { ok: true };
}

export async function upsertBuilderLaunches(launches: BuilderLaunch[]) {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return {
      ok: false,
      error: "Supabase is not configured.",
    };
  }

  const payload = launches.map((launch) => ({
    name: launch.name,
    creator: launch.creator,
    creator_url: launch.creatorUrl,
    tagline: launch.tagline,
    install_command: launch.installCommand,
    href: launch.href,
    released: launch.released,
    package_name: launch.packageName ?? null,
    github_repo: launch.githubRepo ?? null,
    stars: launch.stars ?? null,
    monthly_downloads: launch.monthlyDownloads ?? null,
    published_at: launch.publishedAt ?? null,
  }));

  const { error } = await supabase.from("builder_launches").upsert(payload, {
    onConflict: "name",
  });

  if (error) {
    return {
      ok: false,
      error: error.message,
    };
  }

  return { ok: true };
}
