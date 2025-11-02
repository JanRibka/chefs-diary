import { useCallback, useState } from "react";

import { IngredientWithAssignedGroupDTO } from "@/lib/dTOs/admin/IngredientWithAssignedGroupDTO";
import { useDisclosure } from "@heroui/react";

interface UseIngredientModalsReturn {
  // State
  ingredientToDelete: IngredientWithAssignedGroupDTO | null;
  ingredientToEdit: IngredientWithAssignedGroupDTO | null;
  ingredientToAdd: IngredientWithAssignedGroupDTO | null;

  // Setters
  setIngredientToDelete: React.Dispatch<
    React.SetStateAction<IngredientWithAssignedGroupDTO | null>
  >;
  setIngredientToEdit: React.Dispatch<
    React.SetStateAction<IngredientWithAssignedGroupDTO | null>
  >;
  setIngredientToAdd: React.Dispatch<
    React.SetStateAction<IngredientWithAssignedGroupDTO | null>
  >;

  // Modal disclosures
  insertModal: ReturnType<typeof useDisclosure>;
  editModal: ReturnType<typeof useDisclosure>;
  deleteModal: ReturnType<typeof useDisclosure>;
  addToGroupModal: ReturnType<typeof useDisclosure>;

  // Handlers
  handleDeleteIngredient: (ingredient: IngredientWithAssignedGroupDTO) => void;
  handleEditIngredient: (ingredient: IngredientWithAssignedGroupDTO) => void;
  handleAddToGroup: (ingredient: IngredientWithAssignedGroupDTO) => void;
}

/**
 * Centralized hook for managing all ingredient modal states and handlers.
 * Combines functionality from useIngredientHandlers for better organization.
 */
export function useIngredientModals(): UseIngredientModalsReturn {
  // Ingredient states
  const [ingredientToDelete, setIngredientToDelete] =
    useState<IngredientWithAssignedGroupDTO | null>(null);
  const [ingredientToEdit, setIngredientToEdit] =
    useState<IngredientWithAssignedGroupDTO | null>(null);
  const [ingredientToAdd, setIngredientToAdd] =
    useState<IngredientWithAssignedGroupDTO | null>(null);

  // Modal disclosures
  const insertModal = useDisclosure();
  const deleteModal = useDisclosure();
  const editModal = useDisclosure();
  const addToGroupModal = useDisclosure();

  // Handlers
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
    // State
    ingredientToDelete,
    ingredientToEdit,
    ingredientToAdd,

    // Setters
    setIngredientToDelete,
    setIngredientToEdit,
    setIngredientToAdd,

    // Modal disclosures
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
