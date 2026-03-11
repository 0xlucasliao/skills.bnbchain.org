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
        "bnb-dark": "#0B0E11",
        "bnb-card": "#161A1E",
        "bnb-card-hover": "#1E2329",
        "bnb-border": "#2B3139",
        "bnb-yellow": "#F0B90B",
        "bnb-text": "#EAECEF",
        "bnb-muted": "#848E9C",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "gradient-x": "gradient-shift 8s ease infinite",
        "particle-drift": "particle-drift 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(240,185,11,0.3), 0 0 40px rgba(240,185,11,0.1)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(240,185,11,0.6), 0 0 80px rgba(240,185,11,0.2)",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "particle-drift": {
          "0%": { transform: "translateY(100vh) translateX(0px)" },
          "100%": { transform: "translateY(-100px) translateX(50px)" },
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
