"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const C = { maroon:"#4A1320", gold:"#C9981A", goldBr:"#E0B428", goldPale:"#FBF5E4" };
const sans = "var(--font-dm-sans),sans-serif";
const serif = "var(--font-cormorant),Georgia,serif";

export function Nav() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isAdmin  = (session?.user as any)?.role === "ADMIN";
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href:"/",         label:"Home" },
    { href:"/products", label:"Products" },
    { href:"/about",    label:"About" },
    { href:"/contact",  label:"Contact" },
  ];

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-auth  { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        .nav-hamburger { display: none; }
        .mobile-menu {
          position: fixed; inset: 0; top: 58px;
          background: #4A1320; z-index: 190;
          display: flex; flex-direction: column;
          padding: 32px 24px; gap: 8px;
        }
        .mobile-link {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 18px; font-weight: 400;
          color: rgba(247,242,232,0.8);
          text-decoration: none; padding: 14px 0;
          border-bottom: 0.5px solid rgba(201,152,26,0.15);
          display: block;
        }
        .mobile-link.active { color: #E0B428; }
      `}</style>

      <nav style={{ background:C.maroon, padding:"0 24px", height:58, position:"sticky", top:0, zIndex:200, display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 2px 24px rgba(0,0,0,0.45)" }}>
        {/* Logo */}
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
          <div style={{ width:36, height:36, borderRadius:"50%", border:`1.5px solid ${C.gold}`, overflow:"hidden", flexShrink:0 }}>
            <Image src="/images/logo.jpeg" alt="SRJ" width={36} height={36} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center" }} />
          </div>
          <div>
            <div style={{ fontFamily:serif, fontSize:18, fontWeight:600, color:C.goldBr, letterSpacing:"0.04em", lineHeight:1 }}>SRJ Gold</div>
            <div style={{ fontFamily:sans, fontSize:9, color:"rgba(247,242,232,0.48)", letterSpacing:"0.12em", textTransform:"uppercase" }}>Spices</div>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="nav-links" style={{ display:"flex", gap:24 }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{ fontFamily:sans, fontSize:12, fontWeight:400, textDecoration:"none", textTransform:"capitalize", letterSpacing:"0.04em", color:pathname===l.href?C.goldBr:"rgba(247,242,232,0.62)", borderBottom:pathname===l.href?`1.5px solid ${C.goldBr}`:"1.5px solid transparent", paddingBottom:2 }}>
              {l.label}
            </Link>
          ))}
          {isAdmin && <Link href="/admin" style={{ fontFamily:sans, fontSize:12, color:"rgba(247,242,232,0.48)", textDecoration:"none" }}>Admin ⚙</Link>}
        </div>

        {/* Desktop auth */}
        <div className="nav-auth" style={{ display:"flex", gap:12, alignItems:"center" }}>
          {!session
            ? <Link href="/auth/signin" style={{ fontFamily:sans, fontSize:12, fontWeight:500, color:C.gold, background:"rgba(201,152,26,0.12)", border:"0.5px solid rgba(201,152,26,0.35)", padding:"6px 14px", borderRadius:4, textDecoration:"none" }}>Sign in</Link>
            : <button onClick={()=>signOut({callbackUrl:"/"})} style={{ fontFamily:sans, fontSize:12, color:"rgba(247,242,232,0.48)", background:"transparent", border:"none", cursor:"pointer" }}>Sign out</button>
          }
        </div>

        {/* Hamburger */}
        <button className="nav-hamburger" onClick={()=>setMenuOpen(o=>!o)} style={{ background:"transparent", border:"none", cursor:"pointer", padding:8, flexDirection:"column", gap:5, alignItems:"center", justifyContent:"center" }}>
          {menuOpen
            ? <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="rgba(247,242,232,0.8)" strokeWidth={2}><path d="M18 6L6 18M6 6l12 12"/></svg>
            : <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="rgba(247,242,232,0.8)" strokeWidth={2}><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          }
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {links.map(l => (
            <Link key={l.href} href={l.href} className={`mobile-link${pathname===l.href?" active":""}`} onClick={()=>setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
          {isAdmin && <Link href="/admin" className="mobile-link" onClick={()=>setMenuOpen(false)}>Admin ⚙</Link>}
          <div style={{ marginTop:16, paddingTop:16, borderTop:"0.5px solid rgba(201,152,26,0.15)" }}>
            {!session
              ? <Link href="/auth/signin" onClick={()=>setMenuOpen(false)} style={{ fontFamily:sans, fontSize:14, fontWeight:500, color:C.gold, background:"rgba(201,152,26,0.12)", border:"0.5px solid rgba(201,152,26,0.35)", padding:"12px 20px", borderRadius:4, textDecoration:"none", display:"inline-block" }}>Sign in</Link>
              : <button onClick={()=>{signOut({callbackUrl:"/"});setMenuOpen(false);}} style={{ fontFamily:sans, fontSize:14, color:"rgba(247,242,232,0.6)", background:"transparent", border:"none", cursor:"pointer", padding:0 }}>Sign out</button>
            }
          </div>
        </div>
      )}
    </>
  );
}
