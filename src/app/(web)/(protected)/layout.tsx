import ClientReplace from "@/components/shared/clientReplace/ClientReplace";

import { UserContextProvider } from "@/lib/context/UserContext";
import { getProtectedSessionWeb } from "@/lib/utils/session";

import SessionUserType from "@/lib/types/common/SessionUserType";

type Props = { children: React.ReactNode };

export default async function ProtectedWebLayout({ children }: Props) {
  const { isSession, redirectPath, session } = await getProtectedSessionWeb();

  if (!isSession) {
    return (
      <UserContextProvider initialUser={null}>
        <ClientReplace path={redirectPath} />
      </UserContextProvider>
    );
  }

  return (
    <UserContextProvider
      initialUser={isSession ? (session?.user as SessionUserType) : null}
    >
      {children}
    </UserContextProvider>
  );
}
