import React, { createContext, useContext, useMemo } from "react";

import { IngredientWithAssignedGroupDTO } from "@/lib/dTOs/admin/IngredientWithAssignedGroupDTO";

interface IngredientActionsContextType {
  canEdit: boolean;
  canDelete: boolean;
  handleEditIngredient: (ingredient: IngredientWithAssignedGroupDTO) => void;
  handleDeleteIngredient: (ingredient: IngredientWithAssignedGroupDTO) => void;
  handleAddToGroup: (ingredient: IngredientWithAssignedGroupDTO) => void;
}

const IngredientActionsContext =
  createContext<IngredientActionsContextType | null>(null);

export const useIngredientActions = () => {
  const context = useContext(IngredientActionsContext);
  if (!context) {
    throw new Error(
      "useIngredientActions must be used within an IngredientActionsProvider"
    );
  }
  return context;
};

interface IngredientActionsProviderProps {
  children: React.ReactNode;
  canEdit: boolean;
  canDelete: boolean;
  onEdit: (ingredient: IngredientWithAssignedGroupDTO) => void;
  onDelete: (ingredient: IngredientWithAssignedGroupDTO) => void;
  onAddToGroup: (ingredient: IngredientWithAssignedGroupDTO) => void;
}

export const IngredientActionsProvider: React.FC<
  IngredientActionsProviderProps
> = ({ children, canEdit, canDelete, onEdit, onDelete, onAddToGroup }) => {
  const value = useMemo(
    () => ({
      canEdit,
      canDelete,
      handleEditIngredient: onEdit,
      handleDeleteIngredient: onDelete,
      handleAddToGroup: onAddToGroup,
    }),
    [canEdit, canDelete, onEdit, onDelete, onAddToGroup]
  );

  return (
    <IngredientActionsContext.Provider value={value}>
      {children}
    </IngredientActionsContext.Provider>
  );
};
