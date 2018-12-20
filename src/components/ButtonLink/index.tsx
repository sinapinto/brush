import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from '../Button';

interface Props {
  history: any;
  location: any;
  match: any;
  to: any;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

function ButtonLink({ to, history, onClick, children, ...rest }: Props) {
  return (
    <Button
      {...rest}
      onClick={e => {
        onClick(e);
        history.push(to);
      }}
    >
      {children}
    </Button>
  );
}

export default withRouter<Props>(ButtonLink);
