/*
  Warnings:

  - You are about to drop the `PasswordResetToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RolePermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SessionAdmin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserLoginHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPermissionOverride` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRoleType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."RolePermission" DROP CONSTRAINT "RolePermission_IdPermission_fkey";

-- DropForeignKey
ALTER TABLE "public"."RolePermission" DROP CONSTRAINT "RolePermission_IdUserRoleType_fkey";

-- DropForeignKey
ALTER TABLE "public"."Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SessionAdmin" DROP CONSTRAINT "SessionAdmin_userId_fkey";

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
DROP TABLE "public"."PasswordResetToken";

-- DropTable
DROP TABLE "public"."Permission";

-- DropTable
DROP TABLE "public"."RolePermission";

-- DropTable
DROP TABLE "public"."Session";

-- DropTable
DROP TABLE "public"."SessionAdmin";

-- DropTable
DROP TABLE "public"."User";

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
    "Description" VARCHAR(50) NOT NULL,
    "Value" SMALLINT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("IdPermission")
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
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("IdSession")
);

-- CreateTable
CREATE TABLE "SessionAdmin" (
    "IdSession" SERIAL NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SessionAdmin_pkey" PRIMARY KEY ("IdSession")
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
CREATE UNIQUE INDEX "PasswordResetToken_Token_key" ON "PasswordResetToken"("Token");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_Code_key" ON "Permission"("Code");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_Value_key" ON "Permission"("Value");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "SessionAdmin_sessionToken_key" ON "SessionAdmin"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_IdUser_key" ON "UserInfo"("IdUser");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_Email_key" ON "UserInfo"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_Phone_key" ON "UserInfo"("Phone");

-- CreateIndex
CREATE UNIQUE INDEX "UserRoleType_Code_key" ON "UserRoleType"("Code");

-- CreateIndex
CREATE UNIQUE INDEX "UserRoleType_Value_key" ON "UserRoleType"("Value");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_Identifier_key" ON "VerificationToken"("Identifier");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_Token_key" ON "VerificationToken"("Token");

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_IdUserRoleType_fkey" FOREIGN KEY ("IdUserRoleType") REFERENCES "UserRoleType"("IdUserRoleType") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_IdPermission_fkey" FOREIGN KEY ("IdPermission") REFERENCES "Permission"("IdPermission") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("IdUser") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionAdmin" ADD CONSTRAINT "SessionAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("IdUser") ON DELETE CASCADE ON UPDATE CASCADE;

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
