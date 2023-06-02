import * as fs from 'fs';

import { parse } from 'fast-csv';

export type TradeRowCsv = [string, string, string, string, string, string, string];
type TradeRowsCsv = Array<TradeRowCsv>;

export const enum TradeRowCsvIndex {
  id,
  price,
  quantity,
  quoteQuantity,
  time,
  isBuyerMaker,
  isBestMatch,
}

type GetTradesFromCsvParams = {
  csvFilePath: string;
};

export const getTradesFromCsv = async ({ csvFilePath }: GetTradesFromCsvParams): Promise<TradeRowsCsv> => {
  const tradesFromCsv: TradeRowsCsv = [];

  const reader = fs.createReadStream(csvFilePath);

  const tradeRowsCsv = reader.pipe(parse({ headers: false })) as unknown as TradeRowsCsv;
  // .on('error', (error) => console.error(error))
  // .on('data', (tradeRowCsv: TradeRowCsv) => {
  //   console.log('🔎 Log ~ tradeRowCsv', tradeRowCsv);
  // })
  // .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`)) as unknown as TradeRowsCsv;

  for await (const tradeRowCsv of tradeRowsCsv) {
    tradesFromCsv.push(tradeRowCsv);
  }
  return tradesFromCsv;
};
