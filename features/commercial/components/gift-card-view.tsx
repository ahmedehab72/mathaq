"use client";

import { Gift, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";

export function GiftCardView() {
  const [amount, setAmount] = useState(50); const [sent, setSent] = useState(false);
  return <div className="commercial-page gift-page"><section className="gift-hero"><div><p className="eyebrow">A thoughtful card</p><h1>Give them a morning.</h1><p>A little room to choose what their cup becomes.</p></div><div className="gift-card-art"><Gift className="size-8" /><span>MATHAQ / FOR YOU</span><strong>${amount}</strong></div></section><section className="section-wrap gift-content"><div className="gift-form"><p className="eyebrow">Choose a value</p><div className="flex flex-wrap gap-3">{[25, 50, 75, 100].map((value) => <button type="button" key={value} onClick={() => setAmount(value)} className={`option-button ${amount === value ? "active" : ""}`}>${value}</button>)}</div><div className="grid gap-5 md:grid-cols-2"><label className="field-label">Their name<input className="field-input" placeholder="Someone special" /></label><label className="field-label">Their email<input className="field-input" type="email" placeholder="you@example.com" /></label></div><Button size="lg" onClick={() => setSent(true)}>{sent ? "Preview gift ready" : "Prepare the gift"}<Send className="size-4" /></Button></div></section></div>;
}
