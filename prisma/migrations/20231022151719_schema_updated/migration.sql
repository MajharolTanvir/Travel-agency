/*
  Warnings:

  - You are about to drop the column `checkInDate` on the `booked_hotel` table. All the data in the column will be lost.
  - You are about to drop the column `checkOutDate` on the `booked_hotel` table. All the data in the column will be lost.
  - You are about to drop the column `StartLocation` on the `package_plans` table. All the data in the column will be lost.
  - You are about to drop the column `bookedTraveller` on the `package_plans` table. All the data in the column will be lost.
  - You are about to drop the column `travlerSize` on the `package_plans` table. All the data in the column will be lost.
  - You are about to drop the `booked_transports` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `roomCheckInDate` to the `booked_hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomCheckOutDate` to the `booked_hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transportId` to the `booked_hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transportReservationEndDate` to the `booked_hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transportReservationStartDate` to the `booked_hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packageId` to the `booked_package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookedTraveler` to the `package_plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startLocation` to the `package_plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `travelerSize` to the `package_plans` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "package_plans" DROP CONSTRAINT "package_plans_hotelId_fkey";

-- AlterTable
ALTER TABLE "booked_hotel" DROP COLUMN "checkInDate",
DROP COLUMN "checkOutDate",
ADD COLUMN     "roomCheckInDate" TEXT NOT NULL,
ADD COLUMN     "roomCheckOutDate" TEXT NOT NULL,
ADD COLUMN     "transportId" TEXT NOT NULL,
ADD COLUMN     "transportReservationEndDate" TEXT NOT NULL,
ADD COLUMN     "transportReservationStartDate" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "booked_package" ADD COLUMN     "packageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "package_plans" DROP COLUMN "StartLocation",
DROP COLUMN "bookedTraveller",
DROP COLUMN "travlerSize",
ADD COLUMN     "bookedTraveler" INTEGER NOT NULL,
ADD COLUMN     "startLocation" TEXT NOT NULL,
ADD COLUMN     "travelerSize" INTEGER NOT NULL,
ALTER COLUMN "hotelId" DROP NOT NULL;

-- DropTable
DROP TABLE "booked_transports";

-- AddForeignKey
ALTER TABLE "package_plans" ADD CONSTRAINT "package_plans_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booked_package" ADD CONSTRAINT "booked_package_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "package_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booked_package" ADD CONSTRAINT "booked_package_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booked_hotel" ADD CONSTRAINT "booked_hotel_transportId_fkey" FOREIGN KEY ("transportId") REFERENCES "transports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
