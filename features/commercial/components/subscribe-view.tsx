"use client";

import { Check, Coffee, Pause, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useAdminStore } from "@/features/admin/stores/admin-store";

const plans = [{ name: "One quiet bag", price: "$18", copy: "One 250 g bag every month.", features: ["Your choice of coffee", "Free standard shipping", "Pause anytime"] }, { name: "The morning shelf", price: "$48", copy: "Three 250 g bags every month.", features: ["A rotating tasting set", "Free shipping", "Brew notes included"] }];

export function SubscribeView() {
  const [selected, setSelected] = useState(1); const [joined, setJoined] = useState(false); const addSubscription = useAdminStore((state) => state.addSubscription);
  return <div className="commercial-page"><section className="commercial-hero"><div><p className="eyebrow">A monthly ritual</p><h1>Keep the morning coming.</h1><p>Fresh coffee, chosen slowly, arriving on the rhythm that suits you.</p></div><div className="commercial-orbit"><Coffee className="size-7" /><span>EVERY 30 DAYS</span></div></section><section className="section-wrap commercial-content"><div className="grid gap-5 md:grid-cols-2">{plans.map((plan, index) => <button type="button" key={plan.name} onClick={() => setSelected(index)} className={`subscription-plan text-left ${selected === index ? "selected" : ""}`}><div className="flex items-start justify-between gap-4"><span className="eyebrow">0{index + 1}</span><span className="subscription-check">{selected === index && <Check className="size-4" />}</span></div><h2>{plan.name}</h2><p>{plan.copy}</p><strong>{plan.price}<small> / month</small></strong><ul>{plan.features.map((feature) => <li key={feature}><Check className="size-3.5" />{feature}</li>)}</ul></button>)}</div><div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-[var(--line)] pt-6"><span className="flex items-center gap-2 text-sm text-[var(--mist)]"><Pause className="size-4 text-[var(--clay)]" />Pause or skip whenever life changes.</span><Button size="lg" onClick={() => { addSubscription({ id: `sub-${Date.now()}`, plan: plans[selected].name, customer: "MATHAQ guest", email: "guest@example.com", nextRenewal: "01 Oct 2026", status: "Active" }); setJoined(true); }}>{joined ? "Preview subscription selected" : "Choose this rhythm"}<Sparkles className="size-4" /></Button></div></section></div>;
}
