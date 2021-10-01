import path from 'path';
import { promises as fs } from 'fs';

import logger from '../../../logger';
import { User } from './types';
import { generateUser } from './init-data';

const createUser = async (props: Omit<User, 'id'>): Promise<User> => {
  const filePath = path.resolve(__dirname, 'data.json');
  const newUser = generateUser(props);

  try {
    const usersBuffer = await fs.readFile(filePath);
    const users: User[] = JSON.parse(usersBuffer.toString()) as User[];
    users.push(newUser);
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
  } catch (e) {
    logger.error(e);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(newUser);
    }, 1000);
  });
};

export default createUser;
