export type Product = {
  slug: string;
  name: string;
  eyebrow: string;
  origin: string;
  process: string;
  roast: "Light" | "Medium" | "Medium dark";
  price: number;
  notes: string[];
  description: string;
  image: string;
  accent: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "morning-no-01",
    name: "Morning No. 01",
    eyebrow: "The quiet one",
    origin: "Brazil, Cerrado",
    process: "Natural",
    roast: "Medium",
    price: 18,
    notes: ["Chocolate", "Caramel", "Almond"],
    description:
      "A soft, generous cup built for slow mornings and forgiving brews.",
    image: "/assets/hero-ending.jpg",
    accent: "#c56b48",
    featured: true,
  },
  {
    slug: "highland-no-02",
    name: "Highland No. 02",
    eyebrow: "The bright one",
    origin: "Ethiopia, Guji",
    process: "Washed",
    roast: "Light",
    price: 22,
    notes: ["Bergamot", "Peach", "Honey"],
    description:
      "A lifted, fragrant coffee with a clean finish and a little morning sun.",
    image: "/assets/bloom-frame.jpg",
    accent: "#d89a5b",
  },
  {
    slug: "ember-no-03",
    name: "Ember No. 03",
    eyebrow: "The deep one",
    origin: "Colombia, Huila",
    process: "Honey",
    roast: "Medium dark",
    price: 20,
    notes: ["Cacao", "Fig", "Brown sugar"],
    description:
      "Dense sweetness for espresso, milk drinks, and evenings that run late.",
    image: "/assets/roast-frame.jpg",
    accent: "#8d4a36",
  },
  {
    slug: "three-mornings-set",
    name: "Three Mornings",
    eyebrow: "The tasting set",
    origin: "Three origins",
    process: "Mixed process",
    roast: "Medium",
    price: 38,
    notes: ["Three 100 g bags", "Brew cards", "Gift wrap"],
    description:
      "A guided tasting through the soft, bright, and deep sides of MATHAQ.",
    image: "/assets/hero-static.jpg",
    accent: "#9b6f56",
  },
];

export async function getProducts() {
  await new Promise((resolve) => setTimeout(resolve, 180));
  return products;
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
