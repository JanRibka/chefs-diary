-- DropIndex
DROP INDEX "UnitGroup_idBaseUnit_key";

-- CreateIndex
CREATE INDEX "UnitGroup_idBaseUnit_idx" ON "UnitGroup"("idBaseUnit");
