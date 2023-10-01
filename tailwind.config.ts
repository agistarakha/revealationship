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
        "dove-yellow": "#f6c453",
        "dove-white": "#fefbe9",
        "dove-orange": "#f0a04b",
        "dove-green": "#183a1d",
        "dove-gray": "#e1eedd",
      },
      transitionProperty: {
        height: "height",
        topheight: "top, height",
      },
      width: {
        "128": "32rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        oxygen: ["Oxygen", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
