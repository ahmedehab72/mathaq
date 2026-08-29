import type { Metadata } from "next";
import { TrackOrderView } from "@/features/orders/components/track-order-view";

export const metadata: Metadata = { title: "Track order" };

export default function TrackOrderPage() {
  return <div className="page-shell"><TrackOrderView /></div>;
}
