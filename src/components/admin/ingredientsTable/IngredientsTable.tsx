"use client";

import React from "react";

import Spinner from "@/components/shared/spinner/Spinner";
import { IngredientWithAssignedGroupDTO } from "@/lib/dTOs/admin/IngredientWithAssignedGroupDTO";
import { ActionResponseDTO } from "@/lib/dTOs/shared/ActionResponseDTO";
import { PaginatedDTO } from "@/lib/dTOs/shared/PaginatedDTO";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

import IngredientModals from "./components/IngredientModals";
import IngredientsBottomContent from "./components/IngredientsBottomContent";
import { IngredientsRenderCell } from "./components/IngredientsRenderCell";
import IngredientsTopContent from "./components/IngredientsTopContent";
import getIngredientsColumns from "./constants/ingredientsColumns";
import { IngredientActionsProvider } from "./context/IngredientActionsContext";
import { useIngredientModals } from "./hooks/useIngredientModals";
import useIngredientOptimistic from "./hooks/useIngredientOptimistic";
import { useIngredientsTableState } from "./hooks/useIngredientsTableState";

type Props = {
  serverAction: () => Promise<
    ActionResponseDTO<PaginatedDTO<IngredientWithAssignedGroupDTO>>
  >;
};

function IngredientsTable({ serverAction }: Props) {
  const {
    data,
    sortDescriptor,
    setSortDescriptor,
    pages,
    canEdit,
    canDelete,
    optimisticIngredients,
    setOptimisticIngredient,
    isPending,
    refetch,
  } = useIngredientsTableState(serverAction);

  const { insertIngredient, editIngredient, deleteIngredient } =
    useIngredientOptimistic(setOptimisticIngredient);

  const {
    ingredientToDelete,
    setIngredientToDelete,
    ingredientToEdit,
    setIngredientToEdit,
    ingredientToAdd,
    setIngredientToAdd,
    insertModal,
    editModal,
    deleteModal,
    addToGroupModal,
    handleDeleteIngredient,
    handleEditIngredient,
    handleAddToGroup,
  } = useIngredientModals();
  return (
    <div className="h-full">
      <IngredientActionsProvider
        canEdit={canEdit}
        canDelete={canDelete}
        onEdit={handleEditIngredient}
        onDelete={handleDeleteIngredient}
        onAddToGroup={handleAddToGroup}
      >
        <Table
          isHeaderSticky
          isStriped
          aria-label="Ingredience"
          topContent={
            <IngredientsTopContent
              onPressInsertIngredient={insertModal.onOpenChange}
            />
          }
          topContentPlacement="outside"
          bottomContent={
            <IngredientsBottomContent
              pages={pages}
              totalIngredients={data?.totalCount}
            />
          }
          fullWidth
          className="h-full"
          classNames={{
            wrapper: "rounded-none shadow-none p-0 flex-1",
          }}
          onSortChange={setSortDescriptor}
          sortDescriptor={sortDescriptor}
        >
          <TableHeader columns={getIngredientsColumns(canEdit || canDelete)}>
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
            items={optimisticIngredients}
            isLoading={isPending}
            loadingContent={<Spinner />}
            emptyContent="Žádná ingredience nebyla nalezena"
          >
            {(item) => (
              <TableRow key={item.idIngredient}>
                {(columnKey) => (
                  <TableCell>
                    {IngredientsRenderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </IngredientActionsProvider>

      <IngredientModals
        insertModal={insertModal}
        editModal={editModal}
        deleteModal={deleteModal}
        addToGroupModal={addToGroupModal}
        ingredientToEdit={ingredientToEdit}
        ingredientToDelete={ingredientToDelete}
        ingredientToAdd={ingredientToAdd}
        setIngredientToEdit={setIngredientToEdit}
        setIngredientToDelete={setIngredientToDelete}
        setIngredientToAdd={setIngredientToAdd}
        insertIngredient={insertIngredient}
        editIngredient={editIngredient}
        deleteIngredient={deleteIngredient}
        refetch={refetch}
      />
    </div>
  );
}

export default React.memo(IngredientsTable);
