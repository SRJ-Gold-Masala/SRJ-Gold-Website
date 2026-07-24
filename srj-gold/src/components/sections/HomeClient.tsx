"use client";
import { useState, useEffect } from "react";
import { Splash }          from "@/components/sections/Splash";
import { HomeHero }        from "@/components/sections/HomeHero";
import { StatsSection }    from "@/components/sections/StatsSection";
import { FeaturesStrip }   from "@/components/sections/FeaturesStrip";
import { ProductGrid }     from "@/components/sections/ProductGrid";
import { ProcessSection }  from "@/components/sections/ProcessSection";
import { FounderNote }     from "@/components/sections/FounderNote";
import { CtaBand }         from "@/components/sections/CtaBand";
import { Nav }             from "@/components/layout/Nav";
import { Footer }          from "@/components/layout/Footer";
import type { Phase, Product } from "@/types";

export function HomeClient({ products }: { products: Product[] }) {
  const [phase, setPhase] = useState<Phase>("splash");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const seen = sessionStorage.getItem("srj_splash_seen");
    if (seen) {
      // Skip splash entirely — go straight to ready, no flash
      setPhase("ready");
      return;
    }
    const t1 = setTimeout(() => setPhase("entering"), 3300);
    const t2 = setTimeout(() => {
      setPhase("ready");
      sessionStorage.setItem("srj_splash_seen", "1");
    }, 3700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Before JS hydrates, show nothing (server renders nothing for this component)
  if (!mounted) return (
    <div style={{ position:"fixed", inset:0, background:"#4A1320" }} />
  );

  return (
    <div style={{
      // Outer stays maroon so during fade-in there is NO white flash
      background: "#4A1320",
      minHeight: "100vh",
    }}>
      {phase !== "ready" && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          opacity: phase === "splash" ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}>
          <Splash />
        </div>
      )}
      <div
        style={{
          opacity:    phase === "ready" ? 1 : 0,
          // Only transition when going ready, instant when entering
          transition: phase === "ready" ? "opacity 0.4s ease" : "none",
        }}
      >
        <Nav />
        <HomeHero phase={phase} />
        <StatsSection />
        <FeaturesStrip />
        <ProductGrid products={products} />
        <ProcessSection />
        <FounderNote />
        <CtaBand />
        <Footer />
      </div>
    </div>
  );
}