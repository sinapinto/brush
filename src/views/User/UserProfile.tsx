import React, { Suspense, useState } from 'react';
import styled from 'styled-components';
import { formatDistance } from 'date-fns';
import { MdSettings as SettingsIcon } from 'react-icons/md';

import theme from '../../styles/theme';
import { useCurrentUser } from '../../utils/useCurrentUser';
import FollowersPane from './FollowersPane';
import FollowingPane from './FollowingPane';
import FollowButton from './FollowButton';
import { OutlineButtonLink } from '../../components/ButtonLink';
import { H1, P, BlankSlate, Spinner } from '../../components/globals';
import Tabs, { TabPane } from '../../components/Tabs';
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
  const startDate = formatDistance(new Date(+user.createdAt), new Date(), {
    addSuffix: true,
  });
  return (
    <>
      <ProfileContainer>
        <BioContainer>
          <H1>{user.username}</H1>
          <Bio>{user.bio}</Bio>
          <P>Joined {startDate}</P>
          {!currentUser ? null : currentUser.id !== user.id ? (
            <FollowButton isFollowing={user.subscribed} userId={user.id} />
          ) : (
            <OutlineButtonLink to="/settings">
              <SettingsIcon size={20} />
              Settings
            </OutlineButtonLink>
          )}
        </BioContainer>
        <Avatar />
      </ProfileContainer>
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
          <Suspense fallback={<Spinner size="small" />}>
            <FollowersPane username={user.username} />
          </Suspense>
        </TabPane>
        <TabPane label="Following" key={Tab.Following}>
          <Suspense fallback={<Spinner size="small" />}>
            <FollowingPane username={user.username} />
          </Suspense>
        </TabPane>
      </Tabs>
    </>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 32px;
`;

const BioContainer = styled.div`
  flex: 1;
  ${H1} {
    font-style: italic;
  }
  ${P} {
    margin-bottom: 24px;
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

const Bio = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${theme.text.secondary};
`;

export default UserProfile;
