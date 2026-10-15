"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/cart-context";
import { LocationModal } from "@/components/location-modal";
import { formatPrice } from "@/lib/format";
import type { LocationDTO } from "@/lib/types";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  zip: string;
  notes: string;
};

const initialForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  addressLine: "",
  city: "",
  zip: "",
  notes: "",
};

export function CartClient() {
  const { items, location, isHydrated, updateQuantity, removeItem, setLocation, subtotal, clearCart } =
    useCart();
  const [locations, setLocations] = useState<LocationDTO[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{ orderNumber: string } | null>(null);

  useEffect(() => {
    fetch("/api/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data.locations ?? []))
      .catch(() => setLocations([]));
  }, []);

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);

    if (!location) {
      setErrors("Please choose a pickup location for your order.");
      return;
    }
    if (items.length === 0) {
      setErrors("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          locationId: location.id,
          items: items.map((item) => ({
            productId: item.productId,
            slug: item.slug,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setConfirmedOrder({ orderNumber: data.order.orderNumber });
      clearCart();
      setForm(initialForm);
    } catch {
      setErrors("We couldn't reach the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isHydrated) {
    return <div className="mx-auto max-w-6xl px-6 py-24 text-center text-ink-700/60">Loading your cart…</div>;
  }

  if (confirmedOrder) {
    return (
      <main className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 14 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-100 text-4xl"
        >
          🎉
        </motion.div>
        <h1 className="mt-6 font-serif text-3xl font-bold text-ink-800">Order received!</h1>
        <p className="mt-3 text-ink-700/70">
          Thank you! Your order <span className="font-semibold text-rose-700">#{confirmedOrder.orderNumber}</span>{" "}
          has been placed. We&apos;ll have it ready for pickup and will reach out by email with updates.
        </p>
        <Link
          href="/products"
          className="mt-8 rounded-full bg-rose-700 px-7 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-rose-800"
        >
          Continue shopping
        </Link>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
        <span className="text-6xl">🛍️</span>
        <h1 className="mt-6 font-serif text-3xl font-bold text-ink-800">Your cart is empty</h1>
        <p className="mt-3 text-ink-700/70">
          Looks like you haven&apos;t added any nail-care goodies yet. Explore our collection to get started.
        </p>
        <Link
          href="/products"
          className="mt-8 rounded-full bg-rose-700 px-7 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-rose-800"
        >
          Shop the collection
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
      <h1 className="font-serif text-3xl font-bold text-ink-800">Your Cart</h1>
      <p className="mt-2 text-ink-700/70">Review your items, confirm your pickup spot, and check out.</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.productId}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card"
                >
                  <div className="relative h-20 w-20 flex-none overflow-hidden rounded-xl bg-blush-100">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-serif font-semibold text-ink-800">{item.name}</p>
                    <p className="text-sm text-rose-700">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center rounded-full border border-blush-300">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="h-9 w-9 text-rose-700"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="h-9 w-9 text-rose-700"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <p className="w-20 text-right font-semibold text-ink-800">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-ink-700/40 transition hover:text-rose-700"
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-8 rounded-2xl bg-white p-5 shadow-card">
            <div className="flex items-center justify-between">
              <p className="font-serif font-semibold text-ink-800">Pickup location</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-sm font-semibold text-rose-700 underline-offset-2 hover:underline"
              >
                {location ? "Change" : "Select location"}
              </button>
            </div>
            {location ? (
              <div className="mt-2 text-sm text-ink-700/75">
                <p className="font-semibold text-ink-800">{location.name}</p>
                <p>{location.addressLine}, {location.city}, {location.state} {location.zip}</p>
                <p className="text-gold-600">{location.hours}</p>
              </div>
            ) : (
              <p className="mt-2 text-sm text-ink-700/60">No location selected yet.</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-8 rounded-2xl bg-white p-6 shadow-card">
            <h2 className="font-serif text-xl font-semibold text-ink-800">Your details</h2>
            <p className="mt-1 text-sm text-ink-700/60">We&apos;ll use this to confirm your pickup order.</p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" required>
                <input
                  required
                  value={form.fullName}
                  onChange={handleChange("fullName")}
                  className="input-field"
                  placeholder="Jane Doe"
                />
              </Field>
              <Field label="Email" required>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  className="input-field"
                  placeholder="jane@email.com"
                />
              </Field>
              <Field label="Phone" required>
                <input
                  required
                  value={form.phone}
                  onChange={handleChange("phone")}
                  className="input-field"
                  placeholder="(305) 555-0123"
                />
              </Field>
              <Field label="Zip code" required>
                <input
                  required
                  value={form.zip}
                  onChange={handleChange("zip")}
                  className="input-field"
                  placeholder="33131"
                />
              </Field>
              <Field label="Address" required className="sm:col-span-2">
                <input
                  required
                  value={form.addressLine}
                  onChange={handleChange("addressLine")}
                  className="input-field"
                  placeholder="123 Ocean Drive"
                />
              </Field>
              <Field label="City" required className="sm:col-span-2">
                <input
                  required
                  value={form.city}
                  onChange={handleChange("city")}
                  className="input-field"
                  placeholder="Miami"
                />
              </Field>
              <Field label="Order notes (optional)" className="sm:col-span-2">
                <textarea
                  value={form.notes}
                  onChange={handleChange("notes")}
                  className="input-field min-h-[90px]"
                  placeholder="Any preferences or notes for your order…"
                />
              </Field>
            </div>

            {errors && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 rounded-xl bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700"
              >
                {errors}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full rounded-full bg-rose-700 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:bg-rose-800 disabled:opacity-60"
            >
              {isSubmitting ? "Placing your order…" : "Place order"}
            </motion.button>
          </form>
        </div>

        <div className="h-fit rounded-2xl bg-white p-6 shadow-card">
          <h2 className="font-serif text-xl font-semibold text-ink-800">Order summary</h2>
          <div className="mt-4 space-y-3 text-sm text-ink-700/75">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Pickup</span>
              <span className="text-rose-700">Free</span>
            </div>
          </div>
          <div className="hand-divider my-4" />
          <div className="flex justify-between font-serif text-lg font-bold text-ink-800">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <p className="mt-4 text-xs text-ink-700/50">
            Pay in-store at pickup. We accept card, Apple Pay and cash at both Florida locations.
          </p>
        </div>
      </div>

      <LocationModal
        isOpen={isModalOpen}
        locations={locations}
        onClose={() => setIsModalOpen(false)}
        onConfirm={(loc) => {
          setLocation(loc);
          setIsModalOpen(false);
        }}
      />
    </main>
  );
}

function Field({
  label,
  required,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 text-sm font-medium text-ink-700 ${className ?? ""}`}>
      <span>
        {label} {required && <span className="text-rose-600">*</span>}
      </span>
      {children}
    </label>
  );
}
