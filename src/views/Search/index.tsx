import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';

import { searchQuery } from '../../graphql/queries/search';
import { Card } from '../../components/globals';

const Search: React.FunctionComponent<RouteComponentProps> = ({ location }) => {
  const query = location.search.replace(/^\?q=/, '');
  const { data } = useQuery(searchQuery, { variables: { query } });
  return (
    <Card>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Card>
  );
};

export default Search;
