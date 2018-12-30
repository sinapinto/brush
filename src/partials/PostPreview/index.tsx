import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H3, P } from '../../components/globals';
import TagList from './TagList';
import {
  GetPosts_getPosts_posts_author,
  GetPosts_getPosts_posts_categories,
} from '../../graphql/queries/__generated__/GetPosts';

type Props = {
  post: {
    id: string;
    title: string;
    body?: string;
    rawBody: string;
    updatedAt?: string;
    categories: GetPosts_getPosts_posts_categories[];
    author: GetPosts_getPosts_posts_author;
  };
};

const PostPreview: React.FunctionComponent<Props> = ({ post }) => {
  return (
    <Container>
      <H3 i>
        <Link to={`/p/${post.id}`}>{post.title}</Link>
      </H3>
      <P>{post.rawBody.slice(0, 200)}</P>
      <SpaceBetween>
        <UserContainer>
          <Avatar size={32} src={post.author.avatar} />
          <Link to={`/u/${post.author.username}`}>{post.author.username}</Link>
        </UserContainer>
        <TagList categories={post.categories} />
      </SpaceBetween>
    </Container>
  );
};

const Container = styled.div``;

const SpaceBetween = styled.div`
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled(({ src, size, ...rest }) => <div {...rest} />)`
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  margin-right: 8px;
  border-radius: 50%;
  background-image: ${props => `url(${props.src || '/avatar.jpg'})`};
  background-size: ${props => `${props.size}px`};
  flex-shrink: 0;
`;

export default PostPreview;
