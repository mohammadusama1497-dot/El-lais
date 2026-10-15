import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartClient } from "./cart-client";

export default function CartPage() {
  return (
    <div className="flex min-h-screen flex-col bg-cream-50">
      <SiteHeader />
      <CartClient />
      <SiteFooter />
    </div>
  );
}
