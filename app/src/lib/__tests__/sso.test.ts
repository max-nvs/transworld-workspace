// jose v6 uses Web Crypto API internally — needs node environment, not jsdom
// @vitest-environment node
import { describe, it, expect, beforeAll } from "vitest";
import { issueToken, verifyToken } from "../sso";

// Set a test secret before running SSO tests
beforeAll(() => {
  process.env.WORKSPACE_JWT_SECRET = "test-secret-for-unit-tests-only-32chars!";
});

const VALID_PAYLOAD = {
  email: "max@transworldltd.com.ng",
  sub: "user-123",
  tool_id: "verify-desk",
  tool_url: "https://verifydesk.netlify.app/sign-in",
};

describe("SSO", () => {
  it("issues a token that can be verified", async () => {
    const token = await issueToken(VALID_PAYLOAD);
    expect(token).toBeTruthy();
    expect(typeof token).toBe("string");

    const payload = await verifyToken(token);
    expect(payload.email).toBe(VALID_PAYLOAD.email);
    expect(payload.sub).toBe(VALID_PAYLOAD.sub);
    expect(payload.tool_id).toBe(VALID_PAYLOAD.tool_id);
    expect(payload.tool_url).toBe(VALID_PAYLOAD.tool_url);
  });

  it("rejects a tampered token", async () => {
    const token = await issueToken(VALID_PAYLOAD);
    const tampered = token.slice(0, -5) + "XXXXX";

    await expect(verifyToken(tampered)).rejects.toThrow();
  });

  it("rejects a token signed with a different secret", async () => {
    const token = await issueToken(VALID_PAYLOAD);

    // Change the secret
    process.env.WORKSPACE_JWT_SECRET = "different-secret-entirely-32chars!!";

    await expect(verifyToken(token)).rejects.toThrow();

    // Restore original secret
    process.env.WORKSPACE_JWT_SECRET =
      "test-secret-for-unit-tests-only-32chars!";
  });

  it("throws when WORKSPACE_JWT_SECRET is not set", async () => {
    const original = process.env.WORKSPACE_JWT_SECRET;
    delete process.env.WORKSPACE_JWT_SECRET;

    await expect(issueToken(VALID_PAYLOAD)).rejects.toThrow(
      "WORKSPACE_JWT_SECRET is not configured"
    );

    process.env.WORKSPACE_JWT_SECRET = original;
  });
});
