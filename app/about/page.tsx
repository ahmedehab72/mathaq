import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StoryJourney } from "@/components/story-journey";
import { PageIntro } from "@/components/page-intro";
import { coffeeImages } from "@/lib/images";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Our story" };

export default function AboutPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="The story inside the cup"
        title="Taste has a memory."
        lede="MATHAQ is built around the moments most coffee pages skip. The farm before the bag. The rest after the roast. The reason one cup feels clear and another does not."
        image={coffeeImages.cup}
        imageAlt="A finished cup of coffee resting on a walnut counter"
        kicker="A QUIETER WAY TO WAKE"
        facts={[["STARTED", "2024"], ["ORIGIN", "VISIBLE"], ["PROMISE", "NO GUESSWORK"]]}
        action={{ label: "Read the field notes", href: "#journal" }}
      />

      <StoryJourney />

      <section id="journal" className="section-wrap">
        <div className="grid gap-12 md:grid-cols-[.72fr_1.28fr]">
          <div className="md:sticky md:top-28 md:self-start">
            <p className="eyebrow">Field notes</p>
            <h2 className="section-heading mt-5">Things worth noticing.</h2>
          </div>
          <div className="grid gap-0 border-t border-[var(--line)]">
            {[
              ["01", "Why coffee needs rest", "Fresh from the roaster is not always ready for water. Rest gives trapped gas time to leave and sweetness room to open."],
              ["02", "Reading a roast date", "Think in weeks, not expiry dates. The right window changes with roast level and how you brew."],
              ["03", "What tasting notes mean", "They are references, not ingredients. Chocolate describes a familiar sweetness and texture already present in the coffee."],
            ].map(([number, title, copy]) => (
              <article key={number} className="grid gap-5 border-b border-[var(--line)] py-9 md:grid-cols-[4rem_1fr]">
                <span className="font-mono text-xs text-[var(--clay)]">{number}</span>
                <div>
                  <h3 className="font-display text-3xl font-semibold tracking-[-.055em]">{title}</h3>
                  <p className="mt-3 max-w-xl leading-7 text-[var(--mist)]">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap border-t border-[var(--line)] text-center">
        <p className="eyebrow">Continue the thread</p>
        <h2 className="section-heading mx-auto mt-5">Meet the coffees.</h2>
        <Button asChild size="lg" className="mt-8">
          <Link href="/shop">Enter the collection <ArrowRight className="size-4" /></Link>
        </Button>
      </section>
    </div>
  );
}
