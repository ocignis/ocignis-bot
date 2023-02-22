import { router } from '../..';

import { commandsRouter } from './commands';
import { instancesRouter } from './instances';

export const botRouter = router({
  commands: commandsRouter,
  instances: instancesRouter,
});
