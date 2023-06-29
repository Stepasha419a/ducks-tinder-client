/*
  Warnings:

  - You are about to drop the column `userId` on the `places` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "places" DROP CONSTRAINT "places_userId_fkey";

-- AlterTable
ALTER TABLE "places" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
