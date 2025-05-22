import AllUsersTable from "@/components/admin/allUsersTable/AllUsersTable";
import { AllUsersTableContextProvider } from "@/components/admin/allUsersTable/AllUsersTableContext";
import PageContentSection from "@/components/admin/pageContentSection/PageContentSection";

export default function AllUsersPage() {
  return (
    <PageContentSection>
      <AllUsersTableContextProvider>
        <AllUsersTable />
      </AllUsersTableContextProvider>
    </PageContentSection>
  );
}
