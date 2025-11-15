import { NextResponse } from "next/server";
import { tmdb } from "@/lib/tmdb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";

    const data = await tmdb(`/trending/movie/day?page=${page}`);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Trending API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch trending movies" },
      { status: 500 }
    );
  }
}

