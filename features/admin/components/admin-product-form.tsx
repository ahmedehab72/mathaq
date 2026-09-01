"use client";

import Link from "next/link";
import { ArrowLeft, Check, Save, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminStore } from "@/features/admin/stores/admin-store";
import { coffeeImages } from "@/shared/lib/images";
import { Button } from "@/shared/components/ui/button";

export function AdminProductForm({ slug }: { slug?: string }) {
  const router = useRouter();
  const products = useAdminStore((state) => state.products);
  const addProduct = useAdminStore((state) => state.addProduct);
  const updateProduct = useAdminStore((state) => state.updateProduct);
  const deleteProduct = useAdminStore((state) => state.deleteProduct);
  const existing = slug ? products.find((item) => item.slug === slug) : undefined;
  const [name, setName] = useState(existing?.name ?? "");
  const [origin, setOrigin] = useState(existing?.origin ?? "");
  const [price, setPrice] = useState(String(existing?.price ?? ""));
  const [stock, setStock] = useState(String(existing?.stock ?? "24"));
  const [roast, setRoast] = useState<"Light" | "Medium" | "Medium dark">(existing?.roast ?? "Medium");
  const [saved, setSaved] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim() || "Untitled roast";
    const nextSlug = slug ?? cleanName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const fields = { name: cleanName, origin: origin.trim() || "Origin to be confirmed", price: Number(price) || 0, stock: Number(stock) || 0, roast };
    if (slug) updateProduct(slug, fields);
    else addProduct({ slug: nextSlug || `roast-${Date.now()}`, eyebrow: "A new MATHAQ roast", process: "Natural", notes: ["Chocolate", "Caramel"], description: "A new roast ready for its first story.", image: coffeeImages.cup, accent: "#c56b48", published: true, ...fields });
    setSaved(true);
    window.setTimeout(() => router.push("/admin/products"), 500);
  }

  return <div className="page-shell admin-form-page"><section className="section-wrap"><Link href="/admin/products" className="text-link"><ArrowLeft className="size-4" />Products</Link><div className="mt-16"><p className="eyebrow">Products / {slug ? "Edit" : "New"}</p><h1 className="mt-4 font-display text-7xl font-semibold tracking-[-.08em]">{slug ? "Tune the roast." : "Make a new roast."}</h1><p className="mt-5 max-w-xl text-sm leading-7 text-[var(--mist)]">Everything here is a local design preview. Supabase will become the source of truth in the backend phase.</p></div><form className="admin-form-card mt-12" onSubmit={submit}><div className="form-grid md:grid-cols-2"><label className="field-label">Product name<input className="field-input" value={name} onChange={(event) => setName(event.target.value)} placeholder="Morning No. 04" required /></label><label className="field-label">Origin<input className="field-input" value={origin} onChange={(event) => setOrigin(event.target.value)} placeholder="Country, region" required /></label><label className="field-label">Roast<select className="field-input" value={roast} onChange={(event) => setRoast(event.target.value as typeof roast)}><option>Light</option><option>Medium</option><option>Medium dark</option></select></label><label className="field-label">Price<input className="field-input" value={price} onChange={(event) => setPrice(event.target.value)} type="number" min="0" step="0.5" placeholder="18" required /></label><label className="field-label">Stock<input className="field-input" value={stock} onChange={(event) => setStock(event.target.value)} type="number" min="0" placeholder="24" required /></label></div><div className="mt-8 flex flex-wrap gap-3"><Button type="submit">{saved ? <><Check className="size-4" />Saved</> : <><Save className="size-4" />Save product</>}</Button>{slug && <Button type="button" variant="ghost" onClick={() => { if (window.confirm(`Delete ${name}?`)) { deleteProduct(slug); router.push("/admin/products"); } }}><Trash2 className="size-4" />Delete</Button>}</div></form></section></div>;
}
