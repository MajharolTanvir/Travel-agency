/*
  Warnings:

  - You are about to drop the column `checkoutDate` on the `BookedHotel` table. All the data in the column will be lost.
  - Added the required column `checkOutDate` to the `BookedHotel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookedHotel" DROP COLUMN "checkoutDate",
ADD COLUMN     "checkOutDate" TEXT NOT NULL;
