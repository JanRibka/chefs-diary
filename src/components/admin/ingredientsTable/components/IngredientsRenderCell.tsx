import { Key } from "react";
import { IoIosAddCircle } from "react-icons/io";

import TableCellActions from "@/components/shared/table/cells/TableCellActions";
import { IngredientWithAssignedGroupDTO } from "@/lib/dTOs/admin/IngredientWithAssignedGroupDTO";

import { useIngredientActions } from "../context/IngredientActionsContext";

type IngredientActions = keyof IngredientWithAssignedGroupDTO | "actions";

export function IngredientsRenderCell(
  ingredient: IngredientWithAssignedGroupDTO,
  columnKey: Key
) {
  const {
    canEdit,
    canDelete,
    handleEditIngredient,
    handleDeleteIngredient,
    handleAddToGroup,
  } = useIngredientActions();

  const cellValue =
    ingredient[columnKey as keyof IngredientWithAssignedGroupDTO];

  switch (columnKey as IngredientActions) {
    case "actions":
      if (!canEdit && !canDelete) return null;

      return (
        <TableCellActions
          detailsIcon={IoIosAddCircle}
          hideDetails={!canEdit || !handleAddToGroup}
          detailsLabel="Přidat ingredienci ke skupině"
          onDetails={() => handleAddToGroup?.(ingredient)}
          hideEdit={!canEdit}
          editLabel="Editovat ingredienci"
          onEdit={() => handleEditIngredient(ingredient)}
          hideDelete={!canDelete}
          deleteLabel="Smazat ingredienci"
          onDelete={() => handleDeleteIngredient(ingredient)}
        />
      );
    default:
      return cellValue?.toString();
  }
}
