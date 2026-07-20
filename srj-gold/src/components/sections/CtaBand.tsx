"use client";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

export function CtaBand() {
  const [ref, inView] = useInView(0.2);
  return (
    <section style={{ background:"#4A1320", padding:"52px 24px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:-60, right:-60, width:280, height:280, borderRadius:"50%", border:"1px solid rgba(201,152,26,0.1)", pointerEvents:"none" }} />
      <div ref={ref} style={{ textAlign:"center", maxWidth:560, margin:"0 auto", opacity:inView?1:0, transform:inView?"none":"translateY(24px)", transition:"opacity 0.65s ease, transform 0.65s ease" }}>
        <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:10, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:"#C9981A", marginBottom:12 }}>Ready to taste the difference?</div>
        <h2 style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontStyle:"italic", fontSize:32, fontWeight:500, color:"#F7F2E8", margin:"0 0 18px" }}>Taste Beyond the Limit</h2>
        <p style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:13, fontWeight:300, color:"rgba(247,242,232,0.62)", lineHeight:1.8, margin:"0 0 28px" }}>Every packet carries over 40 years of expertise — from selecting the finest raw spices to precise grinding methods that preserve aroma, colour, and flavour exactly as nature intended.</p>
        <Link href="/products" style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:13, fontWeight:500, background:"#C9981A", color:"#4A1320", padding:"12px 28px", borderRadius:4, textDecoration:"none", display:"inline-block" }}>Shop the range →</Link>
      </div>
    </section>
  );
}
