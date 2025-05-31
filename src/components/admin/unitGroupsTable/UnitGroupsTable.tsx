"use client";

import {
  use,
  useCallback,
  useMemo,
  useOptimistic,
  useRef,
  useTransition,
} from "react";

import { insertUnitGroupAction } from "@/actions/admin/webData";
import CancelConfirmModal from "@/components/shared/actionModal/CancelConfirmModal";
import EvaluateActionResponseError from "@/components/shared/evaluateActionResponseError/EvaluateActionResponseError";
import { useUserContext } from "@/context/UserContext";
import { ActionResponseDTO } from "@/lib/dTOs/shared/ActionResponseDTO";
import { PaginatedDTO } from "@/lib/dTOs/shared/PaginatedDTO";
import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";
import addToast from "@/lib/utils/addToast";
import { nameof } from "@/lib/utils/nameof";
import { getPageItems, getPages, getSortedItems } from "@/lib/utils/table";
import { InsertUnitGroupFormType } from "@/lib/validations/schemas/admin/insertUnitGroupFormValidationSchema";
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

import InsertUnitGroupDialogContent from "./InsertUnitGroupDialogContent";
import UnitGroupsBottomContent from "./UnitGroupsBottomContent";
import getUnitGroupsColumns from "./unitGroupsColumns";
import { unitGroupsRenderCell } from "./unitGroupsRenderCell";
import { useUnitGroupsTableContext } from "./UnitGroupsTableContext";
import UnitGroupsTopContent from "./UnitGroupsTopContent";
import useInsertUnitGroupValidation from "./useInsertUnitGroupValidation";

type Props = {
  dataPromise: Promise<ActionResponseDTO<PaginatedDTO<UnitGroup>>>;
};

export default function UnitGroupsTable({ dataPromise }: Props) {
  // References
  const formRef = useRef<HTMLFormElement>(null);

  // State
  const { error, setError, validate } = useInsertUnitGroupValidation();

  // Get data
  const dataWithError = use(dataPromise);
  const data = dataWithError.data!;

  // Insert unit group modal state
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Context
  const { user } = useUserContext();
  const { page, pageSize, sortDescriptor, setSortDescriptor } =
    useUnitGroupsTableContext();

  // Render cell
  const renderCell = useCallback(unitGroupsRenderCell, []);

  // Constants
  const canEdit =
    user?.permissions.some((item) => item === PermissionTypeEnum.USER_EDIT) ??
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

  // Optimistic update
  const [isPending, startTransition] = useTransition();
  const [optimisticUnitGroups, addOptimisticUnitGroup] = useOptimistic(
    pageItems,
    (state, newGroup: UnitGroup) => {
      return [...state, newGroup];
    }
  );

  // Handlers
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);

    validate(formData);
  };

  const handleInsertUnitGroupAction = async (formData: FormData) => {
    addOptimisticUnitGroup({
      idUnitGroup: Math.random(),
      name: formData.get(nameof<InsertUnitGroupFormType>("name")) as string,
    });

    formRef.current?.reset();

    startTransition(async () => {
      const unitGroup = await insertUnitGroupAction(formData);

      if (!unitGroup.success) {
        if (typeof unitGroup.error === "object") {
          setError(unitGroup.error);
          return;
        }

        addToast("Chyba", unitGroup.error as string, "danger");
      } else {
        onOpenChange();
      }
    });
  };

  const handleOnClose = () => {
    setError({});
    onOpenChange();
  };

  const handleEditGroup = (idUnitGroup: number) => {};

  const handleDeleteGroup = (idUnitGroup: number) => {};

  return (
    <>
      <EvaluateActionResponseError data={dataWithError} />

      <div className="h-full">
        <Table
          isHeaderSticky
          aria-label="Jednotky"
          topContent={<UnitGroupsTopContent onPressInsertUnit={onOpen} />}
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
          <TableHeader columns={getUnitGroupsColumns(canEdit)}>
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
                      item.idUnitGroup,
                      handleEditGroup,
                      handleDeleteGroup
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>

        <CancelConfirmModal
          isOpen={isOpen}
          placement="center"
          onOpenChange={handleOnClose}
          headerLabel="Přidat skupinu jednotek"
          hideFooter
          isDismissable={false}
        >
          <InsertUnitGroupDialogContent
            onCancel={handleOnClose}
            action={handleInsertUnitGroupAction}
            onSubmit={handleSubmit}
            errors={error}
            isPending={isPending}
          />
        </CancelConfirmModal>
      </div>
    </>
  );
}
