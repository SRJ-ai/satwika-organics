"use client";

import { useState, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

/* ──── animation variants ──── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
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
interface SizeVariant {
  label: string;
  price: number;
}

interface ProductData {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  sizes: SizeVariant[];
  images: string[];
  tags: string[];
}

/* ──── product database ──── */
const PRODUCTS: Record<string, ProductData> = {
  "groundnut-oil": {
    id: "groundnut-oil",
    name: "Wood Pressed Groundnut Oil",
    category: "Cold Pressed Oils",
    rating: 4.8,
    reviewCount: 124,
    description:
      "Our signature groundnut oil is extracted using traditional wooden ghani presses, preserving the rich aroma and full nutritional profile that modern extraction methods destroy. Sourced from select organic farms in Andhra Pradesh, each batch is cold-pressed at temperatures below 40°C to retain essential fatty acids, vitamin E, and natural antioxidants.",
    features: [
      "100% wood-pressed using traditional ghani method",
      "Cold-pressed below 40°C to preserve nutrients",
      "Rich in Vitamin E and natural antioxidants",
      "No chemical solvents, preservatives, or additives",
      "Sourced directly from organic farms in Andhra Pradesh",
      "Perfect for cooking, frying, and seasoning",
    ],
    sizes: [
      { label: "500 ML", price: 450 },
      { label: "1 L", price: 820 },
      { label: "5 L", price: 3800 },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDddzKxJdXVhXtEp_13KvTM7mmp3s50cb4hUjzNTUpbrL4Lc4hNHucuq8JS0uJfDkIeQZeu0giOqVEZ6bfFIoQbdyveWnFQOcZZ_eH8WDfr4luAg9wSe0N4G6dsgINkTPRLesx91SC_QahTpxNLMjD7EzmJZmVTtC5_idy6AYdFiFuKBIr8Brf3_rJn-_KuiXIQQyGT9nDqyU8mRjL1Qdi1IeqyjXiulo0AwUeinu5A1BxU836Du5GYi4j55R49pGg3lxFRu2QHo8Q",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAnfB-ZYnUZoNu-_IDjhlbl8OGQbXGUUt0OsFgp43jy9EuSQzxcYTIaXT6lee4ci7iDjqTY6KVi5Ql8VuF8HKXm7KO_MfJcp95vXsuppAm5dC5lPaU1SebEMXiYIAfJIFzst9Zf_J62fazEI_ABzRdfepjOUY_-iI4o-Tcyh9CwPQVQKILBpv-zWeIpwZNhwmJj42qtV4gRGm-AnkZYhzVIF-z0lPYX5OFdpe5VKL0danyiyUU8p0BSKTnO5CBLl0g9iUlPQ4jV4lE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAzh0-90cxTi1WrZZTgAePUGrNNuIQwLqcs1ZwbLb3Vph2i73nYfdA20y1Y95yaVUvpRlywzv-zMLQr4Fcu_OUWbKzQAmkwXXYvquhXgCUoAWcUC52_f0Qod9zhWyoZcYhZcbYUDkPopHhcZTumqMc35S2YuuJHE1tSapyFCC_tBYAtoGzzHVsVoVuO7iF4xerSbj_r8f02ls4uEX3kuWE2S4NZ2bZ29xNeoHYfmzLfSZwlv6dCzBiHBKB9TXH9BCQ4JPhuHeWuvIQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtkIASRYm0WM65awcRrwdIB4RFMBq5RgnHNAfWwhQ-piNCqu5E0cxPXzFx33tWD9ISI5t_i0UsIOM9Ky4-b1fDNn6GFtb8b9E47WsOqVbeV1ojSVkxCvB3Rtv7I2GNAT4w-N1SEfs2NdnSs5DVuo8jCyt7JpLM4Z_b1231Ebh7EPeWlLaCR7ahY0Ybs1C_kH9q14logQGDjBGt15Mz-sZ1I2xtksu1Xl16G3HCLnXuRfyiNVwErQXzD7Ny6rOzIdmSx3ec9gEW7bw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdP063Xvayu42U8V1y9ErBuPVvfhIHLyGo58FMyGN8HLlpo0wc3fVAAqejXtjhnWSPAbo24QcnRL1Auxb7Zn3JQkFLOamkgfgX7d4nCITbD95-oMAxWHylwQVIVct5aFsrjXbuJgJThHZIfwEVDzSGKb-M8-qSuFFheEF22bSrDNydbTB2Xa8XYZgkn-JwE6SJ-TNUPWRbkTUcpInrA8T2JWxM3n1H0XcHTBMQLxNRcVXLAJDDl_oI5THIO3A7w3SS49VuKeFU2MM",
    ],
    tags: ["Wood Pressed", "Chemical Free"],
  },
  "safflower-oil": {
    id: "safflower-oil",
    name: "Cold Pressed Safflower Oil",
    category: "Cold Pressed Oils",
    rating: 4.6,
    reviewCount: 87,
    description:
      "Our safflower oil is meticulously cold-pressed from organically grown safflower seeds, yielding a light, heart-healthy oil prized for its high oleic acid content. Ideal for everyday cooking, this oil has a neutral taste that lets your ingredients shine while providing exceptional health benefits.",
    features: [
      "Cold-pressed from organically grown safflower seeds",
      "High in oleic acid — supports heart health",
      "Light, neutral taste for versatile cooking",
      "Rich in Vitamin E and omega-6 fatty acids",
      "No refinement, bleaching, or deodorizing",
      "Sourced directly from partner farms",
    ],
    sizes: [
      { label: "500 ML", price: 620 },
      { label: "1 L", price: 1150 },
      { label: "5 L", price: 5200 },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCW6LbmoK1D8W3vkYQXj3DcccHBFF52eGuCxgk0pnn6Cd5EzFdCbSe6VllO0XAU48jxGx9AlkX6kHL8FRQW0i924gfzbVWm8kbMsbzG6NaS-HMXvQ1iITxuUWQjI5NR-XXGHdiXBPv0djFNqrSjm5lxnwncJJ3mE7yBghSxVSI8Z61yY2OznJkyoMMym-frd2j1L9cu7hGa6A3fWkhi73oGVBIxNUlCQdZsiQ5XJBRxf3ntrM9E_opnfkuymqykCeMJapibmy2XGTE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAnfB-ZYnUZoNu-_IDjhlbl8OGQbXGUUt0OsFgp43jy9EuSQzxcYTIaXT6lee4ci7iDjqTY6KVi5Ql8VuF8HKXm7KO_MfJcp95vXsuppAm5dC5lPaU1SebEMXiYIAfJIFzst9Zf_J62fazEI_ABzRdfepjOUY_-iI4o-Tcyh9CwPQVQKILBpv-zWeIpwZNhwmJj42qtV4gRGm-AnkZYhzVIF-z0lPYX5OFdpe5VKL0danyiyUU8p0BSKTnO5CBLl0g9iUlPQ4jV4lE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAzh0-90cxTi1WrZZTgAePUGrNNuIQwLqcs1ZwbLb3Vph2i73nYfdA20y1Y95yaVUvpRlywzv-zMLQr4Fcu_OUWbKzQAmkwXXYvquhXgCUoAWcUC52_f0Qod9zhWyoZcYhZcbYUDkPopHhcZTumqMc35S2YuuJHE1tSapyFCC_tBYAtoGzzHVsVoVuO7iF4xerSbj_r8f02ls4uEX3kuWE2S4NZ2bZ29xNeoHYfmzLfSZwlv6dCzBiHBKB9TXH9BCQ4JPhuHeWuvIQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtkIASRYm0WM65awcRrwdIB4RFMBq5RgnHNAfWwhQ-piNCqu5E0cxPXzFx33tWD9ISI5t_i0UsIOM9Ky4-b1fDNn6GFtb8b9E47WsOqVbeV1ojSVkxCvB3Rtv7I2GNAT4w-N1SEfs2NdnSs5DVuo8jCyt7JpLM4Z_b1231Ebh7EPeWlLaCR7ahY0Ybs1C_kH9q14logQGDjBGt15Mz-sZ1I2xtksu1Xl16G3HCLnXuRfyiNVwErQXzD7Ny6rOzIdmSx3ec9gEW7bw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdP063Xvayu42U8V1y9ErBuPVvfhIHLyGo58FMyGN8HLlpo0wc3fVAAqejXtjhnWSPAbo24QcnRL1Auxb7Zn3JQkFLOamkgfgX7d4nCITbD95-oMAxWHylwQVIVct5aFsrjXbuJgJThHZIfwEVDzSGKb-M8-qSuFFheEF22bSrDNydbTB2Xa8XYZgkn-JwE6SJ-TNUPWRbkTUcpInrA8T2JWxM3n1H0XcHTBMQLxNRcVXLAJDDl_oI5THIO3A7w3SS49VuKeFU2MM",
    ],
    tags: ["Chemical Free", "Direct Farm"],
  },
  "lakadong-turmeric": {
    id: "lakadong-turmeric",
    name: "Authentic Lakadong Turmeric",
    category: "Superfoods",
    rating: 4.9,
    reviewCount: 203,
    description:
      "Sourced from the pristine Jaintia Hills of Meghalaya, our Lakadong turmeric boasts an extraordinary curcumin content of 7-12% — far exceeding the 2-3% found in common turmeric. Each batch is hand-harvested by indigenous communities, sun-dried, and stone-ground to preserve its potent bioactive compounds.",
    features: [
      "7-12% curcumin content — among the highest in the world",
      "Hand-harvested from Jaintia Hills, Meghalaya",
      "Sun-dried and stone-ground for maximum potency",
      "No artificial colouring or adulteration",
      "Supports joint health, immunity, and digestion",
      "Lab-tested for purity and curcumin levels",
    ],
    sizes: [
      { label: "250 G", price: 350 },
      { label: "500 G", price: 650 },
      { label: "1 KG", price: 1200 },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBFX3G1EyGvZuHexMj3IlrEtanMzXRh-wnDM-Tktss0VXobJWqVqneTX7TKn8a15sh6zM_vR5t04jHXCtXFoAaXlZ_Es0WiW7dHWZddEDjOdVA-efA-X-8wr87F_39fVn2CCBZfqYrwIJVn4g4IvcK199iytIxY7qRyIcSJ-fByEg7tEcczSH0SWzWikhTxwZ_CLkpzqZzyT57OVSo5mM7UlfYyuC-R9lvsW85ufnaFFDCCbmJxmLOz_v0UfHYeD2h4AyQk-6o7G5Q",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAnfB-ZYnUZoNu-_IDjhlbl8OGQbXGUUt0OsFgp43jy9EuSQzxcYTIaXT6lee4ci7iDjqTY6KVi5Ql8VuF8HKXm7KO_MfJcp95vXsuppAm5dC5lPaU1SebEMXiYIAfJIFzst9Zf_J62fazEI_ABzRdfepjOUY_-iI4o-Tcyh9CwPQVQKILBpv-zWeIpwZNhwmJj42qtV4gRGm-AnkZYhzVIF-z0lPYX5OFdpe5VKL0danyiyUU8p0BSKTnO5CBLl0g9iUlPQ4jV4lE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAzh0-90cxTi1WrZZTgAePUGrNNuIQwLqcs1ZwbLb3Vph2i73nYfdA20y1Y95yaVUvpRlywzv-zMLQr4Fcu_OUWbKzQAmkwXXYvquhXgCUoAWcUC52_f0Qod9zhWyoZcYhZcbYUDkPopHhcZTumqMc35S2YuuJHE1tSapyFCC_tBYAtoGzzHVsVoVuO7iF4xerSbj_r8f02ls4uEX3kuWE2S4NZ2bZ29xNeoHYfmzLfSZwlv6dCzBiHBKB9TXH9BCQ4JPhuHeWuvIQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtkIASRYm0WM65awcRrwdIB4RFMBq5RgnHNAfWwhQ-piNCqu5E0cxPXzFx33tWD9ISI5t_i0UsIOM9Ky4-b1fDNn6GFtb8b9E47WsOqVbeV1ojSVkxCvB3Rtv7I2GNAT4w-N1SEfs2NdnSs5DVuo8jCyt7JpLM4Z_b1231Ebh7EPeWlLaCR7ahY0Ybs1C_kH9q14logQGDjBGt15Mz-sZ1I2xtksu1Xl16G3HCLnXuRfyiNVwErQXzD7Ny6rOzIdmSx3ec9gEW7bw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdP063Xvayu42U8V1y9ErBuPVvfhIHLyGo58FMyGN8HLlpo0wc3fVAAqejXtjhnWSPAbo24QcnRL1Auxb7Zn3JQkFLOamkgfgX7d4nCITbD95-oMAxWHylwQVIVct5aFsrjXbuJgJThHZIfwEVDzSGKb-M8-qSuFFheEF22bSrDNydbTB2Xa8XYZgkn-JwE6SJ-TNUPWRbkTUcpInrA8T2JWxM3n1H0XcHTBMQLxNRcVXLAJDDl_oI5THIO3A7w3SS49VuKeFU2MM",
    ],
    tags: ["Chemical Free", "Direct Farm"],
  },
  "wild-forest-honey": {
    id: "wild-forest-honey",
    name: "Wild Forest Honey",
    category: "Honey & Preserves",
    rating: 4.7,
    reviewCount: 156,
    description:
      "Harvested from pristine forest reserves by traditional honey gatherers, our Wild Forest Honey captures the complex floral nectar of diverse woodland blooms. Unprocessed, unfiltered, and unpasteurised — this honey retains its full spectrum of enzymes, pollen, and beneficial compounds exactly as nature intended.",
    features: [
      "Raw, unprocessed, and unpasteurised",
      "Harvested from pristine forest reserves",
      "Rich in natural enzymes and antioxidants",
      "Contains natural bee pollen and propolis",
      "No added sugar, flavour, or preservatives",
      "Traditional and sustainable harvesting practices",
    ],
    sizes: [
      { label: "250 G", price: 320 },
      { label: "500 G", price: 580 },
      { label: "1 KG", price: 1050 },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaMLF0TK0EIb_gZwoeBcNukFTyZ97JAdCvzidEcx35eDXQxaMZsy-u_Bj-1P33Mkf1ep12PgyoK6UUNkGMp8q3M4lrrb3iEdjw4caVcCgKvimKvCk_AOZbPCY7mrKMY_NQbPB4-f4uskw5y2KH3V1Yp1hPrSG8FmmKl7I9UbCq9Ll14grZW8l1SIfGcDzfphGG3-UN5idf00o2UnQD9fODlbxrCD8ZST1XYP2ttpTBbYP-WvgNu20YuVVbeskAQ1qs_M9Bv13V45w",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAnfB-ZYnUZoNu-_IDjhlbl8OGQbXGUUt0OsFgp43jy9EuSQzxcYTIaXT6lee4ci7iDjqTY6KVi5Ql8VuF8HKXm7KO_MfJcp95vXsuppAm5dC5lPaU1SebEMXiYIAfJIFzst9Zf_J62fazEI_ABzRdfepjOUY_-iI4o-Tcyh9CwPQVQKILBpv-zWeIpwZNhwmJj42qtV4gRGm-AnkZYhzVIF-z0lPYX5OFdpe5VKL0danyiyUU8p0BSKTnO5CBLl0g9iUlPQ4jV4lE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAzh0-90cxTi1WrZZTgAePUGrNNuIQwLqcs1ZwbLb3Vph2i73nYfdA20y1Y95yaVUvpRlywzv-zMLQr4Fcu_OUWbKzQAmkwXXYvquhXgCUoAWcUC52_f0Qod9zhWyoZcYhZcbYUDkPopHhcZTumqMc35S2YuuJHE1tSapyFCC_tBYAtoGzzHVsVoVuO7iF4xerSbj_r8f02ls4uEX3kuWE2S4NZ2bZ29xNeoHYfmzLfSZwlv6dCzBiHBKB9TXH9BCQ4JPhuHeWuvIQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtkIASRYm0WM65awcRrwdIB4RFMBq5RgnHNAfWwhQ-piNCqu5E0cxPXzFx33tWD9ISI5t_i0UsIOM9Ky4-b1fDNn6GFtb8b9E47WsOqVbeV1ojSVkxCvB3Rtv7I2GNAT4w-N1SEfs2NdnSs5DVuo8jCyt7JpLM4Z_b1231Ebh7EPeWlLaCR7ahY0Ybs1C_kH9q14logQGDjBGt15Mz-sZ1I2xtksu1Xl16G3HCLnXuRfyiNVwErQXzD7Ny6rOzIdmSx3ec9gEW7bw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdP063Xvayu42U8V1y9ErBuPVvfhIHLyGo58FMyGN8HLlpo0wc3fVAAqejXtjhnWSPAbo24QcnRL1Auxb7Zn3JQkFLOamkgfgX7d4nCITbD95-oMAxWHylwQVIVct5aFsrjXbuJgJThHZIfwEVDzSGKb-M8-qSuFFheEF22bSrDNydbTB2Xa8XYZgkn-JwE6SJ-TNUPWRbkTUcpInrA8T2JWxM3n1H0XcHTBMQLxNRcVXLAJDDl_oI5THIO3A7w3SS49VuKeFU2MM",
    ],
    tags: ["Chemical Free"],
  },
  "aloe-vera-gel": {
    id: "aloe-vera-gel",
    name: "Pure Aloe Vera Gel",
    category: "Personal Care",
    rating: 4.5,
    reviewCount: 68,
    description:
      "Our pure Aloe Vera Gel is freshly extracted from organically cultivated Aloe Barbadensis plants. Free from synthetic thickeners, colours, and fragrances, this gel offers the genuine soothing and moisturising benefits of aloe in its most natural form. Perfect for skin, hair, and as a cooling after-sun treatment.",
    features: [
      "Freshly extracted from organic Aloe Barbadensis",
      "No synthetic thickeners or artificial colours",
      "Multi-purpose: skin, hair, and after-sun care",
      "Naturally soothing and deeply moisturising",
      "Non-sticky, lightweight formula",
      "Packaged in UV-protective containers",
    ],
    sizes: [
      { label: "100 ML", price: 180 },
      { label: "200 ML", price: 290 },
      { label: "500 ML", price: 620 },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCcHvZR2K8XvoWHF-ffKukWhUCI0Xb0adL0q4pXx3IGEZDPr59pmO0Xovh56t6S2J2evaKhTw135shzpc4yX5rA7K2E5bo8WiIyzIU3phH1S93i8TpvP9HZi2eCsmjQx6K9oeZXmi_jPCbvcP_ubiBAePgViVBJx5J5pp7NhaJeV54opKgSuCdWV86Yj_IyU-HqNh3WSDmfaiooxKY3U6K4492H44FNBw9L-tunorbL7k4ypO3qPYSeQocJ61uPqwNUnrCGAUHjtVU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAnfB-ZYnUZoNu-_IDjhlbl8OGQbXGUUt0OsFgp43jy9EuSQzxcYTIaXT6lee4ci7iDjqTY6KVi5Ql8VuF8HKXm7KO_MfJcp95vXsuppAm5dC5lPaU1SebEMXiYIAfJIFzst9Zf_J62fazEI_ABzRdfepjOUY_-iI4o-Tcyh9CwPQVQKILBpv-zWeIpwZNhwmJj42qtV4gRGm-AnkZYhzVIF-z0lPYX5OFdpe5VKL0danyiyUU8p0BSKTnO5CBLl0g9iUlPQ4jV4lE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAzh0-90cxTi1WrZZTgAePUGrNNuIQwLqcs1ZwbLb3Vph2i73nYfdA20y1Y95yaVUvpRlywzv-zMLQr4Fcu_OUWbKzQAmkwXXYvquhXgCUoAWcUC52_f0Qod9zhWyoZcYhZcbYUDkPopHhcZTumqMc35S2YuuJHE1tSapyFCC_tBYAtoGzzHVsVoVuO7iF4xerSbj_r8f02ls4uEX3kuWE2S4NZ2bZ29xNeoHYfmzLfSZwlv6dCzBiHBKB9TXH9BCQ4JPhuHeWuvIQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtkIASRYm0WM65awcRrwdIB4RFMBq5RgnHNAfWwhQ-piNCqu5E0cxPXzFx33tWD9ISI5t_i0UsIOM9Ky4-b1fDNn6GFtb8b9E47WsOqVbeV1ojSVkxCvB3Rtv7I2GNAT4w-N1SEfs2NdnSs5DVuo8jCyt7JpLM4Z_b1231Ebh7EPeWlLaCR7ahY0Ybs1C_kH9q14logQGDjBGt15Mz-sZ1I2xtksu1Xl16G3HCLnXuRfyiNVwErQXzD7Ny6rOzIdmSx3ec9gEW7bw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdP063Xvayu42U8V1y9ErBuPVvfhIHLyGo58FMyGN8HLlpo0wc3fVAAqejXtjhnWSPAbo24QcnRL1Auxb7Zn3JQkFLOamkgfgX7d4nCITbD95-oMAxWHylwQVIVct5aFsrjXbuJgJThHZIfwEVDzSGKb-M8-qSuFFheEF22bSrDNydbTB2Xa8XYZgkn-JwE6SJ-TNUPWRbkTUcpInrA8T2JWxM3n1H0XcHTBMQLxNRcVXLAJDDl_oI5THIO3A7w3SS49VuKeFU2MM",
    ],
    tags: ["Chemical Free", "Direct Farm"],
  },
  "moringa-powder": {
    id: "moringa-powder",
    name: "Organic Moringa Leaf Powder",
    category: "Superfoods",
    rating: 4.7,
    reviewCount: 91,
    description:
      "Our Moringa Leaf Powder is sourced from shade-dried leaves of the Moringa Oleifera tree, known as the 'Miracle Tree' in Ayurveda. Each harvest is carefully dried at low temperatures to preserve the full spectrum of 90+ nutrients, including iron, calcium, and all essential amino acids.",
    features: [
      "Shade-dried to preserve 90+ nutrients",
      "Rich in iron, calcium, and essential amino acids",
      "7x more Vitamin C than oranges",
      "Supports energy, immunity, and bone health",
      "Versatile: smoothies, teas, soups, and recipes",
      "100% organic with no fillers or additives",
    ],
    sizes: [
      { label: "100 G", price: 190 },
      { label: "200 G", price: 320 },
      { label: "500 G", price: 720 },
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCqmuH-5NP3vNXEZ5VkelBFh40-9wJtMrPDYyHZOk40aDZrqZqfPn8Twth2aVnzIBuVg8Nt9YLvI5rFi16U39kOztcwiEVwEWrVlxBvWs7x4Jc2TQI9gC3M21pKGvu6C9jeSk0U2hcIAm5jhg4MiTMYKIySM6CDkoXw2I2owLPpTAzCSuEADCGQHOxEF1VprPafq0FnkkmcJjx0CVDopr2MZ1mPYIaMN8x_VcvtPotlbBZ1fFCPUOpyRqAHmh8qHDfVMIk42vsC2Uo",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAnfB-ZYnUZoNu-_IDjhlbl8OGQbXGUUt0OsFgp43jy9EuSQzxcYTIaXT6lee4ci7iDjqTY6KVi5Ql8VuF8HKXm7KO_MfJcp95vXsuppAm5dC5lPaU1SebEMXiYIAfJIFzst9Zf_J62fazEI_ABzRdfepjOUY_-iI4o-Tcyh9CwPQVQKILBpv-zWeIpwZNhwmJj42qtV4gRGm-AnkZYhzVIF-z0lPYX5OFdpe5VKL0danyiyUU8p0BSKTnO5CBLl0g9iUlPQ4jV4lE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAzh0-90cxTi1WrZZTgAePUGrNNuIQwLqcs1ZwbLb3Vph2i73nYfdA20y1Y95yaVUvpRlywzv-zMLQr4Fcu_OUWbKzQAmkwXXYvquhXgCUoAWcUC52_f0Qod9zhWyoZcYhZcbYUDkPopHhcZTumqMc35S2YuuJHE1tSapyFCC_tBYAtoGzzHVsVoVuO7iF4xerSbj_r8f02ls4uEX3kuWE2S4NZ2bZ29xNeoHYfmzLfSZwlv6dCzBiHBKB9TXH9BCQ4JPhuHeWuvIQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtkIASRYm0WM65awcRrwdIB4RFMBq5RgnHNAfWwhQ-piNCqu5E0cxPXzFx33tWD9ISI5t_i0UsIOM9Ky4-b1fDNn6GFtb8b9E47WsOqVbeV1ojSVkxCvB3Rtv7I2GNAT4w-N1SEfs2NdnSs5DVuo8jCyt7JpLM4Z_b1231Ebh7EPeWlLaCR7ahY0Ybs1C_kH9q14logQGDjBGt15Mz-sZ1I2xtksu1Xl16G3HCLnXuRfyiNVwErQXzD7Ny6rOzIdmSx3ec9gEW7bw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdP063Xvayu42U8V1y9ErBuPVvfhIHLyGo58FMyGN8HLlpo0wc3fVAAqejXtjhnWSPAbo24QcnRL1Auxb7Zn3JQkFLOamkgfgX7d4nCITbD95-oMAxWHylwQVIVct5aFsrjXbuJgJThHZIfwEVDzSGKb-M8-qSuFFheEF22bSrDNydbTB2Xa8XYZgkn-JwE6SJ-TNUPWRbkTUcpInrA8T2JWxM3n1H0XcHTBMQLxNRcVXLAJDDl_oI5THIO3A7w3SS49VuKeFU2MM",
    ],
    tags: ["Wood Pressed", "Direct Farm"],
  },
};

/* Default fallback product */
const DEFAULT_PRODUCT_ID = "groundnut-oil";

/* Related products config (show 3 from the catalog, excluding current) */
const RELATED_PRODUCT_IDS = [
  "safflower-oil",
  "lakadong-turmeric",
  "wild-forest-honey",
  "aloe-vera-gel",
  "moringa-powder",
  "groundnut-oil",
];

/* ──── icons ──── */
function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={filled ? "text-secondary" : "text-base-300"}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-success"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
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
    </svg>
  );
}

/* ═══════════════════════════════════════════
   PRODUCT DETAIL PAGE
   ═══════════════════════════════════════════ */
interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const product = PRODUCTS[id] || PRODUCTS[DEFAULT_PRODUCT_ID];

  const { addItem } = useCart();

  /* ── state ── */
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const currentSize = product.sizes[selectedSizeIndex];
  const totalPrice = currentSize.price * quantity;

  /* ── handlers ── */
  const incrementQty = () => setQuantity((q) => Math.min(q + 1, 20));
  const decrementQty = () => setQuantity((q) => Math.max(q - 1, 1));

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${currentSize.label}`,
      name: product.name,
      price: currentSize.price,
      image: product.images[0],
      quantity,
      unit: currentSize.label,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  /* ── related products ── */
  const relatedProducts = RELATED_PRODUCT_IDS.filter((pid) => pid !== product.id)
    .slice(0, 3)
    .map((pid) => PRODUCTS[pid])
    .filter(Boolean);

  /* ── star rating ── */
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} filled={i < Math.round(rating)} />
    ));
  };

  return (
    <>
      {/* ──────── BREADCRUMBS ──────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-sm breadcrumbs text-base-content/50"
        >
          <ul>
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/catalog" className="hover:text-primary transition-colors">
                Shop
              </Link>
            </li>
            <li className="text-base-content/80 font-medium">{product.name}</li>
          </ul>
        </motion.div>
      </section>

      {/* ──────── PRODUCT HERO ──────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* ══════ IMAGE GALLERY ══════ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-base-200 border border-base-300/50">
              <motion.img
                key={selectedImageIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={product.images[selectedImageIndex]}
                alt={`${product.name} - view ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Purity tags */}
              <div className="absolute top-4 left-4 flex gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="badge badge-sm badge-primary text-xs uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    idx === selectedImageIndex
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-base-300/50 hover:border-primary/40 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* ══════ PRODUCT INFO ══════ */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col"
          >
            {/* Category */}
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-label-md uppercase tracking-[0.2em] text-secondary"
            >
              {product.category}
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-display-lg text-primary mt-2 leading-tight"
            >
              {product.name}
            </motion.h1>

            {/* Rating */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="flex items-center gap-3 mt-4"
            >
              <div className="flex items-center gap-0.5">{renderStars(product.rating)}</div>
              <span className="text-body-md text-base-content/70">
                {product.rating}
              </span>
              <span className="text-body-md text-base-content/40">
                ({product.reviewCount} reviews)
              </span>
            </motion.div>

            {/* Price */}
            <motion.div variants={fadeUp} custom={3} className="mt-6">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary font-serif">
                  ₹{currentSize.price}
                </span>
                <span className="text-body-md text-base-content/50">
                  / {currentSize.label}
                </span>
              </div>
              {quantity > 1 && (
                <p className="text-sm text-secondary mt-1 font-medium">
                  Total: ₹{totalPrice}
                </p>
              )}
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="divider my-6" />

            {/* Size Selector */}
            <motion.div variants={fadeUp} custom={5}>
              <h3 className="text-label-md uppercase tracking-wider text-primary mb-3">
                Size
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size, idx) => (
                  <button
                    key={size.label}
                    onClick={() => {
                      setSelectedSizeIndex(idx);
                      setQuantity(1);
                    }}
                    className={`btn btn-sm rounded-full px-6 transition-all duration-200 ${
                      idx === selectedSizeIndex
                        ? "btn-primary"
                        : "btn-outline border-base-300 text-base-content hover:btn-primary"
                    }`}
                  >
                    {size.label} — ₹{size.price}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Quantity */}
            <motion.div variants={fadeUp} custom={6} className="mt-8">
              <h3 className="text-label-md uppercase tracking-wider text-primary mb-3">
                Quantity
              </h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={decrementQty}
                  disabled={quantity <= 1}
                  className="btn btn-sm btn-ghost btn-circle border border-base-300 disabled:opacity-30"
                >
                  <MinusIcon />
                </button>
                <span className="w-14 text-center text-lg font-semibold text-primary">
                  {quantity}
                </span>
                <button
                  onClick={incrementQty}
                  disabled={quantity >= 20}
                  className="btn btn-sm btn-ghost btn-circle border border-base-300 disabled:opacity-30"
                >
                  <PlusIcon />
                </button>
              </div>
            </motion.div>

            {/* Add to Cart */}
            <motion.div variants={fadeUp} custom={7} className="mt-10">
              <button
                onClick={handleAddToCart}
                className={`btn btn-lg w-full sm:w-auto rounded-full px-12 gap-3 shadow-lg transition-all duration-300 ${
                  addedToCart
                    ? "btn-success text-success-content shadow-success/20"
                    : "btn-primary shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                }`}
              >
                {addedToCart ? (
                  <>
                    <CheckIcon />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <CartIcon />
                    Add to Cart — ₹{totalPrice}
                  </>
                )}
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeUp}
              custom={8}
              className="mt-8 flex flex-wrap gap-6 text-sm text-base-content/60"
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">️</span> Lab Tested
              </span>
              <span className="flex items-center gap-2">
                <span className="text-lg"></span> Free Shipping
              </span>
              <span className="flex items-center gap-2">
                <span className="text-lg">↩️</span> Easy Returns
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ──────── DESCRIPTION & FEATURES ──────── */}
      <section className="bg-base-200/30 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Description */}
            <motion.div variants={fadeUp} custom={0}>
              <h2 className="text-headline-lg text-primary mb-6">About This Product</h2>
              <p className="text-body-lg text-base-content/70 leading-relaxed">
                {product.description}
              </p>
            </motion.div>

            {/* Features */}
            <motion.div variants={fadeUp} custom={1}>
              <h2 className="text-headline-lg text-primary mb-6">Key Features</h2>
              <ul className="space-y-4">
                {product.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 shrink-0">
                      <CheckIcon />
                    </span>
                    <span className="text-body-md text-base-content/80">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ──────── YOU MAY ALSO LIKE ──────── */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mb-12"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-label-md uppercase tracking-[0.2em] text-secondary"
            >
              Curated for You
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-headline-lg text-primary mt-3"
            >
              You May Also Like
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {relatedProducts.map((rp, i) => (
              <motion.div key={rp.id} variants={fadeUp} custom={i}>
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  variants={cardHover}
                  className="card bg-base-100 shadow-sm border border-base-300/50 overflow-hidden group cursor-pointer"
                >
                  <figure className="relative aspect-square overflow-hidden bg-base-200">
                    <img
                      src={rp.images[0]}
                      alt={rp.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <Link
                        href={`/product/${rp.id}`}
                        className="btn btn-sm bg-base-100 text-primary border-0 shadow-lg"
                      >
                        View Product
                      </Link>
                    </div>
                  </figure>
                  <div className="card-body p-5">
                    <p className="text-xs uppercase tracking-wider text-base-content/40">
                      {rp.category}
                    </p>
                    <Link href={`/product/${rp.id}`}>
                      <h3 className="card-title text-base font-serif text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        {rp.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(rp.rating)}
                      <span className="text-xs text-base-content/50 ml-1">
                        ({rp.reviewCount})
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between mt-2">
                      <span className="text-lg font-bold text-primary">
                        ₹{rp.sizes[0].price}
                      </span>
                      <span className="text-xs text-base-content/50 uppercase">
                        / {rp.sizes[0].label}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
