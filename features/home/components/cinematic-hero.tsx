"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/shared/components/ui/button";

const GATES = [
  "(max-width: 720px)",
  "(orientation: portrait) and (max-width: 1024px)",
  "(orientation: portrait) and (pointer: coarse)",
  "(orientation: landscape) and (pointer: coarse) and (max-height: 560px)",
  "(prefers-reduced-motion: reduce)",
];

const bands = [
  { a: 0, b: 0.3 },
  { a: 0.34, b: 0.64 },
  { a: 0.68, b: 1 },
];

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smoothstep = (value: number, start: number, end: number) => {
  const t = clamp((value - start) / Math.max(0.0001, end - start));
  return t * t * (3 - 2 * t);
};

export function CinematicHero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bandRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef(0);
  const shownRef = useRef(0);
  const lastTimeRef = useRef(0);
  const seekBusyRef = useRef(false);
  const pendingTimeRef = useRef<number | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [isStatic, setIsStatic] = useState(true);

  const progress = useCallback(() => {
    const hero = heroRef.current;
    if (!hero) return 0;
    const rect = hero.getBoundingClientRect();
    return clamp(-rect.top / Math.max(1, rect.height - window.innerHeight));
  }, []);

  const requestSeek = useCallback((time: number) => {
    const video = videoRef.current;
    if (!video?.duration) return;
    if (seekBusyRef.current) {
      pendingTimeRef.current = time;
      return;
    }
    seekBusyRef.current = true;
    video.currentTime = Math.min(video.duration, Math.max(0, time));
  }, []);

  const paint = useCallback((value: number) => {
    bands.forEach((band, index) => {
      const element = bandRefs.current[index];
      if (!element) return;
      const edge = Math.min(0.025, (band.b - band.a) / 3);
      const fadeIn = index === 0 ? 1 : smoothstep(value, band.a, band.a + edge);
      const fadeOut = index === bands.length - 1 ? 1 : 1 - smoothstep(value, band.b - edge, band.b);
      const opacity = clamp(fadeIn * fadeOut);
      const assembly = index === 0 ? 1 : clamp((value - band.a) / Math.max(0.02, edge * 1.2));
      element.style.opacity = opacity.toFixed(3);
      element.style.setProperty("--k", assembly.toFixed(3));
      element.style.pointerEvents = opacity > 0.7 ? "auto" : "none";
    });
    progressRef.current?.style.setProperty("--progress", value.toFixed(4));
  }, []);

  useEffect(() => {
    const queries = GATES.map((query) => window.matchMedia(query));
    const applyMode = () => setIsStatic(queries.some((query) => query.matches));
    queries.forEach((query) => query.addEventListener("change", applyMode));
    applyMode();
    return () => queries.forEach((query) => query.removeEventListener("change", applyMode));
  }, []);

  useEffect(() => {
    if (isStatic || objectUrlRef.current) return;
    const controller = new AbortController();
    let cancelled = false;
    fetch("/assets/hero-scrub.mp4", { signal: controller.signal, priority: "low" as RequestPriority })
      .then((response) => {
        if (!response.ok) throw new Error("Hero video unavailable");
        return response.blob();
      })
      .then((blob) => {
        if (cancelled || !videoRef.current) return;
        const url = URL.createObjectURL(blob);
        objectUrlRef.current = url;
        videoRef.current.src = url;
        videoRef.current.load();
      })
      .catch(() => setVideoReady(false));
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [isStatic]);

  useEffect(() => {
    if (isStatic) return;
    const tick = (now: number) => {
      const dt = Math.min(100, now - (lastTimeRef.current || now));
      lastTimeRef.current = now;
      const current = shownRef.current;
      const target = targetRef.current;
      const next = current + (target - current) * (1 - Math.pow(0.84, dt / 16.667));
      shownRef.current = Math.abs(target - next) < 0.0005 ? target : next;
      paint(shownRef.current);
      const video = videoRef.current;
      if (videoReady && video?.duration) requestSeek(shownRef.current * video.duration);
      if (shownRef.current !== targetRef.current) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        frameRef.current = null;
        lastTimeRef.current = 0;
      }
    };
    const onScroll = () => {
      targetRef.current = progress();
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(tick);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [isStatic, paint, progress, requestSeek, videoReady]);

  useEffect(() => () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
  }, []);

  return (
    <section ref={heroRef} className="hero-scroll" aria-label="MATHAQ coffee journey">
      <div className="hero-stage">
        <div className="hero-poster" aria-hidden="true" />
        <video
          ref={videoRef}
          className={`hero-video ${videoReady ? "ready" : ""}`}
          muted
          playsInline
          preload="none"
          tabIndex={-1}
          aria-hidden="true"
          onCanPlay={() => setVideoReady(true)}
          onSeeked={() => {
            seekBusyRef.current = false;
            const pending = pendingTimeRef.current;
            pendingTimeRef.current = null;
            if (pending !== null) requestSeek(pending);
          }}
          onError={() => {
            seekBusyRef.current = false;
            pendingTimeRef.current = null;
            setVideoReady(false);
          }}
        />
        <div className="hero-scrim" aria-hidden="true" />

        <div ref={(node) => { bandRefs.current[0] = node; }} className="hero-band hero-band-one">
          <h1>Coffee should not rush you.</h1>
        </div>
        <div ref={(node) => { bandRefs.current[1] = node; }} className="hero-band hero-band-two">
          <h2>Roasted fresh. Smooth by nature.</h2>
        </div>
        <div ref={(node) => { bandRefs.current[2] = node; }} className="hero-band hero-band-three">
          <div className="grid justify-items-center">
            <h2>MATHAQ. Taste, made clear.</h2>
            <p>Coffee chosen for sweetness, roasted for calm, and made to be understood.</p>
            <Button asChild size="lg" className="mt-7">
              <Link href="/shop">Shop the collection <ArrowRight className="size-4" /></Link>
            </Button>
          </div>
        </div>

        <div className="static-hero-copy">
          <p className="eyebrow mb-4">MATHAQ coffee</p>
          <h1>A quieter way to wake.</h1>
          <p className="mt-5 max-w-md leading-7 text-[var(--mist)]">Coffee chosen for sweetness, roasted for calm, and made to be understood.</p>
          <Button asChild size="lg" className="mt-7 w-fit">
            <Link href="/shop">Shop the collection <ArrowRight className="size-4" /></Link>
          </Button>
        </div>

        <div className="hero-hud" aria-hidden="true">
          <ArrowDown className="size-3.5 text-[var(--clay)]" />
          <span>Scroll to enter</span>
          <span className="hero-progress"><span ref={progressRef} /></span>
        </div>
      </div>
    </section>
  );
}
