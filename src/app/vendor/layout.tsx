"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, LogOut, Store } from "lucide-react";

const navItems = [
  { href: "/vendor", label: "Dashboard", icon: LayoutDashboard },
  { href: "/vendor/products", label: "Products", icon: Package },
];

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/vendor") return pathname === "/vendor";
    return pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary text-secondary-content flex flex-col shrink-0">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10">
          <Link href="/vendor" className="flex items-center gap-3">
            <div className="bg-white/15 p-2 rounded-lg">
              <Store size={20} />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold tracking-tight">
                Vendor
              </h1>
              <p className="text-xs opacity-60 font-sans">Satwika Organics</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <p className="text-xs uppercase tracking-wider opacity-40 px-4 mb-3 font-sans">
            Menu
          </p>
          <ul className="menu menu-md gap-1 w-full p-0">
            {navItems.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive(href)
                      ? "bg-white/15 text-white shadow-sm"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive(href) ? 2.5 : 2} />
                  {label}
                  {isActive(href) && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="avatar placeholder">
              <div className="bg-white/20 text-white rounded-full w-9 h-9">
                <span className="text-xs font-bold">VN</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Vendor Name</p>
              <p className="text-xs opacity-50 truncate">vendor@satwika.in</p>
            </div>
            <Link
              href="/"
              className="btn btn-ghost btn-sm btn-circle text-white/50 hover:text-white"
            >
              <LogOut size={16} />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
