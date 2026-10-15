"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-blush-100">
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-80 w-80 rounded-full bg-rose-300/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-15%] right-[-5%] h-96 w-96 rounded-full bg-gold-400/30 blur-3xl" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-10 top-24 text-5xl"
        animate={{ y: [0, -16, 0], rotate: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      >
        💅
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-16 bottom-16 text-4xl"
        animate={{ y: [0, 14, 0], rotate: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }}
      >
        🌸
      </motion.div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:px-8 md:py-24 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-rose-700 shadow-sm">
            Hand-blended in Florida
          </span>
          <h1 className="mt-6 font-serif text-[clamp(2.4rem,5.5vw,4.2rem)] font-bold leading-[1.05] text-ink-800">
            Healthy nails,
            <br />
            <span className="font-script text-shimmer text-[1.3em] font-normal">a little oil,</span>
            <br />
            a lot of love.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-700/80">
            El La&apos;s Nail Bar is a boutique nail-care ritual brand — nourishing cuticle oils,
            hand creams and gift sets made with organic, nutrient-rich botanicals. Shop our
            signature collection or stop by one of our Florida locations.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#products"
              className="group relative overflow-hidden rounded-full bg-rose-700 px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Shop the collection
            </Link>
            <Link
              href="#about"
              className="rounded-full border border-rose-300 px-7 py-3.5 text-sm font-semibold text-rose-700 transition hover:bg-white"
            >
              Our ritual
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-ink-700/70">
            <div>
              <p className="font-serif text-xl font-bold text-rose-700">4.9★</p>
              <p>500+ reviews</p>
            </div>
            <div className="h-8 w-px bg-ink-700/20" />
            <div>
              <p className="font-serif text-xl font-bold text-rose-700">100%</p>
              <p>Organic oils</p>
            </div>
            <div className="h-8 w-px bg-ink-700/20" />
            <div>
              <p className="font-serif text-xl font-bold text-rose-700">2</p>
              <p>Florida locations</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative mx-auto flex h-[320px] w-[320px] items-center justify-center sm:h-[420px] sm:w-[420px]"
        >
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-dashed border-rose-400/40"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          />
          <div className="absolute inset-6 rounded-full bg-white shadow-soft" />
          <Image
            src="/images/logo-el-las.png"
            alt="El La's Nail Bar logo"
            width={360}
            height={360}
            className="relative h-[85%] w-[85%] rounded-full object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
