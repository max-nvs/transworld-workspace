import { describe, it, expect, vi } from "vitest";

vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test.supabase.co");
vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key");

describe("supabase browser client", () => {
  it("exports a createClient function", async () => {
    const mod = await import("../client");
    expect(mod.createClient).toBeDefined();
    expect(typeof mod.createClient).toBe("function");
  });
});
