"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/* ──── animation helpers ──── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ──── checkmark circle animation ──── */
const checkCircle = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
      delay: 0.2,
    },
  },
};

const checkPath = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { delay: 0.6, duration: 0.5, ease: "easeOut" as const },
  },
};

/* ──── delivery date (7 days from now) ──── */
function getEstimatedDelivery(): string {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ══════════════════════════════════════════
   CHECKOUT SUCCESS PAGE
   ══════════════════════════════════════════ */
export default function CheckoutSuccessPage() {
  const estimatedDelivery = getEstimatedDelivery();
  const orderNumber = "#SAT-20260707-001";

  return (
    <section className="min-h-[75vh] flex items-center justify-center px-6 py-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="max-w-lg mx-auto text-center"
      >
        {/* ── Animated Checkmark ── */}
        <motion.div
          variants={checkCircle}
          className="mx-auto w-28 h-28 rounded-full bg-success/10 flex items-center justify-center mb-8"
        >
          <motion.div
            variants={checkCircle}
            className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-success"
            >
              <motion.circle
                cx="24"
                cy="24"
                r="22"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: {
                    pathLength: 1,
                    opacity: 1,
                    transition: { delay: 0.3, duration: 0.6, ease: "easeOut" as const },
                  },
                }}
              />
              <motion.path
                d="M14 24l7 7 13-13"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: {
                    pathLength: 1,
                    opacity: 1,
                    transition: { delay: 0.6, duration: 0.5, ease: "easeOut" as const },
                  },
                }}
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* ── Celebratory sparkles ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="text-3xl mb-4 select-none"
        >
          
        </motion.div>

        {/* ── Heading ── */}
        <motion.h1
          variants={fadeUp}
          custom={0}
          className="text-headline-lg text-primary"
        >
          Order Confirmed!
        </motion.h1>

        {/* ── Message ── */}
        <motion.p
          variants={fadeUp}
          custom={1}
          className="text-body-lg text-base-content/60 mt-3 max-w-md mx-auto"
        >
          Your order has been placed successfully. We&apos;re preparing your organic
          goodness with care.
        </motion.p>

        {/* ── Order Details Card ── */}
        <motion.div
          variants={fadeUp}
          custom={2}
          className="mt-8 rounded-2xl border border-base-300/60 bg-base-100 p-6 shadow-sm text-left"
        >
          <div className="space-y-4">
            {/* Order number */}
            <div className="flex items-center justify-between">
              <span className="text-label-md text-base-content/50">
                Order Number
              </span>
              <span className="font-serif font-bold text-primary text-lg tracking-wide">
                {orderNumber}
              </span>
            </div>

            <div className="divider my-0" />

            {/* Estimated delivery */}
            <div className="flex items-center justify-between">
              <span className="text-label-md text-base-content/50">
                Estimated Delivery
              </span>
              <span className="text-body-md font-semibold text-primary">
                {estimatedDelivery}
              </span>
            </div>

            <div className="divider my-0" />

            {/* Status */}
            <div className="flex items-center justify-between">
              <span className="text-label-md text-base-content/50">Status</span>
              <span className="badge badge-success badge-sm gap-1 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-success-content inline-block" />
                Processing
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Info note ── */}
        <motion.p
          variants={fadeUp}
          custom={3}
          className="text-sm text-base-content/40 mt-6 max-w-sm mx-auto"
        >
          A confirmation email with tracking details will be sent to your
          registered email address shortly.
        </motion.p>

        {/* ── Action Buttons ── */}
        <motion.div
          variants={fadeUp}
          custom={4}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/catalog"
            className="btn btn-primary btn-lg rounded-full px-10 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Continue Shopping
          </Link>
          <Link
            href="/customer/orders"
            className="btn btn-ghost btn-lg rounded-full border border-base-300 hover:bg-base-200 text-base-content gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
              <path d="M14 2v6h6" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
              <path d="M10 9H8" />
            </svg>
            View Orders
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
