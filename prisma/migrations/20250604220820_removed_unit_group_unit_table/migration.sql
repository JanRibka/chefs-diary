/*
  Warnings:

  - You are about to drop the `UnitGroupUnit` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[idUnitGroup]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idBaseUnit]` on the table `UnitGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UnitGroupUnit" DROP CONSTRAINT "UnitGroupUnit_idUnitGroup_fkey";

-- DropForeignKey
ALTER TABLE "UnitGroupUnit" DROP CONSTRAINT "UnitGroupUnit_idUnit_fkey";

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "idUnitGroup" INTEGER;

-- AlterTable
ALTER TABLE "UnitGroup" ADD COLUMN     "idBaseUnit" INTEGER;

-- DropTable
DROP TABLE "UnitGroupUnit";

-- CreateIndex
CREATE UNIQUE INDEX "Unit_idUnitGroup_key" ON "Unit"("idUnitGroup");

-- CreateIndex
CREATE UNIQUE INDEX "UnitGroup_idBaseUnit_key" ON "UnitGroup"("idBaseUnit");

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_idUnitGroup_fkey" FOREIGN KEY ("idUnitGroup") REFERENCES "UnitGroup"("idUnitGroup") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitGroup" ADD CONSTRAINT "UnitGroup_idBaseUnit_fkey" FOREIGN KEY ("idBaseUnit") REFERENCES "Unit"("idUnit") ON DELETE SET NULL ON UPDATE CASCADE;
