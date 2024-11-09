import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FEF3E2",
        header: "#FA4032",
        primary: "#FAB12F",
        secondary: "#FA812F",
        hover: "#FDD7B5",
      },
    },
  },
  plugins: [],
} satisfies Config;
