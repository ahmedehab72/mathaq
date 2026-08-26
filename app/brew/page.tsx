import type { Metadata } from "next";
import { BrewLab } from "@/features/brew/components/brew-lab";
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
        action={{ label: "Start a recipe", href: "#brew-lab" }}
      />
      <BrewLab />
    </div>
  );
}
