import { use } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

import columns from "./columns";

type Props = {
  usersPromise: Promise<{ id: string; name: string }[]>;
};

export default function AllUsersTable({ usersPromise }: Props) {
  const users = use(usersPromise);

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
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{item.name}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
