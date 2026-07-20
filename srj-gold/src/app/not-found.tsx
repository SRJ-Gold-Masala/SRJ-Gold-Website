import Link from "next/link";
export default function NotFound() {
  return (
    <div style={{ background:"#4A1320", minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:40 }}>
      <div style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontSize:96, fontWeight:600, color:"rgba(201,152,26,0.2)", lineHeight:1 }}>404</div>
      <h1 style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontStyle:"italic", fontSize:32, fontWeight:500, color:"#F7F2E8", margin:"16px 0 12px" }}>Page not found</h1>
      <p style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:13, color:"rgba(247,242,232,0.55)", marginBottom:28 }}>The page you're looking for doesn't exist or has been moved.</p>
      <Link href="/" style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:13, fontWeight:500, background:"#C9981A", color:"#4A1320", padding:"11px 24px", borderRadius:4, textDecoration:"none" }}>Go home</Link>
    </div>
  );
}
