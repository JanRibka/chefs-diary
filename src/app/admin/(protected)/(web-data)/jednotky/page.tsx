import PageContentSection from "@/components/admin/pageContentSection/PageContentSection";
import UnitsTable from "@/components/admin/unitsTable/UnitsTable";
import { UnitsTableContextProvider } from "@/components/admin/unitsTable/UnitsTableContext";

export default function UnitsPage() {
  const unitsPromise = GetAll;
  return (
    <PageContentSection className="flex-1">
      <UnitsTableContextProvider>
        <UnitsTable />
      </UnitsTableContextProvider>
    </PageContentSection>
  );
}
