import { Bot } from 'bot';

import { CustomStrategy_01 } from './configs';

export const runBot = async () => {
  const bot = new Bot(CustomStrategy_01);

  await bot.initialize();
  bot.start();
};
