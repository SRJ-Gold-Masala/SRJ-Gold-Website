import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
export const metadata = { title:"Terms of Use" };
export default function TermsPage() {
  const sections = [
    ["Enquiry-only","This website is for product information and enquiries only. No financial transactions are processed here."],
    ["Accuracy","We strive to keep product information accurate. Prices and availability are confirmed offline."],
    ["Intellectual property","All content, images, and branding belong to SRJ Gold Spices. Unauthorised use is prohibited."],
    ["Limitation of liability","SRJ Gold Spices is not liable for any indirect loss arising from use of this website."],
    ["Contact","For queries, email enquiry@srjgold.com."],
  ];
  return (
    <>
      <Nav />
      <main style={{ background:"#fff", padding:"52px 40px", maxWidth:720, margin:"0 auto" }}>
        <h1 style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontSize:36, fontWeight:500, color:"#4A1320", marginBottom:8 }}>Terms of Use</h1>
        <p style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:12, color:"#7A6A52", marginBottom:32 }}>Last updated: January 2025</p>
        {sections.map(([h,b]) => (
          <div key={h} style={{ marginBottom:28 }}>
            <h2 style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontSize:20, fontWeight:500, color:"#4A1320", marginBottom:8 }}>{h}</h2>
            <p style={{ fontFamily:"var(--font-dm-sans),sans-serif", fontSize:13, fontWeight:300, color:"#7A6A52", lineHeight:1.8, margin:0 }}>{b}</p>
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
}
