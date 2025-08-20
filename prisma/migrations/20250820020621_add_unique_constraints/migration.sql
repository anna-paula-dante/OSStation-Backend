/*
  Warnings:

  - A unique constraint covering the columns `[userId,fileOrderId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId,fileProductId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Order_userId_fileOrderId_key" ON "Order"("userId", "fileOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_orderId_fileProductId_key" ON "Product"("orderId", "fileProductId");
