"use client";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

export function FounderNote() {
  const [ref, inView] = useInView(0.2);
  return (
    <section style={{ background:"#FBF5E4", padding:"52px 24px", borderTop:"1px solid #EDE3CC", borderBottom:"1px solid #EDE3CC" }}>
      <div ref={ref} style={{ opacity:inView?1:0, transform:inView?"none":"translateY(24px)", transition:"opacity 0.65s ease, transform 0.65s ease" }}>
        <div style={{ maxWidth:640, margin:"0 auto", textAlign:"center" }}>
          <div style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontSize:56, color:"rgba(74,19,32,0.18)", lineHeight:0.6, marginBottom:12 }}>"</div>
          <p style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontStyle:"italic", fontSize:20, fontWeight:500, color:"#1A1209", lineHeight:1.6, margin:"0 0 20px" }}>
            We started SRJ Gold in 1981 with one belief — that purity shouldn't be a luxury. Forty-five years later, every packet still has to pass the same test: would I serve this in my own kitchen?
          </p>
          <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:12, fontWeight:500, color:"#4A1320", letterSpacing:"0.04em" }}>— Founder, SRJ Gold Spices</div>
          <Link href="/about" style={{ display:"inline-block", marginTop:24, fontFamily:"var(--font-dm-sans),sans-serif", fontSize:12, color:"#4A1320", border:"0.5px solid rgba(74,19,32,0.3)", padding:"10px 22px", borderRadius:4, textDecoration:"none" }}>Read our full story →</Link>
        </div>
      </div>
    </section>
  );
}
