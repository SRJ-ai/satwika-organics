import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl"></span>
              <span className="font-serif text-xl font-bold">Satwika</span>
            </div>
            <p className="text-neutral-content/60 text-sm leading-relaxed">
              Nurturing well-being through uncompromised purity and sustainable traditions since 2018.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-sm uppercase tracking-wider mb-4">
              Shop
            </h4>
            <ul className="space-y-2 text-sm text-neutral-content/60">
              <li><Link href="/catalog" className="hover:text-neutral-content transition-colors">All Products</Link></li>
              <li><Link href="/catalog" className="hover:text-neutral-content transition-colors">Cold Pressed Oils</Link></li>
              <li><Link href="/catalog" className="hover:text-neutral-content transition-colors">Superfoods</Link></li>
              <li><Link href="/catalog" className="hover:text-neutral-content transition-colors">Honey & Preserves</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-serif font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-neutral-content/60">
              <li><Link href="/" className="hover:text-neutral-content transition-colors">About Us</Link></li>
              <li><Link href="/" className="hover:text-neutral-content transition-colors">Our Farms</Link></li>
              <li><Link href="/" className="hover:text-neutral-content transition-colors">Sustainability</Link></li>
              <li><Link href="/" className="hover:text-neutral-content transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-serif font-semibold text-sm uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-neutral-content/60">
              <li><Link href="/" className="hover:text-neutral-content transition-colors">FAQ</Link></li>
              <li><Link href="/" className="hover:text-neutral-content transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/" className="hover:text-neutral-content transition-colors">Privacy Policy</Link></li>
              <li><Link href="/" className="hover:text-neutral-content transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-content/10 mt-12 pt-8 text-center text-sm text-neutral-content/40">
          <p>© {new Date().getFullYear()} Satwika Organics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
