import React from "react";

import { IngredientWithAssignedGroupDTO } from "@/lib/dTOs/admin/IngredientWithAssignedGroupDTO";

import AddIngredientToGroupModal from "../modals/addIngredientToGroupModal/addIngredientToGroupModal/AddIngredientToGroupModal";
import DeleteIngredientModal from "../modals/deleteIngredientModal/deleteIngredientModal/DeleteIngredientModal";
import EditIngredientModal from "../modals/editIngredientModal/editIngredientModal/EditIngredientModal";
import { InsertIngredientModal } from "../modals/insertIngredientModal/insertIngredientModal/InsertIngredientModal";

interface IngredientModalsProps {
  // Modal states
  insertModal: { isOpen: boolean; onOpenChange: () => void };
  editModal: { isOpen: boolean; onOpenChange: () => void };
  deleteModal: { isOpen: boolean; onOpenChange: () => void };
  addToGroupModal: { isOpen: boolean; onOpenChange: () => void };

  // Ingredient states
  ingredientToEdit: IngredientWithAssignedGroupDTO | null;
  ingredientToDelete: IngredientWithAssignedGroupDTO | null;
  ingredientToAdd: IngredientWithAssignedGroupDTO | null;

  // Setters
  setIngredientToEdit: React.Dispatch<
    React.SetStateAction<IngredientWithAssignedGroupDTO | null>
  >;
  setIngredientToDelete: React.Dispatch<
    React.SetStateAction<IngredientWithAssignedGroupDTO | null>
  >;
  setIngredientToAdd: React.Dispatch<
    React.SetStateAction<IngredientWithAssignedGroupDTO | null>
  >;

  // Optimistic updates
  insertIngredient: (ingredient: IngredientWithAssignedGroupDTO) => void;
  editIngredient: (ingredient: IngredientWithAssignedGroupDTO) => void;
  deleteIngredient: (ingredient: IngredientWithAssignedGroupDTO) => void;

  // Actions
  refetch: () => void;
}

/**
 * Container component for all ingredient-related modals.
 * Groups all modal logic and UI in one place for better organization.
 */
const IngredientModals: React.FC<IngredientModalsProps> = ({
  insertModal,
  editModal,
  deleteModal,
  addToGroupModal,
  ingredientToEdit,
  ingredientToDelete,
  ingredientToAdd,
  setIngredientToEdit,
  setIngredientToDelete,
  setIngredientToAdd,
  insertIngredient,
  editIngredient,
  deleteIngredient,
  refetch,
}) => {
  return (
    <>
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

      <AddIngredientToGroupModal
        ingredient={ingredientToAdd}
        isOpen={addToGroupModal.isOpen}
        onOpenChange={addToGroupModal.onOpenChange}
        setIngredientToAdd={setIngredientToAdd}
        refetch={refetch}
      />
    </>
  );
};

export default React.memo(IngredientModals);
