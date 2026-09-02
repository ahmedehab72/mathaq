"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/features/shop/services/products";
import { coffeeImages } from "@/shared/lib/images";
import { journalPosts } from "@/features/content/data/journal";

export type AdminOrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Refunded" | "Cancelled";
export type AdminPaymentStatus = "Unpaid" | "Paid" | "Refunded" | "Failed";
export type ProductSize = "250 g" | "500 g" | "1 kg";
export type AdminProductVariant = { size: ProductSize; priceMultiplier: number; stock: number };
export type ShippingDetails = { phone: string; governorate: string; city: string; street: string; building: string; landmark?: string };
export type Coupon = { id: string; code: string; discountType: "percentage" | "fixed"; value: number; expires: string; active: boolean };
export type Review = { id: string; productSlug: string; customer: string; rating: number; copy: string; approved: boolean };
export type Subscription = { id: string; plan: string; customer: string; email: string; nextRenewal: string; status: "Active" | "Paused" | "Cancelled" };
export type GiftCard = { id: string; code: string; value: number; sender: string; recipient: string; redeemed: boolean };

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
  paymentStatus: AdminPaymentStatus;
  customer: { name: string; email: string };
  address: string[];
  shipping: ShippingDetails;
  items: AdminOrderItem[];
  subtotal: number;
  total: number;
};

type NewAdminOrder = Omit<AdminOrder, "id" | "date" | "status" | "paymentStatus"> & { status?: AdminOrderStatus; paymentStatus?: AdminPaymentStatus };
export type AdminProduct = Product & { published: boolean; variants: AdminProductVariant[] };

type AdminState = {
  isAdmin: boolean;
  orders: AdminOrder[];
  products: AdminProduct[];
  coupons: Coupon[];
  reviews: Review[];
  subscriptions: Subscription[];
  giftCards: GiftCard[];
  journalPublished: Record<string, boolean>;
  setAdmin: (value: boolean) => void;
  addOrder: (order: NewAdminOrder) => string;
  updateOrderStatus: (id: string, status: AdminOrderStatus) => void;
  updatePaymentStatus: (id: string, paymentStatus: AdminPaymentStatus) => void;
  addProduct: (product: AdminProduct) => void;
  updateProduct: (slug: string, product: Partial<AdminProduct>) => void;
  deleteProduct: (slug: string) => void;
  toggleProduct: (slug: string) => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (id: string) => void;
  updateCoupon: (id: string, coupon: Partial<Coupon>) => void;
  toggleCoupon: (id: string) => void;
  addReview: (review: Review) => void;
  toggleReview: (id: string) => void;
  addGiftCard: (card: GiftCard) => void;
  deleteGiftCard: (id: string) => void;
  updateSubscriptionStatus: (id: string, status: Subscription["status"]) => void;
  addSubscription: (subscription: Subscription) => void;
  toggleJournalPost: (slug: string) => void;
  decrementVariantStock: (slug: string, size: ProductSize, quantity?: number) => void;
};

const demoOrders: AdminOrder[] = [
  {
    id: "MTH-1042",
    date: "18 Aug 2026",
    status: "Delivered",
    paymentStatus: "Paid",
    customer: { name: "MATHAQ guest", email: "guest@example.com" },
    address: ["14 Garden Street", "Cairo, Egypt"],
    shipping: { phone: "+20 100 000 1042", governorate: "Cairo", city: "Cairo", street: "14 Garden Street", building: "Building 8, Floor 2", landmark: "Near the garden" },
    items: [
      { name: "Morning No. 01", detail: "250 g, whole bean", quantity: 1, price: 18 },
      { name: "Highland No. 02", detail: "250 g, filter", quantity: 1, price: 22 },
    ],
    subtotal: 40,
    total: 40,
  },
];

const demoProducts: AdminProduct[] = [
  { slug: "morning-no-01", name: "Morning No. 01", eyebrow: "The quiet one", origin: "Brazil, Cerrado", process: "Natural", roast: "Medium", price: 18, notes: ["Chocolate", "Caramel", "Almond"], description: "A soft, generous cup built for slow mornings and forgiving brews.", image: coffeeImages.cup, accent: "#c56b48", featured: true, published: true, variants: [{ size: "250 g", priceMultiplier: 1, stock: 18 }, { size: "500 g", priceMultiplier: 1.78, stock: 10 }, { size: "1 kg", priceMultiplier: 3.25, stock: 4 }] },
  { slug: "highland-no-02", name: "Highland No. 02", eyebrow: "The bright one", origin: "Ethiopia, Guji", process: "Washed", roast: "Light", price: 22, notes: ["Bergamot", "Peach", "Honey"], description: "A lifted, fragrant coffee with a clean finish and a little morning sun.", image: coffeeImages.pourOver, accent: "#d89a5b", published: true, variants: [{ size: "250 g", priceMultiplier: 1, stock: 15 }, { size: "500 g", priceMultiplier: 1.78, stock: 8 }, { size: "1 kg", priceMultiplier: 3.25, stock: 0 }] },
  { slug: "ember-no-03", name: "Ember No. 03", eyebrow: "The deep one", origin: "Colombia, Huila", process: "Honey", roast: "Medium dark", price: 20, notes: ["Cacao", "Fig", "Brown sugar"], description: "Dense sweetness for espresso, milk drinks, and evenings that run late.", image: coffeeImages.beans, accent: "#8d4a36", published: true, variants: [{ size: "250 g", priceMultiplier: 1, stock: 4 }, { size: "500 g", priceMultiplier: 1.78, stock: 2 }, { size: "1 kg", priceMultiplier: 3.25, stock: 0 }] },
];
const demoCoupons: Coupon[] = [{ id: "coupon-10", code: "MATHAQ10", discountType: "percentage", value: 10, expires: "31 Dec 2026", active: true }];
const demoReviews: Review[] = [{ id: "review-1", productSlug: "morning-no-01", customer: "Mariam, Cairo", rating: 5, copy: "Soft, clear, and easy to brew before the day starts.", approved: true }];
const demoSubscriptions: Subscription[] = [{ id: "sub-1", plan: "The morning shelf", customer: "MATHAQ guest", email: "guest@example.com", nextRenewal: "01 Oct 2026", status: "Active" }];
const demoGiftCards: GiftCard[] = [{ id: "gift-1", code: "MTH-GIFT-50", value: 50, sender: "MATHAQ studio", recipient: "Someone special", redeemed: false }];

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isAdmin: false,
      orders: demoOrders,
      products: demoProducts,
      coupons: demoCoupons,
      reviews: demoReviews,
      subscriptions: demoSubscriptions,
      giftCards: demoGiftCards,
      journalPublished: Object.fromEntries(journalPosts.map((post, index) => [post.slug, index === 0])),
      setAdmin: (value) => set({ isAdmin: value }),
      addOrder: (incoming) => {
        const id = `MTH-${1043 + get().orders.length}`;
        const order = { ...incoming, id, date: "01 Sep 2026", status: incoming.status ?? "Pending", paymentStatus: incoming.paymentStatus ?? "Unpaid" };
        set((state) => ({ orders: [order, ...state.orders] }));
        return id;
      },
      updateOrderStatus: (id, status) => set((state) => ({ orders: state.orders.map((order) => order.id === id ? { ...order, status } : order) })),
      updatePaymentStatus: (id, paymentStatus) => set((state) => ({ orders: state.orders.map((order) => order.id === id ? { ...order, paymentStatus } : order) })),
      addProduct: (product) => set((state) => ({ products: [product, ...state.products] })),
      updateProduct: (slug, product) => set((state) => ({ products: state.products.map((item) => item.slug === slug ? { ...item, ...product } : item) })),
      deleteProduct: (slug) => set((state) => ({ products: state.products.filter((item) => item.slug !== slug) })),
      toggleProduct: (slug) => set((state) => ({ products: state.products.map((item) => item.slug === slug ? { ...item, published: !item.published } : item) })),
      addCoupon: (coupon) => set((state) => ({ coupons: [coupon, ...state.coupons] })),
      deleteCoupon: (id) => set((state) => ({ coupons: state.coupons.filter((item) => item.id !== id) })),
      updateCoupon: (id, coupon) => set((state) => ({ coupons: state.coupons.map((item) => item.id === id ? { ...item, ...coupon } : item) })),
      toggleCoupon: (id) => set((state) => ({ coupons: state.coupons.map((item) => item.id === id ? { ...item, active: !item.active } : item) })),
      addReview: (review) => set((state) => ({ reviews: [review, ...state.reviews] })),
      toggleReview: (id) => set((state) => ({ reviews: state.reviews.map((item) => item.id === id ? { ...item, approved: !item.approved } : item) })),
      addGiftCard: (card) => set((state) => ({ giftCards: [card, ...state.giftCards] })),
      deleteGiftCard: (id) => set((state) => ({ giftCards: state.giftCards.filter((item) => item.id !== id) })),
      updateSubscriptionStatus: (id, status) => set((state) => ({ subscriptions: state.subscriptions.map((item) => item.id === id ? { ...item, status } : item) })),
      addSubscription: (subscription) => set((state) => ({ subscriptions: [subscription, ...state.subscriptions] })),
      toggleJournalPost: (slug) => set((state) => ({ journalPublished: { ...(state.journalPublished ?? {}), [slug]: !(state.journalPublished ?? {})[slug] } })),
      decrementVariantStock: (slug, size, quantity = 1) => set((state) => ({ products: state.products.map((product) => product.slug === slug ? { ...product, variants: getProductVariants(product).map((variant) => variant.size === size ? { ...variant, stock: Math.max(0, variant.stock - quantity) } : variant) } : product) })),
    }),
    { name: "mathaq-admin-preview" },
  ),
);

export function getProductVariants(product: AdminProduct | Product): AdminProductVariant[] {
  if ("variants" in product && product.variants?.length) return product.variants;
  const legacyStock = "stock" in product && typeof product.stock === "number" ? product.stock : 0;
  return [
    { size: "250 g", priceMultiplier: 1, stock: legacyStock },
    { size: "500 g", priceMultiplier: 1.78, stock: legacyStock },
    { size: "1 kg", priceMultiplier: 3.25, stock: legacyStock },
  ];
}
