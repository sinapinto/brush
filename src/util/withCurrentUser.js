import React from 'react'
import { compose } from 'react-apollo'
import { getCurrentUser } from '../graphql/queries/user'

function CurrentUserComponent(props) {
  let {
    data: { currentUser, networkStatus },
    children,
  } = props

  let isLoading = networkStatus === 1 || networkStatus === 2
  return children && children({ currentUser, isLoading })
}

let CurrentUser = compose(getCurrentUser)(CurrentUserComponent)

export default function withCurrentUser(Component) {
  return props => {
    return (
      <CurrentUser>
        {({ currentUser, isLoading }) => {
          return (
            <Component
              {...props}
              currentUser={currentUser || null}
              isLoadingCurrentUser={isLoading}
            />
          )
        }}
      </CurrentUser>
    )
  }
}
