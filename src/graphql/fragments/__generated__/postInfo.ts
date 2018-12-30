/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: postInfo
// ====================================================

export interface postInfo_categories {
  __typename: "Category";
  name: string;
}

export interface postInfo {
  __typename: "Post";
  id: string;
  title: string;
  body: string;
  rawBody: string;
  updatedAt: string;
  categories: postInfo_categories[];
}
