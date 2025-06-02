import PageContent from "@/components/admin/pageContent/PageContent";
import PageTitle from "@/components/admin/pageTitle/PageTitle";
import RedirectUnpermittedPage from "@/components/shared/layout/redirectUnpermittedPage/RedirectUnpermittedPage";
import adminRoutes from "@/lib/routes/adminRoutes";
import { getPermissionsForAdminMenuItem } from "@/lib/utils/admin";

type Props = { children: React.ReactNode };

export default function UnitGroupsLayout({ children }: Props) {
  return (
    <RedirectUnpermittedPage
      allowedPermissions={getPermissionsForAdminMenuItem("unit-groups")}
      redirectPath={adminRoutes.Dashboard}
    >
      <div className="min-h-full flex flex-col">
        <PageTitle>Skupiny jednotek</PageTitle>
        <PageContent className="flex-1">{children}</PageContent>
      </div>
    </RedirectUnpermittedPage>
  );
}
