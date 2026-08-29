"use client";

import { useEffect, useRef, useState } from "react";
import { coffeeImages } from "@/shared/lib/images";

const chapters = [
  {
    label: "01 / Coffee beans",
    title: "Every cup begins with the bean.",
    copy: "We start with carefully selected coffee beans, keeping their origin and character visible from the very beginning.",
    image: coffeeImages.storyBeans,
  },
  {
    label: "02 / Grinding",
    title: "The grind opens the door to flavor.",
    copy: "The beans are ground to suit the brew, releasing the aroma and texture that shape the cup ahead.",
    image: coffeeImages.storyGrinding,
  },
  {
    label: "03 / Preparing",
    title: "Water turns preparation into ritual.",
    copy: "A measured pour, the right temperature, and a little patience bring the coffee into balance.",
    image: coffeeImages.storyPreparing,
  },
  {
    label: "04 / Serving",
    title: "The final moment is made to be shared.",
    copy: "Serve the cup while it is at its best, then let the first sip complete the journey.",
    image: coffeeImages.storyServing,
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
              transform: `scale(${active === index ? 1 : 1.04})`,
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
