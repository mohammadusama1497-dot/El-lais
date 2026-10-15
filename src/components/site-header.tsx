"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/cart-context";

const megaMenuCategories = [
  {
    title: "Cuticle Oils",
    description: "Daily nail rituals in a pen",
    href: "/products?category=Cuticle+Oils",
    image: "/images/product-rose-cuticle-oil.jpg",
  },
  {
    title: "Hand Care",
    description: "Lotions & creams for soft hands",
    href: "/products?category=Hand+Care",
    image: "/images/product-hand-lotion.jpg",
  },
  {
    title: "Gift Sets",
    description: "Beautifully boxed duos",
    href: "/products?category=Gift+Sets",
    image: "/images/product-gift-set.jpg",
  },
  {
    title: "Travel Minis",
    description: "Nail care on the go",
    href: "/products?category=Travel",
    image: "/images/product-travel-minis.jpg",
  },
];

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Our Ritual", href: "/#about" },
  { label: "Locations", href: "/#locations" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalCount, isHydrated } = useCart();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-cream-50/90 shadow-[0_8px_30px_-15px_rgba(156,74,102,0.35)] backdrop-blur-md"
          : "bg-cream-50/40 backdrop-blur-sm"
      }`}
    >
      <div className="hand-divider" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo-el-las.png"
            alt="El La's Nail Bar"
            width={56}
            height={56}
            className="h-12 w-12 rounded-full object-cover shadow-soft sm:h-14 sm:w-14"
            priority
          />
          <div className="leading-tight">
            <p className="font-script text-2xl text-rose-700 sm:text-3xl">El La&apos;s</p>
            <p className="-mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-gold-600 sm:text-xs">
              Nail Bar
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setIsMegaOpen(true)}
            onMouseLeave={() => setIsMegaOpen(false)}
          >
            <button
              className="flex items-center gap-1 font-medium text-ink-700 transition hover:text-rose-700"
              onClick={() => setIsMegaOpen((v) => !v)}
            >
              Shop
              <motion.span animate={{ rotate: isMegaOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                ⌄
              </motion.span>
            </button>

            <AnimatePresence>
              {isMegaOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="absolute left-1/2 top-full z-50 mt-3 w-[640px] -translate-x-1/2 rounded-3xl border border-blush-200 bg-white p-6 shadow-soft"
                >
                  <div className="grid grid-cols-4 gap-4">
                    {megaMenuCategories.map((cat) => (
                      <Link
                        key={cat.title}
                        href={cat.href}
                        className="group flex flex-col gap-2 rounded-2xl p-2 transition hover:bg-blush-100"
                        onClick={() => setIsMegaOpen(false)}
                      >
                        <div className="relative h-20 w-full overflow-hidden rounded-xl">
                          <Image
                            src={cat.image}
                            alt={cat.title}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-110"
                          />
                        </div>
                        <p className="font-serif text-sm font-semibold text-ink-800">{cat.title}</p>
                        <p className="text-xs text-ink-700/70">{cat.description}</p>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between rounded-2xl bg-blush-100 px-5 py-3">
                    <p className="text-sm text-ink-700">
                      ✨ New: <span className="font-semibold text-rose-700">Vanilla Bloom</span> cuticle oil just dropped
                    </p>
                    <Link
                      href="/products"
                      className="rounded-full bg-rose-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-rose-700"
                      onClick={() => setIsMegaOpen(false)}
                    >
                      Shop all
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-ink-700 transition hover:text-rose-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-blush-300 bg-white text-rose-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            aria-label="View cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none" />
              <circle cx="17" cy="20" r="1.4" fill="currentColor" stroke="none" />
            </svg>
            <AnimatePresence>
              {isHydrated && totalCount > 0 && (
                <motion.span
                  key={totalCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-700 text-[0.65rem] font-bold text-white"
                >
                  {totalCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border border-blush-300 bg-white text-ink-700 lg:hidden"
            onClick={() => setIsMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-blush-200 bg-cream-50 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-2 font-medium text-ink-700 transition hover:bg-blush-100"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <p className="mt-2 px-3 text-xs font-semibold uppercase tracking-wide text-gold-600">Shop</p>
              {megaMenuCategories.map((cat) => (
                <Link
                  key={cat.title}
                  href={cat.href}
                  className="rounded-xl px-3 py-2 text-sm text-ink-700 transition hover:bg-blush-100"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
