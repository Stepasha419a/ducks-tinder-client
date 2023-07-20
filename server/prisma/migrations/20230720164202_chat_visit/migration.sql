-- CreateTable
CREATE TABLE "chat-visit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "lastSeen" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat-visit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "chat-visit" ADD CONSTRAINT "chat-visit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat-visit" ADD CONSTRAINT "chat-visit_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
