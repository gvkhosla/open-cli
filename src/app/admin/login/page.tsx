import type { Metadata } from "next";

import { AdminLoginView } from "@/components/admin-login-view";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Sign in to review launch submissions and manage builder launches.",
};

type AdminLoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;
  return <AdminLoginView nextPath={params.next || "/admin"} />;
}
