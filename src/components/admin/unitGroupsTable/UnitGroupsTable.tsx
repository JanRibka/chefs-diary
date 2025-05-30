"use client";

import {
  use,
  useCallback,
  useEffect,
  useMemo,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from "react";

import {
  insertUnitAction,
  insertUnitGroupAction,
} from "@/actions/admin/webData";
import ConfirmModal from "@/components/shared/actionModal/ConfirmModal";
import Button from "@/components/shared/button/Button";
import EvaluateServiceResponseError from "@/components/shared/evaluateServiceResponseError/EvaluateServiceResponseError";
import Spinner from "@/components/shared/spinner/Spinner";
import { PaginatedDTO } from "@/lib/dTOs/shared/PaginatedDTO";
import { ServiceResponseDTO } from "@/lib/dTOs/shared/ServiceResponseDTO";
import { nameof } from "@/lib/utils/nameof";
import { calculatePages } from "@/lib/utils/table";
import {
  InsertUnitFormErrorType,
  InsertUnitFormType,
} from "@/lib/validations/schemas/admin/insertUnitFormValidationSchema";
import { validateInsertUnitForm } from "@/lib/validations/validations/admin/insertUnit/validateInsertUnitForm";
import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import { UnitGroup } from "@prisma/client";

import InsertUnitDialogContent from "./InsertUnitDialogContent";
import UnitGroupsBottomContent from "./UnitGroupsBottomContent";
import unitGroupsColumns from "./unitGroupsColumns";
import { unitGroupsRenderCell } from "./unitGroupsRenderCell";
import { useUnitGroupsTableContext } from "./UnitGroupsTableContext";
import UnitGroupsTopContent from "./UnitGroupsTopContent";

type Props = {
  dataPromise: Promise<ServiceResponseDTO<PaginatedDTO<UnitGroup>>>;
};
//TODO: Nejprve udělám optimistic update a poté budu přidávat jednotlivé funkce jako načítání dat atd. Po optimistic update se mi nesmí hodnota z tabulky smazat
export default function UnitGroupsTable({ dataPromise }: Props) {
  const data = use(dataPromise);

  const formRef = useRef<HTMLFormElement>(null);
  // Insert unit modal state
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  // const { onOpen } = useDisclosure();
  const [isPending, startTransition] = useTransition();
  // State
  // const [errors, setErrors] = useState<InsertUnitFormErrorType>({});

  // Context
  const { pageSize, sortDescriptor, setSortDescriptor } =
    useUnitGroupsTableContext();

  // Optimistic update
  const [optimisticUnitGroups, addOptimisticUnitGroup] = useOptimistic(
    data.data.items,
    (state, newGroup: UnitGroup) => {
      return [...state, newGroup];
    }
  );

  // Render cell
  const renderCell = useCallback(unitGroupsRenderCell, []);

  // Constants
  const pages = useMemo(
    () => calculatePages(data.data.totalCount, pageSize),

    [data.data.totalCount, pageSize]
  );

  // Insert unit optimistic
  // const handleInsertUnitGroupAction = async (formData: FormData) => {
  //   addOptimisticUnitGroup({
  //     idUnitGroup: Math.random(),
  //     name: formData.get("name") as string,

  //     // name: formData.get(nameof<InsertUnitFormType>("name")) as string,
  //   });
  //   //TODO: Nejdruive zjistit, proc mi jednotka zmizne, kdyz nevolam revalidate path asi mus9m vol8n9 zabalit do jin0 komponenty. Tady budu na49tat data a zbytek bbude jinde
  //   //TODO: Budu mít funkci, která budecaitat error z akšny a vyhazovar Toat
  //   //TODO: Pro Indert unit neudu potřebovat ENum pro vrácení hodnoty

  //   // https://www.youtube.com/watch?v=PPOw-sDeoNw&ab_channel=ByteGrad
  //   // await insertUnitAction(formData);
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

  // <EvaluateServiceResponseError data={data} />;

  return (
    <>
      <form
        ref={formRef}
        action={
          async (formData: FormData) => {
            addOptimisticUnitGroup({
              idUnitGroup: Math.random(),
              name: formData.get("name") as string,
              // name: formData.get(nameof<InsertUnitFormType>("name")) as string,
            });

            formRef.current?.reset();

            startTransition(async () => {
              await insertUnitGroupAction(formData);
            });
          }
          //TODO: Nejdruive zjistit, proc mi jednotka zmizne, kdyz nevolam revalidate path asi mus9m vol8n9 zabalit do jin0 komponenty. Tady budu na49tat data a zbytek bbude jinde
          //TODO: Budu mít funkci, která budecaitat error z akšny a vyhazovar Toat
          //TODO: Pro Indert unit neudu potřebovat ENum pro vrácení hodnoty
        }
      >
        <Input
          name="name"
          label="Název skupiny"
          className="mb-4"
          required
          autoComplete="off"
          fullWidth
          variant="faded"
          color="primary"
        />
        <Button type="submit" disabled={isPending}>
          Přidat skupinu
        </Button>
      </form>

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
            items={optimisticUnitGroups}
            loadingContent={<Spinner />}
            loadingState={isLoading ? "loading" : "idle"}
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
    </>
  );
}
