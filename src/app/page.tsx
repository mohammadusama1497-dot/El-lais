import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { PostsSection } from "@/components/posts-section";
import { ProductsSection } from "@/components/products-section";
import { AboutSection } from "@/components/about-section";
import { LocationsSection } from "@/components/locations-section";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-cream-50">
      <SiteHeader />
      <Hero />
      <PostsSection />
      <ProductsSection />
      <AboutSection />
      <LocationsSection />
      <SiteFooter />
    </div>
  );
}
