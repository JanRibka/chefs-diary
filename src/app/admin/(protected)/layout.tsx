import { headers } from "next/headers";

import ClientReplace from "@/components/shared/clientReplace/ClientReplace";
import { auth } from "@/config/auth/authAdmin";
import adminRoutes from "@/lib/routes/adminRoutes";

type Props = { children: React.ReactNode };

export default async function AdminLayout({ children }: Props) {
  const session = await auth();

  if (!session || typeof session !== "object" || !("userId" in session)) {
    const headersList = await headers();
    const returnTo = headersList.get("x-pathname") ?? adminRoutes.Dashboard;

    return (
      <ClientReplace
        path={`${adminRoutes.LogIn}?returnTo=${encodeURIComponent(returnTo)}`}
      />
    );
  }

  return <>{children}</>;
}
