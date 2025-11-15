"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/auth-provider";
import { ListIcon, Search, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { user, supabase } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <Link 
            href="/" 
            className="font-bold text-lg shrink-0 hover:opacity-80 transition-opacity"
          >
            🎬 Movie Watchlist
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
              <Input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 transition-all focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </form>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground hidden lg:inline truncate max-w-[150px]">
                  {user.user_metadata?.name || user.email}
                </span>
                <Button 
                  onClick={handleLogout} 
                  variant="outline" 
                  size="sm"
                  className="hover:scale-105 transition-transform"
                >
                  Logout
                </Button>
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
                  <Button 
                    size="sm"
                    className="hover:scale-105 transition-transform"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            <ThemeToggle />

            {user && (
              <Link href="/watchlist">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="size-9 hover:scale-110 transition-transform"
                >
                  <ListIcon className="size-4" />
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            {user && (
              <Link href="/watchlist">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="size-9 hover:scale-110 transition-transform"
                >
                  <ListIcon className="size-4" />
                </Button>
              </Link>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="size-9"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4 border-t border-border/50">
                {/* Mobile Search */}
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                    <Input
                      type="text"
                      placeholder="Search movies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </form>

                {/* Mobile Auth Actions */}
                {user ? (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground px-2">
                      {user.user_metadata?.name || user.email}
                    </div>
                    <Button 
                      onClick={handleLogout} 
                      variant="outline" 
                      className="w-full"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
