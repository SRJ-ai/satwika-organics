"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Package,
  Clock,
  MapPin,
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

interface OrderItem {
  name: string;
  qty: number;
  price: string;
}

interface Order {
  id: string;
  date: string;
  status: string;
  items: OrderItem[];
  total: string;
  address: string;
}

const orders: Order[] = [
  {
    id: "ORD-1042",
    date: "06 Jul, 2026",
    status: "Delivered",
    address: "123, MG Road, Bangalore - 560001",
    items: [
      { name: "Cold Pressed Coconut Oil (500ml)", qty: 2, price: "₹450" },
      { name: "Organic Moringa Powder (200g)", qty: 1, price: "₹320" },
    ],
    total: "₹1,220",
  },
  {
    id: "ORD-1035",
    date: "28 Jun, 2026",
    status: "Shipped",
    address: "45, HSR Layout, Bangalore - 560102",
    items: [{ name: "Raw Forest Honey (500ml)", qty: 1, price: "₹680" }],
    total: "₹680",
  },
  {
    id: "ORD-1028",
    date: "15 Jun, 2026",
    status: "Delivered",
    address: "123, MG Road, Bangalore - 560001",
    items: [
      { name: "Organic Turmeric Powder (100g)", qty: 1, price: "₹220" },
      { name: "Cold Pressed Groundnut Oil (1L)", qty: 1, price: "₹320" },
    ],
    total: "₹540",
  },
];

const statusBadge: Record<string, string> = {
  Delivered: "badge-success",
  Shipped: "badge-info",
  Pending: "badge-warning",
  Cancelled: "badge-error",
};

const statusIcon: Record<string, string> = {
  Delivered: "",
  Shipped: "",
  Pending: "",
};

export default function CustomerOrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(
    orders[0].id
  );

  const toggleOrder = (id: string) => {
    setExpandedOrder((prev) => (prev === id ? null : id));
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="space-y-8"
    >
      {/* Page Header */}
      <motion.div variants={fadeUp}>
        <h1 className="text-headline-lg text-primary">Order History</h1>
        <p className="text-body-md text-base-content/60 mt-1">
          Track and review all your past orders
        </p>
      </motion.div>

      {/* Summary */}
      <motion.div variants={fadeUp} className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-base-content/60">
          <Package size={16} className="text-primary" />
          <span>
            <strong className="text-base-content">{orders.length}</strong>{" "}
            orders total
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-base-content/60">
          <Clock size={16} className="text-secondary" />
          <span>
            Last order on{" "}
            <strong className="text-base-content">{orders[0].date}</strong>
          </span>
        </div>
      </motion.div>

      {/* Order Cards */}
      <motion.div variants={stagger} className="space-y-4">
        {orders.map((order) => {
          const isExpanded = expandedOrder === order.id;
          return (
            <motion.div
              key={order.id}
              variants={fadeUp}
              layout
              className="card bg-base-100 shadow-sm border border-base-300 overflow-hidden"
            >
              {/* Order Header (clickable) */}
              <button
                onClick={() => toggleOrder(order.id)}
                className="w-full text-left px-6 py-5 hover:bg-base-200/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{statusIcon[order.status]}</div>
                    <div>
                      <div className="flex items-center gap-3 mb-0.5">
                        <span className="font-mono text-sm font-bold text-primary">
                          {order.id}
                        </span>
                        <span
                          className={`badge badge-sm ${statusBadge[order.status]}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-base-content/50">
                        <span>{order.date}</span>
                        <span>•</span>
                        <span>
                          {order.items.length} item
                          {order.items.length > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-serif font-bold text-lg">
                      {order.total}
                    </span>
                    {isExpanded ? (
                      <ChevronUp
                        size={18}
                        className="text-base-content/40"
                      />
                    ) : (
                      <ChevronDown
                        size={18}
                        className="text-base-content/40"
                      />
                    )}
                  </div>
                </div>
              </button>

              {/* Expandable Detail */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" as const }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-base-300 px-6 py-5 space-y-5">
                      {/* Items */}
                      <div>
                        <p className="text-label-md text-base-content/50 uppercase tracking-wider mb-3">
                          Items
                        </p>
                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-base-200 flex items-center justify-center text-lg shrink-0">
                                  
                                </div>
                                <div>
                                  <p className="text-sm font-medium">
                                    {item.name}
                                  </p>
                                  <p className="text-xs text-base-content/40">
                                    Qty: {item.qty}
                                  </p>
                                </div>
                              </div>
                              <span className="font-semibold text-sm">
                                {item.price}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="divider my-0" />

                      {/* Delivery Address */}
                      <div className="flex items-start gap-3">
                        <MapPin
                          size={16}
                          className="text-base-content/40 mt-0.5 shrink-0"
                        />
                        <div>
                          <p className="text-label-md text-base-content/50 uppercase tracking-wider mb-1">
                            Delivery Address
                          </p>
                          <p className="text-sm text-base-content/70">
                            {order.address}
                          </p>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="flex items-center justify-between bg-base-200/50 rounded-xl px-4 py-3">
                        <span className="text-sm font-medium text-base-content/60">
                          Order Total
                        </span>
                        <span className="font-serif font-bold text-lg text-primary">
                          {order.total}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
