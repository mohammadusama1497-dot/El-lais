import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";

const poppins = localFont({
  src: [
    { path: "../fonts/poppins-300.woff2", weight: "300", style: "normal" },
    { path: "../fonts/poppins-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/poppins-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/poppins-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const playfair = localFont({
  src: [{ path: "../fonts/playfair-variable.woff2", weight: "500 800", style: "normal" }],
  variable: "--font-playfair",
  display: "swap",
});

const dancingScript = localFont({
  src: [{ path: "../fonts/dancing-script-variable.woff2", weight: "500 700", style: "normal" }],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "El La's Nail Bar | Nourishing Nail & Cuticle Care",
  description:
    "El La's Nail Bar — boutique nail care rituals and nourishing cuticle oils, hand-blended in Florida. Shop our signature oils, book your appointment, and glow from your fingertips.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable} ${dancingScript.variable}`}>
      <body className="bg-cream-50 text-ink-800 antialiased selection:bg-rose-200">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
