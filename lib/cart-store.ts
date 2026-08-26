"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/products";

export type CartItem = {
  id: string;
  product: Product;
  grind: string;
  size: string;
  unitPrice: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  changeQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (incoming) =>
        set((state) => {
          const id = `${incoming.product.slug}-${incoming.size}-${incoming.grind}`;
          const found = state.items.find((item) => item.id === id);
          if (found) {
            return {
              items: state.items.map((item) =>
                item.id === id
                  ? { ...item, unitPrice: incoming.unitPrice, quantity: Math.min(9, item.quantity + incoming.quantity) }
                  : item,
              ),
            };
          }
          return { items: [...state.items, { ...incoming, id }] };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      changeQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, Math.min(9, quantity)) }
              : item,
          ),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "mathaq-tray" },
  ),
);
