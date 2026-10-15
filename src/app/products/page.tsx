import { db } from "@/db";
import { products } from "@/db/schema";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import type { ProductDTO } from "@/lib/types";

export const dynamic = "force-dynamic";

const categories = ["All", "Cuticle Oils", "Hand Care", "Gift Sets", "Travel"];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const rows = await db.select().from(products).orderBy(products.id);

  const items: ProductDTO[] = rows.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    description: p.description,
    category: p.category,
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    imageUrl: p.imageUrl,
    badge: p.badge,
    rating: p.rating,
    ratingCount: p.ratingCount,
    scent: p.scent,
  }));

  const activeCategory = category && categories.includes(category) ? category : "All";
  const filtered =
    activeCategory === "All" ? items : items.filter((p) => p.category === activeCategory);

  return (
    <div className="flex min-h-screen flex-col bg-cream-50">
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-6 py-14 sm:px-8">
        <div className="text-center">
          <span className="font-script text-3xl text-rose-600">the full collection</span>
          <h1 className="mt-2 font-serif text-3xl font-bold text-ink-800 sm:text-4xl">
            Shop El La&apos;s Nail Bar
          </h1>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => {
            const href = cat === "All" ? "/products" : `/products?category=${encodeURIComponent(cat)}`;
            const active = cat === activeCategory;
            return (
              <a
                key={cat}
                href={href}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-rose-700 text-white shadow-soft"
                    : "bg-white text-ink-700 hover:bg-blush-100"
                }`}
              >
                {cat}
              </a>
            );
          })}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-ink-700/60">No products found in this category yet.</p>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
