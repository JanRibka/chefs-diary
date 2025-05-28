import { Key } from "react";

import TableCellActions from "@/components/shared/tableCellActions/TableCellActions";
import TableCellBoolean from "@/components/shared/tableCellBoolean/TableCellBoolean";
import TableCellDate from "@/components/shared/tableCellDate/TableCellDate";
import TableCellUser from "@/components/shared/tableCellUser/TableCellUser";
import UserWithStatsDTO from "@/lib/dTOs/admin/UserWithStatsDTO";

type UserWithStatsActions = keyof UserWithStatsDTO | "actions";

export function allUsersRenderCell(user: UserWithStatsDTO, columnKey: Key) {
  const cellValue = user[columnKey as keyof UserWithStatsDTO];

  switch (columnKey as UserWithStatsActions) {
    case "userName":
      return <TableCellUser user={user} />;
    case "createdAt":
    case "emailVerifiedAt":
    case "lastSuccessfulLogIn":
    case "adminLoginRestrictedUntil":
    case "webLoginRestrictedUntil":
      return <TableCellDate date={cellValue as Date | null} />;
    case "isDisabled":
      return (
        <TableCellBoolean
          value={cellValue as boolean}
          trueLabel="Zakázán"
          trueColor="danger"
          falseLabel="Povolen"
          falseColor="success"
        />
      );
    case "actions":
      return (
        <TableCellActions
          detailsLabel="Profil uživatele"
          editLabel="Editovat uživatele"
          deleteLabel="Smazat uživatele"
        />
      );
    default:
      return cellValue?.toString();
  }
}
