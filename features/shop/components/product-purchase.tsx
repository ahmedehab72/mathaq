"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/features/cart/stores/cart-store";
import { getProductVariants, useAdminStore } from "@/features/admin/stores/admin-store";
import type { Product } from "@/features/shop/services/products";
import { Button } from "@/shared/components/ui/button";
import { formatMoney } from "@/shared/lib/utils";

const grinds = ["Whole bean", "Filter", "Espresso", "French press"];
export function ProductPurchase({ product }: { product: Product }) {
  const variants = getProductVariants(useAdminStore((state) => state.products.find((item) => item.slug === product.slug) ?? product));
  const availableVariants = variants.filter((variant) => variant.stock > 0);
  const [grind, setGrind] = useState(grinds[0]);
  const [size, setSize] = useState<string>(availableVariants[0]?.size ?? variants[0].size);
  const [added, setAdded] = useState(false);
  const addItem = useCart((state) => state.addItem);
  const selectedVariant = variants.find((variant) => variant.size === size) ?? variants[0];
  const multiplier = selectedVariant.priceMultiplier;

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
          {variants.map((variant) => (
            <button key={variant.size} type="button" disabled={variant.stock === 0} className={`option-button ${size === variant.size ? "active" : ""}`} onClick={() => setSize(variant.size)} aria-pressed={size === variant.size}>{variant.size}{variant.stock === 0 && <small className="ml-2">Out of stock</small>}</button>
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
      <Button size="lg" onClick={addToTray} className="w-full" disabled={selectedVariant.stock === 0}>
        {added ? <Check className="size-4" /> : <ShoppingBag className="size-4" />}
        {added ? "Added to your tray" : `Add to tray, ${formatMoney(product.price * multiplier)}`}
      </Button>
      <p className="text-center text-xs leading-5 text-[var(--mist)]">Demo cart only. Payment stays disconnected during the design phase.</p>
    </div>
  );
}
