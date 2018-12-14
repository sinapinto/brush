import { useContext } from 'react'
import { AppState } from '../context'

export default function usePosts(defaultValue) {
  let { appState, setAppState } = useContext(AppState)
  let { posts = defaultValue } = appState

  let setPosts = (posts) => {
    setAppState((state) => ({ ...state, posts }))
  }

  return [posts, setPosts]
}
