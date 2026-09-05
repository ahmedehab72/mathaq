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
  const existing = slug
    ? products.find((item) => item.slug === slug)
    : undefined;
  const [name, setName] = useState(existing?.name ?? "");
  const [origin, setOrigin] = useState(existing?.origin ?? "");
  const [price, setPrice] = useState(String(existing?.price ?? ""));
  const [stock, setStock] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      (
        existing?.variants ?? [
          { size: "250 g", stock: 24, priceMultiplier: 1 },
          { size: "500 g", stock: 12, priceMultiplier: 1.78 },
          { size: "1 kg", stock: 6, priceMultiplier: 3.25 },
        ]
      ).map((variant) => [variant.size, String(variant.stock)]),
    ),
  );
  const [roast, setRoast] = useState<"Light" | "Medium" | "Medium dark">(
    existing?.roast ?? "Medium",
  );
  const [saved, setSaved] = useState(false);
  const [image, setImage] = useState(existing?.image ?? coffeeImages.cup);

  function chooseImage(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.readAsDataURL(file);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim() || "Untitled roast";
    const nextSlug =
      slug ??
      cleanName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    const fields = {
      name: cleanName,
      origin: origin.trim() || "Origin to be confirmed",
      price: Number(price) || 0,
      variants: (["250 g", "500 g", "1 kg"] as const).map((size, index) => ({
        size,
        priceMultiplier: [1, 1.78, 3.25][index],
        stock: Number(stock[size]) || 0,
      })),
      roast,
    };
    if (slug) updateProduct(slug, fields);
    else
      addProduct({
        slug: nextSlug || `roast-${Date.now()}`,
        eyebrow: "A new MATHAQ roast",
        process: "Natural",
        notes: ["Chocolate", "Caramel"],
        description: "A new roast ready for its first story.",
        image,
        accent: "#c56b48",
        published: true,
        ...fields,
      });
    if (slug) updateProduct(slug, { image });
    setSaved(true);
    window.setTimeout(() => router.push("/admin/products"), 500);
  }

  return (
    <div className="page-shell admin-form-page">
      <section className="section-wrap">
        <Link href="/admin/products" className="text-link">
          <ArrowLeft className="size-4" />
          Products
        </Link>
        <div className="mt-4">
          <p className="eyebrow">Products / {slug ? "Edit" : "New"}</p>
          <h1 className="mt-4 font-display text-7xl font-semibold tracking-[-.08em]">
            {slug ? "Tune the roast." : "Make a new roast."}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--mist)]">
            Everything here is a local design preview. Supabase will become the
            source of truth in the backend phase.
          </p>
        </div>
        <form className="admin-form-card mt-12" onSubmit={submit}>
          <div className="form-grid md:grid-cols-2">
            <label className="field-label">
              Product name
              <input
                className="field-input"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Morning No. 04"
                required
              />
            </label>
            <label className="field-label">
              Origin
              <input
                className="field-input"
                value={origin}
                onChange={(event) => setOrigin(event.target.value)}
                placeholder="Country, region"
                required
              />
            </label>
            <label className="field-label">
              Roast
              <select
                className="field-input"
                value={roast}
                onChange={(event) =>
                  setRoast(event.target.value as typeof roast)
                }
              >
                <option>Light</option>
                <option>Medium</option>
                <option>Medium dark</option>
              </select>
            </label>
            <label className="field-label">
              Price
              <input
                className="field-input"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                type="number"
                min="0"
                step="0.5"
                placeholder="18"
                required
              />
            </label>
            <div className="field-label md:col-span-2">
              <span>Product image</span>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <div
                  className="size-24 rounded-2xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${image})` }}
                  aria-label="Product image preview"
                  role="img"
                />
                <label className="admin-row-action cursor-pointer">
                  Choose image
                  <input
                    className="sr-only"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(event) => chooseImage(event.target.files?.[0])}
                  />
                </label>
              </div>
              <small className="mt-2 block text-[var(--mist)]">
                JPG, PNG, or WebP. Stored locally for this preview.
              </small>
            </div>
            <div className="field-label md:col-span-2">
              <span>Stock by size</span>
              <div className="grid gap-3 sm:grid-cols-3">
                {(["250 g", "500 g", "1 kg"] as const).map((size) => (
                  <label className="text-xs text-[var(--mist)]" key={size}>
                    {size}
                    <input
                      className="field-input mt-2"
                      value={stock[size] ?? "0"}
                      onChange={(event) =>
                        setStock((current) => ({
                          ...current,
                          [size]: event.target.value,
                        }))
                      }
                      type="number"
                      min="0"
                      required
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button type="submit">
              {saved ? (
                <>
                  <Check className="size-4" />
                  Saved
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Save product
                </>
              )}
            </Button>
            {slug && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  if (window.confirm(`Delete ${name}?`)) {
                    deleteProduct(slug);
                    router.push("/admin/products");
                  }
                }}
              >
                <Trash2 className="size-4" />
                Delete
              </Button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
