import Link from "next/link";

export function Footer() {
  return (
    <>
      <style>{`
        .footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr; gap:48px; margin-bottom:40px; }
        @media(max-width:768px){ .footer-grid{ grid-template-columns:1fr; gap:32px; } }
      `}</style>
      <footer style={{ background:"#4A1320", padding:"52px 24px 28px" }}>
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontSize:22, fontWeight:600, color:"#E0B428", marginBottom:4 }}>SRJ Gold Spices</div>
            <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:11, fontStyle:"italic", color:"rgba(247,242,232,0.4)", marginBottom:18 }}>Taste Beyond the Limit · Est. 1981</div>
            <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:12, color:"rgba(247,242,232,0.55)", lineHeight:1.8, marginBottom:14 }}>
              United Trading Company<br />
              Survey No 24/3, Vaddnala<br />
              Sagar — 577401, Karnataka, India
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:12, color:"rgba(247,242,232,0.55)" }}>📞 +91 90082 72640</div>
              <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:12, color:"rgba(247,242,232,0.55)" }}>✉️ srjgoldmasala@gmail.com</div>
              <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:11, color:"rgba(201,152,26,0.55)", marginTop:4 }}>FSSAI Lic: 21226145000083</div>
            </div>
          </div>
          {/* Quick links */}
          <div>
            <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:10, fontWeight:500, textTransform:"uppercase", letterSpacing:"0.12em", color:"#C9981A", marginBottom:18 }}>Quick links</div>
            {[["Home","/"],["Products","/products"],["About","/about"],["Contact","/contact"]].map(([l,h])=>(
              <Link key={l} href={h} style={{ display:"block", fontFamily:"var(--font-dm-sans),sans-serif", fontSize:13, color:"rgba(247,242,232,0.5)", textDecoration:"none", marginBottom:10 }}>{l}</Link>
            ))}
          </div>
          {/* Legal */}
          <div>
            <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:10, fontWeight:500, textTransform:"uppercase", letterSpacing:"0.12em", color:"#C9981A", marginBottom:18 }}>Legal</div>
            {[["Privacy Policy","/privacy"],["Terms of Use","/terms"]].map(([l,h])=>(
              <Link key={l} href={h} style={{ display:"block", fontFamily:"var(--font-dm-sans),sans-serif", fontSize:13, color:"rgba(247,242,232,0.5)", textDecoration:"none", marginBottom:10 }}>{l}</Link>
            ))}
          </div>
        </div>
        {/* Bottom bar */}
        <div style={{ borderTop:"1px solid rgba(201,152,26,0.12)", paddingTop:20, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
          <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:11, color:"rgba(247,242,232,0.22)" }}>© {new Date().getFullYear()} SRJ Gold Spices. All rights reserved.</div>
          <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:11, color:"rgba(247,242,232,0.18)" }}>Product of India · Enquiry-only</div>
        </div>
      </footer>
    </>
  );
}
