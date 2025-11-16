"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { motion } from "framer-motion";
import Signupsuccess from "@/components/auth/signup/signup-success";
import { z } from "zod";
import { SignUpPagefadeInUp } from "@/lib/animation/signup";
import { FORM_FIELDS, signUpSchema } from "@/schema/signup";
import LoadingSpinner from "@/components/loading-spinner";
import BackgroundOverlay from "@/components/auth/background-overlay";
import GlowOrbs from "@/components/auth/glow";
import ErrorAlert from "@/components/auth/signup/signup-error";
import FormField from "@/components/auth/form-field";
import FormHeader from "@/components/auth/signup/form-header";
import FormFooter from "@/components/auth/signup/form-footer";
import FormAction from "@/components/auth/signup/form-action";

export default function SignUpPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { supabase, loading: authLoading } = useAuth();

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    try {
      signUpSchema.parse(formData);
      setFieldErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors = {};
        err.issues.forEach((issue) => {
          errors[issue.path[0]] = issue.message;
        });
        setFieldErrors(errors);
      }
      return false;
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: { data: { name: formData.name } },
      });

      if (error) throw error;
      setSuccess(true);
    } catch (err) {
      setError(err?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <LoadingSpinner />;
  if (success) return <Signupsuccess email={formData.email} />;

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
          <form onSubmit={handleSignUp} className="space-y-4">
            {FORM_FIELDS.map((field) => (
              <FormField
                key={field.id}
                field={field}
                value={formData[field.id]}
                onChange={handleChange(field.id)}
                disabled={loading}
                error={fieldErrors[field.id]}
              />
            ))}
            <FormAction loading={loading} />
          </form>
          <FormFooter />
        </div>
      </motion.div>
    </div>
  );
}