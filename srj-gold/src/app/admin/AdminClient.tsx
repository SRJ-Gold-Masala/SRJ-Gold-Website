"use client";
import { useState } from "react";
import { Nav } from "@/components/layout/Nav";
import type { Product, Enquiry } from "@/types";
import { categoryLabel, formatDate } from "@/lib/utils";

const TABS = ["Products","Add Product","Enquiries"] as const;
type Tab = typeof TABS[number];

const CATS = ["GROUND_MASALA","WHOLE_SPICE","BLENDED_MIX","PREMIUM_RANGE"] as const;

export function AdminClient({ initialProducts, initialEnquiries }: { initialProducts:Product[]; initialEnquiries:any[] }) {
  const [tab, setTab]         = useState<Tab>("Products");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [enquiries]           = useState(initialEnquiries);
  const [saving, setSaving]   = useState(false);
  const [msg, setMsg]         = useState("");
  const [form, setForm]       = useState({ name:"", category:"GROUND_MASALA" as any, weight:"", description:"", badge:"", imageUrl:"", accentColor:"#888888" });

  const addProduct = async () => {
    if (!form.name || !form.imageUrl || !form.description) { setMsg("Fill all required fields."); return; }
    setSaving(true); setMsg("");
    try {
      const res = await fetch("/api/admin/products", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(form) });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setProducts(prev=>[...prev, json.data]);
      setForm({ name:"", category:"GROUND_MASALA", weight:"", description:"", badge:"", imageUrl:"", accentColor:"#888888" });
      setTab("Products"); setMsg("Product added!");
    } catch(e:any) { setMsg(e.message); }
    setSaving(false);
  };

  const deleteProduct = async (id:string) => {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/admin/products/${id}`, { method:"DELETE" });
    if ((await res.json()).success) setProducts(prev=>prev.filter(p=>p.id!==id));
  };

  const toggleStock = async (id:string, inStock:boolean) => {
    const res = await fetch(`/api/admin/products/${id}`, { method:"PATCH", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ inStock:!inStock }) });
    const json = await res.json();
    if (json.success) setProducts(prev=>prev.map(p=>p.id===id?{...p,inStock:!inStock}:p));
  };

  const inputStyle = { width:"100%", fontFamily:"var(--font-dm-sans),sans-serif", fontSize:13, border:"0.5px solid #C8BDA8", borderRadius:6, padding:"9px 12px", background:"#F7F2E8", outline:"none" };
  const labelStyle = { fontFamily:"var(--font-dm-sans),sans-serif", fontSize:11, fontWeight:500 as const, color:"#7A6A52", display:"block" as const, marginBottom:5 };

  return (
    <>
      <Nav />
      <main style={{ background:"#fff", minHeight:"100vh" }}>
        <div style={{ background:"#4A1320", padding:"28px 40px 20px" }}>
          <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:10, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:"#C9981A", marginBottom:6 }}>Admin</div>
          <h1 style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontSize:28, fontWeight:500, color:"#F7F2E8", margin:0 }}>Dashboard</h1>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", borderBottom:"1px solid #E8E0D0", padding:"0 40px" }}>
          {TABS.map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:13, fontWeight:500, padding:"14px 20px", background:"transparent", border:"none", cursor:"pointer", color: tab===t?"#4A1320":"#7A6A52", borderBottom: tab===t?"2px solid #C9981A":"2px solid transparent", marginBottom:-1 }}>
              {t} {t==="Products"?`(${products.length})`:""} {t==="Enquiries"?`(${enquiries.filter(e=>e.status==="NEW").length} new)`:""}
            </button>
          ))}
        </div>

        <div style={{ padding:"32px 40px" }}>
          {msg && <div style={{ background: msg.includes("!")?"#EAF6F0":"#FEE2E2", border:`0.5px solid ${msg.includes("!")?"#86EFAC":"#FCA5A5"}`, borderRadius:6, padding:"10px 14px", fontFamily:"var(--font-dm-sans),sans-serif", fontSize:12, color: msg.includes("!")?"#166534":"#B91C1C", marginBottom:20 }}>{msg}</div>}

          {/* ── Products list ── */}
          {tab==="Products" && (
            <div>
              <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:12, color:"#7A6A52", marginBottom:16 }}>{products.length} products total</div>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {products.map(p=>(
                  <div key={p.id} style={{ display:"flex", alignItems:"center", gap:16, padding:"14px 16px", border:"0.5px solid #E8E0D0", borderRadius:8 }}>
                    <img src={p.imageUrl} alt="" style={{ width:52, height:52, objectFit:"contain", borderRadius:4 }} />
                    <div style={{ flex:1 }}>
                      <div style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontSize:16, fontWeight:500, color:"#1A1209" }}>{p.name}</div>
                      <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:11, color:"#7A6A52" }}>{categoryLabel(p.category)} · {p.weight} · {formatDate(p.createdAt)}</div>
                    </div>
                    <span style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:10, fontWeight:500, padding:"3px 8px", borderRadius:12, background: p.inStock?"#DCFCE7":"#FEE2E2", color: p.inStock?"#166534":"#B91C1C" }}>{p.inStock?"In stock":"Hidden"}</span>
                    <button onClick={()=>toggleStock(p.id,p.inStock)} style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:11, background:"#F7F2E8", color:"#7A6A52", border:"0.5px solid #C8BDA8", padding:"5px 12px", borderRadius:4, cursor:"pointer" }}>{p.inStock?"Hide":"Show"}</button>
                    <a href={`/products/${p.slug}`} style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:11, color:"#4A1320", textDecoration:"none", border:"0.5px solid #C8BDA8", padding:"5px 12px", borderRadius:4 }}>View</a>
                    <button onClick={()=>deleteProduct(p.id)} style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:11, background:"#FEE2E2", color:"#B91C1C", border:"0.5px solid #FCA5A5", padding:"5px 12px", borderRadius:4, cursor:"pointer" }}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Add product ── */}
          {tab==="Add Product" && (
            <div style={{ maxWidth:560 }}>
              <h2 style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontSize:22, fontWeight:500, color:"#1A1209", margin:"0 0 24px" }}>Add new product</h2>
              {[["Product name *","name","text"],["Weight / Size *","weight","text"],["Image URL *","imageUrl","url"],["Badge (optional)","badge","text"],["Accent colour (hex)","accentColor","text"]].map(([l,k,t])=>(
                <div key={k as string} style={{ marginBottom:16 }}>
                  <label style={labelStyle}>{l as string}</label>
                  <input type={t as string} value={(form as any)[k as string]} onChange={e=>setForm(f=>({...f,[k as string]:e.target.value}))} style={inputStyle} />
                </div>
              ))}
              <div style={{ marginBottom:16 }}>
                <label style={labelStyle}>Category</label>
                <select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value as any}))} style={inputStyle}>
                  {CATS.map(c=><option key={c} value={c}>{categoryLabel(c)}</option>)}
                </select>
              </div>
              <div style={{ marginBottom:24 }}>
                <label style={labelStyle}>Description *</label>
                <textarea value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} rows={3} style={{ ...inputStyle, resize:"vertical" }} />
              </div>
              {form.imageUrl && <div style={{ marginBottom:16 }}><img src={form.imageUrl} alt="preview" style={{ height:80, objectFit:"contain", border:"0.5px solid #E8E0D0", borderRadius:6, padding:4 }} /></div>}
              <button onClick={addProduct} disabled={saving} style={{ width:"100%", fontFamily:"var(--font-dm-sans),sans-serif", fontSize:13, fontWeight:500, background: saving?"#C8BDA8":"#4A1320", color:"#FBF5E4", border:"none", padding:"13px", borderRadius:6, cursor: saving?"not-allowed":"pointer" }}>
                {saving?"Adding…":"Add product to catalogue"}
              </button>
            </div>
          )}

          {/* ── Enquiries ── */}
          {tab==="Enquiries" && (
            <div>
              <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:12, color:"#7A6A52", marginBottom:16 }}>{enquiries.length} total · {enquiries.filter(e=>e.status==="NEW").length} new</div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {enquiries.map(e=>(
                  <div key={e.id} style={{ padding:"16px", border:`0.5px solid ${e.status==="NEW"?"#C9981A":"#E8E0D0"}`, borderRadius:8, background: e.status==="NEW"?"#FBF5E4":"#fff" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16 }}>
                      <div>
                        <div style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontSize:16, fontWeight:500, color:"#1A1209", marginBottom:2 }}>{e.name}</div>
                        <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:12, color:"#7A6A52" }}>{e.email} · {e.phone}</div>
                        {e.product && <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:11, color:"#4A1320", marginTop:4 }}>Product: {e.product.name}</div>}
                        {e.message && <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:12, color:"#7A6A52", marginTop:6, fontStyle:"italic" }}>"{e.message}"</div>}
                      </div>
                      <div style={{ textAlign:"right", flexShrink:0 }}>
                        <span style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:10, fontWeight:500, padding:"3px 8px", borderRadius:12, background: e.status==="NEW"?"#FEF9C3":"#F3F4F6", color: e.status==="NEW"?"#854D0E":"#6B7280" }}>{e.status}</span>
                        <div style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:11, color:"#7A6A52", marginTop:6 }}>{formatDate(e.createdAt)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
