import { Key } from "react";

import TableCellActions from "@/components/shared/table/cells/TableCellActions";
import { IngredientWithAssignedGroupDTO } from "@/lib/dTOs/admin/IngredientWithAssignedGroupDTO";

type IngredientActions = keyof IngredientWithAssignedGroupDTO | "actions";

export function IngredientsRenderCell(
  ingredient: IngredientWithAssignedGroupDTO,
  columnKey: Key,
  canEdit: boolean,
  canDelete: boolean,
  onEdit: (ingredient: IngredientWithAssignedGroupDTO) => void,
  onDelete: (ingredient: IngredientWithAssignedGroupDTO) => void
) {
  const cellValue =
    ingredient[columnKey as keyof IngredientWithAssignedGroupDTO];

  switch (columnKey as IngredientActions) {
    case "actions":
      if (!canEdit && !canDelete) return null;

      return (
        <TableCellActions
          hideDetails
          hideEdit={!canEdit}
          editLabel="Editovat ingredienci"
          onEdit={() => onEdit(ingredient)}
          hideDelete={!canDelete}
          deleteLabel="Smazat ingredienci"
          onDelete={() => onDelete(ingredient)}
        />
      );
    default:
      return cellValue?.toString();
  }
}
