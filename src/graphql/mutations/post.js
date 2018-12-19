import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

let postInfoFragment = gql`
  fragment postInfo on Post {
    id
    title
    body
  }
`

let createPostMutation = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ...postInfo
    }
  }
  ${postInfoFragment}
`

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
})
