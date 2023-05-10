/*
  Warnings:

  - Added the required column `userId` to the `pictures` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pictures" DROP CONSTRAINT "pictures_id_fkey";

-- AlterTable
ALTER TABLE "pictures" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pictures" ADD CONSTRAINT "pictures_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
