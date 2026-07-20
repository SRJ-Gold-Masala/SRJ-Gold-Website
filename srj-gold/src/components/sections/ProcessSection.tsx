"use client";
import { useInView } from "@/hooks/useInView";

const STEPS = [
  { num:"01", title:"Farm Sourcing",   desc:"We partner directly with farmers in Karnataka, Rajasthan, and Erode — visiting every season to select the best harvest." },
  { num:"02", title:"Sun Drying",      desc:"Each spice is naturally sun-dried to reduce moisture while locking in essential oils, colour, and aroma." },
  { num:"03", title:"Stone Grinding",  desc:"Traditional stone mills grind at low speed to prevent heat build-up, preserving volatile flavour compounds." },
  { num:"04", title:"Quality Testing", desc:"Every batch is checked for colour, aroma, moisture, and purity before packaging. No shortcuts." },
];

export function ProcessSection() {
  const [hRef, hInView] = useInView(0.1);
  return (
    <>
      <style>{`
        .process-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; }
        @media(max-width:768px){ .process-grid{ grid-template-columns:1fr 1fr; gap:20px; } }
        @media(max-width:480px){ .process-grid{ grid-template-columns:1fr; } }
      `}</style>
      <section style={{ background:"#F7F2E8", padding:"64px 24px" }}>
        <div ref={hRef} style={{ opacity:hInView?1:0, transform:hInView?"none":"translateY(24px)", transition:"opacity 0.65s ease, transform 0.65s ease", marginBottom:40, textAlign:"center" }}>
          <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:10, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:"#7A6A52", marginBottom:12 }}>How We Do It</div>
          <h2 style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontStyle:"italic", fontSize:32, fontWeight:500, color:"#4A1320", margin:0 }}>The SRJ Gold Process</h2>
        </div>
        <div className="process-grid" style={{ maxWidth:1100, margin:"0 auto" }}>
          {STEPS.map((s,i) => {
            const [ref,inView] = useInView();
            return (
              <div key={i} ref={ref} style={{ opacity:inView?1:0, transform:inView?"none":"translateY(24px)", transition:`opacity 0.65s ease ${i*120}ms, transform 0.65s ease ${i*120}ms` }}>
                <div style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontSize:36, fontWeight:600, color:"rgba(201,152,26,0.25)", marginBottom:12 }}>{s.num}</div>
                <div style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontSize:18, fontWeight:500, color:"#4A1320", marginBottom:8 }}>{s.title}</div>
                <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:12, fontWeight:300, color:"#7A6A52", lineHeight:1.7 }}>{s.desc}</div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
