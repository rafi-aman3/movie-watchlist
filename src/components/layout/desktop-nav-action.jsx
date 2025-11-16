import React from "react";
import { useAuth } from "../auth-provider";
import { ThemeToggle } from "../theme-toggle";
import Link from "next/link";
import { Button } from "../ui/button";
import { BookmarkPlus } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { LogoutButton } from "../auth/logout-button";

export const DesktopNavActions = ({ handleLogout }) => {
  const { user } = useAuth();

  return (
    <div className="hidden md:flex items-center gap-2 shrink-0">
      {user && (
        <Link href="/watchlist">
          <Button
            variant="outline"
            size="sm"
            className="hover:scale-110 transition-transform"
          >
            <BookmarkPlus className="size-4" />
            Watchlist
          </Button>
        </Link>
      )}

      <ThemeToggle />

      {user ? (
        <>
          <Avatar>
            <AvatarFallback>
              {(user.user_metadata?.name || user.email)?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <LogoutButton onLogout={handleLogout} variant="outline" size="sm" />
        </>
      ) : (
        <>
          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="hover:scale-105 transition-transform"
            >
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="hover:scale-105 transition-transform">
              Sign Up
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};
