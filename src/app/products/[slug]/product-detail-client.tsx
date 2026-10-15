"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/context/cart-context";
import { LocationModal } from "@/components/location-modal";
import { ProductCard } from "@/components/product-card";
import { formatPrice } from "@/lib/format";
import type { LocationDTO, ProductDTO } from "@/lib/types";

export function ProductDetailClient({
  product,
  locations,
  related,
}: {
  product: ProductDTO;
  locations: LocationDTO[];
  related: ProductDTO[];
}) {
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem, setLocation } = useCart();
  const router = useRouter();

  const handleConfirmLocation = (location: LocationDTO) => {
    addItem(product, quantity);
    setLocation(location);
    setIsModalOpen(false);
    setJustAdded(true);
    router.push("/cart");
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
      <nav className="mb-8 text-xs text-ink-700/60">
        <span>Shop</span> <span className="mx-1">/</span>{" "}
        <span>{product.category}</span> <span className="mx-1">/</span>{" "}
        <span className="text-rose-700">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-blush-100 shadow-soft"
        >
          <Image src={product.imageUrl} alt={product.name} fill className="object-cover" priority />
          {product.badge && (
            <span className="absolute left-5 top-5 rounded-full bg-rose-700 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow">
              {product.badge}
            </span>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">
            {product.category} · {product.scent}
          </p>
          <h1 className="mt-3 font-serif text-3xl font-bold text-ink-800 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-lg text-rose-700/90">{product.tagline}</p>

          <div className="mt-4 flex items-center gap-2 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < Math.round(Number(product.rating)) ? "opacity-100" : "opacity-25"}>
                ★
              </span>
            ))}
            <span className="text-sm text-ink-700/60">
              {product.rating} · {product.ratingCount} reviews
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-serif text-3xl font-bold text-rose-700">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-lg text-ink-700/40 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-ink-700/80">{product.description}</p>

          <div className="hand-divider my-7" />

          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-center rounded-full border border-blush-300 bg-white">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="h-11 w-11 text-lg text-rose-700 transition hover:text-rose-800"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-10 text-center font-semibold text-ink-800">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="h-11 w-11 text-lg text-rose-700 transition hover:text-rose-800"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsModalOpen(true)}
              className="flex-1 rounded-full bg-rose-700 px-8 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:bg-rose-800 sm:flex-none"
            >
              Add to Cart — {formatPrice(Number(product.price) * quantity)}
            </motion.button>
          </div>

          {justAdded && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm font-medium text-rose-700"
            >
              Added to your cart! Redirecting…
            </motion.p>
          )}

          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm text-ink-700/75">
            <li className="flex items-center gap-2">🌿 100% organic oils</li>
            <li className="flex items-center gap-2">🚫 Cruelty-free</li>
            <li className="flex items-center gap-2">📍 Florida pickup</li>
            <li className="flex items-center gap-2">💅 Gel &amp; acrylic safe</li>
          </ul>
        </motion.div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-serif text-2xl font-bold text-ink-800">You may also love</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((item, i) => (
              <ProductCard key={item.id} product={item} index={i} />
            ))}
          </div>
        </section>
      )}

      <LocationModal
        isOpen={isModalOpen}
        locations={locations}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmLocation}
      />
    </main>
  );
}
