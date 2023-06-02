import prisma from 'prisma/prismaClient';

import { TradesTransformed } from './transformTradeRowCsv';

type DatabaseInsertBacktestHistoricTradesParams = { data: TradesTransformed };

export const databaseInsertBacktestHistoricTrades = async ({
  data,
}: DatabaseInsertBacktestHistoricTradesParams): Promise<{ numOfDbRowsInserted: number }> => {
  const createMany = await prisma.backtestHistoricTrade.createMany({ data });

  return { numOfDbRowsInserted: createMany.count };
};
