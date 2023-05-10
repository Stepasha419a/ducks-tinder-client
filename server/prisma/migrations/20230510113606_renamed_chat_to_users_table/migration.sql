/*
  Warnings:

  - You are about to drop the `ChatToUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChatToUsers" DROP CONSTRAINT "ChatToUsers_chatId_fkey";

-- DropForeignKey
ALTER TABLE "ChatToUsers" DROP CONSTRAINT "ChatToUsers_userId_fkey";

-- DropTable
DROP TABLE "ChatToUsers";

-- CreateTable
CREATE TABLE "chat-to-users" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,

    CONSTRAINT "chat-to-users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "chat-to-users" ADD CONSTRAINT "chat-to-users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat-to-users" ADD CONSTRAINT "chat-to-users_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
