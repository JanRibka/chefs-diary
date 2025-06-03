import { Key } from "react";
import { IoIosAddCircle } from "react-icons/io";

import TableCellActions from "@/components/shared/tableCellActions/TableCellActions";
import UserWithStatsDTO from "@/lib/dTOs/admin/UserWithStatsDTO";
import { Unit } from "@prisma/client";

type UserWithStatsActions = keyof UserWithStatsDTO | "actions";

export function unitsRenderCell(
  unit: Unit,
  columnKey: Key,
  canEdit: boolean,
  canDelete: boolean,
  onDetails: (unit: Unit) => void,
  onEdit: (unit: Unit) => void,
  onDelete: (unit: Unit) => void
) {
  const cellValue = unit[columnKey as keyof Unit];

  switch (columnKey as UserWithStatsActions) {
    case "actions":
      if (!canEdit && !canDelete) return null;

      return (
        <TableCellActions
          detailsIcon={IoIosAddCircle}
          hideDetails={!canEdit}
          detailsLabel="Přidat jednotku ke skupině"
          onDetails={() => onDetails(unit)}
          hideEdit={!canEdit}
          editLabel="Editovat jednotku"
          onEdit={() => onEdit(unit)}
          hideDelete={!canDelete}
          deleteLabel="Smazat jednotku"
          onDelete={() => onDelete(unit)}
        />
      );
    default:
      return cellValue?.toString();
  }
}
