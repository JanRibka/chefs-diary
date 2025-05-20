import { headers } from 'next/headers';

import { auth as authWeb } from '@/config/auth/auth';
import { auth as authAdmin } from '@/config/auth/authAdmin';
import adminRoutes from '@/lib/routes/adminRoutes';

import webRoutes from '../routes/webRoutes';

export async function getProtectedSessionAdmin(returnPathName: boolean = true) {
  const session = await authAdmin();
  const isSession = !!session?.user?.id;

  if (!isSession) {
    let pathname = "";

    if (returnPathName) {
      const headersList = await headers();
      pathname = headersList.get("x-pathname") ?? adminRoutes.Dashboard;
    }

    return {
      session,
      isSession,
      redirectPath: `${adminRoutes.LogIn}?returnTo=${encodeURIComponent(
        pathname
      )}`,
    };
  } else {
    return {
      session,
      isSession,
      redirectPath: "",
    };
  }
}

export async function getProtectedSessionWeb(returnPathName: boolean = true) {
  const session = await authWeb();
  const isSession = !!session?.user?.id;

  if (!isSession) {
    let pathname = "";

    if (returnPathName) {
      const headersList = await headers();
      pathname = headersList.get("x-pathname") ?? webRoutes.Test;
    }

    return {
      session,
      isSession,
      redirectPath: `${webRoutes.LogIn}?returnTo=${encodeURIComponent(
        pathname
      )}`,
    };
  } else {
    return {
      session: session,
      isSession,
      redirectPath: "",
    };
  }
}
