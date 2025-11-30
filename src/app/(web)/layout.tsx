import { WebLayout } from "@/components/features/layout/web/WebLayout/WebLayout";
import { SSRSafeThemeProvider } from "@/lib/context/SSRSafeThemeContext";
import { UserContextProvider } from "@/lib/context/UserContext";

export default async function RootWebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Pass-through layout - specific layouts handle providers and structure
  return (
    <UserContextProvider initialUser={null}>
      <SSRSafeThemeProvider>
        <WebLayout>{children}</WebLayout>
      </SSRSafeThemeProvider>
    </UserContextProvider>
  );
}
