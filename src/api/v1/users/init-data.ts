import path from 'path';
import { nanoid } from 'nanoid';
import { promises as fs } from 'fs';

import logger from '../../../logger';
import { User } from './types';

export const generateUser = (props: Partial<User>): User => {
  const { rating = 1, name = 'John Doe' } = props;

  return {
    id: nanoid(8),
    rating,
    name,
  };
};

const initData = async (): Promise<void> => {
  const filePath = path.resolve(__dirname, 'data.json');
  const data: User[] = Array.from(Array(10).keys()).map((item) =>
    generateUser({
      rating: Math.floor(Math.random() * 4) + 1,
      name: `John Doe ${item}`,
    })
  );

  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (e) {
    logger.error(e);
  }
};

export default initData;
