import React, { useState } from 'react';

type Props = {
  query: string;
};

const TagSearch: React.FunctionComponent<Props> = ({ query }) => {
  return <div>aay {query}</div>;
};

export default TagSearch;
