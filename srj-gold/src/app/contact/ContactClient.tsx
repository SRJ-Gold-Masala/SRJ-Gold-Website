"use client";
import { useState } from "react";

const C = { maroon:"#4A1320", gold:"#C9981A", goldPale:"#FBF5E4", cream:"#F7F2E8", creamDk:"#EDE3CC", ink:"#1A1209", muted:"#7A6A52" };
const serif = "var(--font-cormorant),Georgia,serif";
const sans  = "var(--font-dm-sans),sans-serif";

export function ContactClient() {
  const [form, setForm]       = useState({ name:"", email:"", phone:"", msg:"" });
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [err, setErr]         = useState("");

  const submit = async () => {
    if (!form.name || !form.email || !form.msg) { setErr("Please fill name, email and message."); return; }
    setLoading(true); setErr("");
    try {
      const res = await fetch("/api/enquiry", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ name:form.name, email:form.email, phone:form.phone||"—", message:form.msg }),
      });
      if (!res.ok) throw new Error("Failed");
      setDone(true);
    } catch { setErr("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <>
      <style>{`
        .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:52px; max-width:1100px; margin:0 auto; padding:52px; }
        @media(max-width:768px){ .contact-grid{ grid-template-columns:1fr; gap:36px; padding:24px; } }
      `}</style>
      <main style={{ background:"#fff" }}>
        {/* Hero */}
        <div style={{ background:C.maroon, padding:"52px 24px 40px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-60, right:-60, width:300, height:300, borderRadius:"50%", border:"1px solid rgba(201,152,26,0.1)", pointerEvents:"none" }} />
          <div style={{ fontFamily:sans, fontSize:10, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.gold, marginBottom:10 }}>Get in touch</div>
          <h1 style={{ fontFamily:serif, fontSize:34, fontWeight:500, color:"#F7F2E8", margin:0 }}>Contact us</h1>
        </div>

        <div className="contact-grid">
          {/* Form */}
          <div>
            <h2 style={{ fontFamily:serif, fontSize:24, fontWeight:500, color:C.ink, marginBottom:24, marginTop:0 }}>Send a message</h2>
            {done ? (
              <div style={{ background:"#EAF6F0", borderRadius:10, padding:"32px", textAlign:"center" }}>
                <div style={{ fontSize:32, marginBottom:10 }}>✓</div>
                <div style={{ fontFamily:serif, fontSize:22, fontWeight:500, color:C.ink, marginBottom:6 }}>Message sent!</div>
                <div style={{ fontFamily:sans, fontSize:13, color:C.muted }}>We'll get back to you within 24 hours.</div>
              </div>
            ) : (
              <>
                {[["Your name","name","text"],["Email address","email","email"],["Phone number (optional)","phone","tel"]].map(([l,k,t])=>(
                  <div key={k} style={{ marginBottom:16 }}>
                    <label style={{ fontFamily:sans, fontSize:11, fontWeight:500, color:C.muted, display:"block", marginBottom:5 }}>{l}</label>
                    <input type={t} value={(form as any)[k]} onChange={e=>setForm({...form,[k]:e.target.value})}
                      style={{ width:"100%", fontFamily:sans, fontSize:13, border:`0.5px solid ${C.creamDk}`, borderRadius:6, padding:"10px 14px", background:C.cream, outline:"none", boxSizing:"border-box" }} />
                  </div>
                ))}
                <div style={{ marginBottom:20 }}>
                  <label style={{ fontFamily:sans, fontSize:11, fontWeight:500, color:C.muted, display:"block", marginBottom:5 }}>Message</label>
                  <textarea value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} rows={5}
                    style={{ width:"100%", fontFamily:sans, fontSize:13, border:`0.5px solid ${C.creamDk}`, borderRadius:6, padding:"10px 14px", background:C.cream, outline:"none", resize:"vertical", boxSizing:"border-box" }} />
                </div>
                {err && <div style={{ color:"#B91C1C", fontSize:12, fontFamily:sans, marginBottom:12 }}>{err}</div>}
                <button onClick={submit} disabled={loading} style={{ width:"100%", fontFamily:sans, fontSize:13, fontWeight:500, background:loading?"#C8BDA8":C.maroon, color:C.goldPale, border:"none", padding:"13px", borderRadius:6, cursor:loading?"not-allowed":"pointer" }}>
                  {loading?"Sending…":"Send message"}
                </button>
              </>
            )}
          </div>

          {/* Details */}
          <div>
            <h2 style={{ fontFamily:serif, fontSize:24, fontWeight:500, color:C.ink, marginBottom:24, marginTop:0 }}>Our details</h2>
            <div style={{ background:C.cream, borderRadius:10, padding:"24px", border:`0.5px solid ${C.creamDk}`, marginBottom:16 }}>
              {[{label:"Company",value:"United Trading Company"},{label:"Address",value:"Survey No 24/3, Vaddnala, Sagar — 577401, Shimoga District, Karnataka, India"},{label:"Phone",value:"+91 90082 72640"},{label:"Email",value:"srjgoldmasala@gmail.com"},{label:"FSSAI",value:"Lic No. 21226145000083"}].map(({label,value})=>(
                <div key={label} style={{ marginBottom:16, paddingBottom:16, borderBottom:`0.5px solid ${C.creamDk}` }}>
                  <div style={{ fontFamily:sans, fontSize:10, fontWeight:500, textTransform:"uppercase", letterSpacing:"0.1em", color:C.muted, marginBottom:4 }}>{label}</div>
                  <div style={{ fontFamily:sans, fontSize:13, color:C.ink, lineHeight:1.6 }}>{value}</div>
                </div>
              ))}
              {/* WhatsApp CTA */}
              <a href="https://wa.me/919008272640?text=Hello!%20I'm%20interested%20in%20SRJ%20Gold%20Spices%20products." target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", alignItems:"center", gap:10, background:"#25D366", color:"#fff", padding:"12px 18px", borderRadius:6, textDecoration:"none", fontFamily:sans, fontSize:13, fontWeight:500 }}>
                <svg width={20} height={20} viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.549 4.11 1.507 5.843L.057 23.5a.5.5 0 00.613.612l5.701-1.442A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.658-.516-5.168-1.414l-.37-.22-3.833.97.992-3.78-.242-.388A9.961 9.961 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
