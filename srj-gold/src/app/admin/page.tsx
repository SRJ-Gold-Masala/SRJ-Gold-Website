import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminClient } from "./AdminClient";

export const metadata = { title:"Admin — Product Management" };

export default async function AdminPage() {
  const session = await getAuth();
  if (!session || (session.user as any)?.role !== "ADMIN") redirect("/auth/signin");
  const products = await db.product.findMany({ orderBy:{ sortOrder:"asc" } });
  const enquiries = await db.enquiry.findMany({ orderBy:{ createdAt:"desc" }, take:50, include:{ product:{ select:{ name:true } } } });
  return <AdminClient
    initialProducts={products.map(p=>({...p,category:p.category as any,createdAt:p.createdAt.toISOString(),updatedAt:p.updatedAt.toISOString()}))}
    initialEnquiries={enquiries.map(e=>({...e,createdAt:e.createdAt.toISOString(),updatedAt:e.updatedAt.toISOString()}))}
  />;
}
