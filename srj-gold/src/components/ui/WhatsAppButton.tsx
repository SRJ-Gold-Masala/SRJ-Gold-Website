"use client";

export function WhatsAppButton() {
  const phone   = "919008272640";
  const message = "Hello! I'm interested in SRJ Gold Spices products. Could you please help me?";
  const url     = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          position:       "fixed",
          bottom:         28,
          right:          28,
          zIndex:         999,
          width:          56,
          height:         56,
          borderRadius:   "50%",
          background:     "#25D366",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          boxShadow:      "0 4px 20px rgba(37,211,102,0.45)",
          textDecoration: "none",
          transition:     "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform  = "scale(1.1)";
          el.style.boxShadow  = "0 6px 28px rgba(37,211,102,0.6)";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform  = "scale(1)";
          el.style.boxShadow  = "0 4px 20px rgba(37,211,102,0.45)";
        }}
      >
        {/* WhatsApp SVG icon */}
        <svg width={28} height={28} viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.549 4.11 1.507 5.843L.057 23.5a.5.5 0 00.613.612l5.701-1.442A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.658-.516-5.168-1.414l-.37-.22-3.833.97.992-3.78-.242-.388A9.961 9.961 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>

      {/* Pulse ring animation */}
      <style>{`
        @keyframes waPulse {
          0%   { transform:scale(1);   opacity:0.6; }
          100% { transform:scale(1.6); opacity:0;   }
        }
      `}</style>
      <div style={{
        position:     "fixed",
        bottom:       28,
        right:        28,
        zIndex:       998,
        width:        56,
        height:       56,
        borderRadius: "50%",
        background:   "#25D366",
        animation:    "waPulse 2s ease-out infinite",
        pointerEvents:"none",
      }} />
    </>
  );
}
