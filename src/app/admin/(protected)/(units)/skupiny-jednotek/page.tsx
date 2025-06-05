import { Suspense } from "react";

import PageContentSection from "@/components/admin/pageContentSection/PageContentSection";
import UnitGroupsTable from "@/components/admin/unitGroupsTable/UnitGroupsTable";
import { UnitGroupsTableContextProvider } from "@/components/admin/unitGroupsTable/UnitGroupsTableContext";
import Spinner from "@/components/shared/spinner/Spinner";
import { getUnitGroupSummaries } from "@/lib/services/unitsService";

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
