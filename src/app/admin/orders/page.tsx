"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Eye, MoreHorizontal } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

type OrderStatus = "All" | "Pending" | "Shipped" | "Delivered";

interface Order {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: "Pending" | "Shipped" | "Delivered";
}

const allOrders: Order[] = [
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

const tabs: OrderStatus[] = ["All", "Pending", "Shipped", "Delivered"];

const statusBadge: Record<string, string> = {
  Delivered: "badge-success",
  Shipped: "badge-info",
  Pending: "badge-warning",
};

const statusDot: Record<string, string> = {
  Delivered: "bg-success",
  Shipped: "bg-info",
  Pending: "bg-warning",
};

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus>("All");

  const filteredOrders =
    activeTab === "All"
      ? allOrders
      : allOrders.filter((o) => o.status === activeTab);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="space-y-8"
    >
      {/* Page Header */}
      <motion.div variants={fadeUp} className="flex items-end justify-between">
        <div>
          <h1 className="text-headline-lg text-primary">Orders</h1>
          <p className="text-body-md text-base-content/60 mt-1">
            Manage and track all customer orders
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-sm btn-ghost gap-2 text-base-content/60">
            <Filter size={14} />
            Filters
          </button>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div variants={fadeUp}>
        <div role="tablist" className="tabs tabs-bordered w-fit">
          {tabs.map((tab) => {
            const count =
              tab === "All"
                ? allOrders.length
                : allOrders.filter((o) => o.status === tab).length;
            return (
              <button
                key={tab}
                role="tab"
                className={`tab gap-2 font-medium transition-colors ${
                  activeTab === tab
                    ? "tab-active text-primary font-semibold"
                    : "text-base-content/50"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab !== "All" && (
                  <span
                    className={`w-2 h-2 rounded-full ${statusDot[tab]}`}
                  />
                )}
                {tab}
                <span className="badge badge-sm badge-ghost">{count}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Orders Table */}
      <motion.div
        variants={fadeUp}
        className="card bg-base-100 shadow-sm border border-base-300"
      >
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-label-md text-base-content/50">
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredOrders.map((order) => (
                  <motion.tr
                    key={order.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="hover"
                  >
                    <td className="font-mono text-sm font-semibold text-primary">
                      {order.id}
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="bg-primary/10 text-primary rounded-full w-8 h-8">
                            <span className="text-xs font-bold">
                              {order.customer
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                        </div>
                        <span className="text-body-md">{order.customer}</span>
                      </div>
                    </td>
                    <td className="text-sm text-base-content/60">
                      {order.date}
                    </td>
                    <td className="font-semibold text-sm">{order.amount}</td>
                    <td>
                      <span
                        className={`badge badge-sm gap-1.5 ${statusBadge[order.status]}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${statusDot[order.status]}`}
                        />
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button className="btn btn-ghost btn-xs gap-1 text-primary">
                          <Eye size={13} />
                          View
                        </button>
                        <button className="btn btn-ghost btn-xs btn-circle">
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12 text-base-content/40">
              <p className="text-body-lg">No orders found</p>
              <p className="text-sm mt-1">
                There are no orders matching this filter.
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Pagination hint */}
      <motion.div
        variants={fadeUp}
        className="flex items-center justify-between text-sm text-base-content/50"
      >
        <p>
          Showing {filteredOrders.length} of {allOrders.length} orders
        </p>
        <div className="join">
          <button className="join-item btn btn-sm btn-disabled">«</button>
          <button className="join-item btn btn-sm btn-active">1</button>
          <button className="join-item btn btn-sm">2</button>
          <button className="join-item btn btn-sm">»</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
