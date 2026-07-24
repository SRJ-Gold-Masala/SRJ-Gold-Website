"use client";
import Image from "next/image";

export function Splash() {
  return (
    <div style={{
      position:"fixed", inset:0, background:"#4A1320",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      zIndex:9999,
      // Prevent any white showing through
      overflow:"hidden",
    }}>
      <style>{`
        @keyframes srjRing  { from{opacity:0;transform:scale(0.2)} to{opacity:1;transform:scale(1)} }
        @keyframes srjLogo  { from{opacity:0;transform:scale(0.4) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes srjWord  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes srjBar   { from{width:0} to{width:100%} }
        @keyframes srjPulse { 0%,100%{box-shadow:0 0 28px rgba(201,152,26,.3)} 50%{box-shadow:0 0 56px rgba(201,152,26,.65)} }
        /* Mobile ring sizes */
        @media(max-width:480px){
          .splash-ring-0{ width:280px !important; height:280px !important; }
          .splash-ring-1{ width:200px !important; height:200px !important; }
          .splash-ring-2{ width:130px !important; height:130px !important; }
        }
      `}</style>

      {/* Rings */}
      {[{size:340,op:0.35,d:0.1,delay:0.1},{size:240,op:0.25,d:0.22,delay:0.28},{size:150,op:0.18,d:0.22,delay:0.46}].map((r,i)=>(
        <div key={i} className={`splash-ring-${i}`} style={{
          position:"absolute",
          width:r.size*2, height:r.size*2, borderRadius:"50%",
          border:`1px solid rgba(201,152,26,${r.op})`,
          animation:`srjRing ${0.85+r.d}s cubic-bezier(.22,1,.36,1) both`,
          animationDelay:`${r.delay}s`,
        }} />
      ))}

      {/* Logo — fixed square container, objectFit cover */}
      <div style={{
        animation:"srjLogo .85s cubic-bezier(.34,1.56,.64,1) .35s both",
        marginBottom:20, flexShrink:0,
      }}>
        <div style={{
          width:90, height:90,          // ← square, never distorts
          borderRadius:"50%",
          border:"3px solid #C9981A",
          overflow:"hidden",
          flexShrink:0,
          animation:"srjPulse 2s ease-in-out 1.2s infinite",
        }}>
          <Image
            src="/images/logo.jpeg"
            alt="SRJ Gold"
            width={90} height={90}
            priority
            style={{
              width:"100%", height:"100%",
              objectFit:"cover",
              objectPosition:"center",
              display:"block",
            }}
          />
        </div>
      </div>

      {/* Brand name */}
      <div style={{ animation:"srjWord .65s ease .9s both", textAlign:"center", flexShrink:0 }}>
        <div style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontSize:40, fontWeight:600, color:"#E0B428", letterSpacing:"0.06em" }}>
          SRJ Gold
        </div>
        <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:11, color:"rgba(247,242,232,.48)", letterSpacing:"0.2em", textTransform:"uppercase", marginTop:5 }}>
          Spices
        </div>
      </div>

      {/* Tagline */}
      <div style={{
        animation:"srjWord .65s ease 1.5s both", flexShrink:0,
        fontFamily:"var(--font-cormorant),Georgia,serif",
        fontStyle:"italic", fontSize:16,
        color:"rgba(247,242,232,.36)", marginTop:14,
      }}>
        Taste Beyond the Limit
      </div>

      {/* Loading bar */}
      <div style={{
        position:"absolute", bottom:54,
        width:148, height:1.5,
        background:"rgba(201,152,26,.15)",
        borderRadius:2, overflow:"hidden",
      }}>
        <div style={{
          height:"100%",
          background:"linear-gradient(90deg,#C9981A,#E0B428)",
          animation:"srjBar 3.2s ease .5s both",
        }} />
      </div>
    </div>
  );
 }