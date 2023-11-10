/*
  Warnings:

  - The `transactionId` column on the `booked_package` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "booked_package" DROP COLUMN "transactionId",
ADD COLUMN     "transactionId" INTEGER;
