import {
  pgTable,
  serial,
  text,
  integer,
  numeric,
  timestamp,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull().default(""),
  description: text("description").notNull().default(""),
  category: text("category").notNull().default("Cuticle Oils"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  compareAtPrice: numeric("compare_at_price", { precision: 10, scale: 2 }),
  imageUrl: text("image_url").notNull(),
  badge: text("badge"),
  rating: numeric("rating", { precision: 2, scale: 1 }).notNull().default("4.8"),
  ratingCount: integer("rating_count").notNull().default(0),
  scent: text("scent").notNull().default(""),
  isFeatured: boolean("is_featured").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  addressLine: text("address_line").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull().default("FL"),
  zip: text("zip").notNull(),
  phone: text("phone").notNull(),
  hours: text("hours").notNull(),
  mapUrl: text("map_url"),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  addressLine: text("address_line").notNull(),
  city: text("city").notNull(),
  zip: text("zip").notNull(),
  notes: text("notes"),
  locationId: integer("location_id").references(() => locations.id),
  items: jsonb("items").notNull(),
  subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type Location = typeof locations.$inferSelect;
export type Order = typeof orders.$inferSelect;
