import React, { Suspense, useState } from 'react';
import { MdSettings as SettingsIcon } from 'react-icons/md';
import styled from 'styled-components';
import { Avatar } from '../../components/Avatar';
import { OutlineButtonLink } from '../../components/ButtonLink';
import { BlankSlate, Card, H1, SpacedContent, Spinner } from '../../components/globals';
import { TabPane, Tabs } from '../../components/Tabs';
import { GetUserByUsername_user } from '../../graphql/queries/__generated__/GetUserByUsername';
import { FollowButton } from '../../partials/FollowButton';
import { PostPreview } from '../../partials/PostPreview';
import { theme } from '../../styles/theme';
import { useCurrentUser } from '../../utils/useCurrentUser';
import { FollowersList } from './FollowersList';
import { FollowingList } from './FollowingList';

enum Tab {
  Posts = 'Posts',
  Followers = 'Followers',
  Following = 'Following',
}

type UserProfileProps = {
  user: GetUserByUsername_user;
};

export const UserProfile = ({ user }: UserProfileProps) => {
  const { currentUser } = useCurrentUser();
  const [activeTab, setActiveTab] = useState(Tab.Posts);
  return (
    <Container>
      <ProfileContainer>
        <Avatar size="lg" src={user.avatar} />
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
          <Pane label="Posts" key={Tab.Posts}>
            {user.posts.length ? (
              <SpacedContent m={4}>
                {user.posts.map(post => (
                  <PostPreview
                    key={post.id}
                    post={{ ...post, author: user }}
                    showAuthor={false}
                  />
                ))}
              </SpacedContent>
            ) : (
              <BlankSlate>This user hasn't posted anything</BlankSlate>
            )}
          </Pane>
          <Pane label="Followers" key={Tab.Followers}>
            <Suspense fallback={<Spinner size="small" />}>
              <SpacedContent m={4}>
                <FollowersList username={user.username} />
              </SpacedContent>
            </Suspense>
          </Pane>
          <Pane label="Following" key={Tab.Following}>
            <Suspense fallback={<Spinner size="small" />}>
              <SpacedContent m={4}>
                <FollowingList username={user.username} />
              </SpacedContent>
            </Suspense>
          </Pane>
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

const Pane = styled(TabPane)`
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
