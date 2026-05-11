import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        display: ["var(--font-syne)", "sans-serif"],
      },
      colors: {
        brand: {
          50:  "#edfcff",
          100: "#d6f7ff",
          200: "#a5f1ff",
          300: "#63e9ff",
          400: "#18d8fb",
          500: "#00bce1",
          600: "#0096bd",
          700: "#027799",
          800: "#0a607b",
          900: "#0e5068",
          950: "#053548",
        },
        surface: {
          0:   "#09090b",
          1:   "#0f0f12",
          2:   "#141418",
          3:   "#1a1a20",
          4:   "#202028",
          5:   "#282834",
        },
        ink: {
          1: "#ffffff",
          2: "#e4e4f0",
          3: "#a0a0b8",
          4: "#60607a",
          5: "#3a3a52",
        },
        stage: {
          cold:        "#334155",
          contacted:   "#1e3a5f",
          demo_booked: "#1e3a5f",
          demo_done:   "#1c3048",
          proposal:    "#2d2a4a",
          closed:      "#1a3329",
        },
        danger: {
          DEFAULT: "#ef4444",
          muted:   "#3b1515",
          border:  "#7f1d1d",
        },
        warning: {
          DEFAULT: "#f59e0b",
          muted:   "#2d2006",
        },
        success: {
          DEFAULT: "#22c55e",
          muted:   "#052e16",
        },
      },
      boxShadow: {
        card: "0 0 0 1px rgba(255,255,255,0.06), 0 2px 8px rgba(0,0,0,0.4)",
        "card-hover": "0 0 0 1px rgba(255,255,255,0.1), 0 4px 16px rgba(0,0,0,0.5)",
        glow: "0 0 20px rgba(0,188,225,0.25)",
        "glow-danger": "0 0 16px rgba(239,68,68,0.3)",
      },
      animation: {
        "slide-in-right": "slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in": "fadeIn 0.2s ease",
        "pulse-dot": "pulseDot 2s infinite",
      },
      keyframes: {
        slideInRight: {
          from: { transform: "translateX(100%)", opacity: "0" },
          to:   { transform: "translateX(0)",    opacity: "1" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.4" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
