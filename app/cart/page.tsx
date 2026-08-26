import type { Metadata } from "next";
import { CartView } from "@/features/cart/components/cart-view";

export const metadata: Metadata = { title: "Your tray" };

export default function CartPage() {
  return (
    <div className="page-shell">
      <section className="page-hero min-h-[48svh]">
        <div>
          <p className="eyebrow">Your tasting tray</p>
          <h1 className="page-title mt-5">A morning, gathered.</h1>
        </div>
      </section>
      <CartView />
    </div>
  );
}
