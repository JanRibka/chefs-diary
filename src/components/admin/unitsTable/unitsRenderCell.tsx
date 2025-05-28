import { Key } from "react";

import TableCellActions from "@/components/shared/tableCellActions/TableCellActions";
import UserWithStatsDTO from "@/lib/dTOs/admin/UserWithStatsDTO";
import { Unit } from "@prisma/client";

type UserWithStatsActions = keyof UserWithStatsDTO | "actions";

export function unitsRenderCell(unit: Unit, columnKey: Key) {
  const cellValue = unit[columnKey as keyof Unit];

  switch (columnKey as UserWithStatsActions) {
    case "actions":
      return (
        <TableCellActions
          hideDetails
          editLabel="Editovat jednotku"
          hideDelete
        />
      );
    default:
      return cellValue?.toString();
  }
}
