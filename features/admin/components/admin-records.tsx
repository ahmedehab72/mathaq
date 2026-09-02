"use client";

import { useState } from "react";
import { useAdminStore } from "@/features/admin/stores/admin-store";
import { AdminSidebar } from "@/features/admin/components/admin-sidebar";
import { Button } from "@/shared/components/ui/button";

type RecordType = "coupons" | "reviews" | "subscriptions" | "gift-cards";

export function AdminRecords({ type }: { type: RecordType }) {
  const store = useAdminStore();
  const [showForm, setShowForm] = useState(false);
  const [value, setValue] = useState("");
  const title = type === "gift-cards" ? "Gift cards" : type[0].toUpperCase() + type.slice(1);
  function add() {
    if (!value.trim()) return;
    if (type === "coupons") store.addCoupon({ id: `coupon-${Date.now()}`, code: value.toUpperCase(), discountType: "percentage", value: 10, expires: "31 Dec 2026", active: true });
    if (type === "gift-cards") store.addGiftCard({ id: `gift-${Date.now()}`, code: value.toUpperCase(), value: 50, sender: "MATHAQ studio", recipient: "New recipient", redeemed: false });
    setValue(""); setShowForm(false);
  }
  return <div className="admin-shell"><AdminSidebar active={title} /><section className="admin-content"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow">Studio / {title}</p><h1 className="mt-3 font-display text-6xl font-semibold tracking-[-.08em]">{title}</h1></div><Button onClick={() => setShowForm((current) => !current)}>{showForm ? "Close" : `Add ${type === "gift-cards" ? "gift card" : type.slice(0, -1)}`}</Button></div>{showForm && <div className="admin-form-card mt-8 flex gap-3"><input className="field-input" value={value} onChange={(event) => setValue(event.target.value)} placeholder={type === "coupons" ? "MATHAQ10" : "Code or name"} /><Button onClick={add}>Save preview</Button></div>}<div className="admin-data-list mt-8">{type === "coupons" && (store.coupons ?? []).map((item) => <div className="admin-data-row" key={item.id}><div><strong>{item.code}</strong><span>{item.discountType} / {item.value} / expires {item.expires}</span></div><b>{item.active ? "Active" : "Inactive"}</b><button className="admin-row-action" onClick={() => store.updateCoupon(item.id, { value: item.value === 10 ? 15 : 10 })}>Edit value</button><button className="admin-row-action" onClick={() => store.toggleCoupon(item.id)}>Toggle</button><button className="admin-row-action danger" onClick={() => store.deleteCoupon(item.id)}>Delete</button></div>)}{type === "reviews" && (store.reviews ?? []).map((item) => <div className="admin-data-row" key={item.id}><div><strong>{item.customer}</strong><span>{item.productSlug} / {item.rating} stars / {item.copy}</span></div><b>{item.approved ? "Approved" : "Hidden"}</b><button className="admin-row-action" onClick={() => store.toggleReview(item.id)}>{item.approved ? "Hide" : "Approve"}</button></div>)}{type === "subscriptions" && (store.subscriptions ?? []).map((item) => <div className="admin-data-row" key={item.id}><div><strong>{item.plan}</strong><span>{item.customer} / {item.email} / next renewal {item.nextRenewal}</span></div><b>{item.status}</b><button className="admin-row-action" onClick={() => store.updateSubscriptionStatus(item.id, item.status === "Active" ? "Paused" : "Active")}>Toggle status</button></div>)}{type === "gift-cards" && (store.giftCards ?? []).map((item) => <div className="admin-data-row" key={item.id}><div><strong>{item.code}</strong><span>${item.value} / {item.sender} to {item.recipient}</span></div><b>{item.redeemed ? "Redeemed" : "Unredeemed"}</b><button className="admin-row-action danger" onClick={() => store.deleteGiftCard(item.id)}>Delete</button></div>)}</div></section></div>;
}
