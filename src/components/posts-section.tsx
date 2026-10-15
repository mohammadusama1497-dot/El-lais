"use client";

import Image from "next/image";
import { AnimatedItem, AnimatedSection } from "./animated-section";

const posts = [
  {
    image: "/images/post-appointments.jpg",
    title: "This Week's Appointments",
    excerpt: "Fresh slots just dropped — Mon to Sat. Tap to see the full schedule and book your spot.",
    tag: "Booking",
  },
  {
    image: "/images/post-application.jpg",
    title: "How To: Cuticle Oil Pen",
    excerpt: "A 4-step ritual to healthier nails in under a minute a day. Twist, brush, massage, repeat.",
    tag: "Tutorial",
  },
  {
    image: "/images/post-benefits.jpg",
    title: "Why Cuticle Oil Matters",
    excerpt: "Deep hydration, stronger growth and a healthy shine — here's what our oils do for your nails.",
    tag: "Nail Care 101",
  },
];

export function PostsSection() {
  return (
    <AnimatedSection id="journal" className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
      <div className="flex flex-col items-center text-center">
        <span className="font-script text-3xl text-rose-600">from the studio</span>
        <h2 className="mt-2 font-serif text-3xl font-bold text-ink-800 sm:text-4xl">
          Fresh off our feed
        </h2>
        <p className="mt-3 max-w-xl text-sm text-ink-700/70">
          A peek into our weekly appointments, nail-care tips and the little rituals that keep
          your hands glowing.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {posts.map((post, index) => (
          <AnimatedItem key={post.title} delay={index * 0.12}>
            <article className="group relative overflow-hidden rounded-[2rem] bg-white shadow-card transition duration-500 hover:-translate-y-2 hover:shadow-soft">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-rose-700">
                  {post.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-semibold text-ink-800">{post.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700/70">{post.excerpt}</p>
              </div>
            </article>
          </AnimatedItem>
        ))}
      </div>
    </AnimatedSection>
  );
}
