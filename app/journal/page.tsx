import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { journalPosts } from "@/features/content/data/journal";

export const metadata: Metadata = { title: "Journal", description: "Field notes from the MATHAQ coffee table." };

export default function JournalPage() { return <div className="page-shell journal-page"><section className="journal-hero"><div><p className="eyebrow">The MATHAQ journal</p><h1>Things worth noticing.</h1><p>Notes on farms, rest, roast, and the small decisions that shape a cup.</p></div><span className="journal-hero-number">03<br /><small>FIELD NOTES</small></span></section><section className="section-wrap journal-grid">{journalPosts.map((post, index) => <article className={`journal-card ${index === 0 ? "featured" : ""}`} key={post.slug}><div className="journal-card-top"><span>{post.number} / {post.category}</span><span>{post.read}</span></div><p className="eyebrow mt-12">{post.date}</p><h2>{post.title}</h2><p>{post.excerpt}</p><Link href={`/journal/${post.slug}`} className="text-link">Read the note <ArrowUpRight className="size-4" /></Link></article>)}</section></div>; }
