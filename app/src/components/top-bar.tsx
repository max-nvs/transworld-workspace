import Image from "next/image";

interface TopBarProps {
  userEmail: string;
}

export function TopBar({ userEmail }: TopBarProps) {
  return (
    <header className="border-b-2 border-b-[#C9A64D] bg-card">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3">
          <Image
            src="https://res.cloudinary.com/dzv7br1md/image/upload/v1770721031/transworld_logo_govyo2.png"
            alt="Transworld Investment & Securities"
            width={140}
            height={32}
            className="h-7 w-auto"
            unoptimized
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{userEmail}</span>
          <form action="/auth/signout" method="POST">
            <button
              type="submit"
              className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Log out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
