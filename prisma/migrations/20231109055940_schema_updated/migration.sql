/*
  Warnings:

  - Added the required column `totalCost` to the `booked_package` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Pending', 'Success');

-- AlterTable
ALTER TABLE "booked_package" ADD COLUMN     "payment" "PaymentStatus" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "totalCost" INTEGER NOT NULL,
ADD COLUMN     "transictionId" TEXT;
