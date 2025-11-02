"use client";

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

import IngredientsBottomContent from "./components/IngredientsBottomContent";
import { IngredientsRenderCell } from "./components/IngredientsRenderCell";
import IngredientsTopContent from "./components/IngredientsTopContent";
import getIngredientsColumns from "./constants/ingredientsColumns";
import useIngredientHandlers from "./hooks/useIngredientHandlers";
import useIngredientOptimistic from "./hooks/useIngredientOptimistic";
import { useIngredientsTableState } from "./hooks/useIngredientsTableState";
import DeleteIngredientModal from "./modals/deleteIngredientModal/deleteIngredientModal/DeleteIngredientModal";
import EditIngredientModal from "./modals/editIngredientModal/editIngredientModal/EditIngredientModal";
import { InsertIngredientModal } from "./modals/insertIngredientModal/insertIngredientModal/InsertIngredientModal";

type Props = {
  serverAction: () => Promise<
    ActionResponseDTO<PaginatedDTO<IngredientWithAssignedGroupDTO>>
  >;
};

export default function IngredientsTable({ serverAction }: Props) {
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
  } = useIngredientHandlers();
  return (
    <div className="h-full">
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
                  {IngredientsRenderCell(
                    item,
                    columnKey,
                    canEdit,
                    canDelete,
                    handleEditIngredient,
                    handleDeleteIngredient
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <InsertIngredientModal
        isOpen={insertModal.isOpen}
        onOpenChange={insertModal.onOpenChange}
        setOptimisticIngredient={insertIngredient}
        refetch={refetch}
      />

      <EditIngredientModal
        ingredient={ingredientToEdit as IngredientWithAssignedGroupDTO}
        isOpen={editModal.isOpen}
        onOpenChange={editModal.onOpenChange}
        setOptimisticIngredient={editIngredient}
        setIngredientToEdit={setIngredientToEdit}
        refetch={refetch}
      />

      <DeleteIngredientModal
        ingredient={ingredientToDelete as IngredientWithAssignedGroupDTO}
        isOpen={deleteModal.isOpen}
        onOpenChange={deleteModal.onOpenChange}
        setOptimisticIngredient={deleteIngredient}
        setIngredientToDelete={setIngredientToDelete}
        refetch={refetch}
      />
    </div>
  );
}
