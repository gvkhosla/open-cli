import { builderLaunches, type BuilderLaunch, type BuilderLaunchStatus } from "@/data/clis";
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

type BuilderLaunchQueryOptions = {
  status?: BuilderLaunchStatus | "all";
};

function normalizeLaunch(item: {
  id?: string;
  name: string;
  creator: string;
  creator_url?: string | null;
  tagline: string;
  install_command: string;
  href: string;
  released: string;
  package_name?: string | null;
  github_repo?: string | null;
  stars?: number | null;
  monthly_downloads?: number | null;
  published_at?: string | null;
  status?: string | null;
  source?: string | null;
  audit_score?: number | null;
  created_at?: string | null;
}): BuilderLaunch {
  return {
    id: item.id,
    name: item.name,
    creator: item.creator,
    creatorUrl: item.creator_url ?? "",
    tagline: item.tagline,
    installCommand: item.install_command,
    href: item.href,
    released: item.released,
    packageName: item.package_name ?? undefined,
    githubRepo: item.github_repo ?? undefined,
    stars: item.stars,
    monthlyDownloads: item.monthly_downloads,
    publishedAt: item.published_at,
    status: (item.status as BuilderLaunchStatus | null) ?? "approved",
    source: (item.source as BuilderLaunch["source"] | null) ?? "manual",
    auditScore: item.audit_score ?? null,
    createdAt: item.created_at ?? null,
  };
}

export async function getBuilderLaunches(options: BuilderLaunchQueryOptions = {}): Promise<BuilderLaunch[]> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return builderLaunches.map((launch) => ({ ...launch, status: launch.status ?? "approved", source: launch.source ?? "manual" }));
  }

  let query = supabase
    .from("builder_launches")
    .select("id, name, creator, creator_url, tagline, install_command, href, released, package_name, github_repo, stars, monthly_downloads, published_at, status, source, audit_score, created_at")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (options.status && options.status !== "all") {
    query = query.eq("status", options.status);
  }

  const { data, error } = await query;

  if (error || !data) {
    return builderLaunches.map((launch) => ({ ...launch, status: launch.status ?? "approved", source: launch.source ?? "manual" }));
  }

  return data.map(normalizeLaunch);
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

export async function updateBuilderLaunchStatus(id: string, status: BuilderLaunchStatus) {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return {
      ok: false,
      error: "Supabase is not configured.",
    };
  }

  const { error } = await supabase.from("builder_launches").update({ status }).eq("id", id);

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
    creator_url: launch.creatorUrl || null,
    tagline: launch.tagline,
    install_command: launch.installCommand,
    href: launch.href,
    released: launch.released,
    package_name: launch.packageName ?? null,
    github_repo: launch.githubRepo ?? null,
    stars: launch.stars ?? null,
    monthly_downloads: launch.monthlyDownloads ?? null,
    published_at: launch.publishedAt ?? null,
    status: launch.status ?? "approved",
    source: launch.source ?? "manual",
    audit_score: launch.auditScore ?? null,
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
