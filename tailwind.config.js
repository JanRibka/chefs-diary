/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,mdx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: ["tailwindcss-animate"],
};
