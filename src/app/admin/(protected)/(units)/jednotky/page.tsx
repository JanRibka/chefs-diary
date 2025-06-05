import PageContentSection from "@/components/admin/pageContentSection/PageContentSection";
import UnitsTable from "@/components/admin/unitsTable/UnitsTable";
import { UnitsTableContextProvider } from "@/components/admin/unitsTable/UnitsTableContext";
import { getUnitWithGroupInfoSummary } from "@/lib/services/unitsService";

export default function UnitsPage() {
  const dataPromise = getUnitWithGroupInfoSummary();

  return (
    <PageContentSection className="flex-1">
      <UnitsTableContextProvider>
        <UnitsTable dataPromise={dataPromise} />
      </UnitsTableContextProvider>
    </PageContentSection>
  );
}
