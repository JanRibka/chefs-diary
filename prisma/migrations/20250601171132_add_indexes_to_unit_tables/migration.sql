-- CreateIndex
CREATE INDEX "UnitConversion_idFromUnit_idx" ON "UnitConversion"("idFromUnit");

-- CreateIndex
CREATE INDEX "UnitConversion_idToUnit_idx" ON "UnitConversion"("idToUnit");

-- CreateIndex
CREATE INDEX "UnitGroupUnit_idUnitGroup_idx" ON "UnitGroupUnit"("idUnitGroup");

-- CreateIndex
CREATE INDEX "UnitGroupUnit_idUnit_idx" ON "UnitGroupUnit"("idUnit");

-- CreateIndex
CREATE INDEX "UnitGroupUnit_isBaseUnit_idx" ON "UnitGroupUnit"("isBaseUnit");
