"use client";

import { use, useCallback, useEffect, useMemo, useState } from "react";

import Spinner from "@/components/shared/spinner/Spinner";
import { prisma } from "@/config/prisma/prisma";
import { IngredientGroupWithAssignedIngredientsDTO } from "@/lib/dTOs/admin/IngredientGroupWithAssignedIngredientsDTO";
import { ActionResponseDTO } from "@/lib/dTOs/shared/ActionResponseDTO";
import { PaginatedDTO } from "@/lib/dTOs/shared/PaginatedDTO";
import { getPages } from "@/lib/utils/table";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { IngredientGroup } from "@prisma/client";

// import IngredientGroupsBottomContent from "./components/IngredientGroupsBottomContent";
import { IngredientGroupsRenderCell } from "./components/IngredientGroupsRenderCell";
// import IngredientGroupsTopContent from "./components/IngredientGroupsTopContent";
import getIngredientGroupsColumns from "./constants/ingredientGroupsColumns";

// import { useIngredientGroupsTableSortDescriptor } from "./ingredientGroupsTableContext";

type Props = {
  dataPromise: Promise<
    ActionResponseDTO<PaginatedDTO<IngredientGroupWithAssignedIngredientsDTO>>
  >;
};

export default function IngredientGroupsTable({ dataPromise }: Props) {
  // const { sortDescriptor, setSortDescriptor } =
  //   useIngredientGroupsTableSortDescriptor();
  // const { pageSize } = useIngredientGroupsTablePageSize();

  // Get data
  const dataWithError = use(dataPromise);
  const data = dataWithError.data!;

  // const pages = useMemo(
  //   () => getPages(data.totalCount, pageSize),

  //   [data.totalCount, pageSize]
  // );

  const renderCell = useCallback(IngredientGroupsRenderCell, []);

  const getColumns = useCallback(getIngredientGroupsColumns, []);

  return (
    <>
      <div className="h-full">
        <Table
          isHeaderSticky
          isStriped
          aria-label="Skupiny ingrediencí"
          // topContent={
          //   <IngredientGroupsTopContent onPressInsertGroup={() => {}} />
          // }
          // topContentPlacement="outside"
          // bottomContent={
          //   <IngredientGroupsBottomContent
          //     pages={pages}
          //     totalGroups={data.totalCount}
          //   />
          // }
          // bottomContentPlacement="outside"
          fullWidth
          className="h-full"
          classNames={{
            wrapper: "rounded-none shadow-none p-0 flex-1",
          }}
          // onSortChange={setSortDescriptor}
          // sortDescriptor={sortDescriptor}
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
            items={data.items}
            isLoading={false}
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
