/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Koa from 'koa';

import logger from '../logger';

const errorHadler = (): Koa.Middleware => async (_ctx, next) => {
  try {
    await next();
    // Catch statement should be any
  } catch (err) {
    logger.error(err);
    // @ts-ignore
    err.status = err.statusCode || err.status || 500;
    throw err;
  }
};

export default errorHadler;
