import { notFound } from "next/navigation";
import { db } from "@/db";
import { products, locations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductDetailClient } from "./product-detail-client";
import type { LocationDTO, ProductDTO } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [product] = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  if (!product) {
    notFound();
  }

  const locationRows = await db.select().from(locations).orderBy(locations.id);
  const relatedRows = await db
    .select()
    .from(products)
    .where(eq(products.category, product.category))
    .limit(4);

  const productDto: ProductDTO = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    tagline: product.tagline,
    description: product.description,
    category: product.category,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    imageUrl: product.imageUrl,
    badge: product.badge,
    rating: product.rating,
    ratingCount: product.ratingCount,
    scent: product.scent,
  };

  const locationDtos: LocationDTO[] = locationRows.map((l) => ({
    id: l.id,
    name: l.name,
    addressLine: l.addressLine,
    city: l.city,
    state: l.state,
    zip: l.zip,
    phone: l.phone,
    hours: l.hours,
    mapUrl: l.mapUrl,
  }));

  const relatedDtos: ProductDTO[] = relatedRows
    .filter((p) => p.id !== product.id)
    .slice(0, 3)
    .map((p) => ({
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
    <div className="flex min-h-screen flex-col bg-cream-50">
      <SiteHeader />
      <ProductDetailClient product={productDto} locations={locationDtos} related={relatedDtos} />
      <SiteFooter />
    </div>
  );
}
