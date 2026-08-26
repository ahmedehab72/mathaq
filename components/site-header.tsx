"use client";

import Link from "next/link";
import { Menu, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

const links = [
  ["Story", "/about"],
  ["Coffee", "/shop"],
  ["Brew lab", "/brew"],
  ["Journal", "/about#journal"],
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const items = useCart((state) => state.items);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const update = () => {
      const header = document.querySelector<HTMLElement>(".site-header");
      const hero = document.querySelector<HTMLElement>(".hero-scroll, .page-hero");
      setScrolled(hero ? hero.getBoundingClientRect().bottom <= (header?.offsetHeight ?? 0) : window.scrollY > 24);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={cn(
        "site-header",
        scrolled && "scrolled",
      )}
    >
      <Link href="/" className="brand-lockup" aria-label="MATHAQ home">
        <BrandMark />
        <span className="brand-word">MATHAQ</span>
        <span className="brand-arabic" lang="ar">مذاق</span>
      </Link>

      <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="nav-link">
            {label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="icon" className="relative" aria-label="Open cart">
          <Link href="/cart">
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute right-0.5 top-0.5 grid size-5 place-items-center rounded-full bg-[var(--clay)] text-[10px] text-[var(--canvas)]">
                {count}
              </span>
            )}
          </Link>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open navigation">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent title="MATHAQ navigation">
            <div className="mt-16 flex h-[calc(100%-4rem)] flex-col">
              <p className="eyebrow">Navigate the morning</p>
              <nav className="mt-8 flex flex-col" aria-label="Mobile navigation">
                {links.map(([label, href], index) => (
                  <SheetClose asChild key={href}>
                    <Link href={href} className="mobile-nav-link">
                      <span>0{index + 1}</span>{label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <p className="mt-auto max-w-xs text-sm leading-6 text-[var(--mist)]">
                Coffee with a visible origin, a clear roast, and nothing hidden in the language.
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
