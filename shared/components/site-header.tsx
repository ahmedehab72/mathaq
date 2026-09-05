"use client";

import Link from "next/link";
import { Heart, Menu, ShoppingBag, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/features/cart/stores/cart-store";
import { BrandMark } from "@/shared/components/brand-mark";
import { Button } from "@/shared/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/shared/components/ui/sheet";
import { cn } from "@/shared/lib/utils";

const links = [
  ["About", "/about"],
  ["Shop", "/shop"],
  ["Brewing", "/brew"],
  ["Journal", "/journal"],
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
        <Button asChild variant="ghost" className="hidden gap-2 lg:inline-flex" aria-label="Account">
          <Link href="/login"><UserRound className="size-4" /><span>Account</span></Link>
        </Button>
        <Button asChild variant="ghost" size="icon" aria-label="Open wishlist">
          <Link href="/wishlist"><Heart className="size-5" /></Link>
        </Button>
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
              <div className="mt-8 grid gap-2 border-t border-[var(--line)] pt-6">
                <SheetClose asChild><Link href="/login" className="mobile-account-link"><UserRound className="size-4" />Sign in</Link></SheetClose>
                <SheetClose asChild><Link href="/register" className="mobile-account-link"><UserRound className="size-4" />Create account</Link></SheetClose>
              </div>
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
