import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Black & white redesign: "amber" is the site's structural chrome hue (text,
        // backgrounds, borders — used everywhere via amber-* utility classes), so we
        // override it here instead of touching every component. Shades 400-600 are
        // the single accent color (green, matching the admin's default storefront
        // theme color in branding.ts) kept for buttons/CTAs/highlights per the
        // black-and-white-plus-one-accent brief. Every other shade is true grayscale.
        amber: {
          50:  "#FAFAFA",
          100: "#F0F0F0",
          200: "#DCDCDC",
          300: "#BFBFBF",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#4D4D4D",
          800: "#2E2E2E",
          900: "#1A1A1A",
          950: "#0A0A0A",
        },
        tea: {
          50: "#FFF8F0",
          100: "#FEECD8",
          200: "#FDD5A8",
          300: "#FBBB72",
          400: "#F89A3A",
          500: "#F67C14",
          600: "#E66008",
          700: "#BF470A",
          800: "#983811",
          900: "#7C3012",
          950: "#431507",
        },
        gold: {
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
        dark: {
          100: "#2D1B0E",
          200: "#1A0A00",
          300: "#0D0500",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        steam: {
          "0%": { opacity: "0", transform: "translateY(0) scaleX(1)" },
          "50%": { opacity: "0.7", transform: "translateY(-20px) scaleX(1.4)" },
          "100%": { opacity: "0", transform: "translateY(-40px) scaleX(0.6)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        particle: {
          "0%": { transform: "translateY(110vh) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "0.5" },
          "100%": { transform: "translateY(-10vh) rotate(720deg)", opacity: "0" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(-5%)", animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)" },
          "50%": { transform: "translateY(0)", animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        steam: "steam 2.5s ease-out infinite",
        shimmer: "shimmer 2.5s infinite",
        glow: "glow 2s ease-in-out infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        particle: "particle 10s ease-in-out infinite",
        "bounce-gentle": "bounce-gentle 2s infinite",
        ripple: "ripple 0.6s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
