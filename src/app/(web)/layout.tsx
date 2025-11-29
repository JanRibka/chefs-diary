import { UserContextProvider } from "@/lib/context/UserContext";
import SessionUserType from "@/lib/types/common/SessionUserType";
import { getProtectedSessionWeb } from "@/lib/utils/session";

type Props = { children: React.ReactNode };

export default async function WebLayout({ children }: Props) {
  // Načteme session, ale nepřesměrováváme, pokud není (public access)
  const { session } = await getProtectedSessionWeb(false);

  return (
    <UserContextProvider initialUser={session?.user as SessionUserType}>
      {children}
    </UserContextProvider>
  );
}
