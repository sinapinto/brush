import {
  ForbiddenError,
  AuthenticationError,
  UserInputError,
} from 'apollo-server-express';
import * as bcrypt from 'bcrypt';
import { getConnection, Not } from 'typeorm';
import { validate } from 'class-validator';
import { Post } from './entities/Post';
import { User } from './entities/User';
import { Category } from './entities/Category';
import { paginateResults, IResolver } from './utils';
import {
  CreatePostInput,
  EditProfileInput,
} from '../../__generated__/globalTypes';

export const resolvers: IResolver = {
  Query: {
    currentUser: async (_, __, { res, session }) => {
      if (!session.userId) {
        return new AuthenticationError('Not logged in');
      }
      const user = await User.findOne(session.userId);
      if (!user) {
        await new Promise(resolve => session.destroy(resolve));
        res.clearCookie('sid');
        return new UserInputError(`No user found with id ${session.userId}`);
      }
      return user;
    },

    user: async (_, { username }) => {
      return User.findOne({ where: { username } });
    },

    getPost: async (_, { id }) => {
      return Post.findOne(id, { relations: ['categories'] });
    },

    getPosts: async (
      _,
      { pageSize, cursor }: { pageSize: number; cursor: string }
    ): Promise<{
      posts: Array<Post>;
      cursor: string | null;
      hasMore: boolean;
    }> => {
      const allPosts = await Post.find({
        order: { createdAt: 'DESC' },
        relations: ['categories'],
      });
      const posts = paginateResults({
        results: allPosts,
        pageSize: pageSize || 20,
        cursor,
      });
      return {
        posts,
        cursor: posts.length ? posts[posts.length - 1].cursor : null,
        hasMore: posts.length
          ? posts[posts.length - 1].cursor !==
            allPosts[allPosts.length - 1].cursor
          : false,
      };
    },

    search: async (_, { query }: { query: string }) => {
      const posts = await Post.createQueryBuilder('post')
        .where('post.title ILIKE :query', { query: `%${query}%` })
        .orWhere('post.rawBody ILIKE :query', { query: `%${query}%` })
        .leftJoinAndSelect('post.categories', 'categories')
        .getMany();
      const users = await User.createQueryBuilder('user')
        .where('user.username ILIKE :query', { query: `%${query}%` })
        .getMany();
      const results = posts.concat(users as any);
      return {
        results,
      };
    },
  },

  Mutation: {
    login: async (_, { username, password }, { session }) => {
      const user = await User.findOne({ where: { username } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return new UserInputError('Wrong username or password');
      }
      session.userId = user.id;
      return user;
    },

    logout: async (_, __, { res, session }) => {
      const destroySession = new Promise(resolve => session.destroy(resolve));
      await destroySession;
      res.clearCookie('sid');
      return true;
    },

    register: async (_, args, { session }) => {
      const user = User.create(args);
      const errors = await validate(user);
      if (errors.length > 0) {
        console.log('errors: ', errors);
        // TODO: better error message...
        return new UserInputError('Invalid username or password');
      }
      const userAlreadyExists = await User.findOne({
        where: { username: user.username },
        select: ['id'],
      });
      if (userAlreadyExists) {
        return new UserInputError('Username already taken');
      }
      await User.save(user);
      session.userId = user.id;
      return user;
    },

    createPost: async (_, args: { input: CreatePostInput }, { session }) => {
      if (!session.userId) {
        return new AuthenticationError('Not logged in');
      }
      return getConnection().transaction(async manager => {
        const postEntity = manager.create(Post, args.input);

        const user = await manager.findOne(User, session.userId);
        if (!user) {
          return new UserInputError('User not found');
        }
        postEntity.author = user;
        postEntity.categories = [];

        const post = await manager.save(Post, postEntity);

        const categories = await manager.save(
          Category,
          args.input.categories.map(name => ({ name }))
        );

        await manager
          .createQueryBuilder()
          .relation(Post, 'categories')
          .of(post)
          .add(categories);

        return manager.findOne(Post, post.id, {
          relations: ['author', 'categories'],
        });
      });
    },

    deletePost: async (_, { id }, { session }) => {
      if (!session.userId) {
        return new AuthenticationError('Not logged in');
      }
      const post = await Post.findOne(id);
      if (!post) {
        return new UserInputError('Post not found');
      }
      if (post.authorId !== session.userId) {
        return new ForbiddenError('You are not the author of this post');
      }
      await Post.delete(id);
      return true;
    },

    subscribeToUser: async (_, { id }, { session }) => {
      if (!session.userId) {
        return new AuthenticationError('Not logged in');
      }
      if (id === session.userId) {
        return new UserInputError('You cannot subscribe to yourself');
      }
      const user = await User.findOne(session.userId, {
        relations: ['subscriptions'],
      });
      const target = await User.findOne(id);
      if (!target || !user) {
        return new UserInputError('User not found');
      }
      user.subscriptions.push(target);
      console.log('new subs', user.subscriptions);
      await User.save(user);
      return target;
    },

    unsubscribeToUser: async (_, { id }, { session }) => {
      if (!session.userId) {
        return new AuthenticationError('Not logged in');
      }
      if (id === session.userId) {
        return new UserInputError('You cannot unsubscribe to yourself');
      }
      const user = await User.findOne(session.userId, {
        relations: ['subscriptions'],
      });
      const target = await User.findOne(id);
      if (!target || !user) {
        return new UserInputError('User not found');
      }
      user.subscriptions = user.subscriptions.filter(u => u.id !== target.id);
      await User.save(user);
      return target;
    },

    editProfile: async (_, args: { input: EditProfileInput }, { session }) => {
      if (!session.userId) {
        return new AuthenticationError('Not logged in');
      }
      const user = await User.findOne(session.userId);
      if (!user) {
        return new UserInputError('User not found');
      }
      user.username = args.input.username;
      user.bio = args.input.bio;

      const errors = await validate(user);
      if (errors.length > 0) {
        console.log('errors: ', errors);
        // TODO: better error message...
        return new UserInputError('Invalid username');
      }
      const userAlreadyExists = await User.findOne({
        where: { username: user.username, id: Not(user.id) },
        select: ['id'],
      });
      if (userAlreadyExists) {
        return new UserInputError('Username already taken');
      }
      await User.save(user);
      return user;
    },
  },

  User: {
    posts: async user => {
      const u = await User.findOne(user.id, {
        join: {
          alias: 'user',
          leftJoinAndSelect: {
            posts: 'user.posts',
            categories: 'posts.categories',
          },
        },
      });
      return u!.posts;
    },

    subscriptions: async user => {
      const u = await User.findOne(user.id, { relations: ['subscriptions'] });
      return u!.subscriptions;
    },

    subscribers: async user => {
      const u = await User.findOne(user.id, { relations: ['subscribers'] });
      return u!.subscribers;
    },

    subscribed: async (user, _, { session }) => {
      if (!session.userId) return false;
      const me = await User.findOne(session.userId, {
        relations: ['subscriptions'],
      });
      return me!.subscriptions.some(s => s.id === user.id);
    },

    isSubscriber: async (user, _, { session }) => {
      if (!session.userId) return false;
      const me = await User.findOne(session.userId, {
        relations: ['subscribers'],
      });
      return me!.subscribers.some(s => s.id === user.id);
    },
  },

  Post: {
    author: async (post, _, { userLoader }) => {
      return userLoader.load(post.authorId);
    },
  },

  SearchResult: {
    __resolveType: obj => {
      if (obj instanceof User) {
        return 'User';
      }
      if (obj instanceof Post) {
        return 'Post';
      }
      return null;
    },
  },
};
