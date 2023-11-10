-- DropForeignKey
ALTER TABLE "TransportBooked" DROP CONSTRAINT "TransportBooked_bookedPackageId_fkey";

-- DropForeignKey
ALTER TABLE "TransportBooked" DROP CONSTRAINT "TransportBooked_transportId_fkey";

-- DropForeignKey
ALTER TABLE "booked_hotel" DROP CONSTRAINT "booked_hotel_roomId_fkey";

-- AlterTable
ALTER TABLE "TransportBooked" ALTER COLUMN "transportId" DROP NOT NULL,
ALTER COLUMN "bookedPackageId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "booked_hotel" ALTER COLUMN "roomId" DROP NOT NULL,
ALTER COLUMN "roomCheckInDate" DROP NOT NULL,
ALTER COLUMN "roomCheckOutDate" DROP NOT NULL,
ALTER COLUMN "transportReservationEndDate" DROP NOT NULL,
ALTER COLUMN "transportReservationStartDate" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "booked_hotel" ADD CONSTRAINT "booked_hotel_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransportBooked" ADD CONSTRAINT "TransportBooked_transportId_fkey" FOREIGN KEY ("transportId") REFERENCES "transports"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransportBooked" ADD CONSTRAINT "TransportBooked_bookedPackageId_fkey" FOREIGN KEY ("bookedPackageId") REFERENCES "booked_hotel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
