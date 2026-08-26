import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPurchase } from "@/components/product-purchase";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product?.name ?? "Coffee" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="product-detail">
      <section className="product-detail-visual" style={{ backgroundImage: `url(${product.image})` }} aria-label={`${product.name} visual`}>
        <div className="flavor-orbit" aria-hidden="true">
          {product.notes.slice(0, 3).map((note) => <span key={note}>{note}</span>)}
        </div>
      </section>
      <section className="product-detail-copy">
        <p className="eyebrow">{product.eyebrow}</p>
        <h1 className="mt-5">{product.name}</h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--mist)]">{product.description}</p>
        <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--line)]">
          {[["Origin", product.origin], ["Process", product.process], ["Roast", product.roast], ["Rest", "7 to 14 days"]].map(([term, value]) => (
            <div key={term} className="bg-[var(--canvas-soft)] p-4">
              <dt className="font-mono text-[.62rem] uppercase tracking-[.12em] text-[var(--clay)]">{term}</dt>
              <dd className="mt-2 text-sm text-[var(--oat)]">{value}</dd>
            </div>
          ))}
        </dl>
        <ProductPurchase product={product} />
      </section>
    </div>
  );
}
