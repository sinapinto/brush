import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import FollowButton from './FollowButton';

type Props = {
  id: string;
  username: string;
  bio: string;
  isFollowing: boolean;
};

const FollowerItem: React.FunctionComponent<Props> = ({
  id,
  username,
  bio,
  isFollowing,
}) => {
  return (
    <Container>
      <UserContainer>
        <Avatar />
        <UserInfo>
          <Username>{username}</Username>
          <Bio>{bio || 'dummy bio.......'}</Bio>
        </UserInfo>
      </UserContainer>
      <FollowButton isFollowing={isFollowing} userId={id} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const UserContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  margin-right: 24px;
  border-radius: 50%;
  background: skyblue;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: ${theme.text.default};
`;

const Bio = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${theme.text.secondary};
`;

export default FollowerItem;
