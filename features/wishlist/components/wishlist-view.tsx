"use client";

import Link from "next/link";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { useWishlist } from "@/features/wishlist/stores/wishlist-store";
import { products } from "@/features/shop/services/products";
import { ProductCard } from "@/features/shop/components/product-card";
import { Button } from "@/shared/components/ui/button";

export function WishlistView() {
  const slugs = useWishlist((state) => state.slugs);
  const clear = useWishlist((state) => state.clear);
  const saved = products.filter((product) => slugs.includes(product.slug));

  return <main className="wishlist-page">
    <section className="wishlist-hero"><div><p className="eyebrow">Your saved table</p><h1>Keep the good ones close.</h1><p>Small reminders of coffees worth returning to.</p></div><div className="wishlist-counter"><Heart className="size-5" /><strong>{saved.length.toString().padStart(2, "0")}</strong><span>SAVED</span></div></section>
    <section className="section-wrap wishlist-content" aria-label="Saved coffees">
      {saved.length ? <><div className="mb-8 flex flex-wrap items-center justify-between gap-4"><p className="text-sm text-[var(--mist)]">Your quiet shortlist</p><button type="button" onClick={clear} className="text-xs uppercase tracking-[.14em] text-[var(--clay)] transition-colors hover:text-[var(--oat)]">Clear all</button></div><div className="product-grid">{saved.map((product) => <ProductCard product={product} key={product.slug} />)}</div></> : <div className="wishlist-empty"><div className="wishlist-empty-orbit"><Sparkles className="size-5" /></div><p className="eyebrow">Nothing saved yet</p><h2>Leave room for a favourite.</h2><p>When a coffee feels like yours, keep it here.</p><Button asChild size="lg" className="mt-4"><Link href="/shop">Explore the coffees <ArrowRight className="size-4" /></Link></Button></div>}
    </section>
  </main>;
}
