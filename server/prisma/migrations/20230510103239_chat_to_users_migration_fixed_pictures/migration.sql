/*
  Warnings:

  - You are about to drop the column `pictureTypeId` on the `pictures` table. All the data in the column will be lost.
  - You are about to drop the `_ChatToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `picture-types` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `order` to the `pictures` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ChatToUser" DROP CONSTRAINT "_ChatToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatToUser" DROP CONSTRAINT "_ChatToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "pictures" DROP CONSTRAINT "pictures_pictureTypeId_fkey";

-- AlterTable
ALTER TABLE "pictures" DROP COLUMN "pictureTypeId",
ADD COLUMN     "order" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ChatToUser";

-- DropTable
DROP TABLE "picture-types";

-- CreateTable
CREATE TABLE "ChatToUsers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,

    CONSTRAINT "ChatToUsers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChatToUsers" ADD CONSTRAINT "ChatToUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatToUsers" ADD CONSTRAINT "ChatToUsers_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
