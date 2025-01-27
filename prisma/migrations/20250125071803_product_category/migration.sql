/*
  Warnings:

  - Added the required column `gender` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "gender" "Gender" NOT NULL;

-- CreateIndex
CREATE INDEX "Product_gender_idx" ON "Product"("gender");
