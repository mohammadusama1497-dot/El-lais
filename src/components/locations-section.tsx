import { db } from "@/db";
import { locations } from "@/db/schema";
import { AnimatedItem, AnimatedSection } from "./animated-section";

export async function LocationsSection() {
  const rows = await db.select().from(locations).orderBy(locations.id);

  return (
    <AnimatedSection id="locations" className="bg-rose-700 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="text-center">
          <span className="font-script text-3xl text-blush-200">find us</span>
          <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">Our Florida Studios</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-blush-100/90">
            Order online and pick up fresh from either of our two boutique studios in South Florida.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {rows.map((loc, i) => (
            <AnimatedItem
              key={loc.id}
              delay={i * 0.12}
              className="rounded-[2rem] border border-white/20 bg-white/10 p-7 backdrop-blur-sm transition hover:bg-white/15"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-xl">
                📍
              </span>
              <h3 className="mt-4 font-serif text-xl font-semibold">{loc.name}</h3>
              <p className="mt-2 text-sm text-blush-100/90">
                {loc.addressLine}
                <br />
                {loc.city}, {loc.state} {loc.zip}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-blush-100/90">
                <span>📞 {loc.phone}</span>
                <span>🕑 {loc.hours}</span>
              </div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
