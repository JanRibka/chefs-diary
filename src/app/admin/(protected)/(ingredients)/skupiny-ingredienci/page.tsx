import { Suspense } from "react";

import { getIngredientUnitGroupWithAssignedIngredientsAction } from "@/actions/admin/ingredients";
import { IngredientGroupsTableContextProvider } from "@/components/features/admin/ingredientGroupsTable/context/provider";
import IngredientGroupsTable from "@/components/features/admin/ingredientGroupsTable/IngredientGroupsTable";
import PageContentSection from "@/components/features/admin/pageContentSection/PageContentSection";
import Spinner from "@/components/shared/spinner/Spinner";

export default async function IngredientGroupsPage() {
  return (
    <PageContentSection className="flex-1">
      <IngredientGroupsTableContextProvider>
        <Suspense fallback={<Spinner />}>
          <IngredientGroupsTable
            serverAction={getIngredientUnitGroupWithAssignedIngredientsAction}
          />
        </Suspense>
      </IngredientGroupsTableContextProvider>
    </PageContentSection>
  );
}
