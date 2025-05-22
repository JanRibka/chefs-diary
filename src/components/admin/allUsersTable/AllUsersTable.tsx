"use client";

import { useCallback, useMemo } from "react";

import Spinner from "@/components/shared/spinner/Spinner";
import useGetAllUserPaginated from "@/lib/hooks/apiHooks/admin/useGetAllUsersPaginated";
import { getVisibleColumns } from "@/lib/utils/table";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

import AllUsersBottomContent from "./AllUsersBottomContent";
import allUsersColumns from "./allUsersColumns";
import { allUsersRenderUserCell } from "./allUsersRenderCell";
import { useAllUsersTableContext } from "./AllUsersTableContext";
import AllUsersTopContent from "./AllUsersTopContent";

export default function AllUsersTable() {
  // Context
  const { page, pageSize, visibleColumns } = useAllUsersTableContext();

  // Data
  const { data, isLoading } = useGetAllUserPaginated(page, pageSize);

  // Constants
  const pages = useMemo(
    () => Math.ceil((data.totalCount || 0) / pageSize),
    [data.totalCount, pageSize]
  );

  // Render cell
  const renderCell = useCallback(allUsersRenderUserCell, []);

  // Header columns
  const headerColumns = useMemo(
    () => getVisibleColumns(visibleColumns, allUsersColumns),
    [visibleColumns]
  );

  return (
    <div suppressHydrationWarning>
      <Table
        isHeaderSticky
        aria-label="Všichni uživatelé"
        topContent={<AllUsersTopContent />}
        topContentPlacement="outside"
        bottomContent={<AllUsersBottomContent pages={pages} />}
        bottomContentPlacement="outside"
        fullWidth
        onChange={(e) => console.log(e)}
        onClick={(e) => console.log(e)}
        // classNames={{
        //   table: "overflow-x-auto",
        // }}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.align}
              allowsSorting={column.allowsSorting}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody
          items={data.data}
          loadingContent={<Spinner />}
          loadingState={isLoading ? "loading" : "idle"}
          emptyContent="Žádní uživatele nebyli nalezeni"
        >
          {(item) => (
            <TableRow key={item.idUser}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
