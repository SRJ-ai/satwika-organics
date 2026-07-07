"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/customer"; // mock redirect
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-primary font-bold mb-2">Create an Account</h2>
        <p className="text-base-content/60">Start your journey to pure, organic living.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-base-content/80">First Name</span>
            </label>
            <input
              type="text"
              placeholder="John"
              className="input input-bordered focus:input-primary bg-base-200/50 w-full"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-base-content/80">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="Doe"
              className="input input-bordered focus:input-primary bg-base-200/50 w-full"
              required
            />
          </div>
        </div>

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

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-base-content/80">Password</span>
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="input input-bordered focus:input-primary bg-base-200/50 w-full"
            required
          />
          <label className="label">
            <span className="label-text-alt text-base-content/50">Must be at least 8 characters.</span>
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow mt-2"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <p className="text-center mt-8 text-base-content/60 text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-primary font-bold hover:underline">
          Log in
        </Link>
      </p>
    </motion.div>
  );
}
