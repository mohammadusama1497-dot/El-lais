import "dotenv/config";
import { db, pool } from "@/db";
import { locations, products } from "@/db/schema";

async function main() {
  console.log("Seeding El La's Nail Bar data...");

  await db.delete(products);
  await db.delete(locations);

  await db.insert(locations).values([
    {
      name: "El La's Nail Bar — Brickell",
      addressLine: "1101 Brickell Bay Drive, Suite 200",
      city: "Miami",
      state: "FL",
      zip: "33131",
      phone: "(305) 555-0142",
      hours: "Mon–Sat: 9:00am – 7:00pm",
      mapUrl: "https://maps.google.com/?q=Brickell+Miami+FL",
    },
    {
      name: "El La's Nail Bar — Las Olas",
      addressLine: "215 Las Olas Boulevard",
      city: "Fort Lauderdale",
      state: "FL",
      zip: "33301",
      phone: "(954) 555-0198",
      hours: "Mon–Sat: 9:00am – 6:00pm",
      mapUrl: "https://maps.google.com/?q=Las+Olas+Fort+Lauderdale+FL",
    },
  ]);

  await db.insert(products).values([
    {
      slug: "rose-nail-cuticle-oil",
      name: "Rose Nail & Cuticle Oil Pen",
      tagline: "Deep hydration with a hint of rose",
      description:
        "Our bestselling cuticle oil pen blends vitamin E, jojoba and camellia oils with a soft rose scent. Twist, brush and massage into nails and cuticles daily for stronger, healthier-looking nails.",
      category: "Cuticle Oils",
      price: "18.00",
      compareAtPrice: "22.00",
      imageUrl: "/images/product-rose-cuticle-oil.jpg",
      badge: "Bestseller",
      rating: "4.9",
      ratingCount: 214,
      scent: "Rose",
      isFeatured: true,
    },
    {
      slug: "vanilla-nail-cuticle-oil",
      name: "Vanilla Bloom Cuticle Oil Pen",
      tagline: "Warm vanilla, silky smooth cuticles",
      description:
        "A cozy vanilla-scented cuticle oil pen made with 100% organic, nutrient-rich oils. Softens rough cuticles and leaves nails glossy and conditioned, perfect for natural nails, gel or acrylics.",
      category: "Cuticle Oils",
      price: "18.00",
      imageUrl: "/images/product-vanilla-cuticle-oil.jpg",
      badge: "New",
      rating: "4.8",
      ratingCount: 96,
      scent: "Vanilla",
      isFeatured: true,
    },
    {
      slug: "nourishing-hand-lotion",
      name: "Nourishing Hand Lotion",
      tagline: "All-day softness for busy hands",
      description:
        "A lightweight, fast-absorbing hand lotion infused with shea butter and jojoba oil. Keeps your hands silky soft between salon visits without any greasy residue.",
      category: "Hand Care",
      price: "24.00",
      imageUrl: "/images/product-hand-lotion.jpg",
      badge: null,
      rating: "4.7",
      ratingCount: 58,
      scent: "Soft Floral",
      isFeatured: true,
    },
    {
      slug: "repair-nail-cream",
      name: "Repair Nail & Hand Cream",
      tagline: "Intensive overnight recovery",
      description:
        "A rich, buttery cream formulated with camellia oil and vitamin E to repair dry, cracked cuticles overnight. Wake up to visibly healthier nails and softer hands.",
      category: "Hand Care",
      price: "26.00",
      imageUrl: "/images/product-nail-cream.jpg",
      badge: null,
      rating: "4.8",
      ratingCount: 73,
      scent: "Shea & Honey",
      isFeatured: true,
    },
    {
      slug: "signature-gift-set",
      name: "Signature Duo Gift Set",
      tagline: "Oil + lotion, beautifully boxed",
      description:
        "Treat yourself or a friend with our signature duo: a Rose Cuticle Oil Pen paired with our Nourishing Hand Lotion, wrapped in a satin ribbon gift box.",
      category: "Gift Sets",
      price: "38.00",
      compareAtPrice: "44.00",
      imageUrl: "/images/product-gift-set.jpg",
      badge: "Gift Favorite",
      rating: "5.0",
      ratingCount: 41,
      scent: "Rose & Floral",
      isFeatured: true,
    },
    {
      slug: "travel-mini-trio",
      name: "Travel Mini Oil Trio",
      tagline: "Nail care that fits in your bag",
      description:
        "Three mini cuticle oil pens in Rose, Vanilla and Unscented, perfect for your handbag, gym bag or carry-on. Never miss your daily nail ritual again.",
      category: "Travel",
      price: "21.00",
      imageUrl: "/images/product-travel-minis.jpg",
      badge: "Travel Size",
      rating: "4.6",
      ratingCount: 29,
      scent: "Mixed",
      isFeatured: true,
    },
  ]);

  console.log("Done seeding.");
  await pool.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
