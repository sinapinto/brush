import * as DataLoader from 'dataloader';
import { User } from '../entities/User';

const batchGetUser = async (ids: string[]): Promise<User[]> => {
  const users = await User.findByIds(ids);
  const usersById: { [key: string]: User } = {};
  users.forEach(user => {
    usersById[user.id] = user;
  });
  return ids.map(id => usersById[id]);
};

export const createUserLoader = () =>
  new DataLoader<string, User>(ids => batchGetUser(ids));
