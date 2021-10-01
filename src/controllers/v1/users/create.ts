import joiRouter from 'koa-joi-router';

import createUser from '../../../api/v1/users/create-user';
import { User } from '../../../api/v1/users/types';

const { Joi } = joiRouter;

const validator = {
  body: {
    rating: Joi.number().min(1).max(4).required(),
    name: Joi.string(),
  },
  type: 'json' as const,
  output: {
    200: {
      body: Joi.array().items(Joi.array()),
    },
  },
};

const handler: joiRouter.Handler = async (ctx, next) => {
  const { rating, name } = ctx.request.body as {
    rating: number;
    name: string;
  };

  const response: User = await createUser({ rating, name });

  ctx.body = response;
  ctx.status = 201;

  await next();
};

export default {
  validator,
  handler,
};
