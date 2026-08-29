import type { Metadata } from "next";
import { WishlistView } from "@/features/wishlist/components/wishlist-view";

export const metadata: Metadata = { title: "Wishlist" };

export default function WishlistPage() {
  return <div className="page-shell"><WishlistView /></div>;
}
