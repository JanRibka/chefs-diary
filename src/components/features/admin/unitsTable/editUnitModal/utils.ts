import { UnitWithGroupInfoSummaryDTO } from "@/lib/dTOs/admin/UnitWithGroupInfoSummaryDTO";
import { nameof } from "@/lib/utils/nameof";
import { UnitFormType } from "@/lib/validations/schemas/admin/unitFormValidationSchema";

// Modal
export const extractFormData = (event: React.FormEvent<HTMLFormElement>) => {
  const formData = new FormData(event.currentTarget);
  return Object.fromEntries(formData);
};

export const createTimestampedError = <T>(error: T) => ({
  ...error,
  timestamp: Date.now().toString(),
});

// Modal content
export const createOptimisticUnit = (
  unit: UnitWithGroupInfoSummaryDTO,
  formData: FormData
): UnitWithGroupInfoSummaryDTO => ({
  idUnit: unit.idUnit,
  name: formData.get(nameof<UnitFormType>("name")) as string,
  isBaseUnitInGroup: unit.isBaseUnitInGroup,
  unitGroupNames: unit.unitGroupNames,
  baseUnitGroupIds: unit.baseUnitGroupIds,
});
