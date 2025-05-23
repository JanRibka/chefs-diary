import { AdapterUser } from 'next-auth/adapters';

import NavBar from '@/components/admin/layout/protectedLayout/navBar/NabBar';
import SideBar from '@/components/admin/layout/protectedLayout/sideBar/SideBar';
import ClientReplace from '@/components/shared/clientReplace/ClientReplace';
import SetUser from '@/components/shared/layout/setUser/SetUser';
import { getProtectedSessionAdmin } from '@/lib/utils/session';

type Props = { children: React.ReactNode };

export default async function ProtectedLayout({ children }: Props) {
  const { session, isSession, redirectPath } = await getProtectedSessionAdmin();

  if (!isSession) {
    return (
      <SetUser user={null}>
        <ClientReplace path={redirectPath} />
      </SetUser>
    );
  }

  return (
    <SetUser user={session.user as AdapterUser}>
      <div className="flex flex-col min-h-screen h-screen">
        <NavBar />
        <SideBar />
        <div className="flex flex-1 ml-0 md:ml-24 xl:ml-40 2xl:ml-44 transition-all duration-200 ease-linear min-h-0">
          <main className="flex-1 py-[0.938rem] md:py-[1.875rem] 2xl:py-10 px-[0.938rem] md:px-[1.875rem] 2xl:px-10 mx-auto bg-pageBackground overflow-x-hidden overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SetUser>
  );
}
