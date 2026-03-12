"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logomark } from "@/components/logomark";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send magic link");
      }

      setIsSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  if (isSent) {
    return <ConfirmationView email={email} onBack={() => setIsSent(false)} />;
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <Logomark size={56} />
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-[30px] font-semibold leading-[1.27] text-foreground">
          Welcome back
        </h1>
        <p className="text-base text-muted-foreground">
          Enter your email to receive a login link
        </p>
      </div>
      <div className="w-full rounded-2xl bg-card p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-text-label"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 rounded-lg border-border px-3.5 text-base placeholder:text-text-placeholder focus-visible:ring-accent"
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <Button
            type="submit"
            disabled={isLoading}
            className="h-11 w-full rounded-lg bg-primary text-base font-semibold text-primary-foreground shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05),inset_0px_0px_0px_1px_rgba(10,13,18,0.18)] hover:bg-primary-light"
          >
            {isLoading ? "Sending..." : "Send magic link"}
          </Button>
        </form>
      </div>
      <p className="text-sm text-muted-foreground">
        Need help? Contact your administrator
      </p>
    </div>
  );
}

function ConfirmationView({
  email,
  onBack,
}: {
  email: string;
  onBack: () => void;
}) {
  const [cooldown, setCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  async function handleResend() {
    setIsResending(true);
    setError(null);
    try {
      const res = await fetch("/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to resend link");
      }

      setCooldown(60);
      intervalRef.current = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <Logomark size={56} />
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-[30px] font-semibold leading-[1.27] text-foreground">
          Check your email
        </h1>
        <p className="text-base text-muted-foreground">
          We sent a login link to{" "}
          <span className="font-semibold text-foreground">{email}</span>
        </p>
      </div>
      <div className="w-full rounded-2xl bg-card p-8 shadow-sm">
        <div className="flex flex-col gap-4">
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <Button
            onClick={handleResend}
            disabled={cooldown > 0 || isResending}
            variant="outline"
            className="h-11 w-full rounded-lg border-border text-base font-semibold hover:border-accent"
          >
            {cooldown > 0
              ? `Resend link (${cooldown}s)`
              : isResending
                ? "Sending..."
                : "Resend link"}
          </Button>
        </div>
      </div>
      <button
        onClick={onBack}
        className="text-sm font-semibold text-primary hover:underline"
      >
        Back to login
      </button>
    </div>
  );
}
