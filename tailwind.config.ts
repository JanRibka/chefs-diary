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
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "rgb(255, 107, 53)", // Keeping legacy for backward compat if needed temporarily
          dark: "rgb(204, 70, 28)", // Keeping legacy
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          light: "rgb(252, 252, 252)", // Keeping legacy
          dark: "rgb(214, 214, 214)", // Keeping legacy
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "animate-in": {
          from: {
            opacity: "0",
            transform: "translateY(16px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        // Logo animations
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        sparkle: {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1) rotate(0deg)",
          },
          "50%": {
            opacity: "0.3",
            transform: "scale(1.3) rotate(180deg)",
          },
        },
        "sparkle-delayed": {
          "0%, 100%": {
            opacity: "0.7",
            transform: "scale(1) rotate(0deg)",
          },
          "50%": {
            opacity: "0.2",
            transform: "scale(1.5) rotate(-180deg)",
          },
        },
        "glow-pulse": {
          "0%, 100%": {
            opacity: "0.3",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.5",
            transform: "scale(1.05)",
          },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "animate-in": "animate-in 0.6s ease-out forwards",
        // Logo animations
        float: "float 3s ease-in-out infinite",
        sparkle: "sparkle 2s ease-in-out infinite",
        "sparkle-delayed": "sparkle-delayed 2s ease-in-out infinite 0.5s",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "spin-slow": "spin-slow 8s linear infinite",
      },
      maxWidth: {
        main: "1280px",
      },
      minWidth: {
        "dropdown-user": "340px",
      },
      minHeight: {
        "auth-form": "400px",
      },
      height: {
        auth: "700px",
        hero: "500px",
        "hero-lg": "600px",
      },
      backgroundSize: {
        70: "70%",
      },
      lineHeight: {
        15: "3.75rem",
      },
      fontWeight: {
        inherit: "inherit",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [heroui(), require("tailwindcss-animate")],
};

export default config;
