import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = { title: "Checkout preview" };

export default function CheckoutPage() {
  return (
    <div className="page-shell">
      <section className="page-hero min-h-[52svh]">
        <div>
          <p className="eyebrow">Checkout preview</p>
          <h1 className="page-title mt-5">Send the morning home.</h1>
        </div>
      </section>
      <CheckoutForm />
    </div>
  );
}
