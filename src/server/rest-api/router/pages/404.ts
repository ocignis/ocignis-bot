import { Router } from 'express';

export const router404 = Router();

router404.get('*', (_req, res) => {
  return res.status(404).json({ error: '404 - Endpoint Not Found' });
});
