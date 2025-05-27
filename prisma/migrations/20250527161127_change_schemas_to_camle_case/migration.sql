/*
  Warnings:

  - You are about to drop the `FavoriteRecipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FavoriteRecipeGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PasswordResetToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeIngredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeIngredientGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeNote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeRating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeStep` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RolePermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SessionAdmin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Unit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UnitConversion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UnitGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserActionLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserLoginHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPermissionOverride` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRoleType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."FavoriteRecipe" DROP CONSTRAINT "FavoriteRecipe_IdFavoriteGroup_fkey";

-- DropForeignKey
ALTER TABLE "public"."FavoriteRecipe" DROP CONSTRAINT "FavoriteRecipe_IdRecipe_fkey";

-- DropForeignKey
ALTER TABLE "public"."FavoriteRecipe" DROP CONSTRAINT "FavoriteRecipe_IdUser_fkey";

-- DropForeignKey
ALTER TABLE "public"."FavoriteRecipeGroup" DROP CONSTRAINT "FavoriteRecipeGroup_IdUser_fkey";

-- DropForeignKey
ALTER TABLE "public"."Recipe" DROP CONSTRAINT "Recipe_IdUser_fkey";

-- DropForeignKey
ALTER TABLE "public"."RecipeImage" DROP CONSTRAINT "RecipeImage_IdRecipe_fkey";

-- DropForeignKey
ALTER TABLE "public"."RecipeImage" DROP CONSTRAINT "RecipeImage_IdUser_fkey";

-- DropForeignKey
ALTER TABLE "public"."RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_IdIngredientGroup_fkey";

-- DropForeignKey
ALTER TABLE "public"."RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_IdIngredient_fkey";

-- DropForeignKey
ALTER TABLE "public"."RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_IdUnit_fkey";

-- DropForeignKey
ALTER TABLE "public"."RecipeIngredientGroup" DROP CONSTRAINT "RecipeIngredientGroup_IdRecipe_fkey";

-- DropForeignKey
ALTER TABLE "public"."RecipeNote" DROP CONSTRAINT "RecipeNote_IdRecipe_fkey";

-- DropForeignKey
ALTER TABLE "public"."RecipeNote" DROP CONSTRAINT "RecipeNote_IdUser_fkey";

-- DropForeignKey
ALTER TABLE "public"."RecipeRating" DROP CONSTRAINT "RecipeRating_IdRecipe_fkey";

-- DropForeignKey
ALTER TABLE "public"."RecipeRating" DROP CONSTRAINT "RecipeRating_IdUser_fkey";

-- DropForeignKey
ALTER TABLE "public"."RecipeStep" DROP CONSTRAINT "RecipeStep_IdRecipe_fkey";

-- DropForeignKey
ALTER TABLE "public"."RolePermission" DROP CONSTRAINT "RolePermission_IdPermission_fkey";

-- DropForeignKey
ALTER TABLE "public"."RolePermission" DROP CONSTRAINT "RolePermission_IdUserRoleType_fkey";

-- DropForeignKey
ALTER TABLE "public"."Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SessionAdmin" DROP CONSTRAINT "SessionAdmin_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Unit" DROP CONSTRAINT "Unit_IdUnitGroup_fkey";

-- DropForeignKey
ALTER TABLE "public"."UnitConversion" DROP CONSTRAINT "UnitConversion_IdFromUnit_fkey";

-- DropForeignKey
ALTER TABLE "public"."UnitConversion" DROP CONSTRAINT "UnitConversion_IdToUnit_fkey";

-- DropForeignKey
ALTER TABLE "public"."UnitGroup" DROP CONSTRAINT "UnitGroup_IdBaseUnit_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserActionLog" DROP CONSTRAINT "UserActionLog_IdUser_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserInfo" DROP CONSTRAINT "UserInfo_IdUser_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserLoginHistory" DROP CONSTRAINT "UserLoginHistory_IdUser_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserPermissionOverride" DROP CONSTRAINT "UserPermissionOverride_IdPermission_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserPermissionOverride" DROP CONSTRAINT "UserPermissionOverride_IdUser_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserRole" DROP CONSTRAINT "UserRole_IdUserRoleType_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserRole" DROP CONSTRAINT "UserRole_IdUser_fkey";

-- DropTable
DROP TABLE "public"."FavoriteRecipe";

-- DropTable
DROP TABLE "public"."FavoriteRecipeGroup";

-- DropTable
DROP TABLE "public"."Ingredient";

-- DropTable
DROP TABLE "public"."PasswordResetToken";

-- DropTable
DROP TABLE "public"."Permission";

-- DropTable
DROP TABLE "public"."Recipe";

-- DropTable
DROP TABLE "public"."RecipeImage";

-- DropTable
DROP TABLE "public"."RecipeIngredient";

-- DropTable
DROP TABLE "public"."RecipeIngredientGroup";

-- DropTable
DROP TABLE "public"."RecipeNote";

-- DropTable
DROP TABLE "public"."RecipeRating";

-- DropTable
DROP TABLE "public"."RecipeStep";

-- DropTable
DROP TABLE "public"."RolePermission";

-- DropTable
DROP TABLE "public"."Session";

-- DropTable
DROP TABLE "public"."SessionAdmin";

-- DropTable
DROP TABLE "public"."Unit";

-- DropTable
DROP TABLE "public"."UnitConversion";

-- DropTable
DROP TABLE "public"."UnitGroup";

-- DropTable
DROP TABLE "public"."User";

-- DropTable
DROP TABLE "public"."UserActionLog";

-- DropTable
DROP TABLE "public"."UserInfo";

-- DropTable
DROP TABLE "public"."UserLoginHistory";

-- DropTable
DROP TABLE "public"."UserPermissionOverride";

-- DropTable
DROP TABLE "public"."UserRole";

-- DropTable
DROP TABLE "public"."UserRoleType";

-- DropTable
DROP TABLE "public"."VerificationToken";

-- CreateTable
CREATE TABLE "FavoriteRecipe" (
    "idUser" VARCHAR(25) NOT NULL,
    "idRecipe" INTEGER NOT NULL,
    "idFavoriteGroup" INTEGER NOT NULL,

    CONSTRAINT "FavoriteRecipe_pkey" PRIMARY KEY ("idUser","idRecipe","idFavoriteGroup")
);

-- CreateTable
CREATE TABLE "FavoriteRecipeGroup" (
    "idFavoriteGroup" SERIAL NOT NULL,
    "idUser" VARCHAR(25) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteRecipeGroup_pkey" PRIMARY KEY ("idFavoriteGroup")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "idIngredient" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("idIngredient")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "idPasswordResetToken" SERIAL NOT NULL,
    "identifier" VARCHAR(25) NOT NULL,
    "token" VARCHAR(36) NOT NULL,
    "expires" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("idPasswordResetToken")
);

-- CreateTable
CREATE TABLE "Permission" (
    "idPermission" SERIAL NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "description" VARCHAR(35) NOT NULL,
    "value" SMALLINT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("idPermission")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "idRecipe" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL,
    "idUser" VARCHAR(25) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("idRecipe")
);

-- CreateTable
CREATE TABLE "RecipeImage" (
    "idRecipeImage" SERIAL NOT NULL,
    "idRecipe" INTEGER NOT NULL,
    "idUser" VARCHAR(25) NOT NULL,
    "url" VARCHAR(255) NOT NULL,

    CONSTRAINT "RecipeImage_pkey" PRIMARY KEY ("idRecipeImage")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "idRecipeIngredient" SERIAL NOT NULL,
    "idIngredientGroup" INTEGER NOT NULL,
    "idIngredient" INTEGER NOT NULL,
    "idUnit" INTEGER NOT NULL,
    "quantity" REAL NOT NULL,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("idRecipeIngredient")
);

-- CreateTable
CREATE TABLE "RecipeIngredientGroup" (
    "idIngredientGroup" SERIAL NOT NULL,
    "idRecipe" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "RecipeIngredientGroup_pkey" PRIMARY KEY ("idIngredientGroup")
);

-- CreateTable
CREATE TABLE "RecipeNote" (
    "idNote" SERIAL NOT NULL,
    "idUser" VARCHAR(25) NOT NULL,
    "idRecipe" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecipeNote_pkey" PRIMARY KEY ("idNote")
);

-- CreateTable
CREATE TABLE "RecipeRating" (
    "idRating" SERIAL NOT NULL,
    "idUser" VARCHAR(25) NOT NULL,
    "idRecipe" INTEGER NOT NULL,
    "rating" SMALLINT NOT NULL,

    CONSTRAINT "RecipeRating_pkey" PRIMARY KEY ("idRating")
);

-- CreateTable
CREATE TABLE "RecipeStep" (
    "idRecipeStep" SERIAL NOT NULL,
    "idRecipe" INTEGER NOT NULL,
    "stepNumber" SMALLINT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "RecipeStep_pkey" PRIMARY KEY ("idRecipeStep")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "idUserRoleType" INTEGER NOT NULL,
    "idPermission" INTEGER NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("idUserRoleType","idPermission")
);

-- CreateTable
CREATE TABLE "Session" (
    "idSession" SERIAL NOT NULL,
    "sessionToken" VARCHAR(36) NOT NULL,
    "userId" VARCHAR(25) NOT NULL,
    "expires" TIMESTAMP(0) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" VARCHAR(15) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("idSession")
);

-- CreateTable
CREATE TABLE "SessionAdmin" (
    "idSession" SERIAL NOT NULL,
    "sessionToken" VARCHAR(36) NOT NULL,
    "userId" VARCHAR(25) NOT NULL,
    "expires" TIMESTAMP(0) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" VARCHAR(15) NOT NULL,

    CONSTRAINT "SessionAdmin_pkey" PRIMARY KEY ("idSession")
);

-- CreateTable
CREATE TABLE "Unit" (
    "idUnit" SERIAL NOT NULL,
    "name" VARCHAR(10) NOT NULL,
    "displayName" VARCHAR(10) NOT NULL,
    "idUnitGroup" INTEGER NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("idUnit")
);

-- CreateTable
CREATE TABLE "UnitConversion" (
    "idUnitConversion" SERIAL NOT NULL,
    "idFromUnit" INTEGER NOT NULL,
    "idToUnit" INTEGER NOT NULL,
    "factor" REAL NOT NULL,

    CONSTRAINT "UnitConversion_pkey" PRIMARY KEY ("idUnitConversion")
);

-- CreateTable
CREATE TABLE "UnitGroup" (
    "idUnitGroup" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "idBaseUnit" INTEGER,

    CONSTRAINT "UnitGroup_pkey" PRIMARY KEY ("idUnitGroup")
);

-- CreateTable
CREATE TABLE "User" (
    "idUser" VARCHAR(25) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "isDisabled" BOOLEAN DEFAULT false,
    "webLoginRestrictedUntil" TIMESTAMP(0),
    "adminLoginRestrictedUntil" TIMESTAMP(0),
    "twoFactor" BOOLEAN DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("idUser")
);

-- CreateTable
CREATE TABLE "UserActionLog" (
    "idUserActionLog" SERIAL NOT NULL,
    "idUser" VARCHAR(25) NOT NULL,
    "action" VARCHAR(20) NOT NULL,
    "targetId" VARCHAR(25),
    "targetType" VARCHAR(30) NOT NULL,
    "timestamp" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" TEXT,

    CONSTRAINT "UserActionLog_pkey" PRIMARY KEY ("idUserActionLog")
);

-- CreateTable
CREATE TABLE "UserInfo" (
    "idUserInfo" SERIAL NOT NULL,
    "idUser" VARCHAR(25) NOT NULL,
    "userName" VARCHAR(25),
    "email" VARCHAR(50) NOT NULL,
    "emailVerifiedAt" TIMESTAMP(0),
    "phone" VARCHAR(25),
    "imageUrl" VARCHAR(255),
    "firstName" VARCHAR(25),
    "lastName" VARCHAR(25),
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0),

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("idUserInfo")
);

-- CreateTable
CREATE TABLE "UserLoginHistory" (
    "idUserLogHistory" SERIAL NOT NULL,
    "idUser" VARCHAR(25) NOT NULL,
    "authMode" VARCHAR(5) NOT NULL,
    "loginAttemptDate" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loginSuccessful" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserLoginHistory_pkey" PRIMARY KEY ("idUserLogHistory")
);

-- CreateTable
CREATE TABLE "UserPermissionOverride" (
    "idUser" VARCHAR(25) NOT NULL,
    "idPermission" INTEGER NOT NULL,
    "allow" BOOLEAN NOT NULL,

    CONSTRAINT "UserPermissionOverride_pkey" PRIMARY KEY ("idUser","idPermission")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "idUser" VARCHAR(25) NOT NULL,
    "idUserRoleType" INTEGER NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("idUser","idUserRoleType")
);

-- CreateTable
CREATE TABLE "UserRoleType" (
    "idUserRoleType" SERIAL NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "value" SMALLINT NOT NULL,
    "description" VARCHAR(20) NOT NULL,

    CONSTRAINT "UserRoleType_pkey" PRIMARY KEY ("idUserRoleType")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "idVerificationToken" SERIAL NOT NULL,
    "identifier" VARCHAR(25) NOT NULL,
    "token" VARCHAR(36) NOT NULL,
    "expires" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("idVerificationToken")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_code_key" ON "Permission"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_value_key" ON "Permission"("value");

-- CreateIndex
CREATE INDEX "RecipeImage_idRecipe_idx" ON "RecipeImage"("idRecipe");

-- CreateIndex
CREATE INDEX "RecipeImage_idUser_idx" ON "RecipeImage"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeRating_idUser_idRecipe_key" ON "RecipeRating"("idUser", "idRecipe");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeStep_idRecipe_stepNumber_key" ON "RecipeStep"("idRecipe", "stepNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "SessionAdmin_sessionToken_key" ON "SessionAdmin"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_name_key" ON "Unit"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UnitConversion_idFromUnit_idToUnit_key" ON "UnitConversion"("idFromUnit", "idToUnit");

-- CreateIndex
CREATE UNIQUE INDEX "UnitGroup_name_key" ON "UnitGroup"("name");

-- CreateIndex
CREATE INDEX "UserActionLog_idUser_idx" ON "UserActionLog"("idUser");

-- CreateIndex
CREATE INDEX "UserActionLog_action_idx" ON "UserActionLog"("action");

-- CreateIndex
CREATE INDEX "UserActionLog_targetType_targetId_idx" ON "UserActionLog"("targetType", "targetId");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_idUser_key" ON "UserInfo"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_email_key" ON "UserInfo"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_phone_key" ON "UserInfo"("phone");

-- CreateIndex
CREATE INDEX "UserLoginHistory_idUser_loginSuccessful_loginAttemptDate_au_idx" ON "UserLoginHistory"("idUser", "loginSuccessful", "loginAttemptDate", "authMode");

-- CreateIndex
CREATE INDEX "UserRole_idUser_idx" ON "UserRole"("idUser");

-- CreateIndex
CREATE UNIQUE INDEX "UserRoleType_code_key" ON "UserRoleType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "UserRoleType_value_key" ON "UserRoleType"("value");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_key" ON "VerificationToken"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- AddForeignKey
ALTER TABLE "FavoriteRecipe" ADD CONSTRAINT "FavoriteRecipe_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteRecipe" ADD CONSTRAINT "FavoriteRecipe_idRecipe_fkey" FOREIGN KEY ("idRecipe") REFERENCES "Recipe"("idRecipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteRecipe" ADD CONSTRAINT "FavoriteRecipe_idFavoriteGroup_fkey" FOREIGN KEY ("idFavoriteGroup") REFERENCES "FavoriteRecipeGroup"("idFavoriteGroup") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteRecipeGroup" ADD CONSTRAINT "FavoriteRecipeGroup_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeImage" ADD CONSTRAINT "RecipeImage_idRecipe_fkey" FOREIGN KEY ("idRecipe") REFERENCES "Recipe"("idRecipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeImage" ADD CONSTRAINT "RecipeImage_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_idIngredientGroup_fkey" FOREIGN KEY ("idIngredientGroup") REFERENCES "RecipeIngredientGroup"("idIngredientGroup") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_idIngredient_fkey" FOREIGN KEY ("idIngredient") REFERENCES "Ingredient"("idIngredient") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_idUnit_fkey" FOREIGN KEY ("idUnit") REFERENCES "Unit"("idUnit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredientGroup" ADD CONSTRAINT "RecipeIngredientGroup_idRecipe_fkey" FOREIGN KEY ("idRecipe") REFERENCES "Recipe"("idRecipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeNote" ADD CONSTRAINT "RecipeNote_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeNote" ADD CONSTRAINT "RecipeNote_idRecipe_fkey" FOREIGN KEY ("idRecipe") REFERENCES "Recipe"("idRecipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeRating" ADD CONSTRAINT "RecipeRating_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeRating" ADD CONSTRAINT "RecipeRating_idRecipe_fkey" FOREIGN KEY ("idRecipe") REFERENCES "Recipe"("idRecipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeStep" ADD CONSTRAINT "RecipeStep_idRecipe_fkey" FOREIGN KEY ("idRecipe") REFERENCES "Recipe"("idRecipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_idUserRoleType_fkey" FOREIGN KEY ("idUserRoleType") REFERENCES "UserRoleType"("idUserRoleType") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_idPermission_fkey" FOREIGN KEY ("idPermission") REFERENCES "Permission"("idPermission") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionAdmin" ADD CONSTRAINT "SessionAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_idUnitGroup_fkey" FOREIGN KEY ("idUnitGroup") REFERENCES "UnitGroup"("idUnitGroup") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitConversion" ADD CONSTRAINT "UnitConversion_idFromUnit_fkey" FOREIGN KEY ("idFromUnit") REFERENCES "Unit"("idUnit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitConversion" ADD CONSTRAINT "UnitConversion_idToUnit_fkey" FOREIGN KEY ("idToUnit") REFERENCES "Unit"("idUnit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitGroup" ADD CONSTRAINT "UnitGroup_idBaseUnit_fkey" FOREIGN KEY ("idBaseUnit") REFERENCES "Unit"("idUnit") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActionLog" ADD CONSTRAINT "UserActionLog_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLoginHistory" ADD CONSTRAINT "UserLoginHistory_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermissionOverride" ADD CONSTRAINT "UserPermissionOverride_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermissionOverride" ADD CONSTRAINT "UserPermissionOverride_idPermission_fkey" FOREIGN KEY ("idPermission") REFERENCES "Permission"("idPermission") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_idUserRoleType_fkey" FOREIGN KEY ("idUserRoleType") REFERENCES "UserRoleType"("idUserRoleType") ON DELETE RESTRICT ON UPDATE CASCADE;
