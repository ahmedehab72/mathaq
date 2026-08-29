import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/shared/components/brand-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="taste-thread taste-thread-footer" aria-hidden="true" />
      <div className="mx-auto grid w-full max-w-[1500px] gap-12 px-5 py-16 md:grid-cols-[1.4fr_.6fr_.6fr] md:px-10 lg:px-16">
        <div>
          <div className="flex items-center gap-3 text-[var(--oat)]">
            <BrandMark className="size-11" />
            <span className="font-display text-4xl font-bold tracking-[-0.06em]">MATHAQ</span>
          </div>
          <p className="mt-6 max-w-md text-base leading-7 text-[var(--mist)]">
            A fictional coffee concept becoming a complete storefront. The current checkout and account flows are designed demos.
          </p>
        </div>
        <div className="footer-links">
          <p className="eyebrow">Explore</p>
          <Link href="/about">Our story</Link>
          <Link href="/shop">Coffee</Link>
          <Link href="/brew">Brew lab</Link>
          <Link href="/journal">Journal</Link>
        </div>
        <div className="footer-links">
          <p className="eyebrow">Visit</p>
          <Link href="/account">Account</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/admin">Admin preview</Link>
          <a href="mailto:hello@mathaq.coffee">Contact <ArrowUpRight className="size-3.5" /></a>
        </div>
      </div>
      <div className="border-t border-[var(--line)] px-5 py-5 text-xs text-[var(--mist)] md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1500px] flex-wrap justify-between gap-3">
          <span>© 2026 MATHAQ concept.</span>
          <span>Visual direction and AI-assisted imagery are disclosed before launch.</span>
        </div>
      </div>
    </footer>
  );
}
