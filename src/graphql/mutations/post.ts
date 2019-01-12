import gql from 'graphql-tag';
import { postInfoFragment } from '../fragments/post';
import { userInfoFragment } from '../fragments/user';

export const createPostMutation = gql`
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

export const editPostMutation = gql`
  mutation EditPost($input: EditPostInput!) {
    editPost(input: $input) {
      id
      body
      rawBody
    }
  }
`;

export const deletePostMutation = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;
