import { getIngredientsWithAssignedGroupsAction } from "@/actions/admin/ingredients";
import { IngredientsTableContextProvider } from "@/components/features/admin/ingredientsTable/context/provider";
import IngredientsTable from "@/components/features/admin/ingredientsTable/IngredientsTable";
import PageContentSection from "@/components/features/admin/pageContentSection/PageContentSection";

export default function IngredientGroupsPage() {
  return (
    <PageContentSection className="flex-1">
      <IngredientsTableContextProvider>
        <IngredientsTable
          serverAction={getIngredientsWithAssignedGroupsAction}
        />
      </IngredientsTableContextProvider>
    </PageContentSection>
  );
}
