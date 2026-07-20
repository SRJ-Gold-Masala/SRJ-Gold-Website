"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { categoryLabel } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";

const C = { maroon:"#4A1320", gold:"#C9981A", goldBr:"#E0B428", cream:"#F7F2E8", goldPale:"#FBF5E4", creamDk:"#EDE3CC", ink:"#1A1209", muted:"#7A6A52" };
const serif = "var(--font-cormorant),Georgia,serif";
const sans  = "var(--font-dm-sans),sans-serif";
const CATS  = ["All","GROUND_MASALA","WHOLE_SPICE","BLENDED_MIX","PREMIUM_RANGE"];
const SLIDE_BG = ["#2C0A0A","#2A1E00","#0E1F08","#4A1320"];

function ProductShowcaseSlider({ products }: { products:Product[] }) {
  const [idx, setIdx]         = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef              = useRef<ReturnType<typeof setInterval>>();
  const pendingRef            = useRef<ReturnType<typeof setTimeout>>();

  const goto = useCallback((next:number) => {
    if (pendingRef.current) return;
    setVisible(false);
    pendingRef.current = setTimeout(() => { setIdx(next); setVisible(true); pendingRef.current = undefined; }, 380);
    clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setVisible(false);
      pendingRef.current = setTimeout(() => {
        setIdx(i => (i+1)%products.length);
        setVisible(true); pendingRef.current = undefined;
      }, 380);
    }, 5500);
    return () => { clearInterval(timerRef.current); if(pendingRef.current) clearTimeout(pendingRef.current); };
  }, [products.length]);

  if (!products.length) return null;
  const p  = products[idx];
  const bg = SLIDE_BG[idx % SLIDE_BG.length];

  return (
    <>
      <style>{`
        @keyframes srjFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-13px)} }
        .slider-layout { display:flex; align-items:center; padding:0 52px; }
        .slider-img    { flex:0 0 50%; display:flex; align-items:center; justify-content:center; }
        @media(max-width:768px){
          .slider-layout { flex-direction:column-reverse; padding:28px 20px 20px; }
          .slider-img    { flex:none; margin-bottom:16px; }
          .slider-img img{ max-height:200px !important; }
          .slider-h1     { font-size:28px !important; }
          .slider-sub    { font-size:12px !important; }
          .slider-btns   { flex-wrap:wrap; gap:10px; }
        }
      `}</style>
      <div style={{ position:"relative", height:"auto", minHeight:380, overflow:"hidden", background:bg, transition:"background 0.5s ease" }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:320, height:320, borderRadius:"50%", border:"1px solid rgba(201,152,26,0.13)", pointerEvents:"none" }} />
        <div className="slider-layout" style={{ position:"relative", zIndex:2, opacity:visible?1:0, transition:"opacity 0.38s ease", padding:"40px 52px" }}>
          {/* Text */}
          <div style={{ flex:"0 0 50%", paddingRight:24 }}>
            <div style={{ fontFamily:sans, fontSize:10, fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase", color:p.accentColor, marginBottom:14 }}>
              {categoryLabel(p.category)}{p.badge?` · ${p.badge}`:""}
            </div>
            <h1 className="slider-h1" style={{ fontFamily:serif, fontStyle:"italic", fontWeight:500, fontSize:40, lineHeight:1.1, color:C.cream, margin:"0 0 16px" }}>{p.name}</h1>
            <p className="slider-sub" style={{ fontFamily:sans, fontSize:13, fontWeight:300, color:"rgba(247,242,232,0.62)", lineHeight:1.78, maxWidth:380, margin:"0 0 24px" }}>{p.description}</p>
            <div className="slider-btns" style={{ display:"flex", gap:12 }}>
              <Link href={`/products/${p.slug}#enquire`} style={{ fontFamily:sans, fontSize:13, fontWeight:500, background:p.accentColor, color:"#fff", padding:"10px 22px", borderRadius:4, textDecoration:"none", display:"inline-block" }}>Enquire now</Link>
              <Link href={`/products/${p.slug}`}         style={{ fontFamily:sans, fontSize:13, color:C.cream, background:"transparent", border:"0.5px solid rgba(247,242,232,0.28)", padding:"10px 20px", borderRadius:4, textDecoration:"none", display:"inline-block" }}>View details</Link>
            </div>
          </div>
          {/* Image */}
          <div className="slider-img">
            <Image src={p.imageUrl} alt={p.name} width={280} height={340} style={{ objectFit:"contain", maxHeight:340, filter:"drop-shadow(0 20px 40px rgba(0,0,0,0.55))", animation:"srjFloat 5s ease-in-out infinite" }} />
          </div>
        </div>
        {/* Arrows */}
        <button onClick={()=>goto((idx-1+products.length)%products.length)} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", zIndex:10, width:36, height:36, borderRadius:"50%", background:"rgba(255,255,255,0.1)", border:"0.5px solid rgba(247,242,232,0.2)", color:C.cream, fontSize:22, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>‹</button>
        <button onClick={()=>goto((idx+1)%products.length)}                style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", zIndex:10, width:36, height:36, borderRadius:"50%", background:"rgba(255,255,255,0.1)", border:"0.5px solid rgba(247,242,232,0.2)", color:C.cream, fontSize:22, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>›</button>
        {/* Dots */}
        <div style={{ position:"absolute", bottom:14, left:"50%", transform:"translateX(-50%)", display:"flex", gap:8, zIndex:10 }}>
          {products.map((_,i)=>(
            <div key={i} onClick={()=>goto(i)} style={{ width:i===idx?22:7, height:7, borderRadius:4, background:i===idx?C.gold:"rgba(247,242,232,0.28)", transition:"all 0.35s ease", cursor:"pointer" }} />
          ))}
        </div>
      </div>
    </>
  );
}

function Card({ p, delay }: { p:Product; delay:number }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref}>
      <Link href={`/products/${p.slug}`} style={{ textDecoration:"none", display:"block", border:"0.5px solid #E8E0D0", borderRadius:10, overflow:"hidden", background:"#fff", opacity:inView?1:0, transform:inView?"none":"translateY(28px)", transition:`opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms, box-shadow 0.25s` }}
        onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.transform="translateY(-4px)";el.style.boxShadow="0 12px 32px rgba(74,19,32,0.12)";}}
        onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.transform="none";el.style.boxShadow="none";}}>
        <div style={{ height:190, background:p.accentColor+"12", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
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
    </div>
  );
}

export function ProductsClient({ products }: { products:Product[] }) {
  const [cat, setCat] = useState("All");
  const [q,   setQ]   = useState("");
  const filtered = products.filter(p => (cat==="All"||p.category===cat) && (q===""||p.name.toLowerCase().includes(q.toLowerCase())));
  return (
    <>
      <style>{`
        .products-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .cat-scroll    { display:flex; gap:8px; flex-wrap:wrap; }
        @media(max-width:768px){
          .products-grid{ grid-template-columns:1fr 1fr; gap:12px; }
          .cat-scroll   { overflow-x:auto; flex-wrap:nowrap; padding-bottom:4px; }
          .cat-scroll::-webkit-scrollbar{ display:none; }
        }
        @media(max-width:480px){ .products-grid{ grid-template-columns:1fr; } }
      `}</style>
      <main style={{ background:"#fff", minHeight:"100vh" }}>
        <ProductShowcaseSlider products={products} />
        <div style={{ background:C.cream, padding:"28px 24px 20px", borderBottom:`0.5px solid ${C.creamDk}` }}>
          <h1 style={{ fontFamily:serif, fontSize:28, fontWeight:500, color:C.ink, margin:"0 0 6px" }}>Our Products</h1>
          <p style={{ fontFamily:sans, fontSize:13, color:C.muted, margin:0 }}>Premium spices sourced from India's finest farms</p>
        </div>
        <div style={{ padding:"20px 24px" }}>
          <div style={{ display:"flex", gap:10, marginBottom:20, alignItems:"center", flexWrap:"wrap" }}>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search spices..."
              style={{ fontFamily:sans, fontSize:12, border:`0.5px solid ${C.creamDk}`, borderRadius:20, padding:"7px 14px", outline:"none", width:180, flexShrink:0 }} />
            <div className="cat-scroll">
              {CATS.map(c=>(
                <button key={c} onClick={()=>setCat(c)} style={{ fontFamily:sans, fontSize:11, fontWeight:500, padding:"6px 14px", borderRadius:20, border:cat===c?"none":`0.5px solid ${C.creamDk}`, background:cat===c?C.maroon:"#F5F0E8", color:cat===c?C.goldPale:C.muted, cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 }}>
                  {c==="All"?"All":categoryLabel(c)}
                </button>
              ))}
            </div>
          </div>
          {filtered.length===0
            ? <div style={{ textAlign:"center", padding:"60px 0", fontFamily:sans, color:C.muted }}>No products found</div>
            : <div className="products-grid">{filtered.map((p,i)=><Card key={p.id} p={p} delay={i*100}/>)}</div>
          }
        </div>
      </main>
    </>
  );
}
