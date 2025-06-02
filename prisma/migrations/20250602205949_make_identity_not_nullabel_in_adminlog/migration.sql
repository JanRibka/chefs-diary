/*
  Warnings:

  - You are about to alter the column `action` on the `AdminLog` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `VarChar(10)`.
  - You are about to alter the column `entity` on the `AdminLog` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(15)`.
  - Made the column `idEntity` on table `AdminLog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AdminLog" ALTER COLUMN "action" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "entity" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "idEntity" SET NOT NULL;
