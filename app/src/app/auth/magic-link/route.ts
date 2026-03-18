import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Only allow Transworld company emails
    const allowedDomains = ["transworldltd.com.ng", "transworld.com.ng"];
    const emailDomain = email.toLowerCase().split("@")[1];
    if (!emailDomain || !allowedDomains.includes(emailDomain)) {
      return NextResponse.json(
        { error: "Only Transworld company emails are allowed." },
        { status: 403 }
      );
    }

    // Dev preview mode — Supabase not configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl || !supabaseUrl.startsWith("http")) {
      return NextResponse.json({ success: true });
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${new URL(request.url).origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Magic link error:", { email, error: error.message });
      return NextResponse.json(
        { error: "Failed to send magic link. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Magic link unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
