"use client";

import { useCallback } from "react";

import ConfirmModal from "@/components/shared/actionModal/ConfirmModal";
import Spinner from "@/components/shared/spinner/Spinner";
import useUnitsTableData from "@/lib/hooks/apiHooks/admin/useUnitsTableData";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";

import UnitsBottomContent from "./UnitsBottomContent";
import unitsColumns from "./unitsColumns";
import { unitsRenderCell } from "./unitsRenderCell";
import { useUnitsTableContext } from "./UnitsTableContext";
import UnitsTopContent from "./UnitsTopContent";

export default function UnitsTable() {
  // Add unit modal state
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Context
  const { page, pageSize, sortDescriptor, setSortDescriptor } =
    useUnitsTableContext();

  // Data
  const { data, pages, isLoading } = useUnitsTableData(
    page,
    pageSize,
    sortDescriptor
  );

  // Render cell
  const renderCell = useCallback(unitsRenderCell, []);

  return (
    <div className="h-full">
      <Table
        isHeaderSticky
        aria-label="Jednotky"
        topContent={<UnitsTopContent onPressAddUnit={onOpen} />}
        topContentPlacement="outside"
        bottomContent={
          <UnitsBottomContent pages={pages} totalUsers={data.totalCount} />
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
        <TableHeader columns={unitsColumns}>
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
          emptyContent="Žádný jednotka nebyla nalezena"
        >
          {(item) => (
            <TableRow key={item.IdUnit}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ConfirmModal
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
        headerLabel="Přidat jednotku"
      >
        <div>dsf</div>
      </ConfirmModal>
    </div>
  );
}
