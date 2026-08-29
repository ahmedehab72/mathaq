import type { Metadata } from "next";
import { SearchView } from "@/features/search/components/search-view";

export const metadata: Metadata = { title: "Search coffee" };

export default function SearchPage() {
  return <div className="page-shell"><SearchView /></div>;
}
