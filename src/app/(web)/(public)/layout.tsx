import { UserContextProvider } from "@/lib/context/UserContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserContextProvider initialUser={null}>{children}</UserContextProvider>
  );
}
