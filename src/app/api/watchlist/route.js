import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabese/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("watchlist")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Watchlist GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch watchlist" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { movie_id, movie_title, release_year, poster_path } = body;

    if (!movie_id || !movie_title) {
      return NextResponse.json(
        { error: "movie_id and movie_title are required" },
        { status: 400 }
      );
    }

    // Check if already in watchlist
    const { data: existing } = await supabase
      .from("watchlist")
      .select("id")
      .eq("user_id", user.id)
      .eq("movie_id", movie_id)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "Movie already in watchlist" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("watchlist")
      .insert({
        user_id: user.id,
        movie_id,
        movie_title,
        release_year: release_year || null,
        poster_path: poster_path || null,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Watchlist POST error:", error);
    return NextResponse.json(
      { error: "Failed to add to watchlist" },
      { status: 500 }
    );
  }
}

