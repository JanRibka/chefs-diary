import CancelConfirmModal from "@/components/shared/actionModal/CancelConfirmModal";
import Form from "@/components/shared/form/Form";
import Spinner from "@/components/shared/spinner/Spinner";

import { ActionButtons } from "./components/ActionButtons";
import { BaseUnitSection } from "./components/BaseUnitSelection";
import { GroupSelectionSection } from "./components/GroupSelectionSection";
import { SPINNER_CLASSES } from "./constants";
import { useUnitGroupModal } from "./hooks";
import { UnitGroupModalProps } from "./types";

export default function AddUnitToGroupModalContent({
  unit,
  onCancel,
  saveAction,
  removeAction,
  isPending = false,
}: UnitGroupModalProps) {
  const {
    groupData,
    isLoading,
    state,
    selectedGroup,
    baseUnitInSelectedGroup,
    showBaseUnitWarning,
    handleGroupSelection,
    handleBaseUnitToggle,
    handleRemoveFromGroup,
    handleCloseModal,
  } = useUnitGroupModal(unit, removeAction);

  // Render loading state
  if (isLoading) {
    return (
      <div className="h-80 flex items-center justify-center">
        <Spinner classNames={SPINNER_CLASSES} />
      </div>
    );
  }

  // Render main content
  return (
    <>
      <Form action={saveAction} className="flex flex-col gap-5" noValidate>
        <div className="space-y-6">
          <GroupSelectionSection
            unit={unit}
            groupData={groupData}
            selectedGroupIds={state.selectedGroupIds}
            onGroupChange={handleGroupSelection}
          />

          <BaseUnitSection
            unit={unit}
            selectedGroup={selectedGroup}
            isBaseUnit={state.isBaseUnit}
            showBaseUnitWarning={showBaseUnitWarning}
            baseUnitInSelectedGroup={baseUnitInSelectedGroup}
            selectedGroupIds={state.selectedGroupIds}
            isRemoving={state.isRemoving}
            onBaseUnitToggle={handleBaseUnitToggle}
          />
        </div>

        <ActionButtons
          isPending={isPending}
          selectedGroupIds={state.selectedGroupIds}
          onCancel={onCancel}
          onRemove={handleRemoveFromGroup}
        />
      </Form>

      <CancelConfirmModal
        isOpen={state.confirmationModal.isOpen}
        placement="center"
        onOpenChange={handleCloseModal}
        onConfirm={state.confirmationModal.onConfirm}
        confirmButtonColor="danger"
        confirmButtonLabel="Pokračovat"
        onCancel={handleCloseModal}
        cancelButtonLabel="Zachovat"
        cancelButtonColor="success"
        headerLabel="Upozornění"
        isDismissable={false}
      >
        {state.confirmationModal.message}
      </CancelConfirmModal>
    </>
  );
}
