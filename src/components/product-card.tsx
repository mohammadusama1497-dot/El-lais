"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ProductDTO } from "@/lib/types";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product, index = 0 }: { product: ProductDTO; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-card transition-shadow duration-500 hover:shadow-soft"
    >
      <Link href={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden bg-blush-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-rose-700 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-white shadow">
            {product.badge}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-ink-800/80 py-3 text-sm font-semibold text-white transition duration-300 group-hover:translate-y-0">
          View &amp; Add to Cart
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold-600">
          {product.category}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif text-lg font-semibold text-ink-800 transition group-hover:text-rose-700">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-ink-700/70">{product.tagline}</p>
        <div className="mt-1 flex items-center gap-1 text-amber-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < Math.round(Number(product.rating)) ? "opacity-100" : "opacity-25"}>
              ★
            </span>
          ))}
          <span className="ml-1 text-xs text-ink-700/60">({product.ratingCount})</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-bold text-rose-700">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-ink-700/40 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          <Link
            href={`/products/${product.slug}`}
            className="rounded-full bg-blush-100 px-4 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-700 hover:text-white"
          >
            Shop now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
