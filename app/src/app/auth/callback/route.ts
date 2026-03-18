import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  console.log("Auth callback hit:", { code: !!code, origin });

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.session) {
      return NextResponse.redirect(`${origin}/`);
    }

    console.error("Auth callback error:", {
      message: error?.message,
      status: error?.status,
      code: error?.code,
    });
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
