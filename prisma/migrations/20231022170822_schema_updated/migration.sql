/*
  Warnings:

  - Changed the type of `travelingMember` on the `booked_package` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "booked_package" DROP COLUMN "travelingMember",
ADD COLUMN     "travelingMember" INTEGER NOT NULL;
