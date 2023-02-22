import { SymbolCoin } from './SymbolCoin';

// List of supported assets (Symbols) and trading pairs (SymbolPairs) - https://support.binance.us/hc/en-us/articles/360049417674-List-of-Supported-Assets

export const SYMBOL_PAIRS = [
  // Available also on paper testing - Start
  'BTCBUSD',
  // 'ETHBUSD',
  // Available also on paper testing - End
  // 'SOLBUSD',
  'AVAXBUSD',
  'MATICBUSD',
] as const satisfies ReadonlyArray<`${SymbolCoin}${SymbolCoin}`>;

export type SymbolPair = (typeof SYMBOL_PAIRS)[number];
export type SymbolPairs = ReadonlyArray<SymbolPair>;
