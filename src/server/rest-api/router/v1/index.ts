import { Router } from 'express';

import { routerHealthChecks } from './healthChecks';
import { routerLogs } from './logs';
import { routerTriggers } from './triggers';

export const routerV1 = Router();

routerV1.use('/health-checks', routerHealthChecks);
routerV1.use('/logs', routerLogs);
routerV1.use('/triggers', routerTriggers);
