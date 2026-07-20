import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";

const Schema = z.object({
  name:        z.string().min(2),
  category:    z.enum(["GROUND_MASALA","WHOLE_SPICE","BLENDED_MIX","PREMIUM_RANGE"]),
  weight:      z.string().min(1),
  description: z.string().min(10),
  badge:       z.string().optional(),
  imageUrl:    z.string().url(),
  accentColor: z.string().optional(),
  sortOrder:   z.number().optional(),
});

export async function GET() {
  await requireAdmin();
  const products = await db.product.findMany({ orderBy:{ sortOrder:"asc" } });
  return NextResponse.json({ success:true, data: products });
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const data = Schema.parse(body);
    const slug = slugify(data.name);
    const product = await db.product.create({
      data: { ...data, slug, badge: data.badge || null, accentColor: data.accentColor || "#888888" },
    });
    return NextResponse.json({ success:true, data: product }, { status:201 });
  } catch (err: any) {
    return NextResponse.json({ success:false, error: err.message }, { status:400 });
  }
}
