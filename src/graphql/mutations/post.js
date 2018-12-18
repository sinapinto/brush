import gql from 'graphql-tag'

let postInfoFragment = gql`
  fragment postInfo on Post {
    id
    title
    body
  }
`

export let createPostMutation = gql`
  mutation CreatePost($input: CreatePostInput) {
    createPost(input: $input) {
      success
      message
      ...postInfo
    }
  }
  ${postInfoFragment}
`
