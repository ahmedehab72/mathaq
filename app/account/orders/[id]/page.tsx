import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { OrderSummary } from "@/features/orders/components/order-summary";
import { OrderTimeline } from "@/features/orders/components/order-timeline";
import { previewOrder } from "@/features/orders/services/order-preview";
import { Button } from "@/shared/components/ui/button";

export const metadata: Metadata = { title: "Order details" };

export default async function AccountOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div className="page-shell account-order-page"><section className="account-order-header"><Link href="/account" className="text-link"><ArrowLeft className="size-4" />Back to account</Link><div className="mt-16 flex flex-wrap items-end justify-between gap-7"><div><p className="eyebrow">Order history / {id}</p><h1>Morning, remembered.</h1><p className="mt-5 text-[var(--mist)]">Placed {previewOrder.date}, delivered to Cairo.</p></div><span className="order-status">{previewOrder.status}</span></div></section><section className="section-wrap account-order-content"><div className="grid gap-14 lg:grid-cols-[1fr_.72fr]"><div><p className="eyebrow">Delivery history</p><h2 className="mt-5 font-display text-5xl font-semibold tracking-[-.07em]">A complete cup.</h2><OrderTimeline /></div><aside className="order-panel"><p className="eyebrow">What arrived</p><div className="mt-7"><OrderSummary compact /></div><Button variant="outline" className="mt-8 w-full"><RotateCcw className="size-4" />Reorder this morning</Button></aside></div></section></div>;
}
