"use client";

import { Search, Truck } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { OrderTimeline } from "@/features/orders/components/order-timeline";
import { previewOrder } from "@/features/orders/services/order-preview";

export function TrackOrderView() {
  const [tracked, setTracked] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setTracked(true); }
  return <div className="track-order-page"><section className="track-order-hero"><div><p className="eyebrow">Follow the roast</p><h1>Know where it is.</h1><p>Enter your order details and we will show you the next step.</p></div><div className="track-order-icon"><Truck className="size-7" /></div></section><section className="section-wrap track-order-content"><form className="track-order-form" onSubmit={handleSubmit}><label className="field-label">Order number<input className="field-input" placeholder="MTH-1042" required /></label><label className="field-label">Email address<input className="field-input" type="email" placeholder="you@example.com" required /></label><Button type="submit" size="lg"><Search className="size-4" />Track order</Button></form>{tracked && <div className="track-order-result"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow">Order found</p><h2>{previewOrder.id}</h2></div><span className="order-status">{previewOrder.status}</span></div><OrderTimeline /></div>}</section></div>;
}
