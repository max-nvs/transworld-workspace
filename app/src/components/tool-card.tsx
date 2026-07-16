"use client";

import { useState } from "react";
import {
  Users,
  ClipboardList,
  Activity,
  Banknote,
  Cake,
  Calculator,
  CheckCircle,
  Landmark,
  Database,
  Lightbulb,
  ShieldCheck,
  Shield,
  BookOpen,
  UserRoundCog,
  ArrowRight,
  ExternalLink,
  Loader2,
} from "lucide-react";

export const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  users: Users,
  "clipboard-list": ClipboardList,
  activity: Activity,
  banknote: Banknote,
  cake: Cake,
  calculator: Calculator,
  "check-circle": CheckCircle,
  landmark: Landmark,
  database: Database,
  lightbulb: Lightbulb,
  "shield-check": ShieldCheck,
  shield: Shield,
  "book-open": BookOpen,
  "user-round-cog": UserRoundCog,
};

interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: string;
  iconColor?: string;
  sso: boolean;
}

export function ToolCard({ id, name, description, href, icon, iconColor, sso }: ToolCardProps) {
  const Icon = ICON_MAP[icon] ?? Database;
  const [loading, setLoading] = useState(false);

  const isComingSoon = href === "#";
  const isExternal = !isComingSoon && href.startsWith("http");

  async function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (isComingSoon) {
      e.preventDefault();
      return;
    }
    // Link-only tools have their own login. Let the browser follow the href
    // so no workspace token is ever minted or put on a third-party URL.
    if (!sso) return;
    if (!isExternal) return;

    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/sso/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool_id: id }),
      });

      if (!res.ok) {
        window.open(href, "_blank", "noopener");
        return;
      }

      const { redirect_url } = await res.json();
      window.open(redirect_url, "_blank", "noopener");
    } catch {
      window.open(href, "_blank", "noopener");
    } finally {
      setLoading(false);
    }
  }

  if (isComingSoon) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-border bg-card p-5 opacity-50">
        <div className="flex items-center gap-4">
          <Icon className="h-6 w-6 shrink-0" style={{ color: iconColor }} />
          <div className="flex flex-col gap-0.5">
            <h3 className="text-sm font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{description}</p>
          </div>
        </div>
        <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Coming Soon
        </span>
      </div>
    );
  }

  // Design Council v4: link-only tiles get ExternalLink in the same slot, at the
  // same size. Every tile already opens a new tab, so the glyph is not the
  // signal that a separate login is coming — the description carries that. It
  // is swapped so the card stops promising the forward navigation it isn't doing.
  const Affordance = sso ? ArrowRight : ExternalLink;

  return (
    <a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-all hover:border-l-2 hover:border-l-[#C9A64D] hover:shadow-sm"
    >
      <div className="flex items-center gap-4">
        <Icon className="h-6 w-6 shrink-0" style={{ color: iconColor }} />
        <div className="flex flex-col gap-0.5">
          <h3 className="text-sm font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">{description}</p>
        </div>
      </div>
      {loading ? (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
      ) : (
        <Affordance className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      )}
    </a>
  );
}
