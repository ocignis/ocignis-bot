import { SymbolPair } from 'bot/common/types';
import prisma from 'prisma/prismaClient';

import { BinanceFilesDataInfo } from '../getBinanceFilesDataInfo';

export type RemoveAlreadyImportedBinanceFilesDataReturn = ReadonlyArray<{
  symbolPair: SymbolPair;
  filesInfo: ReadonlyArray<{ filePath: string; fileName: string }>;
}>;

export const removeAlreadyImportedBinanceFilesData = async (
  binanceFilesDataInfo: BinanceFilesDataInfo,
): Promise<BinanceFilesDataInfo> => {
  const existingBinanceFileDataNamesDBResult = await prisma.backtestHistoricTradeImportedFileData.findMany({
    select: {
      name: true,
    },
  });

  const existingBinanceFileDataNames = existingBinanceFileDataNamesDBResult.map(
    (existingBinanceFileDataNameDBResult) => existingBinanceFileDataNameDBResult.name,
  );

  const newlyRequestedFilesDataInfo = binanceFilesDataInfo.map((binanceFilesDataInfo) => {
    const filesInfoFiltered = binanceFilesDataInfo.filesInfo.filter(
      (fileInfo) => !existingBinanceFileDataNames.includes(fileInfo.fileName),
    );

    return { ...binanceFilesDataInfo, filesInfo: filesInfoFiltered } satisfies BinanceFilesDataInfo[number];
  });

  return newlyRequestedFilesDataInfo;
};
