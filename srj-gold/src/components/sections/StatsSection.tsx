"use client";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

const STATS = [
  { target:45,   suffix:"+", label:"Years Since 1981" },
  { target:100,  suffix:"%", label:"Stone-Ground Purity" },
  { target:3,    suffix:"+", label:"Signature Spices" },
  { target:1000, suffix:"+", label:"Happy Kitchens" },
];

function StatItem({ target, suffix, label, active }: { target:number;suffix:string;label:string;active:boolean }) {
  const val = useCountUp(target, active);
  return (
    <div style={{ textAlign:"center", padding:"16px 20px" }}>
      <div style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontSize:48, fontWeight:600, color:"#C9981A", lineHeight:1 }}>{val}{suffix}</div>
      <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:11, fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(247,242,232,0.55)", marginTop:8 }}>{label}</div>
    </div>
  );
}

export function StatsSection() {
  const [ref, inView] = useInView(0.3);
  return (
    <>
      <style>{`
        .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); }
        @media(max-width:768px){ .stats-grid{ grid-template-columns:repeat(2,1fr); } }
      `}</style>
      <section ref={ref} style={{ background:"#4A1320", borderTop:"1px solid rgba(201,152,26,0.15)", padding:"40px 24px" }}>
        <div className="stats-grid">
          {STATS.map((s,i) => <StatItem key={i} {...s} active={inView} />)}
        </div>
      </section>
    </>
  );
}
