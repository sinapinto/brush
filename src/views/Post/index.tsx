import React from 'react';
import { Query } from 'react-apollo';
import { Value } from 'slate';

import TextEditor from '../../components/TextEditor';
import { H2i, P, Card } from '../../components/globals';
import { getPostByIdQuery } from '../../graphql/queries/post';

type PostProps = {
  id: string;
};

const Post: React.FunctionComponent<PostProps> = ({ id }) => {
  return (
    <Card>
      <Query query={getPostByIdQuery} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) return 'Loading...';
          if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
          const post = data.getPost;
          const editorValue = Value.fromJSON(JSON.parse(post.body));
          return (
            <>
              <H2i>{post.title}</H2i>
              <TextEditor readOnly value={editorValue} />
              <P>By {post.author.username}</P>
            </>
          );
        }}
      </Query>
    </Card>
  );
};

export default Post;
