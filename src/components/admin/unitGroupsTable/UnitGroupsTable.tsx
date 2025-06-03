"use client";

import { use, useCallback, useMemo, useOptimistic, useState } from "react";

import EvaluateActionResponseError from "@/components/shared/evaluateActionResponseError/EvaluateActionResponseError";
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
import { UnitGroup } from "@prisma/client";

import DeleteUnitGroupModal from "./deleteUnitGroupModal/DeleteUnitGroupModal";
import EditUnitGroupModal from "./editUnitGroupModal/EditUnitGroupModal";
import InsertUnitGroupModal from "./InsertUnitGroupModal/InsertUnitGroupModal";
import UnitGroupsBottomContent from "./UnitGroupsBottomContent";
import getUnitGroupsColumns from "./unitGroupsColumns";
import { unitGroupsRenderCell } from "./unitGroupsRenderCell";
import { useUnitGroupsTableContext } from "./UnitGroupsTableContext";
import UnitGroupsTopContent from "./UnitGroupsTopContent";

export type SetOptimisticUnitGroupType = {
  type: "add" | "update" | "delete";
  group: UnitGroup;
};

type Props = {
  dataPromise: Promise<ActionResponseDTO<PaginatedDTO<UnitGroup>>>;
};

export default function UnitGroupsTable({ dataPromise }: Props) {
  // Get data
  const dataWithError = use(dataPromise);
  const data = dataWithError.data!;

  // State
  const [groupToDelete, setGroupToDelete] = useState<UnitGroup | null>(null);
  const [groupToEdit, setGroupToEdit] = useState<UnitGroup | null>(null);

  // Modal states
  const {
    isOpen: isOpenInsertGroup,
    onOpen: onOpenInsertGroup,
    onOpenChange: onOpenChangeInsertGroup,
  } = useDisclosure();
  const {
    isOpen: isOpenEditGroup,
    onOpen: onOpenEditGroup,
    onOpenChange: onOpenChangeEditGroup,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteGroup,
    onOpen: onOpenDeleteGroup,
    onOpenChange: onOpenChangeDeleteGroup,
  } = useDisclosure();

  // Context
  const { user } = useUserContext();
  const { page, pageSize, sortDescriptor, setSortDescriptor } =
    useUnitGroupsTableContext();

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
    return getSortedItems<UnitGroup>(data.items, sortDescriptor);
  }, [sortDescriptor, data.items]);
  const pageItems = useMemo(() => {
    return getPageItems(sortedItems, page, pageSize);
  }, [sortedItems, page, pageSize]);

  // Render cell
  const renderCell = useCallback(unitGroupsRenderCell, []);

  // Columns
  const columns = useCallback(getUnitGroupsColumns, []);

  // Optimistic update
  const [optimisticUnitGroups, setOptimisticUnitGroup] = useOptimistic(
    pageItems,
    (state, action: SetOptimisticUnitGroupType) => {
      switch (action.type) {
        case "add":
          return [...state, action.group];
        case "update":
          return state.map((item) =>
            item.idUnitGroup === action.group.idUnitGroup
              ? { ...item, name: action.group.name }
              : item
          );
        case "delete":
          return state.filter(
            (item) => item.idUnitGroup !== action.group.idUnitGroup
          );
      }
    }
  );

  // Handlers
  const handleEditGroup = (group: UnitGroup) => {
    setGroupToEdit(group);
    onOpenEditGroup();
  };

  const handleDeleteGroup = (group: UnitGroup) => {
    setGroupToDelete(group);
    onOpenDeleteGroup();
  };

  return (
    <>
      <EvaluateActionResponseError data={dataWithError} />

      <div className="h-full">
        <Table
          isHeaderSticky
          isStriped
          aria-label="Jednotky"
          topContent={
            <UnitGroupsTopContent onPressInsertUnit={onOpenInsertGroup} />
          }
          topContentPlacement="outside"
          bottomContent={
            <UnitGroupsBottomContent
              pages={pages}
              totalGroups={data.totalCount}
            />
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

          <TableBody items={optimisticUnitGroups}>
            {(item) => (
              <TableRow key={item.idUnitGroup}>
                {(columnKey) => (
                  <TableCell>
                    {renderCell(
                      item,
                      columnKey,
                      canEdit,
                      canDelete,
                      handleEditGroup,
                      handleDeleteGroup
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>

        <InsertUnitGroupModal
          isOpen={isOpenInsertGroup}
          onOpenChange={onOpenChangeInsertGroup}
          setOptimisticUnitGroup={setOptimisticUnitGroup}
        />

        <EditUnitGroupModal
          group={groupToEdit as UnitGroup}
          isOpen={isOpenEditGroup}
          onOpenChange={onOpenChangeEditGroup}
          setOptimisticUnitGroup={setOptimisticUnitGroup}
          setGroupToEdit={setGroupToEdit}
        />

        <DeleteUnitGroupModal
          group={groupToDelete as UnitGroup}
          isOpen={isOpenDeleteGroup}
          onOpenChange={onOpenChangeDeleteGroup}
          setOptimisticUnitGroup={setOptimisticUnitGroup}
          setGroupToDelete={setGroupToDelete}
        />
      </div>
    </>
  );
}
