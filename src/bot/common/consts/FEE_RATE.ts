/**
 * @description Fee per trade.
 * @link https://www.binance.com/en/fee/schedule
 */
export const FEE_RATE_TRADING = {
  noFee: 0,
  spotTrading_Limit: 0.09,
  spotTrading_Market: 0.1,
  usdmFuturesTrading_Limit: 0.012,
  usdmFuturesTrading_Market: 0.03,
  coinmFuturesTrading_Limit: 0.01,
  coinmFuturesTrading_Market: 0.05,
} as const;

export const FEE_RATE_BORROW = {
  marginBorrowDailyInterest: 0.03,
} as const;
