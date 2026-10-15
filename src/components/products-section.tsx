import { db } from "@/db";
import { products } from "@/db/schema";
import { ProductCard } from "./product-card";
import { AnimatedSection } from "./animated-section";
import type { ProductDTO } from "@/lib/types";

export async function ProductsSection() {
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

  return (
    <AnimatedSection id="products" className="relative bg-blush-50 py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="font-script text-3xl text-rose-600">our collection</span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-ink-800 sm:text-4xl">
            Shop El La&apos;s Essentials
          </h2>
          <p className="mt-3 max-w-xl text-sm text-ink-700/70">
            Six nourishing staples made with organic, nutrient-rich oils. Pick a scent, add to
            cart, choose your nearest Florida location, and we&apos;ll have it ready for pickup.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
