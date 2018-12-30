import gql from 'graphql-tag';
import { postInfoFragment } from '../fragments/post';
import { userInfoFragment } from '../fragments/user';

export const getPostsQuery = gql`
  query GetPosts($pageSize: Int, $after: String) {
    getPosts(pageSize: $pageSize, after: $after) {
      cursor
      hasMore
      posts {
        ...postInfo
        author {
          ...userInfo
        }
      }
    }
  }
  ${postInfoFragment}
  ${userInfoFragment}
`;

export const getPostByIdQuery = gql`
  query GetPostById($id: ID!) {
    getPost(id: $id) {
      ...postInfo
      author {
        ...userInfo
      }
    }
  }
  ${postInfoFragment}
  ${userInfoFragment}
`;

export const getPostsByCategory = gql`
  query GetPostsByCategory($category: String!) {
    getPostsByCategory(category: $category) {
      posts {
        ...postInfo
        author {
          ...userInfo
        }
      }
    }
  }
  ${postInfoFragment}
  ${userInfoFragment}
`;
