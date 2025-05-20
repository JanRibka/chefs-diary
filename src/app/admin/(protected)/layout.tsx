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
      <div className="flex flex-col h-screen">
        <NavBar />
        <SideBar />
        <div className="flex-1 ml-0 md:ml-24 xl:ml-40 2xl:ml-44 transition-all duration-200 ease-linear overflow-auto">
          <main className="pt-[0.938rem] md:pt-[1.875rem] 2xl:pt-10 px-[0.938rem] md:px-[1.875rem] 2xl:px-10 mx-auto bg-pageBackground h-full overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </SetUser>
  );
}
