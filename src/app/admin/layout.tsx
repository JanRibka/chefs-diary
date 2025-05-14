import { SideBarContextProvider } from "@/context/SideBarContext";
import { UserContextProvider } from "@/context/UserContext";

type Props = { children: React.ReactNode };

export default function AdminLayout({ children }: Props) {
  return (
    <UserContextProvider>
      <SideBarContextProvider>{children}</SideBarContextProvider>
    </UserContextProvider>
  );
}
