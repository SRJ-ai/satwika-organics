"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

/* ──── animation variants ──── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.03,
    y: -6,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

/* ──── types ──── */
type SortOption = "recommended" | "price-asc" | "price-desc";

interface CatalogProduct {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: string;
  tags: string[];
  badge: string;
  img: string;
}

/* ──── data ──── */
const CATEGORIES = [
  "Cold Pressed Oils",
  "Superfoods",
  "Honey & Preserves",
  "Personal Care",
];

const PURITY_TAGS = ["Wood Pressed", "Chemical Free", "Direct Farm"];

const ALL_PRODUCTS: CatalogProduct[] = [
  {
    id: "groundnut-oil",
    name: "Wood Pressed Groundnut Oil",
    price: 450,
    unit: "500 ml",
    category: "Cold Pressed Oils",
    tags: ["Wood Pressed", "Chemical Free"],
    badge: "Best Seller",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDddzKxJdXVhXtEp_13KvTM7mmp3s50cb4hUjzNTUpbrL4Lc4hNHucuq8JS0uJfDkIeQZeu0giOqVEZ6bfFIoQbdyveWnFQOcZZ_eH8WDfr4luAg9wSe0N4G6dsgINkTPRLesx91SC_QahTpxNLMjD7EzmJZmVTtC5_idy6AYdFiFuKBIr8Brf3_rJn-_KuiXIQQyGT9nDqyU8mRjL1Qdi1IeqyjXiulo0AwUeinu5A1BxU836Du5GYi4j55R49pGg3lxFRu2QHo8Q",
  },
  {
    id: "safflower-oil",
    name: "Cold Pressed Safflower Oil",
    price: 620,
    unit: "500 ml",
    category: "Cold Pressed Oils",
    tags: ["Chemical Free", "Direct Farm"],
    badge: "",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW6LbmoK1D8W3vkYQXj3DcccHBFF52eGuCxgk0pnn6Cd5EzFdCbSe6VllO0XAU48jxGx9AlkX6kHL8FRQW0i924gfzbVWm8kbMsbzG6NaS-HMXvQ1iITxuUWQjI5NR-XXGHdiXBPv0djFNqrSjm5lxnwncJJ3mE7yBghSxVSI8Z61yY2OznJkyoMMym-frd2j1L9cu7hGa6A3fWkhi73oGVBIxNUlCQdZsiQ5XJBRxf3ntrM9E_opnfkuymqykCeMJapibmy2XGTE",
  },
  {
    id: "lakadong-turmeric",
    name: "Authentic Lakadong Turmeric",
    price: 350,
    unit: "250 g",
    category: "Superfoods",
    tags: ["Chemical Free", "Direct Farm"],
    badge: "High Curcumin",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFX3G1EyGvZuHexMj3IlrEtanMzXRh-wnDM-Tktss0VXobJWqVqneTX7TKn8a15sh6zM_vR5t04jHXCtXFoAaXlZ_Es0WiW7dHWZddEDjOdVA-efA-X-8wr87F_39fVn2CCBZfqYrwIJVn4g4IvcK199iytIxY7qRyIcSJ-fByEg7tEcczSH0SWzWikhTxwZ_CLkpzqZzyT57OVSo5mM7UlfYyuC-R9lvsW85ufnaFFDCCbmJxmLOz_v0UfHYeD2h4AyQk-6o7G5Q",
  },
  {
    id: "wild-forest-honey",
    name: "Wild Forest Honey",
    price: 580,
    unit: "500 g",
    category: "Honey & Preserves",
    tags: ["Chemical Free"],
    badge: "",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaMLF0TK0EIb_gZwoeBcNukFTyZ97JAdCvzidEcx35eDXQxaMZsy-u_Bj-1P33Mkf1ep12PgyoK6UUNkGMp8q3M4lrrb3iEdjw4caVcCgKvimKvCk_AOZbPCY7mrKMY_NQbPB4-f4uskw5y2KH3V1Yp1hPrSG8FmmKl7I9UbCq9Ll14grZW8l1SIfGcDzfphGG3-UN5idf00o2UnQD9fODlbxrCD8ZST1XYP2ttpTBbYP-WvgNu20YuVVbeskAQ1qs_M9Bv13V45w",
  },
  {
    id: "aloe-vera-gel",
    name: "Pure Aloe Vera Gel",
    price: 290,
    unit: "200 ml",
    category: "Personal Care",
    tags: ["Chemical Free", "Direct Farm"],
    badge: "New",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcHvZR2K8XvoWHF-ffKukWhUCI0Xb0adL0q4pXx3IGEZDPr59pmO0Xovh56t6S2J2evaKhTw135shzpc4yX5rA7K2E5bo8WiIyzIU3phH1S93i8TpvP9HZi2eCsmjQx6K9oeZXmi_jPCbvcP_ubiBAePgViVBJx5J5pp7NhaJeV54opKgSuCdWV86Yj_IyU-HqNh3WSDmfaiooxKY3U6K4492H44FNBw9L-tunorbL7k4ypO3qPYSeQocJ61uPqwNUnrCGAUHjtVU",
  },
  {
    id: "moringa-powder",
    name: "Organic Moringa Leaf Powder",
    price: 320,
    unit: "200 g",
    category: "Superfoods",
    tags: ["Wood Pressed", "Direct Farm"],
    badge: "Nutrient Dense",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqmuH-5NP3vNXEZ5VkelBFh40-9wJtMrPDYyHZOk40aDZrqZqfPn8Twth2aVnzIBuVg8Nt9YLvI5rFi16U39kOztcwiEVwEWrVlxBvWs7x4Jc2TQI9gC3M21pKGvu6C9jeSk0U2hcIAm5jhg4MiTMYKIySM6CDkoXw2I2owLPpTAzCSuEADCGQHOxEF1VprPafq0FnkkmcJjx0CVDopr2MZ1mPYIaMN8x_VcvtPotlbBZ1fFCPUOpyRqAHmh8qHDfVMIk42vsC2Uo",
  },
];

/* ──── icons ──── */
function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function CartPlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      <path d="M14 5h4" />
      <path d="M16 3v4" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   CATALOG PAGE
   ═══════════════════════════════════════════ */
export default function CatalogPage() {
  const { addItem } = useCart();

  /* ── filter / search state ── */
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  /* ── toggle helpers ── */
  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedTags([]);
    setSortBy("recommended");
  };

  const hasActiveFilters =
    searchQuery || selectedCategories.length > 0 || selectedTags.length > 0;

  /* ── filtered & sorted products ── */
  const filteredProducts = useMemo(() => {
    let result = [...ALL_PRODUCTS];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Purity tag filter
    if (selectedTags.length > 0) {
      result = result.filter((p) =>
        selectedTags.some((tag) => p.tags.includes(tag))
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break; // recommended = original order
    }

    return result;
  }, [searchQuery, selectedCategories, selectedTags, sortBy]);

  /* ── add to cart handler ── */
  const handleAddToCart = (product: CatalogProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.img,
      quantity: 1,
      unit: product.unit,
    });
  };

  /* ── sidebar content (shared between desktop & mobile) ── */
  const filterContent = (
    <>
      {/* Categories */}
      <div>
        <h3 className="text-label-md uppercase tracking-wider text-primary mb-4">
          Categories
        </h3>
        <ul className="space-y-2">
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary rounded"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                <span className="text-body-md text-base-content/80 group-hover:text-primary transition-colors">
                  {cat}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Divider */}
      <div className="divider my-2" />

      {/* Purity Tags */}
      <div>
        <h3 className="text-label-md uppercase tracking-wider text-primary mb-4">
          Purity
        </h3>
        <div className="flex flex-wrap gap-2">
          {PURITY_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`badge badge-lg cursor-pointer transition-all duration-200 ${
                selectedTags.includes(tag)
                  ? "badge-primary text-primary-content"
                  : "badge-outline border-base-300 text-base-content/70 hover:border-primary hover:text-primary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Clear */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="btn btn-ghost btn-sm text-accent mt-4 w-full"
        >
          Clear All Filters
        </button>
      )}
    </>
  );

  return (
    <>
      {/* ──────── COMPACT HEADER ──────── */}
      <section className="pt-28 pb-4 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-sm breadcrumbs text-base-content/60 mb-2">
          <ul>
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li className="text-base-content font-medium">Shop</li>
          </ul>
        </div>
        <h1 className="text-headline-lg text-primary">Our Collection</h1>
      </section>

      {/* ──────── MAIN CONTENT ──────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* ── Toolbar: Search + Sort + Mobile Filter Toggle ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10"
        >
          {/* Search */}
          <div className="relative w-full md:w-80">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full pl-10 bg-base-100 border-base-300 focus:border-primary focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Mobile filter toggle */}
            <button
              className="btn btn-outline btn-sm gap-2 lg:hidden"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              <FilterIcon />
              Filters
              {hasActiveFilters && (
                <span className="badge badge-primary badge-xs">
                  {selectedCategories.length + selectedTags.length}
                </span>
              )}
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="select select-bordered select-sm bg-base-100 border-base-300 focus:border-primary ml-auto"
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
        </motion.div>

        {/* ── Active filter pills ── */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap items-center gap-2 mb-6 overflow-hidden"
            >
              <span className="text-label-md text-base-content/50">Active:</span>
              {selectedCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className="badge badge-primary gap-1 cursor-pointer"
                >
                  {cat}
                  <XIcon />
                </button>
              ))}
              {selectedTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className="badge badge-secondary gap-1 cursor-pointer"
                >
                  {tag}
                  <XIcon />
                </button>
              ))}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="badge badge-accent gap-1 cursor-pointer"
                >
                  &quot;{searchQuery}&quot;
                  <XIcon />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-10">
          {/* ══════ SIDEBAR (desktop) ══════ */}
          <aside className="hidden lg:block w-64 shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="sticky top-28 space-y-6"
            >
              {filterContent}
            </motion.div>
          </aside>

          {/* ══════ MOBILE FILTER DRAWER ══════ */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 lg:hidden"
              >
                {/* Backdrop */}
                <div
                  className="absolute inset-0 bg-black/40"
                  onClick={() => setMobileFiltersOpen(false)}
                />
                {/* Drawer */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring" as const, damping: 25, stiffness: 300 }}
                  className="absolute left-0 top-0 bottom-0 w-80 bg-base-100 p-6 space-y-6 overflow-y-auto shadow-2xl"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-headline-md text-primary">Filters</h2>
                    <button
                      className="btn btn-ghost btn-sm btn-circle"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <XIcon />
                    </button>
                  </div>
                  {filterContent}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ══════ PRODUCT GRID ══════ */}
          <div className="flex-1 min-w-0">
            {/* Results count */}
            <p className="text-body-md text-base-content/50 mb-6">
              Showing{" "}
              <span className="font-semibold text-base-content">
                {filteredProducts.length}
              </span>{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </p>

            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <span className="text-6xl block mb-4"></span>
                <h3 className="text-headline-md text-primary mb-2">
                  No products found
                </h3>
                <p className="text-body-md text-base-content/60 mb-6">
                  Try adjusting your search or filter criteria.
                </p>
                <button onClick={clearAllFilters} className="btn btn-primary btn-sm">
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, i) => (
                    <motion.div
                      key={product.id}
                      variants={fadeUp}
                      custom={i}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        initial="rest"
                        whileHover="hover"
                        variants={cardHover}
                        className="card bg-base-100 shadow-sm border border-base-300/50 overflow-hidden group cursor-pointer"
                      >
                        {/* Image */}
                        <figure className="relative aspect-square overflow-hidden bg-base-200">
                          <img
                            src={product.img}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />

                          {/* Badge */}
                          {product.badge && (
                            <span className="absolute top-3 left-3 badge badge-secondary badge-sm text-xs uppercase tracking-wider">
                              {product.badge}
                            </span>
                          )}

                          {/* Add to Cart overlay */}
                          <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleAddToCart(product);
                              }}
                              className="btn btn-sm bg-base-100 text-primary border-0 shadow-lg gap-2 hover:bg-base-200"
                            >
                              <CartPlusIcon />
                              Add to Cart
                            </button>
                          </div>
                        </figure>

                        {/* Body */}
                        <div className="card-body p-5">
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-1">
                            {product.tags.map((tag) => (
                              <span
                                key={tag}
                                className="badge badge-xs badge-outline border-primary/30 text-primary/70"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <Link href={`/product/${product.id}`}>
                            <h3 className="card-title text-base font-serif text-primary group-hover:text-secondary transition-colors line-clamp-1">
                              {product.name}
                            </h3>
                          </Link>

                          <p className="text-xs text-base-content/50 uppercase">
                            {product.category}
                          </p>

                          <div className="flex items-baseline justify-between mt-2">
                            <span className="text-lg font-bold text-primary">
                              ₹{product.price}
                            </span>
                            <span className="text-xs text-base-content/50 uppercase">
                              / {product.unit}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
