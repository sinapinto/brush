import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, OutlineButton } from '../Button';

type ButtonLinkProps = {
  history: any;
  location: any;
  match: any;
  to: any;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
};

function ButtonLinkComp({
  to,
  history,
  onClick,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Button
      {...rest}
      onClick={e => {
        onClick && onClick(e);
        history.push(to);
      }}
    >
      {children}
    </Button>
  );
}

function OutlineButtonLinkComp({
  to,
  history,
  onClick,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <OutlineButton
      {...rest}
      onClick={e => {
        onClick && onClick(e);
        history.push(to);
      }}
    >
      {children}
    </OutlineButton>
  );
}

export const ButtonLink = withRouter<ButtonLinkProps>(ButtonLinkComp);
export const OutlineButtonLink = withRouter<ButtonLinkProps>(
  OutlineButtonLinkComp
);
