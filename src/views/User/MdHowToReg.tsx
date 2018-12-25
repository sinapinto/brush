// this icon is missing from the google/material-design-icons repo...

import React from 'react';

type Props = {
  size?: string | number;
};

const MdHowToReg: React.FunctionComponent<Props> = ({ size = '1em' }) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <path clipRule="evenodd" fill="none" d="M0 0h24v24H0z" />
      <path
        d="M9 17l3-2.94a9.34 9.34 0 0 0-1-.06c-2.67 0-8 1.34-8 4v2h9l-3-3zm2-5c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m4.47 8.5L12 17l1.4-1.41 2.07 2.08 5.13-5.17 1.4 1.41z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default MdHowToReg;
