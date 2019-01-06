import { useQuery } from 'react-apollo-hooks';
import { currentUserQuery } from '../graphql/queries/user';
import { CurrentUser } from '../graphql/queries/__generated__/CurrentUser';

export const useCurrentUser = (opts: { suspend?: boolean } = {}) => {
  const { data, refetch } = useQuery<CurrentUser>(currentUserQuery, {
    errorPolicy: 'ignore',
    ...opts,
  });

  return { currentUser: data.currentUser, refetch };
};
