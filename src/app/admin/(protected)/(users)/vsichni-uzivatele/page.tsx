import { Suspense } from 'react';

import AllUsersTable from '@/components/admin/allUsersTable/AllUsersTable';
import PageContentSection from '@/components/admin/pageContentSection/PageContentSection';
import { getAllUsers } from '@/lib/services/usersService';

export default function AllUsersPage() {
  const usersPromise = getAllUsers();

  return (
    <PageContentSection>
      <Suspense fallback="Loading">
        <AllUsersTable usersPromise={usersPromise} />
      </Suspense>
    </PageContentSection>
  );
}
