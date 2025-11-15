"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">🎬 Movie Watchlist</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Track and manage your favorite movies
        </p>
        
        {user ? (
          <div>
            <p className="text-lg mb-6">
              Welcome, <span className="font-semibold">{user.user_metadata?.name || user.email}</span>!
            </p>
            <Button size="lg">
              Start Exploring Movies
            </Button>
          </div>
        ) : (
          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <Button variant="outline" size="lg">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
