"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const chapters = [
  { label: "01 / Coffee beans", title: "Every cup begins with the bean.", copy: "We start with carefully selected coffee beans, keeping their origin and character visible from the very beginning." },
  { label: "02 / Grinding", title: "The grind opens the door to flavor.", copy: "The beans are ground to suit the brew, releasing the aroma and texture that shape the cup ahead." },
  { label: "03 / Preparing", title: "Water turns preparation into ritual.", copy: "A measured pour, the right temperature, and a little patience bring the coffee into balance." },
  { label: "04 / Serving", title: "The final moment is made to be shared.", copy: "Serve the cup while it is at its best, then let the first sip complete the journey." },
];

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function StoryJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<number | null>(null);
  const targetProgressRef = useRef(0);
  const shownProgressRef = useRef(0);
  const lastTimeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  const getProgress = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return 0;
    const rect = section.getBoundingClientRect();
    return clamp(-rect.top / Math.max(1, rect.height - window.innerHeight));
  }, []);

  const seekToProgress = useCallback((progress: number) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    video.currentTime = progress * video.duration;
  }, []);

  useEffect(() => {
    const update = (now: number) => {
      frameRef.current = null;
      const dt = Math.min(100, now - (lastTimeRef.current || now));
      lastTimeRef.current = now;
      const current = shownProgressRef.current;
      const target = targetProgressRef.current;
      const next = current + (target - current) * (1 - Math.pow(0.84, dt / 16.667));
      shownProgressRef.current = Math.abs(target - next) < 0.0005 ? target : next;
      setActive(Math.min(chapters.length - 1, Math.floor(shownProgressRef.current * chapters.length)));
      if (shownProgressRef.current !== targetProgressRef.current) frameRef.current = requestAnimationFrame(update);
      else lastTimeRef.current = 0;
    };

    const onScroll = () => {
      const progress = getProgress();
      targetProgressRef.current = progress;
      setActive(Math.min(chapters.length - 1, Math.floor(progress * chapters.length)));
      if (videoReady) seekToProgress(progress);
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [getProgress, seekToProgress, videoReady]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || video.readyState < 1) return;
    setVideoReady(true);
    seekToProgress(getProgress());
  }, [getProgress, seekToProgress]);

  return (
    <section ref={sectionRef} className="story-journey" aria-label="The MATHAQ story">
      <div className="story-stage">
        <video
          ref={videoRef}
          className="story-video"
          src="/assets/about-coffe.mp4"
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
          onLoadedMetadata={() => { setVideoReady(true); seekToProgress(getProgress()); }}
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
        />
        <div className="story-video-scrim" aria-hidden="true" />
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
