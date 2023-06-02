import fs from 'fs-extra';

import { BASE_PATH_DATASET_TRADES } from '../../consts';

export const initRootFolder = async (): Promise<void> => {
  await fs.emptyDir(BASE_PATH_DATASET_TRADES);

  await fs.outputFile(`${BASE_PATH_DATASET_TRADES}/.gitkeep`, '');
};
