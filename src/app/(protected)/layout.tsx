import { headers } from "next/headers";

import ClientReplace from "@/components/shared/clientReplace/ClientReplace";
import { auth } from "@/config/auth/auth";
import webRoutes from "@/lib/routes/web/routes";

type Props = { children: React.ReactNode };

export default async function ProtectedLayout({ children }: Props) {
  const session = await auth();

  if (!session || typeof session !== "object" || !("userId" in session)) {
    const headersList = await headers();
    const returnTo = headersList.get("x-pathname") ?? webRoutes.Test;

    return (
      <ClientReplace
        path={`${webRoutes.LogIn}?returnTo=${encodeURIComponent(returnTo)}`}
      />
    );
  }

  return <>{children}</>;
}
