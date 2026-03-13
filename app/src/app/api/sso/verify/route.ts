import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/sso";

/**
 * POST /api/sso/verify
 *
 * Called by external tools to verify an SSO token and get user info.
 * This is the "token exchange" step — tools send the one-time token,
 * workspace returns the verified user identity.
 *
 * Body: { token: string }
 * Response: { email: string, user_id: string, tool_id: string }
 *
 * Tools should:
 * 1. Extract sso_token from URL when user arrives
 * 2. POST it to this endpoint
 * 3. Create their own session with the returned user info
 * 4. Strip the sso_token from the URL
 */
export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { error: "token is required" },
        { status: 400 }
      );
    }

    const payload = await verifyToken(token);

    return NextResponse.json({
      email: payload.email,
      user_id: payload.sub,
      tool_id: payload.tool_id,
    });
  } catch (error) {
    // Token expired, tampered, or invalid
    const message =
      error instanceof Error ? error.message : "Token verification failed";

    console.error("SSO verify failed:", message);

    return NextResponse.json(
      { error: "Invalid or expired SSO token" },
      { status: 401 }
    );
  }
}
