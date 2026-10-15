"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { LocationDTO } from "@/lib/types";

export function LocationModal({
  isOpen,
  locations,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  locations: LocationDTO[];
  onClose: () => void;
  onConfirm: (location: LocationDTO) => void;
}) {
  const [selectedId, setSelectedId] = useState<number | null>(locations[0]?.id ?? null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-ink-800/50 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg rounded-t-[2rem] bg-white p-6 shadow-soft sm:rounded-[2rem] sm:p-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-script text-2xl text-rose-600">almost there</span>
                <h3 className="font-serif text-xl font-bold text-ink-800">
                  Choose your pickup location
                </h3>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-blush-100 text-ink-700 transition hover:bg-blush-200"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <p className="mt-2 text-sm text-ink-700/70">
              We hand-prepare every order fresh. Pick the Florida studio closest to you and we&apos;ll
              have it ready.
            </p>

            <div className="mt-5 space-y-3">
              {locations.map((loc) => {
                const active = selectedId === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedId(loc.id)}
                    className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${
                      active
                        ? "border-rose-600 bg-blush-100 shadow-sm"
                        : "border-blush-200 bg-white hover:border-rose-300"
                    }`}
                  >
                    <span
                      className={`mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 ${
                        active ? "border-rose-600 bg-rose-600" : "border-blush-300"
                      }`}
                    >
                      {active && <span className="h-2 w-2 rounded-full bg-white" />}
                    </span>
                    <span>
                      <span className="block font-serif font-semibold text-ink-800">{loc.name}</span>
                      <span className="mt-0.5 block text-sm text-ink-700/70">
                        {loc.addressLine}, {loc.city}, {loc.state} {loc.zip}
                      </span>
                      <span className="mt-0.5 block text-xs text-gold-600">{loc.hours}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              disabled={!selectedId}
              onClick={() => {
                const loc = locations.find((l) => l.id === selectedId);
                if (loc) onConfirm(loc);
              }}
              className="mt-6 w-full rounded-full bg-rose-700 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-rose-800 disabled:opacity-50"
            >
              Confirm &amp; go to cart
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
