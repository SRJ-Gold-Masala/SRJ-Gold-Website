"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { categoryLabel } from "@/lib/utils";

const C = { maroon:"#4A1320", gold:"#C9981A", goldPale:"#FBF5E4", cream:"#F7F2E8", creamDk:"#EDE3CC", ink:"#1A1209", muted:"#7A6A52" };
const serif = "var(--font-cormorant),Georgia,serif";
const sans  = "var(--font-dm-sans),sans-serif";

export function ProductDetail({ product: p }: { product:Product }) {
  const [form, setForm]       = useState({ name:"", phone:"", email:"", qty:"", msg:"" });
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [err, setErr]         = useState("");

  const submit = async () => {
    if (!form.name || !form.phone || !form.email) { setErr("Please fill name, phone and email."); return; }
    setLoading(true); setErr("");
    try {
      const res = await fetch("/api/enquiry", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ ...form, productId:p.id, productName:p.name }),
      });
      if (!res.ok) throw new Error("Failed");
      setDone(true);
    } catch { setErr("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <>
      <style>{`
        .pd-grid { display:grid; grid-template-columns:1fr 1fr; gap:52px; padding:40px 52px; }
        @media(max-width:768px){ .pd-grid{ grid-template-columns:1fr; gap:28px; padding:20px 20px; } }
      `}</style>
      <main style={{ background:"#fff", minHeight:"100vh" }}>
        <div style={{ padding:"16px 24px", borderBottom:`0.5px solid ${C.creamDk}` }}>
          <Link href="/products" style={{ fontFamily:sans, fontSize:12, color:C.muted, textDecoration:"none" }}>← Back to products</Link>
        </div>
        <div className="pd-grid">
          {/* Image */}
          <div style={{ background:p.accentColor+"12", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", minHeight:280, padding:20 }}>
            <Image src={p.imageUrl} alt={p.name} width={300} height={320} style={{ objectFit:"contain", maxHeight:320, width:"auto" }} />
          </div>
          {/* Info + form */}
          <div>
            <div style={{ fontFamily:sans, fontSize:10, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>{categoryLabel(p.category)}</div>
            <h1 style={{ fontFamily:serif, fontSize:30, fontWeight:500, color:C.ink, lineHeight:1.2, margin:"0 0 14px" }}>{p.name}</h1>
            <p style={{ fontFamily:sans, fontSize:13, fontWeight:300, color:C.muted, lineHeight:1.8, margin:"0 0 20px" }}>{p.description}</p>
            <div style={{ background:C.cream, borderRadius:8, padding:"16px", marginBottom:28, border:`0.5px solid ${C.creamDk}` }}>
              {[["Net weight",p.weight],["Category",categoryLabel(p.category)],["Brand","SRJ Gold"],["Quality","100% Premium"]].map(([k,v])=>(
                <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:`0.5px solid ${C.creamDk}` }}>
                  <span style={{ fontFamily:sans, fontSize:12, color:C.muted }}>{k}</span>
                  <span style={{ fontFamily:sans, fontSize:12, fontWeight:500, color:C.ink }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Enquiry form */}
            <div id="enquire">
              <h2 style={{ fontFamily:serif, fontSize:20, fontWeight:500, color:C.ink, margin:"0 0 16px" }}>Send an Enquiry</h2>
              {done ? (
                <div style={{ background:"#EAF6F0", borderRadius:8, padding:"20px", textAlign:"center" }}>
                  <div style={{ fontSize:24, marginBottom:8 }}>✓</div>
                  <div style={{ fontFamily:serif, fontSize:18, fontWeight:500, color:C.ink }}>Enquiry sent!</div>
                  <div style={{ fontFamily:sans, fontSize:12, color:C.muted, marginTop:4 }}>We'll contact you within 24 hours.</div>
                </div>
              ) : (
                <>
                  {[["Full name","name","text"],["Phone number","phone","tel"],["Email address","email","email"],["Quantity required","qty","text"]].map(([l,k,t])=>(
                    <div key={k} style={{ marginBottom:12 }}>
                      <label style={{ fontFamily:sans, fontSize:11, fontWeight:500, color:C.muted, display:"block", marginBottom:4 }}>{l}</label>
                      <input type={t} value={(form as any)[k]} onChange={e=>setForm({...form,[k]:e.target.value})}
                        style={{ width:"100%", fontFamily:sans, fontSize:13, border:`0.5px solid ${C.creamDk}`, borderRadius:6, padding:"9px 12px", background:C.cream, outline:"none", boxSizing:"border-box" }} />
                    </div>
                  ))}
                  <div style={{ marginBottom:14 }}>
                    <label style={{ fontFamily:sans, fontSize:11, fontWeight:500, color:C.muted, display:"block", marginBottom:4 }}>Message (optional)</label>
                    <textarea value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} rows={2}
                      style={{ width:"100%", fontFamily:sans, fontSize:13, border:`0.5px solid ${C.creamDk}`, borderRadius:6, padding:"9px 12px", background:C.cream, outline:"none", resize:"vertical", boxSizing:"border-box" }} />
                  </div>
                  {err && <div style={{ color:"#B91C1C", fontSize:12, fontFamily:sans, marginBottom:10 }}>{err}</div>}
                  <button onClick={submit} disabled={loading} style={{ width:"100%", fontFamily:sans, fontSize:14, fontWeight:500, background:loading?"#C8BDA8":C.maroon, color:C.goldPale, border:"none", padding:"12px", borderRadius:6, cursor:loading?"not-allowed":"pointer" }}>
                    {loading?"Sending…":"Submit enquiry"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
