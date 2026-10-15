import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders, locations } from "@/db/schema";
import { eq } from "drizzle-orm";

type OrderItemInput = {
  productId: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type OrderPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  addressLine?: string;
  city?: string;
  zip?: string;
  notes?: string;
  locationId?: number;
  items?: OrderItemInput[];
};

function generateOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ELA-${stamp}-${random}`;
}

export async function POST(request: Request) {
  const body = (await request.json()) as OrderPayload;

  const { fullName, email, phone, addressLine, city, zip, notes, locationId, items } = body;

  if (!fullName || !email || !phone || !addressLine || !city || !zip) {
    return NextResponse.json(
      { error: "Please fill in all required delivery details." },
      { status: 400 }
    );
  }

  if (!locationId) {
    return NextResponse.json(
      { error: "Please select a pickup location." },
      { status: 400 }
    );
  }

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const [location] = await db
    .select()
    .from(locations)
    .where(eq(locations.id, locationId))
    .limit(1);

  if (!location) {
    return NextResponse.json({ error: "Selected location was not found." }, { status: 400 });
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;
  const orderNumber = generateOrderNumber();

  const [order] = await db
    .insert(orders)
    .values({
      orderNumber,
      fullName,
      email,
      phone,
      addressLine,
      city,
      zip,
      notes: notes ?? "",
      locationId,
      items,
      subtotal: subtotal.toFixed(2),
      total: total.toFixed(2),
      status: "pending",
    })
    .returning();

  return NextResponse.json({ order, location }, { status: 201 });
}
