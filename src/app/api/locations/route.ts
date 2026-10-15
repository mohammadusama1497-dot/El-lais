import { NextResponse } from "next/server";
import { db } from "@/db";
import { locations } from "@/db/schema";

export async function GET() {
  const rows = await db.select().from(locations).orderBy(locations.id);
  return NextResponse.json({ locations: rows });
}
