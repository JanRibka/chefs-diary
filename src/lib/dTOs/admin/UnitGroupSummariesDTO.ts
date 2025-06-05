import { UnitGroup } from "@prisma/client";

export type UnitGroupSummaries = Pick<UnitGroup, "idUnitGroup" | "name"> & {
  baseUnitName: string | null;
  unitNames: string | null;
};
