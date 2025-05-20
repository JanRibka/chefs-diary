import { headers } from 'next/headers';

import { auth as authWeb } from '@/config/auth/auth';
import { auth as authAdmin } from '@/config/auth/authAdmin';
import adminRoutes from '@/lib/routes/adminRoutes';

import webRoutes from '../routes/webRoutes';

export async function getProtectedSessionAdmin(returnPathName: boolean = true) {
  const session = await authAdmin();

  if (!session?.user?.id) {
    let pathname = "";

    if (returnPathName) {
      const headersList = await headers();
      pathname = headersList.get("x-pathname") ?? adminRoutes.Dashboard;
    }

    return {
      session: session,
      redirectPath: `${adminRoutes.LogIn}?returnTo=${encodeURIComponent(
        pathname
      )}`,
    };
  } else {
    return {
      session: session,
      redirectPath: "",
    };
  }
}

export async function getProtectedSessionWeb(returnPathName: boolean = true) {
  const session = await authWeb();

  if (!session?.user?.id) {
    let pathname = "";

    if (returnPathName) {
      const headersList = await headers();
      pathname = headersList.get("x-pathname") ?? webRoutes.Test;
    }

    return {
      session: session,
      redirectPath: `${webRoutes.LogIn}?returnTo=${encodeURIComponent(
        pathname
      )}`,
    };
  } else {
    return {
      session: session,
      redirectPath: "",
    };
  }
}
