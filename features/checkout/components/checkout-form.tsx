"use client";

import { CheckCircle2, LockKeyhole } from "lucide-react";
import { FormEvent, useState } from "react";
import { useCart } from "@/features/cart/stores/cart-store";
import { Button } from "@/shared/components/ui/button";
import { formatMoney } from "@/shared/lib/utils";

export function CheckoutForm() {
  const [complete, setComplete] = useState(false);
  const items = useCart((state) => state.items);
  const subtotal = items.reduce((sum, item) => sum + (item.unitPrice ?? item.product.price) * item.quantity, 0);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setComplete(true);
  }

  if (complete) {
    return (
      <section className="section-wrap grid min-h-[65svh] place-items-center text-center">
        <div className="max-w-2xl">
          <CheckCircle2 className="mx-auto size-12 text-[var(--clay)]" />
          <p className="eyebrow mt-6">Design preview complete</p>
          <h1 className="section-heading mx-auto mt-5">Your demo order has a place.</h1>
          <p className="mx-auto mt-6 max-w-xl leading-7 text-[var(--mist)]">No data was sent and no payment was taken. The production backend will create the order, verify payment, reserve stock, and send confirmation from this moment.</p>
          <Button className="mt-8" onClick={() => setComplete(false)}>Return to checkout</Button>
        </div>
      </section>
    );
  }

  return (
    <section className="section-wrap checkout-layout">
      <form className="form-grid" onSubmit={submit}>
        <div className="checkout-steps" aria-label="Checkout progress">
          <span className="checkout-step active">Details</span>
          <span className="checkout-step active">Delivery</span>
          <span className="checkout-step">Payment</span>
        </div>
        <div className="grid gap-4 rounded-3xl border border-[var(--line)] bg-[rgba(18,41,35,.45)] p-5 md:grid-cols-2 md:p-8">
          <h2 className="col-span-full mb-2 font-display text-3xl font-semibold tracking-[-.055em]">Where should the morning arrive?</h2>
          <label className="field-label">First name<input className="field-input" name="firstName" autoComplete="given-name" required /></label>
          <label className="field-label">Last name<input className="field-input" name="lastName" autoComplete="family-name" required /></label>
          <label className="field-label md:col-span-2">Email<input className="field-input" name="email" type="email" autoComplete="email" required /></label>
          <label className="field-label md:col-span-2">Street address<input className="field-input" name="address" autoComplete="street-address" required /></label>
          <label className="field-label">City<input className="field-input" name="city" autoComplete="address-level2" required /></label>
          <label className="field-label">Postal code<input className="field-input" name="postalCode" autoComplete="postal-code" required /></label>
        </div>
        <div className="mt-3 rounded-3xl border border-[var(--line)] p-5 md:p-8">
          <div className="flex items-center justify-between gap-5">
            <div>
              <p className="eyebrow">Payment preview</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-.055em]">Paymob hosted checkout</h2>
            </div>
            <LockKeyhole className="size-6 text-[var(--clay)]" />
          </div>
          <p className="mt-4 max-w-xl leading-7 text-[var(--mist)]">In production, Continue will create the order on the server, then open the secure payment page. Card details will never pass through this interface.</p>
          <Button type="submit" size="lg" className="mt-7 w-full">Place demo order</Button>
        </div>
      </form>
      <aside className="summary-card">
        <p className="eyebrow">In your tray</p>
        <div className="mt-5 grid gap-4">
          {items.length ? items.map((item) => (
            <div key={item.id} className="flex justify-between gap-4 border-b border-[var(--line)] pb-4 text-sm">
              <span>{item.quantity} × {item.product.name}<small className="mt-1 block text-[var(--mist)]">{item.size}, {item.grind}</small></span>
              <strong>{formatMoney((item.unitPrice ?? item.product.price) * item.quantity)}</strong>
            </div>
          )) : <p className="text-sm text-[var(--mist)]">Your tray is empty. The form remains visible for design review.</p>}
        </div>
        <div className="mt-5 flex justify-between text-lg"><strong>Preview total</strong><strong>{formatMoney(subtotal)}</strong></div>
      </aside>
    </section>
  );
}
