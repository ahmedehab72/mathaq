"use client";

import { Check, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { useAdminStore } from "@/features/admin/stores/admin-store";
import { coffeeImages } from "@/shared/lib/images";
import { Button } from "@/shared/components/ui/button";

export function AdminProductModal({ onClose }: { onClose: () => void }) {
  const addProduct = useAdminStore((state) => state.addProduct);
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState<Record<string, string>>({ "250 g": "24", "500 g": "12", "1 kg": "6" });
  const [roast, setRoast] = useState<"Light" | "Medium" | "Medium dark">("Medium");
  const [saved, setSaved] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim();
    const slug = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `roast-${Date.now()}`;
    addProduct({ slug, name: cleanName, eyebrow: "A new MATHAQ roast", origin: origin.trim(), process: "Natural", roast, price: Number(price), notes: ["Chocolate", "Caramel"], description: "A new roast ready for its first story.", image: coffeeImages.cup, accent: "#c56b48", published: true, variants: (["250 g", "500 g", "1 kg"] as const).map((size, index) => ({ size, priceMultiplier: [1, 1.78, 3.25][index], stock: Number(stock[size]) || 0 })) });
    setSaved(true);
    window.setTimeout(onClose, 450);
  }

  return <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="add-product-title"><div className="flex items-start justify-between gap-4"><div><p className="eyebrow">Product editor / Preview</p><h2 id="add-product-title" className="mt-2 font-display text-4xl font-semibold tracking-[-.06em]">Add a new roast.</h2></div><button type="button" className="admin-modal-close" onClick={onClose} aria-label="Close product modal"><X className="size-5" /></button></div><form className="mt-8 grid gap-4" onSubmit={submit}><label className="field-label">Product name<input className="field-input" value={name} onChange={(event) => setName(event.target.value)} placeholder="Morning No. 04" required /></label><label className="field-label">Origin<input className="field-input" value={origin} onChange={(event) => setOrigin(event.target.value)} placeholder="Country, region" required /></label><div className="form-grid md:grid-cols-3"><label className="field-label">Roast<select className="field-input" value={roast} onChange={(event) => setRoast(event.target.value as typeof roast)}><option>Light</option><option>Medium</option><option>Medium dark</option></select></label><label className="field-label">Price<input className="field-input" value={price} onChange={(event) => setPrice(event.target.value)} type="number" min="0" step="0.5" placeholder="18" required /></label></div><div className="field-label"><span>Stock by size</span><div className="grid gap-3 sm:grid-cols-3">{(["250 g", "500 g", "1 kg"] as const).map((size) => <label className="text-xs text-[var(--mist)]" key={size}>{size}<input className="field-input mt-2" value={stock[size]} onChange={(event) => setStock((current) => ({ ...current, [size]: event.target.value }))} type="number" min="0" required /></label>)}</div></div><div className="mt-3 flex justify-end gap-3"><Button type="button" variant="ghost" onClick={onClose}>Cancel</Button><Button type="submit">{saved ? <><Check className="size-4" />Product added</> : "Add product"}</Button></div></form></section></div>;
}
