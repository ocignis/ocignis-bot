/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import { infoController, bot_SMA_Controller } from 'server/rest-api/controllers/triggers';

export const routerTriggers = Router();

routerTriggers.get('/info', infoController);
routerTriggers.get('/bot-sma/:botCommand', bot_SMA_Controller);
