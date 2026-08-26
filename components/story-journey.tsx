"use client";

import { useEffect, useRef, useState } from "react";

const chapters = [
  {
    label: "01 / Before the roast",
    title: "We begin where the coffee remembers rain.",
    copy: "MATHAQ starts with traceable lots and people who can tell us how the coffee grew, not only where it shipped from.",
    image: "/assets/hero-static.jpg",
  },
  {
    label: "02 / The curve",
    title: "Heat is a language. We keep it quiet.",
    copy: "Each roast is shaped to keep sweetness intact. Enough development for comfort, enough restraint for the origin to remain visible.",
    image: "/assets/roast-frame.jpg",
  },
  {
    label: "03 / The rest",
    title: "The bag waits before it asks you to brew.",
    copy: "Rest lets the cup open. The roast date stays visible so timing becomes part of the ritual, not a mystery.",
    image: "/assets/bloom-frame.jpg",
  },
  {
    label: "04 / Your morning",
    title: "The last part belongs to you.",
    copy: "Choose the grind, follow a simple recipe, then change it. A good coffee should meet your morning where it is.",
    image: "/assets/hero-ending.jpg",
  },
];

export function StoryJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const frame = useRef<number | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const update = () => {
      frame.current = null;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const progress = Math.min(0.999, Math.max(0, -rect.top / Math.max(1, rect.height - innerHeight)));
      setActive(Math.min(chapters.length - 1, Math.floor(progress * chapters.length)));
    };
    const onScroll = () => {
      if (frame.current === null) frame.current = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="story-journey" aria-label="The MATHAQ story">
      <div className="story-stage">
        {chapters.map((chapter, index) => (
          <div
            key={chapter.label}
            className="story-image"
            aria-hidden="true"
            style={{
              backgroundImage: `url(${chapter.image})`,
              opacity: active === index ? 1 : 0,
              transform: `scale(${active === index ? 1.02 : 1.08})`,
            }}
          />
        ))}
        <div className="story-copy">
          {chapters.map((chapter, index) => (
            <article key={chapter.label} className={`story-chapter ${active === index ? "active" : ""}`} aria-hidden={active !== index}>
              <p className="eyebrow">{chapter.label}</p>
              <h2 className="mt-5">{chapter.title}</h2>
              <p>{chapter.copy}</p>
            </article>
          ))}
        </div>
        <div className="story-meter" aria-hidden="true">
          {chapters.map((chapter, index) => <span key={chapter.label} className={index <= active ? "active" : ""} />)}
        </div>
      </div>
    </section>
  );
}
