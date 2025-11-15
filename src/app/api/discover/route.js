import { NextResponse } from "next/server";
import { tmdb } from "@/lib/tmdb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const genreIds = searchParams.get("with_genres");
    const page = searchParams.get("page") || "1";
    const excludeId = searchParams.get("exclude_id");

    if (!genreIds) {
      return NextResponse.json(
        { error: "with_genres parameter is required" },
        { status: 400 }
      );
    }

    const url = `/discover/movie?with_genres=${genreIds}&page=${page}&sort_by=popularity.desc`;
    const data = await tmdb(url);
    
    // Filter out excluded movie if provided
    if (excludeId && data.results) {
      data.results = data.results.filter((movie) => movie.id.toString() !== excludeId.toString());
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Discover API error:", error);
    return NextResponse.json(
      { error: "Failed to discover movies" },
      { status: 500 }
    );
  }
}

