import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getJournalPost, journalPosts } from "@/features/content/data/journal";

export function generateStaticParams() { return journalPosts.map((post) => ({ slug: post.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const post = getJournalPost((await params).slug); return { title: post?.title ?? "Journal" }; }
export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) { const post = getJournalPost((await params).slug); if (!post) notFound(); return <div className="page-shell journal-post-page"><article className="journal-post"><Link href="/journal" className="text-link"><ArrowLeft className="size-4" />Back to journal</Link><div className="mt-20 max-w-4xl"><p className="eyebrow">{post.category} / {post.date}</p><h1>{post.title}</h1><p className="journal-post-lede">{post.excerpt}</p></div><div className="journal-post-body"><p>{post.body}</p><p>At MATHAQ, clarity is part of the flavour. The more visible the process, the more space there is to enjoy the cup.</p></div></article></div>; }
