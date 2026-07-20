"use client";
import Image from "next/image";

export function Splash() {
  return (
    <div style={{ position:"fixed", inset:0, background:"#4A1320", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", zIndex:9999 }}>
      <style>{`
        @keyframes srjRing   { from{opacity:0;transform:scale(0.2)} to{opacity:1;transform:scale(1)} }
        @keyframes srjLogo   { from{opacity:0;transform:scale(0.4) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes srjWord   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes srjBar    { from{width:0} to{width:100%} }
        @keyframes srjPulse  { 0%,100%{box-shadow:0 0 28px rgba(201,152,26,.3)} 50%{box-shadow:0 0 56px rgba(201,152,26,.65)} }
      `}</style>
      {[340,240,150].map((sz,i) => (
        <div key={i} style={{ position:"absolute", width:sz*2, height:sz*2, borderRadius:"50%", border:`1px solid rgba(201,152,26,${0.35-i*0.1})`, animation:`srjRing ${0.85+i*0.22}s cubic-bezier(.22,1,.36,1) both`, animationDelay:`${0.1+i*0.18}s` }} />
      ))}
      <div style={{ animation:"srjLogo .85s cubic-bezier(.34,1.56,.64,1) .35s both", marginBottom:20 }}>
        <div style={{ width:90, height:90, borderRadius:"50%", border:"3px solid #C9981A", overflow:"hidden", animation:"srjPulse 2s ease-in-out 1.2s infinite" }}>
          <Image src="/images/logo.jpeg" alt="SRJ Gold" width={90} height={90} priority style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center" }} />
        </div>
      </div>
      <div style={{ animation:"srjWord .65s ease .9s both", textAlign:"center" }}>
        <div style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontSize:40, fontWeight:600, color:"#E0B428", letterSpacing:"0.06em" }}>SRJ Gold</div>
        <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:11, color:"rgba(247,242,232,.48)", letterSpacing:"0.2em", textTransform:"uppercase", marginTop:5 }}>Spices</div>
      </div>
      <div style={{ animation:"srjWord .65s ease 1.5s both", fontFamily:"var(--font-cormorant),Georgia,serif", fontStyle:"italic", fontSize:16, color:"rgba(247,242,232,.36)", marginTop:14 }}>
        Taste Beyond the Limit
      </div>
      <div style={{ position:"absolute", bottom:54, width:148, height:1.5, background:"rgba(201,152,26,.15)", borderRadius:2, overflow:"hidden" }}>
        <div style={{ height:"100%", background:"linear-gradient(90deg,#C9981A,#E0B428)", animation:"srjBar 3.2s ease .5s both" }} />
      </div>
    </div>
  );
}
