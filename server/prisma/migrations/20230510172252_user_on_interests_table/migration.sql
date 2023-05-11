/*
  Warnings:

  - You are about to drop the `_InterestToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_InterestToUser" DROP CONSTRAINT "_InterestToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_InterestToUser" DROP CONSTRAINT "_InterestToUser_B_fkey";

-- DropTable
DROP TABLE "_InterestToUser";

-- CreateTable
CREATE TABLE "user-to-interests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "interestId" TEXT NOT NULL,

    CONSTRAINT "user-to-interests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user-to-interests" ADD CONSTRAINT "user-to-interests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user-to-interests" ADD CONSTRAINT "user-to-interests_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "interests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
