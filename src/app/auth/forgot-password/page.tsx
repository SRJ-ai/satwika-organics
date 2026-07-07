"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-primary mb-8 font-medium transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to login
      </Link>

      <div className="mb-8">
        <h2 className="text-3xl font-serif text-primary font-bold mb-2">Reset Password</h2>
        <p className="text-base-content/60">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      {submitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 bg-success/10 border border-success/20 rounded-2xl text-center"
        >
          <div className="w-12 h-12 rounded-full bg-success/20 text-success flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
          </div>
          <h3 className="text-lg font-bold text-success-content mb-2">Check your email</h3>
          <p className="text-sm text-success-content/80">
            We have sent a password reset link to your email address.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-base-content/80">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered focus:input-primary bg-base-200/50 w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      )}
    </motion.div>
  );
}
