import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import { MdSettings as SettingsIcon } from 'react-icons/md';

import theme from '../../styles/theme';
import { useCurrentUser } from '../../utils/useCurrentUser';
import FollowersList from './FollowersList';
import FollowingList from './FollowingList';
import FollowButton from './FollowButton';
import { OutlineButtonLink } from '../../components/ButtonLink';
import {
  H1,
  P,
  BlankSlate,
  Spinner,
  Card,
  SpacedContent,
} from '../../components/globals';
import Tabs from '../../components/Tabs';
import PostPreview from '../../partials/PostPreview';
import { GetUserByUsername_user } from '../../graphql/queries/__generated__/GetUserByUsername';

enum Tab {
  Posts = 'Posts',
  Followers = 'Followers',
  Following = 'Following',
}

type Props = {
  user: GetUserByUsername_user;
};

const UserProfile: React.FunctionComponent<Props> = ({ user }) => {
  const { currentUser } = useCurrentUser();
  const [activeTab, setActiveTab] = useState(Tab.Posts);
  return (
    <Container>
      <ProfileContainer>
        <Avatar />
        <H1 i>{user.username}</H1>
        <Bio>{user.bio}</Bio>
        {!currentUser ? null : currentUser.id !== user.id ? (
          <FollowButton isFollowing={user.subscribed} userId={user.id} />
        ) : (
          <OutlineButtonLink to="/settings">
            <SettingsIcon size={20} />
            Settings
          </OutlineButtonLink>
        )}
      </ProfileContainer>
      <Card p={0}>
        <Tabs activeKey={activeTab} onChange={key => setActiveTab(key)}>
          <TabPane label="Posts" key={Tab.Posts}>
            {user.posts.length ? (
              <SpacedContent f={4}>
                {user.posts.map(post => (
                  <PostPreview key={post.id} {...post} author={user} />
                ))}
              </SpacedContent>
            ) : (
              <BlankSlate>This user hasn't posted anything</BlankSlate>
            )}
          </TabPane>
          <TabPane label="Followers" key={Tab.Followers}>
            <Suspense fallback={<Spinner size="small" />}>
              <SpacedContent f={4}>
                <FollowersList username={user.username} />
              </SpacedContent>
            </Suspense>
          </TabPane>
          <TabPane label="Following" key={Tab.Following}>
            <Suspense fallback={<Spinner size="small" />}>
              <SpacedContent f={4}>
                <FollowingList username={user.username} />
              </SpacedContent>
            </Suspense>
          </TabPane>
        </Tabs>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  ${Card} {
    display: flex;
    flex-flow: column;
    flex-grow: 1;
  }
`;

const TabPane = styled(Tabs.TabPane)`
  padding: 32px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 260px;
  align-items: center;
  padding: 32px;
  padding-left: 0;
  > button {
    width: 100%;
  }
`;

const Bio = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${theme.text.secondary};
  margin-bottom: 24px;
  margin-top: 8px;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: url(/avatar.jpg);
  filter: brightness(118%);
`;

export default UserProfile;
