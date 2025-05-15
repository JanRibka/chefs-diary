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
    "IdUser" VARCHAR(25) NOT NULL,
    "IdRecipe" INTEGER NOT NULL,
    "IdFavoriteGroup" INTEGER NOT NULL,

    CONSTRAINT "FavoriteRecipe_pkey" PRIMARY KEY ("IdUser","IdRecipe","IdFavoriteGroup")
);

-- CreateTable
CREATE TABLE "FavoriteRecipeGroup" (
    "IdFavoriteGroup" SERIAL NOT NULL,
    "IdUser" VARCHAR(25) NOT NULL,
    "Name" VARCHAR(50) NOT NULL,
    "CreatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteRecipeGroup_pkey" PRIMARY KEY ("IdFavoriteGroup")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "IdIngredient" SERIAL NOT NULL,
    "Name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("IdIngredient")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "IdPasswordResetToken" SERIAL NOT NULL,
    "Identifier" VARCHAR(25) NOT NULL,
    "Token" VARCHAR(36) NOT NULL,
    "Expires" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("IdPasswordResetToken")
);

-- CreateTable
CREATE TABLE "Permission" (
    "IdPermission" SERIAL NOT NULL,
    "Code" VARCHAR(20) NOT NULL,
    "Description" VARCHAR(35) NOT NULL,
    "Value" SMALLINT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("IdPermission")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "IdRecipe" SERIAL NOT NULL,
    "Title" VARCHAR(100) NOT NULL,
    "CreatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(0) NOT NULL,
    "IdUser" VARCHAR(25) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("IdRecipe")
);

-- CreateTable
CREATE TABLE "RecipeImage" (
    "IdRecipeImage" SERIAL NOT NULL,
    "IdRecipe" INTEGER NOT NULL,
    "IdUser" VARCHAR(25) NOT NULL,
    "Url" VARCHAR(255) NOT NULL,

    CONSTRAINT "RecipeImage_pkey" PRIMARY KEY ("IdRecipeImage")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "IdRecipeIngredient" SERIAL NOT NULL,
    "IdIngredientGroup" INTEGER NOT NULL,
    "IdIngredient" INTEGER NOT NULL,
    "IdUnit" INTEGER NOT NULL,
    "Quantity" REAL NOT NULL,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("IdRecipeIngredient")
);

-- CreateTable
CREATE TABLE "RecipeIngredientGroup" (
    "IdIngredientGroup" SERIAL NOT NULL,
    "IdRecipe" INTEGER NOT NULL,
    "Name" VARCHAR(50) NOT NULL,

    CONSTRAINT "RecipeIngredientGroup_pkey" PRIMARY KEY ("IdIngredientGroup")
);

-- CreateTable
CREATE TABLE "RecipeNote" (
    "IdNote" SERIAL NOT NULL,
    "IdUser" VARCHAR(25) NOT NULL,
    "IdRecipe" INTEGER NOT NULL,
    "Note" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecipeNote_pkey" PRIMARY KEY ("IdNote")
);

-- CreateTable
CREATE TABLE "RecipeRating" (
    "IdRating" SERIAL NOT NULL,
    "IdUser" VARCHAR(25) NOT NULL,
    "IdRecipe" INTEGER NOT NULL,
    "Rating" SMALLINT NOT NULL,

    CONSTRAINT "RecipeRating_pkey" PRIMARY KEY ("IdRating")
);

-- CreateTable
CREATE TABLE "RecipeStep" (
    "IdRecipeStep" SERIAL NOT NULL,
    "IdRecipe" INTEGER NOT NULL,
    "StepNumber" SMALLINT NOT NULL,
    "Description" TEXT NOT NULL,

    CONSTRAINT "RecipeStep_pkey" PRIMARY KEY ("IdRecipeStep")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "IdUserRoleType" INTEGER NOT NULL,
    "IdPermission" INTEGER NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("IdUserRoleType","IdPermission")
);

-- CreateTable
CREATE TABLE "Session" (
    "IdSession" SERIAL NOT NULL,
    "sessionToken" VARCHAR(25) NOT NULL,
    "userId" VARCHAR(25) NOT NULL,
    "expires" TIMESTAMP(0) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" VARCHAR(15) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("IdSession")
);

-- CreateTable
CREATE TABLE "SessionAdmin" (
    "IdSession" SERIAL NOT NULL,
    "sessionToken" VARCHAR(25) NOT NULL,
    "userId" VARCHAR(25) NOT NULL,
    "expires" TIMESTAMP(0) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" VARCHAR(15) NOT NULL,

    CONSTRAINT "SessionAdmin_pkey" PRIMARY KEY ("IdSession")
);

-- CreateTable
CREATE TABLE "Unit" (
    "IdUnit" SERIAL NOT NULL,
    "Name" VARCHAR(10) NOT NULL,
    "DisplayName" VARCHAR(10) NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("IdUnit")
);

-- CreateTable
CREATE TABLE "User" (
    "IdUser" VARCHAR(25) NOT NULL,
    "Password" VARCHAR(255) NOT NULL,
    "IsDisabled" BOOLEAN DEFAULT false,
    "WebLoginRestrictedUntil" TIMESTAMP(0),
    "AdminLoginRestrictedUntil" TIMESTAMP(0),
    "TwoFactor" BOOLEAN DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("IdUser")
);

-- CreateTable
CREATE TABLE "UserActionLog" (
    "IdUserActionLog" SERIAL NOT NULL,
    "IdUser" VARCHAR(25) NOT NULL,
    "Action" VARCHAR(20) NOT NULL,
    "TargetId" VARCHAR(25),
    "TargetType" VARCHAR(30) NOT NULL,
    "Timestamp" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Metadata" TEXT,

    CONSTRAINT "UserActionLog_pkey" PRIMARY KEY ("IdUserActionLog")
);

-- CreateTable
CREATE TABLE "UserInfo" (
    "IdUserInfo" SERIAL NOT NULL,
    "IdUser" VARCHAR(25) NOT NULL,
    "UserName" VARCHAR(25),
    "Email" VARCHAR(50) NOT NULL,
    "EmailVerifiedAt" TIMESTAMP(0),
    "Phone" VARCHAR(25),
    "Image" VARCHAR(255),
    "FirstName" VARCHAR(25),
    "LastName" VARCHAR(25),
    "CreatedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(0),

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("IdUserInfo")
);

-- CreateTable
CREATE TABLE "UserLoginHistory" (
    "IdUserLogHistory" SERIAL NOT NULL,
    "IdUser" VARCHAR(25) NOT NULL,
    "AuthMode" VARCHAR(5) NOT NULL,
    "LoginAttemptDate" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "LoginSuccessful" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserLoginHistory_pkey" PRIMARY KEY ("IdUserLogHistory")
);

-- CreateTable
CREATE TABLE "UserPermissionOverride" (
    "IdUser" VARCHAR(25) NOT NULL,
    "IdPermission" INTEGER NOT NULL,
    "Allow" BOOLEAN NOT NULL,

    CONSTRAINT "UserPermissionOverride_pkey" PRIMARY KEY ("IdUser","IdPermission")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "IdUser" VARCHAR(25) NOT NULL,
    "IdUserRoleType" INTEGER NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("IdUser","IdUserRoleType")
);

-- CreateTable
CREATE TABLE "UserRoleType" (
    "IdUserRoleType" SERIAL NOT NULL,
    "Code" VARCHAR(20) NOT NULL,
    "Value" SMALLINT NOT NULL,
    "Description" VARCHAR(20) NOT NULL,

    CONSTRAINT "UserRoleType_pkey" PRIMARY KEY ("IdUserRoleType")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "IdVerificationToken" SERIAL NOT NULL,
    "Identifier" VARCHAR(25) NOT NULL,
    "Token" VARCHAR(36) NOT NULL,
    "Expires" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("IdVerificationToken")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_Name_key" ON "Ingredient"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_Token_key" ON "PasswordResetToken"("Token");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_Code_key" ON "Permission"("Code");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_Value_key" ON "Permission"("Value");

-- CreateIndex
CREATE INDEX "RecipeImage_IdRecipe_idx" ON "RecipeImage"("IdRecipe");

-- CreateIndex
CREATE INDEX "RecipeImage_IdUser_idx" ON "RecipeImage"("IdUser");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeRating_IdUser_IdRecipe_key" ON "RecipeRating"("IdUser", "IdRecipe");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeStep_IdRecipe_StepNumber_key" ON "RecipeStep"("IdRecipe", "StepNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "SessionAdmin_sessionToken_key" ON "SessionAdmin"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_Name_key" ON "Unit"("Name");

-- CreateIndex
CREATE INDEX "UserActionLog_IdUser_idx" ON "UserActionLog"("IdUser");

-- CreateIndex
CREATE INDEX "UserActionLog_Action_idx" ON "UserActionLog"("Action");

-- CreateIndex
CREATE INDEX "UserActionLog_TargetType_TargetId_idx" ON "UserActionLog"("TargetType", "TargetId");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_IdUser_key" ON "UserInfo"("IdUser");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_Email_key" ON "UserInfo"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_Phone_key" ON "UserInfo"("Phone");

-- CreateIndex
CREATE INDEX "UserLoginHistory_IdUser_LoginSuccessful_LoginAttemptDate_Au_idx" ON "UserLoginHistory"("IdUser", "LoginSuccessful", "LoginAttemptDate", "AuthMode");

-- CreateIndex
CREATE INDEX "UserRole_IdUser_idx" ON "UserRole"("IdUser");

-- CreateIndex
CREATE UNIQUE INDEX "UserRoleType_Code_key" ON "UserRoleType"("Code");

-- CreateIndex
CREATE UNIQUE INDEX "UserRoleType_Value_key" ON "UserRoleType"("Value");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_Identifier_key" ON "VerificationToken"("Identifier");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_Token_key" ON "VerificationToken"("Token");

-- AddForeignKey
ALTER TABLE "FavoriteRecipe" ADD CONSTRAINT "FavoriteRecipe_IdUser_fkey" FOREIGN KEY ("IdUser") REFERENCES "User"("IdUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteRecipe" ADD CONSTRAINT "FavoriteRecipe_IdRecipe_fkey" FOREIGN KEY ("IdRecipe") REFERENCES "Recipe"("IdRecipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteRecipe" ADD CONSTRAINT "FavoriteRecipe_IdFavoriteGroup_fkey" FOREIGN KEY ("IdFavoriteGroup") REFERENCES "FavoriteRecipeGroup"("IdFavoriteGroup") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteRecipeGroup" ADD CONSTRAINT "FavoriteRecipeGroup_IdUser_fkey" FOREIGN KEY ("IdUser") REFERENCES "User"("IdUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_IdUser_fkey" FOREIGN KEY ("IdUser") REFERENCES "User"("IdUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeImage" ADD CONSTRAINT "RecipeImage_IdRecipe_fkey" FOREIGN KEY ("IdRecipe") REFERENCES "Recipe"("IdRecipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeImage" ADD CONSTRAINT "RecipeImage_IdUser_fkey" FOREIGN KEY ("IdUser") REFERENCES "User"("IdUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_IdIngredientGroup_fkey" FOREIGN KEY ("IdIngredientGroup") REFERENCES "RecipeIngredientGroup"("IdIngredientGroup") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_IdIngredient_fkey" FOREIGN KEY ("IdIngredient") REFERENCES "Ingredient"("IdIngredient") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_IdUnit_fkey" FOREIGN KEY ("IdUnit") REFERENCES "Unit"("IdUnit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredientGroup" ADD CONSTRAINT "RecipeIngredientGroup_IdRecipe_fkey" FOREIGN KEY ("IdRecipe") REFERENCES "Recipe"("IdRecipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeNote" ADD CONSTRAINT "RecipeNote_IdUser_fkey" FOREIGN KEY ("IdUser") REFERENCES "User"("IdUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeNote" ADD CONSTRAINT "RecipeNote_IdRecipe_fkey" FOREIGN KEY ("IdRecipe") REFERENCES "Recipe"("IdRecipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeRating" ADD CONSTRAINT "RecipeRating_IdUser_fkey" FOREIGN KEY ("IdUser") REFERENCES "User"("IdUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeRating" ADD CONSTRAINT "RecipeRating_IdRecipe_fkey" FOREIGN KEY ("IdRecipe") REFERENCES "Recipe"("IdRecipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeStep" ADD CONSTRAINT "RecipeStep_IdRecipe_fkey" FOREIGN KEY ("IdRecipe") REFERENCES "Recipe"("IdRecipe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_IdUserRoleType_fkey" FOREIGN KEY ("IdUserRoleType") REFERENCES "UserRoleType"("IdUserRoleType") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_IdPermission_fkey" FOREIGN KEY ("IdPermission") REFERENCES "Permission"("IdPermission") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("IdUser") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionAdmin" ADD CONSTRAINT "SessionAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("IdUser") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActionLog" ADD CONSTRAINT "UserActionLog_IdUser_fkey" FOREIGN KEY ("IdUser") REFERENCES "User"("IdUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_IdUser_fkey" FOREIGN KEY ("IdUser") REFERENCES "User"("IdUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLoginHistory" ADD CONSTRAINT "UserLoginHistory_IdUser_fkey" FOREIGN KEY ("IdUser") REFERENCES "User"("IdUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermissionOverride" ADD CONSTRAINT "UserPermissionOverride_IdUser_fkey" FOREIGN KEY ("IdUser") REFERENCES "User"("IdUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermissionOverride" ADD CONSTRAINT "UserPermissionOverride_IdPermission_fkey" FOREIGN KEY ("IdPermission") REFERENCES "Permission"("IdPermission") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_IdUser_fkey" FOREIGN KEY ("IdUser") REFERENCES "User"("IdUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_IdUserRoleType_fkey" FOREIGN KEY ("IdUserRoleType") REFERENCES "UserRoleType"("IdUserRoleType") ON DELETE RESTRICT ON UPDATE CASCADE;
