/*
  Warnings:

  - You are about to drop the `pairs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pairs" DROP CONSTRAINT "pairs_userId_fkey";

-- DropForeignKey
ALTER TABLE "pairs" DROP CONSTRAINT "pairs_userPairId_fkey";

-- DropTable
DROP TABLE "pairs";

-- CreateTable
CREATE TABLE "_Pairs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Pairs_AB_unique" ON "_Pairs"("A", "B");

-- CreateIndex
CREATE INDEX "_Pairs_B_index" ON "_Pairs"("B");

-- AddForeignKey
ALTER TABLE "_Pairs" ADD CONSTRAINT "_Pairs_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Pairs" ADD CONSTRAINT "_Pairs_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
