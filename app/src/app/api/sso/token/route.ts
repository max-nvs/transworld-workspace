import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { issueToken } from "@/lib/sso";
import { TOOLS } from "@/lib/tools";

/**
 * POST /api/sso/token
 *
 * Called by the workspace UI when a user clicks an external tool card.
 * Returns a signed SSO token that the frontend uses to redirect the user.
 *
 * Body: { tool_id: string }
 * Response: { token: string, redirect_url: string }
 */
export async function POST(request: Request) {
  try {
    const { tool_id } = await request.json();

    if (!tool_id || typeof tool_id !== "string") {
      return NextResponse.json(
        { error: "tool_id is required" },
        { status: 400 }
      );
    }

    // Look up the tool
    const tool = TOOLS.find((t) => t.id === tool_id);
    if (!tool || tool.href === "#") {
      return NextResponse.json(
        { error: "Tool not found or not yet connected" },
        { status: 404 }
      );
    }

    // Get the authenticated user from Supabase session
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Issue a short-lived SSO token
    const token = await issueToken({
      email: user.email ?? "",
      sub: user.id,
      tool_id: tool.id,
      tool_url: tool.href,
    });

    // Build the redirect URL with the SSO token
    const redirectUrl = new URL(tool.href);
    redirectUrl.searchParams.set("sso_token", token);

    return NextResponse.json({
      token,
      redirect_url: redirectUrl.toString(),
    });
  } catch (error) {
    console.error("SSO token generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate SSO token" },
      { status: 500 }
    );
  }
}
