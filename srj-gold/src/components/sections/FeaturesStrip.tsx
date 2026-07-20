"use client";
import { useInView } from "@/hooks/useInView";

const FEATURES = [
  ["100% Pure","No additives, ever"],
  ["Stone-Ground","Preserves natural oils"],
  ["Since 1981","4 decades of trust"],
  ["Pan-India","Best farm sources"],
];

export function FeaturesStrip() {
  const [ref, inView] = useInView();
  return (
    <>
      <style>{`
        .features-grid { display:flex; }
        @media(max-width:768px){ .features-grid{ display:grid; grid-template-columns:1fr 1fr; } .feature-item{ border-right:none !important; border-bottom:1px solid #EDE3CC; } }
      `}</style>
      <section ref={ref} style={{ background:"#FBF5E4", borderTop:"1px solid #EDE3CC", borderBottom:"1px solid #EDE3CC", padding:"0", opacity:inView?1:0, transform:inView?"none":"translateY(20px)", transition:"opacity 0.65s ease, transform 0.65s ease" }}>
        <div className="features-grid">
          {FEATURES.map(([h,s],i) => (
            <div key={i} className="feature-item" style={{ flex:1, textAlign:"center", borderRight:i<FEATURES.length-1?"1px solid #EDE3CC":"none", padding:"16px 12px" }}>
              <div style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontSize:15, fontWeight:500, color:"#4A1320" }}>{h}</div>
              <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:11, color:"#7A6A52", marginTop:3 }}>{s}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
