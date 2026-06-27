import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: { DEFAULT: "#090611", secondary: "#0D0A18" },
        card: { DEFAULT: "#141022", hover: "#1A1530", elevated: "#1F1A38" },
        border: { DEFAULT: "#3A2462", subtle: "#241850", bright: "#6B3FA0" },
        primary: { DEFAULT: "#9B59E8", foreground: "#FFFFFF", hover: "#B070F0", muted: "#6B3FA0" },
        pink: { accent: "#E85998", light: "#F472B6", muted: "#9B3366" },
        text: { primary: "#FFFFFF", secondary: "#C4B8E8", muted: "#8B7BAA", faint: "#5A4D7A" },
        foreground: "#FFFFFF",
        popover: { DEFAULT: "#141022", foreground: "#FFFFFF" },
        secondary: { DEFAULT: "#1A1530", foreground: "#C4B8E8" },
        muted: { DEFAULT: "#1A1530", foreground: "#8B7BAA" },
        accent: { DEFAULT: "#3A2462", foreground: "#FFFFFF" },
        destructive: { DEFAULT: "#E84545", foreground: "#FFFFFF" },
        input: "#241850",
        ring: "#9B59E8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.25rem",
        "4xl": "1.5rem",
      },
      backgroundImage: {
        "gradient-purple": "linear-gradient(135deg, #9B59E8 0%, #6B3FA0 100%)",
        "gradient-pink": "linear-gradient(135deg, #E85998 0%, #9B3366 100%)",
        "gradient-luxury": "linear-gradient(135deg, #9B59E8 0%, #E85998 100%)",
        "gradient-dark": "linear-gradient(180deg, #141022 0%, #090611 100%)",
        "gradient-glow-purple": "radial-gradient(ellipse at center, rgba(155, 89, 232, 0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        "glow-purple": "0 0 20px rgba(155, 89, 232, 0.3), 0 0 40px rgba(155, 89, 232, 0.1)",
        "glow-pink": "0 0 20px rgba(232, 89, 152, 0.3)",
        "glow-soft": "0 0 30px rgba(155, 89, 232, 0.15)",
        card: "0 4px 24px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(0, 0, 0, 0.3)",
        "card-hover": "0 8px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(155, 89, 232, 0.1)",
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "slide-up": { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "glow-pulse": { "0%, 100%": { opacity: "0.4" }, "50%": { opacity: "0.8" } },
        shimmer: { from: { backgroundPosition: "-200% 0" }, to: { backgroundPosition: "200% 0" } },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
