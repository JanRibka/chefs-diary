import { Suspense } from "react";

import AllUsersTable from "@/components/admin/allUsersTable/AllUsersTable";
import PageContentSection from "@/components/admin/pageContentSection/PageContentSection";

export default function AllUsersPage() {
  return (
    <PageContentSection>
      <Suspense fallback="Loading">
        <AllUsersTable />
      </Suspense>
    </PageContentSection>
  );
}
