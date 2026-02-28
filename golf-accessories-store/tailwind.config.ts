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
        "electric-green": "#00FF88",
        "sunset-orange": "#FF6B35",
        "deep-navy": "#1A237E",
        "neon-pink": "#FF10F0",
        "vibrant-yellow": "#FFD700",
        "electric-blue": "#00D4FF",
        "retro-purple": "#9C27B0",
        "floral-red": "#E91E63",
        "bone-white": "#F8F9FA",
        "soft-gray": "#E9ECEF",
        "warm-gray": "#6C757D",
        "foreground": "#2C3E50",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 255, 136, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 255, 136, 0.8)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
