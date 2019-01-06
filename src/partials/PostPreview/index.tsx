import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { H3, P } from '../../components/globals';
import { GetPosts_getPosts_posts_author, GetPosts_getPosts_posts_categories } from '../../graphql/queries/__generated__/GetPosts';
import { Author } from '../../partials/Author';
import { TagList } from '../TagList';

type PostPreviewProps = {
  post: {
    id: string;
    title: string;
    body?: string;
    rawBody: string;
    updatedAt?: string;
    categories: GetPosts_getPosts_posts_categories[];
    author: GetPosts_getPosts_posts_author;
  };
  showAuthor?: boolean;
};

export const PostPreview = ({
  post,
  showAuthor = true,
}: PostPreviewProps) => {
  return (
    <Container>
      <H3 i>
        <Link to={`/p/${post.id}`}>{post.title}</Link>
      </H3>
      <P>{post.rawBody.slice(0, 200)}</P>
      <SpaceBetween>
        {showAuthor && <Author user={post.author} />}
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
