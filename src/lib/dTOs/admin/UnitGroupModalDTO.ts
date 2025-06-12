import { Unit } from "@prisma/client";

export type UnitGroupModalDTO = {
  idUnitGroup: number;
  unitGroupName: string;
  isBaseUnit: boolean;
  idsUnit: number[] | null;
  baseUnit: Unit | null;
};
