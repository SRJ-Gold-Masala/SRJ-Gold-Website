"use client";
import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

const C = { maroon:"#4A1320", gold:"#C9981A", goldBr:"#E0B428", goldPale:"#FBF5E4", cream:"#F7F2E8", creamDk:"#EDE3CC", ink:"#1A1209", muted:"#7A6A52" };
const serif = "var(--font-cormorant),Georgia,serif";
const sans  = "var(--font-dm-sans),sans-serif";

function FadeIn({ children, delay=0, dir="up" }: { children:React.ReactNode; delay?:number; dir?:"up"|"left"|"right" }) {
  const [ref, inView] = useInView();
  const tx = dir==="left"?32:dir==="right"?-32:0;
  const ty = dir==="up"?24:0;
  return (
    <div ref={ref} style={{ opacity:inView?1:0, transform:inView?"none":`translate(${tx}px,${ty}px)`, transition:`opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function Milestone({ target, suffix, label, active }: { target:number;suffix:string;label:string;active:boolean }) {
  const val = useCountUp(target, active, 1600);
  return (
    <div style={{ textAlign:"center", padding:"16px 20px" }}>
      <div style={{ fontFamily:serif, fontSize:44, fontWeight:600, color:C.gold, lineHeight:1 }}>{val}{suffix}</div>
      <div style={{ fontFamily:sans, fontSize:11, fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(247,242,232,0.55)", marginTop:8 }}>{label}</div>
    </div>
  );
}

const PRODUCTS = [
  { key:"chilli",    name:"Byadgi Chilli Powder",  tagline:"Fiery Red · Rich Colour · Mild Heat",                   accentColor:"#8B0000", bg:"#FFF5F5", icon:"🌶️", origin:"Authentic Byadgi chillies, Karnataka",       features:["Deep ruby-red colour","Moderate heat, bold aroma","No artificial additives"],        uses:"Ideal for gravies, tandoori dishes, sambar, bisi bele bath, chutneys and spice mixes.",          story:"We provide Annagiri lal mirch — known for its unique flavour and deep colour. A key ingredient in traditional South Indian cuisine, our Byadgi chilli brings authenticity to every dish it touches." },
  { key:"turmeric",  name:"Turmeric Powder",        tagline:"Golden Glow · High Curcumin · 4000 Years of Tradition", accentColor:"#B8860B", bg:"#FFFBF0", icon:"🟡", origin:"Premium turmeric from Sangli, Maharashtra",      features:["High curcumin content","Anti-inflammatory properties","Vibrant golden colour"],           uses:"Essential for curries, dals, golden milk, rice, vegetables, meats and traditional remedies.",   story:"Often called the 'Indian Saffron', turmeric has been the cornerstone of Indian culture for over 4,000 years. Our turmeric brings warmth, colour and wellness to every preparation." },
  { key:"coriander", name:"Coriander Powder",       tagline:"Soul of Indian Cuisine · Rich in Antioxidants",         accentColor:"#4A7C2F", bg:"#F5FFF5", icon:"🌿", origin:"Finest farms of Rajasthan and Gujarat",          features:["Rich in antioxidants","Aids digestion naturally","Pure stone-ground flavour"],             uses:"Perfect for all sabzis, marinades, garam masala bases, spicy Indian gravies and as a garnish.", story:"Dhania — the soul of Indian cuisine. A key ingredient in all kinds of vegetables and masala bases, our coriander powder delivers restaurant-quality taste in every home kitchen." },
];

export function AboutClient() {
  const [activeProd, setActiveProd] = useState("chilli");
  const [milestoneRef, milestoneInView] = useInView(0.3);
  const prod = PRODUCTS.find(p=>p.key===activeProd)!;

  return (
    <>
      <style>{`
        .about-story-grid  { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; max-width:1100px; margin:0 auto; }
        .about-founder-grid{ display:grid; grid-template-columns:1fr 2fr; gap:52px; align-items:start; }
        .about-prod-panel  { display:grid; grid-template-columns:1fr 1fr; gap:48px; }
        .about-promise-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
        .about-contact-grid{ display:grid; grid-template-columns:1fr 1fr; gap:52px; align-items:start; }
        .milestone-grid    { display:grid; grid-template-columns:repeat(4,1fr); }
        .prod-tabs         { display:flex; }
        @media(max-width:768px){
          .about-story-grid  { grid-template-columns:1fr; gap:32px; }
          .about-founder-grid{ grid-template-columns:1fr; gap:24px; }
          .about-prod-panel  { grid-template-columns:1fr; gap:24px; }
          .about-promise-grid{ grid-template-columns:1fr 1fr; gap:16px; }
          .about-contact-grid{ grid-template-columns:1fr; gap:32px; }
          .milestone-grid    { grid-template-columns:repeat(2,1fr); }
          .prod-tabs         { flex-direction:column; }
          .prod-tab-btn      { border-right:none !important; border-bottom:0.5px solid #EDE3CC !important; }
          .about-pad         { padding-left:20px !important; padding-right:20px !important; }
        }
        @media(max-width:480px){ .about-promise-grid{ grid-template-columns:1fr; } }
      `}</style>
      <main style={{ background:"#fff" }}>

        {/* Hero */}
        <div style={{ background:C.maroon, padding:"64px 52px 52px", position:"relative", overflow:"hidden" }} className="about-pad">
          <div style={{ position:"absolute", top:-80, right:-80, width:400, height:400, borderRadius:"50%", border:"1px solid rgba(201,152,26,0.1)", pointerEvents:"none" }} />
          <FadeIn>
            <div style={{ fontFamily:sans, fontSize:10, fontWeight:500, letterSpacing:"0.18em", textTransform:"uppercase", color:C.gold, marginBottom:16 }}>Est. 1981 · Sagar, Karnataka</div>
            <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:500, fontSize:44, color:C.cream, margin:"0 0 20px", lineHeight:1.1 }}>Four decades of<br/>pure, honest spices</h1>
            <p style={{ fontFamily:sans, fontSize:14, fontWeight:300, color:"rgba(247,242,232,0.65)", lineHeight:1.85, maxWidth:560, margin:0 }}>
              From a humble single-spice operation in Byadgi to one of Karnataka's most respected spice names — SRJ Gold has always stood for one thing: purity you can taste.
            </p>
          </FadeIn>
        </div>

        {/* Milestones */}
        <div ref={milestoneRef} style={{ background:C.maroon, borderTop:"1px solid rgba(201,152,26,0.15)", padding:"40px 24px" }}>
          <div className="milestone-grid">
            {[{target:45,suffix:"+",label:"Years of Excellence"},{target:3,suffix:"",label:"Flagship Products"},{target:100,suffix:"%",label:"Pure & Natural"},{target:1,suffix:"",label:"FSSAI Certified"}].map((m,i)=>(
              <div key={i} style={{ borderRight:i<3?"1px solid rgba(201,152,26,0.15)":"none" }}>
                <Milestone {...m} active={milestoneInView} />
              </div>
            ))}
          </div>
        </div>

        {/* Brand story */}
        <div style={{ padding:"64px 52px" }} className="about-pad">
          <div className="about-story-grid">
            <FadeIn dir="left">
              <div style={{ fontFamily:sans, fontSize:10, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.gold, marginBottom:12 }}>Our Story</div>
              <h2 style={{ fontFamily:serif, fontSize:30, fontWeight:500, color:C.maroon, margin:"0 0 20px", lineHeight:1.2 }}>From one spice to a legacy</h2>
              <p style={{ fontFamily:sans, fontSize:14, fontWeight:300, color:C.muted, lineHeight:1.9, marginBottom:16 }}>Established in 1981 in Sagar, Karnataka, our journey began with a clear vision — to deliver pure, authentic flavours rooted in tradition. Starting with a strong focus on delivering high-quality spices — red chilli, dry ginger and beyond — we built our reputation on purity and consistency, growing into one of Karnataka's most respected names in the spice industry.</p>
              <p style={{ fontFamily:sans, fontSize:14, fontWeight:300, color:C.muted, lineHeight:1.9 }}>Over the decades, we expanded from dry ginger to becoming a trusted leader in Byadgi red chilli and other premium spices. From farms to kitchens across the country, we uphold the same values — purity, consistency, and trust.</p>
            </FadeIn>
            <FadeIn dir="right" delay={120}>
              <div style={{ background:C.goldPale, borderRadius:12, padding:"32px", border:`1px solid ${C.creamDk}` }}>
                <div style={{ fontFamily:serif, fontSize:60, color:"rgba(201,152,26,0.2)", lineHeight:0.7, marginBottom:14 }}>"</div>
                <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:19, fontWeight:500, color:C.ink, lineHeight:1.6, margin:"0 0 16px" }}>Today, our brand stands as a symbol of excellence — delivering spices that bring authentic aroma, colour, and taste to every dish.</p>
                <div style={{ fontFamily:sans, fontSize:11, fontWeight:500, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em" }}>— SRJ Gold Spices, since 1981</div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Founder */}
        <div style={{ background:C.cream, padding:"64px 52px", borderTop:`1px solid ${C.creamDk}`, borderBottom:`1px solid ${C.creamDk}` }} className="about-pad">
          <FadeIn>
            <div style={{ fontFamily:sans, fontSize:10, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.gold, marginBottom:12 }}>The Visionary</div>
            <h2 style={{ fontFamily:serif, fontSize:30, fontWeight:500, color:C.maroon, margin:"0 0 32px" }}>Mr. B. Gouse Mohiyuddin</h2>
          </FadeIn>
          <div className="about-founder-grid">
            <FadeIn dir="left" delay={80}>
              <div style={{ background:C.maroon, borderRadius:12, padding:"28px 24px", textAlign:"center" }}>
                <div style={{ fontFamily:serif, fontSize:52, color:"rgba(201,152,26,0.3)", lineHeight:1, marginBottom:10 }}>B.G.M</div>
                <div style={{ fontFamily:serif, fontSize:17, fontWeight:500, color:C.cream, marginBottom:6 }}>B. Gouse Mohiyuddin</div>
                <div style={{ fontFamily:sans, fontSize:11, color:"rgba(247,242,232,0.5)", letterSpacing:"0.08em", textTransform:"uppercase" }}>Founder · 1981</div>
                <div style={{ marginTop:18, paddingTop:18, borderTop:"1px solid rgba(201,152,26,0.15)" }}>
                  {["Visionary entrepreneur","Pioneer in spice trade","Champion of quality"].map(t=>(
                    <div key={t} style={{ fontFamily:sans, fontSize:12, color:"rgba(201,152,26,0.7)", marginBottom:8, display:"flex", alignItems:"center", gap:8, justifyContent:"center" }}>
                      <span style={{ width:4, height:4, borderRadius:"50%", background:C.gold, display:"inline-block" }} />{t}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn dir="right" delay={120}>
              <div>
                <p style={{ fontFamily:sans, fontSize:14, fontWeight:300, color:C.muted, lineHeight:1.9, marginBottom:16 }}>Our journey began with the vision of Mr. B. Gouse Mohiyuddin — a dedicated entrepreneur who laid the foundation of the business in 1981. Starting with limited resources, he focused solely on processing and supplying high-quality dry ginger, driven by a passion to bring the finest spices to the market.</p>
                <p style={{ fontFamily:sans, fontSize:14, fontWeight:300, color:C.muted, lineHeight:1.9, marginBottom:16 }}>Through relentless hard work, honesty, and a deep understanding of the spice trade, Mr. Muhiddin steadily expanded the business. Under his leadership, the company evolved into a major industry player — recognized for premium dry ginger and its expertise in Byadgi red chilli, now our flagship product.</p>
                <p style={{ fontFamily:sans, fontSize:14, fontWeight:300, color:C.muted, lineHeight:1.9 }}>His vision transformed a small local venture into a trusted name in the spice industry, inspiring the next generation to carry forward the legacy of quality, purity, and excellence.</p>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Products deep dive */}
        <div style={{ padding:"64px 52px" }} className="about-pad">
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:40 }}>
              <div style={{ fontFamily:sans, fontSize:10, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.muted, marginBottom:12 }}>What We Offer</div>
              <h2 style={{ fontFamily:serif, fontStyle:"italic", fontSize:32, fontWeight:500, color:C.maroon, margin:0 }}>Our Signature Spices</h2>
            </div>
          </FadeIn>
          <div className="prod-tabs" style={{ marginBottom:32, border:`0.5px solid ${C.creamDk}`, borderRadius:10, overflow:"hidden" }}>
            {PRODUCTS.map(p=>(
              <button key={p.key} className="prod-tab-btn" onClick={()=>setActiveProd(p.key)} style={{ flex:1, padding:"13px 16px", fontFamily:sans, fontSize:13, fontWeight:500, cursor:"pointer", border:"none", borderRight:`0.5px solid ${C.creamDk}`, background:activeProd===p.key?C.maroon:C.cream, color:activeProd===p.key?C.goldPale:C.muted, transition:"all 0.25s ease" }}>
                {p.icon} {p.name.split(" ").slice(0,2).join(" ")}
              </button>
            ))}
          </div>
          <div className="about-prod-panel" key={activeProd} style={{ background:prod.bg, borderRadius:12, padding:"32px", border:`0.5px solid ${prod.accentColor}22` }}>
            <div>
              <div style={{ fontFamily:sans, fontSize:10, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:prod.accentColor, marginBottom:10 }}>{prod.tagline}</div>
              <h3 style={{ fontFamily:serif, fontSize:26, fontWeight:500, color:C.ink, margin:"0 0 14px" }}>{prod.name}</h3>
              <p style={{ fontFamily:sans, fontSize:13, fontWeight:300, color:C.muted, lineHeight:1.85, marginBottom:18 }}>{prod.story}</p>
              <div style={{ fontFamily:sans, fontSize:11, fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>Best uses</div>
              <p style={{ fontFamily:sans, fontSize:13, color:C.muted, lineHeight:1.7, margin:0 }}>{prod.uses}</p>
            </div>
            <div>
              <div style={{ marginBottom:16 }}>
                <div style={{ fontFamily:sans, fontSize:10, fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>Origin</div>
                <div style={{ fontFamily:sans, fontSize:13, color:C.ink, background:"#fff", borderRadius:6, padding:"10px 14px", border:`0.5px solid ${C.creamDk}` }}>{prod.origin}</div>
              </div>
              <div style={{ marginBottom:16 }}>
                <div style={{ fontFamily:sans, fontSize:10, fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted, marginBottom:8 }}>Key Features</div>
                {prod.features.map(f=>(
                  <div key={f} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8, fontFamily:sans, fontSize:13, color:C.ink }}>
                    <div style={{ width:6, height:6, borderRadius:"50%", background:prod.accentColor, flexShrink:0 }} />{f}
                  </div>
                ))}
              </div>
              <div style={{ background:C.maroon, borderRadius:8, padding:"16px" }}>
                <div style={{ fontFamily:sans, fontSize:10, fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:C.gold, marginBottom:6 }}>Purity Promise</div>
                <div style={{ fontFamily:sans, fontSize:12, fontWeight:300, color:"rgba(247,242,232,0.7)", lineHeight:1.6 }}>100% natural. No artificial colour, preservatives or additives. Stone-ground to preserve natural oils and aroma.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Promise grid */}
        <div style={{ background:C.cream, padding:"64px 52px", borderTop:`1px solid ${C.creamDk}` }} className="about-pad">
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:40 }}>
              <div style={{ fontFamily:sans, fontSize:10, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.muted, marginBottom:12 }}>Why Choose Us</div>
              <h2 style={{ fontFamily:serif, fontSize:30, fontWeight:500, color:C.maroon, margin:0 }}>Our Promise to You</h2>
            </div>
          </FadeIn>
          <div className="about-promise-grid">
            {[{icon:"🌾",title:"Farm Direct",desc:"We source directly from trusted farmers — no middlemen, no compromises on freshness."},{icon:"☀️",title:"Sun Dried",desc:"Natural sun-drying preserves essential oils and authentic aroma in every batch."},{icon:"🪨",title:"Stone Ground",desc:"Traditional grinding at low speed retains the spice's natural colour and flavour."},{icon:"✅",title:"FSSAI Certified",desc:"Fully licensed. FSSAI Lic No. 21226145000083. Quality you can trust."}].map((p,i)=>(
              <FadeIn key={i} delay={i*100}>
                <div style={{ background:"#fff", borderRadius:10, padding:"22px 18px", border:`0.5px solid ${C.creamDk}` }}>
                  <div style={{ fontSize:26, marginBottom:12 }}>{p.icon}</div>
                  <div style={{ fontFamily:serif, fontSize:16, fontWeight:500, color:C.maroon, marginBottom:8 }}>{p.title}</div>
                  <div style={{ fontFamily:sans, fontSize:12, fontWeight:300, color:C.muted, lineHeight:1.7 }}>{p.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Contact info */}
        <div style={{ background:C.maroon, padding:"64px 52px" }} className="about-pad">
          <div className="about-contact-grid">
            <div>
              <div style={{ fontFamily:sans, fontSize:10, fontWeight:500, letterSpacing:"0.14em", textTransform:"uppercase", color:C.gold, marginBottom:14 }}>Get in Touch</div>
              <h2 style={{ fontFamily:serif, fontSize:28, fontWeight:500, color:C.cream, margin:"0 0 28px" }}>We'd love to hear from you</h2>
              {[{label:"Manufacturer",value:"United Trading Company"},{label:"Address",value:"Survey No 24/3, Vaddnala, Sagar — 577401, Shimoga District, Karnataka, India"},{label:"Phone",value:"+91 90082 72640"},{label:"Email",value:"srjgoldmasala@gmail.com"},{label:"Website",value:"www.srjgoldmasala.com"},{label:"FSSAI Lic No.",value:"21226145000083"}].map(({label,value})=>(
                <div key={label} style={{ marginBottom:14, paddingBottom:14, borderBottom:"1px solid rgba(201,152,26,0.12)" }}>
                  <div style={{ fontFamily:sans, fontSize:10, fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(201,152,26,0.6)", marginBottom:4 }}>{label}</div>
                  <div style={{ fontFamily:sans, fontSize:13, color:"rgba(247,242,232,0.75)" }}>{value}</div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ background:"rgba(201,152,26,0.08)", borderRadius:12, padding:"28px", border:"1px solid rgba(201,152,26,0.15)", marginBottom:16 }}>
                <div style={{ fontFamily:serif, fontSize:20, fontWeight:500, color:C.cream, marginBottom:10 }}>Place a bulk order?</div>
                <p style={{ fontFamily:sans, fontSize:13, fontWeight:300, color:"rgba(247,242,232,0.6)", lineHeight:1.7, marginBottom:18 }}>We supply to restaurants, retailers, and distributors across India. Reach out and our team will respond within 24 hours.</p>
                <a href="/contact" style={{ display:"inline-block", fontFamily:sans, fontSize:13, fontWeight:500, background:C.gold, color:C.maroon, padding:"11px 22px", borderRadius:4, textDecoration:"none" }}>Contact us →</a>
              </div>
              <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:12, padding:"22px 24px", border:"1px solid rgba(201,152,26,0.1)" }}>
                <div style={{ fontFamily:sans, fontSize:10, fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(201,152,26,0.6)", marginBottom:10 }}>Certifications</div>
                <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
                  {["FSSAI Certified","Product of India","100% Natural","Made in India"].map(c=>(
                    <span key={c} style={{ fontFamily:sans, fontSize:11, fontWeight:500, color:C.gold, background:"rgba(201,152,26,0.1)", border:"0.5px solid rgba(201,152,26,0.25)", padding:"4px 10px", borderRadius:3 }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
