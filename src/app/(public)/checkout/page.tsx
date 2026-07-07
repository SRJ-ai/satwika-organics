"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

/* ──── animation helpers ──── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ──── stepper data ──── */
const STEPS = [
  { label: "Shipping", icon: "" },
  { label: "Payment", icon: "" },
  { label: "Review", icon: "" },
];

/* ──── order items (mirrors cart) ──── */
const ORDER_ITEMS = [
  {
    id: 1,
    name: "Cold-Pressed Almond Oil",
    price: 24,
    quantity: 1,
    unit: "500 ml",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBjbSRJSZrnCNQ3l8WWqJzjj7_-0A-BpX2hrrL5e4k6BECtJUPJVuXTpS3ceQqM1CnC1JAtgqBFMRma8Rft-h9A0HpiC1Hu-za7xPWkPRPUN668uWcNyHnhGlpjo2cP4TQeCd0AYfRZsWtuuKn1BEcAl2s4VbEkkf0C4YkF_au24t9YhoE6ztPHpU2hTfgLRFZT7d7nUEBeDHquGWVsYs9QNN_6HGwx-HQp3x7U06iCZsdbj1uqqBexkLbuJjG4qVY6D3NJZoZfCdc",
  },
  {
    id: 2,
    name: "Raw Wild Forest Honey",
    price: 18,
    quantity: 2,
    unit: "500 g",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDU4NMw3Nac6wJptj0lB-uZAjd1Zj40_t6rshsMn_8ON8omR6wPlnbP12dd0Okjo-caCvfxqexKrRPXFG8RXS1CaBucrj_fa2bZPQo3TuzqHZsVz9pKqcZDg6_eJBqA21XDb8nTWa9mHWZSS2_a3Ch2DlRAD9ZgVgi0GPWmCSxvf-yw23nuWQ60197y97bC5OPI1CA8zNIo9ScH2daCtQBC9yHpTYSF8d4cm5z5KaN4P0lg9oGoPX9T5dVFybCKd6VwBWJ-fkY6Q-0",
  },
  {
    id: 3,
    name: "Purifying Aloe Face Cleanser",
    price: 18,
    quantity: 1,
    unit: "200 ml",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNdvHXoVFqJ3RPfPXuBMNBHKUUIMUO7Bf8zNeOWhlbWWRPnVdab_UdEwYQYZdWOoc-lpU0N5uAHtVSxhjAf3xvEEiSw2kt0MTfpAeqNP7ybKF1tDkwG-2XhZDgcLf5KV6FlWq-93WPvfp_OWpyT4vUtxKYiYFe7c8lWOF5u-M4L5i0SsaS0QG0wHD4djwQWO02Tf_sZzTwcAGVdaLG8QDdEDsYrebLsQdyKg8dW1Jz7gsqngPFZf85dYO_b9uw55oEYLL3k11f0QU",
  },
];

/* ══════════════════════════════════════════
   CHECKOUT PAGE
   ══════════════════════════════════════════ */
export default function CheckoutPage() {
  const router = useRouter();
  const activeStep = 0; // Shipping is the active step

  /* ── form state ── */
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // HTML5 validation ensures all required fields are filled before this triggers
    router.push("/checkout/success");
  };

  /* ── calculations ── */
  const subtotal = useMemo(
    () => ORDER_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0),
    []
  );
  const shipping = 5.0;
  const tax = 0;
  const total = useMemo(() => subtotal + shipping + tax, [subtotal]);

  return (
    <section className="py-12 px-6 lg:px-12 min-h-[70vh]">
      <div className="max-w-7xl mx-auto">
        {/* ── Back Link ── */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/cart"
            className="btn btn-ghost btn-sm gap-2 text-primary hover:text-secondary mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to Cart
          </Link>
        </motion.div>

        {/* ── Page Header ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-8"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-label-md uppercase tracking-[0.2em] text-secondary"
          >
            Checkout
          </motion.p>
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-headline-lg text-primary mt-2"
          >
            Complete Your Order
          </motion.h1>
        </motion.div>

        {/* ── Progress Stepper ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center max-w-lg mx-auto">
            {STEPS.map((step, i) => (
              <div key={step.label} className="flex items-center flex-1 last:flex-none">
                {/* Step circle + label */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      i === activeStep
                        ? "bg-primary text-primary-content shadow-lg shadow-primary/30 scale-110"
                        : i < activeStep
                        ? "bg-success text-success-content"
                        : "bg-base-200 text-base-content/30 border border-base-300"
                    }`}
                  >
                    {i < activeStep ? "" : step.icon}
                  </div>
                  <span
                    className={`text-xs mt-2 font-semibold tracking-wide ${
                      i === activeStep
                        ? "text-primary"
                        : i < activeStep
                        ? "text-success"
                        : "text-base-content/30"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="flex-1 mx-3 mb-6">
                    <div
                      className={`h-0.5 rounded-full transition-colors duration-300 ${
                        i < activeStep ? "bg-success" : "bg-base-300"
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ════════ LEFT — Shipping Form ════════ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl border border-base-300/60 bg-base-100 p-6 md:p-8 shadow-sm">
              <div className="flex flex-col gap-1 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <h2 className="text-headline-md text-primary">
                    Shipping Information
                  </h2>
                </div>
                <p className="text-sm text-base-content/60 ml-11">
                  Please ensure all required fields (*) are filled before proceeding.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-label-md text-base-content/70">
                      Full Name <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="input input-bordered w-full bg-base-200/30 focus:border-primary focus:bg-base-100 transition-colors"
                    required
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-label-md text-base-content/70">
                        Email Address <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="input input-bordered w-full bg-base-200/30 focus:border-primary focus:bg-base-100 transition-colors"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-label-md text-base-content/70">
                        Phone Number <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="input input-bordered w-full bg-base-200/30 focus:border-primary focus:bg-base-100 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Address Line 1 */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-label-md text-base-content/70">
                      Address Line 1 <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="address1"
                    value={form.address1}
                    onChange={handleChange}
                    placeholder="Street address, apartment, suite"
                    className="input input-bordered w-full bg-base-200/30 focus:border-primary focus:bg-base-100 transition-colors"
                    required
                  />
                </div>

                {/* Address Line 2 */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-label-md text-base-content/70">
                      Address Line 2
                    </span>
                  </label>
                  <input
                    type="text"
                    name="address2"
                    value={form.address2}
                    onChange={handleChange}
                    placeholder="Landmark, building name (optional)"
                    className="input input-bordered w-full bg-base-200/30 focus:border-primary focus:bg-base-100 transition-colors"
                  />
                </div>

                {/* City, State, PIN */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-label-md text-base-content/70">
                        City <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="input input-bordered w-full bg-base-200/30 focus:border-primary focus:bg-base-100 transition-colors"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-label-md text-base-content/70">
                        State <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      placeholder="State"
                      className="input input-bordered w-full bg-base-200/30 focus:border-primary focus:bg-base-100 transition-colors"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-label-md text-base-content/70">
                        PIN Code <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="pinCode"
                      value={form.pinCode}
                      onChange={handleChange}
                      placeholder="500001"
                      className="input input-bordered w-full bg-base-200/30 focus:border-primary focus:bg-base-100 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-full md:w-auto md:min-w-[280px] rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow text-base gap-2"
                  >
                    Continue to Payment
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* ════════ RIGHT — Order Summary ════════ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="lg:col-span-1"
          >
            <div className="sticky top-28 rounded-2xl border border-base-300/60 bg-base-100 p-6 shadow-sm">
              <h2 className="text-headline-md text-primary mb-6">
                Order Summary
              </h2>

              {/* Item list */}
              <div className="space-y-4 mb-6">
                {ORDER_ITEMS.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-base-200 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                        unoptimized
                      />
                      {item.quantity > 1 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-content text-[10px] font-bold flex items-center justify-center">
                          {item.quantity}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-primary truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-base-content/40">
                        {item.quantity} × ₹{item.price.toFixed(2)}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-primary tabular-nums shrink-0">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="divider my-2" />

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex justify-between text-body-md">
                  <span className="text-base-content/60">Subtotal</span>
                  <span className="font-semibold tabular-nums">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-body-md">
                  <span className="text-base-content/60">Shipping</span>
                  <span className="font-semibold tabular-nums">
                    ₹{shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-body-md">
                  <span className="text-base-content/60">Tax</span>
                  <span className="font-semibold tabular-nums">₹0.00</span>
                </div>
              </div>

              <div className="divider my-2" />

              <div className="flex justify-between items-baseline">
                <span className="text-headline-md text-primary">Total</span>
                <span className="text-headline-md text-primary tabular-nums">
                  ₹{total.toFixed(2)}
                </span>
              </div>

              {/* Trust indicators */}
              <div className="mt-6 pt-4 border-t border-base-300/40">
                <div className="flex flex-col gap-2 text-xs text-base-content/40">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                    Your information is securely encrypted
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                      <path d="M12 3v6" />
                    </svg>
                    Free returns within 30 days
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
