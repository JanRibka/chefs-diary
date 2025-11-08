import { Suspense } from "react";

import PageContentSection from "@/components/features/admin/pageContentSection/PageContentSection";
import UnitsTable from "@/components/features/admin/unitsTable/UnitsTable";
import { UnitsTableContextProvider } from "@/components/features/admin/unitsTable/UnitsTableContext";
import Spinner from "@/components/shared/spinner/Spinner";
import { getUnitWithGroupInfoSummary } from "@/lib/services/unitService";

export default function UnitsPage() {
  const dataPromise = getUnitWithGroupInfoSummary();
  //TODO: Data budu volat jako na lid0 aakorát přes server action a loading bude jen v atbulce
  return (
    <PageContentSection className="flex-1">
      <UnitsTableContextProvider>
        <Suspense fallback={<Spinner />}>
          <UnitsTable dataPromise={dataPromise} />
        </Suspense>
      </UnitsTableContextProvider>
    </PageContentSection>
  );
}
