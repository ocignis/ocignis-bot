const SYMBOL_COINS = ['BUSD', 'USDT', 'BTC', 'ETH', 'SOL', 'AVAX', 'MATIC'] as const;

export type SymbolCoin = (typeof SYMBOL_COINS)[number];
export type SymbolCoins = ReadonlyArray<SymbolCoin>;
