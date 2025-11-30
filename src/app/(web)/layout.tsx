import { WebLayout } from "@/components/features/layout/web/WebLayout/WebLayout";
import { SSRSafeThemeProvider } from "@/lib/context/SSRSafeThemeContext";

export default async function RootWebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Pass-through layout - specific layouts handle providers and structure
  return (
    <SSRSafeThemeProvider>
      <WebLayout>{children}</WebLayout>
    </SSRSafeThemeProvider>
  );
}
