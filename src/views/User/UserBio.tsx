import React, { useState } from 'react';
import styled from 'styled-components';
import { formatDistance } from 'date-fns';

import { H1 } from '../../components/globals';
import Tabs, { TabPane } from '../../components/Tabs';
import PostPreview from '../Home/PostPreview';
import { UserByUsername_user } from '../../graphql/queries/__generated__/UserByUsername';

enum Tab {
  Posts = 'Posts',
  Followers = 'Followers',
  Following = 'Following',
}

type UserBioProps = {
  user: UserByUsername_user;
};

const UserBio: React.FunctionComponent<UserBioProps> = ({ user }) => {
  let [activeTab, setActiveTab] = useState(Tab.Posts);
  let startDate = formatDistance(new Date(+user.createdAt), new Date(), {
    addSuffix: true,
  });
  return (
    <div>
      <BioWrap>
        <Bio>
          <H1>{user.username}</H1>
          <p>{user.bio}</p>
          <p>Joined {startDate}</p>
        </Bio>
        <Avatar />
      </BioWrap>
      <Tabs activeKey={activeTab} onChange={key => setActiveTab(key)}>
        <TabPane label="Posts" key={Tab.Posts}>
          {user.posts.map(post => (
            <PostPreview key={post.id} {...post} />
          ))}
        </TabPane>
        <TabPane label="Followers" key={Tab.Followers}>
          followers
        </TabPane>
        <TabPane label="Following" key={Tab.Following}>
          following
        </TabPane>
      </Tabs>
    </div>
  );
};

let BioWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 32px;
`;

let Bio = styled.div`
  flex: 1;
`;

let Avatar = styled.div`
  flex-basis: 120px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: url(/avatar.jpg);
  filter: brightness(118%);
`;

export default UserBio;
