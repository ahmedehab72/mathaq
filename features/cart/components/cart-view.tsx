"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/features/cart/stores/cart-store";
import { Button } from "@/shared/components/ui/button";
import { formatMoney } from "@/shared/lib/utils";

export function CartView() {
  const { items, changeQuantity, removeItem } = useCart();
  const subtotal = items.reduce((sum, item) => sum + (item.unitPrice ?? item.product.price) * item.quantity, 0);

  if (items.length === 0) {
    return (
      <section className="section-wrap grid min-h-[60svh] place-items-center text-center">
        <div>
          <p className="eyebrow">Your tasting tray</p>
          <h1 className="section-heading mx-auto mt-5">Nothing is waiting yet.</h1>
          <p className="mx-auto mt-6 max-w-md leading-7 text-[var(--mist)]">Choose a coffee by the kind of morning you want. Your tray will remember it when you return.</p>
          <Button asChild size="lg" className="mt-8"><Link href="/shop">Find your coffee</Link></Button>
        </div>
      </section>
    );
  }

  return (
    <section className="section-wrap cart-layout">
      <div>
        {items.map((item) => (
          <article className="cart-item" key={item.id}>
            <div className="cart-thumb" style={{ backgroundImage: `url(${item.product.image})` }} />
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-[-.05em]">{item.product.name}</h2>
              <p className="mt-1 text-sm text-[var(--mist)]">{item.size}, {item.grind}</p>
              <button type="button" className="mt-3 inline-flex min-h-11 items-center gap-2 text-xs text-[var(--mist)] hover:text-[var(--oat)]" onClick={() => removeItem(item.id)}>
                <Trash2 className="size-3.5" /> Remove
              </button>
            </div>
            <div className="grid justify-items-end gap-3">
              <strong>{formatMoney((item.unitPrice ?? item.product.price) * item.quantity)}</strong>
              <div className="quantity-control" aria-label={`Quantity for ${item.product.name}`}>
                <button type="button" onClick={() => changeQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity"><Minus className="mx-auto size-3.5" /></button>
                <span aria-live="polite">{item.quantity}</span>
                <button type="button" onClick={() => changeQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity"><Plus className="mx-auto size-3.5" /></button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <aside className="summary-card">
        <p className="eyebrow">Your morning</p>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-.06em]">Order summary</h2>
        <div className="mt-5">
          <div className="summary-row"><span>Subtotal</span><strong className="text-[var(--oat)]">{formatMoney(subtotal)}</strong></div>
          <div className="summary-row"><span>Shipping</span><span>Calculated next</span></div>
          <div className="flex justify-between gap-4 pt-5 text-lg"><strong>Total</strong><strong>{formatMoney(subtotal)}</strong></div>
        </div>
        <Button asChild size="lg" className="mt-7 w-full"><Link href="/checkout">Continue to checkout</Link></Button>
        <p className="mt-4 text-center text-xs leading-5 text-[var(--mist)]">The checkout is a designed preview. No payment will be taken.</p>
      </aside>
    </section>
  );
}
