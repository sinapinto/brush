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
    rawBody?: string;
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
      <TagList categories={post.categories} />
      <P>
        <Link to={`/u/${post.author.username}`}>{post.author.username}</Link>
      </P>
    </Container>
  );
};

const Container = styled.div``;

export default PostPreview;
