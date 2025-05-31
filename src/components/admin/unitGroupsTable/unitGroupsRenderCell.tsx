import { Key } from "react";

import TableCellActions from "@/components/shared/tableCellActions/TableCellActions";
import { UnitGroup } from "@prisma/client";

type UnitGroupActions = keyof UnitGroup | "actions";

export function unitGroupsRenderCell(
  group: UnitGroup,
  columnKey: Key,
  canEdit: boolean,
  idUnitGroup: number,
  onEdit: (idUnitGroup: number) => void,
  onDelete: (idUnitGroup: number) => void
) {
  const cellValue = group[columnKey as keyof UnitGroup];

  switch (columnKey as UnitGroupActions) {
    case "actions":
      if (!canEdit) return null;

      return (
        <TableCellActions
          hideDetails
          editLabel="Editovat skupinu"
          onEdit={() => onEdit(idUnitGroup)}
          deleteLabel="Smazat skupinu"
          onDelete={() => onDelete(idUnitGroup)}
        />
      );
    default:
      return cellValue?.toString();
  }
}
