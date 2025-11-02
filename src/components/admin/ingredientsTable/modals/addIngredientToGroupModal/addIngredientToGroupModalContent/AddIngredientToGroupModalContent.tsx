import CancelConfirmModal from "@/components/shared/cancelConfirmModal/CancelConfirmModal";
import Form from "@/components/shared/form/Form";
import Spinner from "@/components/shared/spinner/Spinner";

import { useIngredientGroupModal } from "../addIngredientToGroupModal/hooks/useIngredientGroupModal";
import ActionButtons from "./components/ActionButtons";
import GroupSelectionSection from "./components/GroupSelectionSection";
import { IngredientGroupModalProps } from "./types/addIngredientToGroupModalContent";

export default function AddIngredientToGroupModalContent({
  ingredient,
  onCancel,
  saveAction,
  removeAction,
  isPending = false,
}: IngredientGroupModalProps) {
  const {
    groupData,
    isLoading,
    state,
    handleGroupSelection,
    handleRemoveFromGroup,
    handleCloseModal,
  } = useIngredientGroupModal({ ingredient, removeAction });

  // Render loading state
  if (isLoading) {
    return (
      <div className="h-80 flex items-center justify-center">
        <Spinner
          classNames={{
            circle1: "w-16 h-16",
            circle2: "w-16 h-16",
            wrapper: "w-16 h-16",
          }}
        />
      </div>
    );
  }

  // Render main content
  return (
    <>
      <Form action={saveAction} className="flex flex-col gap-5" noValidate>
        <div className="space-y-6">
          <GroupSelectionSection
            ingredient={ingredient}
            groupData={groupData}
            selectedGroupIds={state.selectedGroupIds}
            onGroupChange={handleGroupSelection}
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
