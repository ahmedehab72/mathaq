import type { Metadata } from "next";
import { GiftCardView } from "@/features/commercial/components/gift-card-view";
export const metadata: Metadata = { title: "Gift cards" };
export default function GiftCardsPage() { return <div className="page-shell"><GiftCardView /></div>; }
