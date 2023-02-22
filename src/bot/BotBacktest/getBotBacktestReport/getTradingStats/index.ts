/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { mean } from 'mathjs';

import { PositionClosed } from 'bot/common/types';

type GetTradingStatsParams = {
  positionsClosed: ReadonlyArray<PositionClosed>;
  fee: number;
  numOfTrades: number;
};

export const getTradingStats = ({ positionsClosed, fee, numOfTrades }: GetTradingStatsParams) => {
  const numOfPositionsClosed = positionsClosed.length;

  const positionsClosedWithProfit = positionsClosed.filter((positionClosed) => positionClosed.roiRelative >= 0);
  const positionsClosedWithLoss = positionsClosed.filter((positionClosed) => positionClosed.roiRelative < 0);

  return {
    fee: `${fee}%`,
    numOfPositionsClosed,
    numOfTrades,
    numOfPositionsClosedWithProfit: positionsClosedWithProfit.length,
    numOfPositionsClosedWithLoss: positionsClosedWithLoss.length,
    positionsClosedSuccessRatio:
      numOfPositionsClosed > 0 ? `${((positionsClosedWithProfit.length * 100) / numOfPositionsClosed).toFixed(2)}%` : 0,
    positionsClosedMeanProfit: positionsClosedWithProfit.length
      ? `${mean(
          positionsClosedWithProfit.map((positionClosedWithProfit) => positionClosedWithProfit.roiRelative),
        ).toFixed(2)}$`
      : 0,
    positionsClosedMeanLoss: positionsClosedWithLoss.length
      ? `${mean(positionsClosedWithLoss.map((positionClosedWithLoss) => positionClosedWithLoss.roiRelative)).toFixed(
          2,
        )}$`
      : 0,
  } as const;
};
