-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "idIngredientGroup" INTEGER;

-- CreateTable
CREATE TABLE "IngredientGroup" (
    "idIngredientGroup" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "IngredientGroup_pkey" PRIMARY KEY ("idIngredientGroup")
);

-- CreateTable
CREATE TABLE "IngredientGroupMapping" (
    "idIngredientGroupMapping" SERIAL NOT NULL,
    "idParentIngredient" INTEGER NOT NULL,
    "idChildIngredient" INTEGER NOT NULL,

    CONSTRAINT "IngredientGroupMapping_pkey" PRIMARY KEY ("idIngredientGroupMapping")
);

-- CreateTable
CREATE TABLE "IngredientSubstitute" (
    "idIngredientSubstitute" SERIAL NOT NULL,
    "idUser" VARCHAR(25) NOT NULL,
    "idOriginalIngredient" INTEGER NOT NULL,
    "idAlternativeIngredient" INTEGER NOT NULL,

    CONSTRAINT "IngredientSubstitute_pkey" PRIMARY KEY ("idIngredientSubstitute")
);

-- CreateIndex
CREATE UNIQUE INDEX "IngredientGroup_name_key" ON "IngredientGroup"("name");

-- CreateIndex
CREATE INDEX "IngredientGroupMapping_idParentIngredient_idx" ON "IngredientGroupMapping"("idParentIngredient");

-- CreateIndex
CREATE INDEX "IngredientGroupMapping_idChildIngredient_idx" ON "IngredientGroupMapping"("idChildIngredient");

-- CreateIndex
CREATE INDEX "IngredientSubstitute_idUser_idx" ON "IngredientSubstitute"("idUser");

-- CreateIndex
CREATE INDEX "IngredientSubstitute_idOriginalIngredient_idx" ON "IngredientSubstitute"("idOriginalIngredient");

-- CreateIndex
CREATE INDEX "IngredientSubstitute_idAlternativeIngredient_idx" ON "IngredientSubstitute"("idAlternativeIngredient");

-- CreateIndex
CREATE UNIQUE INDEX "IngredientSubstitute_idUser_idOriginalIngredient_idAlternat_key" ON "IngredientSubstitute"("idUser", "idOriginalIngredient", "idAlternativeIngredient");

-- CreateIndex
CREATE INDEX "Ingredient_idIngredientGroup_idx" ON "Ingredient"("idIngredientGroup");

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_idIngredientGroup_fkey" FOREIGN KEY ("idIngredientGroup") REFERENCES "IngredientGroup"("idIngredientGroup") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientGroupMapping" ADD CONSTRAINT "IngredientGroupMapping_idParentIngredient_fkey" FOREIGN KEY ("idParentIngredient") REFERENCES "Ingredient"("idIngredient") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientGroupMapping" ADD CONSTRAINT "IngredientGroupMapping_idChildIngredient_fkey" FOREIGN KEY ("idChildIngredient") REFERENCES "Ingredient"("idIngredient") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientSubstitute" ADD CONSTRAINT "IngredientSubstitute_idOriginalIngredient_fkey" FOREIGN KEY ("idOriginalIngredient") REFERENCES "Ingredient"("idIngredient") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientSubstitute" ADD CONSTRAINT "IngredientSubstitute_idAlternativeIngredient_fkey" FOREIGN KEY ("idAlternativeIngredient") REFERENCES "Ingredient"("idIngredient") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientSubstitute" ADD CONSTRAINT "IngredientSubstitute_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;
