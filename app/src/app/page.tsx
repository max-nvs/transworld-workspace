import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TopBar } from "@/components/top-bar";
import { DashboardContent } from "@/components/dashboard-content";
import { TOOLS } from "@/lib/tools";

export default async function DashboardPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const isSupabaseConfigured = supabaseUrl && supabaseUrl.startsWith("http");

  let userEmail = "Preview User";

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }
    userEmail = user.email ?? "User";
  }

  const firstName = userEmail.split("@")[0].split(".")[0];
  const displayName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);

  // TODO: Replace with real RBAC lookup from Supabase
  const visibleTools = TOOLS;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar userEmail={userEmail} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-8 py-10">
        <div className="mb-10">
          <h1 className="text-[30px] font-semibold leading-[1.27] text-foreground">
            Welcome back, <span className="border-b-2 border-[#C9A64D] pb-0.5">{displayName}</span>
          </h1>
        </div>

        <DashboardContent tools={visibleTools} />
      </main>
    </div>
  );
}
