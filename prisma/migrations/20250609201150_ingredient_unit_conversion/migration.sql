-- CreateTable
CREATE TABLE "IngredientUnitConversion" (
    "idIngredientUnitConversion" SERIAL NOT NULL,
    "idIngredient" INTEGER NOT NULL,
    "idUnit" INTEGER NOT NULL,
    "conversionToBase" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "IngredientUnitConversion_pkey" PRIMARY KEY ("idIngredientUnitConversion")
);

-- CreateIndex
CREATE INDEX "IngredientUnitConversion_idIngredient_idx" ON "IngredientUnitConversion"("idIngredient");

-- CreateIndex
CREATE INDEX "IngredientUnitConversion_idUnit_idx" ON "IngredientUnitConversion"("idUnit");

-- CreateIndex
CREATE UNIQUE INDEX "IngredientUnitConversion_idIngredient_idUnit_key" ON "IngredientUnitConversion"("idIngredient", "idUnit");

-- AddForeignKey
ALTER TABLE "IngredientUnitConversion" ADD CONSTRAINT "IngredientUnitConversion_idIngredient_fkey" FOREIGN KEY ("idIngredient") REFERENCES "Ingredient"("idIngredient") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientUnitConversion" ADD CONSTRAINT "IngredientUnitConversion_idUnit_fkey" FOREIGN KEY ("idUnit") REFERENCES "Unit"("idUnit") ON DELETE RESTRICT ON UPDATE CASCADE;
