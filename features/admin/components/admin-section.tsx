"use client";

import Link from "next/link";
import {
  ArrowRight,
  Box,
  FileText,
  Package,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { useState } from "react";
import { products } from "@/features/shop/services/products";
import {
  getProductVariants,
  useAdminStore,
} from "@/features/admin/stores/admin-store";
import { formatMoney } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { AdminProductModal } from "@/features/admin/components/admin-product-modal";
import { AdminSidebar } from "@/features/admin/components/admin-sidebar";

const icons = {
  products: Box,
  orders: Package,
  customers: Users,
  inventory: Box,
  content: FileText,
};

export function AdminSection({ type }: { type: keyof typeof icons }) {
  const Icon = icons[type];
  const orders = useAdminStore((state) => state.orders);
  const catalog = useAdminStore((state) => state.products);
  const deleteProduct = useAdminStore((state) => state.deleteProduct);
  const toggleProduct = useAdminStore((state) => state.toggleProduct);
  const journalPublished = useAdminStore(
    (state) => state.journalPublished ?? {},
  );
  const toggleJournalPost = useAdminStore((state) => state.toggleJournalPost);
  const title = type[0].toUpperCase() + type.slice(1);
  const [showProductModal, setShowProductModal] = useState(false);

  return (
    <div className="admin-shell">
      <AdminSidebar active={title} />{/* <aside className="admin-sidebar">
        <p className="eyebrow mb-5">MATHAQ studio</p>
        <nav className="admin-nav" aria-label="Admin navigation">
          <Link href="/admin">Overview</Link>
          <Link
            className={type === "products" ? "active" : ""}
            href="/admin/products"
          >
            <Box className="size-4" />
            Products
          </Link>
          <Link
            className={type === "orders" ? "active" : ""}
            href="/admin/orders"
          >
            <Package className="size-4" />
            Orders <span>{orders.length}</span>
          </Link>
          <Link
            className={type === "customers" ? "active" : ""}
            href="/admin/customers"
          >
            <Users className="size-4" />
            Customers
          </Link>
          <Link
            className={type === "inventory" ? "active" : ""}
            href="/admin/inventory"
          >
            <Box className="size-4" />
            Inventory
          </Link>
          <Link
            className={type === "content" ? "active" : ""}
            href="/admin/content"
          >
            <FileText className="size-4" />
            Content
          </Link>
        </nav>
      </aside>*/}
      <section className="admin-content">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">Studio / {type}</p>
            <h1 className="mt-3 font-display text-6xl font-semibold tracking-[-.08em]">
              <Icon className="mr-3 inline size-10 text-[var(--clay)]" />
              {title}
            </h1>
          </div>
          {type === "products" ? (
            <Button onClick={() => setShowProductModal(true)}>
              <Plus className="size-4" />
              Add product
            </Button>
          ) : (
            <Button asChild>
              <Link href="/admin">
                <Plus className="size-4" />
                Back to overview
              </Link>
            </Button>
          )}
        </div>
        <div className="admin-toolbar">
          <div className="flex items-center gap-3">
            <Search className="size-4 text-[var(--clay)]" />
            <input placeholder={`Search ${type}...`} />
          </div>
          <span>Design preview / local demo</span>
        </div>
        {type === "products" && (
          <div className="admin-data-list">
            {catalog.map((product) => (
              <div className="admin-data-row" key={product.slug}>
                <Link
                  className="admin-data-row-main"
                  href={`/admin/products/${product.slug}/edit`}
                >
                  <div>
                    <strong>{product.name}</strong>
                    <span>
                      {product.origin} / {product.roast}
                    </span>
                  </div>
                  <b>{formatMoney(product.price)}</b>
                </Link>
                <span
                  className={`admin-product-state ${product.published ? "published" : "hidden"}`}
                >
                  {product.published ? "Published" : "Hidden"}
                </span>
                <button
                  type="button"
                  className="admin-row-action"
                  onClick={() => toggleProduct(product.slug)}
                >
                  {product.published ? "Hide" : "Show"}
                </button>
                <button
                  type="button"
                  className="admin-row-action danger"
                  onClick={() => {
                    if (window.confirm(`Delete ${product.name}?`))
                      deleteProduct(product.slug);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        {type === "orders" && (
          <div className="admin-data-list">
            {orders.map((order) => (
              <Link
                href={`/admin/orders/${order.id}`}
                className="admin-data-row"
                key={order.id}
              >
                <div>
                  <strong>{order.id}</strong>
                  <span>
                    {order.customer.name} / {order.items.length} items /{" "}
                    {order.date}
                  </span>
                </div>
                <b>{formatMoney(order.total)}</b>
                <span
                  className={`order-status order-status-${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>
                <ArrowRight className="size-4" />
              </Link>
            ))}
          </div>
        )}
        {type === "customers" && (
          <div className="admin-data-list">
            <Link href="/admin/customers/guest" className="admin-data-row">
              <div>
                <strong>MATHAQ guest</strong>
                <span>
                  guest@example.com / {orders.length} order
                  {orders.length === 1 ? "" : "s"}
                </span>
              </div>
              <b>Customer</b>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        )}
        {type === "inventory" && (
          <div className="admin-data-list">
            {catalog.flatMap((product) =>
              getProductVariants(product).map((variant) => (
                <div
                  className="admin-data-row"
                  key={`${product.slug}-${variant.size}`}
                >
                  <div>
                    <strong>{product.name}</strong>
                    <span>{variant.size} / whole bean</span>
                  </div>
                  <b className={variant.stock <= 4 ? "text-[var(--clay)]" : ""}>
                    {variant.stock === 0
                      ? "Out of stock"
                      : variant.stock <= 4
                        ? "Low stock"
                        : `${variant.stock} units`}
                  </b>
                  <span className="text-xs text-[var(--mist)]">Variant</span>
                </div>
              )),
            )}
          </div>
        )}
        {type === "content" && (
          <div className="admin-data-list">
            {[
              { slug: "let-coffee-rest", title: "Why coffee needs rest" },
              { slug: "reading-a-roast-date", title: "Reading a roast date" },
              {
                slug: "what-tasting-notes-mean",
                title: "What tasting notes mean",
              },
            ].map((post) => (
              <div className="admin-data-row" key={post.slug}>
                <div>
                  <strong>{post.title}</strong>
                  <span>
                    Journal post /{" "}
                    {journalPublished[post.slug] ? "Published" : "Draft"}
                  </span>
                </div>
                <b>Article</b>
                <button
                  className="admin-row-action"
                  onClick={() => toggleJournalPost(post.slug)}
                >
                  {journalPublished[post.slug] ? "Unpublish" : "Publish"}
                </button>
                <ArrowRight className="size-4" />
              </div>
            ))}
          </div>
        )}
        {type === "products" && showProductModal && (
          <AdminProductModal onClose={() => setShowProductModal(false)} />
        )}
      </section>
    </div>
  );
}
