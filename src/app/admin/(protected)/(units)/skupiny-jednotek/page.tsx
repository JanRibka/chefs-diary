import { Suspense } from "react";

import PageContentSection from "@/components/features/admin/pageContentSection/PageContentSection";
import UnitGroupsTable from "@/components/features/admin/unitGroupsTable/UnitGroupsTable";
import { UnitGroupsTableContextProvider } from "@/components/features/admin/unitGroupsTable/UnitGroupsTableContext";
import Spinner from "@/components/shared/spinner/Spinner";
import { getUnitGroupSummaries } from "@/lib/services/unitService";

export default async function UnitGroupsPage() {
  const dataPromise = getUnitGroupSummaries();
  //TODO: Data budu volat jako na lid0 aakorát přes server action a loading bude jen v atbulce
  return (
    <PageContentSection className="flex-1">
      <UnitGroupsTableContextProvider>
        <Suspense fallback={<Spinner />}>
          <UnitGroupsTable dataPromise={dataPromise} />
        </Suspense>
      </UnitGroupsTableContextProvider>
    </PageContentSection>
  );
}
