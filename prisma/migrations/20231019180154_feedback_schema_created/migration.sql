/*
  Warnings:

  - Added the required column `userId` to the `FeedbackForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FeedbackForm" ADD COLUMN     "userId" TEXT NOT NULL;
