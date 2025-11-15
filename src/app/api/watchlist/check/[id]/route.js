import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabese/server";
import { cookies } from "next/headers";

export async function GET(request, context) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ inWatchlist: false });
    }

    const { id } = await context.params;

    const { data, error } = await supabase
      .from("watchlist")
      .select("id")
      .eq("user_id", user.id)
      .eq("movie_id", id)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "not found" error, which is expected
      throw error;
    }

    return NextResponse.json({ inWatchlist: !!data });
  } catch (error) {
    console.error("Watchlist check error:", error);
    return NextResponse.json({ inWatchlist: false });
  }
}

