import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
export const metadata = { title:"Privacy Policy" };
export default function PrivacyPage() {
  const sections = [
    ["Information we collect","We collect the name, email address, and phone number you provide when submitting an enquiry. If you sign in with Google, we receive your name and email from Google."],
    ["How we use it","Your information is used solely to respond to your enquiry. We do not sell, share, or use your data for advertising."],
    ["Data storage","Enquiry data is stored securely on Supabase (PostgreSQL). We retain records for up to 2 years."],
    ["Your rights","You may request deletion of your data at any time by emailing enquiry@srjgold.com."],
    ["Contact","For privacy questions, contact us at enquiry@srjgold.com."],
  ];
  return (
    <>
      <Nav />
      <main style={{ background:"#fff", padding:"52px 40px", maxWidth:720, margin:"0 auto" }}>
        <h1 style={{ fontFamily:"var(--font-cormorant),Georgia,serif", fontSize:36, fontWeight:500, color:"#4A1320", marginBottom:8 }}>Privacy Policy</h1>
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
