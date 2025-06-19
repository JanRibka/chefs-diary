import { useEffect, useRef, useState } from "react";

import CancelConfirmModal from "@/components/shared/actionModal/CancelConfirmModal";
import Button from "@/components/shared/button/Button";
import Form from "@/components/shared/form/Form";
import Spinner from "@/components/shared/spinner/Spinner";
import SubmitButton from "@/components/shared/submitButton/SubmitButton";
import { UnitGroupModalDTO } from "@/lib/dTOs/admin/UnitGroupModalDTO";
import { UnitWithGroupInfoSummaryDTO } from "@/lib/dTOs/admin/UnitWithGroupInfoSummaryDTO";
import useUnitGroupDataForModalAction from "@/lib/hooks/apiHooks/admin/useUnitGroupDataForModal";
import { nameof } from "@/lib/utils/nameof";
import { Checkbox, CheckboxGroup } from "@heroui/react";

type Props = {
  unit: UnitWithGroupInfoSummaryDTO;
  onCancel: () => void;
  saveAction: (formData: FormData) => void;
  removeAction: (idUnitGroup: number) => Promise<void>;
  isPending?: boolean;
};

export default function AddUnitToGroupModalContent({
  unit,
  onCancel,
  saveAction,
  removeAction,
  isPending,
}: Props) {
  // Data
  const { data, isLoading } = useUnitGroupDataForModalAction(unit.idUnit);

  // Component initialized
  const isInitialized = useRef(false);

  // State
  const [idSelectedGroup, setIdSelectedGroup] = useState<string[]>([]);
  const [isBaseUnit, setIsBaseUnit] = useState<boolean>(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    message: "",
    onConfirm: () => void 0,
  });
  const [isRemoving, setIsRemoving] = useState(false);

  // Derived
  const selectedGroup = data.find(
    (g) => g.idUnitGroup === parseInt(idSelectedGroup[0])
  );

  const baseUnitSelectedGroup = data?.find(
    (f) => f.idUnitGroup === selectedGroup?.idUnitGroup
  )?.baseUnit;

  const showBaseUnitWarning =
    selectedGroup?.baseUnit?.idUnit !== unit.idUnit && !!baseUnitSelectedGroup;

  // Effects
  useEffect(() => {
    if (isInitialized.current || !data.length) return;

    const defaultValue = data
      .find((f) => f.idsUnit?.includes(unit.idUnit))
      ?.idUnitGroup.toString();

    if (defaultValue) {
      setIdSelectedGroup([defaultValue]);
    }

    const selectedGroup = data.find(
      (f) => f.idUnitGroup.toString() === defaultValue
    );

    if (selectedGroup) {
      setIsBaseUnit(selectedGroup.isBaseUnit);
    }

    isInitialized.current = true;
  }, [data, unit.idUnit]);

  // Handlers
  const showConfirmation = (message: string, confirmAction: () => void) => {
    setModalState({
      isOpen: true,
      message,
      onConfirm: () => {
        confirmAction();
        handleCloseModal();
      },
    });
  };

  const handleValueChangeUnitGroup = (value: string[]) => {
    setIdSelectedGroup((prev) => {
      const selectedValue = value.filter((f) => f !== "" && f !== prev[0]);
      const isBase = unit.baseUnitGroupIds.includes(Number(selectedValue[0]))
        ? true
        : false;

      setIsBaseUnit(isBase);

      return selectedValue;
    });
  };

  const handleValueChangeIsBaseUnit = (value: string[]) => {
    if (isRemoving) return;

    const isBase = value.length ? true : false;

    // If we need to show confirmation dialog
    if (
      (isBase && showBaseUnitWarning) ||
      (!isBase && selectedGroup?.isBaseUnit)
    ) {
      const message = isBase
        ? "Zaškrtnutím této volby změníte základní jednotku ve skupině. Pokračovat?"
        : "Odškrtnutím této volby zrušíte základní jednotku ve skupině. Pokračovat?";

      showConfirmation(message, () => setIsBaseUnit(false));
      return;
    }

    setIsBaseUnit(isBase);
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      message: "",
      onConfirm: () => void 0,
    });
  };

  const handleRemoveAction = () => {
    if (!selectedGroup) return;
    //TODO: Musí tu být hláška, že se chystám odebrat základní jednotku ze skupiny
    setIsRemoving(true);
    showConfirmation(
      "Chcete opravdu odebrat jednotku ze skupiny? Pokračovat?",
      async () => {
        try {
          await removeAction(selectedGroup.idUnitGroup);
        } finally {
          setIsRemoving(false);
        }
      }
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="h-80">
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

  return (
    <>
      <Form action={saveAction} className="flex flex-col gap-5" noValidate>
        <div>
          <CheckboxGroup
            value={idSelectedGroup}
            onValueChange={handleValueChangeUnitGroup}
            className="mb-6"
            label={
              <>
                Vyberte skupinu ke které chcete jednotku &quot;
                <strong>{unit.name}</strong>&quot; přiřadit
              </>
            }
          >
            {data.map((group) => (
              <Checkbox
                key={`unitGroup_${group.idUnitGroup}`}
                name={nameof<UnitGroupModalDTO>("idUnitGroup")}
                value={group.idUnitGroup.toString()}
              >
                {group.unitGroupName}
              </Checkbox>
            ))}
          </CheckboxGroup>

          <CheckboxGroup
            label="Vyberte zda je jednotka základní jednotka"
            value={[isBaseUnit.toString()]}
            onValueChange={handleValueChangeIsBaseUnit}
          >
            {showBaseUnitWarning && (
              <p className="text-sm text-yellow-600 mt-1">
                Aktuální základní jednotka:{" "}
                <strong>{selectedGroup?.baseUnit?.name}</strong>
                <br />
                Zaškrtnutím změníte základní jednotku.
              </p>
            )}
            <Checkbox
              value={true.toString()}
              name={nameof<UnitGroupModalDTO>("isBaseUnit")}
              isDisabled={idSelectedGroup.length === 0}
            >
              Je základní jednotka
            </Checkbox>
          </CheckboxGroup>
        </div>

        <div className="flex py-2 px-1 justify-between">
          <Button color="primary" variant="bordered" onPress={onCancel}>
            Zrušit
          </Button>
          <div className="flex gap-2">
            <Button
              color="danger"
              variant="flat"
              disabled={isPending}
              isLoading={isPending}
              isDisabled={idSelectedGroup.length === 0}
              onPress={handleRemoveAction}
            >
              Odebrat ze skupiny
            </Button>
            <SubmitButton
              color="primary"
              disabled={isPending}
              isLoading={isPending}
              isDisabled={idSelectedGroup.length === 0}
            >
              Uložit
            </SubmitButton>
          </div>
        </div>
      </Form>

      <CancelConfirmModal
        isOpen={modalState.isOpen}
        placement="center"
        onOpenChange={handleCloseModal}
        onConfirm={modalState.onConfirm}
        confirmButtonColor="danger"
        confirmButtonLabel="Pokračovat"
        onCancel={handleCloseModal}
        cancelButtonLabel="Zachovat"
        cancelButtonColor="success"
        headerLabel="Upozornění"
        isDismissable={false}
      >
        {modalState.message}
      </CancelConfirmModal>
    </>
  );
}
