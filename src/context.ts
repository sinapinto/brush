import React from 'react';
import { CurrentUser_currentUser } from './graphql/queries/__generated__/CurrentUser';

type CurrentUser = {
  currentUser: CurrentUser_currentUser | null;
  loading: boolean;
  refetch: () => void
};

export const CurrentUserContext = React.createContext<CurrentUser>({
  currentUser: null,
  loading: false,
  refetch: () => {},
});
