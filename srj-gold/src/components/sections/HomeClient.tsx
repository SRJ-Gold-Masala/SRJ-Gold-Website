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

  useEffect(() => {
    const seen = sessionStorage.getItem("srj_splash_seen");
    if (seen) {
      setPhase("ready");
      return;
    }
    const t1 = setTimeout(() => setPhase("entering"), 3800);
    const t2 = setTimeout(() => {
      setPhase("ready");
      sessionStorage.setItem("srj_splash_seen", "1");
    }, 4700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "splash") return <Splash />;

  return (
    // ── Key fix: background stays maroon during fade-in so no white flash ──
    <div style={{
      opacity:    phase === "ready" ? 1 : 0,
      transition: phase === "ready" ? "opacity 0.5s ease" : "none",
      background: "#4A1320", // maroon — matches hero, hides any white during transition
      minHeight:  "100vh",
    }}>
      {/* Inner wrapper goes white once content renders */}
      <div style={{ background:"#fff" }}>
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