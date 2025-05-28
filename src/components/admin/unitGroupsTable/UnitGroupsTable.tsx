"use client";

import { useCallback, useMemo } from "react";

// import { insertUnitAction } from "@/actions/admin/webData";
// import ConfirmModal from "@/components/shared/actionModal/ConfirmModal";
import EvaluateServiceResponseError from "@/components/shared/evaluateServiceResponseError/EvaluateServiceResponseError";
import Spinner from "@/components/shared/spinner/Spinner";
import { PaginatedDTO } from "@/lib/dTOs/shared/PaginatedDTO";
import { ServiceResponseDTO } from "@/lib/dTOs/shared/ServiceResponseDTO";
import { calculatePages } from "@/lib/utils/table";
// import { nameof } from "@/lib/utils/nameof";
// import {
//   InsertUnitFormErrorType,
//   InsertUnitFormType,
// } from "@/lib/validations/schemas/admin/insertUnitFormValidationSchema";
// import { validateInsertUnitForm } from "@/lib/validations/validations/admin/insertUnit/validateInsertUnitForm";
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

import UnitGroupsBottomContent from "./UnitGroupsBottomContent";
// import InsertUnitDialogContent from "./InsertUnitDialogContent";
import unitGroupsColumns from "./unitGroupsColumns";
import { unitGroupsRenderCell } from "./unitGroupsRenderCell";
import { useUnitGroupsTableContext } from "./UnitGroupsTableContext";
import UnitGroupsTopContent from "./UnitGroupsTopContent";

type Props = {
  data: ServiceResponseDTO<PaginatedDTO<UnitGroup>>;
};
//TODO: Nejprve udělám optimistic update a poté budu přidávat jednotlivé funkce jako načítání dat atd. Po optimistic update se mi nesmí hodnota z tabulky smazat
export default function UnitsTable({ data }: Props) {
  // Insert unit modal state
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { onOpen } = useDisclosure();

  // State
  // const [errors, setErrors] = useState<InsertUnitFormErrorType>({});

  // Context
  const { pageSize, sortDescriptor, setSortDescriptor } =
    useUnitGroupsTableContext();

  // Optimistic update
  // const [optimisticUnits, addOptimisticUnit] = useOptimistic(
  //   data.data,
  //   (state, newData: UnitGroup) => {
  //     return [...state, newData];
  //   }
  // );

  // Render cell
  const renderCell = useCallback(unitGroupsRenderCell, []);

  // Constants
  const pages = useMemo(
    () => calculatePages(data.data.totalCount, pageSize),
    [data.data.totalCount, pageSize]
  );

  // Insert unit optimistic
  // const handleInsertUnitAction = async (formData: FormData) => {
  //   debugger;
  //   addOptimisticUnit({
  //     idUnitGroup: Math.random(),
  //     name: formData.get(nameof<InsertUnitFormType>("name")) as string,
  //   });
  //   //TODO: Nejdruive zjistit, proc mi jednotka zmizne, kdyz nevolam revalidate path asi mus9m vol8n9 zabalit do jin0 komponenty. Tady budu na49tat data a zbytek bbude jinde
  //   //TODO: Budu mít funkci, která budecaitat error z akšny a vyhazovar Toat
  //   //TODO: Pro Indert unit neudu potřebovat ENum pro vrácení hodnoty

  //   // https://www.youtube.com/watch?v=PPOw-sDeoNw&ab_channel=ByteGrad
  //   await insertUnitAction(formData);
  // };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   const formData = new FormData(event.currentTarget);
  //   const data = Object.fromEntries(formData);
  //   const validationResult = validateInsertUnitForm(data);

  //   if (!validationResult.success) {
  //     event.preventDefault();
  //     setErrors({
  //       ...validationResult.errors,
  //       timestamp: new Date().getTime().toString(),
  //     });
  //   }
  // };

  <EvaluateServiceResponseError data={data} />;

  return (
    <div className="h-full">
      <Table
        isHeaderSticky
        aria-label="Jednotky"
        topContent={<UnitGroupsTopContent onPressInsertUnit={onOpen} />}
        topContentPlacement="outside"
        bottomContent={
          <UnitGroupsBottomContent
            pages={pages}
            totalGroups={data.data.totalCount}
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

        <TableBody
          items={data.data.items}
          loadingContent={<Spinner />}
          // loadingState={isLoading ? "loading" : "idle"}
          emptyContent="Žádný jednotka nebyla nalezena"
        >
          {(item) => (
            <TableRow key={item.idUnitGroup}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* <ConfirmModal
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
      </ConfirmModal> */}
    </div>
  );
}
