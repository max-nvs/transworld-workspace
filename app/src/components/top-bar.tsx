import { Logomark } from "@/components/logomark";

interface TopBarProps {
  userEmail: string;
}

export function TopBar({ userEmail }: TopBarProps) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-8 py-4">
      <div className="flex items-center gap-3">
        <Logomark size={32} />
        <span className="text-base font-semibold text-foreground">
          Transworld Workspace
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">{userEmail}</span>
        <a
          href="/auth/signout"
          className="text-sm font-semibold text-primary hover:underline"
        >
          Log out
        </a>
      </div>
    </header>
  );
}
