"use client";

import Link from "next/link";
import { ArrowRight, Box, FileText, Package, Plus, Search, Users } from "lucide-react";
import { products } from "@/features/shop/services/products";
import { useAdminStore } from "@/features/admin/stores/admin-store";
import { formatMoney } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";

const icons = { products: Box, orders: Package, customers: Users, inventory: Box, content: FileText };

export function AdminSection({ type }: { type: keyof typeof icons }) {
  const Icon = icons[type];
  const orders = useAdminStore((state) => state.orders);
  const title = type[0].toUpperCase() + type.slice(1);

  return <div className="admin-shell">
    <aside className="admin-sidebar"><p className="eyebrow mb-5">MATHAQ studio</p><nav className="admin-nav" aria-label="Admin navigation">
      <Link href="/admin">Overview</Link>
      <Link className={type === "products" ? "active" : ""} href="/admin/products"><Box className="size-4" />Products</Link>
      <Link className={type === "orders" ? "active" : ""} href="/admin/orders"><Package className="size-4" />Orders <span>{orders.length}</span></Link>
      <Link className={type === "customers" ? "active" : ""} href="/admin/customers"><Users className="size-4" />Customers</Link>
      <Link className={type === "inventory" ? "active" : ""} href="/admin/inventory"><Box className="size-4" />Inventory</Link>
      <Link className={type === "content" ? "active" : ""} href="/admin/content"><FileText className="size-4" />Content</Link>
    </nav></aside>
    <section className="admin-content"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">Studio / {type}</p><h1 className="mt-3 font-display text-6xl font-semibold tracking-[-.08em]"><Icon className="mr-3 inline size-10 text-[var(--clay)]" />{title}</h1></div><Button asChild><Link href={type === "products" ? "/admin/products/new" : "/admin"}><Plus className="size-4" />{type === "products" ? "Add product" : "Back to overview"}</Link></Button></div>
      <div className="admin-toolbar"><div className="flex items-center gap-3"><Search className="size-4 text-[var(--clay)]" /><input placeholder={`Search ${type}...`} /></div><span>Design preview / local demo</span></div>
      {type === "products" && <div className="admin-data-list">{products.map((product) => <Link href={`/admin/products/${product.slug}/edit`} className="admin-data-row" key={product.slug}><div><strong>{product.name}</strong><span>{product.origin} / {product.roast}</span></div><b>{formatMoney(product.price)}</b><ArrowRight className="size-4" /></Link>)}</div>}
      {type === "orders" && <div className="admin-data-list">{orders.map((order) => <Link href={`/admin/orders/${order.id}`} className="admin-data-row" key={order.id}><div><strong>{order.id}</strong><span>{order.customer.name} / {order.items.length} items / {order.date}</span></div><b>{formatMoney(order.total)}</b><span className={`order-status order-status-${order.status.toLowerCase()}`}>{order.status}</span><ArrowRight className="size-4" /></Link>)}</div>}
      {type === "customers" && <div className="admin-data-list"><Link href="/admin/customers/guest" className="admin-data-row"><div><strong>MATHAQ guest</strong><span>guest@example.com / {orders.length} order{orders.length === 1 ? "" : "s"}</span></div><b>Customer</b><ArrowRight className="size-4" /></Link></div>}
      {type === "inventory" && <div className="admin-data-list">{products.map((product, index) => <div className="admin-data-row" key={product.slug}><div><strong>{product.name}</strong><span>250 g / whole bean</span></div><b className={index === 2 ? "text-[var(--clay)]" : ""}>{index === 2 ? "Low stock" : `${18 - index * 3} units`}</b><span className="text-xs text-[var(--mist)]">Variant</span></div>)}</div>}
      {type === "content" && <div className="admin-data-list">{["Why coffee needs rest", "Reading a roast date", "What tasting notes mean"].map((post, index) => <div className="admin-data-row" key={post}><div><strong>{post}</strong><span>Journal post / {index === 0 ? "Published" : "Draft"}</span></div><b>Article</b><ArrowRight className="size-4" /></div>)}</div>}
    </section>
  </div>;
}
