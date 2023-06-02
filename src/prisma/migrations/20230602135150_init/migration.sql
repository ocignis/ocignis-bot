-- CreateTable
CREATE TABLE "BotInstance" (
    "name" TEXT NOT NULL,
    "symbolPair" TEXT NOT NULL,
    "botInstance" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "BacktestBotBacktestInstance" (
    "name" TEXT NOT NULL,
    "symbolPair" TEXT NOT NULL,
    "botBacktestInstance" JSONB NOT NULL
);

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
CREATE UNIQUE INDEX "BotInstance_name_key" ON "BotInstance"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BacktestBotBacktestInstance_name_key" ON "BacktestBotBacktestInstance"("name");

-- CreateIndex
CREATE INDEX "BacktestHistoricTrade_symbolPair_time_idx" ON "BacktestHistoricTrade"("symbolPair", "time");

-- CreateIndex
CREATE UNIQUE INDEX "BacktestHistoricTradeImportedFileData_name_key" ON "BacktestHistoricTradeImportedFileData"("name");
