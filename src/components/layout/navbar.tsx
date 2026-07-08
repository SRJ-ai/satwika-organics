"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Logo } from "@/components/ui/logo";
import { useHero } from "@/components/layout/hero-context";

const NAV_LINKS = [
  { label: "Shop", href: "/catalog" },
  { label: "Cart", href: "/cart" },
  { label: "Account", href: "/customer" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { isHeroUiVisible } = useHero();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = pathname === "/";
  const isTransparent = !isScrolled && !mobileOpen && isHomePage;
  const shouldHideLinks = isHomePage && !isHeroUiVisible;

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent border-transparent"
          : "bg-[#fdf8eb]/95 backdrop-blur-md border-b border-base-200/60 shadow-sm" 
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center h-20 px-6 lg:px-8 relative">
        {/* Logo (Left) */}
        <div className="flex-1 flex items-center justify-start -mt-2">
          <Link href="/" className={`inline-flex items-center justify-center hover:opacity-90 transition-all duration-300 rounded-full ${
            isTransparent ? "bg-white/80 backdrop-blur-md shadow-sm px-3 py-1" : ""
          }`}>
            <Logo 
              className={`h-14 w-auto drop-shadow-sm transition-all duration-300`} 
            />
          </Link>
        </div>

        {/* Desktop Nav (Center) */}
        {!shouldHideLinks && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex justify-center items-center hidden md:flex"
          >
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        isTransparent
                          ? isActive
                            ? "text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                            : "text-white/95 hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                          : isActive
                          ? "text-primary font-bold"
                          : "text-base-content/60 hover:text-primary"
                      }`}
                    >
                      {link.label}
                      {isActive && !isTransparent && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-primary/10 -z-10"
                          transition={{
                            type: "spring" as const,
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}

        {/* Desktop Actions (Right) */}
        {!shouldHideLinks && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex items-center justify-end gap-3 hidden md:flex"
          >
            <Link
              href="/auth/login"
              className={`btn btn-ghost btn-sm rounded-full transition-colors ${
                isTransparent 
                  ? "text-white/95 hover:text-white hover:bg-white/20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] border-transparent" 
                  : "text-base-content/80 hover:text-primary"
              }`}
            >
              Login / Profile
            </Link>
            <Link
              href="/admin"
              className={`btn btn-ghost btn-sm rounded-full transition-colors ${
                isTransparent 
                  ? "text-white/95 hover:text-white hover:bg-white/20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] border-transparent" 
                  : "text-base-content/80 hover:text-primary"
              }`}
            >
              Admin
            </Link>
            <Link
              href="/vendor"
              className={`btn btn-sm rounded-full shadow-md transition-colors ${
                isTransparent
                  ? "bg-white text-primary hover:bg-white/90 border-none"
                  : "btn-primary shadow-primary/20"
              }`}
            >
              Vendor Portal
            </Link>
          </motion.div>
        )}

        {/* Mobile Hamburger */}
        {!shouldHideLinks && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={`md:hidden btn btn-ghost btn-sm btn-square transition-colors ${
              isTransparent ? "text-white" : "text-base-content"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
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
              {mobileOpen ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </>
              )}
            </svg>
          </motion.button>
        )}
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="md:hidden overflow-hidden bg-base-100 border-b border-base-200"
          >
            <div className="px-6 py-4 space-y-2">
              {[...NAV_LINKS, { label: "Admin", href: "/admin" }, { label: "Vendor", href: "/vendor" }].map(
                (link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 text-base font-medium text-base-content/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
