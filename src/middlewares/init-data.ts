import Koa from 'koa';
import path from 'path';
import { promises as fs, constants } from 'fs';

import logger from '../logger';
import initData from '../api/v1/users/init-data';

const errorHadler = (): Koa.Middleware => async (_ctx, next) => {
  try {
    const filePath = path.resolve(
      __dirname,
      '..',
      'api',
      'v1',
      'users',
      'data.json'
    );
    await fs.access(filePath, constants.R_OK);
  } catch {
    logger.info('Data initialised');
    await initData();
  }

  await next();
};

export default errorHadler;
