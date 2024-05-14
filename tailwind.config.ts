import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      orange: "#E46643",
      "orange-hover": "#F39765",
      neutral: {
        100: "#ffffff",
        200: "#f5f5f5",
        300: "#e4e4e4",
        400: "#c1c4cb",
        500: "#7c8187",
        600: "#5a6069",
        700: "#35393f",
        800: "#2b2d31",
        900: "#1d1f22",
        1000: "#151619",
      },
    },
  },
  plugins: [],
};
export default config;
