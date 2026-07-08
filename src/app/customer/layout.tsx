"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  UserCircle,
  LogOut,
  Heart,
  MapPin,
} from "lucide-react";

const navItems = [
  { href: "/customer", label: "Overview", icon: LayoutDashboard },
  { href: "/customer/orders", label: "Orders", icon: ShoppingBag },
  { href: "/customer/profile", label: "Profile & Security", icon: UserCircle },
  { href: "/customer/address", label: "Addresses", icon: MapPin },
];

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/customer") return pathname === "/customer";
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-[100dvh] bg-base-200 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-base-100 border-r border-base-300 flex flex-col shrink-0">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-base-300">
          <Link href="/customer" className="flex items-center gap-3">
            <span className="text-2xl"></span>
            <div>
              <h1 className="font-serif text-lg font-bold text-primary tracking-tight">
                My Account
              </h1>
              <p className="text-xs text-base-content/50 font-sans">
                Satwika Organics
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="menu menu-md gap-1 w-full p-0">
            {navItems.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive(href)
                      ? "bg-primary text-primary-content shadow-sm"
                      : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive(href) ? 2.5 : 2} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Wishlist shortcut */}
        <div className="px-4 pb-2">
          <Link
            href="/customer"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-base-content/60 hover:bg-base-200 transition-colors"
          >
            <Heart size={18} />
            Wishlist
            <span className="badge badge-sm badge-accent ml-auto">5</span>
          </Link>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-base-300">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-9 h-9">
                <span className="text-xs font-bold">SM</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Satwika Member</p>
              <p className="text-xs text-base-content/50 truncate">
                member@satwika.in
              </p>
            </div>
            <Link
              href="/"
              className="btn btn-ghost btn-sm btn-circle text-base-content/40 hover:text-error"
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
