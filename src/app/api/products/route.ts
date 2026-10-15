import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  const rows = await db.select().from(products).orderBy(desc(products.isFeatured), products.id);
  return NextResponse.json({ products: rows });
}
