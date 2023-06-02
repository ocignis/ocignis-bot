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

-- CreateIndex
CREATE UNIQUE INDEX "BotInstance_name_key" ON "BotInstance"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BacktestBotBacktestInstance_name_key" ON "BacktestBotBacktestInstance"("name");
