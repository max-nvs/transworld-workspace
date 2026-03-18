"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { ToolCard } from "@/components/tool-card";
import type { Tool } from "@/lib/tools";

interface DashboardContentProps {
  tools: Tool[];
}

export function DashboardContent({ tools }: DashboardContentProps) {
  const [query, setQuery] = useState("");

  const filtered = tools.filter((tool) =>
    tool.name.toLowerCase().includes(query.toLowerCase())
  );

  // Active tools first, coming soon at the bottom
  const sorted = [
    ...filtered.filter((t) => t.href !== "#"),
    ...filtered.filter((t) => t.href === "#"),
  ];

  return (
    <>
      <div className="mb-4">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#C9A64D]/40"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((tool) => (
          <ToolCard
            key={tool.id}
            id={tool.id}
            name={tool.name}
            description={tool.description}
            href={tool.href}
            icon={tool.icon}
            iconColor={tool.iconColor}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          No tools match &ldquo;{query}&rdquo;
        </p>
      )}
    </>
  );
}
