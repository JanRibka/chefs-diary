"use client";

import { useCallback, useMemo } from "react";

import Spinner from "@/components/shared/spinner/Spinner";
import { IngredientGroupWithAssignedIngredientsDTO } from "@/lib/dTOs/admin/IngredientGroupWithAssignedIngredientsDTO";
import { ActionResponseDTO } from "@/lib/dTOs/shared/ActionResponseDTO";
import { PaginatedDTO } from "@/lib/dTOs/shared/PaginatedDTO";
import { useServerActionWithLoading } from "@/lib/hooks/apiHooks/shared/useServerActionWithLoading";
import { getPages } from "@/lib/utils/table";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

import IngredientGroupsBottomContent from "./components/IngredientGroupsBottomContent";
import { IngredientGroupsRenderCell } from "./components/IngredientGroupsRenderCell";
import IngredientGroupsTopContent from "./components/IngredientGroupsTopContent";
import getIngredientGroupsColumns from "./constants/ingredientGroupsColumns";
import { useIngredientGroupsTablePageSize } from "./context/hooks/useIngredientGroupsTablePageSize";
import { useIngredientGroupsTableSortDescriptor } from "./context/hooks/useIngredientGroupsTableSortDescriptor";

type Props = {
  serverAction: () => Promise<
    ActionResponseDTO<PaginatedDTO<IngredientGroupWithAssignedIngredientsDTO>>
  >;
};

export default function IngredientGroupsTable({ serverAction }: Props) {
  const { sortDescriptor, setSortDescriptor } =
    useIngredientGroupsTableSortDescriptor();
  const { pageSize } = useIngredientGroupsTablePageSize();

  // Get data
  const { isPending, data } = useServerActionWithLoading(serverAction);

  const totalCount = data?.totalCount ?? 0;
  const items = data?.items ?? [];

  const pages = useMemo(
    () => getPages(totalCount, pageSize),

    [totalCount, pageSize]
  );

  const renderCell = useCallback(IngredientGroupsRenderCell, []);

  const getColumns = useCallback(getIngredientGroupsColumns, []);

  return (
    <>
      <div className="h-full">
        <Table
          isHeaderSticky
          isStriped
          aria-label="Skupiny ingrediencí"
          topContent={
            <IngredientGroupsTopContent onPressInsertGroup={() => {}} />
          }
          topContentPlacement="outside"
          bottomContent={
            <IngredientGroupsBottomContent
              pages={pages}
              totalGroups={data?.totalCount ?? 0}
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
          <TableHeader columns={getColumns(true)}>
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
            items={items}
            isLoading={isPending}
            loadingContent={<Spinner />}
            emptyContent="Žádná skupina nebyla nalezena"
          >
            {(item) => (
              <TableRow key={item.idIngredientGroup}>
                {(columnKey) => (
                  <TableCell>
                    {renderCell(
                      item,
                      columnKey,
                      true,
                      true,
                      () => {},
                      () => {}
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
