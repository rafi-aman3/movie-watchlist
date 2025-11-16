"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/auth-provider";
import LoadingSpinner from "@/components/loading-spinner";
import BackgroundOverlay from "@/components/auth/background-overlay";
import GlowOrbs from "@/components/auth/glow";
import { motion } from "framer-motion";
import { SignUpPagefadeInUp } from "@/lib/animation/signup";
import FormHeader from "@/components/auth/login/form-header";
import ErrorAlert from "@/components/auth/signup/signup-error";
import FormFooter from "@/components/auth/login/form-footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { supabase, loading: authLoading } = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      router.push("/");
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <LoadingSpinner />

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">

      <BackgroundOverlay />
      <GlowOrbs />
      <motion.div
        {...SignUpPagefadeInUp}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-background/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-border/50">
          <FormHeader />
          {error && <ErrorAlert message={error} />}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setError('');
                  setEmail(e.target.value)
                }}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setError('');
                  setPassword(e.target.value)
                }}
                required
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <FormFooter />
        </div>
      </motion.div>
    </div>
  );
}
