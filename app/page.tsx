import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Flame,
  MapPin,
  PackageCheck,
} from "lucide-react";
import { CinematicHero } from "@/features/home/components/cinematic-hero";
import { ProductCard } from "@/features/shop/components/product-card";
import { products } from "@/features/shop/services/products";
import { coffeeImages } from "@/shared/lib/images";
import { Reveal } from "@/shared/components/reveal";
import { TasteBloom } from "@/features/brew/components/taste-bloom";
import { Button } from "@/shared/components/ui/button";

const promises = [
  [
    "01",
    "A date you can see.",
    "Every bag begins with the roast date. Freshness should be a fact, not a promise hidden in small print.",
  ],
  [
    "02",
    "Flavor in plain words.",
    "Chocolate means chocolate. Peach means peach. We describe the cup in language you can recognize.",
  ],
  [
    "03",
    "A finish that stays kind.",
    "Balanced roasting keeps sweetness present and harsh bitterness out of the way.",
  ],
];

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <section className="home-opening section-wrap">
        <Reveal className="home-opening-title">
          <p className="eyebrow">01 / The MATHAQ premise</p>
          <h2>One roast. No guesswork.</h2>
        </Reveal>
        <Reveal className="home-opening-copy" delay={0.1}>
          <p className="home-dropcap">M</p>
          <p>
            MATHAQ makes the cup easier to choose and slower to leave. The
            origin is visible. The roast is clear. The tasting notes use words
            you already know.
          </p>
          <Link href="/about" className="text-link">
            Why we roast this way <ArrowRight className="size-4" />
          </Link>
        </Reveal>
        <div className="home-taste-seal" aria-hidden="true">
          <span>MATHAQ</span>
          <small>TASTE, MADE CLEAR</small>
        </div>
      </section>

      <section className="section-wrap pt-0">
        <Reveal className="home-featured-roast">
          <div
            className="home-featured-image"
            role="img"
            aria-label="Morning No. 01 beside a stoneware cup"
          >
            <span className="roast-coordinate">
              <MapPin className="size-3.5" /> 15.6000° S, 47.7000° W
            </span>
            <span className="roast-ring" aria-hidden="true" />
          </div>
          <div className="home-featured-copy">
            <p className="eyebrow">The house coffee</p>
            <h2>Morning No. 01</h2>
            <p className="page-lede">
              Chocolate opens first. Caramel follows. Almond stays. A medium
              roast that works before you have decided how awake you are.
            </p>
            <dl className="roast-facts">
              <div>
                <dt>Origin</dt>
                <dd>Brazil, Cerrado</dd>
              </div>
              <div>
                <dt>Process</dt>
                <dd>Natural</dd>
              </div>
              <div>
                <dt>Roast</dt>
                <dd>Medium</dd>
              </div>
              <div>
                <dt>From</dt>
                <dd>$18</dd>
              </div>
            </dl>
            <Button asChild size="lg">
              <Link href="/shop/morning-no-01">
                Meet the roast <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>

      <section className="section-wrap pt-0">
        <Reveal>
          <div className="promise-grid">
            {promises.map(([number, title, copy]) => (
              <article className="promise-card" key={number}>
                <span className="promise-card-number">{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="roast-process section-wrap">
        <Reveal className="roast-process-heading">
          <p className="eyebrow">02 / Roast. Rest. Send.</p>
          <h2 className="section-heading mt-5">
            A short chain with nothing hidden.
          </h2>
        </Reveal>
        <div className="roast-process-grid">
          {[
            [
              "01",
              "Roast",
              "Heat shaped around sweetness, not darkness.",
              Flame,
              coffeeImages.roastery,
            ],
            [
              "02",
              "Rest",
              "A few quiet days let the cup open clearly.",
              CalendarDays,
              coffeeImages.bloom,
            ],
            [
              "03",
              "Send",
              "Packed with the roast date where you can see it.",
              PackageCheck,
              coffeeImages.cup,
            ],
          ].map(([number, title, copy, Icon, image], index) => {
            const StepIcon = Icon as typeof Flame;
            return (
              <Reveal
                key={String(number)}
                className="roast-process-card"
                delay={index * 0.08}
              >
                <div
                  className="roast-process-image"
                  style={{ backgroundImage: `url(${String(image)})` }}
                />
                <div className="roast-process-body">
                  <span>{String(number)}</span>
                  <StepIcon className="size-5 text-[var(--clay)]" />
                  <h3>{String(title)}</h3>
                  <p>{String(copy)}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* <TasteBloom /> */}

      {/* <section className="section-wrap home-collection">
        <Reveal className="home-collection-head">
          <div>
            <p className="eyebrow">03 / Choose a feeling</p>
            <h2 className="section-heading mt-5">
              Three ways into the morning.
            </h2>
          </div>
          <p className="page-lede">
            Do not start with processing terms. Start with the cup you want to
            hold.
          </p>
        </Reveal>
        <div className="home-product-grid">
          {products.slice(0, 3).map((product, index) => (
            <Reveal key={product.slug} delay={index * 0.08}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-wrap">
        <Reveal className="feature-image" style={{ backgroundImage: `url(${coffeeImages.cafe})` }}>
          <div className="feature-copy">
            <p className="eyebrow">04 / Inside the roast</p>
            <h2 className="section-heading mt-4">
              The story is in the time we do not rush.
            </h2>
            <Button asChild variant="outline" size="lg" className="mt-7">
              <Link href="/about">
                Enter the story <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section> */}

      <section className="section-wrap home-faq">
        <Reveal className="home-faq-heading">
          <p className="eyebrow">05 / Before you brew</p>
          <h2 className="section-heading mt-5">
            Good questions deserve plain answers.
          </h2>
        </Reveal>
        <Reveal className="home-faq-list" delay={0.1}>
          {[
            [
              "How fresh is the coffee?",
              "Every bag shows its roast date. Most coffees open after a short rest and taste clearest within four weeks.",
            ],
            [
              "Will it taste bitter?",
              "The house roast is built around sweetness and a smooth finish. Water that is too hot or a brew that runs too long can add bitterness.",
            ],
            [
              "Which grind should I choose?",
              "Whole bean keeps the most flexibility. Filter suits most pour-over brewers. Espresso is prepared finer for pressure brewing.",
            ],
          ].map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span>+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </Reveal>
      </section>

      <section className="home-final-cta section-wrap">
        <Reveal>
          <p className="eyebrow">Your next cup</p>
          <h2>Choose less. Taste more.</h2>
          <Button asChild size="lg" className="mt-8">
            <Link href="/shop">
              Shop MATHAQ <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Reveal>
        <div className="home-final-mark" aria-hidden="true">
          M
        </div>
      </section>
    </>
  );
}
