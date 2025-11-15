import { NextResponse } from "next/server";
import { tmdb } from "@/lib/tmdb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";

    const data = await tmdb(`/movie/popular?page=${page}`);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Popular API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch popular movies" },
      { status: 500 }
    );
  }
}

