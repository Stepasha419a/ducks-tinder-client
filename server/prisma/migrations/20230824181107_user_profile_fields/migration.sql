-- AlterTable
ALTER TABLE "users" ADD COLUMN     "attentionSignsId" TEXT,
ADD COLUMN     "childrenAttitudeId" TEXT,
ADD COLUMN     "communicationStylesId" TEXT,
ADD COLUMN     "educationId" TEXT,
ADD COLUMN     "personalityTypeId" TEXT,
ADD COLUMN     "zodiacSignId" TEXT;

-- CreateTable
CREATE TABLE "zodiac-signs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "zodiac-signs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "educations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "children-attitudes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "children-attitudes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personality-types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "personality-types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "communication-styles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "communication-styles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attention-signs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "attention-signs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "zodiac-signs_name_key" ON "zodiac-signs"("name");

-- CreateIndex
CREATE UNIQUE INDEX "educations_name_key" ON "educations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "children-attitudes_name_key" ON "children-attitudes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "personality-types_name_key" ON "personality-types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "communication-styles_name_key" ON "communication-styles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "attention-signs_name_key" ON "attention-signs"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_zodiacSignId_fkey" FOREIGN KEY ("zodiacSignId") REFERENCES "zodiac-signs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_educationId_fkey" FOREIGN KEY ("educationId") REFERENCES "educations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_childrenAttitudeId_fkey" FOREIGN KEY ("childrenAttitudeId") REFERENCES "children-attitudes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_personalityTypeId_fkey" FOREIGN KEY ("personalityTypeId") REFERENCES "personality-types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_communicationStylesId_fkey" FOREIGN KEY ("communicationStylesId") REFERENCES "communication-styles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_attentionSignsId_fkey" FOREIGN KEY ("attentionSignsId") REFERENCES "attention-signs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
