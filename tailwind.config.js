/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  important: "#__next",
  prefix: "tw-",
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,mdx,tsx}",
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
  plugins: [],
  // plugins: ["tailwindcss-animate"],
};
