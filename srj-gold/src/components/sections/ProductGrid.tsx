"use client";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import type { Product } from "@/types";
import { categoryLabel } from "@/lib/utils";

const C = { maroon:"#4A1320", gold:"#C9981A", goldPale:"#FBF5E4", ink:"#1A1209", muted:"#7A6A52" };
const serif = "var(--font-cormorant),Georgia,serif";
const sans  = "var(--font-dm-sans),sans-serif";

function ProductCard({ p, delay }: { p:Product; delay:number }) {
  const [ref, inView] = useInView();
  return (
    <Link href={`/products/${p.slug}`} ref={ref} style={{ textDecoration:"none", display:"block", border:"0.5px solid #E8E0D0", borderRadius:10, overflow:"hidden", background:"#fff", opacity:inView?1:0, transform:inView?"none":"translateY(28px)", transition:`opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms, box-shadow 0.25s` }}
      onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.transform="translateY(-4px)";el.style.boxShadow="0 12px 32px rgba(74,19,32,0.12)";}}
      onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.transform="none";el.style.boxShadow="none";}}>
      <div style={{ height:180, background:p.accentColor+"12", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
        <Image src={p.imageUrl} alt={p.name} width={150} height={150} style={{ objectFit:"contain", maxHeight:150, width:"auto" }} />
      </div>
      <div style={{ padding:"14px 16px 16px" }}>
        <div style={{ fontFamily:sans, fontSize:9, fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:4 }}>{categoryLabel(p.category)}</div>
        <div style={{ fontFamily:serif, fontSize:17, fontWeight:500, color:C.ink, lineHeight:1.3, marginBottom:6 }}>{p.name}</div>
        <div style={{ fontFamily:sans, fontSize:11, color:C.muted, lineHeight:1.55, marginBottom:12 }}>{p.description}</div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontFamily:sans, fontSize:11, color:C.muted }}>Net Wt: {p.weight}</span>
          <span style={{ fontFamily:sans, fontSize:11, fontWeight:500, color:C.maroon, background:C.goldPale, border:`0.5px solid ${C.gold}`, padding:"5px 12px", borderRadius:4 }}>Enquire</span>
        </div>
      </div>
    </Link>
  );
}

export function ProductGrid({ products }: { products:Product[] }) {
  const [ref, inView] = useInView();
  return (
    <>
      <style>{`
        .product-grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        @media(max-width:768px){ .product-grid-3{ grid-template-columns:1fr; gap:16px; } }
        @media(min-width:481px) and (max-width:768px){ .product-grid-3{ grid-template-columns:1fr 1fr; } }
      `}</style>
      <section style={{ background:"#fff", padding:"52px 24px" }}>
        <div ref={ref} style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:32, opacity:inView?1:0, transition:"opacity 0.65s ease" }}>
          <div>
            <div style={{ fontFamily:sans, fontSize:10, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>Our Range</div>
            <h2 style={{ fontFamily:serif, fontSize:32, fontWeight:500, color:C.ink, margin:0 }}>Our Spices</h2>
          </div>
          <Link href="/products" style={{ fontFamily:sans, fontSize:12, color:C.maroon, textDecoration:"underline", textUnderlineOffset:3, whiteSpace:"nowrap" }}>View all →</Link>
        </div>
        <div className="product-grid-3">
          {products.slice(0,3).map((p,i) => <ProductCard key={p.id} p={p} delay={i*120} />)}
        </div>
      </section>
    </>
  );
}
