"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  LogOut,
  Menu,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/products", label: "Products", icon: Package },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="drawer lg:drawer-open min-h-[100dvh] bg-base-200">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
      
      {/* ── Main Content Area ── */}
      <div className="drawer-content flex flex-col overflow-hidden">
        {/* Mobile Header (visible only on small screens) */}
        <div className="w-full navbar bg-primary text-primary-content lg:hidden min-h-16 h-16 shrink-0">
          <div className="flex-none">
            <label htmlFor="admin-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <Menu className="w-6 h-6" />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <h1 className="font-serif text-lg font-bold tracking-tight">Admin</h1>
          </div>
        </div>
        
        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-8">{children}</div>
        </main>
      </div> 

      {/* ── Sidebar (Drawer Side) ── */}
      <div className="drawer-side z-[100]">
        <label htmlFor="admin-drawer" aria-label="close sidebar" className="drawer-overlay"></label> 
        <aside className="w-72 lg:w-64 min-h-[100dvh] bg-primary text-primary-content flex flex-col shrink-0">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-3">
              <span className="text-2xl"></span>
              <div>
                <h1 className="font-serif text-xl font-bold tracking-tight">
                  Admin
                </h1>
                <p className="text-xs opacity-60 font-sans">Satwika Organics</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
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

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/10 mt-auto">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="avatar placeholder shrink-0">
                <div className="bg-white/20 text-white rounded-full w-9 h-9">
                  <span className="text-xs font-bold">SA</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">Satwika Admin</p>
                <p className="text-xs opacity-50 truncate">admin@satwika.in</p>
              </div>
              <Link
                href="/"
                className="btn btn-ghost btn-sm btn-circle text-white/50 hover:text-white shrink-0"
              >
                <LogOut size={16} />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
