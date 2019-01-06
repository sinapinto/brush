import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { BlankSlate, Card, H3, SpacedContent } from '../../components/globals';
import { TabPane, Tabs } from '../../components/Tabs';
import { searchQuery } from '../../graphql/queries/search';
import {
  Search,
  SearchVariables,
  Search_search_results,
  Search_search_results_Post,
  Search_search_results_User,
} from '../../graphql/queries/__generated__/Search';
import { PostPreview } from '../../partials/PostPreview';
import { UserPreview } from '../../partials/UserPreview';
import { useTitle } from '../../utils/useTitle';

enum Tab {
  Posts = 'Posts',
  Users = 'Users',
}

const SearchContainer: React.FunctionComponent<RouteComponentProps> = ({
  location,
}) => {
  const [activeTab, setActiveTab] = useState(Tab.Posts);
  // TODO: make this more robust
  const query = location.search.replace(/^\?q=/, '');
  const { data } = useQuery<Search, SearchVariables>(searchQuery, {
    variables: { query },
  });
  useTitle(`Results for ${query}`);
  const { results } = data.search;
  const postResults = results.filter(isPost);
  const userResults = results.filter(isUser);
  return (
    <Card p={0}>
      <H3 style={{ padding: '24px 0 0 24px' }}>{`Results for “${query}”`}</H3>
      <Tabs activeKey={activeTab} onChange={key => setActiveTab(key)}>
        <Pane label="Posts" key={Tab.Posts}>
          <SpacedContent m={4}>
            {postResults.length ? (
              postResults.map(post => <PostPreview key={post.id} post={post} />)
            ) : (
              <BlankSlate>No posts found</BlankSlate>
            )}
          </SpacedContent>
        </Pane>
        <Pane label="Users" key={Tab.Users}>
          <SpacedContent m={4}>
            {userResults.length ? (
              userResults.map(user => <UserPreview key={user.id} user={user} />)
            ) : (
              <BlankSlate>No users found</BlankSlate>
            )}
          </SpacedContent>
        </Pane>
      </Tabs>
    </Card>
  );
};

const isPost = (
  item: Search_search_results
): item is Search_search_results_Post => {
  return item.__typename === 'Post';
};

const isUser = (
  item: Search_search_results
): item is Search_search_results_User => {
  return item.__typename === 'User';
};

const Pane = styled(TabPane)`
  padding: 32px;
`;

export default SearchContainer;
