import { Key } from "react";

import TableCellBoolean from "@/components/shared/tableCellBoolean/TableCellBoolean";
import TableCellDate from "@/components/shared/tableCellDate/TableCellDate";
import TableCellUser from "@/components/shared/tableCellUser/TableCellUser";
import UserWithStatsDTO from "@/lib/dTOs/admin/UserWithStatsDTO";

export function allUsersRenderUserCell(user: UserWithStatsDTO, columnKey: Key) {
  const cellValue = user[columnKey as keyof UserWithStatsDTO];

  switch (columnKey as keyof UserWithStatsDTO) {
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
    default:
      return cellValue?.toString();
  }
}
