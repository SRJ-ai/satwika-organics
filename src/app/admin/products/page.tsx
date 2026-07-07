"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Trash2,
  X,
  Package as PackageIcon,
} from "lucide-react";

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

type Category = "All" | "Cold Pressed Oils" | "Superfoods" | "Honey & Spices";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: Exclude<Category, "All">;
  price: number;
  stock: number;
  image: string;
}

const categoryColors: Record<string, string> = {
  "Cold Pressed Oils": "badge-primary",
  Superfoods: "badge-success",
  "Honey & Spices": "badge-secondary",
};

const categories: Category[] = [
  "All",
  "Cold Pressed Oils",
  "Superfoods",
  "Honey & Spices",
];

const initialProducts: Product[] = [
  {
    id: "PRD-001",
    name: "Cold Pressed Coconut Oil",
    sku: "CP-COC-500",
    category: "Cold Pressed Oils",
    price: 450,
    stock: 124,
    image: "",
  },
  {
    id: "PRD-002",
    name: "Organic Moringa Powder",
    sku: "SF-MOR-200",
    category: "Superfoods",
    price: 320,
    stock: 56,
    image: "",
  },
  {
    id: "PRD-003",
    name: "Raw Forest Honey",
    sku: "HN-FRS-500",
    category: "Honey & Spices",
    price: 680,
    stock: 8,
    image: "",
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    category: "Cold Pressed Oils" as Exclude<Category, "All">,
    price: "",
    stock: "",
  });

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDelete = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleAddProduct = useCallback(() => {
    if (!newProduct.name || !newProduct.sku || !newProduct.price) return;

    const emojiMap: Record<string, string> = {
      "Cold Pressed Oils": "🫒",
      Superfoods: "",
      "Honey & Spices": "️",
    };

    const product: Product = {
      id: `PRD-${String(products.length + 1).padStart(3, "0")}`,
      name: newProduct.name,
      sku: newProduct.sku,
      category: newProduct.category,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock) || 0,
      image: emojiMap[newProduct.category] || "",
    };

    setProducts((prev) => [...prev, product]);
    setNewProduct({
      name: "",
      sku: "",
      category: "Cold Pressed Oils",
      price: "",
      stock: "",
    });
    setIsModalOpen(false);
  }, [newProduct, products.length]);

  const getStockBadge = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", class: "badge-error" };
    if (stock <= 10) return { label: "Low Stock", class: "badge-warning" };
    return { label: "In Stock", class: "badge-success" };
  };

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
          <h1 className="text-headline-lg text-primary">Products</h1>
          <p className="text-body-md text-base-content/60 mt-1">
            Manage your product catalog
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary gap-2"
        >
          <Plus size={16} />
          Add Product
        </button>
      </motion.div>

      {/* Search & Category Filters */}
      <motion.div
        variants={fadeUp}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
      >
        {/* Search */}
        <label className="input input-bordered flex items-center gap-2 w-full sm:w-80 bg-base-100">
          <Search size={16} className="text-base-content/40" />
          <input
            type="text"
            className="grow"
            placeholder="Search products or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="btn btn-ghost btn-xs btn-circle"
            >
              <X size={12} />
            </button>
          )}
        </label>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn btn-sm ${
                activeCategory === cat
                  ? "btn-primary"
                  : "btn-ghost border border-base-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Products Table */}
      <motion.div
        variants={fadeUp}
        className="card bg-base-100 shadow-sm border border-base-300"
      >
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-label-md text-base-content/50">
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => {
                  const stockBadge = getStockBadge(product.stock);
                  return (
                    <motion.tr
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="hover"
                    >
                      <td>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-base-200 flex items-center justify-center text-2xl shrink-0">
                            {product.image}
                          </div>
                          <div>
                            <p className="font-semibold text-body-md">
                              {product.name}
                            </p>
                            <p className="text-xs text-base-content/40 font-mono mt-0.5">
                              {product.sku}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge badge-sm ${categoryColors[product.category]}`}
                        >
                          {product.category}
                        </span>
                      </td>
                      <td className="font-semibold text-sm">
                        ${product.price.toLocaleString("en-IN")}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <span
                            className={`badge badge-sm gap-1 ${stockBadge.class}`}
                          >
                            {stockBadge.label}
                          </span>
                          <span className="text-xs text-base-content/40">
                            ({product.stock})
                          </span>
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="btn btn-ghost btn-sm text-error hover:bg-error/10 gap-1.5"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 text-base-content/40">
              <PackageIcon size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-body-lg">No products found</p>
              <p className="text-sm mt-1">
                Try adjusting your search or category filter.
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring" as const, duration: 0.4 }}
              className="relative card bg-base-100 shadow-2xl border border-base-300 w-full max-w-md mx-4"
            >
              <div className="card-body p-6 gap-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-headline-md text-primary">
                    Add New Product
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="btn btn-ghost btn-sm btn-circle"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  {/* Name */}
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-label-md">
                      Product Name
                    </legend>
                    <input
                      type="text"
                      placeholder="e.g., Cold Pressed Sesame Oil"
                      className="input input-bordered w-full"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </fieldset>

                  {/* SKU */}
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-label-md">
                      SKU
                    </legend>
                    <input
                      type="text"
                      placeholder="e.g., CP-SES-500"
                      className="input input-bordered w-full font-mono"
                      value={newProduct.sku}
                      onChange={(e) =>
                        setNewProduct((prev) => ({
                          ...prev,
                          sku: e.target.value,
                        }))
                      }
                    />
                  </fieldset>

                  {/* Category */}
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-label-md">
                      Category
                    </legend>
                    <select
                      className="select select-bordered w-full"
                      value={newProduct.category}
                      onChange={(e) =>
                        setNewProduct((prev) => ({
                          ...prev,
                          category: e.target.value as Exclude<Category, "All">,
                        }))
                      }
                    >
                      <option>Cold Pressed Oils</option>
                      <option>Superfoods</option>
                      <option>Honey &amp; Spices</option>
                    </select>
                  </fieldset>

                  {/* Price & Stock */}
                  <div className="grid grid-cols-2 gap-4">
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend text-label-md">
                        Price (₹)
                      </legend>
                      <input
                        type="number"
                        placeholder="0"
                        className="input input-bordered w-full"
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct((prev) => ({
                            ...prev,
                            price: e.target.value,
                          }))
                        }
                      />
                    </fieldset>
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend text-label-md">
                        Stock
                      </legend>
                      <input
                        type="number"
                        placeholder="0"
                        className="input input-bordered w-full"
                        value={newProduct.stock}
                        onChange={(e) =>
                          setNewProduct((prev) => ({
                            ...prev,
                            stock: e.target.value,
                          }))
                        }
                      />
                    </fieldset>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    className="btn btn-ghost"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary gap-2"
                    onClick={handleAddProduct}
                    disabled={
                      !newProduct.name || !newProduct.sku || !newProduct.price
                    }
                  >
                    <Plus size={16} />
                    Add Product
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
