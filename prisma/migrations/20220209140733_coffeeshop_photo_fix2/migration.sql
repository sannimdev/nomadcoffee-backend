/*
  Warnings:

  - You are about to drop the `_CoffeeShopToCoffeeShopPhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CoffeeShopToCoffeeShopPhoto" DROP CONSTRAINT "_CoffeeShopToCoffeeShopPhoto_A_fkey";

-- DropForeignKey
ALTER TABLE "_CoffeeShopToCoffeeShopPhoto" DROP CONSTRAINT "_CoffeeShopToCoffeeShopPhoto_B_fkey";

-- DropTable
DROP TABLE "_CoffeeShopToCoffeeShopPhoto";

-- AddForeignKey
ALTER TABLE "CoffeeShopPhoto" ADD CONSTRAINT "CoffeeShopPhoto_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "CoffeeShop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
