"use client";

import Image from "next/image";
import { AnimatedItem, AnimatedSection } from "./animated-section";

const pillars = [
  { icon: "🌿", title: "All organic", desc: "Vitamin E, jojoba & camellia oils, nothing synthetic." },
  { icon: "✋", title: "Hand-blended", desc: "Small batches, mixed and bottled by hand in Florida." },
  { icon: "💕", title: "Made with love", desc: "A little oil, a lot of love — in every single bottle." },
];

export function AboutSection() {
  return (
    <AnimatedSection id="about" className="relative overflow-hidden bg-cream-50 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-8 lg:grid-cols-2">
        <AnimatedItem className="relative mx-auto w-full max-w-md">
          <div className="absolute -left-6 -top-6 h-full w-full rounded-[2.5rem] border-2 border-dashed border-rose-300" />
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-soft">
            <Image
              src="/images/post-benefits.jpg"
              alt="Benefits of El La's cuticle oil"
              width={700}
              height={850}
              className="h-full w-full object-cover"
            />
          </div>
        </AnimatedItem>

        <div>
          <span className="font-script text-3xl text-rose-600">our ritual</span>
          <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-ink-800 sm:text-4xl">
            A nail-care ritual rooted in Florida, made for your everyday glow
          </h2>
          <p className="mt-5 leading-relaxed text-ink-700/80">
            El La&apos;s Nail Bar started as a tiny home studio with one simple belief: healthy nails
            start with healthy cuticles. Today we hand-blend our oils and lotions using organic,
            nutrient-rich botanicals, so every manicure — salon or DIY — lasts longer and looks better.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {pillars.map((item, i) => (
              <AnimatedItem key={item.title} delay={i * 0.12} className="rounded-2xl bg-blush-100 p-5 text-center">
                <span className="text-3xl">{item.icon}</span>
                <p className="mt-2 font-serif font-semibold text-ink-800">{item.title}</p>
                <p className="mt-1 text-xs text-ink-700/70">{item.desc}</p>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
