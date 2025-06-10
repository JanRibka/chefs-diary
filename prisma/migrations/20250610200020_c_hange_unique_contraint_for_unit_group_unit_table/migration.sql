/*
  Warnings:

  - A unique constraint covering the columns `[idUnitGroup,idUnit,isBaseUnit]` on the table `UnitGroupUnit` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UnitGroupUnit_idUnitGroup_isBaseUnit_key";

-- CreateIndex
CREATE UNIQUE INDEX "UnitGroupUnit_idUnitGroup_idUnit_isBaseUnit_key" ON "UnitGroupUnit"("idUnitGroup", "idUnit", "isBaseUnit");
