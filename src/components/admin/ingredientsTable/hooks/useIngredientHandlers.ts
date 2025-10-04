import { useState } from "react";

import { IngredientWithAssignedGroupDTO } from "@/lib/dTOs/admin/IngredientWithAssignedGroupDTO";
import { useDisclosure } from "@heroui/react";

export default function useIngredientHandlers() {
  const [ingredientToDelete, setIngredientToDelete] =
    useState<IngredientWithAssignedGroupDTO | null>(null);
  const [ingredientToEdit, setIngredientToEdit] =
    useState<IngredientWithAssignedGroupDTO | null>(null);
  const [ingredientToAdd, setIngredientToAdd] =
    useState<IngredientWithAssignedGroupDTO | null>(null);

  const insertModal = useDisclosure();
  const deleteModal = useDisclosure();
  const editModal = useDisclosure();
  const addToGroupModal = useDisclosure();

  const handleDeleteIngredient = (
    ingredient: IngredientWithAssignedGroupDTO
  ) => {
    setIngredientToDelete(ingredient);
    deleteModal.onOpen();
  };

  const handleEditIngredient = (ingredient: IngredientWithAssignedGroupDTO) => {
    setIngredientToEdit(ingredient);
    editModal.onOpen();
  };

  const handleAddToGroup = (ingredient: IngredientWithAssignedGroupDTO) => {
    setIngredientToAdd(ingredient);
    addToGroupModal.onOpen();
  };

  return {
    // Ingredients
    ingredientToDelete,
    ingredientToEdit,
    ingredientToAdd,
    setIngredientToDelete,
    setIngredientToEdit,
    setIngredientToAdd,

    // Modal Disclosure
    insertModal,
    editModal,
    deleteModal,
    addToGroupModal,

    // Handlers
    handleDeleteIngredient,
    handleEditIngredient,
    handleAddToGroup,
  };
}
