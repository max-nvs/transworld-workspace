import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TopBar } from "@/components/top-bar";
import { ToolCard } from "@/components/tool-card";
import { TOOLS } from "@/lib/tools";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // TODO: Replace with real RBAC lookup from Supabase
  const visibleTools = TOOLS;

  return (
    <div className="min-h-screen bg-background">
      <TopBar userEmail={user.email ?? "User"} />
      <main className="mx-auto max-w-6xl px-8 py-10">
        <div className="mb-8">
          <h1 className="text-[30px] font-semibold leading-[1.27] text-foreground">
            Your tools
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Select a tool to get started
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {visibleTools.map((tool) => (
            <ToolCard
              key={tool.id}
              name={tool.name}
              description={tool.description}
              href={tool.href}
              icon={tool.icon}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
