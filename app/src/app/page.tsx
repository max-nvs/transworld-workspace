import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TopBar } from "@/components/top-bar";
import { ToolCard } from "@/components/tool-card";
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
            Welcome back, {displayName}
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Your workspace is ready.
          </p>
        </div>

        {/* Section label */}
        <div className="mb-4 flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Applications
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {visibleTools.map((tool) => (
            <ToolCard
              key={tool.id}
              id={tool.id}
              name={tool.name}
              description={tool.description}
              href={tool.href}
              icon={tool.icon}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5 text-sm text-muted-foreground">
          <span>&copy; Transworld Investment &amp; Securities {new Date().getFullYear()}</span>
          <span>Need help? Contact max.ayobami@transworldltd.com.ng</span>
        </div>
      </footer>
    </div>
  );
}
