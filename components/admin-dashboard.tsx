"use client";

import { BarChart3, Box, LayoutDashboard, PackagePlus, ShoppingBag, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import { formatMoney } from "@/lib/utils";

const nav = [
  ["Overview", LayoutDashboard], ["Products", Box], ["Orders", ShoppingBag], ["Customers", Users], ["Analytics", BarChart3],
] as const;

export function AdminDashboard() {
  const [active, setActive] = useState("Overview");
  const [notice, setNotice] = useState("");

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <p className="eyebrow mb-5">MATHAQ studio</p>
        <nav className="admin-nav" aria-label="Admin preview navigation">
          {nav.map(([label, Icon]) => <button key={label} type="button" className={active === label ? "active" : ""} onClick={() => setActive(label)}><span className="inline-flex items-center gap-2"><Icon className="size-4" />{label}</span></button>)}
        </nav>
      </aside>
      <section className="admin-content">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><p className="eyebrow">Design preview</p><h1 className="mt-3 font-display text-5xl font-semibold tracking-[-.07em]">{active}</h1></div>
          <Button onClick={() => setNotice("Product editor design opened. Saving waits for the backend phase.")}><PackagePlus className="size-4" />Add product</Button>
        </div>
        {notice && <p role="status" className="mt-5 rounded-xl border border-[rgba(197,107,72,.4)] bg-[rgba(197,107,72,.08)] p-4 text-sm text-[var(--mist)]">{notice}</p>}
        <div className="metric-grid mt-10">
          {[["Demo revenue", "$4,820"], ["Orders", "128"], ["Low stock", "2 lots"]].map(([label, value]) => <article className="metric-card" key={label}><span className="eyebrow">{label}</span><strong>{value}</strong></article>)}
        </div>
        <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[rgba(18,41,35,.45)] p-4 md:p-7">
          <div className="mb-5 flex items-center justify-between"><h2 className="font-display text-3xl font-semibold tracking-[-.055em]">Product table</h2><span className="font-mono text-xs text-[var(--mist)]">Demo data</span></div>
          <div className="table-scroll">
            <table className="data-table">
              <thead><tr><th>Product</th><th>Origin</th><th>Roast</th><th>Price</th><th>Status</th></tr></thead>
              <tbody>{products.map((product) => <tr key={product.slug}><td><strong>{product.name}</strong></td><td className="text-[var(--mist)]">{product.origin}</td><td>{product.roast}</td><td>{formatMoney(product.price)}</td><td><span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">Published</span></td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
