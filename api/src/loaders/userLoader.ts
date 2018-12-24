import * as DataLoader from 'dataloader';
import { User } from '../entities/User';

const batchGetUser = (ids: string[]) => {
  return User.findByIds(ids);
};

export const createUserLoader = () =>
  new DataLoader((ids: string[]) => batchGetUser(ids));
