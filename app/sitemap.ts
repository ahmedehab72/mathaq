import type { MetadataRoute } from "next";
import { products } from "@/features/shop/services/products";
import { journalPosts } from "@/features/content/data/journal";
export default function sitemap(): MetadataRoute.Sitemap { const base = "https://mathaq.coffee"; const routes = ["", "/about", "/shop", "/brew", "/journal", "/contact", "/privacy-policy", "/terms", "/shipping-returns", "/refund-policy", "/subscribe", "/gift-cards"]; return [...routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date() })), ...products.map((product) => ({ url: `${base}/shop/${product.slug}`, lastModified: new Date() })), ...journalPosts.map((post) => ({ url: `${base}/journal/${post.slug}`, lastModified: new Date() }))]; }
