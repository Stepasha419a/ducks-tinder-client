/*
  Warnings:

  - The primary key for the `chat-visit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `chat-visit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "chat-visit" DROP CONSTRAINT "chat-visit_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "chat-visit_pkey" PRIMARY KEY ("userId", "chatId");
