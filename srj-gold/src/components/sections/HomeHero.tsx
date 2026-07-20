"use client";
import Link from "next/link";
import type { Phase } from "@/types";

const C = { maroon:"#4A1320", gold:"#C9981A", goldBr:"#E0B428", cream:"#F7F2E8" };
const serif = "var(--font-cormorant),Georgia,serif";
const sans  = "var(--font-dm-sans),sans-serif";

export function HomeHero({ phase }: { phase: Phase }) {
  const entered = phase === "ready";
  const tx = (x:number, delay=0) => ({ opacity:entered?1:0, transform:entered?"none":`translateX(${x}px)`, transition:`opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms` });
  const ty = (y:number, delay=0) => ({ opacity:entered?1:0, transform:entered?"none":`translateY(${y}px)`, transition:`opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms` });
  const ring = (delay:number) => ({ opacity:entered?1:0, transform:entered?"scale(1)":"scale(0.7)", transition:`opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.34,1.4,0.64,1) ${delay}ms` });

  return (
    <>
      <style>{`
        .hero-layout { display:flex; align-items:center; padding:0 52px; min-height:520px; }
        .hero-right  { display:flex; flex:0 0 50%; align-items:center; justify-content:center; overflow:hidden; user-select:none; pointer-events:none; height:420px; }
        @media (max-width:768px) {
          .hero-layout { flex-direction:column; padding:40px 24px 32px; min-height:auto; }
          .hero-right  { display:none; }
          .hero-h1     { font-size:36px !important; }
          .hero-sub    { font-size:13px !important; max-width:100% !important; }
          .hero-btns   { flex-wrap:wrap; }
        }
      `}</style>
      <section style={{ background:C.maroon, position:"relative", overflow:"hidden" }}>
        {/* Rings */}
        <div style={{ position:"absolute", top:-60, right:-60, width:340, height:340, borderRadius:"50%", border:"1px solid rgba(201,152,26,0.13)", pointerEvents:"none", ...ring(550) }} />
        <div style={{ position:"absolute", top:-110, right:-110, width:500, height:500, borderRadius:"50%", border:"1px solid rgba(201,152,26,0.07)", pointerEvents:"none", ...ring(700) }} />
        <div style={{ position:"absolute", bottom:-70, left:-70, width:260, height:260, borderRadius:"50%", border:"1px solid rgba(201,152,26,0.08)", pointerEvents:"none", ...ring(850) }} />

        <div className="hero-layout">
          {/* Text */}
          <div style={{ flex:"0 0 50%", zIndex:2, maxWidth:520, paddingRight:32, ...tx(-36) }}>
            <div style={{ fontFamily:sans, fontSize:10, fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase", color:C.gold, marginBottom:16, ...ty(12,100) }}>
              Since 1981 · Trusted by Thousands
            </div>
            <h1 className="hero-h1" style={{ fontFamily:serif, fontStyle:"italic", fontWeight:500, fontSize:52, lineHeight:1.08, color:C.cream, margin:"0 0 20px", ...ty(18,220) }}>
              The gold standard<br/>in <span style={{ color:C.goldBr, fontStyle:"normal" }}>pure spices</span>
            </h1>
            <p className="hero-sub" style={{ fontFamily:sans, fontSize:14, fontWeight:300, color:"rgba(247,242,232,0.65)", lineHeight:1.8, maxWidth:420, margin:"0 0 32px", ...ty(16,360) }}>
              Stone-ground, sun-dried, and hand-packed. SRJ Gold brings the authentic flavours of India to your kitchen — no additives, no compromise, since 1981.
            </p>
            <div className="hero-btns" style={{ display:"flex", gap:12, ...ty(12,480) }}>
              <Link href="/products" style={{ fontFamily:sans, fontSize:13, fontWeight:500, background:C.gold, color:C.maroon, padding:"12px 26px", borderRadius:4, textDecoration:"none", display:"inline-block" }}>Explore products</Link>
              <Link href="/about"    style={{ fontFamily:sans, fontSize:13, color:C.cream, background:"transparent", border:"0.5px solid rgba(247,242,232,0.3)", padding:"12px 24px", borderRadius:4, textDecoration:"none", display:"inline-block" }}>Our story →</Link>
            </div>
          </div>
          {/* Ghost text — hidden on mobile via CSS */}
          <div className="hero-right" style={{ ...tx(36,150) }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", lineHeight:1, textAlign:"center" }}>
              <div style={{ fontFamily:serif, fontWeight:700, fontSize:108, lineHeight:0.85, color:"rgba(201,152,26,0.18)", whiteSpace:"nowrap" }}>SRJ</div>
              <div style={{ fontFamily:serif, fontWeight:600, fontSize:72,  lineHeight:1.05, color:"rgba(201,152,26,0.14)", whiteSpace:"nowrap" }}>GOLD</div>
              <div style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:52, lineHeight:1.15, color:"rgba(247,242,232,0.10)", whiteSpace:"nowrap" }}>Masala</div>
            </div>
            <div style={{ position:"absolute", width:300, height:300, borderRadius:"50%", border:"1px solid rgba(201,152,26,0.10)", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }} />
            <div style={{ position:"absolute", width:200, height:200, borderRadius:"50%", border:"1px solid rgba(201,152,26,0.07)", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }} />
            <div style={{ position:"absolute", top:"18%", right:"14%", width:6, height:6, borderRadius:"50%", background:C.goldBr, opacity:0.55 }} />
            <div style={{ position:"absolute", bottom:"20%", left:"12%", width:4, height:4, borderRadius:"50%", background:C.gold, opacity:0.4 }} />
          </div>
        </div>
      </section>
    </>
  );
}
