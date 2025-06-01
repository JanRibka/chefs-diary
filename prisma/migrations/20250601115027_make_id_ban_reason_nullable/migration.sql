/*
  Warnings:

  - You are about to drop the column `test` on the `Unit` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_idBanReason_fkey";

-- DropForeignKey
ALTER TABLE "RecipeImage" DROP CONSTRAINT "RecipeImage_idBanReason_fkey";

-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "idBanReason" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RecipeImage" ALTER COLUMN "idBanReason" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "test";

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_idBanReason_fkey" FOREIGN KEY ("idBanReason") REFERENCES "BanReason"("idBanReason") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeImage" ADD CONSTRAINT "RecipeImage_idBanReason_fkey" FOREIGN KEY ("idBanReason") REFERENCES "BanReason"("idBanReason") ON DELETE SET NULL ON UPDATE CASCADE;
