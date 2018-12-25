import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import FollowButton from './FollowButton';
import theme from '../../styles/theme';
import { currentUserQuery } from '../../graphql/queries/user';
import { CurrentUser } from '../../graphql/queries/__generated__/CurrentUser';

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
  const { data } = useQuery<CurrentUser>(currentUserQuery, { suspend: false });
  return (
    <Container>
      <UserContainer>
        <Avatar />
        <UserInfo>
          <UsernameLink to={`/u/${username}`}>{username}</UsernameLink>
          <Bio>{bio || 'dummy bio.......'}</Bio>
        </UserInfo>
      </UserContainer>
      {data && data.currentUser && data.currentUser.id !== id && (
        <FollowButton isFollowing={isFollowing} userId={id} />
      )}
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

const UsernameLink = styled(Link)`
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
