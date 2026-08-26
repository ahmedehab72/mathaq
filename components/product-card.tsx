import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatMoney } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="product-card group" aria-label={`View ${product.name}`}>
      <div className="product-card-image" style={{ backgroundImage: `url(${product.image})` }} />
      <div className="product-card-scrim" />
      <div className="absolute left-5 top-5 z-[2] rounded-full border border-[var(--line-strong)] bg-[rgba(7,23,19,.52)] px-3 py-2 font-mono text-[.62rem] uppercase tracking-[.12em] backdrop-blur-md">
        {product.roast} roast
      </div>
      <div className="product-card-content">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="eyebrow">{product.eyebrow}</p>
            <h2 className="mt-3">{product.name}</h2>
          </div>
          <span className="grid size-12 shrink-0 place-items-center rounded-full border border-[var(--line-strong)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-[var(--clay)] group-hover:text-[var(--canvas)]">
            <ArrowUpRight className="size-5" />
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4 text-sm text-[var(--mist)]">
          <span>{product.origin}</span><strong className="text-[var(--oat)]">{formatMoney(product.price)}</strong>
        </div>
        <div className="note-list">{product.notes.map((note) => <span className="note-pill" key={note}>{note}</span>)}</div>
      </div>
    </Link>
  );
}
