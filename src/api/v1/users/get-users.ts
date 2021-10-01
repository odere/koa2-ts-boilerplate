import path from 'path';
import { promises as fs } from 'fs';

import logger from '../../../logger';
import { User } from './types';

const getUsers = async (): Promise<User[]> => {
  const filePath = path.resolve(__dirname, 'data.json');
  let users: Buffer;

  try {
    users = await fs.readFile(filePath);
  } catch (e) {
    logger.error(e);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const result = JSON.parse(users.toString()) as User[];
      logger.info({ result });
      resolve(result);
    }, 1000);
  });
};

export default getUsers;
