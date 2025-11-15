import { NextResponse } from "next/server";
import { tmdb } from "@/lib/tmdb";

export async function GET(request, context) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json(
        { error: "Movie ID is required" },
        { status: 400 }
      );
    }

    const data = await tmdb(`/movie/${id}`);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Movie details API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie details" },
      { status: 500 }
    );
  }
}
