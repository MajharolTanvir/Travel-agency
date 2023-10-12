/*
  Warnings:

  - Added the required column `contactNo` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hotel" ADD COLUMN     "contactNo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "contactNo" TEXT;

-- CreateTable
CREATE TABLE "AddToCartFields" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,
    "byRoadTranspoartId" TEXT NOT NULL,
    "byBoatTranspoartId" TEXT NOT NULL,
    "byAirTranspoartId" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,

    CONSTRAINT "AddToCartFields_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AddToCartFields" ADD CONSTRAINT "AddToCartFields_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddToCartFields" ADD CONSTRAINT "AddToCartFields_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
