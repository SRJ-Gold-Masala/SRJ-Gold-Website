import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "#6B1E2E",
          deep:    "#4A1320",
          light:   "#8B2E42",
        },
        gold: {
          DEFAULT: "#C9981A",
          bright:  "#E0B428",
          pale:    "#FBF5E4",
          faint:   "#F7F2E8",
        },
        cream: {
          DEFAULT: "#F7F2E8",
          dark:    "#EDE3CC",
        },
        ink: {
          DEFAULT: "#1A1209",
          mid:     "#3D2B10",
          muted:   "#7A6A52",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans:  ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        float:  "float 5s ease-in-out infinite",
        pulse2: "pulse2 2s ease-in-out infinite",
        ring:   "ring 0.9s cubic-bezier(0.22,1,0.36,1) both",
        fadeUp: "fadeUp 0.65s ease both",
        bar:    "bar 3.3s ease both",
      },
      keyframes: {
        float:  { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-13px)" } },
        pulse2: { "0%,100%": { boxShadow: "0 0 28px rgba(201,152,26,0.3)" }, "50%": { boxShadow: "0 0 56px rgba(201,152,26,0.65)" } },
        ring:   { from: { opacity: "0", transform: "scale(0.2)" }, to: { opacity: "1", transform: "scale(1)" } },
        fadeUp: { from: { opacity: "0", transform: "translateY(18px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        bar:    { from: { width: "0" }, to: { width: "100%" } },
      },
      boxShadow: {
        gold: "0 4px 24px rgba(201,152,26,0.25)",
        card: "0 12px 32px rgba(74,19,32,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
