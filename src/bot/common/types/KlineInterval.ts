import { KlineInterval as KlineIntervalBinance } from 'binance';

export const KLINE_INTERVALS = [
  '1s',
  '1m',
  // '3m',
  // '5m',
  // '15m',
  // '30m',
  '1h',
  // '2h',
  // '4h',
  // '6h',
  // '8h',
  // '12h',
  '1d',
  // '3d',
  '1w',
  '1M',
] as const satisfies ReadonlyArray<KlineIntervalBinance>;

/**
 * Supported kline intervals.
 */
export type KlineInterval = (typeof KLINE_INTERVALS)[number];
