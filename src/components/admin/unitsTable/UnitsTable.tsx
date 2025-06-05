"use client";

import Spinner from "@/components/shared/spinner/Spinner";
import { UnitWithGroupInfoSummaryDTO } from "@/lib/dTOs/admin/UnitWithGroupInfoSummaryDTO";
import { ActionResponseDTO } from "@/lib/dTOs/shared/ActionResponseDTO";
import { PaginatedDTO } from "@/lib/dTOs/shared/PaginatedDTO";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

import AddUnitToGroupModal from "./addUnitToGroupModal/AddUnitToGroupModal";
import DeleteUnitModal from "./deleteUnitModal/DeleteUnitModal";
import EditUnitModal from "./editUnitModal/EditUnitModal";
import InsertUnitModal from "./InsertUnitModal/InsertUnitModal";
import UnitsBottomContent from "./UnitsBottomContent";
import getUnitsColumns from "./unitsColumns";
import { unitsRenderCell } from "./unitsRenderCell";
import UnitsTopContent from "./UnitsTopContent";
import useUnitOptimistic from "./useUnitOptimistic";
import useUnitHandlers from "./useUnitsHandlers";
import { useUnitsTableState } from "./useUnitsTableState";

export type SetOptimisticUnitType = {
  type: "add" | "update" | "delete";
  unit: UnitWithGroupInfoSummaryDTO;
};

type Props = {
  dataPromise: Promise<
    ActionResponseDTO<PaginatedDTO<UnitWithGroupInfoSummaryDTO>>
  >;
};

export default function UnitsTable({ dataPromise }: Props) {
  const {
    data,
    sortDescriptor,
    setSortDescriptor,
    pages,
    canEdit,
    canDelete,
    optimisticUnits,
    setOptimisticUnit,
  } = useUnitsTableState(dataPromise);

  const { insertUnit, editUnit, deleteUnit } =
    useUnitOptimistic(setOptimisticUnit);

  const {
    unitToDelete,
    setUnitToDelete,
    unitToEdit,
    setUnitToEdit,
    unitToAdd,
    setUnitToAdd,
    insertModal,
    editModal,
    deleteModal,
    addToGroupModal,
    handleDeleteUnit,
    handleEditUnit,
    handleAddToGroup,
  } = useUnitHandlers();

  return (
    <div className="h-full">
      <Table
        isHeaderSticky
        isStriped
        aria-label="Jednotky"
        topContent={
          <UnitsTopContent onPressInsertUnit={insertModal.onOpenChange} />
        }
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
        <TableHeader columns={getUnitsColumns(canEdit || canDelete)}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.align}
              allowsSorting={column.allowsSorting}
              width={column.width}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody
          items={optimisticUnits}
          loadingContent={<Spinner />}
          emptyContent="Žádný jednotka nebyla nalezena"
        >
          {(item) => (
            <TableRow key={item.idUnit}>
              {(columnKey) => (
                <TableCell>
                  {unitsRenderCell(
                    item,
                    columnKey,
                    canEdit,
                    canDelete,
                    handleAddToGroup,
                    handleEditUnit,
                    handleDeleteUnit
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <InsertUnitModal
        isOpen={insertModal.isOpen}
        onOpenChange={insertModal.onOpenChange}
        setOptimisticUnit={insertUnit}
      />

      <EditUnitModal
        unit={unitToEdit}
        isOpen={editModal.isOpen}
        onOpenChange={editModal.onOpenChange}
        setOptimisticUnit={editUnit}
        setUnitToEdit={setUnitToEdit}
      />

      <DeleteUnitModal
        unit={unitToDelete}
        isOpen={deleteModal.isOpen}
        onOpenChange={deleteModal.onOpenChange}
        setOptimisticUnit={deleteUnit}
        setUnitToDelete={setUnitToDelete}
      />

      <AddUnitToGroupModal
        unit={unitToAdd}
        isOpen={addToGroupModal.isOpen}
        onOpenChange={addToGroupModal.onOpenChange}
        // setOptimisticUnit={setOptimisticUnit}
        setUnitToAdd={setUnitToAdd}
      />
    </div>
  );
}
