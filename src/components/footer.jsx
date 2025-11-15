"use client";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg">🎬 Movie Watchlist</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Track and manage your favorite movies
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>© 2024 Movie Watchlist. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
