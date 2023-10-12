/*
  Warnings:

  - The primary key for the `RoomFacilities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `air_conditioning` on the `RoomFacilities` table. All the data in the column will be lost.
  - You are about to drop the column `beachFront` on the `RoomFacilities` table. All the data in the column will be lost.
  - You are about to drop the column `fitness_Center` on the `RoomFacilities` table. All the data in the column will be lost.
  - You are about to drop the column `free_breakfast` on the `RoomFacilities` table. All the data in the column will be lost.
  - You are about to drop the column `free_parking` on the `RoomFacilities` table. All the data in the column will be lost.
  - You are about to drop the column `garden` on the `RoomFacilities` table. All the data in the column will be lost.
  - You are about to drop the column `hot_Tub` on the `RoomFacilities` table. All the data in the column will be lost.
  - You are about to drop the column `mountain_View` on the `RoomFacilities` table. All the data in the column will be lost.
  - You are about to drop the column `no_smoking_room` on the `RoomFacilities` table. All the data in the column will be lost.
  - You are about to drop the column `private_bathroom` on the `RoomFacilities` table. All the data in the column will be lost.
  - You are about to drop the column `resturant` on the `RoomFacilities` table. All the data in the column will be lost.
  - You are about to drop the column `room_service` on the `RoomFacilities` table. All the data in the column will be lost.
  - You are about to drop the column `see_view` on the `RoomFacilities` table. All the data in the column will be lost.
  - You are about to drop the column `shower` on the `RoomFacilities` table. All the data in the column will be lost.
  - You are about to drop the column `spa_and_wellness_center` on the `RoomFacilities` table. All the data in the column will be lost.
  - You are about to drop the column `swimming_pool` on the `RoomFacilities` table. All the data in the column will be lost.
  - You are about to drop the column `television` on the `RoomFacilities` table. All the data in the column will be lost.
  - You are about to drop the column `wifi` on the `RoomFacilities` table. All the data in the column will be lost.
  - Added the required column `FacilitiesOptionsId` to the `RoomFacilities` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `RoomFacilities` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `RoomFacilities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoomFacilities" DROP CONSTRAINT "RoomFacilities_pkey",
DROP COLUMN "air_conditioning",
DROP COLUMN "beachFront",
DROP COLUMN "fitness_Center",
DROP COLUMN "free_breakfast",
DROP COLUMN "free_parking",
DROP COLUMN "garden",
DROP COLUMN "hot_Tub",
DROP COLUMN "mountain_View",
DROP COLUMN "no_smoking_room",
DROP COLUMN "private_bathroom",
DROP COLUMN "resturant",
DROP COLUMN "room_service",
DROP COLUMN "see_view",
DROP COLUMN "shower",
DROP COLUMN "spa_and_wellness_center",
DROP COLUMN "swimming_pool",
DROP COLUMN "television",
DROP COLUMN "wifi",
ADD COLUMN     "FacilitiesOptionsId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "RoomFacilities_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "FacilitiesOptions" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FacilitiesOptions_pkey" PRIMARY KEY ("id")
);
