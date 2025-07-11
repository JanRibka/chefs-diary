import { Suspense } from "react";

import { getIngredientUnitGroupWithAssignedIngredients } from "@/actions/admin/ingredients";
import IngredientGroupsTable from "@/components/admin/ingredientGroupsTable/IngredientGroupsTable";
import PageContentSection from "@/components/admin/pageContentSection/PageContentSection";
import { UnitsTableContextProvider } from "@/components/admin/unitsTable/UnitsTableContext";
import Spinner from "@/components/shared/spinner/Spinner";

export default async function IngredientGroupsPage() {
  const dataPromise = getIngredientUnitGroupWithAssignedIngredients();

  return (
    <PageContentSection className="flex-1">
      <UnitsTableContextProvider>
        <Suspense fallback={<Spinner />}>
          <IngredientGroupsTable dataPromise={dataPromise} />
        </Suspense>
      </UnitsTableContextProvider>
    </PageContentSection>
  );
}
