import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';

import { searchQuery } from '../../graphql/queries/search';
import {
  Search,
  SearchVariables,
  Search_search_results_Post,
  Search_search_results,
  Search_search_results_User,
} from '../../graphql/queries/__generated__/Search';
import { Card, H3, BlankSlate, SpacedContent } from '../../components/globals';
import Tabs from '../../components/Tabs';
import PostPreview from '../../partials/PostPreview';
import UserPreview from '../../partials/UserPreview';

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
  const { results } = data.search;
  const postResults = results.filter(isPost);
  const userResults = results.filter(isUser);
  return (
    <Card p={0}>
      <H3 style={{ padding: '24px 0 0 24px' }}>{`Results for “${query}”`}</H3>
      <Tabs activeKey={activeTab} onChange={key => setActiveTab(key)}>
        <TabPane label="Posts" key={Tab.Posts}>
          <SpacedContent f={4}>
            {postResults.length ? (
              postResults.map(post => <PostPreview key={post.id} post={post} />)
            ) : (
              <BlankSlate>No posts found</BlankSlate>
            )}
          </SpacedContent>
        </TabPane>
        <TabPane label="Users" key={Tab.Users}>
          <SpacedContent f={4}>
            {userResults.length ? (
              userResults.map(user => <UserPreview key={user.id} user={user} />)
            ) : (
              <BlankSlate>No users found</BlankSlate>
            )}
          </SpacedContent>
        </TabPane>
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

const TabPane = styled(Tabs.TabPane)`
  padding: 32px;
`;

export default SearchContainer;
