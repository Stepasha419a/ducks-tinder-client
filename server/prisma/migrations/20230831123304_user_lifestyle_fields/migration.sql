-- AlterTable
ALTER TABLE "users" ADD COLUMN     "alcoholAttitudeId" TEXT,
ADD COLUMN     "chronotypeId" TEXT,
ADD COLUMN     "foodPreferenceId" TEXT,
ADD COLUMN     "petId" TEXT,
ADD COLUMN     "smokingAttitudeId" TEXT,
ADD COLUMN     "socialNetworksActivityId" TEXT,
ADD COLUMN     "trainingAttitudeId" TEXT;

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alcohol-attitudes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "alcohol-attitudes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "smoking-attitudes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "smoking-attitudes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training-attitudes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "training-attitudes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food-preferences" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "food-preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social-networks-activities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "social-networks-activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chronotypes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "chronotypes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pets_name_key" ON "pets"("name");

-- CreateIndex
CREATE UNIQUE INDEX "alcohol-attitudes_name_key" ON "alcohol-attitudes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "smoking-attitudes_name_key" ON "smoking-attitudes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "training-attitudes_name_key" ON "training-attitudes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "food-preferences_name_key" ON "food-preferences"("name");

-- CreateIndex
CREATE UNIQUE INDEX "social-networks-activities_name_key" ON "social-networks-activities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "chronotypes_name_key" ON "chronotypes"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_alcoholAttitudeId_fkey" FOREIGN KEY ("alcoholAttitudeId") REFERENCES "alcohol-attitudes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_smokingAttitudeId_fkey" FOREIGN KEY ("smokingAttitudeId") REFERENCES "smoking-attitudes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_trainingAttitudeId_fkey" FOREIGN KEY ("trainingAttitudeId") REFERENCES "training-attitudes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_foodPreferenceId_fkey" FOREIGN KEY ("foodPreferenceId") REFERENCES "food-preferences"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_socialNetworksActivityId_fkey" FOREIGN KEY ("socialNetworksActivityId") REFERENCES "social-networks-activities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_chronotypeId_fkey" FOREIGN KEY ("chronotypeId") REFERENCES "chronotypes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
