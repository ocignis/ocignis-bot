-- CreateTable
CREATE TABLE "BacktestHistoricTrade" (
    "id" TEXT NOT NULL,
    "symbolPair" TEXT NOT NULL,
    "time" BIGINT NOT NULL,
    "price" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,

    CONSTRAINT "BacktestHistoricTrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BacktestHistoricTradeImportedFileData" (
    "name" TEXT NOT NULL,
    "processingTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "BacktestHistoricTrade_symbolPair_time_idx" ON "BacktestHistoricTrade"("symbolPair", "time");

-- CreateIndex
CREATE UNIQUE INDEX "BacktestHistoricTradeImportedFileData_name_key" ON "BacktestHistoricTradeImportedFileData"("name");
