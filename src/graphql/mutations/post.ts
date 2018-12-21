import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { postInfoFragment } from '../fragments/post';
import { userInfoFragment } from '../fragments/user';
import { CreatePost } from './__generated__/CreatePost';

interface Data {
  createPost: CreatePost;
}

interface Variables {
  title: string;
  body: string;
}

export class CreatePostMutation extends Mutation<Data, Variables> {}

export let createPostMutation = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ...postInfo
      author {
        ...userInfo
      }
    }
  }
  ${postInfoFragment}
  ${userInfoFragment}
`;
