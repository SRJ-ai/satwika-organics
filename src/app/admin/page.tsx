"use client";

import { motion } from "framer-motion";
import {
  IndianRupee,
  ShoppingCart,
  Package,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const stats = [
  {
    title: "Total Revenue",
    value: "₹1,24,500",
    desc: "↑ 12% from last month",
    trend: "up",
    icon: IndianRupee,
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    title: "Orders",
    value: "156",
    desc: "↑ 8% from last month",
    trend: "up",
    icon: ShoppingCart,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Products",
    value: "45",
    desc: "3 added this week",
    trend: "neutral",
    icon: Package,
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    title: "Customers",
    value: "892",
    desc: "↑ 15% from last month",
    trend: "up",
    icon: Users,
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

const recentOrders = [
  {
    id: "ORD-1042",
    customer: "Priya Sharma",
    date: "06 Jul, 2026",
    amount: "₹2,340",
    status: "Delivered",
  },
  {
    id: "ORD-1041",
    customer: "Arjun Mehta",
    date: "06 Jul, 2026",
    amount: "₹1,850",
    status: "Shipped",
  },
  {
    id: "ORD-1040",
    customer: "Lakshmi Nair",
    date: "05 Jul, 2026",
    amount: "₹3,120",
    status: "Pending",
  },
  {
    id: "ORD-1039",
    customer: "Ravi Kulkarni",
    date: "05 Jul, 2026",
    amount: "₹980",
    status: "Delivered",
  },
  {
    id: "ORD-1038",
    customer: "Sneha Desai",
    date: "04 Jul, 2026",
    amount: "₹4,560",
    status: "Shipped",
  },
];

const statusBadge: Record<string, string> = {
  Delivered: "badge-success",
  Shipped: "badge-info",
  Pending: "badge-warning",
  Cancelled: "badge-error",
};

export default function AdminDashboard() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="space-y-8"
    >
      {/* Page Header */}
      <motion.div variants={fadeUp}>
        <h1 className="text-headline-lg text-primary">Dashboard</h1>
        <p className="text-body-md text-base-content/60 mt-1">
          Welcome back. Here&rsquo;s what&rsquo;s happening with your store.
        </p>
      </motion.div>

      {/* Stat Cards */}
      <motion.div
        variants={stagger}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              variants={fadeUp}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
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
                  {stat.trend === "up" ? (
                    <ArrowUpRight size={14} className="text-success" />
                  ) : stat.trend === "down" ? (
                    <ArrowDownRight size={14} className="text-error" />
                  ) : null}
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
                Latest 5 orders across the store
              </p>
            </div>
            <button className="btn btn-sm btn-ghost text-primary gap-1.5">
              <Eye size={14} />
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr className="text-label-md text-base-content/50">
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <motion.tr
                    key={order.id}
                    variants={fadeUp}
                    custom={i}
                    className="hover"
                  >
                    <td className="font-mono text-sm font-semibold text-primary">
                      {order.id}
                    </td>
                    <td className="text-body-md">{order.customer}</td>
                    <td className="text-sm text-base-content/60">
                      {order.date}
                    </td>
                    <td className="font-semibold text-sm">{order.amount}</td>
                    <td>
                      <span
                        className={`badge badge-sm ${statusBadge[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
