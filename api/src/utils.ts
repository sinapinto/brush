import * as express from 'express';
import * as DataLoader from 'dataloader';
import * as redis from 'ioredis';
import { User } from './entities/User';

export type TContext = {
  redis?: redis.Redis;
  // TODO: figure out how to use express.Session
  session: { userId?: string } & {
    id: string;
    regenerate(callback: (err: any) => void): void;
    destroy(callback: (err: any) => void): void;
    reload(callback: (err: any) => void): void;
    save(callback: (err: any) => void): void;
    touch(callback: (err: any) => void): void;
    cookie: {
      originalMaxAge: number;
      path: string;
      maxAge: number | null;
      secure?: boolean;
      httpOnly: boolean;
      domain?: string;
      expires: Date | boolean;
      sameSite?: boolean | string;
    };
  };
  res: express.Response;
  userLoader: DataLoader<string, User>;
};

export interface IResolver {
  [key: string]: {
    [key: string]: (
      parent: any,
      args: any,
      context: TContext,
      info: any
    ) => any;
  };
}

interface PaginateInput<T> {
  results: Array<T>;
  pageSize: number;
  cursor: string;
}

export const paginateResults = <T>({
  results,
  pageSize,
  cursor,
}: PaginateInput<T>): Array<T> => {
  if (pageSize < 1) return [];
  if (!cursor) return results.slice(0, pageSize);

  const cursorIndex = results.findIndex((item: any) => {
    return item.cursor ? cursor === item.cursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // avoid overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize)
        )
    : results.slice(0, pageSize);
};
