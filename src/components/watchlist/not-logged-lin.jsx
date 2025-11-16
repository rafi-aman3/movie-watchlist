import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";

const NotLoggedIn = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">My Watchlist</h1>
        <p className="text-muted-foreground mb-6">
          Please log in to view your watchlist.
        </p>
        <Link href="/login">
          <Button className="hover:scale-105 transition-transform">
            Login
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotLoggedIn;
