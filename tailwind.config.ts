import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{tsx,ts,js,jsx,css}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gothicPurple: "#8e44ad",
        gothicBlack: "#0b0b0b",
        gothicPink: "#e83e8c"
      },
      fontFamily: {
        gothic: ["\"Noto Sans JP\"", "sans-serif"]
      },
      backdropBlur: {
        xs: "2px"
      }
    }
  },
  plugins: []
} satisfies Config;
