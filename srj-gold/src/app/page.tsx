import { db } from "@/lib/db";
import { HomeClient } from "@/components/sections/HomeClient";
import type { Product } from "@/types";

// Revalidate every 60 s (ISR) — fast page, data always fresh
export const revalidate = 60;

async function getProducts(): Promise<Product[]> {
  const rows = await db.product.findMany({
    where:   { inStock: true },
    orderBy: { sortOrder: "asc" },
  });
  return rows.map((p) => ({
    ...p,
    category:  p.category as Product["category"],
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));
}

export default async function HomePage() {
  const products = await getProducts();
  return <HomeClient products={products} />;
}
