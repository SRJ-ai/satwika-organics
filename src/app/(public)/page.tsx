"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";



/* ──── animation helpers ──── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.03,
    y: -8,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

/* ──── data ──── */
const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Wood Pressed Groundnut Oil",
    price: "₹450",
    unit: "500 ml",
    badge: "Best Seller",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDddzKxJdXVhXtEp_13KvTM7mmp3s50cb4hUjzNTUpbrL4Lc4hNHucuq8JS0uJfDkIeQZeu0giOqVEZ6bfFIoQbdyveWnFQOcZZ_eH8WDfr4luAg9wSe0N4G6dsgINkTPRLesx91SC_QahTpxNLMjD7EzmJZmVTtC5_idy6AYdFiFuKBIr8Brf3_rJn-_KuiXIQQyGT9nDqyU8mRjL1Qdi1IeqyjXiulo0AwUeinu5A1BxU836Du5GYi4j55R49pGg3lxFRu2QHo8Q",
  },
  {
    id: 2,
    name: "Cold Pressed Safflower Oil",
    price: "₹620",
    unit: "500 ml",
    badge: "",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW6LbmoK1D8W3vkYQXj3DcccHBFF52eGuCxgk0pnn6Cd5EzFdCbSe6VllO0XAU48jxGx9AlkX6kHL8FRQW0i924gfzbVWm8kbMsbzG6NaS-HMXvQ1iITxuUWQjI5NR-XXGHdiXBPv0djFNqrSjm5lxnwncJJ3mE7yBghSxVSI8Z61yY2OznJkyoMMym-frd2j1L9cu7hGa6A3fWkhi73oGVBIxNUlCQdZsiQ5XJBRxf3ntrM9E_opnfkuymqykCeMJapibmy2XGTE",
  },
  {
    id: 3,
    name: "Authentic Lakadong Turmeric",
    price: "₹350",
    unit: "250 g",
    badge: "High Curcumin",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFX3G1EyGvZuHexMj3IlrEtanMzXRh-wnDM-Tktss0VXobJWqVqneTX7TKn8a15sh6zM_vR5t04jHXCtXFoAaXlZ_Es0WiW7dHWZddEDjOdVA-efA-X-8wr87F_39fVn2CCBZfqYrwIJVn4g4IvcK199iytIxY7qRyIcSJ-fByEg7tEcczSH0SWzWikhTxwZ_CLkpzqZzyT57OVSo5mM7UlfYyuC-R9lvsW85ufnaFFDCCbmJxmLOz_v0UfHYeD2h4AyQk-6o7G5Q",
  },
  {
    id: 4,
    name: "Wild Forest Honey",
    price: "₹580",
    unit: "500 g",
    badge: "",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaMLF0TK0EIb_gZwoeBcNukFTyZ97JAdCvzidEcx35eDXQxaMZsy-u_Bj-1P33Mkf1ep12PgyoK6UUNkGMp8q3M4lrrb3iEdjw4caVcCgKvimKvCk_AOZbPCY7mrKMY_NQbPB4-f4uskw5y2KH3V1Yp1hPrSG8FmmKl7I9UbCq9Ll14grZW8l1SIfGcDzfphGG3-UN5idf00o2UnQD9fODlbxrCD8ZST1XYP2ttpTBbYP-WvgNu20YuVVbeskAQ1qs_M9Bv13V45w",
  },
];

import { Leaf, Droplet, FlaskConical, Globe } from "lucide-react";

const VALUES = [
  {
    icon: <Leaf className="w-10 h-10 mx-auto text-primary" strokeWidth={1.5} />,
    title: "100% Organic",
    desc: "Every product is certified organic, sourced directly from trusted farms.",
  },
  {
    icon: <Droplet className="w-10 h-10 mx-auto text-primary" strokeWidth={1.5} />,
    title: "Wood Pressed",
    desc: "Ancient cold-pressing techniques preserve nutrients and authentic flavour.",
  },
  {
    icon: <FlaskConical className="w-10 h-10 mx-auto text-primary" strokeWidth={1.5} />,
    title: "Lab Tested",
    desc: "Every batch is rigorously tested for purity, potency, and safety.",
  },
  {
    icon: <Globe className="w-10 h-10 mx-auto text-primary" strokeWidth={1.5} />,
    title: "Sustainable",
    desc: "Eco-friendly packaging and fair-trade practices from farm to table.",
  },
];

/* ═══════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════ */
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  // Fallback: Ensure text appears after 6 seconds in case video autoplay fails 
  // or is blocked by mobile browsers (e.g. low power mode)
  useEffect(() => {
    const fallbackTimer = setTimeout(() => setIsVideoEnded(true), 6000);
    return () => clearTimeout(fallbackTimer);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <>
      {/* ──────── HERO with Cinematic Video ──────── */}
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      >
        {/* Cinematic Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            playsInline
            onEnded={() => setIsVideoEnded(true)}
            className="w-full h-full object-cover origin-center scale-[1.05] will-change-transform contrast-[1.05] saturate-[1.10] brightness-[1.02]" 
            src="/satwika-organics/godmode-hero.mp4"
          />
        </div>

        {/* Gradient overlays for seamless transition to next section */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-base-100/90" />

        {/* Hero copy */}
        {isVideoEnded && (
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="relative z-[2] max-w-3xl mx-auto px-6 text-center"
          >
            <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-label-md uppercase tracking-[0.3em] text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-6"
          >
            Pure · Organic · Integrity
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-display-lg text-white drop-shadow-xl leading-tight"
          >
            Nurturing Well-Being
            <br />
            Through Nature
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-body-lg text-white/90 drop-shadow-md mt-6 max-w-xl mx-auto"
          >
            Wood-pressed oils, raw honeys, and certified superfoods — sourced
            directly from organic farms, delivered to your doorstep.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/catalog"
              className="btn bg-[#fce116] hover:bg-[#fce116]/90 text-[#1f4523] border-none btn-lg gap-2 rounded-full px-8 shadow-lg shadow-[#fce116]/20 hover:shadow-xl hover:shadow-[#fce116]/40 transition-all"
            >
              Explore Collection
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/catalog"
              className="btn btn-ghost btn-lg rounded-full border border-white/40 text-white hover:bg-white/20"
            >
              Our Story
            </Link>
          </motion.div>
        </motion.div>
        )}

        {/* Scroll indicator */}
        {isVideoEnded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2"
          >
          <span className="text-xs uppercase tracking-widest text-white/70 drop-shadow-md">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" as const }}
            className="w-5 h-8 rounded-full border-2 border-white/40 shadow-sm flex items-start justify-center pt-1"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
          </motion.div>
        </motion.div>
        )}
      </section>

      {/* ──────── VALUES SECTION ──────── */}
      <section className="py-24 px-6 lg:px-12 bg-base-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-label-md uppercase tracking-[0.2em] text-secondary"
            >
              Our Promise
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-headline-lg text-primary mt-3"
            >
              Why Choose Satwika?
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                custom={i}
                className="group p-8 rounded-2xl bg-base-200/50 border border-base-300/60 hover:bg-base-200 hover:border-primary/20 transition-all duration-300 text-center"
              >
                <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform duration-300">
                  {v.icon}
                </span>
                <h3 className="text-headline-md text-primary mb-2">{v.title}</h3>
                <p className="text-body-md text-base-content/60">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ──────── FEATURED PRODUCTS ──────── */}
      <section className="py-24 px-6 lg:px-12 bg-base-200/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
          >
            <div>
              <motion.p
                variants={fadeUp}
                custom={0}
                className="text-label-md uppercase tracking-[0.2em] text-secondary"
              >
                Curated Selection
              </motion.p>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-headline-lg text-primary mt-3"
              >
                Featured Products
              </motion.h2>
            </div>
            <motion.div variants={fadeUp} custom={2}>
              <Link
                href="/catalog"
                className="btn btn-ghost btn-sm mt-4 md:mt-0 gap-1 text-primary hover:text-secondary"
              >
                View All
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {FEATURED_PRODUCTS.map((p, i) => (
              <motion.div key={p.id} variants={fadeUp} custom={i}>
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  variants={cardHover}
                  className="card bg-base-100 shadow-sm border border-base-300/50 overflow-hidden group cursor-pointer"
                >
                  <figure className="relative aspect-square overflow-hidden bg-base-200">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {p.badge && (
                      <span className="absolute top-3 left-3 badge badge-secondary badge-sm text-xs uppercase tracking-wider">
                        {p.badge}
                      </span>
                    )}
                    {/* Quick-add overlay */}
                    <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="btn btn-sm bg-base-100 text-primary border-0 shadow-lg">
                        Quick Add
                      </span>
                    </div>
                  </figure>
                  <div className="card-body p-5">
                    <Link href={`/product/${p.id}`}>
                      <h3 className="card-title text-base font-serif text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        {p.name}
                      </h3>
                    </Link>
                    <div className="flex items-baseline justify-between mt-2">
                      <span className="text-lg font-bold text-primary">
                        {p.price}
                      </span>
                      <span className="text-xs text-base-content/50 uppercase">
                        / {p.unit}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ──────── CTA BANNER ──────── */}
      <section className="py-20 px-6 lg:px-12 bg-primary text-primary-content">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="font-serif text-3xl md:text-4xl font-bold"
          >
            Begin Your Wellness Journey
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-primary-content/70 mt-4 text-lg max-w-xl mx-auto"
          >
            Join thousands of families who have switched to pure, chemical-free
            living with Satwika Organics.
          </motion.p>
          <motion.div
            variants={fadeUp}
            custom={2}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/catalog"
              className="btn bg-base-100 text-primary hover:bg-base-200 btn-lg rounded-full px-8"
            >
              Shop Now
            </Link>
            <Link
              href="/customer"
              className="btn btn-outline border-primary-content/30 text-primary-content hover:bg-primary-content hover:text-primary btn-lg rounded-full px-8"
            >
              Create Account
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
