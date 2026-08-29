import type { Metadata } from "next";
import { SubscribeView } from "@/features/commercial/components/subscribe-view";
export const metadata: Metadata = { title: "Subscribe" };
export default function SubscribePage() { return <div className="page-shell"><SubscribeView /></div>; }
