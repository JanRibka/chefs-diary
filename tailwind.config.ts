import { heroui } from "@heroui/react";

import type { Config } from "tailwindcss";

const config: Config = {
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
      colors: {
        primary: {
          light: "rgb(126, 186, 67)",
          DEFAULT: "rgb(95, 139, 50)",
          dark: "rgb(75, 111, 40)",
        },
        secondary: {
          light: "rgb(252, 252, 252)",
          DEFAULT: "rgb(238, 238, 238)",
          dark: "rgb(214, 214, 214)",
        },
        dialogBackground: "rgb(238, 238, 238)",
        pageBackground: "rgb(238, 238, 238)",
        sideBarText: "rgb(127, 113, 132)",
        initial: "initial",
      },
      lineHeight: {
        15: "3.75rem",
      },
      fontWeight: {
        inherit: "inherit",
      },
    },
  },
  plugins: [heroui()],
  // plugins: ["tailwindcss-animate"],
};

export default config;
