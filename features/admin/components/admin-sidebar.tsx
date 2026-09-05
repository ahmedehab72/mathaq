"use client";

import Link from "next/link";
import { Box, FileText, Gift, LayoutDashboard, Settings, ShoppingBag, Star, Tag, Users, Repeat2 } from "lucide-react";

const links = [["Overview", "/admin", LayoutDashboard], ["Products", "/admin/products", Box], ["Orders", "/admin/orders", ShoppingBag], ["Customers", "/admin/customers", Users], ["Inventory", "/admin/inventory", Box], ["Content", "/admin/content", FileText], ["Coupons", "/admin/coupons", Tag], ["Reviews", "/admin/reviews", Star], ["Subscriptions", "/admin/subscriptions", Repeat2], ["Gift cards", "/admin/gift-cards", Gift], ["Settings", "/admin/settings", Settings]] as const;

export function AdminSidebar({ active }: { active?: string }) {
  return <aside className="admin-sidebar"><p className="eyebrow mb-5">MATHAQ studio</p><nav className="admin-nav" aria-label="Admin navigation">{links.map(([label, href, Icon]) => <Link key={label} href={href} className={active === label ? "active" : ""}><Icon className="size-4" />{label}</Link>)}</nav></aside>;
}
