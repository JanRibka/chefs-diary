import NavBar from "@/components/features/layout/admin/protectedLayout/navBar/NabBar";
import MenuItems from "@/components/features/layout/admin/protectedLayout/sideBar/menuItems/MenuItems";
import SideBar from "@/components/features/layout/admin/protectedLayout/sideBar/SideBar";
import ClientReplace from "@/components/shared/clientReplace/ClientReplace";
import { UserContextProvider } from "@/lib/context/UserContext";
import SessionUserType from "@/lib/types/common/SessionUserType";
import { getProtectedSessionAdmin } from "@/lib/utils/session";

type Props = { children: React.ReactNode };

export default async function ProtectedAdminLayout({ children }: Props) {
  const { session, isSession, redirectPath } = await getProtectedSessionAdmin();

  if (!isSession) {
    return (
      <UserContextProvider initialUser={null}>
        <ClientReplace path={redirectPath} />
      </UserContextProvider>
    );
  }

  return (
    <UserContextProvider initialUser={session.user as SessionUserType}>
      <div className="flex flex-col min-h-screen h-screen">
        <NavBar />
        <SideBar>
          <MenuItems />
        </SideBar>
        <div className="flex flex-1 ml-0 md:ml-24 xl:ml-40 2xl:ml-44 transition-all duration-200 ease-linear min-h-0">
          <main className="flex-1 py-[0.938rem] md:py-[1.875rem] 2xl:py-10 px-[0.938rem] md:px-[1.875rem] 2xl:px-10 mx-auto bg-pageBackground overflow-x-hidden overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </UserContextProvider>
  );
}
