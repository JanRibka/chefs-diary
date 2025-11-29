import { SideBarContextProvider } from "@/lib/context/SideBarContext";

type Props = { children: React.ReactNode };

export default function AdminLayout({ children }: Props) {
  return <SideBarContextProvider>{children}</SideBarContextProvider>;
}
