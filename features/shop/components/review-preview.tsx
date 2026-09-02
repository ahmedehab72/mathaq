"use client";

import { Star } from "lucide-react";
import { FormEvent, useState } from "react";
import { useAdminStore } from "@/features/admin/stores/admin-store";
import { Button } from "@/shared/components/ui/button";

export function ReviewPreview({ productSlug = "morning-no-01" }: { productSlug?: string }) {
  const [sent, setSent] = useState(false);
  const [copy, setCopy] = useState("");
  const addReview = useAdminStore((state) => state.addReview);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); addReview({ id: `review-${Date.now()}`, productSlug, customer: "MATHAQ guest", rating: 5, copy: copy.trim() || "A beautiful cup.", approved: false }); setSent(true); }
  return <section className="mt-16 border-t border-[var(--line)] pt-10"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Cup notes from people</p><h2 className="mt-3 font-display text-4xl font-semibold tracking-[-.06em]">A few good words.</h2></div><div className="flex items-center gap-2 text-[var(--clay)]"><Star className="size-4" fill="currentColor" /><span className="font-mono text-xs">4.9 / 5</span></div></div><div className="mt-8 grid gap-4 md:grid-cols-2"><blockquote className="rounded-2xl bg-[rgba(18,41,35,.55)] p-5 text-sm leading-7 text-[var(--mist)]">“Soft, clear, and somehow easier to brew before the day starts.”<cite className="mt-4 block text-xs not-italic text-[var(--oat)]">Mariam, Cairo</cite></blockquote><div className="rounded-2xl bg-[rgba(197,107,72,.08)] p-5">{sent ? <p className="text-sm text-[var(--mist)]">Thank you. Your review is ready for moderation.</p> : <form onSubmit={submit}><p className="eyebrow">Have you tried it?</p><textarea className="field-input mt-4 min-h-24" value={copy} onChange={(event) => setCopy(event.target.value)} placeholder="Share a note about this cup" required /><Button type="submit" variant="outline" className="mt-5">Leave a review</Button></form>}</div></div></section>;
}
