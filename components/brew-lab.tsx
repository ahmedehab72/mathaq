"use client";

import { Play, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

const methods = {
  V60: { ratio: 16, time: "2:45", grind: "Medium fine" },
  Espresso: { ratio: 2, time: "0:30", grind: "Fine" },
  "French press": { ratio: 15, time: "4:00", grind: "Coarse" },
};

export function BrewLab() {
  const [method, setMethod] = useState<keyof typeof methods>("V60");
  const [coffee, setCoffee] = useState(18);
  const [started, setStarted] = useState(false);
  const water = useMemo(() => coffee * methods[method].ratio, [coffee, method]);

  return (
    <section className="section-wrap brew-stage">
      <div className="brew-dial" aria-live="polite">
        <div className="relative z-[2] text-center">
          <p className="eyebrow">Brew ratio</p>
          <div className="brew-ratio mt-3">1:{methods[method].ratio}</div>
          <p className="mt-2 text-sm text-[var(--mist)]">{coffee} g coffee, {water} g water</p>
        </div>
      </div>
      <div>
        <p className="eyebrow">Build your cup</p>
        <h2 className="section-heading mt-5">A recipe that listens back.</h2>
        <div className="mt-9 grid gap-6">
          <fieldset>
            <legend className="mb-3 text-sm text-[var(--mist)]">Method</legend>
            <div className="filter-row">
              {(Object.keys(methods) as (keyof typeof methods)[]).map((item) => <button type="button" key={item} className={`filter-chip ${method === item ? "active" : ""}`} onClick={() => { setMethod(item); setStarted(false); }}>{item}</button>)}
            </div>
          </fieldset>
          <label className="field-label">Coffee dose, {coffee} g<input className="range" type="range" min="12" max="40" value={coffee} onChange={(event) => setCoffee(Number(event.target.value))} /></label>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--line)]">
            <div className="bg-[var(--canvas-soft)] p-4"><span className="eyebrow">Grind</span><strong className="mt-2 block">{methods[method].grind}</strong></div>
            <div className="bg-[var(--canvas-soft)] p-4"><span className="eyebrow">Time</span><strong className="mt-2 block">{methods[method].time}</strong></div>
          </div>
          <Button size="lg" onClick={() => setStarted((value) => !value)}>
            {started ? <RotateCcw className="size-4" /> : <Play className="size-4" />}
            {started ? "Reset demo timer" : "Start demo brew"}
          </Button>
          {started && <p className="rounded-xl border border-[rgba(197,107,72,.35)] bg-[rgba(197,107,72,.08)] p-4 text-sm leading-6 text-[var(--mist)]">Timer design is active. The next build will add timed pour stages, sound cues by choice, and saved recipes.</p>}
        </div>
      </div>
    </section>
  );
}
