import { AdapterUser } from 'next-auth/adapters';
import { headers } from 'next/headers';

import NavBar from '@/components/admin/layout/protectedLayout/navBar/NabBar';
import SideBar from '@/components/admin/layout/protectedLayout/sideBar/SideBar';
import ClientReplace from '@/components/shared/clientReplace/ClientReplace';
import SetUser from '@/components/shared/layout/setUser/SetUser';
import { auth } from '@/config/auth/authAdmin';
import adminRoutes from '@/lib/routes/adminRoutes';

type Props = { children: React.ReactNode };

export default async function ProtectedLayout({ children }: Props) {
  const session = await auth();

  if (!session || typeof session !== "object" || !("userId" in session)) {
    const headersList = await headers();
    const returnTo = headersList.get("x-pathname") ?? adminRoutes.Dashboard;

    return (
      <SetUser user={undefined}>
        <ClientReplace
          path={`${adminRoutes.LogIn}?returnTo=${encodeURIComponent(returnTo)}`}
        />
      </SetUser>
    );
  }

  return (
    <SetUser user={session.user as AdapterUser}>
      <>
        <NavBar />
        {/* <SideBar /> */}
        {children}
      </>
    </SetUser>
  );
}
