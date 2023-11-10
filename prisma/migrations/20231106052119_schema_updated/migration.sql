/*
  Warnings:

  - The values [Panding] on the enum `Confirmation` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `bookingCost` to the `package_plans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Confirmation_new" AS ENUM ('Pending', 'Confirmed', 'Canceled', 'Completed');
ALTER TABLE "package_plans" ALTER COLUMN "planStatus" DROP DEFAULT;
ALTER TABLE "booked_hotel" ALTER COLUMN "roomConfirmation" DROP DEFAULT;
ALTER TABLE "package_plans" ALTER COLUMN "planStatus" TYPE "Confirmation_new" USING ("planStatus"::text::"Confirmation_new");
ALTER TABLE "booked_hotel" ALTER COLUMN "roomConfirmation" TYPE "Confirmation_new" USING ("roomConfirmation"::text::"Confirmation_new");
ALTER TYPE "Confirmation" RENAME TO "Confirmation_old";
ALTER TYPE "Confirmation_new" RENAME TO "Confirmation";
DROP TYPE "Confirmation_old";
ALTER TABLE "package_plans" ALTER COLUMN "planStatus" SET DEFAULT 'Pending';
ALTER TABLE "booked_hotel" ALTER COLUMN "roomConfirmation" SET DEFAULT 'Pending';
COMMIT;

-- AlterTable
ALTER TABLE "booked_hotel" ALTER COLUMN "roomConfirmation" SET DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "package_plans" ADD COLUMN     "bookingCost" INTEGER NOT NULL,
ALTER COLUMN "planStatus" SET DEFAULT 'Pending';

-- AddForeignKey
ALTER TABLE "feedback_form" ADD CONSTRAINT "feedback_form_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
