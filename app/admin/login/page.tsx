import type { Metadata } from "next";
import { AdminLoginForm } from "@/features/auth/components/admin-login-form";

export const metadata: Metadata = { title: "Admin sign in" };

export default function AdminLoginPage() {
  return (
    <main className="min-h-[100dvh] bg-[#06110f] px-5 py-10 text-[var(--oat)] md:px-10">
      <div className="mx-auto grid min-h-[calc(100dvh-5rem)] max-w-6xl items-center gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div className="max-w-md">
          <p className="font-mono text-[.62rem] uppercase tracking-[.2em] text-[var(--clay)]">
            MATHAQ / Studio
          </p>
          <h1 className="mt-6 font-display text-6xl font-semibold leading-[.88] tracking-[-.08em] md:text-8xl">
            Keep the quiet work moving.
          </h1>
          <p className="mt-7 max-w-sm text-sm leading-7 text-[var(--mist)]">
            A private workspace for products, orders, stock, and the stories
            behind the roast.
          </p>
        </div>
        <section
          className="admin-login-card"
          aria-labelledby="admin-login-title"
        >
          <div className="flex items-center justify-between gap-4 text-[.6rem] uppercase tracking-[.18em] text-[var(--mist)]">
            <span>Private access</span>
            <span className="text-[var(--clay)]">01 / 04</span>
          </div>
          <div className="mt-16">
            <p className="eyebrow">Studio sign in</p>
            <h2
              id="admin-login-title"
              className="mt-4 font-display text-4xl font-semibold tracking-[-.06em]"
            >
              Welcome, maker.
            </h2>
          </div>
          <AdminLoginForm />
        </section>
      </div>
    </main>
  );
}
