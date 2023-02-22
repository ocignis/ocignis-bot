import { router } from '../..';

import { commandsRouter } from './commands';
import { instancesRouter } from './instances';

export const botBacktestRouter = router({
  commands: commandsRouter,
  instances: instancesRouter,
});
