"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/features/cart/stores/cart-store";
import type { Product } from "@/features/shop/services/products";
import { Button } from "@/shared/components/ui/button";
import { formatMoney } from "@/shared/lib/utils";

const grinds = ["Whole bean", "Filter", "Espresso", "French press"];
const sizes = [
  ["250 g", 1],
  ["500 g", 1.78],
  ["1 kg", 3.25],
] as const;

export function ProductPurchase({ product }: { product: Product }) {
  const [grind, setGrind] = useState(grinds[0]);
  const [size, setSize] = useState<string>(sizes[0][0]);
  const [added, setAdded] = useState(false);
  const addItem = useCart((state) => state.addItem);
  const multiplier = sizes.find(([label]) => label === size)?.[1] ?? 1;

  function addToTray() {
    addItem({ product, grind, size, unitPrice: product.price * multiplier, quantity: 1 });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div className="mt-10 grid gap-7">
      <fieldset>
        <legend className="eyebrow mb-3">01 / Choose a size</legend>
        <div className="option-grid">
          {sizes.map(([label]) => (
            <button key={label} type="button" className={`option-button ${size === label ? "active" : ""}`} onClick={() => setSize(label)} aria-pressed={size === label}>{label}</button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="eyebrow mb-3">02 / Choose your grind</legend>
        <div className="option-grid">
          {grinds.map((label) => (
            <button key={label} type="button" className={`option-button ${grind === label ? "active" : ""}`} onClick={() => setGrind(label)} aria-pressed={grind === label}>{label}</button>
          ))}
        </div>
      </fieldset>
      <Button size="lg" onClick={addToTray} className="w-full">
        {added ? <Check className="size-4" /> : <ShoppingBag className="size-4" />}
        {added ? "Added to your tray" : `Add to tray, ${formatMoney(product.price * multiplier)}`}
      </Button>
      <p className="text-center text-xs leading-5 text-[var(--mist)]">Demo cart only. Payment stays disconnected during the design phase.</p>
    </div>
  );
}
