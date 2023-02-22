import { Router } from 'express';

import { getVersionInfo } from 'common/utils/version/getVersionInfo';

export const routerRoot = Router();

routerRoot.get('/', (_req, res) => {
  res.status(200).header('Content-Type', 'text/html').send(`
    <div>
      <h3>Ocignis Bot</h3>
      <br />
      <div style="color:dimgray; font-style: italic; font-size: 18px;">${getVersionInfo()}</div>
    </div>
    `);
});
