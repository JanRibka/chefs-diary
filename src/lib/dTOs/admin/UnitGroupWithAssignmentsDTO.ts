import { UnitGroup, UnitGroupUnit } from "@prisma/client";

export type UnitGroupsWithAssignmentsDTO = UnitGroup & {
  unitGroupUnit: Pick<UnitGroupUnit, "isBaseUnit" | "idUnit">[];
};
