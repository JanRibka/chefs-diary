import AllUsersTable from '@/components/features/admin/allUsersTable/AllUsersTable';
import {
    AllUsersTableContextProvider
} from '@/components/features/admin/allUsersTable/AllUsersTableContext';
import PageContentSection from '@/components/features/admin/pageContentSection/PageContentSection';

export default function AllUsersPage() {
  return (
    <PageContentSection className="flex-1">
      <AllUsersTableContextProvider>
        <AllUsersTable />
      </AllUsersTableContextProvider>
    </PageContentSection>
  );
}
