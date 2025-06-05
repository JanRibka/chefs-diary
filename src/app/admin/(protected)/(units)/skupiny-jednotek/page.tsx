import PageContentSection from "@/components/admin/pageContentSection/PageContentSection";
import UnitGroupsTable from "@/components/admin/unitGroupsTable/UnitGroupsTable";
import { UnitGroupsTableContextProvider } from "@/components/admin/unitGroupsTable/UnitGroupsTableContext";
import { getUnitGroupSummaries } from "@/lib/services/unitsService";

export default async function UnitGroupsPage() {
  const dataPromise = getUnitGroupSummaries();

  return (
    <PageContentSection className="flex-1">
      <UnitGroupsTableContextProvider>
        <UnitGroupsTable dataPromise={dataPromise} />
      </UnitGroupsTableContextProvider>
    </PageContentSection>
  );
}
