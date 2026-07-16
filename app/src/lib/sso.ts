import { SignJWT, jwtVerify } from "jose";

const SSO_TOKEN_EXPIRY = "30s"; // One-time code, very short-lived

function getSecret(): Uint8Array {
  const secret = process.env.WORKSPACE_JWT_SECRET;
  if (!secret) {
    throw new Error("WORKSPACE_JWT_SECRET is not configured");
  }
  return new TextEncoder().encode(secret);
}

export interface SSOPayload {
  /** User's email from Supabase auth */
  email: string;
  /** Supabase user ID */
  sub: string;
  /** Target tool ID (e.g. "verify-desk") */
  tool_id: string;
  /** Target tool URL (for validation) */
  tool_url: string;
}

/**
 * Issue a short-lived SSO token for redirecting a user to an external tool.
 *
 * The audience is the tool id. Signing is symmetric (HS256) with one secret
 * shared by every tool, so without `aud` a token minted for one tool is a valid
 * token at every other tool that trusts the same secret — a lower-trust tool
 * could hand its token on to a higher-trust one. Tools must verify the audience
 * is their own id. Existing verifiers that only check the issuer are unaffected
 * by the extra claim.
 */
export async function issueToken(payload: SSOPayload): Promise<string> {
  return new SignJWT({
    email: payload.email,
    tool_id: payload.tool_id,
    tool_url: payload.tool_url,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(SSO_TOKEN_EXPIRY)
    .setIssuer("transworld-workspace")
    .setAudience(payload.tool_id)
    .sign(getSecret());
}

/**
 * Verify an SSO token and return the payload.
 * Called by tools via /api/sso/verify to exchange the one-time code for user info.
 */
export async function verifyToken(token: string): Promise<SSOPayload> {
  const { payload } = await jwtVerify(token, getSecret(), {
    issuer: "transworld-workspace",
  });

  return {
    email: payload.email as string,
    sub: payload.sub as string,
    tool_id: payload.tool_id as string,
    tool_url: payload.tool_url as string,
  };
}
