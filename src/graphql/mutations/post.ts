import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { getPostsQuery } from '../queries/post';
import { postInfoFragment } from '../fragments/post';
import { userInfoFragment } from '../fragments/user';

let createPostMutation = gql`
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

export let createPost = graphql(createPostMutation, {
  props: ({ mutate }) => ({
    createPost: ({ title, body }) =>
      mutate({
        variables: {
          input: {
            title: title,
            body: body,
          },
        },
      }),
  }),
  options: {
    update: (proxy, { data: { createPost } }) => {
      let data;
      try {
        data = proxy.readQuery({ query: getPostsQuery });
      } catch (e) {
        // have never run `getPostsQuery` before
        return;
      }
      data.getPosts.posts.unshift(createPost);
      proxy.writeQuery({ query: getPostsQuery, data });
    },
  },
});
