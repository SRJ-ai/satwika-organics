export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  unit: string; // e.g. "kg", "500g", "bottle"
  category: string;
  stock: number;
  rating?: number;
  origin?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer" | "vendor";
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: string;
}

export interface Vendor {
  id: string;
  brandName: string;
  ownerId: string;
  description: string;
  logoUrl?: string;
  rating?: number;
}
