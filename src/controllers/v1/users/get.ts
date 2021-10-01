import joiRouter from 'koa-joi-router';

import getUsers from '../../../api/v1/users/get-users';
import { User } from '../../../api/v1/users/types';
import logger from '../../../logger';

const { Joi } = joiRouter;

const validator = {
  query: {
    rating: Joi.string(),
    name: Joi.string(),
  },
  output: {
    200: {
      body: Joi.array().items(Joi.object()),
    },
  },
};

const handler: joiRouter.Handler = async (ctx) => {
  const { rating, name } = ctx.request.query as {
    rating?: string;
    name?: string;
  };

  const response: User[] = await getUsers();
  logger.info({ response });
  const filtered = rating;
  let filterdValues = response;

  if (filtered) {
    filterdValues = response
      .filter((item) => {
        if (!rating) {
          return true;
        }

        return item.rating.toString() === rating;
      })
      .filter((item) => {
        if (!name) {
          return true;
        }

        return item.name === name;
      });
  }

  ctx.body = filterdValues;
  ctx.status = 200;
};

export default {
  validator,
  handler,
};
