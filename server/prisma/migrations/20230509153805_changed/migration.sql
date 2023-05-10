/*
  Warnings:

  - You are about to drop the `CheckedUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CheckedUsers" DROP CONSTRAINT "CheckedUsers_checkedUserId_fkey";

-- DropForeignKey
ALTER TABLE "CheckedUsers" DROP CONSTRAINT "CheckedUsers_userId_fkey";

-- DropTable
DROP TABLE "CheckedUsers";

-- CreateTable
CREATE TABLE "checked-users" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "checkedUserId" TEXT NOT NULL,

    CONSTRAINT "checked-users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "checked-users" ADD CONSTRAINT "checked-users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checked-users" ADD CONSTRAINT "checked-users_checkedUserId_fkey" FOREIGN KEY ("checkedUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
