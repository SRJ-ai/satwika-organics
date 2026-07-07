import type { Metadata } from "next";
import { Manrope, Literata } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Satwika Organics | Pure. Organic. Integrity.",
  description: "Nurturing well-being through uncompromised purity and sustainable traditions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${literata.variable} scroll-smooth`}
      data-theme="satwika"
      suppressHydrationWarning
    >
      <body className="antialiased min-h-screen flex flex-col bg-base-100 text-base-content overflow-x-hidden">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

