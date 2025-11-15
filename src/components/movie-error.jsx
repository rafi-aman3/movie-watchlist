"use client";

import { motion } from "framer-motion";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ErrorComponent({
  title = "Oops! Something went wrong",
  message = "We couldn't load the movies. Please try again.",
  onRetry,
  showHomeButton = false,
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="relative">
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-orange-500/10 to-yellow-500/10 dark:from-red-500/20 dark:via-orange-500/20 dark:to-yellow-500/20 rounded-2xl blur-xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Main content card */}
          <div className="relative bg-background/80 backdrop-blur-sm border border-destructive/20 rounded-2xl p-8 shadow-2xl">
            {/* Error icon with animation */}
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-destructive/20 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="relative bg-destructive/10 p-4 rounded-full">
                  <AlertCircle className="w-16 h-16 text-destructive" />
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-2xl font-bold text-center mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {title}
            </motion.h2>

            {/* Message */}
            <motion.p
              className="text-muted-foreground text-center mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {message}
            </motion.p>

            {/* Action buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {onRetry && (
                <Button onClick={onRetry} className="flex-1 group" size="lg">
                  <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                  Try Again
                </Button>
              )}

              {showHomeButton && (
                <Button
                  onClick={() => (window.location.href = "/")}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              )}
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-20 h-20 bg-destructive/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-orange-500/5 rounded-full blur-2xl" />
          </div>
        </div>

        {/* Additional help text */}
        <motion.p
          className="text-center text-sm text-muted-foreground mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          If the problem persists, please check your internet connection or try
          again later.
        </motion.p>
      </motion.div>
    </div>
  );
}
