"use client";

import { use, useCallback, useMemo, useOptimistic, useState } from "react";

import Spinner from "@/components/shared/spinner/Spinner";
import { useUserContext } from "@/context/UserContext";
import { ActionResponseDTO } from "@/lib/dTOs/shared/ActionResponseDTO";
import { PaginatedDTO } from "@/lib/dTOs/shared/PaginatedDTO";
import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";
import { getPageItems, getPages, getSortedItems } from "@/lib/utils/table";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import { Unit } from "@prisma/client";

import AddUnitToGroupModal from "./addUnitToGrouptModal/AddUnitToGroupModal";
import DeleteUnitModal from "./deleteUnitModal/DeleteUnitModal";
import EditUnitModal from "./editUnitModal/EditUnitModal";
import InsertUnitModal from "./InsertUnitModal/InsertUnitModal";
import UnitsBottomContent from "./UnitsBottomContent";
import getUnitsColumns from "./unitsColumns";
import { unitsRenderCell } from "./unitsRenderCell";
import { useUnitsTableContext } from "./UnitsTableContext";
import UnitsTopContent from "./UnitsTopContent";

export type SetOptimisticUnitType = {
  type: "add" | "update" | "delete";
  unit: Unit;
};

type Props = {
  dataPromise: Promise<ActionResponseDTO<PaginatedDTO<Unit>>>;
};

export default function UnitsTable({ dataPromise }: Props) {
  // Get data
  const dataWithError = use(dataPromise);
  const data = dataWithError.data!;

  // State
  const [unitToDelete, setUnitToDelete] = useState<Unit | null>(null);
  const [unitToEdit, setUnitToEdit] = useState<Unit | null>(null);
  const [unitToAdd, setUnitToAdd] = useState<Unit | null>(null);

  // Modal states
  const {
    isOpen: isOpenInsert,
    onOpen: onOpenInsert,
    onOpenChange: onOpenChangeInsert,
  } = useDisclosure();
  const {
    isOpen: isOpenEditUnit,
    onOpen: onOpenEditUnit,
    onOpenChange: onOpenChangeEditUnit,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteUnit,
    onOpen: onOpenDeleteUnit,
    onOpenChange: onOpenChangeDeleteUnit,
  } = useDisclosure();
  const {
    isOpen: isOpenAddToGroup,
    onOpen: onOpenAddToGroup,
    onOpenChange: onOpenChangeAddToGroup,
  } = useDisclosure();

  // Context
  const { user } = useUserContext();
  const { page, pageSize, sortDescriptor, setSortDescriptor } =
    useUnitsTableContext();

  // Constants
  const canEdit =
    user?.permissions.some((item) => item === PermissionTypeEnum.UNIT_EDIT) ??
    false;
  const canDelete =
    user?.permissions.some((item) => item === PermissionTypeEnum.UNIT_DELETE) ??
    false;
  const pages = useMemo(
    () => getPages(data.totalCount, pageSize),

    [data.totalCount, pageSize]
  );
  const sortedItems = useMemo(() => {
    return getSortedItems<Unit>(data.items, sortDescriptor);
  }, [sortDescriptor, data.items]);
  const pageItems = useMemo(() => {
    return getPageItems(sortedItems, page, pageSize);
  }, [sortedItems, page, pageSize]);

  // Render cell
  const renderCell = useCallback(unitsRenderCell, []);
  // Columns
  const columns = useCallback(getUnitsColumns, []);

  // Optimistic update
  const [optimisticUnits, setOptimisticUnit] = useOptimistic(
    pageItems,
    (state, action: SetOptimisticUnitType) => {
      switch (action.type) {
        case "add":
          return [...state, action.unit];
        case "update":
          return state.map((item) =>
            item.idUnit === action.unit.idUnit
              ? { ...item, name: action.unit.name }
              : item
          );
        case "delete":
          return state.filter((item) => item.idUnit !== action.unit.idUnit);
      }
    }
  );

  // Handlers
  const handleAddToGroup = (unit: Unit) => {
    setUnitToAdd(unit);
    onOpenAddToGroup();
  };

  const handleEditUnit = (unit: Unit) => {
    setUnitToEdit(unit);
    onOpenEditUnit();
  };

  const handleDeleteUnit = (unit: Unit) => {
    setUnitToDelete(unit);
    onOpenDeleteUnit();
  };

  return (
    <div className="h-full">
      <Table
        isHeaderSticky
        aria-label="Jednotky"
        topContent={<UnitsTopContent onPressInsertUnit={onOpenInsert} />}
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
        <TableHeader columns={columns(canEdit || canDelete)}>
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
                  {renderCell(
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
        isOpen={isOpenInsert}
        onOpenChange={onOpenChangeInsert}
        setOptimisticUnit={setOptimisticUnit}
      />

      <EditUnitModal
        unit={unitToEdit as Unit}
        isOpen={isOpenEditUnit}
        onOpenChange={onOpenChangeEditUnit}
        setOptimisticUnit={setOptimisticUnit}
        setUnitToEdit={setUnitToEdit}
      />

      <DeleteUnitModal
        unit={unitToDelete as Unit}
        isOpen={isOpenDeleteUnit}
        onOpenChange={onOpenChangeDeleteUnit}
        setOptimisticUnit={setOptimisticUnit}
        setUnitToDelete={setUnitToDelete}
      />

      <AddUnitToGroupModal
        unit={unitToAdd as Unit}
        isOpen={isOpenAddToGroup}
        onOpenChange={onOpenChangeAddToGroup}
        // setOptimisticUnit={setOptimisticUnit}
        setUnitToAdd={setUnitToAdd}
      />
    </div>
  );
}
