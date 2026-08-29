import type { Metadata } from "next";
import { ContactForm } from "@/features/content/components/contact-form";

export const metadata: Metadata = { title: "Contact" };
export default function ContactPage() { return <div className="page-shell contact-page"><section className="contact-hero"><div><p className="eyebrow">Leave a note</p><h1>We are listening.</h1><p>Questions about a coffee, an order, or the ritual itself.</p></div></section><section className="section-wrap contact-content"><div className="contact-grid"><div><p className="eyebrow">Say hello</p><h2>Make it a good question.</h2><div className="mt-10 grid gap-3 text-sm text-[var(--mist)]"><a href="mailto:hello@mathaq.coffee" className="text-[var(--oat)]">hello@mathaq.coffee</a><span>Cairo, Egypt</span><span>Sun to Thu, 10:00 to 18:00</span></div></div><div className="contact-form-panel"><ContactForm /></div></div></section></div>; }
