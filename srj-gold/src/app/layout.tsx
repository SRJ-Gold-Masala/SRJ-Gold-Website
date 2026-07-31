import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "./providers";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const cormorant = Cormorant_Garamond({
  subsets:  ["latin"],
  weight:   ["400", "500", "600"],
  style:    ["normal", "italic"],
  variable: "--font-cormorant",
  display:  "swap",
});

const dmSans = DM_Sans({
  subsets:  ["latin"],
  weight:   ["300", "400", "500"],
  variable: "--font-dm-sans",
  display:  "swap",
});

export const metadata: Metadata = {
  title: {
    default:  "SRJ Gold Spices — Taste Beyond the Limit",
    template: "%s | SRJ Gold Spices",
  },
  description:
    "Premium stone-ground, sun-dried spices from India's finest farms. Pure, unadulterated flavour since 1981.",
  keywords:  ["spices", "masala", "indian spices", "srj gold", "byadgi chilli", "turmeric powder", "coriander powder"],
  authors:   [{ name: "SRJ Gold Spices" }],
  openGraph: {
    type:        "website",
    locale:      "en_IN",
    url:         "https://srjgoldmasala.com",
    siteName:    "SRJ Gold Spices",
    title:       "SRJ Gold Spices — Taste Beyond the Limit",
    description: "Premium pure spices since 1981.",
  },
  twitter: {
    card:  "summary_large_image",
    title: "SRJ Gold Spices",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <Providers>{children}</Providers>
        <WhatsAppButton />
        
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "SRJ Gold Spices",
            url: "https://srjgoldmasala.com",
            logo: "https://srjgoldmasala.com/images/logo.jpeg",
            image: "https://srjgoldmasala.com/images/logo.jpeg",
            description:
            "Premium stone-ground, sun-dried spices from India's finest farms. Pure, unadulterated flavour since 1981.",
          
          }),
        }}
        />
        </body>
    </html>
  );
}
