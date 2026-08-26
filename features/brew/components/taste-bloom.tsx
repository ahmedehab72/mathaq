"use client";

import { useEffect, useRef, useState } from "react";
import { coffeeImages } from "@/shared/lib/images";

export function TasteBloom() {
  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const frame = useRef<number | null>(null);
  const last = useRef(0);
  const progressRef = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => requestAnimationFrame(() => {
      progressRef.current = reduced.matches ? 1 : 0;
      setProgress(progressRef.current);
    });
    reduced.addEventListener("change", update);
    const initialFrame = update();
    return () => {
      reduced.removeEventListener("change", update);
      cancelAnimationFrame(initialFrame);
    };
  }, []);

  useEffect(() => {
    const tick = (now: number) => {
      const dt = Math.min(50, now - (last.current || now));
      last.current = now;
      const next = holding
        ? Math.min(1, progressRef.current + dt / 1500)
        : Math.max(0, progressRef.current - dt / 900);
      progressRef.current = next;
      setProgress(next);
      if ((holding && next < 1) || (!holding && next > 0)) frame.current = requestAnimationFrame(tick);
      else { frame.current = null; last.current = 0; }
    };
    if (frame.current === null) frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = null;
      last.current = 0;
    };
  }, [holding]);

  return (
    <section className="section-wrap">
      <div className="grid items-center gap-10 rounded-[2rem] border border-[var(--line)] bg-[var(--canvas-soft)] p-5 md:grid-cols-2 md:p-10">
        <div className="relative grid min-h-[28rem] place-items-center overflow-hidden rounded-[1.4rem] bg-cover bg-center" style={{ backgroundImage: `url(${coffeeImages.bloom})` }}>
          <div className="absolute inset-0 bg-[rgba(4,16,13,.45)]" />
          <div
            className="absolute size-64 rounded-full border border-[rgba(238,229,212,.4)] bg-[rgba(197,107,72,.2)] blur-[1px] transition-transform duration-300"
            style={{ transform: `scale(${0.45 + progress * 1.45})`, opacity: 0.15 + progress * 0.65 }}
          />
          <button
            type="button"
            className="relative grid size-40 place-items-center rounded-full border border-[var(--line-strong)] bg-[rgba(7,23,19,.72)] font-mono text-[.65rem] uppercase tracking-[.16em] backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clay)]"
            onPointerDown={() => setHolding(true)}
            onPointerUp={() => setHolding(false)}
            onPointerCancel={() => setHolding(false)}
            onKeyDown={(event) => { if (event.key === " " || event.key === "Enter") setHolding(true); }}
            onKeyUp={() => setHolding(false)}
            aria-label="Press and hold to reveal the tasting notes"
          >
            {progress >= 1 ? "Notes open" : "Hold to bloom"}
          </button>
        </div>
        <div>
          <p className="eyebrow">Taste is a sequence</p>
          <h2 className="section-heading mt-5">Let the cup tell you slowly.</h2>
          <div className="mt-10 grid gap-4">
            {["Chocolate opens first.", "Caramel follows.", "Almond stays."].map((line, index) => (
              <p
                key={line}
                className="border-b border-[var(--line)] pb-4 text-xl transition-[opacity,transform] duration-500"
                style={{ opacity: progress > index * 0.28 + 0.18 ? 1 : 0.24, transform: `translateX(${progress > index * 0.28 + 0.18 ? 0 : 12}px)` }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
