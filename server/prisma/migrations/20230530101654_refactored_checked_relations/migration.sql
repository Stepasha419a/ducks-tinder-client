/*
  Warnings:

  - You are about to drop the `_Checked` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Checked" DROP CONSTRAINT "_Checked_A_fkey";

-- DropForeignKey
ALTER TABLE "_Checked" DROP CONSTRAINT "_Checked_B_fkey";

-- DropTable
DROP TABLE "_Checked";

-- CreateTable
CREATE TABLE "checked-users" (
    "checkedId" TEXT NOT NULL,
    "wasCheckedId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checked-users_pkey" PRIMARY KEY ("checkedId","wasCheckedId")
);

-- AddForeignKey
ALTER TABLE "checked-users" ADD CONSTRAINT "checked-users_checkedId_fkey" FOREIGN KEY ("checkedId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checked-users" ADD CONSTRAINT "checked-users_wasCheckedId_fkey" FOREIGN KEY ("wasCheckedId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
