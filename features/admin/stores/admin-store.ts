"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

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

type AdminState = {
  isAdmin: boolean;
  orders: AdminOrder[];
  setAdmin: (value: boolean) => void;
  addOrder: (order: NewAdminOrder) => string;
  updateOrderStatus: (id: string, status: AdminOrderStatus) => void;
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

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isAdmin: false,
      orders: demoOrders,
      setAdmin: (value) => set({ isAdmin: value }),
      addOrder: (incoming) => {
        const id = `MTH-${1043 + get().orders.length}`;
        const order = { ...incoming, id, date: "01 Sep 2026", status: incoming.status ?? "Pending" };
        set((state) => ({ orders: [order, ...state.orders] }));
        return id;
      },
      updateOrderStatus: (id, status) => set((state) => ({ orders: state.orders.map((order) => order.id === id ? { ...order, status } : order) })),
    }),
    { name: "mathaq-admin-preview" },
  ),
);
