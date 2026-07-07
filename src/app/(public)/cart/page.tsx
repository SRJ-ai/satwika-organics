"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

/* ──── types ──── */
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  purity: string;
  image: string;
}

/* ──── initial data ──── */
const INITIAL_CART: CartItem[] = [
  {
    id: 1,
    name: "Cold-Pressed Almond Oil",
    price: 24,
    quantity: 1,
    unit: "500 ml",
    purity: "100% Pure",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBjbSRJSZrnCNQ3l8WWqJzjj7_-0A-BpX2hrrL5e4k6BECtJUPJVuXTpS3ceQqM1CnC1JAtgqBFMRma8Rft-h9A0HpiC1Hu-za7xPWkPRPUN668uWcNyHnhGlpjo2cP4TQeCd0AYfRZsWtuuKn1BEcAl2s4VbEkkf0C4YkF_au24t9YhoE6ztPHpU2hTfgLRFZT7d7nUEBeDHquGWVsYs9QNN_6HGwx-HQp3x7U06iCZsdbj1uqqBexkLbuJjG4qVY6D3NJZoZfCdc",
  },
  {
    id: 2,
    name: "Raw Wild Forest Honey",
    price: 18,
    quantity: 2,
    unit: "500 g",
    purity: "Raw & Unprocessed",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDU4NMw3Nac6wJptj0lB-uZAjd1Zj40_t6rshsMn_8ON8omR6wPlnbP12dd0Okjo-caCvfxqexKrRPXFG8RXS1CaBucrj_fa2bZPQo3TuzqHZsVz9pKqcZDg6_eJBqA21XDb8nTWa9mHWZSS2_a3Ch2DlRAD9ZgVgi0GPWmCSxvf-yw23nuWQ60197y97bC5OPI1CA8zNIo9ScH2daCtQBC9yHpTYSF8d4cm5z5KaN4P0lg9oGoPX9T5dVFybCKd6VwBWJ-fkY6Q-0",
  },
  {
    id: 3,
    name: "Purifying Aloe Face Cleanser",
    price: 18,
    quantity: 1,
    unit: "200 ml",
    purity: "Certified Organic",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNdvHXoVFqJ3RPfPXuBMNBHKUUIMUO7Bf8zNeOWhlbWWRPnVdab_UdEwYQYZdWOoc-lpU0N5uAHtVSxhjAf3xvEEiSw2kt0MTfpAeqNP7ybKF1tDkwG-2XhZDgcLf5KV6FlWq-93WPvfp_OWpyT4vUtxKYiYFe7c8lWOF5u-M4L5i0SsaS0QG0wHD4djwQWO02Tf_sZzTwcAGVdaLG8QDdEDsYrebLsQdyKg8dW1Jz7gsqngPFZf85dYO_b9uw55oEYLL3k11f0QU",
  },
];

/* ──── icons ──── */
function MinusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  );
}

function ShoppingBagIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-base-content/20">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

/* ══════════════════════════════════════════
   CART PAGE
   ══════════════════════════════════════════ */
export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  /* ── quantity handlers ── */
  const increment = useCallback((id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const decrement = useCallback((id: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  /* ── promo logic ── */
  const applyPromo = useCallback(() => {
    const code = promoCode.trim().toUpperCase();
    setPromoError(null);

    if (!code) {
      setPromoError("Please enter a promo code.");
      return;
    }

    if (appliedPromo === code) {
      setPromoError("This promo code has already been applied.");
      return;
    }

    if (code === "WELCOME10") {
      setAppliedPromo(code);
      setPromoError(null);
      setPromoCode("");
    } else {
      setPromoError("Invalid promo code. Try WELCOME10.");
    }
  }, [promoCode, appliedPromo]);

  const removePromo = useCallback(() => {
    setAppliedPromo(null);
    setPromoError(null);
  }, []);

  /* ── calculations (reactive via useMemo) ── */
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const discount = useMemo(
    () => (appliedPromo === "WELCOME10" ? subtotal * 0.1 : 0),
    [appliedPromo, subtotal]
  );

  const tax = 0;

  const total = useMemo(
    () => subtotal - discount + tax,
    [subtotal, discount]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  /* ── empty cart state ── */
  if (items.length === 0) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" as const }}
            className="flex justify-center mb-6"
          >
            <ShoppingBagIcon />
          </motion.div>
          <h1 className="text-headline-lg text-primary mb-3">
            Your Cart is Empty
          </h1>
          <p className="text-body-md text-base-content/60 mb-8">
            Looks like you haven&apos;t added anything yet. Explore our curated
            collection of pure, organic products.
          </p>
          <Link
            href="/catalog"
            className="btn btn-primary btn-lg rounded-full px-10 shadow-lg shadow-primary/20"
          >
            Shop Now
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-12 px-6 lg:px-12 min-h-[70vh]">
      <div className="max-w-7xl mx-auto">
        {/* ── Page Header ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-10"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="text-label-md uppercase tracking-[0.2em] text-secondary"
          >
            Shopping Cart
          </motion.p>
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-headline-lg text-primary mt-2"
          >
            Your Cart
            <span className="text-body-lg text-base-content/50 ml-3 font-sans font-normal">
              ({itemCount} {itemCount === 1 ? "item" : "items"})
            </span>
          </motion.h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ════════ LEFT — Cart Items ════════ */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -60, transition: { duration: 0.3 } }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                  className="group flex flex-col sm:flex-row gap-5 p-5 mb-4 rounded-2xl bg-base-100 border border-base-300/60 hover:border-primary/20 hover:shadow-sm transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative w-full sm:w-28 h-28 rounded-xl overflow-hidden bg-base-200 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="112px"
                      unoptimized
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-serif text-lg font-semibold text-primary truncate">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="badge badge-outline badge-sm text-xs border-success/40 text-success">
                              {item.purity}
                            </span>
                            <span className="text-xs text-base-content/40 uppercase">
                              {item.unit}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="btn btn-ghost btn-sm btn-square text-base-content/30 hover:text-error hover:bg-error/10 transition-colors shrink-0"
                          aria-label={`Remove ${item.name}`}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-0.5 bg-base-200 rounded-full p-1">
                        <button
                          onClick={() => decrement(item.id)}
                          className="btn btn-circle btn-ghost btn-xs hover:bg-base-300"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-primary tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increment(item.id)}
                          className="btn btn-circle btn-ghost btn-xs hover:bg-base-300"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon />
                        </button>
                      </div>

                      {/* Price */}
                      <p className="text-lg font-bold text-primary tabular-nums">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Continue shopping link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6"
            >
              <Link
                href="/catalog"
                className="btn btn-ghost btn-sm gap-2 text-primary hover:text-secondary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
                Continue Shopping
              </Link>
            </motion.div>
          </div>

          {/* ════════ RIGHT — Order Summary ════════ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="lg:col-span-1"
          >
            <div className="sticky top-28 rounded-2xl border border-base-300/60 bg-base-100 p-6 shadow-sm">
              <h2 className="text-headline-md text-primary mb-6">
                Order Summary
              </h2>

              {/* Line items */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-body-md">
                  <span className="text-base-content/60">Subtotal</span>
                  <span className="font-semibold tabular-nums">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-body-md">
                  <span className="text-base-content/60">Shipping</span>
                  <span className="text-sm text-base-content/40 italic">
                    Calculated at checkout
                  </span>
                </div>
                <div className="flex justify-between text-body-md">
                  <span className="text-base-content/60">Tax</span>
                  <span className="font-semibold tabular-nums">₹0.00</span>
                </div>

                {/* Discount line */}
                <AnimatePresence>
                  {discount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between text-body-md text-success overflow-hidden"
                    >
                      <span className="flex items-center gap-1.5">
                        <TagIcon />
                        WELCOME10
                        <button
                          onClick={removePromo}
                          className="btn btn-ghost btn-xs text-error ml-1"
                          aria-label="Remove promo code"
                        >
                          X
                        </button>
                      </span>
                      <span className="font-semibold tabular-nums">
                        −₹{discount.toFixed(2)}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="divider my-2" />

              {/* Total */}
              <div className="flex justify-between items-baseline mb-6">
                <span className="text-headline-md text-primary">Total</span>
                <span className="text-headline-md text-primary tabular-nums">
                  ₹{total.toFixed(2)}
                </span>
              </div>

              {/* Promo code */}
              <div className="mb-6">
                <label className="text-label-md text-base-content/60 mb-2 block">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoError(null);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                    placeholder="Enter code"
                    className="input input-bordered flex-1 bg-base-200/50 focus:border-primary text-sm"
                  />
                  <button
                    onClick={applyPromo}
                    className="btn btn-outline btn-primary btn-sm self-center"
                  >
                    Apply
                  </button>
                </div>
                <AnimatePresence>
                  {promoError && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-xs text-error mt-2"
                    >
                      {promoError}
                    </motion.p>
                  )}
                </AnimatePresence>
                {appliedPromo && !promoError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-success mt-2"
                  >
                     Promo code applied — 10% off!
                  </motion.p>
                )}
              </div>

              {/* Checkout button */}
              <Link
                href="/checkout"
                className="btn btn-primary w-full rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow text-base"
              >
                Proceed to Checkout
              </Link>

              {/* Trust badges */}
              <div className="mt-6 flex items-center justify-center gap-4 text-base-content/30">
                <div className="flex items-center gap-1 text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Secure
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                  Protected
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Free Returns
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
