import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Signupsuccess = ({email}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://image.tmdb.org/t/p/original/eOkcT93n6tztcvVRSniL7DX9ah9.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/70" />
      </div>

      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-background/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-border/50">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-center mb-6"
          >
            <div className="size-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
              <CheckCircle2 className="size-10 text-green-500 relative z-10" />
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              Account Created!
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 text-center"
          >
            <p className="text-muted-foreground">
              We've sent a confirmation email to
            </p>
            <p className="font-semibold text-foreground text-lg bg-primary/10 rounded-lg py-2 px-4">
              {email}
            </p>
            <p className="text-muted-foreground text-sm">
              Please check your email and click the confirmation link to verify
              your account before you can log in.
            </p>

            <div className="pt-4 space-y-3">
              <p className="text-xs text-muted-foreground">
                Didn't receive the email? Check your spam folder or contact
                support.
              </p>
              <Link href="/login" className="block">
                <Button className="w-full group" size="lg">
                  Go to Login
                  <motion.span
                    className="ml-2 inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signupsuccess;
