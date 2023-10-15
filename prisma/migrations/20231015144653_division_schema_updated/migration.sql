/*
  Warnings:

  - You are about to drop the column `divisionImage` on the `District` table. All the data in the column will be lost.
  - Added the required column `districtImage` to the `District` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "District" DROP COLUMN "divisionImage",
ADD COLUMN     "districtImage" TEXT NOT NULL;
