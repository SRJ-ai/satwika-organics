"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShoppingBag,
  Heart,
  Star,
  ArrowRight,
  Package,
  Clock,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const stats = [
  {
    title: "Total Orders",
    value: "12",
    desc: "2 this month",
    icon: ShoppingBag,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Wishlist Items",
    value: "5",
    desc: "1 back in stock",
    icon: Heart,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    title: "Reward Points",
    value: "450",
    desc: "≈ ₹45 savings",
    icon: Star,
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
];

const recentOrders = [
  {
    id: "ORD-1042",
    date: "06 Jul, 2026",
    items: "Cold Pressed Coconut Oil × 2, Moringa Powder × 1",
    total: "₹1,220",
    status: "Delivered",
  },
  {
    id: "ORD-1035",
    date: "28 Jun, 2026",
    items: "Raw Forest Honey × 1",
    total: "₹680",
    status: "Shipped",
  },
  {
    id: "ORD-1028",
    date: "15 Jun, 2026",
    items: "Organic Turmeric × 1, Groundnut Oil × 1",
    total: "₹540",
    status: "Delivered",
  },
];

const statusBadge: Record<string, string> = {
  Delivered: "badge-success",
  Shipped: "badge-info",
  Pending: "badge-warning",
};

export default function CustomerOverviewPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="space-y-8"
    >
      {/* Welcome */}
      <motion.div variants={fadeUp}>
        <p className="text-sm text-secondary font-semibold uppercase tracking-wider mb-1">
          Good evening
        </p>
        <h1 className="text-headline-lg text-primary">
          Welcome back, Satwika Member
        </h1>
        <p className="text-body-md text-base-content/60 mt-1">
          Here&rsquo;s a quick overview of your account activity.
        </p>
      </motion.div>

      {/* Stat Cards */}
      <motion.div
        variants={stagger}
        className="grid grid-cols-1 sm:grid-cols-3 gap-5"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              variants={fadeUp}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="card bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-shadow"
            >
              <div className="card-body p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-label-md text-base-content/50 uppercase tracking-wider">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold font-serif mt-2 text-base-content">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                    <Icon size={20} className={stat.color} />
                  </div>
                </div>
                <p className="text-xs text-base-content/50 mt-3">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Recent Orders */}
      <motion.div
        variants={fadeUp}
        className="card bg-base-100 shadow-sm border border-base-300"
      >
        <div className="card-body p-0">
          <div className="flex items-center justify-between px-6 py-5 border-b border-base-300">
            <div>
              <h2 className="text-headline-md text-primary">Recent Orders</h2>
              <p className="text-sm text-base-content/50 mt-0.5">
                Your latest purchases
              </p>
            </div>
            <Link
              href="/customer/orders"
              className="btn btn-sm btn-ghost text-primary gap-1.5"
            >
              View All
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="divide-y divide-base-300">
            {recentOrders.map((order, i) => (
              <motion.div
                key={order.id}
                variants={fadeUp}
                custom={i}
                className="px-6 py-4 hover:bg-base-200/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/5 p-2.5 rounded-xl mt-0.5">
                      <Package size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-sm font-semibold text-primary">
                          {order.id}
                        </span>
                        <span
                          className={`badge badge-sm ${statusBadge[order.status]}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-base-content/70 leading-relaxed">
                        {order.items}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1.5 text-xs text-base-content/40">
                        <Clock size={11} />
                        {order.date}
                      </div>
                    </div>
                  </div>
                  <p className="font-semibold text-sm whitespace-nowrap">
                    {order.total}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
