import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  lede: string;
  image: string;
  imageAlt: string;
  kicker: string;
  facts: [string, string][];
  action?: { label: string; href: string };
};

export function PageIntro({ eyebrow, title, lede, image, imageAlt, kicker, facts, action }: PageIntroProps) {
  return (
    <section className="page-intro" aria-labelledby="page-intro-title">
      <div className="page-intro-copy">
        <div className="page-intro-index" aria-hidden="true">
          <span>01</span>
          <span className="page-intro-index-line" />
          <span>THE MATHAQ WAY</span>
        </div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="page-intro-title" className="page-title">{title}</h1>
        <p className="page-lede">{lede}</p>
        {action ? (
          <Link href={action.href} className="page-intro-action">
            {action.label}
            <ArrowRight className="size-4" />
          </Link>
        ) : null}
      </div>

      <div className="page-intro-media">
        <Image src={image} alt={imageAlt} fill priority sizes="(max-width: 719px) 100vw, 50vw" className="page-intro-image" />
        <div className="page-intro-media-shade" />
        <div className="page-intro-media-label">
          <span>{kicker}</span>
          <ArrowDownRight className="size-4" />
        </div>
      </div>

      <div className="page-intro-facts" aria-label="Page details">
        {facts.map(([label, value]) => (
          <div key={label} className="page-intro-fact">
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
