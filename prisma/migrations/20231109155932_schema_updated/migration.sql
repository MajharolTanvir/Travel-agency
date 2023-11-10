/*
  Warnings:

  - You are about to drop the column `transictionId` on the `booked_package` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "booked_package" DROP COLUMN "transictionId",
ADD COLUMN     "transactionId" TEXT;
