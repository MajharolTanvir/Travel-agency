/*
  Warnings:

  - You are about to drop the column `guideId` on the `package_plans` table. All the data in the column will be lost.
  - You are about to drop the column `hotelId` on the `package_plans` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "package_plans" DROP CONSTRAINT "package_plans_guideId_fkey";

-- DropForeignKey
ALTER TABLE "package_plans" DROP CONSTRAINT "package_plans_hotelId_fkey";

-- AlterTable
ALTER TABLE "package_plans" DROP COLUMN "guideId",
DROP COLUMN "hotelId";
