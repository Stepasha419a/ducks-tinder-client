-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "repliedId" TEXT;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_repliedId_fkey" FOREIGN KEY ("repliedId") REFERENCES "messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
