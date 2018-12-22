import { AuthenticationError, UserInputError } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import { Post } from './entity/Post';
import { User } from './entity/User';
import { IResolver } from './types/graphql';
import { paginateResults } from './utils';
import { CreatePostInput } from '../../__generated__/globalTypes';

export const resolvers: IResolver = {
  Query: {
    currentUser: async (_, __, { session }) => {
      const { userId } = session;
      if (!userId) {
        return new AuthenticationError('Not logged in');
      }
      const user = await User.findOne(userId);
      if (!user) {
        return new UserInputError(`No user found with id ${userId}`);
      }
      return user;
    },

    user: async (_, { username }) => {
      return User.findOne({ where: { username } });
    },

    getPost: async (_, { id }) => {
      return Post.findOne(id);
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

    logout: async (_, __, { session }) => {
      const destroySession = new Promise(resolve => session.destroy(resolve));
      await destroySession;
      return true;
    },

    register: async (_, args, { session }) => {
      const user = User.create(args);
      const errors = await validate(user);
      if (errors.length > 0) {
        console.log('errors: ', errors);
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
      if (!session || !session.userId) {
        return new AuthenticationError('Not logged in');
      }
      const post = Post.create(args.input);
      const user = await User.findOne(session.userId);
      if (!user) {
        return new UserInputError(`No user found with id ${session.userId}`);
      }
      post.author = user;
      const errors = await validate(post);
      if (errors.length > 0) {
        console.log('errors: ', errors);
        return new UserInputError('Invalid post');
      }

      await Post.save(post);
      return post;
    },
  },

  User: {
    posts: async user => {
      const u = await User.findOne(user.id, { relations: ['posts'] });
      if (!u) {
        console.log(`couldnt find user ${user.id}`);
        return null;
      }
      return u.posts;
    },
  },

  Post: {
    author: async (post, _, { userLoader }) => {
      return userLoader.load(post.authorId);
    },
  },
};
