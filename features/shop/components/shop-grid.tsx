"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ProductCard } from "@/features/shop/components/product-card";
import { getProducts } from "@/features/shop/services/products";
import { useAdminStore } from "@/features/admin/stores/admin-store";

const filters = ["All", "Light", "Medium", "Medium dark"];

export function ShopGrid() {
  const [filter, setFilter] = useState("All");
  const { data, isPending } = useQuery({ queryKey: ["products"], queryFn: getProducts });
  const managedProducts = useAdminStore((state) => state.products);
  const source = useMemo(
    () => managedProducts.length ? managedProducts.filter((product) => product.published) : data ?? [],
    [data, managedProducts],
  );
  const visible = useMemo(
    () => source.filter((product) => filter === "All" || product.roast === filter),
    [filter, source],
  );

  return (
    <section className="section-wrap pt-8">
      <div className="shop-controls">
        <div className="filter-row" aria-label="Filter coffees by roast">
          {filters.map((item) => (
            <button key={item} type="button" onClick={() => setFilter(item)} className={`filter-chip ${filter === item ? "active" : ""}`} aria-pressed={filter === item}>
              {item}
            </button>
          ))}
        </div>
        <p className="self-center font-mono text-xs text-[var(--mist)]">{visible.length || 4} coffees on the table</p>
      </div>
      <div className="product-grid">
        {isPending && !managedProducts.length
          ? Array.from({ length: 4 }, (_, index) => <div key={index} className="skeleton" aria-hidden="true" />)
          : visible.map((product) => <ProductCard key={product.slug} product={product} />)}
      </div>
    </section>
  );
}
