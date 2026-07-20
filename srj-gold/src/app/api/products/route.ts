import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const products = await db.product.findMany({
    where:   { inStock: true },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json({ success:true, data: products });
}
