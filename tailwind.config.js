import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,mdx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        "background-image": "background-image",
        opacity: "opacity",
        "background-color": "background-color",
        all: "all",
      },
      maxWidth: {
        main: "1140px",
      },
      backgroundSize: {
        70: "70%",
      },
    },
  },
  plugins: [heroui()],
  // plugins: ["tailwindcss-animate"],
};
