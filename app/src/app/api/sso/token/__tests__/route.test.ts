// jose v6 uses Web Crypto API internally — needs node environment, not jsdom
// @vitest-environment node
import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";
import { POST } from "../route";
import { createClient } from "@/lib/supabase/server";
import { verifyToken } from "@/lib/sso";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

const SIGNED_IN_USER = { id: "user-123", email: "max@transworldltd.com.ng" };

function mockUser(user: typeof SIGNED_IN_USER | null) {
  vi.mocked(createClient).mockResolvedValue({
    auth: { getUser: async () => ({ data: { user } }) },
  } as unknown as Awaited<ReturnType<typeof createClient>>);
}

function post(body: unknown) {
  return POST(
    new Request("https://workspace.test/api/sso/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  );
}

beforeAll(() => {
  process.env.WORKSPACE_JWT_SECRET = "test-secret-for-unit-tests-only-32chars!";
});

beforeEach(() => {
  mockUser(SIGNED_IN_USER);
});

describe("POST /api/sso/token", () => {
  it("issues a token for a tool that accepts workspace SSO", async () => {
    const res = await post({ tool_id: "treasury" });
    expect(res.status).toBe(200);

    const { token, redirect_url } = await res.json();
    const payload = await verifyToken(token);
    expect(payload.email).toBe(SIGNED_IN_USER.email);
    expect(payload.sub).toBe(SIGNED_IN_USER.id);
    expect(payload.tool_id).toBe("treasury");
    expect(redirect_url).toContain("sso_token=");
  });

  // The whole point of the link-only tile. Matamba is a third party with its
  // own login; a workspace identity token must never reach its access logs,
  // and the ToolCard skipping this call is not a control — anyone can POST here.
  it("refuses to mint a token for a link-only tool", async () => {
    const res = await post({ tool_id: "matamba" });

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.token).toBeUndefined();
    expect(body.redirect_url).toBeUndefined();
    expect(body.error).toMatch(/does not use workspace SSO/i);
  });

  it("refuses a tool that is not built yet", async () => {
    const res = await post({ tool_id: "tcis" });
    expect(res.status).toBe(404);
    expect((await res.json()).token).toBeUndefined();
  });

  it("refuses an unknown tool id", async () => {
    const res = await post({ tool_id: "not-a-real-tool" });
    expect(res.status).toBe(404);
  });

  it("refuses a request with no tool_id", async () => {
    const res = await post({});
    expect(res.status).toBe(400);
  });

  it("refuses an anonymous caller", async () => {
    mockUser(null);

    const res = await post({ tool_id: "treasury" });
    expect(res.status).toBe(401);
    expect((await res.json()).token).toBeUndefined();
  });
});
