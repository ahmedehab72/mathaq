"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/features/shop/components/product-card";
import { products } from "@/features/shop/services/products";

const filters = ["All", "Light", "Medium", "Medium dark"];

export function SearchView() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesQuery = !normalized || [product.name, product.origin, product.description, ...product.notes].join(" ").toLowerCase().includes(normalized);
      return matchesQuery && (filter === "All" || product.roast === filter);
    });
  }, [filter, query]);

  return <div className="search-page">
    <section className="search-intro">
      <div className="search-intro-copy"><p className="eyebrow">Find your next cup</p><h1>Search slowly.</h1><p>Look for a feeling, an origin, or a note you already know.</p></div>
      <div className="search-mark" aria-hidden="true"><Search className="size-8" /><span>TRACE / TASTE / CHOOSE</span></div>
    </section>
    <section className="section-wrap search-content" aria-label="Search results">
      <div className="search-bar-wrap"><Search className="size-5 text-[var(--clay)]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try chocolate, Ethiopia, bright..." aria-label="Search coffees" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X className="size-4" /></button>}</div>
      <div className="search-controls"><div className="flex items-center gap-2 text-xs uppercase tracking-[.14em] text-[var(--mist)]"><SlidersHorizontal className="size-4 text-[var(--clay)]" />Filter roast</div><div className="filter-row">{filters.map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={`filter-chip ${filter === item ? "active" : ""}`} aria-pressed={filter === item}>{item}</button>)}</div><p className="search-count">{visible.length} {visible.length === 1 ? "coffee" : "coffees"}</p></div>
      {visible.length ? <div className="product-grid search-results">{visible.map((product) => <div className="search-result-card" key={product.slug}><ProductCard product={product} /></div>)}</div> : <div className="search-empty"><span className="search-empty-number">00</span><h2>Nothing on the table yet.</h2><p>Try a tasting note like chocolate, peach, or honey.</p><button type="button" className="text-link" onClick={() => { setQuery(""); setFilter("All"); }}>Reset the search <X className="size-4" /></button></div>}
    </section>
  </div>;
}
