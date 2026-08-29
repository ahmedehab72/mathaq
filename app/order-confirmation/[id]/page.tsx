import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { OrderSummary } from "@/features/orders/components/order-summary";
import { OrderTimeline } from "@/features/orders/components/order-timeline";
import { previewOrder } from "@/features/orders/services/order-preview";
import { Button } from "@/shared/components/ui/button";

export const metadata: Metadata = { title: "Order confirmed" };

export default async function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div className="page-shell order-confirmation-page"><section className="order-confirmation-hero"><div><div className="order-confirmation-badge"><CheckCircle2 className="size-5" /><span>Confirmed</span></div><p className="eyebrow mt-7">Order {id}</p><h1>Your morning is on its way.</h1><p>We have the order, the roast, and the address. Here is everything in one place.</p></div></section><section className="section-wrap order-confirmation-content"><div className="order-confirmation-grid"><div><div className="order-section-heading"><p className="eyebrow">The journey</p><h2>From our table to yours.</h2></div><OrderTimeline /></div><aside className="order-panel"><div className="flex items-start justify-between gap-4"><div><p className="eyebrow">Order summary</p><h2 className="mt-3 font-display text-3xl font-semibold tracking-[-.06em]">{previewOrder.id}</h2></div><span className="order-status">{previewOrder.status}</span></div><div className="mt-8"><OrderSummary /></div><Button asChild variant="outline" className="mt-8 w-full"><Link href="/shop">Keep exploring <ArrowRight className="size-4" /></Link></Button></aside></div></section></div>;
}
