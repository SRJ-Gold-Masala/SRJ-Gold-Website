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

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const p = await db.product.findUnique({
    where: { slug: params.slug },
  });

  if (!p) {
    return {
      title: "Product",
    };
  }

  const imageUrl = `https://srjgoldmasala.com${p.imageUrl}`;

  return {
    title: `${p.name} | SRJ Gold Masala`,
    description:
      p.description ||
      `Buy premium ${p.name} from SRJ Gold Masala. Stone-ground Indian spices with authentic flavour.`,

    alternates: {
      canonical: `https://srjgoldmasala.com/products/${p.slug}`,
    },

    openGraph: {
      title: `${p.name} | SRJ Gold Masala`,
      description:
        p.description ||
        `Premium ${p.name} by SRJ Gold Masala`,
      url: `https://srjgoldmasala.com/products/${p.slug}`,
      images: [
        {
          url: imageUrl,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${p.name} | SRJ Gold Masala`,
      description:
        p.description ||
        `Premium ${p.name}`,
      images: [imageUrl],
    },
  };
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
