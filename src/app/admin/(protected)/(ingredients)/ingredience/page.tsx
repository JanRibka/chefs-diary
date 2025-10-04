import { getIngredientsWithAssignedGroupsAction } from "@/actions/admin/ingredients";
import { IngredientsTableContextProvider } from "@/components/admin/ingredientsTable/context/provider";
import IngredientsTable from "@/components/admin/ingredientsTable/IngredientsTable";
import PageContentSection from "@/components/admin/pageContentSection/PageContentSection";

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
