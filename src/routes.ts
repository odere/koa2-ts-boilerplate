import joiRouter from 'koa-joi-router';

import createUser from './controllers/v1/users/create';
import getUser from './controllers/v1/users/get';

const router = joiRouter();

router.get('/', (ctx) => {
  ctx.status = 401;
});

router.route({
  method: 'post',
  path: '/api/v1/users',
  validate: createUser.validator,
  handler: createUser.handler,
});

router.route({
  method: 'get',
  path: '/api/v1/users',
  validate: getUser.validator,
  handler: getUser.handler,
});

router.get('/health', (ctx) => {
  ctx.body = 'OK';
  ctx.status = 200;
});

export const routes = router.middleware();
