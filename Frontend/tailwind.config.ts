import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-cormorant)", "serif"],
      },
      colors: {
        brand: {
          50:  "rgb(var(--brand-50) / <alpha-value>)",
          100: "rgb(var(--brand-100) / <alpha-value>)",
          200: "rgb(var(--brand-200) / <alpha-value>)",
          300: "rgb(var(--brand-300) / <alpha-value>)",
          400: "rgb(var(--brand-400) / <alpha-value>)",
          500: "rgb(var(--brand-500) / <alpha-value>)",
          600: "rgb(var(--brand-600) / <alpha-value>)",
          700: "rgb(var(--brand-700) / <alpha-value>)",
          800: "rgb(var(--brand-800) / <alpha-value>)",
          900: "rgb(var(--brand-900) / <alpha-value>)",
          950: "rgb(var(--brand-950) / <alpha-value>)",
        },
        surface: {
          0:   "rgb(var(--surface-0) / <alpha-value>)",
          1:   "rgb(var(--surface-1) / <alpha-value>)",
          2:   "rgb(var(--surface-2) / <alpha-value>)",
          3:   "rgb(var(--surface-3) / <alpha-value>)",
          4:   "rgb(var(--surface-4) / <alpha-value>)",
          5:   "rgb(var(--surface-5) / <alpha-value>)",
        },
        ink: {
          1: "rgb(var(--ink-1) / <alpha-value>)",
          2: "rgb(var(--ink-2) / <alpha-value>)",
          3: "rgb(var(--ink-3) / <alpha-value>)",
          4: "rgb(var(--ink-4) / <alpha-value>)",
          5: "rgb(var(--ink-5) / <alpha-value>)",
        },
        stage: {
          cold:        "rgb(var(--stage-cold) / <alpha-value>)",
          contacted:   "rgb(var(--stage-contacted) / <alpha-value>)",
          demo_booked: "rgb(var(--stage-demo-booked) / <alpha-value>)",
          demo_done:   "rgb(var(--stage-demo-done) / <alpha-value>)",
          proposal:    "rgb(var(--stage-proposal) / <alpha-value>)",
          closed:      "rgb(var(--stage-closed) / <alpha-value>)",
        },
        danger: {
          DEFAULT: "rgb(var(--danger) / <alpha-value>)",
          muted:   "rgb(var(--danger-muted) / <alpha-value>)",
          border:  "rgb(var(--danger-border) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "rgb(var(--warning) / <alpha-value>)",
          muted:   "rgb(var(--warning-muted) / <alpha-value>)",
        },
        success: {
          DEFAULT: "rgb(var(--success) / <alpha-value>)",
          muted:   "rgb(var(--success-muted) / <alpha-value>)",
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
