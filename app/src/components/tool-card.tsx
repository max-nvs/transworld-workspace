import {
  Users,
  ClipboardList,
  Activity,
  Banknote,
  CheckCircle,
  Landmark,
  Database,
  Lightbulb,
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
};

interface ToolCardProps {
  name: string;
  description: string;
  href: string;
  icon: string;
}

export function ToolCard({ name, description, href, icon }: ToolCardProps) {
  const Icon = ICON_MAP[icon] ?? Database;

  return (
    <a
      href={href}
      className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-accent hover:shadow-[0_0_0_3px_rgba(201,166,77,0.1)]"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background">
        <Icon className="h-5 w-5 text-foreground" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </a>
  );
}
