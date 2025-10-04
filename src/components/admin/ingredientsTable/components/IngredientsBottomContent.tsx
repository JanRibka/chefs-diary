import { memo } from "react";

import TableBottomContent from "@/components/shared/table/bottomContent/TableBottomContent";

import { useIngredientsTableContext } from "../context/hooks/useIngredientsTableContext";

interface IngredientsBottomContentProps {
  pages: number;
  totalIngredients: number | null | undefined;
}

const IngredientsBottomContent = memo(
  ({ pages, totalIngredients }: IngredientsBottomContentProps) => {
    const { state, actions } = useIngredientsTableContext();

    return (
      <TableBottomContent
        currentPage={state.page}
        totalPages={pages}
        onPageChange={actions.setPage}
        pageSize={state.pageSize}
        onPageSizeChange={actions.setPageSize}
        totalRecords={totalIngredients}
        recordLabels={{
          singular: "ingredience",
          plural: "ingrediencí",
          few: "ingredience",
        }}
      />
    );
  }
);

IngredientsBottomContent.displayName = "IngredientsBottomContent";

export default IngredientsBottomContent;
