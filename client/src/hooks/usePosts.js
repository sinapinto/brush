import { useContext } from 'react'
import { AppState } from '../context'

let byId = (arr) => {
  return arr.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {})
}

export default function usePosts(id) {
  let { appState, setAppState } = useContext(AppState)
  let { postsById = {} } = appState

  let setPosts = (posts) => {
    setAppState((state) => ({
      ...state,
      postsById: byId(posts),
    }))
  }

  let setPost = (post) => {
    setAppState((state) => ({
      ...state,
      postsById: {
        ...state.postsById,
        [post.id]: post,
      },
    }))
  }

  if (id) {
    return [postsById[id], setPost]
  }
  // TODO: preserve order?
  return [Object.values(postsById), setPosts]
}
