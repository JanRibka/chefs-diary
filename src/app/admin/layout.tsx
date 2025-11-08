import { SideBarContextProvider } from "@/lib/context/SideBarContext";
import { UserContextProvider } from "@/lib/context/UserContext";

type Props = { children: React.ReactNode };

export default function AdminLayout({ children }: Props) {
  return (
    <UserContextProvider>
      <SideBarContextProvider>{children}</SideBarContextProvider>
    </UserContextProvider>
  );
}
