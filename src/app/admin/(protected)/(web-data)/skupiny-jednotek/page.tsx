import PageContentSection from "@/components/admin/pageContentSection/PageContentSection";
import UnitGroupsTable from "@/components/admin/unitGroupsTable/UnitGroupsTable";
import { UnitGroupsTableContextProvider } from "@/components/admin/unitGroupsTable/UnitGroupsTableContext";
import { getAllUnitGroups } from "@/lib/services/webDataService";

export default async function UnitGroupsPage() {
  const dataPromise = getAllUnitGroups();

  return (
    <PageContentSection className="flex-1">
      <UnitGroupsTableContextProvider>
        <UnitGroupsTable dataPromise={dataPromise} />
      </UnitGroupsTableContextProvider>
    </PageContentSection>
  );
}
