/* tslint:disable */
// This file was automatically generated and should not be edited.

import { EditPostInput } from './../../../../__generated__/globalTypes';

// ====================================================
// GraphQL mutation operation: EditPost
// ====================================================

export interface EditPost_editPost {
  __typename: 'Post';
  id: string;
  body: string;
  rawBody: string;
}

export interface EditPost {
  editPost: EditPost_editPost | null;
}

export interface EditPostVariables {
  input: EditPostInput;
}
