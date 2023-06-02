import { SymbolPair } from 'bot/common/types';

import { BASE_PATH_DATASET_TRADES } from '../../consts';

import { getFolderItemsInfo } from './getFolderItemsInfo';

export type BinanceFilesDataInfo = ReadonlyArray<{
  symbolPair: SymbolPair;
  filesInfo: ReadonlyArray<{ filePath: string; fileName: string }>;
}>;

type GetBinanceFilesDataInfoReturn = BinanceFilesDataInfo;

export const getBinanceFilesDataInfo = async (): Promise<GetBinanceFilesDataInfoReturn> => {
  const symbolPairFoldersInfo = await getFolderItemsInfo({
    basePath: BASE_PATH_DATASET_TRADES,
    filterItemType: 'folders',
  });

  const filesDataInfoPromises = symbolPairFoldersInfo.map(async (symbolPairFolderInfo) => {
    const symbolPairFilesInfo = await getFolderItemsInfo({
      basePath: symbolPairFolderInfo.itemPath,
      filterItemType: 'files',
    });

    return {
      symbolPair: symbolPairFolderInfo.itemName as SymbolPair,
      filesInfo: symbolPairFilesInfo.map((symbolPairFileInfo) => ({
        filePath: symbolPairFileInfo.itemPath,
        fileName: symbolPairFileInfo.itemName,
      })),
    } satisfies GetBinanceFilesDataInfoReturn[number];
  });

  const filesDataInfo = await Promise.all(filesDataInfoPromises);

  return filesDataInfo;
};
