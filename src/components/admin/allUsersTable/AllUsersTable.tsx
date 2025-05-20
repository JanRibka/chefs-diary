"use client";

import useGetAllUserPaginated from "@/lib/hooks/apiHooks/useGetAllUserPaginated";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

import columns from "./columns";

export default function AllUsersTable() {
  const { data } = useGetAllUserPaginated(1, 50);

  return (
    <Table aria-label="Všichni uživatelé">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data.data}>
        {(item) => (
          <TableRow key={item.idUser}>
            {() => <TableCell>{item.userInfo.userName}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
