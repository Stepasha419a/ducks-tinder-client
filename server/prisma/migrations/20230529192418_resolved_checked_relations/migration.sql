/*
  Warnings:

  - You are about to drop the `checked-users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "checked-users" DROP CONSTRAINT "checked-users_checkedUserId_fkey";

-- DropForeignKey
ALTER TABLE "checked-users" DROP CONSTRAINT "checked-users_userId_fkey";

-- DropTable
DROP TABLE "checked-users";

-- CreateTable
CREATE TABLE "_Checked" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Checked_AB_unique" ON "_Checked"("A", "B");

-- CreateIndex
CREATE INDEX "_Checked_B_index" ON "_Checked"("B");

-- AddForeignKey
ALTER TABLE "_Checked" ADD CONSTRAINT "_Checked_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Checked" ADD CONSTRAINT "_Checked_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
