import { useCallback, useMemo } from "react";

import Spinner from "@/components/shared/spinner/Spinner";
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
import IngredientGroupsTopContent from "./components/IngredientGroupsTopContent";
import getIngredientGroupsColumns from "./constants/ingredientGroupsColumns";
import { useIngredientGroupsTableSortDescriptor } from "./ingredientGroupsTableContext";

export default function IngredientGroupsTable() {
  const { sortDescriptor, setSortDescriptor } =
    useIngredientGroupsTableSortDescriptor();

  const pages = useMemo(
    () => getPages(data.totalCount, pageSize),

    [data.totalCount, pageSize]
  );

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
            items={[]}
            isLoading={false}
            loadingContent={<Spinner />}
            emptyContent="Žádná skupina nebyla nalezena"
          >
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
      </div>
    </>
  );
}
