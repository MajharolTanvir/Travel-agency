/*
  Warnings:

  - You are about to drop the column `byAirTranspoartId` on the `AddToCartFields` table. All the data in the column will be lost.
  - You are about to drop the column `byBoatTranspoartId` on the `AddToCartFields` table. All the data in the column will be lost.
  - You are about to drop the column `byRoadTranspoartId` on the `AddToCartFields` table. All the data in the column will be lost.
  - Added the required column `byAirTransportId` to the `AddToCartFields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `byBoatTransportId` to the `AddToCartFields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `byRoadTransportId` to the `AddToCartFields` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AddToCartFields" DROP COLUMN "byAirTranspoartId",
DROP COLUMN "byBoatTranspoartId",
DROP COLUMN "byRoadTranspoartId",
ADD COLUMN     "byAirTransportId" TEXT NOT NULL,
ADD COLUMN     "byBoatTransportId" TEXT NOT NULL,
ADD COLUMN     "byRoadTransportId" TEXT NOT NULL;
