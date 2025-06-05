import { useState } from "react";

import { UnitWithGroupInfoSummaryDTO } from "@/lib/dTOs/admin/UnitWithGroupInfoSummaryDTO";
import { useDisclosure } from "@heroui/react";

export default function useUnitHandlers() {
  const [unitToDelete, setUnitToDelete] =
    useState<UnitWithGroupInfoSummaryDTO | null>(null);
  const [unitToEdit, setUnitToEdit] =
    useState<UnitWithGroupInfoSummaryDTO | null>(null);
  const [unitToAdd, setUnitToAdd] =
    useState<UnitWithGroupInfoSummaryDTO | null>(null);

  const insertModal = useDisclosure();
  const deleteModal = useDisclosure();
  const editModal = useDisclosure();
  const addToGroupModal = useDisclosure();

  const handleDeleteUnit = (unit: UnitWithGroupInfoSummaryDTO) => {
    setUnitToDelete(unit);
    deleteModal.onOpen();
  };

  const handleEditUnit = (unit: UnitWithGroupInfoSummaryDTO) => {
    setUnitToEdit(unit);
    editModal.onOpen();
  };

  const handleAddToGroup = (unit: UnitWithGroupInfoSummaryDTO) => {
    setUnitToAdd(unit);
    addToGroupModal.onOpen();
  };

  return {
    // Units
    unitToDelete,
    unitToEdit,
    unitToAdd,
    setUnitToDelete,
    setUnitToEdit,
    setUnitToAdd,

    // Modal Disclosure
    insertModal,
    editModal,
    deleteModal,
    addToGroupModal,

    // Handlers
    handleDeleteUnit,
    handleEditUnit,
    handleAddToGroup,
  };
}
