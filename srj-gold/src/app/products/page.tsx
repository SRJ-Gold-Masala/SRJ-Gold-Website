import { db } from "@/lib/db";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ProductsClient } from "./ProductsClient";
import type { Product } from "@/types";

export const revalidate = 60;
export const metadata   = { title: "Products" };

async function getProducts(): Promise<Product[]> {
  const rows = await db.product.findMany({ where:{ inStock:true }, orderBy:{ sortOrder:"asc" } });
  return rows.map(p => ({ ...p, category: p.category as Product["category"], createdAt: p.createdAt.toISOString(), updatedAt: p.updatedAt.toISOString() }));
}

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <>
      <Nav />
      <ProductsClient products={products} />
      <Footer />
    </>
  );
}
