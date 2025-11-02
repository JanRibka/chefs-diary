import { Dispatch, SetStateAction, useCallback, useState } from "react";

import { IngredientWithAssignedGroupDTO } from "@/lib/dTOs/admin/IngredientWithAssignedGroupDTO";
import { useDisclosure } from "@heroui/react";

type UseIngredientHandlersReturn = {
  // Ingredients
  ingredientToDelete: IngredientWithAssignedGroupDTO | null;
  ingredientToEdit: IngredientWithAssignedGroupDTO | null;
  ingredientToAdd: IngredientWithAssignedGroupDTO;
  setIngredientToDelete: Dispatch<
    SetStateAction<IngredientWithAssignedGroupDTO | null>
  >;
  setIngredientToEdit: Dispatch<
    SetStateAction<IngredientWithAssignedGroupDTO | null>
  >;
  setIngredientToAdd: Dispatch<SetStateAction<IngredientWithAssignedGroupDTO>>;

  // Modal Disclosure
  insertModal: ReturnType<typeof useDisclosure>;
  editModal: ReturnType<typeof useDisclosure>;
  deleteModal: ReturnType<typeof useDisclosure>;
  addToGroupModal: ReturnType<typeof useDisclosure>;

  // Handlers
  handleDeleteIngredient: (ingredient: IngredientWithAssignedGroupDTO) => void;
  handleEditIngredient: (ingredient: IngredientWithAssignedGroupDTO) => void;
  handleAddToGroup: (ingredient: IngredientWithAssignedGroupDTO) => void;
};

/**
 * Custom hook for managing ingredient modal states and handlers.
 * Provides state management for ingredient CRUD operations and modal visibility.
 *
 * @returns Object containing ingredient states, modal disclosures, and event handlers
 */
export default function useIngredientHandlers(): UseIngredientHandlersReturn {
  const [ingredientToDelete, setIngredientToDelete] =
    useState<IngredientWithAssignedGroupDTO | null>(null);
  const [ingredientToEdit, setIngredientToEdit] =
    useState<IngredientWithAssignedGroupDTO | null>(null);
  const [ingredientToAdd, setIngredientToAdd] =
    useState<IngredientWithAssignedGroupDTO>(
      {} as IngredientWithAssignedGroupDTO
    );

  const insertModal = useDisclosure();
  const deleteModal = useDisclosure();
  const editModal = useDisclosure();
  const addToGroupModal = useDisclosure();

  const handleDeleteIngredient = useCallback(
    (ingredient: IngredientWithAssignedGroupDTO) => {
      setIngredientToDelete(ingredient);
      deleteModal.onOpen();
    },
    [deleteModal]
  );

  const handleEditIngredient = useCallback(
    (ingredient: IngredientWithAssignedGroupDTO) => {
      setIngredientToEdit(ingredient);
      editModal.onOpen();
    },
    [editModal]
  );

  const handleAddToGroup = useCallback(
    (ingredient: IngredientWithAssignedGroupDTO) => {
      setIngredientToAdd(ingredient);
      addToGroupModal.onOpen();
    },
    [addToGroupModal]
  );

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
