/*
  Warnings:

  - You are about to drop the column `confirmdCode` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "confirmdCode",
ADD COLUMN     "confirmedCode" TEXT;
