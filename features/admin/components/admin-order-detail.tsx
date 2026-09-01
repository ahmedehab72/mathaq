"use client";

import Link from "next/link";
import { ArrowLeft, Check, MapPin, PackageCheck } from "lucide-react";
import { useState } from "react";
import { useAdminStore, type AdminOrderStatus } from "@/features/admin/stores/admin-store";
import { Button } from "@/shared/components/ui/button";
import { formatMoney } from "@/shared/lib/utils";

const statuses: AdminOrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export function AdminOrderDetail({ id }: { id: string }) {
  const order = useAdminStore((state) => state.orders.find((item) => item.id === id));
  const updateOrderStatus = useAdminStore((state) => state.updateOrderStatus);
  const [status, setStatus] = useState<AdminOrderStatus>(order?.status ?? "Pending");
  const [saved, setSaved] = useState(false);

  if (!order) return <div className="page-shell admin-detail-page"><section className="section-wrap"><Link href="/admin/orders" className="text-link"><ArrowLeft className="size-4" />Orders</Link><div className="admin-empty-state"><span className="eyebrow">Order not found</span><h1>This order is not in the local preview.</h1><p>It may have been created in another browser session.</p></div></section></div>;

  return <div className="page-shell admin-detail-page"><section className="section-wrap"><Link href="/admin/orders" className="text-link"><ArrowLeft className="size-4" />Orders</Link><div className="mt-16 flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow">Order operations / {order.date}</p><h1 className="mt-4 font-display text-7xl font-semibold tracking-[-.08em]">{order.id}</h1></div><span className={`order-status order-status-${order.status.toLowerCase()}`}>{order.status}</span></div><div className="mt-12 grid gap-8 lg:grid-cols-[1fr_.6fr]"><div className="order-panel"><div className="flex items-center justify-between"><p className="eyebrow">Customer order</p><span className="text-xs text-[var(--mist)]">{order.customer.email}</span></div><div className="order-items mt-7">{order.items.map((item, index) => <div className="order-item" key={`${item.name}-${index}`}><div className="order-item-number">0{item.quantity}</div><div className="min-w-0 flex-1"><strong>{item.name}</strong><span>{item.detail}</span></div><strong>{formatMoney(item.price * item.quantity)}</strong></div>)}</div><div className="order-address"><div className="flex items-center gap-3"><MapPin className="size-4 text-[var(--clay)]" /><p className="eyebrow">Ship to</p></div><p className="mt-3">{order.address[0]}<br />{order.address[1]}</p></div><div className="order-totals"><div><span>Subtotal</span><strong>{formatMoney(order.subtotal)}</strong></div><div className="order-total"><span>Total</span><strong>{formatMoney(order.total)}</strong></div></div></div><div className="order-panel"><p className="eyebrow">Change status</p><div className="mt-6 grid gap-2">{statuses.map((item) => <button type="button" className={`admin-status-option ${status === item ? "selected" : ""}`} key={item} onClick={() => { setStatus(item); setSaved(false); }}><span>{item}</span>{status === item && <Check className="size-4 text-[var(--clay)]" />}</button>)}</div><Button className="mt-6 w-full" onClick={() => { updateOrderStatus(order.id, status); setSaved(true); }}>{saved ? <><PackageCheck className="size-4" />Status saved</> : "Save demo status"}</Button></div></div></section></div>;
}
