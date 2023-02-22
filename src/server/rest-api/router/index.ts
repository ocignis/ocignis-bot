import { Router } from 'express';

import { router404, routerRoot } from './pages';
import { routerV1 } from './v1';

export const router = Router();

router.use(`/v1`, routerV1);

router.use(routerRoot);

router.use(router404);
