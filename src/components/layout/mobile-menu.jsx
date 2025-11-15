import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { useAuth } from "../auth-provider";
import { Button } from "../ui/button";
import Link from "next/link";

const MobileMenu = ({
  isMobileMenuOpen,
  handleSearch,
  searchQuery,
  setSearchQuery,
  handleLogout,
  setIsMobileMenuOpen,
}) => {
  const { user } = useAuth();

  return (
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
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
