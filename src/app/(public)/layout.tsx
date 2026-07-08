import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroProvider } from "@/components/layout/hero-context";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <HeroProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </HeroProvider>
  );
}
