import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <div
          className="h-[768px] w-[768px] opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0B1D3A 1px, transparent 1px),
              linear-gradient(to bottom, #0B1D3A 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(circle at center, black 0%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 70%)",
          }}
        />
      </div>
      <div className="relative z-10 w-full max-w-[400px] px-4">
        <LoginForm />
      </div>
    </main>
  );
}
