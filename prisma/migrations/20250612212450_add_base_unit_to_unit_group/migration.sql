/*
  Warnings:

  - A unique constraint covering the columns `[idBaseUnit]` on the table `UnitGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UnitGroup" ADD COLUMN     "idBaseUnit" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "UnitGroup_idBaseUnit_key" ON "UnitGroup"("idBaseUnit");

-- AddForeignKey
ALTER TABLE "UnitGroup" ADD CONSTRAINT "UnitGroup_idBaseUnit_fkey" FOREIGN KEY ("idBaseUnit") REFERENCES "Unit"("idUnit") ON DELETE SET NULL ON UPDATE CASCADE;
