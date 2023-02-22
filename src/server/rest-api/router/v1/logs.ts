import { Router } from 'express';

import { show, destroy, triggerAll } from 'server/rest-api/controllers/logs';

export const routerLogs = Router();

routerLogs.get('/select/:logType/:logDate?', show);
routerLogs.delete('/', destroy);
routerLogs.get('/trigger-all', triggerAll);
