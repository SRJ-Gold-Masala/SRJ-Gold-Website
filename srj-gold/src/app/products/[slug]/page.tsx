import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ProductDetail } from "./ProductDetail";
import type { Product } from "@/types";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await db.product.findMany({ select:{ slug:true } });
  return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug:string } }) {
  const p = await db.product.findUnique({ where:{ slug: params.slug } });
  return { title: p?.name ?? "Product" };
}

export default async function ProductPage({ params }: { params: { slug:string } }) {
  const row = await db.product.findUnique({ where:{ slug: params.slug } });
  if (!row) notFound();
  const product: Product = { ...row, category: row.category as Product["category"], createdAt: row.createdAt.toISOString(), updatedAt: row.updatedAt.toISOString() };
  return (
    <>
      <Nav />
      <ProductDetail product={product} />
      <Footer />
    </>
  );
}
