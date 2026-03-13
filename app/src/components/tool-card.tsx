"use client";

import { useState } from "react";
import {
  Users,
  ClipboardList,
  Activity,
  Banknote,
  CheckCircle,
  Landmark,
  Database,
  Lightbulb,
  ShieldCheck,
  ArrowRight,
  Loader2,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  "clipboard-list": ClipboardList,
  activity: Activity,
  banknote: Banknote,
  "check-circle": CheckCircle,
  landmark: Landmark,
  database: Database,
  lightbulb: Lightbulb,
  "shield-check": ShieldCheck,
};

interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: string;
}

export function ToolCard({ id, name, description, href, icon }: ToolCardProps) {
  const Icon = ICON_MAP[icon] ?? Database;
  const [loading, setLoading] = useState(false);

  const isExternal = href !== "#" && href.startsWith("http");

  async function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!isExternal) return; // Let internal/placeholder links behave normally

    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/sso/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool_id: id }),
      });

      if (!res.ok) {
        // Fallback: open the tool directly without SSO
        window.open(href, "_blank", "noopener");
        return;
      }

      const { redirect_url } = await res.json();
      window.open(redirect_url, "_blank", "noopener");
    } catch {
      // Network error — fallback to direct link
      window.open(href, "_blank", "noopener");
    } finally {
      setLoading(false);
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-all hover:border-l-2 hover:border-l-[#C9A64D] hover:shadow-sm"
    >
      <div className="flex items-center gap-4">
        <Icon className="h-6 w-6 shrink-0 text-foreground" />
        <div className="flex flex-col gap-0.5">
          <h3 className="text-sm font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {loading ? (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
      ) : (
        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      )}
    </a>
  );
}
