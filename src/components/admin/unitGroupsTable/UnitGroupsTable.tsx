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
import { ActionResponseDTO } from "@/lib/dTOs/shared/ActionResponseDTO";
import { PaginatedDTO } from "@/lib/dTOs/shared/PaginatedDTO";
import addToast from "@/lib/utils/addToast";
import { nameof } from "@/lib/utils/nameof";
import { calculatePages } from "@/lib/utils/table";
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
import unitGroupsColumns from "./unitGroupsColumns";
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
  // TODO: todo bude v tabulce
  const dataWithError = use(dataPromise);
  const data = dataWithError.data!;

  // Insert unit group modal state
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Context
  const { pageSize, sortDescriptor, setSortDescriptor } =
    useUnitGroupsTableContext();

  // Optimistic update
  const [isPending, startTransition] = useTransition();
  const [optimisticUnitGroups, addOptimisticUnitGroup] = useOptimistic(
    data.items,
    (state, newGroup: UnitGroup) => {
      return [...state, newGroup];
    }
  );

  // Render cell
  const renderCell = useCallback(unitGroupsRenderCell, []);

  // Constants
  const pages = useMemo(
    () => calculatePages(data.totalCount, pageSize),

    [data.totalCount, pageSize]
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
  // TODO: DOd2lat pagination a podobné věci
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
          <TableHeader columns={unitGroupsColumns}>
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

          <TableBody items={optimisticUnitGroups}>
            {(item) => (
              <TableRow key={item.idUnitGroup}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
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
