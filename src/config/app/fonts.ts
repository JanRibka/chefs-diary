import { Fira_Code as FontMono, Inter as FontSans, Poppins as FontDisplay, Playfair_Display as FontSerif, Merriweather as FontOrn } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontDisplay = FontDisplay({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-display",
});

export const fontSerif = FontSerif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});

export const fontOrn = FontOrn({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-orn",
});
