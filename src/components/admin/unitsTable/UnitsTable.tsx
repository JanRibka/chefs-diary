"use client";

import { useCallback, useOptimistic, useState } from "react";

import { insertUnitAction } from "@/actions/admin/webData";
import ConfirmModal from "@/components/shared/actionModal/ConfirmModal";
import Spinner from "@/components/shared/spinner/Spinner";
import useUnitsTableData from "@/lib/hooks/apiHooks/admin/useUnitsTableData";
import { nameof } from "@/lib/utils/nameof";
import {
  InsertUnitFormErrorType,
  InsertUnitFormType,
} from "@/lib/validations/schemas/admin/insertUnitFormValidationSchema";
import { validateInsertUnitForm } from "@/lib/validations/validations/admin/insertUnit/validateInsertUnitForm";
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

import InsertUnitDialogContent from "./InsertUnitDialogContent";
import UnitsBottomContent from "./UnitsBottomContent";
import unitsColumns from "./unitsColumns";
import { unitsRenderCell } from "./unitsRenderCell";
import { useUnitsTableContext } from "./UnitsTableContext";
import UnitsTopContent from "./UnitsTopContent";

export default function UnitsTable() {
  // Insert unit modal state
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // State
  const [errors, setErrors] = useState<InsertUnitFormErrorType>({});

  // Context
  const { page, pageSize, sortDescriptor, setSortDescriptor } =
    useUnitsTableContext();
  //TODO: Data budu tahat přes use a strankovani a podobne věci budu dělat na UI. MOhl bych na strankovani sortovani a podobne blbosti vytvoprřit funkci. To co dam bokem asu budu muset obalit do mem, a+t se mi to nerenderuje
  // Data
  const { data, pages, isLoading } = useUnitsTableData(
    page,
    pageSize,
    sortDescriptor
  );

  // Optimistic update
  const [optimisticUnits, addOptimisticUnit] = useOptimistic(
    data.data,
    (state, newData: Unit) => {
      return [...state, newData];
    }
  );
  console.log(optimisticUnits);
  // Render cell
  const renderCell = useCallback(unitsRenderCell, []);

  // Insert unit optimistic
  const handleInsertUnitAction = async (formData: FormData) => {
    debugger;
    addOptimisticUnit({
      IdUnit: Math.random(),
      Name: formData.get(nameof<InsertUnitFormType>("name")) as string,
      DisplayName: formData.get(
        nameof<InsertUnitFormType>("displayName")
      ) as string,
    });
    //TODO: Nejdruive zjistit, proc mi jednotka zmizne, kdyz nevolam revalidate path asi mus9m vol8n9 zabalit do jin0 komponenty. Tady budu na49tat data a zbytek bbude jinde
    //TODO: Budu mít funkci, která budecaitat error z akšny a vyhazovar Toat
    //TODO: Pro Indert unit neudu potřebovat ENum pro vrácení hodnoty

    // https://www.youtube.com/watch?v=PPOw-sDeoNw&ab_channel=ByteGrad
    await insertUnitAction(formData);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const validationResult = validateInsertUnitForm(data);

    if (!validationResult.success) {
      event.preventDefault();
      setErrors({
        ...validationResult.errors,
        timestamp: new Date().getTime().toString(),
      });
    }
  };

  return (
    <div className="h-full">
      <Table
        isHeaderSticky
        aria-label="Jednotky"
        topContent={<UnitsTopContent onPressInsertUnit={onOpen} />}
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
          items={optimisticUnits}
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
        hideFooter
        isDismissable={false}
      >
        <InsertUnitDialogContent
          onCancel={onOpenChange}
          action={handleInsertUnitAction}
          onSubmit={handleSubmit}
          errors={errors}
        />
      </ConfirmModal>
    </div>
  );
}
