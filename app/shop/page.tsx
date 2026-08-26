import type { Metadata } from "next";
import { ShopGrid } from "@/features/shop/components/shop-grid";
import { coffeeImages } from "@/shared/lib/images";
import { PageIntro } from "@/shared/components/page-intro";

export const metadata: Metadata = { title: "Coffee" };

export default function ShopPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="The tasting table"
        title="Choose by feeling."
        lede="Soft and familiar. Bright and lifted. Deep and slow. Start with the cup you want, then meet the coffee that makes it."
        image={coffeeImages.roastery}
        imageAlt="Fresh coffee being poured into a handmade cup in the MATHAQ roastery"
        kicker="THE MORNING ROAST"
        facts={[["ROASTS", "03"], ["FORMAT", "250 g"], ["SHIPS", "WORLDWIDE"]]}
      />
      <ShopGrid />
    </div>
  );
}
