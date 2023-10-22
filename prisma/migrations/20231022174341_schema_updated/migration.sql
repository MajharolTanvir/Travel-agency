/*
  Warnings:

  - You are about to drop the column `transportId` on the `booked_hotel` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "booked_hotel" DROP CONSTRAINT "booked_hotel_transportId_fkey";

-- AlterTable
ALTER TABLE "booked_hotel" DROP COLUMN "transportId";

-- CreateTable
CREATE TABLE "TransportBooked" (
    "bookedId" TEXT NOT NULL,
    "transportId" TEXT NOT NULL,
    "bookedPackageId" TEXT NOT NULL,

    CONSTRAINT "TransportBooked_pkey" PRIMARY KEY ("bookedId")
);

-- AddForeignKey
ALTER TABLE "TransportBooked" ADD CONSTRAINT "TransportBooked_transportId_fkey" FOREIGN KEY ("transportId") REFERENCES "transports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransportBooked" ADD CONSTRAINT "TransportBooked_bookedPackageId_fkey" FOREIGN KEY ("bookedPackageId") REFERENCES "booked_hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
