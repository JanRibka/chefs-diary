"use client";

import { useCallback, useMemo } from "react";

import Spinner from "@/components/shared/spinner/Spinner";
import useAllUsersTableData from "@/lib/hooks/apiHooks/admin/useAllUsersTableData";
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
import { allUsersRenderCell } from "./allUsersRenderCell";
import { useAllUsersTableContext } from "./AllUsersTableContext";
import AllUsersTopContent from "./AllUsersTopContent";

export default function AllUsersTable() {
  // Context
  const {
    page,
    pageSize,
    visibleColumns,
    filterValue,
    sortDescriptor,
    setSortDescriptor,
  } = useAllUsersTableContext();

  // Data
  const { data, pages, isLoading } = useAllUsersTableData(
    page,
    pageSize,
    filterValue,
    sortDescriptor
  );

  // Render cell
  const renderCell = useCallback(allUsersRenderCell, []);

  // Header columns
  const headerColumns = useMemo(
    () => getVisibleColumns(visibleColumns, allUsersColumns),
    [visibleColumns]
  );

  return (
    <div className="h-full">
      <Table
        isHeaderSticky
        aria-label="Všichni uživatelé"
        topContent={<AllUsersTopContent />}
        topContentPlacement="outside"
        bottomContent={
          <AllUsersBottomContent pages={pages} totalUsers={data.totalCount} />
        }
        bottomContentPlacement="outside"
        fullWidth
        className="h-full"
        classNames={{
          wrapper: "rounded-none shadow-none p-0 flex-1",
        }}
        onSortChange={setSortDescriptor}
        sortDescriptor={sortDescriptor}
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
          items={data.items}
          loadingContent={<Spinner />}
          loadingState={isLoading ? "loading" : "idle"}
          emptyContent="Žádný uživatel nebyl nalezen"
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
