import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar } from '../../components/Avatar';
import { currentUserQuery } from '../../graphql/queries/user';
import { CurrentUser } from '../../graphql/queries/__generated__/CurrentUser';
import { theme } from '../../styles/theme';
import { FollowButton } from '../FollowButton';

type UserPreviewProps = {
  user: {
    id: string;
    username: string;
    bio: string;
    avatar: string;
    subscribed: boolean;
  };
};

export const UserPreview = ({ user }: UserPreviewProps) => {
  const {
    data: { currentUser },
  } = useQuery<CurrentUser>(currentUserQuery);
  return (
    <Container>
      <UserContainer>
        <Avatar size="md" src={user.avatar} />
        <UserInfo>
          <UsernameLink to={`/u/${user.username}`}>
            {user.username}
          </UsernameLink>
          <Bio>{user.bio}</Bio>
        </UserInfo>
      </UserContainer>
      {currentUser && currentUser.id !== user.id && (
        <FollowButton isFollowing={user.subscribed} userId={user.id} />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

const UserContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UsernameLink = styled(Link)`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: ${theme.text.secondary};
`;

const Bio = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${theme.text.secondary};
`;
