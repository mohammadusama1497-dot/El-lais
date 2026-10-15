import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-rose-800 text-blush-100">
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-rose-700/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-el-las.png"
              alt="El La's Nail Bar"
              width={52}
              height={52}
              className="h-12 w-12 rounded-full object-cover"
            />
            <p className="font-script text-2xl text-white">El La&apos;s</p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-blush-200">
            Boutique nail care rituals, hand-blended in Florida. Nourishing oils, lotions and
            treatments made to help your hands feel as good as they look.
          </p>
          <div className="mt-5 flex gap-3">
            {["IG", "TT", "FB"].map((social) => (
              <a
                key={social}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-xs font-semibold transition hover:bg-white hover:text-rose-700"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-serif text-sm font-semibold uppercase tracking-wide text-gold-400">Shop</p>
          <ul className="mt-4 space-y-2 text-sm text-blush-200">
            <li><Link href="/products?category=Cuticle+Oils" className="transition hover:text-white">Cuticle Oils</Link></li>
            <li><Link href="/products?category=Hand+Care" className="transition hover:text-white">Hand Care</Link></li>
            <li><Link href="/products?category=Gift+Sets" className="transition hover:text-white">Gift Sets</Link></li>
            <li><Link href="/products?category=Travel" className="transition hover:text-white">Travel Minis</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-serif text-sm font-semibold uppercase tracking-wide text-gold-400">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-blush-200">
            <li><Link href="/#about" className="transition hover:text-white">Our Ritual</Link></li>
            <li><Link href="/#locations" className="transition hover:text-white">Our Locations</Link></li>
            <li><Link href="/cart" className="transition hover:text-white">Your Cart</Link></li>
            <li><a href="#" className="transition hover:text-white">Book an Appointment</a></li>
          </ul>
        </div>

        <div>
          <p className="font-serif text-sm font-semibold uppercase tracking-wide text-gold-400">Visit us in Florida</p>
          <ul className="mt-4 space-y-3 text-sm text-blush-200">
            <li>📍 Brickell, Miami, FL 33131</li>
            <li>📍 Las Olas, Fort Lauderdale, FL 33301</li>
            <li>✉️ hello@ellasnailbar.com</li>
            <li>📞 (305) 555-0142</li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/15 py-5 text-center text-xs text-blush-200/80">
        © {new Date().getFullYear()} El La&apos;s Nail Bar. All rights reserved. Made with 💅 in Florida.
      </div>
    </footer>
  );
}
