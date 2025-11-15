import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import { ListIcon, Menu, X } from "lucide-react";

export function MobileActions({ user, mobileMenu }) {
  return (
    <div className="flex md:hidden items-center gap-2">
      <ThemeToggle />
      {user && (
        <Link href="/watchlist" aria-label="View watchlist">
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
        onClick={mobileMenu.toggle}
        aria-label={mobileMenu.isOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenu.isOpen}
      >
        {mobileMenu.isOpen ? (
          <X className="size-5" />
        ) : (
          <Menu className="size-5" />
        )}
      </Button>
    </div>
  );
}
