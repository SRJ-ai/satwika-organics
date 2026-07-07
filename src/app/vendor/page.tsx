"use client";

import { motion } from "framer-motion";
import {
  Package,
  IndianRupee,
  Clock,
  TrendingUp,
  ArrowUpRight,
  Eye,
  ShoppingBag,
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
    title: "Active Products",
    value: "12",
    desc: "↑ 2 added this month",
    icon: Package,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Total Sales",
    value: "₹45,200",
    desc: "↑ 18% from last month",
    icon: IndianRupee,
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    title: "Pending Orders",
    value: "3",
    desc: "Needs attention",
    icon: Clock,
    color: "text-warning",
    bg: "bg-warning/10",
  },
];

const recentOrders = [
  {
    id: "ORD-2051",
    customer: "Priya Sharma",
    product: "Cold Pressed Coconut Oil",
    qty: 2,
    date: "06 Jul, 2026",
    amount: "₹900",
    status: "Pending",
  },
  {
    id: "ORD-2048",
    customer: "Arjun Mehta",
    product: "Organic Moringa Powder",
    qty: 3,
    date: "05 Jul, 2026",
    amount: "₹960",
    status: "Shipped",
  },
  {
    id: "ORD-2045",
    customer: "Lakshmi Nair",
    product: "Raw Forest Honey",
    qty: 1,
    date: "04 Jul, 2026",
    amount: "₹680",
    status: "Delivered",
  },
  {
    id: "ORD-2042",
    customer: "Ravi Kulkarni",
    product: "Cold Pressed Groundnut Oil",
    qty: 2,
    date: "03 Jul, 2026",
    amount: "₹640",
    status: "Delivered",
  },
  {
    id: "ORD-2039",
    customer: "Sneha Desai",
    product: "Organic Turmeric Powder",
    qty: 1,
    date: "02 Jul, 2026",
    amount: "₹220",
    status: "Pending",
  },
];

const statusBadge: Record<string, string> = {
  Delivered: "badge-success",
  Shipped: "badge-info",
  Pending: "badge-warning",
};

export default function VendorDashboard() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="space-y-8"
    >
      {/* Page Header */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp size={16} className="text-success" />
          <p className="text-sm text-success font-semibold">
            Sales up 18% this month
          </p>
        </div>
        <h1 className="text-headline-lg text-primary">Vendor Dashboard</h1>
        <p className="text-body-md text-base-content/60 mt-1">
          Track your product performance and orders
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
                <div className="flex items-center gap-1.5 mt-3">
                  {stat.title !== "Pending Orders" && (
                    <ArrowUpRight size={14} className="text-success" />
                  )}
                  <span className="text-xs text-base-content/50">
                    {stat.desc}
                  </span>
                </div>
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
                Orders for your products
              </p>
            </div>
            <button className="btn btn-sm btn-ghost text-primary gap-1.5">
              <Eye size={14} />
              View All
            </button>
          </div>

          <div className="divide-y divide-base-300">
            {recentOrders.map((order, i) => (
              <motion.div
                key={order.id}
                variants={fadeUp}
                custom={i}
                className="px-6 py-4 hover:bg-base-200/30 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-secondary/10 p-2.5 rounded-xl">
                      <ShoppingBag size={18} className="text-secondary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-0.5">
                        <span className="font-mono text-sm font-semibold text-primary">
                          {order.id}
                        </span>
                        <span
                          className={`badge badge-sm ${statusBadge[order.status]}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-base-content/70">
                        {order.product}{" "}
                        <span className="text-base-content/40">
                          × {order.qty}
                        </span>
                      </p>
                      <p className="text-xs text-base-content/40 mt-0.5">
                        {order.customer} · {order.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{order.amount}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
