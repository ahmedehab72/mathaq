import type { Metadata } from "next";
import { BuildYourCup } from "@/features/brew/components/build-your-cup";
import { coffeeImages } from "@/shared/lib/images";
import { PageIntro } from "@/shared/components/page-intro";

export const metadata: Metadata = { title: "Brew lab" };

export default function BrewPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="The brew lab"
        title="Make the cup yours."
        lede="Start with a clear recipe. Change one thing. Taste again. MATHAQ keeps the numbers close and the ritual human."
        image={coffeeImages.bloom}
        imageAlt="Coffee blooming in a ceramic dripper with warm morning light"
        kicker="BEGIN WITH WATER"
        facts={[["DOSE", "18 g"], ["WATER", "300 g"], ["TIME", "03:00"]]}
        action={{ label: "Build your cup", href: "#build-your-cup" }}
      />
      <BuildYourCup />
    </div>
  );
}
