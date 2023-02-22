import { SymbolPair, Trade, Trades } from 'bot/common/types';
import { formatDateToUnix } from 'common/utils';
import prisma from 'prisma/prismaClient';

type GetTradesFromLocalParams = {
  symbolPair: SymbolPair;
  startTime: Date;
  endTime: Date;
};

export const getTradesFromLocal = async ({
  symbolPair,
  startTime,
  endTime,
}: GetTradesFromLocalParams): Promise<Trades> => {
  const dbTrades = await prisma.backtestHistoricTrade.findMany({
    select: {
      time: true,
      price: true,
      quantity: true,
    },
    where: {
      symbolPair,
      time: {
        gte: formatDateToUnix(startTime),
        lte: formatDateToUnix(endTime),
      },
    },
    orderBy: [
      {
        time: 'asc',
      },
    ],
  });

  const trades = dbTrades.map((dbTrade) => {
    const price = Number(dbTrade.price);
    const quantity = Number(dbTrade.quantity);

    return {
      time: Number(dbTrade.time),
      price,
      quantity,
      volume: price * quantity,
    } satisfies Trade;
  });

  return trades;
};
