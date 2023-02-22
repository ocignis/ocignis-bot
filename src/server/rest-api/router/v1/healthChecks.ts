/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import { infoController } from 'server/rest-api/controllers/health-checks';

export const routerHealthChecks = Router();

routerHealthChecks.get('/info', infoController);
