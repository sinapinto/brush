import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';
import { formatDistance } from 'date-fns';

import { currentUserQuery } from '../../graphql/queries/user';
import { H1, BlankSlate } from '../../components/globals';
import Tabs, { TabPane } from '../../components/Tabs';
import PostPreview from '../../partials/PostPreview';
import { UserByUsername_user } from '../../graphql/queries/__generated__/UserByUsername';
import { CurrentUser } from '../../graphql/queries/__generated__/CurrentUser';
import { Button } from '../../components/Button';

enum Tab {
  Posts = 'Posts',
  Followers = 'Followers',
  Following = 'Following',
}

type Props = {
  user: UserByUsername_user;
};

const UserBio: React.FunctionComponent<Props> = ({ user }) => {
  const { data } = useQuery<CurrentUser>(currentUserQuery);
  const [activeTab, setActiveTab] = useState(Tab.Posts);
  const startDate = formatDistance(new Date(+user.createdAt), new Date(), {
    addSuffix: true,
  });
  const isOwnProfile =
    data && data.currentUser && data.currentUser.id === user.id;
  return (
    <div>
      <BioWrap>
        <Bio>
          <H1>{user.username}</H1>
          <p>{user.bio}</p>
          <p>Joined {startDate}</p>
          {!isOwnProfile && <Button>Follow</Button>}
        </Bio>
        <Avatar />
      </BioWrap>
      <Tabs activeKey={activeTab} onChange={key => setActiveTab(key)}>
        <TabPane label="Posts" key={Tab.Posts}>
          {user.posts.length ? (
            user.posts.map(post => (
              <PostPreview key={post.id} {...post} author={user} />
            ))
          ) : (
            <BlankSlate>No posts.</BlankSlate>
          )}
        </TabPane>
        <TabPane label="Followers" key={Tab.Followers}>
          <BlankSlate>Nobody.</BlankSlate>
        </TabPane>
        <TabPane label="Following" key={Tab.Following}>
          <BlankSlate>Nobody.</BlankSlate>
        </TabPane>
      </Tabs>
    </div>
  );
};

const BioWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 32px;
`;

const Bio = styled.div`
  flex: 1;
  ${H1} {
    font-style: italic;
  }
`;

const Avatar = styled.div`
  flex-basis: 120px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: url(/avatar.jpg);
  filter: brightness(118%);
`;

export default UserBio;
