/*
  Warnings:

  - You are about to drop the column `idUnitGroup` on the `Unit` table. All the data in the column will be lost.
  - You are about to drop the column `idBaseUnit` on the `UnitGroup` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Unit" DROP CONSTRAINT "Unit_idUnitGroup_fkey";

-- DropForeignKey
ALTER TABLE "UnitGroup" DROP CONSTRAINT "UnitGroup_idBaseUnit_fkey";

-- DropIndex
DROP INDEX "UnitGroup_idBaseUnit_key";

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "idUnitGroup";

-- AlterTable
ALTER TABLE "UnitGroup" DROP COLUMN "idBaseUnit";

-- CreateTable
CREATE TABLE "UnitGroupUnit" (
    "idUnitGroupUnit" SERIAL NOT NULL,
    "idUnitGroup" INTEGER NOT NULL,
    "idUnit" INTEGER NOT NULL,
    "isBaseUnit" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UnitGroupUnit_pkey" PRIMARY KEY ("idUnitGroupUnit")
);

-- CreateIndex
CREATE INDEX "UnitGroupUnit_idUnit_idx" ON "UnitGroupUnit"("idUnit");

-- CreateIndex
CREATE INDEX "UnitGroupUnit_idUnitGroup_idx" ON "UnitGroupUnit"("idUnitGroup");

-- CreateIndex
CREATE UNIQUE INDEX "UnitGroupUnit_idUnitGroup_idUnit_key" ON "UnitGroupUnit"("idUnitGroup", "idUnit");

-- CreateIndex
CREATE UNIQUE INDEX "UnitGroupUnit_idUnitGroup_isBaseUnit_key" ON "UnitGroupUnit"("idUnitGroup", "isBaseUnit");

-- AddForeignKey
ALTER TABLE "UnitGroupUnit" ADD CONSTRAINT "UnitGroupUnit_idUnitGroup_fkey" FOREIGN KEY ("idUnitGroup") REFERENCES "UnitGroup"("idUnitGroup") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitGroupUnit" ADD CONSTRAINT "UnitGroupUnit_idUnit_fkey" FOREIGN KEY ("idUnit") REFERENCES "Unit"("idUnit") ON DELETE RESTRICT ON UPDATE CASCADE;
