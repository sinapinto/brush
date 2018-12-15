import { useContext } from 'react'
import { AppState } from '../util/context'

export default function useSignedInUser() {
  let { appState, setAppState } = useContext(AppState)
  let { signedInUser } = appState

  let setSignedInUser = (signedInUser) => {
    setAppState((state) => ({ ...state, signedInUser }))
  }

  return [signedInUser, setSignedInUser]
}
