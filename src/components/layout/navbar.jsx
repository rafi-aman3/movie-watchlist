"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { DesktopNavActions } from "./desktop-nav-action";
import MobileMenu from "./mobile-menu";
import { MobileActions } from "./mobile-actions";
import SearchForm from "./search-form";
import { useMobileMenu } from "@/hooks/layout/useMobileMenu";
import { useSearch } from "@/hooks/layout/useSearch";

export function Navbar() {
  const { user, supabase } = useAuth();
  const router = useRouter();
  const search = useSearch();
  const mobileMenu = useMobileMenu();

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    mobileMenu.close();
    router.push("/");
  }, [supabase, router, mobileMenu]);

  const handleSearchWithClose = useCallback(
    (e) => {
      search.handleSearch(e, mobileMenu.close);
    },
    [search, mobileMenu]
  );

  return (
    <nav className="border-b border-border/50 bg-transparent backdrop-blur-[66px] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          <Link
            href="/"
            className="font-bold text-lg text-primary shrink-0 hover:opacity-80 transition-opacity"
            aria-label="Home"
          >
            🎬 Movie Watchlist
          </Link>
          <SearchForm
            searchQuery={search.searchQuery}
            setSearchQuery={search.setSearchQuery}
            handleSearch={handleSearchWithClose}
            className="hidden md:flex flex-1 max-w-md mx-4"
          />
          <DesktopNavActions handleLogout={handleLogout} />
          <MobileActions user={user} mobileMenu={mobileMenu} />
        </div>
        <MobileMenu
          isMobileMenuOpen={mobileMenu.isOpen}
          handleSearch={handleSearchWithClose}
          searchQuery={search.searchQuery}
          setSearchQuery={search.setSearchQuery}
          handleLogout={handleLogout}
          setIsMobileMenuOpen={mobileMenu.close}
        />
      </div>
    </nav>
  );
}
