"use client";

import { Check, Tag } from "lucide-react";
import { useState } from "react";
import { useAdminStore } from "@/features/admin/stores/admin-store";

export function CouponPreview() {
  const coupons = useAdminStore((state) => state.coupons ?? []);
  const giftCards = useAdminStore((state) => state.giftCards ?? []);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [giftCode, setGiftCode] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  function apply() {
    const coupon = coupons.find((item) => item.active && item.code.toLowerCase() === code.trim().toLowerCase());
    setMessage(coupon ? `${coupon.code} applied (${coupon.discountType === "percentage" ? `${coupon.value}%` : `$${coupon.value}`} off preview).` : "This coupon is not active or does not exist.");
  }
  return <div className="mt-6 border-t border-[var(--line)] pt-5"><p className="eyebrow">Have a code?</p><div className="mt-3 flex gap-2"><label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-[var(--line-strong)] px-3"><Tag className="size-4 shrink-0 text-[var(--clay)]" /><input className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[var(--oat)] outline-none" value={code} onChange={(event) => { setCode(event.target.value); setMessage(""); }} placeholder="MATHAQ10" /></label><button type="button" className="rounded-xl bg-[var(--oat)] px-4 text-xs font-semibold text-[var(--canvas)]" onClick={apply}>{message.startsWith("This") ? "Retry" : message ? <Check className="size-4" /> : "Apply"}</button></div>{message && <p className={`mt-2 text-xs ${message.startsWith("This") ? "text-red-300" : "text-[var(--clay)]"}`}>{message}</p>}<p className="eyebrow mt-5">Gift card</p><div className="mt-3 flex gap-2"><input className="field-input min-w-0 flex-1" value={giftCode} onChange={(event) => { setGiftCode(event.target.value); setGiftMessage(""); }} placeholder="MTH-GIFT-50" /><button type="button" className="rounded-xl bg-[var(--oat)] px-4 text-xs font-semibold text-[var(--canvas)]" onClick={() => { const card = giftCards.find((item) => item.code.toLowerCase() === giftCode.trim().toLowerCase() && !item.redeemed); setGiftMessage(card ? `Gift card accepted: $${card.value} preview balance.` : "Gift card not found or already redeemed."); }}>Apply</button></div>{giftMessage && <p className="mt-2 text-xs text-[var(--clay)]">{giftMessage}</p>}</div>;
}
