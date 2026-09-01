"use client";

import Image from "next/image";
import {
  Check,
  Coffee,
  Cuboid,
  LoaderCircle,
  Milk,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { products } from "@/features/shop/services/products";
import { Button } from "@/shared/components/ui/button";

type CupId = "espresso" | "ceramic" | "glass";
type ExtraId = "sugar" | "milk" | "cardamom";

const cups: Array<{ id: CupId; name: string; detail: string; price: number }> =
  [
    { id: "espresso", name: "Small cup", detail: "90 ml ceramic", price: 2 },
    {
      id: "ceramic",
      name: "Morning mug",
      detail: "240 ml stoneware",
      price: 3,
    },
    {
      id: "glass",
      name: "Clear glass",
      detail: "220 ml borosilicate",
      price: 4,
    },
  ];

const extras: Array<{
  id: ExtraId;
  name: string;
  detail: string;
  price: number;
  icon: typeof Cuboid;
}> = [
  {
    id: "sugar",
    name: "Cane sugar",
    detail: "One quiet spoon",
    price: 0.5,
    icon: Cuboid,
  },
  {
    id: "milk",
    name: "Steamed milk",
    detail: "Soft and silky",
    price: 1.5,
    icon: Milk,
  },
  {
    id: "cardamom",
    name: "Cardamom",
    detail: "Warm aromatic lift",
    price: 1,
    icon: Sparkles,
  },
];

const coffeeOptions = products.slice(0, 3);
const formatCupMoney = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);

export function BuildYourCup() {
  const [cup, setCup] = useState<CupId>("ceramic");
  const [coffeeSlug, setCoffeeSlug] = useState<string | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<ExtraId[]>([]);
  const [lastAdded, setLastAdded] = useState<"coffee" | ExtraId | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [ready, setReady] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);

  const selectedCup = cups.find((item) => item.id === cup) ?? cups[1];
  const selectedCoffee =
    coffeeOptions.find((item) => item.slug === coffeeSlug) ?? null;
  const chosenExtras = extras.filter((item) =>
    selectedExtras.includes(item.id),
  );
  const total = useMemo(
    () =>
      selectedCup.price +
      (selectedCoffee?.price ?? 0) +
      chosenExtras.reduce((sum, item) => sum + item.price, 0),
    [chosenExtras, selectedCoffee, selectedCup.price],
  );

  useEffect(() => {
    if (!isPreparing) return;
    const timer = window.setTimeout(() => {
      setIsPreparing(false);
      setReady(true);
    }, 2600);
    return () => window.clearTimeout(timer);
  }, [isPreparing]);

  function replay(type: "coffee" | ExtraId) {
    setLastAdded(type);
    setAnimationKey((value) => value + 1);
    setReady(false);
    setIsPreparing(false);
  }

  function chooseCoffee(slug: string) {
    setCoffeeSlug(slug);
    replay("coffee");
  }

  function toggleExtra(id: ExtraId) {
    setSelectedExtras((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
    replay(id);
  }

  function reset() {
    setCup("ceramic");
    setCoffeeSlug(null);
    setSelectedExtras([]);
    setLastAdded(null);
    setReady(false);
    setIsPreparing(false);
  }

  return (
    <section
      id="build-your-cup"
      className="build-cup section-wrap"
      aria-labelledby="build-cup-title"
    >
      <header className="build-cup-heading">
        <div>
          <p className="eyebrow">Interactive brew counter</p>
          <h2 id="build-cup-title">Build your cup.</h2>
        </div>
      </header>

      <div className="build-cup-layout">
        <div className="brew-machine-stage">
            <div className="brew-machine-visual">
              <Image
                src="/assets/brew-station-v1.png"
                alt="Dark metal coffee machine with copper details above a walnut counter"
                fill
                sizes="(max-width: 900px) 100vw, 58vw"
                className="brew-machine-image"
                priority={false}
              />
            </div>
            <div className="brew-machine-shade" aria-hidden="true" />
            <div
              className={`brew-cup-position ${isPreparing ? "is-preparing" : ""}`}
              aria-live="polite"
            >
              <div
                key={`${animationKey}-${lastAdded}`}
                className={`ingredient-motion ingredient-motion-${lastAdded ?? "idle"}`}
                aria-hidden="true"
              >
                {lastAdded === "coffee" && <span className="coffee-stream" />}
                {lastAdded === "sugar" && (
                  <>
                    {Array.from({ length: 9 }).map((_, index) => (
                      <span
                        key={index}
                        className="sugar-grain"
                        style={{ "--i": index } as CSSProperties}
                      />
                    ))}
                  </>
                )}
                {lastAdded === "milk" && <span className="milk-stream" />}
                {lastAdded === "cardamom" && (
                  <>
                    {Array.from({ length: 7 }).map((_, index) => (
                      <span
                        key={index}
                        className="cardamom-grain"
                        style={{ "--i": index } as CSSProperties}
                      />
                    ))}
                  </>
                )}
                {isPreparing && <span className="prepare-stream" />}
              </div>

              <div
                className={`cup-render cup-render-${cup} ${coffeeSlug ? "filled" : "empty"} ${isPreparing ? "preparing" : ""} ${ready ? "finished" : ""}`}
              >
                <span className="cup-handle" aria-hidden="true" />
                <span className="cup-liquid" aria-hidden="true">
                  {selectedExtras.includes("milk") && (
                    <span className="milk-swirl" />
                  )}
                  {selectedExtras.includes("cardamom") && (
                    <span className="spice-specks" />
                  )}
                </span>
                <span className="cup-rim" aria-hidden="true" />
              </div>
              {isPreparing && (
                <div className="brew-steam" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>

            {ready && selectedCoffee && (
              <div className="cup-ready-card" role="status">
                <Check className="size-5" />
                <div>
                  <strong>Your cup is ready.</strong>
                  <span>
                    {selectedCoffee.name} in the{" "}
                    {selectedCup.name.toLowerCase()}.
                  </span>
                </div>
              </div>
            )}

            <div
              className="machine-ingredients"
              aria-label="Ingredients in your cup"
            >
              <span className="eyebrow">In your cup</span>
              <div>
                <span className="machine-ingredient-chip">
                  <strong>{selectedCup.name}</strong>
                  <small>{formatCupMoney(selectedCup.price)}</small>
                </span>
                {selectedCoffee ? (
                  <span className="machine-ingredient-chip">
                    <strong>{selectedCoffee.name}</strong>
                    <small>{formatCupMoney(selectedCoffee.price)}</small>
                  </span>
                ) : (
                  <span className="machine-ingredient-chip is-empty">
                    <strong>No coffee yet</strong>
                    <small>Choose one</small>
                  </span>
                )}
                {chosenExtras.map((item) => (
                  <span className="machine-ingredient-chip" key={item.id}>
                    <strong>{item.name}</strong>
                    <small>+{formatCupMoney(item.price)}</small>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <footer className="cup-builder-total">
            <div>
              <span className="eyebrow">Your total</span>
              <strong>{formatCupMoney(total)}</strong>
              <small>
                {selectedCoffee
                  ? `${2 + chosenExtras.length} selected items`
                  : "Cup selected, choose your coffee"}
              </small>
            </div>
            <div className="cup-builder-actions">
              <Button variant="ghost" onClick={reset}>
                <RotateCcw className="size-4" />
                Reset
              </Button>
              <Button
                size="lg"
                disabled={!selectedCoffee || isPreparing}
                aria-busy={isPreparing}
                onClick={() => {
                  setReady(false);
                  setIsPreparing(true);
                }}
              >
                {isPreparing ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : ready ? (
                  <Check className="size-4" />
                ) : (
                  <Coffee className="size-4" />
                )}
                {isPreparing
                  ? "Preparing..."
                  : ready
                    ? "Finished"
                    : "Prepare this cup"}
              </Button>
            </div>
          </footer>

        <div className="cup-builder-panel">
          <div className="builder-step">
            <div className="builder-step-title">
              <span>01</span>
              <div>
                <h3>Choose your cup</h3>
                <p>The cup changes live on the counter.</p>
              </div>
            </div>
            <div className="cup-choice-grid">
              {cups.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={`cup-choice ${cup === item.id ? "selected" : ""}`}
                  onClick={() => {
                    setCup(item.id);
                    setReady(false);
                    setIsPreparing(false);
                  }}
                  aria-pressed={cup === item.id}
                >
                  <span className={`cup-choice-art cup-choice-art-${item.id}`}>
                    <i />
                  </span>
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.detail}</small>
                  </span>
                  <b>{formatCupMoney(item.price)}</b>
                </button>
              ))}
            </div>
          </div>

          <div className="builder-step">
            <div className="builder-step-title">
              <span>02</span>
              <div>
                <h3>Choose the coffee</h3>
                <p>The same coffees available in the shop.</p>
              </div>
            </div>
            <div className="ingredient-grid">
              {coffeeOptions.map((item) => (
                <button
                  type="button"
                  key={item.slug}
                  className={`ingredient-card ${coffeeSlug === item.slug ? "selected" : ""}`}
                  onClick={() => chooseCoffee(item.slug)}
                  aria-pressed={coffeeSlug === item.slug}
                >
                  <span
                    className="ingredient-card-image"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <span className="ingredient-card-copy">
                    <small>{item.roast} roast</small>
                    <strong>{item.name}</strong>
                    <span>{item.notes.slice(0, 2).join(" / ")}</span>
                  </span>
                  <b>{formatCupMoney(item.price)}</b>
                </button>
              ))}
            </div>
          </div>

          <div className="builder-step">
            <div className="builder-step-title">
              <span>03</span>
              <div>
                <h3>Add a finishing touch</h3>
                <p>Tap again to remove an ingredient.</p>
              </div>
            </div>
            <div className="extra-grid">
              {extras.map((item) => {
                const Icon = item.icon;
                const selected = selectedExtras.includes(item.id);
                return (
                  <button
                    type="button"
                    key={item.id}
                    className={`extra-card ${selected ? "selected" : ""}`}
                    onClick={() => toggleExtra(item.id)}
                    aria-pressed={selected}
                    disabled={!selectedCoffee}
                  >
                    <span className="extra-card-art">
                      <Icon className="size-6" />
                    </span>
                    <span>
                      <strong>{item.name}</strong>
                      <small>{item.detail}</small>
                    </span>
                    <b>+{formatCupMoney(item.price)}</b>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
