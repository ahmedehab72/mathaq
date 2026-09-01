"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/features/shop/services/products";
import { coffeeImages } from "@/shared/lib/images";

export type AdminOrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

export type AdminOrderItem = {
  name: string;
  detail: string;
  quantity: number;
  price: number;
};

export type AdminOrder = {
  id: string;
  date: string;
  status: AdminOrderStatus;
  customer: { name: string; email: string };
  address: string[];
  items: AdminOrderItem[];
  subtotal: number;
  total: number;
};

type NewAdminOrder = Omit<AdminOrder, "id" | "date" | "status"> & { status?: AdminOrderStatus };
export type AdminProduct = Product & { published: boolean; stock: number };

type AdminState = {
  isAdmin: boolean;
  orders: AdminOrder[];
  products: AdminProduct[];
  setAdmin: (value: boolean) => void;
  addOrder: (order: NewAdminOrder) => string;
  updateOrderStatus: (id: string, status: AdminOrderStatus) => void;
  addProduct: (product: AdminProduct) => void;
  updateProduct: (slug: string, product: Partial<AdminProduct>) => void;
  deleteProduct: (slug: string) => void;
  toggleProduct: (slug: string) => void;
};

const demoOrders: AdminOrder[] = [
  {
    id: "MTH-1042",
    date: "18 Aug 2026",
    status: "Delivered",
    customer: { name: "MATHAQ guest", email: "guest@example.com" },
    address: ["14 Garden Street", "Cairo, Egypt"],
    items: [
      { name: "Morning No. 01", detail: "250 g, whole bean", quantity: 1, price: 18 },
      { name: "Highland No. 02", detail: "250 g, filter", quantity: 1, price: 22 },
    ],
    subtotal: 40,
    total: 40,
  },
];

const demoProducts: AdminProduct[] = [
  { slug: "morning-no-01", name: "Morning No. 01", eyebrow: "The quiet one", origin: "Brazil, Cerrado", process: "Natural", roast: "Medium", price: 18, notes: ["Chocolate", "Caramel", "Almond"], description: "A soft, generous cup built for slow mornings and forgiving brews.", image: coffeeImages.cup, accent: "#c56b48", featured: true, published: true, stock: 18 },
  { slug: "highland-no-02", name: "Highland No. 02", eyebrow: "The bright one", origin: "Ethiopia, Guji", process: "Washed", roast: "Light", price: 22, notes: ["Bergamot", "Peach", "Honey"], description: "A lifted, fragrant coffee with a clean finish and a little morning sun.", image: coffeeImages.pourOver, accent: "#d89a5b", published: true, stock: 15 },
  { slug: "ember-no-03", name: "Ember No. 03", eyebrow: "The deep one", origin: "Colombia, Huila", process: "Honey", roast: "Medium dark", price: 20, notes: ["Cacao", "Fig", "Brown sugar"], description: "Dense sweetness for espresso, milk drinks, and evenings that run late.", image: coffeeImages.beans, accent: "#8d4a36", published: true, stock: 4 },
];

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isAdmin: false,
      orders: demoOrders,
      products: demoProducts,
      setAdmin: (value) => set({ isAdmin: value }),
      addOrder: (incoming) => {
        const id = `MTH-${1043 + get().orders.length}`;
        const order = { ...incoming, id, date: "01 Sep 2026", status: incoming.status ?? "Pending" };
        set((state) => ({ orders: [order, ...state.orders] }));
        return id;
      },
      updateOrderStatus: (id, status) => set((state) => ({ orders: state.orders.map((order) => order.id === id ? { ...order, status } : order) })),
      addProduct: (product) => set((state) => ({ products: [product, ...state.products] })),
      updateProduct: (slug, product) => set((state) => ({ products: state.products.map((item) => item.slug === slug ? { ...item, ...product } : item) })),
      deleteProduct: (slug) => set((state) => ({ products: state.products.filter((item) => item.slug !== slug) })),
      toggleProduct: (slug) => set((state) => ({ products: state.products.map((item) => item.slug === slug ? { ...item, published: !item.published } : item) })),
    }),
    { name: "mathaq-admin-preview" },
  ),
);
