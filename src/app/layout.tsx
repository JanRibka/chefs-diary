import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

import ToastProvider from "@/components/shared/toastProvider/ToastProvider";
import { fontSans } from "@/config/app/fonts";
import { mergeStyles } from "@/lib/utils/styles";

import { Providers } from "../config/heroUI/providers";

export const metadata: Metadata = {
  title: "Kuchařův deník",
  description:
    "Kuchařův deník je místo, kde si můžete ukládat své recepty, vytvářet jídelní plán a mít vaření vždy pod kontrolou",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={mergeStyles("min-h-screen font-sans", fontSans.variable)}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <ToastProvider
            placement="top-center"
            toastOffset={60}
            toastProps={{ timeout: 5000, shouldShowTimeoutProgress: true }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
