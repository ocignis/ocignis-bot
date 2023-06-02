import fs from 'fs-extra';

type GetFolderItemsInfoParams = { basePath: string; filterItemType: 'folders' | 'files' };
type GetFolderItemsInfoReturn = ReadonlyArray<{ itemPath: string; itemName: string }>;

export const getFolderItemsInfo = async ({
  basePath,
  filterItemType,
}: GetFolderItemsInfoParams): Promise<GetFolderItemsInfoReturn> => {
  const folderItems = await fs.readdir(basePath, { withFileTypes: true });

  const folderItemsInfo = folderItems
    .filter((spotMonthlyTradesFolderContent) =>
      filterItemType === 'folders'
        ? spotMonthlyTradesFolderContent.isDirectory()
        : spotMonthlyTradesFolderContent.isFile(),
    )
    .map((spotMonthlyTradesFolder) => ({
      itemPath: `${basePath}/${spotMonthlyTradesFolder.name}`,
      itemName: spotMonthlyTradesFolder.name,
    }));

  return folderItemsInfo;
};
