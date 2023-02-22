import { calculateRoi } from 'bot/common/utils';

type GetBalanceParams = {
  backtestConfigBalance_BUSD: number;
  strategyBalance_BUSD: number;
};

export const getBalance = ({ backtestConfigBalance_BUSD, strategyBalance_BUSD }: GetBalanceParams) => {
  return {
    start: `${backtestConfigBalance_BUSD.toFixed(2)}$`,
    end: `${strategyBalance_BUSD.toFixed(2)}$`,
    change: {
      absolute: `${calculateRoi({
        startValue: backtestConfigBalance_BUSD,
        endValue: strategyBalance_BUSD,
      }).absolute.toFixed(2)}$`,
      relative: `${calculateRoi({
        startValue: backtestConfigBalance_BUSD,
        endValue: strategyBalance_BUSD,
      }).relative.toFixed(2)}%`,
    },
  } as const;
};
